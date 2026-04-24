import type { Plugin } from '../core/pipeline/index.js'
import type { QdRawArg } from '../core/ast/index.js'
import type { Context } from '../core/context/context.js'
import { evalArg } from '../core/pipeline/expand.js'

function valueToString(val: any): string {
  if (val.kind === 'string') return val.value
  if (val.kind === 'number') return String(val.value)
  if (val.kind === 'boolean') return String(val.value)
  return String((val as any).value ?? '')
}

export const diagramPlugin: Plugin = {
  name: 'diagrams',
  functions: [
    {
      name: 'mermaid',
      params: [{ name: 'body', optional: false, isBody: true }],
      async fn([body]: QdRawArg[], ctx: Context) {
        const val = await evalArg(body, ctx)
        const content = valueToString(val)
        return {
          kind: 'markdown' as const,
          nodes: [{
            type: 'qdLayout',
            layoutType: 'mermaid',
            attrs: {},
            children: [{ type: 'text', value: content }],
          } as any],
        }
      },
    },
  ],
  clientScripts: [
    {
      id: 'mermaid-js',
      src: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js',
      position: 'body-end',
    },
    {
      id: 'mermaid-init',
      content: `if (typeof mermaid !== 'undefined') mermaid.initialize({ startOnLoad: true });`,
      position: 'body-end',
    },
  ],
}
