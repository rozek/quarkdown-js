import { describe, it, expect } from 'vitest'
import { createContext } from '../../src/core/context/context.js'

describe('Context', () => {
  it('defines and resolves a symbol', () => {
    const ctx = createContext()
    const callable = { kind: 'variable' as const, value: { kind: 'string' as const, value: 'hello' } }
    ctx.define('myVar', callable)
    expect(ctx.resolve('myVar')).toBe(callable)
  })

  it('returns undefined for unknown symbols', () => {
    const ctx = createContext()
    expect(ctx.resolve('____notDefined')).toBeUndefined()
  })

  it('fork child resolves parent symbols', () => {
    const ctx = createContext()
    const callable = { kind: 'variable' as const, value: { kind: 'none' as const } }
    ctx.define('parentSym', callable)
    const child = ctx.fork()
    expect(child.resolve('parentSym')).toBe(callable)
  })

  it('fork child define does not affect parent', () => {
    const ctx = createContext()
    const child = ctx.fork()
    child.define('childOnly', { kind: 'variable', value: { kind: 'none' } })
    expect(ctx.resolve('childOnly')).toBeUndefined()
  })

  it('fork with bindings pre-populates child', () => {
    const ctx = createContext()
    const override = { kind: 'variable' as const, value: { kind: 'string' as const, value: 'x' } }
    const child = ctx.fork({ overrideSym: override })
    expect(child.resolve('overrideSym')).toBe(override)
  })

  it('metadata is shared between parent and child', () => {
    const ctx = createContext()
    const child = ctx.fork()
    expect(child.metadata).toBe(ctx.metadata)
  })

  it('diagnostics are shared between parent and child', () => {
    const ctx = createContext()
    const child = ctx.fork()
    expect(child.diagnostics).toBe(ctx.diagnostics)
  })

  it('addDiagnostic appends to diagnostics array', () => {
    const ctx = createContext()
    ctx.addDiagnostic({ severity: 'error', message: 'test error' })
    expect(ctx.diagnostics).toHaveLength(1)
    expect(ctx.diagnostics[0].message).toBe('test error')
  })
})
