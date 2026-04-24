import { it, expect } from 'vitest'
import { compile } from '../src/index.js'

it('multiple vars work', async () => {
  const source = `.docname {Test}

.var {x} {hello}

Value: .x`
  const r = await compile(source)
  console.log('meta:', JSON.stringify(r.metadata))
  console.log('diags:', JSON.stringify(r.diagnostics))
  expect(r.metadata.name).toBe('Test')
})
