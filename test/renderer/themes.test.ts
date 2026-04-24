import { describe, it, expect } from 'vitest'
import { getThemeCss } from '../../src/renderer/html/themes.js'

describe('Themes', () => {
  it('returns CSS with custom properties', () => {
    const css = getThemeCss('default')
    expect(css).toContain('--qd-color-bg')
    expect(css).toContain(':root')
  })

  it('paperwhite has serif font', () => {
    const css = getThemeCss('paperwhite')
    expect(css).toContain('Georgia')
  })

  it('galactic has dark background', () => {
    const css = getThemeCss('galactic')
    expect(css).toContain('#0d1117')
  })

  it('unknown theme falls back to default', () => {
    const css = getThemeCss('nonexistent')
    expect(css).toContain('--qd-color-bg')
  })
})
