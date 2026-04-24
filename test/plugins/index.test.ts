import { describe, it, expect } from 'vitest'
import { defaultPlugins } from '../../src/plugins/index.js'

describe('defaultPlugins', () => {
  it('contains 3 plugins', () => { expect(defaultPlugins).toHaveLength(3) })
  it('includes math', () => { expect(defaultPlugins.find(p => p.name === 'math')).toBeDefined() })
  it('includes code', () => { expect(defaultPlugins.find(p => p.name === 'code')).toBeDefined() })
  it('includes diagrams', () => { expect(defaultPlugins.find(p => p.name === 'diagrams')).toBeDefined() })
})
