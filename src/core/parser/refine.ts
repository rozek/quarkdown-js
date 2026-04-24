/**
 * QuarkdownJS — Refine Plugin (Stage 3)
 *
 * Converts raw QdChainNode and QdFunctionCallNode instances into typed
 * structural nodes (QdFunctionDefNode, QdVariableDefNode, QdLetNode,
 * QdConditionalNode, QdLoopNode, QdMetadataNode).
 *
 * Three passes run in sequence:
 *   1. Flatten QdChainNode → nested QdFunctionCallNode
 *   2. Re-parse literal args that start with '.' into nested calls
 *   3. Detect known structural call names and replace with typed nodes
 */

import type { Plugin } from 'unified'
import type { Root } from 'mdast'
import type {
  QdFunctionCallNode,
  QdChainNode,
  QdFunctionDefNode,
  QdVariableDefNode,
  QdLetNode,
  QdConditionalNode,
  QdLoopNode,
  QdMetadataNode,
  QdParamSpec,
  QdArgument,
  QdRawArg,
} from '../ast/index.js'

// ---------------------------------------------------------------------------
// Re-use balanced-brace extraction and arg parsing from walk logic (inline)
// ---------------------------------------------------------------------------

/** Named identifier pattern (no dot) used in arg extraction */
const NAMED_ARG_PREFIX_RE = /^([a-zA-Z_][a-zA-Z0-9_]*):\{/

function extractOneBlock(
  text: string,
  pos: number,
): { content: string; endPos: number } | null {
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
  return { content: text.slice(start, pos), endPos: pos + 1 }
}

function extractBracedArgs(
  text: string,
  startPos: number,
): { args: string[]; endPos: number } | null {
  const args: string[] = []
  let pos = startPos
  while (pos < text.length) {
    while (pos < text.length && /[ \t\r\n]/.test(text[pos])) pos++
    if (pos >= text.length) break
    const namedMatch = text.slice(pos).match(NAMED_ARG_PREFIX_RE)
    if (namedMatch) {
      const keyLen = namedMatch[1].length
      const bracePos = pos + keyLen + 1
      const block = extractOneBlock(text, bracePos)
      if (block === null) return null
      args.push(namedMatch[1] + ':' + block.content)
      pos = block.endPos
      continue
    }
    if (text[pos] === '{') {
      const block = extractOneBlock(text, pos)
      if (block === null) return null
      args.push(block.content)
      pos = block.endPos
      continue
    }
    break
  }
  return { args, endPos: pos }
}

const NAME_RE = /^\.([a-zA-Z_][a-zA-Z0-9_]*)/
const CHAIN_SEP = '::'

function tryParseCallInRefiner(
  text: string,
  inline: boolean,
): QdFunctionCallNode | QdChainNode | null {
  if (!text.startsWith('.')) return null
  const nameMatch = text.match(NAME_RE)
  if (!nameMatch) return null

  let pos = nameMatch[0].length
  const firstName = nameMatch[1]

  // Per-step chain: each step extracts its own args before the next ::
  const steps: Array<{ name: string; args: QdArgument[] }> = []

  const firstExtracted = extractBracedArgs(text, pos)
  if (firstExtracted === null) return null
  steps.push({ name: firstName, args: firstExtracted.args.map(parseArgumentInRefiner) })
  pos = firstExtracted.endPos

  while (text.startsWith(CHAIN_SEP, pos)) {
    pos += CHAIN_SEP.length
    const nextName = text.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
    if (!nextName) break
    pos += nextName[0].length
    const stepExtracted = extractBracedArgs(text, pos)
    if (stepExtracted === null) break
    steps.push({ name: nextName[0], args: stepExtracted.args.map(parseArgumentInRefiner) })
    pos = stepExtracted.endPos
  }

  if (steps.length > 1) {
    return { type: 'qdChain', steps }
  }

  return { type: 'qdFunctionCall', name: firstName, args: steps[0].args, inline }
}

function parseRawArgInRefiner(content: string): QdRawArg {
  const trimmed = content.trim()
  if (trimmed.startsWith('.')) {
    const nested = tryParseCallInRefiner(trimmed, false)
    if (nested !== null) {
      if (nested.type === 'qdChain') {
        return { tag: 'chain', nodes: nested as QdChainNode }
      }
      return { tag: 'call', node: nested as QdFunctionCallNode }
    }
  }
  return { tag: 'literal', text: trimmed }
}

function parseArgumentInRefiner(argText: string): QdArgument {
  const trimmed = argText.trim()
  const namedMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(?!\/\/)(.*)$/s)
  if (namedMatch) {
    return { name: namedMatch[1], value: parseRawArgInRefiner(namedMatch[2]) }
  }
  return { name: undefined, value: parseRawArgInRefiner(trimmed) }
}

// ---------------------------------------------------------------------------
// Pass 1: flatten QdChainNode into nested QdFunctionCallNode
// ---------------------------------------------------------------------------

/**
 * Given a QdChainNode, produce a single QdFunctionCallNode where each step
 * wraps the previous step as its first argument.
 *
 * .a::b {y}  →  b(a(), y)
 * .a::b::c   →  c(b(a()))
 */
function flattenChain(chain: QdChainNode): QdFunctionCallNode {
  const steps = chain.steps

  // Build the innermost call from step 0 (no args — first step is always a
  // bare identifier / variable reference in chain syntax)
  let current: QdFunctionCallNode = {
    type: 'qdFunctionCall',
    name: steps[0].name,
    args: steps[0].args ?? [],
    inline: false,
  }

  // Wrap each subsequent step
  for (let i = 1; i < steps.length; i++) {
    const step = steps[i]
    const chainArg: QdArgument = {
      name: undefined,
      value: { tag: 'call', node: current },
    }
    // The chained value is inserted as the FIRST argument
    const stepArgs: QdArgument[] = [chainArg, ...(step.args ?? [])]
    current = {
      type: 'qdFunctionCall',
      name: step.name,
      args: stepArgs,
      inline: false,
    }
  }

  return current
}

// ---------------------------------------------------------------------------
// Pass 2: re-parse literal args that start with '.'
// ---------------------------------------------------------------------------

function reparseLiteralArgs(args: QdArgument[]): QdArgument[] {
  return args.map((arg) => {
    if (arg.value.tag === 'literal' && arg.value.text.startsWith('.')) {
      const nested = tryParseCallInRefiner(arg.value.text, false)
      if (nested !== null) {
        if (nested.type === 'qdChain') {
          return { ...arg, value: { tag: 'chain', nodes: nested as QdChainNode } }
        }
        return { ...arg, value: { tag: 'call', node: nested as QdFunctionCallNode } }
      }
    }
    return arg
  })
}

// ---------------------------------------------------------------------------
// Pass 3: detect structural calls by name
// ---------------------------------------------------------------------------

/**
 * Get the text value from the first positional literal arg, or '' if missing.
 */
function firstLiteralText(args: QdArgument[], index = 0): string {
  const positional = args.filter((a) => a.name === undefined)
  const arg = positional[index]
  if (!arg) return ''
  if (arg.value.tag === 'literal') return arg.value.text
  return ''
}

/**
 * Get the raw arg at positional index (among positional args).
 */
function positionalArg(args: QdArgument[], index: number): QdRawArg | undefined {
  const positional = args.filter((a) => a.name === undefined)
  return positional[index]?.value
}

/**
 * Get the raw text content of the first text node in a block arg's nodes array.
 * Returns '' if the block is empty or contains no text nodes.
 */
function blockBodyText(blockNodes: any[]): string {
  if (!blockNodes || blockNodes.length === 0) return ''
  const firstNode = blockNodes[0]
  if (!firstNode) return ''
  // Paragraph with text children
  if (firstNode.type === 'paragraph' && Array.isArray(firstNode.children)) {
    return firstNode.children
      .filter((c: any) => c.type === 'text')
      .map((c: any) => c.value ?? '')
      .join('')
  }
  // Text node directly
  if (firstNode.type === 'text') return firstNode.value ?? ''
  return ''
}

/**
 * Extract params and body nodes from a block arg, preserving rich inline AST.
 * Param declarations (lines matching "name:" or "name?:") are stripped from
 * the leading text of the first paragraph. All other inline nodes (strong, em,
 * inline code, etc.) are preserved.
 */
function extractParamsFromBlock(rawNodes: any[]): { params: QdParamSpec[]; bodyNodes: any[] } {
  if (!rawNodes || rawNodes.length === 0) return { params: [], bodyNodes: [] }

  const firstNode = rawNodes[0]
  if (!firstNode || firstNode.type !== 'paragraph' || !Array.isArray(firstNode.children)) {
    return { params: [], bodyNodes: rawNodes }
  }

  // Walk through the first paragraph's children extracting params from leading text
  const params: QdParamSpec[] = []
  const remainingChildren: any[] = []
  let pastParams = false

  for (const child of firstNode.children) {
    if (!pastParams && child.type === 'text') {
      const lines = (child.value ?? '').split('\n')
      const remainingLines: string[] = []
      let innerPastParams = false

      for (const line of lines) {
        if (!innerPastParams) {
          const paramMatch = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)(\?)?:$/)
          if (paramMatch) {
            params.push({ name: paramMatch[1], optional: paramMatch[2] === '?', isBody: false })
            continue
          } else {
            innerPastParams = true
          }
        }
        remainingLines.push(line)
      }

      const remaining = remainingLines.join('\n').replace(/^\n/, '')
      if (remaining) {
        remainingChildren.push({ type: 'text', value: remaining })
      }

      if (params.length > 0) pastParams = true
    } else {
      remainingChildren.push(child)
    }
  }

  if (params.length > 0) {
    params[params.length - 1].isBody = true
  }

  // Build body nodes: first paragraph with remaining children + rest of rawNodes
  const bodyNodes: any[] = []
  if (remainingChildren.length > 0) {
    bodyNodes.push({ ...firstNode, children: remainingChildren })
  }
  bodyNodes.push(...rawNodes.slice(1))

  return { params, bodyNodes }
}

/**
 * Extract QdParamSpec entries from the body arg text of a .function call.
 *
 * Lines that match `paramName:` or `paramName?:` (at the start of a line) are
 * treated as parameter declarations and removed from the body text.
 */
function extractParams(bodyText: string): { params: QdParamSpec[]; remaining: string } {
  const lines = bodyText.split('\n')
  const params: QdParamSpec[] = []
  const bodyLines: string[] = []
  let pastParams = false

  for (const line of lines) {
    if (!pastParams) {
      const paramMatch = line.trim().match(/^([a-zA-Z_][a-zA-Z0-9_]*)(\?)?:$/)
      if (paramMatch) {
        params.push({
          name: paramMatch[1],
          optional: paramMatch[2] === '?',
          isBody: false,
        })
        continue
      } else {
        pastParams = true
      }
    }
    bodyLines.push(line)
  }

  // Mark the last param that is likely a body param (optional heuristic: the
  // last param whose trailing content would be markdown body)
  if (params.length > 0) {
    params[params.length - 1].isBody = true
  }

  return { params, remaining: bodyLines.join('\n') }
}

/**
 * Convert a QdFunctionCallNode into a typed structural node, or return the
 * original node if the name is not a known structural keyword.
 */
function detectStructural(
  node: QdFunctionCallNode,
): QdFunctionCallNode | QdFunctionDefNode | QdVariableDefNode | QdLetNode | QdConditionalNode | QdLoopNode | QdMetadataNode {
  const { name, args } = node

  switch (name) {
    case 'function': {
      const funcName = firstLiteralText(args, 0)
      // Body arg: could be a block arg or the second positional literal
      const bodyArgRaw = positionalArg(args, 1)

      let params: QdParamSpec[] = []
      let bodyNodes: any[] = []

      if (bodyArgRaw) {
        if (bodyArgRaw.tag === 'literal') {
          const extracted = extractParams(bodyArgRaw.text)
          params = extracted.params
          bodyNodes = extracted.remaining
            ? [{ type: 'paragraph', children: [{ type: 'text', value: extracted.remaining }] }]
            : []
        } else if (bodyArgRaw.tag === 'block') {
          // Block body — extract params preserving rich inline AST
          const rawNodes = (bodyArgRaw as any).nodes ?? []
          const extracted = extractParamsFromBlock(rawNodes)
          params = extracted.params
          bodyNodes = extracted.bodyNodes
          return {
            type: 'qdFunctionDef',
            name: funcName,
            params,
            body: bodyNodes,
          } as QdFunctionDefNode
        }
      }

      // Also check for block arg in args (no matter position)
      const blockArg = args.find((a) => a.value.tag === 'block')
      if (blockArg && blockArg.value.tag === 'block') {
        const rawNodes = (blockArg.value as any).nodes ?? []
        const extracted = extractParamsFromBlock(rawNodes)
        params = extracted.params
        bodyNodes = extracted.bodyNodes
        return {
          type: 'qdFunctionDef',
          name: funcName,
          params,
          body: bodyNodes,
        } as QdFunctionDefNode
      }

      return {
        type: 'qdFunctionDef',
        name: funcName,
        params,
        body: bodyNodes,
      } as QdFunctionDefNode
    }

    case 'var': {
      const varName = firstLiteralText(args, 0)
      const initializer = positionalArg(args, 1) ?? { tag: 'literal', text: '' }
      return {
        type: 'qdVariableDef',
        name: varName,
        initializer,
      } as QdVariableDefNode
    }

    case 'let': {
      const letName = firstLiteralText(args, 0)
      const letValue = positionalArg(args, 1) ?? { tag: 'literal', text: '' }
      // Body can be third positional arg or a block arg
      const blockArg = args.find((a) => a.value.tag === 'block')
      const bodyNodes = blockArg && blockArg.value.tag === 'block'
        ? (blockArg.value as any).nodes ?? []
        : []
      return {
        type: 'qdLet',
        name: letName,
        initializer: letValue,
        body: bodyNodes,
      } as QdLetNode
    }

    case 'if':
    case 'ifnot': {
      const condition = positionalArg(args, 0) ?? { tag: 'literal', text: '' }
      const bodyArg = positionalArg(args, 1)
      const blockArg = args.find((a) => a.value.tag === 'block')
      const consequentNodes = blockArg && blockArg.value.tag === 'block'
        ? (blockArg.value as any).nodes ?? []
        : bodyArg && bodyArg.tag === 'literal'
          ? [{ type: 'paragraph', children: [{ type: 'text', value: (bodyArg as any).text }] }]
          : []
      return {
        type: 'qdConditional',
        negate: name === 'ifnot',
        condition,
        consequent: consequentNodes,
      } as QdConditionalNode
    }

    case 'foreach': {
      const iterable = positionalArg(args, 0) ?? { tag: 'literal', text: '' }
      // The param name may come from a named arg or the block body's first line
      const namedParam = args.find((a) => a.name !== undefined)
      let param = '_'

      const blockArg = args.find((a) => a.value.tag === 'block')
      let bodyNodes: any[] = blockArg && blockArg.value.tag === 'block'
        ? (blockArg.value as any).nodes ?? []
        : []

      if (namedParam) {
        param = namedParam.name!
      } else if (bodyNodes.length > 0) {
        // Use extractParamsFromBlock to extract param declarations while preserving
        // rich inline AST nodes (strong, em, etc.) in the body.
        const extracted = extractParamsFromBlock(bodyNodes)
        if (extracted.params.length > 0) {
          param = extracted.params[0].name
          bodyNodes = extracted.bodyNodes
        } else {
          // Fallback: check second positional arg
          const secondArg = positionalArg(args, 1)
          if (secondArg && secondArg.tag === 'literal') {
            param = (secondArg as any).text || '_'
          }
        }
      }

      return {
        type: 'qdLoop',
        iterable,
        param,
        body: bodyNodes,
      } as QdLoopNode
    }

    case 'repeat': {
      const countArg = positionalArg(args, 0) ?? { tag: 'literal', text: '0' }
      // For repeat, iterable = range(1..n); we represent this as a literal for now
      // The expander will handle converting it to a range
      const blockArg = args.find((a) => a.value.tag === 'block')
      const bodyNodes = blockArg && blockArg.value.tag === 'block'
        ? (blockArg.value as any).nodes ?? []
        : []
      return {
        type: 'qdLoop',
        iterable: countArg,
        param: '_',
        body: bodyNodes,
      } as QdLoopNode
    }

    case 'doctype':
      return {
        type: 'qdMetadata',
        key: 'type',
        value: firstLiteralText(args, 0),
      } as QdMetadataNode

    case 'docname':
      return {
        type: 'qdMetadata',
        key: 'name',
        value: firstLiteralText(args, 0),
      } as QdMetadataNode

    case 'author':
      return {
        type: 'qdMetadata',
        key: 'author',
        value: firstLiteralText(args, 0),
      } as QdMetadataNode

    case 'lang':
      return {
        type: 'qdMetadata',
        key: 'lang',
        value: firstLiteralText(args, 0),
      } as QdMetadataNode

    case 'theme': {
      const color = firstLiteralText(args, 0)
      const layout = firstLiteralText(args, 1)
      return {
        type: 'qdMetadata',
        key: 'theme',
        value: layout ? `${color} ${layout}` : color,
      } as QdMetadataNode
    }

    default:
      return node
  }
}

// ---------------------------------------------------------------------------
// Deep traversal helper — visits every node in the tree
// ---------------------------------------------------------------------------

type AnyTreeNode = any

/**
 * Recursively transform all nodes in `children` (an array), applying
 * `transformNode` to each element. Also recurse into known sub-structures.
 */
function transformChildren(children: AnyTreeNode[]): AnyTreeNode[] {
  const result: AnyTreeNode[] = []
  for (const child of children) {
    result.push(transformNode(child))
  }
  return result
}

function transformArgs(args: QdArgument[]): QdArgument[] {
  return args.map((arg) => {
    if (arg.value.tag === 'call') {
      const refined = transformNode(arg.value.node) as QdFunctionCallNode
      return { ...arg, value: { tag: 'call', node: refined } }
    }
    if (arg.value.tag === 'block') {
      return {
        ...arg,
        value: { tag: 'block', nodes: transformChildren((arg.value as any).nodes ?? []) },
      }
    }
    return arg
  })
}

/**
 * Transform a single node: applies chain flattening, arg re-parsing, and
 * structural detection in order. Then recurses into children / args.
 */
function transformNode(node: AnyTreeNode): AnyTreeNode {
  if (!node || typeof node !== 'object') return node

  // -- Chain flattening (Pass 1) --
  if (node.type === 'qdChain') {
    const flattened = flattenChain(node as QdChainNode)
    return transformNode(flattened)
  }

  // -- QdFunctionCallNode processing --
  if (node.type === 'qdFunctionCall') {
    const callNode = node as QdFunctionCallNode

    // Pass 2: re-parse literal args that start with '.'
    const reparsedArgs = reparseLiteralArgs(callNode.args)
    const nodeWithReparsed: QdFunctionCallNode = { ...callNode, args: reparsedArgs }

    // Pass 3: detect structural call
    const structural = detectStructural(nodeWithReparsed)

    // Recurse into args / body of the resulting node
    return recurseIntoNode(structural)
  }

  // For other node types, recurse into children
  return recurseIntoNode(node)
}

/**
 * Recurse into all known child-holding fields of a node.
 */
function recurseIntoNode(node: AnyTreeNode): AnyTreeNode {
  const result = { ...node }

  if (Array.isArray(result.children)) {
    result.children = transformChildren(result.children)
  }
  if (Array.isArray(result.args)) {
    result.args = transformArgs(result.args)
  }
  if (Array.isArray(result.body)) {
    result.body = transformChildren(result.body)
  }
  if (Array.isArray(result.consequent)) {
    result.consequent = transformChildren(result.consequent)
  }

  return result
}

// ---------------------------------------------------------------------------
// The remark Plugin
// ---------------------------------------------------------------------------

export const refinePlugin: Plugin<[], Root> = () => {
  return (tree: Root) => {
    // Transform children of root in place
    const rootAny = tree as any
    if (Array.isArray(rootAny.children)) {
      rootAny.children = transformChildren(rootAny.children)
    }
  }
}
