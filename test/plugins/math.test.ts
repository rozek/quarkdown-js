import { describe, it, expect } from 'vitest'
import { mathPlugin } from '../../src/plugins/math.js'
import { compile } from '../../src/index.js'

describe('Math plugin', () => {
  it('has name "math"', () => { expect(mathPlugin.name).toBe('math') })
  it('provides 4 client scripts', () => { expect(mathPlugin.clientScripts).toHaveLength(4) })
  it('katex CSS is head script', () => {
    expect(mathPlugin.clientScripts![0].position).toBe('head')
  })
  it('katex CSS src points to katex CDN', () => {
    expect(mathPlugin.clientScripts![0].src).toContain('katex')
  })
  it('init script is at body-end', () => {
    const initScript = mathPlugin.clientScripts!.find(s => s.id === 'katex-init')
    expect(initScript?.position).toBe('body-end')
  })
})

describe('Math plugin — rendering', () => {
  it('renders inline math with class qd-math-inline', async () => {
    const result = await compile('Value: $x^2$', { plugins: [mathPlugin] })
    expect(result.html).toContain('qd-math-inline')
  })

  it('renders block math with class qd-math-block', async () => {
    const result = await compile('$$\nx^2\n$$', { plugins: [mathPlugin] })
    expect(result.html).toContain('qd-math-block')
  })

  it('does not throw on invalid latex', async () => {
    await expect(compile('$\\invalid{$', { plugins: [mathPlugin] })).resolves.toBeDefined()
  })
})
