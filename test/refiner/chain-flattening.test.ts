import { describe, it, expect } from 'vitest'
import { parseAndRefine, findNodes } from '../helpers.js'

describe('Chain flattening', () => {
  it('flattens .a::b to b(a())', () => {
    const root = parseAndRefine('.val::uppercase')
    const calls = findNodes(root, 'qdFunctionCall')
    // Should be nested: uppercase(val())
    const outer = calls.find((n: any) => n.name === 'uppercase')
    expect(outer).toBeDefined()
    expect(outer.args[0].value.tag).toBe('call')
    expect(outer.args[0].value.node.name).toBe('val')
  })

  it('flattens .a::b {y} to b(a(), y)', () => {
    const root = parseAndRefine('.val::pad {5}')
    const calls = findNodes(root, 'qdFunctionCall')
    const pad = calls.find((n: any) => n.name === 'pad')
    expect(pad.args).toHaveLength(2)
    expect(pad.args[0].value.tag).toBe('call') // a()
    expect(pad.args[1].value.text).toBe('5')   // y
  })

  it('flattens triple chain .a::b::c', () => {
    const root = parseAndRefine('.value::trim::uppercase')
    const calls = findNodes(root, 'qdFunctionCall')
    const outer = calls.find((n: any) => n.name === 'uppercase')
    expect(outer).toBeDefined()
    expect(outer.args[0].value.tag).toBe('call')
    expect(outer.args[0].value.node.name).toBe('trim')
  })
})
