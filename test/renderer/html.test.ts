import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('HTML renderer', () => {
  it('renders a paragraph', async () => {
    const { html } = await compileHtml('Hello world')
    expect(html).toContain('<p>')
    expect(html).toContain('Hello world')
  })

  it('renders a heading', async () => {
    const { html } = await compileHtml('# My Heading')
    // H1 headings get class="page-break" and id, so the tag has attributes
    expect(html).toContain('<h1')
    expect(html).toContain('class="page-break"')
    expect(html).toContain('id="my-heading"')
    expect(html).toContain('My Heading')
  })

  it('renders bold text', async () => {
    const { html } = await compileHtml('**bold**')
    expect(html).toContain('<strong>')
  })

  it('wraps output in qd-document div', async () => {
    const { html } = await compileHtml('text')
    expect(html).toContain('qd-document')
  })

  it('injects theme CSS', async () => {
    const { html } = await compileHtml('.theme {paperwhite}\ntext')
    expect(html).toContain('--qd-color-bg')
  })
})
