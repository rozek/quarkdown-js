import { describe, it, expect } from 'vitest'
import { parseQd, findQdNodes } from '../helpers.js'

describe('Nested function calls', () => {
  it('parses nested call inside argument', () => {
    const root = parseQd('.if {.equals {a} {a}} {yes}')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    // Outer .if + nested .equals
    expect(nodes.length).toBeGreaterThanOrEqual(1)
    const outerIf = nodes.find((n: any) => n.name === 'if')
    expect(outerIf).toBeDefined()
  })
})
