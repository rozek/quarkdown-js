/**
 * QuarkdownJS — Expand Stage (Stage 4)
 *
 * Evaluates all QD-specific AST nodes and replaces them with standard mdast nodes.
 * Uses a recursive async tree-walker (cannot use visit() for async transformations).
 */

import type { Root } from 'mdast'
import type { Context } from '../context/context.js'
import type {
  QdFunctionCallNode,
  QdFunctionDefNode,
  QdVariableDefNode,
  QdLetNode,
  QdConditionalNode,
  QdLoopNode,
  QdMetadataNode,
  QdArgument,
  QdRawArg,
  QdValue,
  QdParamSpec,
  CssUnit,
} from '../ast/index.js'

// Regex helpers for inline call parsing in text nodes
const INLINE_NAME_RE = /^\.([a-zA-Z_][a-zA-Z0-9_]*)/
const CHAIN_SEP_STR = '::'

/** Minimal inline brace extractor */
function extractInlineBlock(text: string, pos: number): { content: string; end: number } | null {
  if (text[pos] !== '{') return null
  let depth = 1
  const start = pos + 1
  pos++
  while (pos < text.length && depth > 0) {
    if (text[pos] === '{') depth++
    else if (text[pos] === '}') depth--
    if (depth > 0) pos++
    else break
  }
  if (depth !== 0) return null
  return { content: text.slice(start, pos), end: pos + 1 }
}

/** Extract named and positional args from text at position pos */
function extractInlineArgs(text: string, startPos: number): { args: QdArgument[]; end: number } {
  const args: QdArgument[] = []
  let pos = startPos
  while (pos < text.length) {
    while (pos < text.length && /[ \t]/.test(text[pos])) pos++
    if (pos >= text.length) break
    // Named arg: identifier:{...}
    const namedMatch = text.slice(pos).match(/^([a-zA-Z_][a-zA-Z0-9_]*):\{/)
    if (namedMatch) {
      const keyLen = namedMatch[1].length
      const block = extractInlineBlock(text, pos + keyLen + 1)
      if (block === null) break
      args.push({ name: namedMatch[1], value: { tag: 'literal', text: block.content.trim() } })
      pos = block.end
      continue
    }
    if (text[pos] === '{') {
      const block = extractInlineBlock(text, pos)
      if (block === null) break
      const content = block.content.trim()
      // Nested call?
      if (content.startsWith('.')) {
        const nested = tryParseInlineCall(content)
        if (nested) {
          args.push({ name: undefined, value: nested.tag === 'chain'
            ? { tag: 'chain', nodes: (nested as any).nodes }
            : { tag: 'call', node: (nested as any).node } })
          pos = block.end
          continue
        }
      }
      args.push({ name: undefined, value: { tag: 'literal', text: content } })
      pos = block.end
      continue
    }
    break
  }
  return { args, end: pos }
}

type InlineCallResult =
  | { tag: 'call'; node: QdFunctionCallNode }
  | { tag: 'chain'; nodes: any }

/** Parse a dot-call or chain from text, return result or null */
function tryParseInlineCall(text: string): InlineCallResult | null {
  if (!text.startsWith('.')) return null
  const nameMatch = text.match(INLINE_NAME_RE)
  if (!nameMatch) return null

  let pos = nameMatch[0].length
  const firstName = nameMatch[1]
  const steps: Array<{ name: string }> = [{ name: firstName }]

  while (text.startsWith(CHAIN_SEP_STR, pos)) {
    const nextName = text.slice(pos + CHAIN_SEP_STR.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
    if (!nextName) break
    steps.push({ name: nextName[0] })
    pos += CHAIN_SEP_STR.length + nextName[0].length
  }

  const { args, end: _end } = extractInlineArgs(text, pos)

  if (steps.length > 1) {
    // Build chain
    let current: QdFunctionCallNode = {
      type: 'qdFunctionCall', name: steps[0].name, args: [], inline: true,
    }
    for (let i = 1; i < steps.length; i++) {
      const stepArgs = i === steps.length - 1 ? args : []
      current = {
        type: 'qdFunctionCall',
        name: steps[i].name,
        args: [{ name: undefined, value: { tag: 'call', node: current } }, ...stepArgs],
        inline: true,
      }
    }
    return { tag: 'call', node: current }
  }

  return { tag: 'call', node: { type: 'qdFunctionCall', name: firstName, args, inline: true } }
}

/** Split a text value into segments: literal text and inline calls (.name patterns) */
function splitTextForInlineCalls(text: string): Array<{ type: 'text'; value: string } | { type: 'call'; callText: string; start: number }> {
  const result: Array<{ type: 'text'; value: string } | { type: 'call'; callText: string; start: number }> = []
  let pos = 0

  while (pos < text.length) {
    // Find next call start: either tight `{.name` or bare `.name`
    let callStart = -1
    let tight = false
    for (let i = pos; i < text.length; i++) {
      if (text[i] === '{' && i + 1 < text.length && text[i + 1] === '.' &&
          i + 2 < text.length && /[a-zA-Z_]/.test(text[i + 2])) {
        callStart = i
        tight = true
        break
      }
      if (text[i] === '.' && i + 1 < text.length && /[a-zA-Z_]/.test(text[i + 1])) {
        callStart = i
        tight = false
        break
      }
    }

    if (callStart === -1) {
      // No more inline calls
      result.push({ type: 'text', value: text.slice(pos) })
      break
    }

    if (tight) {
      // Tight call: `{.name::chain {args}}` — strip outer braces
      // Push preceding text (up to and excluding the `{`)
      if (callStart > pos) {
        result.push({ type: 'text', value: text.slice(pos, callStart) })
      }

      // Extract balanced content of the outer `{...}`
      let depth = 1
      let innerStart = callStart + 1
      let innerEnd = innerStart
      while (innerEnd < text.length && depth > 0) {
        if (text[innerEnd] === '{') depth++
        else if (text[innerEnd] === '}') depth--
        if (depth > 0) innerEnd++
        else break
      }

      if (depth !== 0) {
        // Unclosed brace — treat `{` as literal text
        result.push({ type: 'text', value: '{' })
        pos = callStart + 1
        continue
      }

      const innerText = text.slice(innerStart, innerEnd)
      // innerText is the call (e.g. ".title::otherwise {Dr.}")
      // Parse it as a call
      const dotMatch = innerText.match(INLINE_NAME_RE)
      if (!dotMatch) {
        // Not a call — emit as literal text including braces
        result.push({ type: 'text', value: text.slice(callStart, innerEnd + 1) })
        pos = innerEnd + 1
        continue
      }

      let callEnd = dotMatch[0].length
      const chainSteps: Array<{ name: string; args: QdArgument[] }> = []
      const { args: firstArgs, end: firstEnd } = extractInlineArgs(innerText, callEnd)
      chainSteps.push({ name: dotMatch[1], args: firstArgs })
      callEnd = firstEnd

      while (innerText.startsWith(CHAIN_SEP_STR, callEnd)) {
        const nextName = innerText.slice(callEnd + CHAIN_SEP_STR.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
        if (!nextName) break
        const stepStart = callEnd + CHAIN_SEP_STR.length
        callEnd = stepStart + nextName[0].length
        const { args: stepArgs, end: stepEnd } = extractInlineArgs(innerText, callEnd)
        chainSteps.push({ name: nextName[0], args: stepArgs })
        callEnd = stepEnd
      }

      result.push({ type: 'call', callText: innerText, start: callStart, chainSteps } as any)
      pos = innerEnd + 1 // skip past the closing `}`
    } else {
      // Bare call: `.name::chain {args}`
      const dotPos = callStart

      // Push preceding text
      if (dotPos > pos) {
        result.push({ type: 'text', value: text.slice(pos, dotPos) })
      }

      // Extract the call text
      const nameMatch = text.slice(dotPos).match(INLINE_NAME_RE)
      if (!nameMatch) {
        result.push({ type: 'text', value: '.' })
        pos = dotPos + 1
        continue
      }

      let callEnd = dotPos + nameMatch[0].length

      // Collect chain steps with their args. Each step may have args before the
      // next :: separator (e.g. ".pow {base} to:{exp}::multiply {.pi}::truncate {2}")
      const chainSteps: Array<{ name: string; args: QdArgument[] }> = []

      // First step
      const { args: firstArgs, end: firstEnd } = extractInlineArgs(text, callEnd)
      chainSteps.push({ name: nameMatch[1], args: firstArgs })
      callEnd = firstEnd

      // Additional chain steps
      while (text.startsWith(CHAIN_SEP_STR, callEnd)) {
        const nextName = text.slice(callEnd + CHAIN_SEP_STR.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
        if (!nextName) break
        const stepNameStart = callEnd + CHAIN_SEP_STR.length
        callEnd = stepNameStart + nextName[0].length
        const { args: stepArgs, end: stepEnd } = extractInlineArgs(text, callEnd)
        chainSteps.push({ name: nextName[0], args: stepArgs })
        callEnd = stepEnd
      }

      result.push({ type: 'call', callText: text.slice(dotPos, callEnd), start: dotPos, chainSteps } as any)
      pos = callEnd
    }
  }

  return result
}

/** Build a QdFunctionCallNode (or chain) from collected chain steps */
function buildCallFromChainSteps(
  chainSteps: Array<{ name: string; args: QdArgument[] }>
): QdFunctionCallNode {
  let current: QdFunctionCallNode = {
    type: 'qdFunctionCall',
    name: chainSteps[0].name,
    args: chainSteps[0].args,
    inline: true,
  }
  for (let i = 1; i < chainSteps.length; i++) {
    current = {
      type: 'qdFunctionCall',
      name: chainSteps[i].name,
      args: [
        { name: undefined, value: { tag: 'call', node: current } },
        ...chainSteps[i].args,
      ],
      inline: true,
    }
  }
  return current
}

/** Expand inline calls within a text node, returning replacement nodes */
async function expandTextNode(textValue: string, ctx: Context): Promise<any[]> {
  const segments = splitTextForInlineCalls(textValue)

  // Check if there are any calls
  const hasCalls = segments.some(s => s.type === 'call')
  if (!hasCalls) return [{ type: 'text', value: textValue }]

  const results: any[] = []
  for (const seg of segments) {
    if (seg.type === 'text') {
      if ((seg as any).value) results.push({ type: 'text', value: (seg as any).value })
    } else {
      const callSeg = seg as any
      const callNode = buildCallFromChainSteps(callSeg.chainSteps)
      const expanded = await expandNode(callNode, ctx)
      if (Array.isArray(expanded)) results.push(...expanded)
      else if (expanded !== null && expanded !== undefined) results.push(expanded)
    }
  }
  return results
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function expand(root: Root, ctx: Context): Promise<Root> {
  const result = await expandNode(root, ctx)
  return result as Root
}

// ---------------------------------------------------------------------------
// Core recursive expander
// ---------------------------------------------------------------------------

async function expandNode(node: any, ctx: Context): Promise<any | null> {
  switch (node.type) {
    case 'qdMetadata':    return expandMetadata(node as QdMetadataNode, ctx)
    case 'qdVariableDef': return expandVariableDef(node as QdVariableDefNode, ctx)
    case 'qdFunctionDef': return expandFunctionDef(node as QdFunctionDefNode, ctx)
    case 'qdLet':         return expandLet(node as QdLetNode, ctx)
    case 'qdConditional': return expandConditional(node as QdConditionalNode, ctx)
    case 'qdLoop':        return expandLoop(node as QdLoopNode, ctx)
    case 'qdFunctionCall':return expandFunctionCall(node as QdFunctionCallNode, ctx)
    case 'qdChain':       {
      // Should have been flattened by refiner, but handle defensively
      ctx.addDiagnostic({ severity: 'warning', message: 'Unexpected qdChain node in expander — skipping' })
      return null
    }
    case 'text': {
      // Expand any inline calls embedded in text values (e.g., "Item .n")
      return expandTextNode(node.value ?? '', ctx)
    }
    default: {
      // Recursively expand children
      if (node.children) {
        const newChildren: any[] = []
        for (const child of node.children) {
          const result = await expandNode(child, ctx)
          if (Array.isArray(result)) newChildren.push(...result)
          else if (result !== null && result !== undefined) newChildren.push(result)
        }
        return { ...node, children: newChildren }
      }
      return node
    }
  }
}

// ---------------------------------------------------------------------------
// Structural node expansion
// ---------------------------------------------------------------------------

async function expandMetadata(node: QdMetadataNode, ctx: Context): Promise<null> {
  const meta = ctx.metadata as any
  switch (node.key) {
    case 'author':
      if (!meta.authors) meta.authors = []
      meta.authors.push(node.value)
      break
    case 'theme': {
      const parts = node.value.trim().split(/\s+/)
      meta.theme = parts[0]
      if (parts[1]) meta.layoutTheme = parts[1]
      break
    }
    case 'type':
      meta.type = node.value
      break
    case 'name':
      meta.name = node.value
      break
    case 'lang':
      meta.lang = node.value
      break
    default:
      meta[node.key] = node.value
  }
  return null
}

async function expandVariableDef(node: QdVariableDefNode, ctx: Context): Promise<null> {
  const value = await evalArg(node.initializer, ctx)
  ctx.define(node.name, { kind: 'variable', value })
  return null
}

async function expandFunctionDef(node: QdFunctionDefNode, ctx: Context): Promise<null> {
  ctx.define(node.name, { kind: 'user', def: node, closure: ctx })
  return null
}

async function expandLet(node: QdLetNode, ctx: Context): Promise<any[]> {
  const value = await evalArg(node.initializer, ctx)
  const childCtx = ctx.fork({ [node.name]: { kind: 'variable', value } })
  const results: any[] = []
  for (const child of node.body) {
    const result = await expandNode(child, childCtx)
    if (Array.isArray(result)) results.push(...result)
    else if (result !== null && result !== undefined) results.push(result)
  }
  return results
}

async function expandConditional(node: QdConditionalNode, ctx: Context): Promise<any[]> {
  const condValue = await evalArg(node.condition, ctx)
  let condBool = toBool(condValue)
  if (node.negate) condBool = !condBool

  if (!condBool) return []

  const results: any[] = []
  for (const child of node.consequent) {
    const result = await expandNode(child, ctx)
    if (Array.isArray(result)) results.push(...result)
    else if (result !== null && result !== undefined) results.push(result)
  }
  return results
}

async function expandLoop(node: QdLoopNode, ctx: Context): Promise<any[]> {
  const iterValue = await evalArg(node.iterable, ctx)
  const items = iterateValue(iterValue)

  const results: any[] = []
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx]
    const bindings: Record<string, any> = {
      [node.param]: { kind: 'variable', value: item },
      '1': { kind: 'variable', value: item },
    }
    const childCtx = ctx.fork(bindings)

    for (const child of node.body) {
      const result = await expandNode(child, childCtx)
      if (Array.isArray(result)) results.push(...result)
      else if (result !== null && result !== undefined) results.push(result)
    }
  }
  return results
}

async function expandFunctionCall(node: QdFunctionCallNode, ctx: Context): Promise<any | any[] | null> {
  const callable = ctx.resolve(node.name)

  if (!callable) {
    ctx.addDiagnostic({ severity: 'warning', message: `Undefined function or variable: .${node.name}` })
    return []
  }

  switch (callable.kind) {
    case 'variable': {
      // Variable reference — render value as node(s)
      const nodes = valueToNodes(callable.value)
      return nodes.length === 0 ? null : nodes.length === 1 ? nodes[0] : nodes
    }

    case 'builtin': {
      // Build QdRawArg[] with _name attached to named args so getNamedArg() /
      // positionalArgs() can distinguish them, while positional destructuring
      // ([a, b]) and evalArg() still work normally (tag is preserved).
      const rawArgs: QdRawArg[] = node.args.map((a: QdArgument) => {
        const raw: any = { ...a.value }
        if (a.name) raw._name = a.name
        return raw as QdRawArg
      })
      const val = await callable.fn(rawArgs, ctx)
      const nodes = valueToNodes(val)
      // Special handling for include: it can return multiple nodes
      if (nodes.length === 0) return null
      if (nodes.length === 1) return nodes[0]
      return nodes
    }

    case 'user': {
      return expandUserFunctionCall(node, callable, ctx)
    }
  }
}

async function expandUserFunctionCall(
  node: QdFunctionCallNode,
  callable: { kind: 'user'; def: QdFunctionDefNode; closure: Context },
  _ctx: Context,
): Promise<any[]> {
  const { def, closure } = callable
  const bindings: Record<string, any> = {}

  // Bind positional args to params
  const positionalArgs = node.args.filter(a => a.name === undefined)
  const namedArgs = node.args.filter(a => a.name !== undefined)

  for (let i = 0; i < def.params.length; i++) {
    const param = def.params[i]
    // Check named first
    const named = namedArgs.find(a => a.name === param.name)
    if (named) {
      const val = await evalArg(named.value, closure)
      bindings[param.name] = { kind: 'variable', value: val }
    } else if (i < positionalArgs.length) {
      const val = await evalArg(positionalArgs[i].value, closure)
      bindings[param.name] = { kind: 'variable', value: val }
    }
    // Optional params with no value remain unbound
  }

  const childCtx = closure.fork(bindings)
  const results: any[] = []
  for (const child of def.body) {
    const result = await expandNode(child, childCtx)
    if (Array.isArray(result)) results.push(...result)
    else if (result !== null && result !== undefined) results.push(result)
  }
  return results
}

// ---------------------------------------------------------------------------
// Argument evaluation
// ---------------------------------------------------------------------------

export async function evalArg(arg: QdRawArg, ctx: Context): Promise<QdValue> {
  switch (arg.tag) {
    case 'literal':
      return parseLiteral(arg.text)
    case 'call': {
      const result = await expandNode(arg.node, ctx)
      return nodesToValue(result)
    }
    case 'block': {
      return { kind: 'markdown', nodes: arg.nodes as any }
    }
    case 'chain': {
      // Should have been flattened by refiner — handle defensively
      // Flatten the chain and evaluate it
      const steps = arg.nodes.steps
      if (steps.length === 0) return { kind: 'none' }

      // Build nested call: a::b::c {args} → c(b(a()), args)
      let currentNode: QdFunctionCallNode = {
        type: 'qdFunctionCall',
        name: steps[0].name,
        args: steps[0].args ?? [],
        inline: false,
      }
      for (let i = 1; i < steps.length; i++) {
        const step = steps[i]
        const chainArg: QdArgument = {
          name: undefined,
          value: { tag: 'call', node: currentNode },
        }
        currentNode = {
          type: 'qdFunctionCall',
          name: step.name,
          args: [chainArg, ...(step.args ?? [])],
          inline: false,
        }
      }
      const result = await expandNode(currentNode, ctx)
      return nodesToValue(result)
    }
  }
}

function parseLiteral(text: string): QdValue {
  if (text === 'true') return { kind: 'boolean', value: true }
  if (text === 'false') return { kind: 'boolean', value: false }
  if (/^-?\d+(\.\d+)?$/.test(text)) return { kind: 'number', value: parseFloat(text) }

  // Range: "1..5"
  const rangeMatch = text.match(/^(-?\d+)\.\.(-?\d+)$/)
  if (rangeMatch) return { kind: 'range', from: parseInt(rangeMatch[1]), to: parseInt(rangeMatch[2]) }

  // Size: "1.5em", "100px"
  const sizeMatch = text.match(/^(-?\d+(?:\.\d+)?)(px|em|rem|pt|cm|mm|in|vh|vw|%)$/)
  if (sizeMatch) return { kind: 'size', value: parseFloat(sizeMatch[1]), unit: sizeMatch[2] as CssUnit }

  return { kind: 'string', value: text }
}

function nodesToValue(result: any | any[] | null): QdValue {
  if (result === null || result === undefined) return { kind: 'none' }
  if (Array.isArray(result)) {
    if (result.length === 0) return { kind: 'none' }
    // If all text nodes, concatenate to string
    if (result.every((n: any) => n.type === 'text')) {
      return { kind: 'string', value: result.map((n: any) => n.value).join('') }
    }
    return { kind: 'markdown', nodes: result }
  }
  if (result.type === 'text') return { kind: 'string', value: result.value }
  return { kind: 'markdown', nodes: [result] }
}

// ---------------------------------------------------------------------------
// Value utilities
// ---------------------------------------------------------------------------

export function valueToNodes(val: QdValue): any[] {
  switch (val.kind) {
    case 'string':   return [{ type: 'text', value: val.value }]
    case 'number':   return [{ type: 'text', value: String(val.value) }]
    case 'boolean':  return [{ type: 'text', value: String(val.value) }]
    case 'none':     return []
    case 'markdown': return val.nodes as any[]
    case 'iterable': return val.items.flatMap(valueToNodes)
    case 'range': {
      const items: any[] = []
      for (let i = val.from; i <= val.to; i++) {
        items.push({ type: 'text', value: String(i) })
      }
      return items
    }
    default:
      return [{ type: 'text', value: String((val as any).value ?? '') }]
  }
}

export function iterateValue(val: QdValue): QdValue[] {
  if (val.kind === 'iterable') return val.items
  if (val.kind === 'range') {
    const items: QdValue[] = []
    for (let i = val.from; i <= val.to; i++) {
      items.push({ kind: 'number', value: i })
    }
    return items
  }
  // A single number literal used as repeat count: treat as 1..n
  if (val.kind === 'number') {
    const items: QdValue[] = []
    for (let i = 1; i <= val.value; i++) {
      items.push({ kind: 'number', value: i })
    }
    return items
  }
  return [val]
}

export function toBool(val: QdValue): boolean {
  if (val.kind === 'boolean') return val.value
  if (val.kind === 'string') return val.value === 'true'
  if (val.kind === 'number') return val.value !== 0
  if (val.kind === 'none') return false
  return true
}
