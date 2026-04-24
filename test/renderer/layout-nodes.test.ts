import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Layout nodes', () => {
  it('.center → div.qd-center', async () => {
    const { html } = await compileHtml('.center {hello}')
    expect(html).toContain('qd-center')
  })

  it('.row → div.qd-row', async () => {
    const { html } = await compileHtml('.row {content}')
    expect(html).toContain('qd-row')
  })

  it('.alert type:info → aside.qd-alert--info', async () => {
    const { html } = await compileHtml('.alert type:{info} {message}')
    expect(html).toContain('qd-alert--info')
  })

  it('.collapsible → details element', async () => {
    const { html } = await compileHtml('.collapsible {Title} {Body}')
    expect(html).toContain('<details')
  })

  it('.box → div.qd-box', async () => {
    const { html } = await compileHtml('.box {content}')
    expect(html).toContain('qd-box')
  })
})
