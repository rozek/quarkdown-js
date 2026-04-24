import { describe, it, expect } from 'vitest'
import { compile } from '../../src/index.js'

describe('.include with mocked fetch', () => {
  it('includes external file content', async () => {
    const mockFetch = async (path: string) => {
      if (path === 'lib.qd') return 'Included content here.'
      throw new Error('Not found')
    }
    const { html } = await compile('.include {lib.qd}', { fetch: mockFetch })
    expect(html).toContain('Included content here')
  })

  it('.read returns file content as string', async () => {
    const mockFetch = async (_path: string) => 'file contents'
    const { html } = await compile('.read {some.txt}', { fetch: mockFetch })
    expect(html).toContain('file contents')
  })
})
