import type { Context } from '../core/context/context.js'
import type { QdRawArg, QdValue } from '../core/ast/index.js'
import { evalArg } from '../core/pipeline/expand.js'

export const ioFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  /**
   * .include {path}
   * Fetches the file at `path`, runs stages 1–4 on it using the same context,
   * and splices the resulting mdast nodes in place.
   */
  include: async ([pathArg], ctx) => {
    if (!pathArg) return { kind: 'none' }
    const path = String((await evalArg(pathArg, ctx) as any).value ?? '')

    try {
      const source = await ctx.fetch(path)

      // Lazy import to avoid circular dependency at module load time
      const { unified } = await import('unified')
      const { default: remarkParse } = await import('remark-parse')
      const { default: remarkGfm } = await import('remark-gfm')
      const { walkPlugin } = await import('../core/parser/walk.js')
      const { refinePlugin } = await import('../core/parser/refine.js')
      const { expand } = await import('../core/pipeline/expand.js')

      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(walkPlugin)
        .use(refinePlugin)

      const parsed = processor.parse(source)
      const refined = await processor.run(parsed) as any
      const expanded = await expand(refined, ctx)

      return { kind: 'markdown', nodes: expanded.children as any[] }
    } catch (e) {
      ctx.addDiagnostic({ severity: 'error', message: `Failed to include ${path}: ${e}` })
      return { kind: 'none' }
    }
  },

  /**
   * .read {path}
   * Returns the content of a file as a raw string value.
   */
  read: async ([pathArg], ctx) => {
    if (!pathArg) return { kind: 'none' }
    const path = String((await evalArg(pathArg, ctx) as any).value ?? '')
    try {
      const text = await ctx.fetch(path)
      return { kind: 'string', value: text }
    } catch (e) {
      ctx.addDiagnostic({ severity: 'error', message: `Failed to read ${path}: ${e}` })
      return { kind: 'none' }
    }
  },

  /**
   * .csv {path}
   * Reads a CSV file and returns an iterable of dicts.
   */
  csv: async ([pathArg], ctx) => {
    if (!pathArg) return { kind: 'none' }
    const path = String((await evalArg(pathArg, ctx) as any).value ?? '')
    try {
      const text = await ctx.fetch(path)
      const lines = text.trim().split('\n')
      if (lines.length === 0) return { kind: 'iterable', items: [] }
      const headers = lines[0].split(',').map(h => h.trim())
      const items: QdValue[] = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim())
        const entries: Record<string, QdValue> = {}
        headers.forEach((h, i) => {
          entries[h] = { kind: 'string', value: values[i] ?? '' }
        })
        return { kind: 'dict', entries }
      })
      return { kind: 'iterable', items }
    } catch (e) {
      ctx.addDiagnostic({ severity: 'error', message: `Failed to read CSV ${path}: ${e}` })
      return { kind: 'none' }
    }
  },
}
