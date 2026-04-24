import type { Context } from '../core/context/context.js'
import type { QdRawArg, QdValue } from '../core/ast/index.js'
import { evalArg } from '../core/pipeline/expand.js'

async function n(arg: QdRawArg, ctx: Context): Promise<number> {
  const v = await evalArg(arg, ctx)
  if (v.kind === 'number') return v.value
  if (v.kind === 'string') return parseFloat(v.value)
  throw new Error(`Expected number, got ${v.kind}`)
}

const num = (v: number): QdValue => ({ kind: 'number', value: v })

export const mathFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  sum: async (args, ctx) => {
    if (args.length < 2) {
      // sum of iterable
      const v = await evalArg(args[0], ctx)
      if (v.kind === 'iterable') {
        const total = v.items.reduce((acc, i) => acc + ((i as any).value ?? 0), 0)
        return num(total)
      }
      return v
    }
    return num(await n(args[0], ctx) + await n(args[1], ctx))
  },
  subtract:  async ([a, b], ctx) => num(await n(a, ctx) - await n(b, ctx)),
  multiply:  async ([a, b], ctx) => num(await n(a, ctx) * await n(b, ctx)),
  divide:    async ([a, b], ctx) => {
    const divisor = await n(b, ctx)
    if (divisor === 0) return num(NaN)
    return num(await n(a, ctx) / divisor)
  },
  pow: async (args, ctx) => {
    // .pow {base} to:{exp} — first positional is base, named 'to' or second positional is exp
    const baseArg = args.find(a => (a as any).name === undefined) ?? args[0]
    const expArg  = args.find(a => (a as any).name === 'to') ?? args.find((_, i) => i === 1 && (args[i] as any).name === undefined)
    if (!baseArg || !expArg) {
      // Fallback: just use positional
      return num(Math.pow(await n(args[0], ctx), await n(args[1] ?? args[0], ctx)))
    }
    return num(Math.pow(await n(baseArg, ctx), await n(expArg, ctx)))
  },
  sqrt:  async ([a], ctx) => num(Math.sqrt(await n(a, ctx))),
  abs:   async ([a], ctx) => num(Math.abs(await n(a, ctx))),
  mod:   async ([a, b], ctx) => num(await n(a, ctx) % await n(b, ctx)),
  truncate: async ([a, b], ctx) => {
    const val = await n(a, ctx)
    const dec = b ? await n(b, ctx) : 0
    const factor = Math.pow(10, dec)
    return num(Math.round(val * factor) / factor)
  },
  floor: async ([a], ctx) => num(Math.floor(await n(a, ctx))),
  ceil:  async ([a], ctx) => num(Math.ceil(await n(a, ctx))),
  min:   async ([a, b], ctx) => num(Math.min(await n(a, ctx), await n(b, ctx))),
  max:   async ([a, b], ctx) => num(Math.max(await n(a, ctx), await n(b, ctx))),
  pi:    async () => ({ kind: 'number', value: Math.PI }),
  e:     async () => ({ kind: 'number', value: Math.E }),
}
