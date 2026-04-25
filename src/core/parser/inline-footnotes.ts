/**
 * QuarkdownJS — Inline Footnote Pre-processor
 *
 * Quarkdown supports two footnote syntaxes that standard GFM does not:
 *
 *   [^label: inline definition]   — named inline footnote definition
 *   [^: inline definition]        — anonymous inline footnote definition
 *
 * This module transforms those patterns in the raw source string BEFORE
 * remark-parse / remark-gfm sees it. Each inline definition is:
 *   1. Replaced with a plain reference [^label] (or [^<id>]) at its
 *      original position.
 *   2. Appended as a standard GFM block footnote definition at the end of
 *      the source.
 *
 * Standard GFM footnotes ([^label] references + [^label]: definitions) are
 * left untouched.
 */

let _anonCounter = 0

/** Generate a unique id for anonymous footnotes within one compilation */
function nextAnonId(): string {
  return `__anon_fn_${++_anonCounter}`
}

/**
 * Extract a balanced `[…]` sequence starting exactly at `pos` (must point at
 * `[`). Returns the content inside and the position after the closing `]`, or
 * null when the bracket is unbalanced.
 */
function extractBalanced(src: string, pos: number): { content: string; end: number } | null {
  if (src[pos] !== '[') return null
  let depth = 1
  const start = pos + 1
  let i = start
  while (i < src.length && depth > 0) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') depth--
    if (depth > 0) i++
    else break
  }
  if (depth !== 0) return null
  return { content: src.slice(start, i), end: i + 1 }
}

/**
 * Transform Quarkdown inline footnote definitions in `source` into standard
 * GFM footnote definitions appended at the end.
 *
 * Returns the modified source string (unchanged if no inline definitions are
 * present, so the hot path for ordinary GFM documents is virtually free).
 */
export function preprocessInlineFootnotes(source: string): string {
  // Quick check: if there is no `[^` at all, nothing to do.
  if (!source.includes('[^')) return source

  // Reset anonymous counter for each compilation pass.
  _anonCounter = 0

  // Collected definitions accumulated during the scan.
  const defs: Array<{ label: string; content: string }> = []

  let result = ''
  let pos = 0

  while (pos < source.length) {
    // Find the next `[^` candidate.
    const nextIdx = source.indexOf('[^', pos)
    if (nextIdx === -1) {
      result += source.slice(pos)
      break
    }

    // Copy everything up to (but not including) the `[^`.
    result += source.slice(pos, nextIdx)

    // Try to extract balanced brackets starting at `[^…]`.
    const extracted = extractBalanced(source, nextIdx)
    if (extracted === null) {
      // Unbalanced bracket — treat `[` as a literal character.
      result += '['
      pos = nextIdx + 1
      continue
    }

    // `inner` is everything inside the `[…]`, e.g. `^label: content`.
    const inner = extracted.content

    if (!inner.startsWith('^')) {
      // Not a footnote bracket — copy verbatim.
      result += source.slice(nextIdx, extracted.end)
      pos = extracted.end
      continue
    }

    const afterCaret = inner.slice(1) // everything after `^`

    // ── Named inline definition: `^label: some content` ──────────────────────
    // Label must be a non-empty sequence of word chars / hyphens, followed by
    // `: ` and then the definition text.
    const namedMatch = afterCaret.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/s)
    if (namedMatch) {
      const label = namedMatch[1]
      const content = namedMatch[2].trim()
      // Emit a plain GFM reference in place of the inline definition.
      result += `[^${label}]`
      defs.push({ label, content })
      pos = extracted.end
      continue
    }

    // ── Anonymous inline definition: `^: some content` ───────────────────────
    const anonMatch = afterCaret.match(/^:\s*(.+)$/s)
    if (anonMatch) {
      const content = anonMatch[1].trim()
      const label = nextAnonId()
      result += `[^${label}]`
      defs.push({ label, content })
      pos = extracted.end
      continue
    }

    // ── Plain reference or unknown form — copy verbatim ───────────────────────
    result += source.slice(nextIdx, extracted.end)
    pos = extracted.end
  }

  if (defs.length === 0) return result

  // Append collected definitions.  Deduplicate by label: only the first
  // occurrence is written (remark-gfm takes the first matching definition).
  const seen = new Set<string>()
  const defLines: string[] = []
  for (const { label, content } of defs) {
    if (seen.has(label)) continue
    seen.add(label)
    defLines.push(`[^${label}]: ${content}`)
  }

  return result + '\n\n' + defLines.join('\n')
}
