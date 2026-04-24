import { describe, it, expect } from 'vitest'
import { parseQd, findQdNodes } from '../helpers.js'

describe('Block body parser', () => {
  it('parses block body as last argument', () => {
    const root = parseQd('.center\n    # Title\n\n    Some text.')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('center')
    // Block body should be captured as a block arg
    const blockArg = nodes[0].args.find((a: any) => a.value.tag === 'block')
    expect(blockArg).toBeDefined()
  })
})
