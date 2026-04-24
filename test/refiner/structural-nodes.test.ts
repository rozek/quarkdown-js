import { describe, it, expect } from 'vitest'
import { parseAndRefine, findNodes } from '../helpers.js'

describe('Structural node detection', () => {
  it('converts .var to QdVariableDefNode', () => {
    const root = parseAndRefine('.var {x} {42}')
    const nodes = findNodes(root, 'qdVariableDef')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].name).toBe('x')
    expect(nodes[0].initializer.tag).toBe('literal')
    expect(nodes[0].initializer.text).toBe('42')
  })

  it('converts .if to QdConditionalNode (negate=false)', () => {
    const root = parseAndRefine('.if {true} {yes}')
    const nodes = findNodes(root, 'qdConditional')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].negate).toBe(false)
  })

  it('converts .ifnot to QdConditionalNode (negate=true)', () => {
    const root = parseAndRefine('.ifnot {false} {yes}')
    const nodes = findNodes(root, 'qdConditional')
    expect(nodes[0].negate).toBe(true)
  })

  it('converts .foreach to QdLoopNode', () => {
    const root = parseAndRefine('.foreach {1..5} {item}')
    const nodes = findNodes(root, 'qdLoop')
    expect(nodes).toHaveLength(1)
  })

  it('converts .repeat to QdLoopNode', () => {
    const root = parseAndRefine('.repeat {3} {content}')
    const nodes = findNodes(root, 'qdLoop')
    expect(nodes).toHaveLength(1)
  })

  it('converts .docname to QdMetadataNode', () => {
    const root = parseAndRefine('.docname {My Doc}')
    const nodes = findNodes(root, 'qdMetadata')
    expect(nodes).toHaveLength(1)
    expect(nodes[0].key).toBe('name')
    expect(nodes[0].value).toBe('My Doc')
  })

  it('converts .doctype to QdMetadataNode with key=type', () => {
    const root = parseAndRefine('.doctype {plain}')
    const nodes = findNodes(root, 'qdMetadata')
    expect(nodes[0].key).toBe('type')
    expect(nodes[0].value).toBe('plain')
  })

  it('converts .author to QdMetadataNode with key=author', () => {
    const root = parseAndRefine('.author {Alice}')
    const nodes = findNodes(root, 'qdMetadata')
    expect(nodes[0].key).toBe('author')
    expect(nodes[0].value).toBe('Alice')
  })
})
