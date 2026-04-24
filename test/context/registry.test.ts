import { describe, it, expect } from 'vitest'
import { createContext } from '../../src/core/context/context.js'

describe('Registry', () => {
  it('registers .if on a fresh context', () => {
    const ctx = createContext()
    expect(ctx.resolve('if')).toBeDefined()
  })

  it('registers .foreach on a fresh context', () => {
    const ctx = createContext()
    expect(ctx.resolve('foreach')).toBeDefined()
  })

  it('registers .uppercase on a fresh context', () => {
    const ctx = createContext()
    expect(ctx.resolve('uppercase')).toBeDefined()
  })

  it('registers .sum on a fresh context', () => {
    const ctx = createContext()
    expect(ctx.resolve('sum')).toBeDefined()
  })

  it('registers .var on a fresh context', () => {
    const ctx = createContext()
    expect(ctx.resolve('var')).toBeDefined()
  })
})
