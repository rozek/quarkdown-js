import { it, expect } from 'vitest'
import { compile } from '../src/index.js'

it('user function with name param', async () => {
  const source = `.function {greet}
    name:
    Hello **.name**!

.greet {World}`
  const r = await compile(source)
  console.log('html:', r.html)
  console.log('diags:', JSON.stringify(r.diagnostics))
  expect(r.html).toContain('World')
})

it('user function with optional param', async () => {
  const source = `.function {greet}
    name:
    title?:
    Hello, {.title::otherwise {Dr.}} **.name**!

.greet {World}`
  const r = await compile(source)
  console.log('html:', r.html)
  console.log('diags:', JSON.stringify(r.diagnostics))
  expect(r.html).toContain('Dr.')
  expect(r.html).toContain('World')
})
