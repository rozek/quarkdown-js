import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Loops', () => {
  it('.foreach over range produces items', async () => {
    const { html } = await compileHtml('.foreach {1..3}\n    n:\n    Item .n')
    expect(html).toContain('Item 1')
    expect(html).toContain('Item 2')
    expect(html).toContain('Item 3')
  })

  it('.repeat produces N copies', async () => {
    const { html } = await compileHtml('.repeat {3}\n    Row')
    const count = (html.match(/Row/g) ?? []).length
    expect(count).toBe(3)
  })

  it('.foreach over range 1..1 produces one item', async () => {
    const { html } = await compileHtml('.foreach {1..1}\n    x:\n    Only .x')
    expect(html).toContain('Only 1')
  })
})
