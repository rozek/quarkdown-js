/**
 * QuarkdownJS — Walk Plugin (Stage 2)
 *
 * A unified/remark transformer plugin that detects Quarkdown function-call
 * syntax in the mdast tree and injects QdFunctionCallNode / QdChainNode nodes.
 *
 * Design decisions:
 * - Runs as a post-parse transformer (not during tokenisation) to keep
 *   integration with remark-parse / remark-gfm straightforward.
 * - Paragraph nodes whose serialised text starts with `.name` are treated as
 *   block calls; `.name` patterns inside Text nodes become inline calls.
 * - Balanced-brace extraction handles arbitrary nesting depth.
 * - Chaining (`::`) is detected in the name segment and emits QdChainNode.
 * - Unclosed braces are silently skipped (the original text is left intact).
 */

import { visit, SKIP } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root, Paragraph, Text, Node } from 'mdast'
import type {
  QdFunctionCallNode,
  QdChainNode,
  QdArgument,
  QdRawArg,
} from '../ast/index.js'

// ---------------------------------------------------------------------------
// Regex helpers
// ---------------------------------------------------------------------------

/** Matches a Quarkdown function name: dot + identifier */
const NAME_RE = /^\.([a-zA-Z_][a-zA-Z0-9_]*)/

/** Matches the `::` chain separator immediately after a name (no spaces) */
const CHAIN_SEP = '::'

// ---------------------------------------------------------------------------
// Balanced-brace extraction
// ---------------------------------------------------------------------------

/** Named identifier pattern (no dot) used in arg extraction */
const NAMED_ARG_PREFIX_RE = /^([a-zA-Z_][a-zA-Z0-9_]*):\{/

/**
 * Extract a single balanced `{…}` block starting exactly at `pos` (which must
 * point at `{`).  Returns the inner content and the position after the closing
 * `}`, or `null` on unclosed brace.
 */
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

/**
 * Starting at `startPos` in `text`, scan for consecutive argument tokens.
 *
 * An argument token is either:
 * - `{…}` — a positional braced argument; returned as-is (inner content)
 * - `identifier:{…}` — a named argument; returned as `identifier:innerContent`
 *   so that `parseArgument` can split on the first `:`.
 *
 * Returns the extracted raw argument strings and the position immediately
 * after the last token.  Returns `null` if any `{` is opened but unclosed.
 */
function extractBracedArgs(
  text: string,
  startPos: number,
): { args: string[]; endPos: number } | null {
  const args: string[] = []
  let pos = startPos

  while (pos < text.length) {
    // Save position before skipping whitespace so we can restore it if no
    // argument token follows. This ensures trailing inter-argument whitespace
    // is NOT consumed when no further argument is present, which preserves
    // surrounding spaces in inline text like "} is an .next".
    const savedPos = pos

    // Skip whitespace between arguments
    while (pos < text.length && /[ \t\r\n]/.test(text[pos])) pos++

    if (pos >= text.length) {
      // Consumed only trailing whitespace — restore to avoid eating it
      pos = savedPos
      break
    }

    // Check for named argument: `identifier:{…}`
    const namedMatch = text.slice(pos).match(NAMED_ARG_PREFIX_RE)
    if (namedMatch) {
      const keyLen = namedMatch[1].length // length of identifier
      const bracePos = pos + keyLen + 1   // position of `{`
      const block = extractOneBlock(text, bracePos)
      if (block === null) return null      // unclosed brace
      args.push(namedMatch[1] + ':' + block.content)
      pos = block.endPos
      continue
    }

    // Positional braced argument: `{…}`
    if (text[pos] === '{') {
      const block = extractOneBlock(text, pos)
      if (block === null) return null
      args.push(block.content)
      pos = block.endPos
      continue
    }

    // No more argument tokens — restore savedPos so the whitespace before the
    // non-argument character is not consumed (Bug 2 fix: space preservation).
    pos = savedPos
    break
  }

  return { args, endPos: pos }
}

// ---------------------------------------------------------------------------
// Parse a single argument string into a QdRawArg
// ---------------------------------------------------------------------------

function parseRawArg(content: string): QdRawArg {
  const trimmed = content.trim()

  // Nested function / chain call?
  if (trimmed.startsWith('.')) {
    const nested = tryParseCall(trimmed, false)
    if (nested !== null) {
      if (nested.type === 'qdChain') {
        return { tag: 'chain', nodes: nested as QdChainNode }
      }
      return { tag: 'call', node: nested as QdFunctionCallNode }
    }
  }

  // Otherwise treat as a literal string
  return { tag: 'literal', text: trimmed }
}

/**
 * Inspect an argument string for a possible `name:value` named-argument
 * prefix and return { name?, value }.
 */
function parseArgument(argText: string): QdArgument {
  const trimmed = argText.trim()

  // Named arg pattern: identifier: (no space before colon)
  // But we must be careful not to match e.g. `http://...` — require that
  // what follows the colon is NOT `//`.
  const namedMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(?!\/\/)(.*)$/s)
  if (namedMatch) {
    return {
      name: namedMatch[1],
      value: parseRawArg(namedMatch[2]),
    }
  }

  return { name: undefined, value: parseRawArg(trimmed) }
}

// ---------------------------------------------------------------------------
// Core: try to parse a complete Quarkdown call (or chain) from `text`
// ---------------------------------------------------------------------------

/**
 * Attempts to parse `text` (starting from position 0) as a Quarkdown
 * function call or chain.
 *
 * Handles two chain syntaxes:
 *   - Compact: `.a::b::c {args}` — names collected first, args on last step
 *   - Per-step: `.a {args1}::b {args2}::c {args3}` — each step has own args
 *
 * Returns a `QdFunctionCallNode`, `QdChainNode`, or `null` if no match.
 * `inline` controls the `inline` flag on emitted nodes.
 */
function tryParseCall(
  text: string,
  inline: boolean,
): QdFunctionCallNode | QdChainNode | null {
  if (!text.startsWith('.')) return null

  const nameMatch = text.match(NAME_RE)
  if (!nameMatch) return null

  let pos = nameMatch[0].length
  const firstName = nameMatch[1]

  // Collect steps with their individual args (per-step chain syntax)
  const steps: Array<{ name: string; args: QdArgument[] }> = []

  // Extract args for the first step
  const firstExtracted = extractBracedArgs(text, pos)
  if (firstExtracted === null) return null
  steps.push({ name: firstName, args: firstExtracted.args.map(parseArgument) })
  pos = firstExtracted.endPos

  // Check for additional chain steps (:: may come after the step's own args)
  while (text.startsWith(CHAIN_SEP, pos)) {
    pos += CHAIN_SEP.length
    const nextName = text.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
    if (!nextName) break
    pos += nextName[0].length
    const stepExtracted = extractBracedArgs(text, pos)
    if (stepExtracted === null) break
    steps.push({ name: nextName[0], args: stepExtracted.args.map(parseArgument) })
    pos = stepExtracted.endPos
  }

  // Single step — ordinary function call
  if (steps.length === 1) {
    return {
      type: 'qdFunctionCall',
      name: steps[0].name,
      args: steps[0].args,
      inline,
    }
  }

  // Multi-step — emit a QdChainNode
  return {
    type: 'qdChain',
    steps,
  }
}

// ---------------------------------------------------------------------------
// Block-call detection
// ---------------------------------------------------------------------------

/**
 * Given the full serialised text content of a paragraph, check if it starts
 * with a Quarkdown function call.  Returns the parsed node and the remaining
 * text (block body lines), or null if no call was detected.
 *
 * When remark-parse collapses a block call + indented body into a single
 * paragraph, the paragraph text looks like:
 *   ".foreach {1..3}\nn:\nItem .n"
 * The first line is the call; subsequent lines are the block body.
 */
function tryParseBlockCall(
  text: string,
): { node: QdFunctionCallNode | QdChainNode; bodyText: string } | null {
  const trimmed = text.trimStart()
  if (!trimmed.startsWith('.')) return null

  // Split on first newline to separate the call line from body lines
  const nlIdx = trimmed.indexOf('\n')
  const callLine = nlIdx >= 0 ? trimmed.slice(0, nlIdx) : trimmed
  const bodyText = nlIdx >= 0 ? trimmed.slice(nlIdx + 1) : ''

  const node = tryParseCall(callLine, false)
  if (!node) return null

  return { node, bodyText }
}

/**
 * Extract block body children from a paragraph's children array.
 * Splits the paragraph children at the first newline found in a text node
 * that occurs after the call line. Returns remaining children (with rich
 * inline nodes like strong/em preserved) as body paragraph children.
 *
 * `callLineLength` is the character length of the call line (excluding newline)
 * measured on the serialized text.
 */
function extractBodyChildren(paraChildren: any[], callLineText: string): any[] {
  // Find the newline that separates the call line from the body in the
  // first text node. The call line text was already extracted from the
  // serialized text; we need to find where in the children array it ends.
  let charsToSkip = callLineText.length + 1 // +1 for the newline

  const bodyChildren: any[] = []
  let done = false

  for (const child of paraChildren) {
    if (done) {
      bodyChildren.push(child)
      continue
    }

    if (child.type === 'text') {
      const value: string = child.value ?? ''
      if (charsToSkip > 0) {
        if (charsToSkip >= value.length) {
          charsToSkip -= value.length
          // Entire text node is consumed as part of the call line
        } else {
          // Part of this text node is call line, rest is body
          const remaining = value.slice(charsToSkip)
          charsToSkip = 0
          done = true
          if (remaining) bodyChildren.push({ type: 'text', value: remaining })
        }
      } else {
        bodyChildren.push(child)
      }
    } else {
      // Non-text child (strong, em, etc.) — once charsToSkip reaches 0
      // they belong to body
      if (charsToSkip <= 0) {
        done = true
        bodyChildren.push(child)
      }
      // If charsToSkip > 0, non-text nodes don't count against charsToSkip
      // since they're inline markup — they contribute 0 chars to serialized text
      // so just pass them through once we're past the call line
      else {
        done = true
        bodyChildren.push(child)
      }
    }
  }

  return bodyChildren
}

// ---------------------------------------------------------------------------
// Inline-call detection inside a Text node
// ---------------------------------------------------------------------------

/**
 * Pattern for a tight inline call: `{.name ...}` — the braces belong to the
 * surrounding text, not to the call's argument list.
 */
const TIGHT_CALL_RE = /\{(\.[a-zA-Z_][a-zA-Z0-9_]*(?:::[a-zA-Z_][a-zA-Z0-9_]*)*(?:\s*\{[^}]*\})*)\}/g

/**
 * Pattern for a bare inline call: `.name` appearing inside flowing text.
 * Must not be at the very start of a paragraph (those become block calls).
 */
const INLINE_CALL_RE = /(\.[a-zA-Z_][a-zA-Z0-9_]*(?:::[a-zA-Z_][a-zA-Z0-9_]*)*(?:\s*\{(?:[^{}]|\{[^{}]*\})*\})*)/g

// ---------------------------------------------------------------------------
// Helper: serialise text children of a paragraph
// ---------------------------------------------------------------------------

function paragraphText(node: Paragraph): string {
  let text = ''
  for (const child of node.children) {
    if (child.type === 'text') text += (child as Text).value
    else if (child.type === 'inlineCode') text += (child as any).value
  }
  return text
}

// ---------------------------------------------------------------------------
// Body re-parser for indented code blocks
// ---------------------------------------------------------------------------

/**
 * Convert a bullet-list item text (the text after "- " or "* ") into a
 * listItem mdast node.
 */
function makeListItem(text: string): any {
  return {
    type: 'listItem',
    spread: false,
    children: [
      { type: 'paragraph', children: [{ type: 'text', value: text }] },
    ],
  }
}

/**
 * Re-parse the content of an indented code block produced by remark-parse
 * back into proper mdast nodes.
 *
 * remark-parse converts 4-space-indented content after a blank line into a
 * `code` node.  When that content is the body continuation of a Quarkdown
 * function call (e.g. the list items of a `.var` body), we need to recover
 * the original nodes.
 *
 * Currently handles:
 *  - Unordered lists: lines starting with "- " or "* "
 *  - Ordered lists: lines starting with "N. "
 *  - Plain paragraphs (fallback for everything else)
 *
 * Returns an empty array if the content cannot be meaningfully re-parsed
 * (e.g. it is actual code content that should remain as-is).
 */
function reparseFencedBody(value: string): any[] {
  const allLines = value.split('\n')
  if (allLines.every(l => l.trim() === '')) return []

  // Check if content is a single homogeneous block first (fast path).
  const nonEmptyLines = allLines.filter(l => l.trim() !== '')

  // Detect unordered list (all non-empty lines are bullet items)
  const bulletRe = /^[-*] (.+)$/
  if (nonEmptyLines.every(l => bulletRe.test(l.trim()))) {
    const items = nonEmptyLines.map(l => {
      const m = l.trim().match(bulletRe)!
      return makeListItem(m[1])
    })
    return [{ type: 'list', ordered: false, spread: false, children: items }]
  }

  // Detect ordered list (all non-empty lines are ordered items)
  const orderedRe = /^\d+\. (.+)$/
  if (nonEmptyLines.every(l => orderedRe.test(l.trim()))) {
    const items = nonEmptyLines.map(l => {
      const m = l.trim().match(orderedRe)!
      return makeListItem(m[1])
    })
    return [{ type: 'list', ordered: true, spread: false, children: items }]
  }

  // Mixed/complex content: split by blank lines and process each chunk.
  // Handles `---` (thematic breaks), `.name` (function calls), and plain text.
  const result: any[] = []

  // Split into chunks separated by blank lines
  const chunks: string[][] = []
  let currentChunk: string[] = []
  for (const line of allLines) {
    if (line.trim() === '') {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk)
        currentChunk = []
      }
    } else {
      currentChunk.push(line)
    }
  }
  if (currentChunk.length > 0) chunks.push(currentChunk)

  for (const chunk of chunks) {
    const chunkText = chunk.join('\n').trim()

    // Thematic break: a line that is `---`, `***`, or `___` (3+ chars)
    if (/^(---+|\*\*\*+|___+)$/.test(chunkText)) {
      result.push({ type: 'thematicBreak' })
      continue
    }

    // Function call: starts with `.name`
    if (chunkText.startsWith('.')) {
      const callNode = tryParseCall(chunkText, false)
      if (callNode) {
        // Check if there is body content in subsequent lines of the chunk
        const nlIdx = chunkText.indexOf('\n')
        const bodyText = nlIdx >= 0 ? chunkText.slice(nlIdx + 1).trim() : ''
        if (bodyText && callNode.type === 'qdFunctionCall') {
          const fc = callNode as QdFunctionCallNode
          // Attach body as block arg if no positional arg yet
          if (!fc.args.some((a: QdArgument) => a.name === undefined)) {
            fc.args.push({
              name: undefined,
              value: {
                tag: 'block',
                nodes: [{ type: 'paragraph', children: [{ type: 'text', value: bodyText }] }],
              },
            })
          }
        }
        result.push(callNode)
        continue
      }
    }

    // Bullet list chunk
    if (chunk.every(l => bulletRe.test(l.trim()))) {
      const items = chunk.map(l => {
        const m = l.trim().match(bulletRe)!
        return makeListItem(m[1])
      })
      result.push({ type: 'list', ordered: false, spread: false, children: items })
      continue
    }

    // Ordered list chunk
    if (chunk.every(l => orderedRe.test(l.trim()))) {
      const items = chunk.map(l => {
        const m = l.trim().match(orderedRe)!
        return makeListItem(m[1])
      })
      result.push({ type: 'list', ordered: true, spread: false, children: items })
      continue
    }

    // Fallback: paragraph
    result.push({
      type: 'paragraph',
      children: [{ type: 'text', value: chunkText }],
    })
  }

  return result
}

// ---------------------------------------------------------------------------
// The remark Plugin
// ---------------------------------------------------------------------------

export const walkPlugin: Plugin<[], Root> = () => {
  return (tree: Root) => {
    // -----------------------------------------------------------------------
    // Pass 1: block calls
    // Transform Paragraph nodes that start with a QD function call.
    // We replace them with the parsed node directly under their parent.
    // -----------------------------------------------------------------------

    /**
     * Functions that are always inline (return inline span nodes).
     * Paragraphs starting with these names are left as paragraphs so that
     * Pass 3 (inline call detection) handles them correctly.
     */
    const INLINE_ONLY_FUNCTIONS = new Set([
      'text',
    ])

    visit(tree, 'paragraph', (node: Paragraph, index, parent: any) => {
      if (typeof index !== 'number' || !parent) return

      const text = paragraphText(node)
      if (!text.trimStart().startsWith('.')) return

      const result = tryParseBlockCall(text)
      if (!result) return

      // Skip block-call treatment for known inline-only functions —
      // let Pass 3 handle them as inline calls within the paragraph.
      if (result.node.type === 'qdFunctionCall' &&
          INLINE_ONLY_FUNCTIONS.has((result.node as QdFunctionCallNode).name)) {
        return
      }

      const { node: parsed, bodyText } = result

      if (parsed.type === 'qdFunctionCall') {
        const callNode = parsed as QdFunctionCallNode

        // Determine the call line text for extractBodyChildren
        const trimmedText = text.trimStart()
        const nlPos = trimmedText.indexOf('\n')
        const callLineText = nlPos >= 0 ? trimmedText.slice(0, nlPos) : trimmedText

        // If bodyText starts with '.' it may be:
        //  (a) A single-line nested call that is the body of the parent:
        //      e.g. `.code lang:{java}\n    .read {file.java}` — bodyText is a
        //      single call that should be passed as a call-arg.
        //  (b) A multi-line block body whose first element is a nested call:
        //      e.g. `.row\n    .container\n        A\nB` — here the bodyText is
        //      `.container\nA\nB`, meaning container is a child of row.
        //  (c) Multiple sibling calls collapsed into one paragraph:
        //      e.g. `.doctype {plain}\n.docname {QuarkdownJS...}` — the body
        //      text is multiple independent calls that should be treated as
        //      siblings of the parent call.
        //
        // We distinguish (c) from (a)/(b) by checking whether the immediately
        // following content in bodyText (after the first complete call) starts
        // a NEW call on its own line (i.e. `\n.`).  In that case we split the
        // entire bodyText into sibling paragraphs so each call is processed
        // independently.  Cases (a) and (b) are for when the first call either
        // has NO braced args (b: it has a body) or has a single-line body (a).
        if (bodyText.startsWith('.')) {
          const hasNonLiteralPositionalArg = callNode.args.some(
            (a: any) => a.name === undefined && a.value?.tag !== 'literal',
          )

          // Check for sibling calls: if bodyText has a line-break followed by
          // another `.name` pattern, the calls are siblings (case c).
          const siblingCallRe = /\n\.[a-zA-Z_]/
          if (siblingCallRe.test(bodyText)) {
            // Split bodyText by newlines into individual "call + args" blocks.
            // Each block starts with a `.` call line.
            const lines = bodyText.split('\n')
            const callParagraphs: any[] = []
            let currentLines: string[] = []
            for (const line of lines) {
              if (line.startsWith('.') && currentLines.length > 0) {
                callParagraphs.push({
                  type: 'paragraph',
                  children: [{ type: 'text', value: currentLines.join('\n') }],
                })
                currentLines = [line]
              } else {
                currentLines.push(line)
              }
            }
            if (currentLines.length > 0) {
              callParagraphs.push({
                type: 'paragraph',
                children: [{ type: 'text', value: currentLines.join('\n') }],
              })
            }
            // Replace the current node with: parent call (no body) + sibling paragraphs
            parent.children.splice(index, 1, parsed, ...callParagraphs)
            return [SKIP, index]
          }

          // Single call or call-with-body (cases a and b).
          const bodyCallNode = tryParseCall(bodyText, false)
          if (bodyCallNode && bodyCallNode.type === 'qdFunctionCall' &&
              !hasNonLiteralPositionalArg) {
            const fc = bodyCallNode as QdFunctionCallNode
            // If bodyText is multi-line and the inner call has no braced args,
            // the remaining lines are the body of the inner call (case b).
            // Wrap as a block arg on the parent.
            if (bodyText.includes('\n') && fc.args.length === 0) {
              const innerNlPos = bodyText.indexOf('\n')
              const innerBodyText = bodyText.slice(innerNlPos + 1).trim()
              if (innerBodyText) {
                fc.args.push({
                  name: undefined,
                  value: {
                    tag: 'block',
                    nodes: [{ type: 'paragraph', children: [{ type: 'text', value: innerBodyText }] }],
                  },
                })
              }
              callNode.args.push({
                name: undefined,
                value: { tag: 'block', nodes: [fc] },
              })
              parent.children[index] = callNode as any
              return [SKIP, index]
            }

            // Single-line body call (case a): attach as call-arg.
            callNode.args.push({
              name: undefined,
              value: { tag: 'call', node: fc },
            })
            parent.children[index] = callNode as any
            return [SKIP, index]
          }
          // Fallback: split into sibling (original behaviour)
          const remainingPara: any = {
            type: 'paragraph',
            children: [{ type: 'text', value: bodyText }],
          }
          parent.children.splice(index, 1, parsed, remainingPara)
          return [SKIP, index]
        }

        // Always try to extract rich body children from the paragraph (handles
        // strong/em nodes that appear after whitespace-only bodyText).
        const bodyChildren = extractBodyChildren(node.children as any[], callLineText)
        const significantBody = bodyChildren.filter(
          (c: any) => c.type !== 'text' || (c.value ?? '').trim() !== ''
        )

        if (significantBody.length > 0) {
          const bodyPara: any = { type: 'paragraph', children: bodyChildren }
          callNode.args.push({
            name: undefined,
            value: { tag: 'block', nodes: [bodyPara] },
          })
        } else if (bodyText.trim()) {
          // Fallback: plain-text only body
          const bodyPara: any = {
            type: 'paragraph',
            children: [{ type: 'text', value: bodyText }],
          }
          callNode.args.push({
            name: undefined,
            value: { tag: 'block', nodes: [bodyPara] },
          })
        } else if (
          // No inline body — try to absorb the next sibling paragraph as body.
          // Applies when no positional (unnamed) arg exists yet (covers both
          // zero-arg calls and named-arg-only calls like .alert type:{info}).
          !callNode.args.some((a: any) => a.name === undefined) &&
          parent.children &&
          parent.children[index + 1]?.type === 'paragraph'
        ) {
          const bodyPara = parent.children[index + 1]
          callNode.args.push({
            name: undefined,
            value: { tag: 'block', nodes: [bodyPara] },
          })
          parent.children.splice(index + 1, 1)
        }
      }

      // Replace the paragraph with the parsed QD node
      parent.children[index] = parsed as any
      return [SKIP, index]
    })

    // -----------------------------------------------------------------------
    // Pass 2: block-body grouping
    //
    // When the source is `.center\n    # Title\n\n    Some text.`, remark
    // emits:
    //   paragraph(".center")
    //   heading("# Title")
    //   paragraph("Some text.")
    //
    // After Pass 1 the paragraph becomes a qdFunctionCall with zero args,
    // followed by the heading and text paragraph siblings.
    //
    // We detect qdFunctionCall nodes with zero args at the top level (Root
    // children) and collect the immediately following siblings as block body.
    //
    // Functions listed in NO_BODY_FUNCTIONS are self-contained (no block body)
    // and are excluded from this grouping to avoid consuming unrelated siblings.
    // -----------------------------------------------------------------------

    /** Functions that never take a block body — skip Pass 2 grouping for these. */
    const NO_BODY_FUNCTIONS = new Set([
      'whitespace', 'pagebreak', 'hrule', 'toc', 'slide',
      'numbering', 'counter', 'ref', 'doctype', 'docname',
      'author', 'lang', 'theme', 'slidetheme', 'slidetransition',
      'pageformat', 'pageorientation',
    ])

    const rootChildren = tree.children as any[]
    let i = 0
    while (i < rootChildren.length) {
      const node = rootChildren[i]
      // Absorb body if the call has no positional (unnamed) args yet.
      // This handles both zero-arg calls (.center) and named-arg-only calls
      // (.alert type:{info}, .grid cols:{3}) that still need a block body.
      const hasPositionalArg = node.type === 'qdFunctionCall' &&
        (node as QdFunctionCallNode).args.some((a: any) => a.name === undefined)
      const isNoBodyFunction = node.type === 'qdFunctionCall' &&
        NO_BODY_FUNCTIONS.has((node as QdFunctionCallNode).name)
      if (
        node.type === 'qdFunctionCall' &&
        !hasPositionalArg &&
        !isNoBodyFunction
      ) {
        // Collect siblings until we hit another qdFunctionCall or end
        const bodyNodes: any[] = []
        let j = i + 1
        while (j < rootChildren.length && rootChildren[j].type !== 'qdFunctionCall') {
          bodyNodes.push(rootChildren[j])
          j++
        }
        if (bodyNodes.length > 0) {
          ;(node as QdFunctionCallNode).args.push({
            name: undefined,
            value: { tag: 'block', nodes: bodyNodes },
          })
          rootChildren.splice(i + 1, bodyNodes.length)
        }
      }

      // Pass 2b: if a qdFunctionCall already has a block body AND the next
      // sibling is a `code` node, that code node was produced by remark-parse
      // from 4-space-indented continuation content (e.g. a list after a blank
      // line).  Re-interpret the code value as markdown and append the
      // resulting nodes to the existing block body arg.
      if (node.type === 'qdFunctionCall' && !isNoBodyFunction) {
        const callNode = node as QdFunctionCallNode
        const blockArgIdx = callNode.args.findIndex(
          (a: any) => a.name === undefined && a.value?.tag === 'block',
        )
        if (blockArgIdx !== -1) {
          while (
            i + 1 < rootChildren.length &&
            rootChildren[i + 1].type === 'code'
          ) {
            const codeNode = rootChildren[i + 1]
            const reparsed = reparseFencedBody(codeNode.value ?? '')
            if (reparsed.length > 0) {
              const blockArg = callNode.args[blockArgIdx]
              const existingNodes: any[] = (blockArg.value as any).nodes ?? []
              callNode.args[blockArgIdx] = {
                ...blockArg,
                value: { tag: 'block', nodes: [...existingNodes, ...reparsed] },
              }
              rootChildren.splice(i + 1, 1)
            } else {
              break
            }
          }
        }
      }

      i++
    }

    // -----------------------------------------------------------------------
    // Pass 3: inline calls
    // Scan Text nodes for `.name` or `{.name …}` patterns and inject inline
    // QdFunctionCallNode / QdChainNode into the parent's children array.
    // -----------------------------------------------------------------------
    visit(tree, 'text', (textNode: Text, index, parent: any) => {
      if (typeof index !== 'number' || !parent) return

      const value = textNode.value

      // Look for tight calls: {.name …} and bare inline calls: .name
      // We scan left-to-right and collect all segments.
      const segments = splitInlineText(value)
      if (segments === null || segments.length === 1 && segments[0].type === 'text') {
        // No inline calls found — leave the text node unchanged
        return
      }

      // Build replacement nodes
      const replacement: any[] = []
      for (const seg of segments) {
        if (seg.type === 'text') {
          if (seg.text) replacement.push({ type: 'text', value: seg.text } as Text)
        } else {
          const parsed = tryParseCall(seg.text, true)
          if (parsed) replacement.push(parsed)
          else if (seg.text) replacement.push({ type: 'text', value: seg.text } as Text)
        }
      }

      if (replacement.length === 0) return

      // Replace the single text node with the array of replacement nodes
      parent.children.splice(index, 1, ...replacement)
      return [SKIP, index + replacement.length]
    })
  }
}

// ---------------------------------------------------------------------------
// Inline text splitter
// ---------------------------------------------------------------------------

type TextSegment = { type: 'text'; text: string } | { type: 'call'; text: string }

/**
 * Split `text` into alternating plain-text and Quarkdown-call segments.
 *
 * Handles:
 * - Tight calls: `{.name …}` — the outer braces are stripped; content is the
 *   raw call text `.name …`
 * - Bare inline calls: `.name` or `.name::chain {arg}` appearing mid-text
 *
 * Returns `null` if no calls were found (saves allocation).
 */
function splitInlineText(text: string): TextSegment[] | null {
  const segments: TextSegment[] = []
  let pos = 0
  let hadCall = false

  while (pos < text.length) {
    // Try to find the next call start: either `{.` (tight) or standalone `.`
    let nextDot = -1
    let tight = false

    for (let i = pos; i < text.length; i++) {
      if (text[i] === '{' && i + 1 < text.length && text[i + 1] === '.') {
        nextDot = i
        tight = true
        break
      }
      if (text[i] === '.' && i + 1 < text.length && /[a-zA-Z_]/.test(text[i + 1])) {
        nextDot = i
        tight = false
        break
      }
    }

    if (nextDot === -1) {
      // No more calls
      if (pos < text.length) segments.push({ type: 'text', text: text.slice(pos) })
      break
    }

    // Push text before the call
    if (nextDot > pos) {
      segments.push({ type: 'text', text: text.slice(pos, nextDot) })
    }

    if (tight) {
      // `{.name …}` — extract balanced content
      const extracted = extractBracedArgs(text, nextDot)
      if (extracted === null || extracted.args.length === 0) {
        // Unclosed or empty — treat as literal text
        segments.push({ type: 'text', text: text[nextDot] })
        pos = nextDot + 1
        continue
      }
      // The single arg extracted is the raw call content (e.g. `.name arg`)
      const callText = extracted.args[0]
      segments.push({ type: 'call', text: callText })
      pos = extracted.endPos
      hadCall = true
    } else {
      // Bare `.name` — consume name + optional `::chain` + optional `{args}`
      const callText = extractBareCall(text, nextDot)
      if (callText === null) {
        segments.push({ type: 'text', text: '.' })
        pos = nextDot + 1
        continue
      }
      segments.push({ type: 'call', text: callText.text })
      pos = callText.endPos
      hadCall = true
    }
  }

  return hadCall ? segments : null
}

/**
 * Extract a bare inline call starting at `dotPos` in `text`.
 * Consumes: `.name[::chain]*[  {arg}]*`
 */
function extractBareCall(
  text: string,
  dotPos: number,
): { text: string; endPos: number } | null {
  let pos = dotPos

  // First `.name`
  const firstMatch = text.slice(pos).match(NAME_RE)
  if (!firstMatch) return null
  pos += firstMatch[0].length

  // Collect per-step args and chain steps in a loop.
  // Each step may have its own args before the next :: separator
  // e.g. ".pow {.r} to:{2}::multiply {.pi}::truncate {2}"
  while (true) {
    // Collect args for the current step
    const extracted = extractBracedArgs(text, pos)
    if (extracted !== null) {
      pos = extracted.endPos
    }

    // Check if a chain step follows
    if (!text.startsWith(CHAIN_SEP, pos)) break
    const nextName = text.slice(pos + CHAIN_SEP.length).match(/^[a-zA-Z_][a-zA-Z0-9_]*/)
    if (!nextName) break
    pos += CHAIN_SEP.length + nextName[0].length
  }

  return { text: text.slice(dotPos, pos), endPos: pos }
}
