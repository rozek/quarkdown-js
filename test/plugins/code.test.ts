import { describe, it, expect } from 'vitest'
import { defaultCodePlugin, codePlugin } from '../../src/plugins/code.js'
import { compile } from '../../src/index.js'

describe('Code plugin', () => {
  it('has name "code"', () => { expect(defaultCodePlugin.name).toBe('code') })
  it('default theme is github', () => {
    expect(defaultCodePlugin.clientScripts![0].src).toContain('github')
  })
  it('custom theme applies', () => {
    const p = codePlugin('monokai')
    expect(p.clientScripts![0].src).toContain('monokai')
  })
  it('provides 3 client scripts', () => {
    expect(defaultCodePlugin.clientScripts).toHaveLength(3)
  })
  it('hljs css is head position', () => {
    const cssScript = defaultCodePlugin.clientScripts!.find(s => s.id === 'hljs-css')
    expect(cssScript?.position).toBe('head')
  })
  it('hljs js is body-end position', () => {
    const jsScript = defaultCodePlugin.clientScripts!.find(s => s.id === 'hljs-js')
    expect(jsScript?.position).toBe('body-end')
  })
})

describe('Code plugin — rendering', () => {
  it('renders code block with hljs class', async () => {
    const src = '```javascript\nconst x = 1\n```'
    const result = await compile(src, { plugins: [defaultCodePlugin] })
    expect(result.html).toContain('hljs')
  })

  it('handles unknown language without throwing', async () => {
    const src = '```unknownlang\nsome code\n```'
    await expect(compile(src, { plugins: [defaultCodePlugin] })).resolves.toBeDefined()
  })
})
