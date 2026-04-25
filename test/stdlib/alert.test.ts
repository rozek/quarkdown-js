import { describe, it, expect } from 'vitest'
import { compile } from '../../src/index.js'
import { defaultPlugins } from '../../src/plugins/index.js'

describe('Alert named arg', () => {
  it('applies qd-alert--warning class', async () => {
    const r = await compile(`.alert type:{warning}\n    Warning!`, { plugins: defaultPlugins })
    expect(r.html).toContain('qd-alert--warning')
  })
  it('applies qd-alert--info class', async () => {
    const r = await compile(`.alert type:{info}\n    Info!`, { plugins: defaultPlugins })
    expect(r.html).toContain('qd-alert--info')
  })
  it('applies qd-alert--error class', async () => {
    const r = await compile(`.alert type:{error}\n    Error!`, { plugins: defaultPlugins })
    expect(r.html).toContain('qd-alert--error')
  })
})
