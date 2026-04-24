import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Document modes', () => {
  it('plain mode wraps in qd-plain', async () => {
    const { html } = await compileHtml('.doctype {plain}\ntext')
    expect(html).toContain('qd-plain')
  })

  it('slides mode wraps in reveal structure', async () => {
    const { html } = await compileHtml('.doctype {slides}\ntext')
    expect(html).toContain('reveal')
  })
})
