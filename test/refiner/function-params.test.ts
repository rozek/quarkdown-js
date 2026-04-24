import { describe, it, expect } from 'vitest'
import { parseAndRefine, findNodes } from '../helpers.js'

describe('Function parameter extraction', () => {
  it('converts .function to QdFunctionDefNode', () => {
    // Note: due to remark's block body limitations, test with explicit arg form
    const root = parseAndRefine('.function {greet} {name: Hello .name!}')
    const nodes = findNodes(root, 'qdFunctionDef')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('greet')
  })
})
