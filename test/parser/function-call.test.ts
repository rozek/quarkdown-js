import { describe, it, expect } from 'vitest'
import { parseQd, findQdNodes } from '../helpers.js'

describe('Function call parser', () => {
  it('parses a simple block function call', () => {
    const root = parseQd('.center {hello}')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('center')
    expect(nodes[0].args).toHaveLength(1)
    expect(nodes[0].args[0].value.tag).toBe('literal')
    expect(nodes[0].args[0].value.text).toBe('hello')
    expect(nodes[0].inline).toBe(false)
  })

  it('parses named argument', () => {
    const root = parseQd('.text size:{1em} {hi}')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].args[0].name).toBe('size')
    expect(nodes[0].args[0].value.text).toBe('1em')
    expect(nodes[0].args[1].name).toBeUndefined()
    expect(nodes[0].args[1].value.text).toBe('hi')
  })

  it('parses inline function call inside paragraph', () => {
    const root = parseQd('Hello {.name} world')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('name')
    expect(nodes[0].inline).toBe(true)
  })

  it('parses zero-argument function call (variable access)', () => {
    const root = parseQd('.myvar')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('myvar')
    expect(nodes[0].args).toHaveLength(0)
  })

  it('parses multiple arguments', () => {
    const root = parseQd('.func {a} {b} {c}')
    const nodes = findQdNodes(root, 'qdFunctionCall')
    expect(nodes[0].args).toHaveLength(3)
  })
})
