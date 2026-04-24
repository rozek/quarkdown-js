import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Math stdlib', () => {
  it('.sum {3} {4} = 7', async () => {
    const { html } = await compileHtml('.sum {3} {4}')
    expect(html).toContain('7')
  })

  it('.multiply {6} {7} = 42', async () => {
    const { html } = await compileHtml('.multiply {6} {7}')
    expect(html).toContain('42')
  })

  it('.subtract {10} {3} = 7', async () => {
    const { html } = await compileHtml('.subtract {10} {3}')
    expect(html).toContain('7')
  })

  it('.divide {10} {2} = 5', async () => {
    const { html } = await compileHtml('.divide {10} {2}')
    expect(html).toContain('5')
  })

  it('.pow {2} to:{10} = 1024', async () => {
    const { html } = await compileHtml('.pow {2} to:{10}')
    expect(html).toContain('1024')
  })

  it('.sqrt {9} = 3', async () => {
    const { html } = await compileHtml('.sqrt {9}')
    expect(html).toContain('3')
  })

  it('.abs {-5} = 5', async () => {
    const { html } = await compileHtml('.abs {-5}')
    expect(html).toContain('5')
  })

  it('.mod {10} {3} = 1', async () => {
    const { html } = await compileHtml('.mod {10} {3}')
    expect(html).toContain('1')
  })

  it('.floor {3.9} = 3', async () => {
    const { html } = await compileHtml('.floor {3.9}')
    expect(html).toContain('3')
  })

  it('.ceil {3.1} = 4', async () => {
    const { html } = await compileHtml('.ceil {3.1}')
    expect(html).toContain('4')
  })

  it('.min {3} {5} = 3', async () => {
    const { html } = await compileHtml('.min {3} {5}')
    expect(html).toContain('3')
  })

  it('.max {3} {5} = 5', async () => {
    const { html } = await compileHtml('.max {3} {5}')
    expect(html).toContain('5')
  })

  it('.pi returns pi constant', async () => {
    const { html } = await compileHtml('.pi')
    expect(html).toContain('3.14')
  })

  it('chain: .pow::multiply::truncate gives circle area', async () => {
    const src = '.var {r} {8}\n\n.pow {.r} to:{2}::multiply {.pi}::truncate {2}'
    const { html } = await compileHtml(src)
    expect(html).toContain('201.06')
  })
})
