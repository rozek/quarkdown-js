import { describe, it, expect } from 'vitest'
import { compileHtml } from '../helpers.js'

describe('Logic stdlib', () => {
  it('.equals returns true for equal values', async () => {
    const { html } = await compileHtml('.equals {3} {3}')
    expect(html).toContain('true')
  })

  it('.equals returns false for different values', async () => {
    const { html } = await compileHtml('.equals {3} {4}')
    expect(html).toContain('false')
  })

  it('.notEquals returns true for different values', async () => {
    const { html } = await compileHtml('.notEquals {3} {4}')
    expect(html).toContain('true')
  })

  it('.gt returns true when a > b', async () => {
    const { html } = await compileHtml('.gt {5} {3}')
    expect(html).toContain('true')
  })

  it('.lt returns true when a < b', async () => {
    const { html } = await compileHtml('.lt {3} {5}')
    expect(html).toContain('true')
  })

  it('.and returns true when both are true', async () => {
    const { html } = await compileHtml('.and {true} {true}')
    expect(html).toContain('true')
  })

  it('.and returns false when one is false', async () => {
    const { html } = await compileHtml('.and {true} {false}')
    expect(html).toContain('false')
  })

  it('.or returns true when one is true', async () => {
    const { html } = await compileHtml('.or {false} {true}')
    expect(html).toContain('true')
  })

  it('.not negates true to false', async () => {
    const { html } = await compileHtml('.not {true}')
    expect(html).toContain('false')
  })

  it('.count returns length of range', async () => {
    const { html } = await compileHtml('.count {1..5}')
    expect(html).toContain('5')
  })

  it('.first returns first item of range', async () => {
    const { html } = await compileHtml('.first {3..7}')
    expect(html).toContain('3')
  })

  it('.last returns last item of range', async () => {
    const { html } = await compileHtml('.last {3..7}')
    expect(html).toContain('7')
  })
})
