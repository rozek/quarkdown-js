import { describe, it, expect } from 'vitest'
import { diagramPlugin } from '../../src/plugins/diagrams.js'
import { compile } from '../../src/index.js'

describe('Diagram plugin', () => {
  it('has name "diagrams"', () => { expect(diagramPlugin.name).toBe('diagrams') })
  it('registers .mermaid function', () => {
    expect(diagramPlugin.functions?.find(f => f.name === 'mermaid')).toBeDefined()
  })
  it('.mermaid produces div.mermaid in output', async () => {
    const result = await compile('.mermaid {graph TD; A-->B}', { plugins: [diagramPlugin] })
    expect(result.html).toContain('mermaid')
  })
  it('injects mermaid script at body-end', () => {
    const script = diagramPlugin.clientScripts?.find(s => s.id === 'mermaid-js')
    expect(script?.position).toBe('body-end')
  })
})

describe('Diagram plugin — rendering', () => {
  it('registers .mermaid function via compile', async () => {
    const result = await compile('.mermaid {graph TD; A-->B}', { plugins: [diagramPlugin] })
    expect(result.diagnostics.filter(d => d.severity === 'error')).toHaveLength(0)
  })

  it('injects mermaid init script into output', async () => {
    const result = await compile('text', { plugins: [diagramPlugin] })
    expect(result.html).toContain('mermaid')
  })

  it('defaultPlugins has 3 entries', async () => {
    const { defaultPlugins } = await import('../../src/plugins/index.js')
    expect(defaultPlugins).toHaveLength(3)
  })
})
