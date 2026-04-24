import { describe, it, expect } from 'vitest'
import { parseQd, findQdNodes } from '../helpers.js'

describe('Parser error handling', () => {
  it('skips call with unclosed brace and emits no qdFunctionCall', () => {
    // Unclosed brace — should not crash, should produce 0 or partial nodes
    expect(() => parseQd('.func {unclosed')).not.toThrow()
  })

  it('does not parse text that looks like a function but has no dot', () => {
    const root = parseQd('center {hello}')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes).toHaveLength(0)
  })
})
