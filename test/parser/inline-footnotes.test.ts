import { describe, it, expect } from 'vitest'
import { preprocessInlineFootnotes } from '../../src/core/parser/inline-footnotes.js'

describe('preprocessInlineFootnotes', () => {
  it('leaves plain GFM footnotes untouched', () => {
    const src = 'Text[^ref].\n\n[^ref]: Definition.'
    expect(preprocessInlineFootnotes(src)).toBe(src)
  })

  it('converts named inline definition to reference + appended block definition', () => {
    const src = 'Text[^fn: The definition.].'
    const result = preprocessInlineFootnotes(src)
    expect(result).toContain('[^fn]')
    expect(result).not.toContain('[^fn:')
    expect(result).toContain('[^fn]: The definition.')
  })

  it('converts anonymous inline definition to generated reference + appended block definition', () => {
    const src = 'Text[^: Anonymous note.].'
    const result = preprocessInlineFootnotes(src)
    // Reference should be an auto-generated id
    const refMatch = result.match(/\[\^(__anon_fn_\d+)\]/)
    expect(refMatch).not.toBeNull()
    const id = refMatch![1]
    expect(result).toContain(`[^${id}]: Anonymous note.`)
  })

  it('handles multiple inline definitions', () => {
    const src = 'A[^a: Note A]. B[^b: Note B].'
    const result = preprocessInlineFootnotes(src)
    // References should appear inline
    expect(result).toContain('[^a]')
    expect(result).toContain('[^b]')
    // Definitions appended at end (content is the text inside the brackets, no trailing period)
    expect(result).toContain('[^a]: Note A')
    expect(result).toContain('[^b]: Note B')
  })

  it('handles inline definition with italic content', () => {
    const src = 'See it[^tr: Used by *Kepler* mission.].'
    const result = preprocessInlineFootnotes(src)
    expect(result).toContain('[^tr]')
    expect(result).toContain('[^tr]: Used by *Kepler* mission.')
  })

  it('does not double-append named inline def when re-referenced', () => {
    const src = 'First[^tr: My def]. Second[^tr].'
    const result = preprocessInlineFootnotes(src)
    // Definition appears only once — use a string split to count, not regex
    const defOccurrences = result.split('[^tr]: My def').length - 1
    expect(defOccurrences).toBe(1)
    // Both in-text occurrences of reference should be [^tr]
    expect(result).toContain('[^tr]')
  })

  it('returns source unchanged when there are no [^ brackets', () => {
    const src = 'Just plain text with no footnotes.'
    expect(preprocessInlineFootnotes(src)).toBe(src)
  })
})
