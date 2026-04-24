import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Text stdlib', () => {
  it('.uppercase converts to uppercase', async () => {
    const { html } = await compileHtml('.uppercase {hello}')
    expect(html).toContain('HELLO')
  })

  it('.lowercase converts to lowercase', async () => {
    const { html } = await compileHtml('.lowercase {HELLO}')
    expect(html).toContain('hello')
  })

  it('.capitalize capitalizes first letter', async () => {
    const { html } = await compileHtml('.capitalize {hello world}')
    expect(html).toContain('Hello world')
  })

  it('.trim removes whitespace', async () => {
    const { html } = await compileHtml('.trim {  hello  }')
    expect(html).toContain('hello')
  })

  it('.length returns character count', async () => {
    const { html } = await compileHtml('.length {abc}')
    expect(html).toContain('3')
  })

  it('.concat joins two strings', async () => {
    const { html } = await compileHtml('.concat {foo} {bar}')
    expect(html).toContain('foobar')
  })

  it('.replace replaces substring', async () => {
    const { html } = await compileHtml('.replace {hello world} {world} {earth}')
    expect(html).toContain('hello earth')
  })

  it('.tostring converts number to string', async () => {
    const { html } = await compileHtml('.tostring {42}')
    expect(html).toContain('42')
  })

  it('.tonumber parses string to number', async () => {
    const { html } = await compileHtml('.sum {.tonumber {3}} {4}')
    expect(html).toContain('7')
  })

  it('chain trim::uppercase works', async () => {
    const { html } = await compileHtml('.var {t} {  hello  }\n\n.t::trim::uppercase')
    expect(html).toContain('HELLO')
  })
})
