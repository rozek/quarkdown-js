import type { Plugin } from '../core/pipeline/index.js'

export const citationsPlugin: Plugin = {
  name: 'citations',
  functions: [
    {
      name: 'bibliography',
      params: [{ name: 'path', optional: false, isBody: false }],
      async fn(_args, ctx: any) {
        ctx.addDiagnostic({ severity: 'warning', message: 'citations plugin: citeproc-js integration pending' })
        return { kind: 'none' as const }
      },
    },
    {
      name: 'cite',
      params: [{ name: 'key', optional: false, isBody: false }],
      async fn(_args, _ctx) { return { kind: 'none' as const } },
    },
    {
      name: 'references',
      params: [],
      async fn(_args, _ctx) { return { kind: 'none' as const } },
    },
  ],
}
