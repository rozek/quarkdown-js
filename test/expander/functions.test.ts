import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Custom functions', () => {
  it('defines and calls a function', async () => {
    const src = '.function {greet}\n    name:\n    Hello .name!\n\n.greet {World}'
    const { html } = await compileHtml(src)
    expect(html).toContain('Hello')
    expect(html).toContain('World')
  })

  it('function with no params returns body', async () => {
    const src = '.function {hi}\n    Hi there!\n\n.hi'
    const { html } = await compileHtml(src)
    expect(html).toContain('Hi there')
  })
})
