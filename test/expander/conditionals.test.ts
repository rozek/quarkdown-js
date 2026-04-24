import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Conditionals', () => {
  it('.if true shows content', async () => {
    const { html } = await compileHtml('.if {true}\n    Content shown.')
    expect(html).toContain('Content shown')
  })

  it('.if false hides content', async () => {
    const { html } = await compileHtml('.if {false}\n    Hidden content.')
    expect(html).not.toContain('Hidden content')
  })

  it('.ifnot false shows content', async () => {
    const { html } = await compileHtml('.ifnot {false}\n    Shown by ifnot.')
    expect(html).toContain('Shown by ifnot')
  })

  it('.ifnot true hides content', async () => {
    const { html } = await compileHtml('.ifnot {true}\n    Should be hidden.')
    expect(html).not.toContain('Should be hidden')
  })
})
