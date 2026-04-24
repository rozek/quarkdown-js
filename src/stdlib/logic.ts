import type { Context } from '../core/context/context.js'
import type { QdRawArg, QdValue } from '../core/ast/index.js'
import { evalArg, iterateValue } from '../core/pipeline/expand.js'

async function getNum(arg: QdRawArg, ctx: Context): Promise<number> {
  const v = await evalArg(arg, ctx)
  if (v.kind === 'number') return v.value
  if (v.kind === 'string') return parseFloat(v.value)
  throw new Error(`Expected number, got ${v.kind}`)
}

async function getBool(arg: QdRawArg, ctx: Context): Promise<boolean> {
  const v = await evalArg(arg, ctx)
  if (v.kind === 'boolean') return v.value
  if (v.kind === 'string') return v.value === 'true'
  if (v.kind === 'number') return v.value !== 0
  return false
}

function valueEquals(a: QdValue, b: QdValue): boolean {
  if (a.kind !== b.kind) {
    return String((a as any).value) === String((b as any).value)
  }
  return (a as any).value === (b as any).value
}

export const logicFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  // Structural — handled by expander as typed nodes; noops here for registry completeness
  if:       async () => ({ kind: 'none' }),
  ifnot:    async () => ({ kind: 'none' }),
  foreach:  async () => ({ kind: 'none' }),
  repeat:   async () => ({ kind: 'none' }),
  let:      async () => ({ kind: 'none' }),
  var:      async () => ({ kind: 'none' }),
  function: async () => ({ kind: 'none' }),

  // Comparison
  equals:    async ([a, b], ctx) => {
    const va = await evalArg(a, ctx), vb = await evalArg(b, ctx)
    return { kind: 'boolean', value: valueEquals(va, vb) }
  },
  notEquals: async ([a, b], ctx) => {
    const va = await evalArg(a, ctx), vb = await evalArg(b, ctx)
    return { kind: 'boolean', value: !valueEquals(va, vb) }
  },
  gt:  async ([a, b], ctx) => ({ kind: 'boolean', value: await getNum(a, ctx) > await getNum(b, ctx) }),
  lt:  async ([a, b], ctx) => ({ kind: 'boolean', value: await getNum(a, ctx) < await getNum(b, ctx) }),
  gte: async ([a, b], ctx) => ({ kind: 'boolean', value: await getNum(a, ctx) >= await getNum(b, ctx) }),
  lte: async ([a, b], ctx) => ({ kind: 'boolean', value: await getNum(a, ctx) <= await getNum(b, ctx) }),

  // Boolean
  and: async ([a, b], ctx) => ({ kind: 'boolean', value: await getBool(a, ctx) && await getBool(b, ctx) }),
  or:  async ([a, b], ctx) => ({ kind: 'boolean', value: await getBool(a, ctx) || await getBool(b, ctx) }),
  not: async ([a], ctx)    => ({ kind: 'boolean', value: !(await getBool(a, ctx)) }),

  otherwise: async ([a, b], ctx) => {
    const va = await evalArg(a, ctx)
    return va.kind === 'none' ? evalArg(b, ctx) : va
  },

  // Range
  range: async ([a, b], ctx) => ({
    kind: 'range', from: await getNum(a, ctx), to: await getNum(b, ctx),
  }),

  // Iterable helpers
  count: async ([a], ctx) => {
    const v = await evalArg(a, ctx)
    return { kind: 'number', value: iterateValue(v).length }
  },
  first: async ([a], ctx) => {
    const items = iterateValue(await evalArg(a, ctx))
    return items[0] ?? { kind: 'none' }
  },
  last: async ([a], ctx) => {
    const items = iterateValue(await evalArg(a, ctx))
    return items[items.length - 1] ?? { kind: 'none' }
  },
  item: async ([a, b], ctx) => {
    const items = iterateValue(await evalArg(a, ctx))
    const idx = await getNum(b, ctx) // 1-based
    return items[idx - 1] ?? { kind: 'none' }
  },
  join: async ([a, b], ctx) => {
    const items = iterateValue(await evalArg(a, ctx))
    const sep = b ? String((await evalArg(b, ctx) as any).value ?? '') : ''
    const texts = items.map(i => String((i as any).value ?? ''))
    return { kind: 'string', value: texts.join(sep) }
  },
  filter: async ([iter], ctx) => {
    const items = iterateValue(await evalArg(iter, ctx))
    return { kind: 'iterable', items }
  },
  map: async ([iter], ctx) => {
    const items = iterateValue(await evalArg(iter, ctx))
    return { kind: 'iterable', items }
  },
  sort: async ([iter], ctx) => {
    const items = iterateValue(await evalArg(iter, ctx))
    return { kind: 'iterable', items: [...items] }
  },
}
