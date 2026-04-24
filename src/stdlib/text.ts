import type { Context } from '../core/context/context.js'
import type { QdRawArg, QdValue } from '../core/ast/index.js'
import { evalArg } from '../core/pipeline/expand.js'

async function str(arg: QdRawArg, ctx: Context): Promise<string> {
  const v = await evalArg(arg, ctx)
  if (v.kind === 'string') return v.value
  if (v.kind === 'number') return String(v.value)
  if (v.kind === 'boolean') return String(v.value)
  return String((v as any).value ?? '')
}

const s = (v: string): QdValue => ({ kind: 'string', value: v })

export const textFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  uppercase:  async ([a], ctx) => s((await str(a, ctx)).toUpperCase()),
  lowercase:  async ([a], ctx) => s((await str(a, ctx)).toLowerCase()),
  capitalize: async ([a], ctx) => {
    const t = await str(a, ctx)
    return s(t.charAt(0).toUpperCase() + t.slice(1))
  },
  trim:       async ([a], ctx) => s((await str(a, ctx)).trim()),
  length: async ([a], ctx) => {
    const v = await evalArg(a, ctx)
    if (v.kind === 'iterable') return { kind: 'number', value: v.items.length }
    const text = v.kind === 'string' ? v.value : String((v as any).value ?? '')
    return { kind: 'number', value: text.length }
  },
  substring: async (args, ctx) => {
    // .substring {text} from:{n} to:{m?}
    const textArg = args.find(a => (a as any).name === undefined) ?? args[0]
    const fromArg = args.find(a => (a as any).name === 'from')
    const toArg   = args.find(a => (a as any).name === 'to')
    const t = await str(textArg, ctx)
    const fromVal = fromArg ? parseInt(String((await evalArg(fromArg, ctx) as any).value ?? '0')) : 0
    const toVal   = toArg   ? parseInt(String((await evalArg(toArg, ctx) as any).value ?? String(t.length))) : undefined
    return s(t.substring(fromVal, toVal))
  },
  replace: async ([text, pattern, repl], ctx) => {
    return s((await str(text, ctx)).replaceAll(await str(pattern, ctx), await str(repl, ctx)))
  },
  concat:    async ([a, b], ctx) => s(await str(a, ctx) + await str(b, ctx)),
  tostring:  async ([a], ctx) => {
    const v = await evalArg(a, ctx)
    return s(String((v as any).value ?? ''))
  },
  tonumber:  async ([a], ctx) => ({ kind: 'number', value: parseFloat(await str(a, ctx)) }),
  toboolean: async ([a], ctx) => ({ kind: 'boolean', value: (await str(a, ctx)) === 'true' }),
}
