import { describe, it, expect } from 'vitest'
import { compileHtml, compileMeta } from '../helpers.js'

describe('Variables', () => {
  it('defines and accesses a string variable', async () => {
    const { html } = await compileHtml('.var {name} {QuarkdownJS}\n\nHello .name!')
    expect(html).toContain('QuarkdownJS')
  })

  it('reassigns a variable', async () => {
    const { html } = await compileHtml('.var {x} {old}\n\n.var {x} {new}\n\n.x')
    expect(html).toContain('new')
    // 'old' must not appear in the document body (the CSS wrapper may contain 'bold')
    const bodyMatch = html.match(/<div class="qd-document[^"]*">([\s\S]*)<\/div>/)
    const bodyHtml = bodyMatch ? bodyMatch[1] : html
    expect(bodyHtml).not.toContain('old')
  })

  it('accesses a numeric variable', async () => {
    const { html } = await compileHtml('.var {n} {42}\n\nThe answer is .n.')
    expect(html).toContain('42')
  })

  it('variable does not leak outside scope', async () => {
    const { html } = await compileHtml('.var {a} {hello}\n\n.a')
    expect(html).toContain('hello')
  })
})
