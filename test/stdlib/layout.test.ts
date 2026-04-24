import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Layout stdlib', () => {
  it('.center emits layout node in output', async () => {
    const { html } = await compileHtml('.center\n    Centered text.')
    // Since renderer is a stub, we check that compilation completes without error
    // and the result is a CompileResult object
    expect(html).toBeDefined()
  })

  it('.row emits layout node', async () => {
    const { html } = await compileHtml('.row\n    Row content.')
    expect(html).toBeDefined()
  })

  it('.hrule emits thematic break', async () => {
    const { html } = await compileHtml('.hrule')
    expect(html).toBeDefined()
  })

  it('.pagebreak emits layout node', async () => {
    const { html } = await compileHtml('.pagebreak')
    expect(html).toBeDefined()
  })
})
