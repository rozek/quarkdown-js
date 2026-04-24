import { describe, it, expect } from 'vitest'
import { compile } from '../src/index.js'

it('docname populates metadata.name', async () => {
  const r = await compile('.docname {My Title}')
  console.log('metadata:', JSON.stringify(r.metadata))
  console.log('diags:', JSON.stringify(r.diagnostics))
  expect(r.metadata.name).toBe('My Title')
})

it('doctype populates metadata.type', async () => {
  const r = await compile('.doctype {plain}')
  console.log('metadata type:', JSON.stringify(r.metadata))
  expect(r.metadata.type).toBe('plain')
})

import { readFileSync } from 'fs'
import { join } from 'path'
import { beforeAll } from 'vitest'

describe('full doc meta', () => {
  let result: any
  beforeAll(async () => {
    const source = readFileSync(join(import.meta.dirname, '../test/mock/document.qd'), 'utf-8')
    result = await compile(source, {
      fetch: async () => { throw new Error('no fetch needed') },
    })
  })
  it('has correct metadata', () => {
    console.log('metadata:', JSON.stringify(result.metadata))
    expect(result.metadata.name).toBe('QuarkdownJS Test Document')
  })
})
