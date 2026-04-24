import { describe, it, expect } from 'vitest'
import { parseQd, findQdNodes } from '../helpers.js'

describe('Chaining parser', () => {
  it('parses simple chain .a::b', () => {
    const root = parseQd('.val::uppercase')
    const chains = findQdNodes(root, 'qdChain')
    expect(chains).toHaveLength(1)
    expect(chains[0].steps).toHaveLength(2)
    expect(chains[0].steps[0].name).toBe('val')
    expect(chains[0].steps[1].name).toBe('uppercase')
  })

  it('parses chain with argument .a::b {y}', () => {
    const root = parseQd('.val::pad {5}')
    const chains = findQdNodes(root, 'qdChain')
    expect(chains[0].steps[1].args).toHaveLength(1)
    expect(chains[0].steps[1].args[0].value.text).toBe('5')
  })

  it('parses triple chain .a::b::c', () => {
    const root = parseQd('.value::trim::uppercase')
    const chains = findQdNodes(root, 'qdChain')
    expect(chains[0].steps).toHaveLength(3)
  })
})
