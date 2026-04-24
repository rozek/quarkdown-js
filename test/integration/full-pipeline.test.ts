import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { compile } from '../../src/index.js'
import { defaultPlugins } from '../../src/plugins/index.js'
import type { CompileResult } from '../../src/core/pipeline/index.js'

describe('Full pipeline — mock document', () => {
  let result: CompileResult

  beforeAll(async () => {
    const source = readFileSync(
      join(import.meta.dirname ?? new URL('.', import.meta.url).pathname, '../mock/document.qd'),
      'utf-8'
    )
    result = await compile(source, { plugins: defaultPlugins })
  })

  it('has correct metadata: name', () => {
    expect(result.metadata.name).toBe('QuarkdownJS Test Document')
  })

  it('has correct metadata: type', () => {
    expect(result.metadata.type).toBe('plain')
  })

  it('has correct metadata: authors', () => {
    expect((result.metadata.authors as string[]) ?? []).toContain('Test Suite')
  })

  it('renders heading', () => {
    expect(result.html).toContain('Variables')
  })

  it('renders variable values', () => {
    expect(result.html).toContain('QuarkdownJS')
  })

  it('renders custom function — default title', () => {
    expect(result.html).toContain('Dr.')
    expect(result.html).toContain('World')
  })

  it('renders custom function — named args', () => {
    expect(result.html).toContain('Prof.')
    expect(result.html).toContain('Alice')
  })

  it('renders conditional (beta=true branch)', () => {
    expect(result.html).toContain('beta')
  })

  it('renders foreach loop items', () => {
    expect(result.html).toContain('Item 1')
    expect(result.html).toContain('Item 4')
  })

  it('renders chain (trim + uppercase)', () => {
    expect(result.html).toContain('HELLO WORLD')
  })

  it('renders math chain (circle area ≈ 201.06)', () => {
    expect(result.html).toContain('201.06')
  })

  it('renders layout: center', () => {
    expect(result.html).toContain('qd-center')
  })

  it('renders layout: alert info', () => {
    expect(result.html).toContain('qd-alert--info')
  })

  it('renders layout: collapsible', () => {
    expect(result.html).toContain('<details')
  })

  it('renders operators: equals', () => {
    expect(result.html).toContain('true')
  })

  it('renders text: uppercase', () => {
    expect(result.html).toContain('HELLO')
  })

  it('renders text: concat', () => {
    expect(result.html).toContain('foobar')
  })

  it('has no error diagnostics', () => {
    const errors = result.diagnostics.filter(d => d.severity === 'error')
    expect(errors).toHaveLength(0)
  })
})
