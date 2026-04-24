import { describe, it, expect, beforeAll } from 'vitest'
import { compile } from '../src/index.js'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('full doc meta 2', () => {
  let result: any
  beforeAll(async () => {
    const source = readFileSync(join(import.meta.dirname, 'mock/document.qd'), 'utf-8')
    console.log('source length:', source.length)
    result = await compile(source, {
      fetch: async () => { throw new Error('no fetch needed') },
    })
    console.log('result keys:', Object.keys(result))
    console.log('metadata:', JSON.stringify(result.metadata))
    console.log('diags:', JSON.stringify(result.diagnostics))
  })
  it('has correct metadata', () => {
    expect(result.metadata.name).toBe('QuarkdownJS Test Document')
  })
})
