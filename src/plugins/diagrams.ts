import type { Plugin } from '../core/pipeline/index.js'
import type { QdRawArg } from '../core/ast/index.js'
import type { Context } from '../core/context/context.js'
import { evalArg, expandNode } from '../core/pipeline/expand.js'

function valueToString(val: any): string {
  if (val.kind === 'string') return val.value
  if (val.kind === 'number') return String(val.value)
  if (val.kind === 'boolean') return String(val.value)
  if (val.kind === 'markdown') {
    return extractText(val.nodes ?? [])
  }
  return String((val as any).value ?? '')
}

function extractText(nodes: any[]): string {
  return nodes.map(n => {
    if (n.type === 'text') return n.value ?? ''
    if (n.children) return extractText(n.children)
    if (n.value !== undefined) return String(n.value)
    return ''
  }).join('')
}

/**
 * Expand a block arg's raw mdast nodes and collect the resulting plain-text string.
 * Required when the body contains calls like .read {file.mmd}.
 */
async function expandBlockToString(rawNodes: any[], ctx: Context): Promise<string> {
  const parts: string[] = []
  for (const node of rawNodes) {
    const expanded = await expandNode(node, ctx)
    if (expanded === null || expanded === undefined) continue
    const nodes: any[] = Array.isArray(expanded) ? expanded : [expanded]
    for (const n of nodes) {
      if (n.type === 'text') parts.push(n.value ?? '')
      else if (n.children) parts.push(extractText(n.children))
      else if (n.value !== undefined) parts.push(String(n.value))
    }
  }
  return parts.join('')
}

export const diagramPlugin: Plugin = {
  name: 'diagrams',
  functions: [
    {
      name: 'mermaid',
      params: [
        { name: 'caption', optional: true },
        { name: 'body', optional: false, isBody: true },
      ],
      async fn(args: QdRawArg[], ctx: Context) {
        // Distinguish named 'caption' arg from the body arg
        const captionArg = (args as any[]).find((a: any) => a._name === 'caption')
        const bodyArg = (args as any[]).find((a: any) => a._name !== 'caption' && (a.tag === 'block' || !a._name))
          ?? args[args.length - 1]

        let captionText = ''
        if (captionArg) {
          const captionVal = await evalArg(captionArg as QdRawArg, ctx)
          captionText = valueToString(captionVal)
        }

        let diagramContent = ''
        if (bodyArg) {
          const bodyVal = await evalArg(bodyArg as QdRawArg, ctx)
          if (bodyVal.kind === 'string') {
            diagramContent = bodyVal.value
          } else if (bodyVal.kind === 'markdown') {
            // The block contains unexpanded nodes (e.g., .read calls) — expand them
            diagramContent = await expandBlockToString((bodyVal as any).nodes ?? [], ctx)
          } else {
            diagramContent = valueToString(bodyVal)
          }
        }

        return {
          kind: 'markdown' as const,
          nodes: [{
            type: 'qdLayout',
            layoutType: 'mermaid',
            // Store the raw diagram source in attrs so the renderer can create
            // a verbatim text node without routing through remark-rehype's block
            // processing (which would strip leading whitespace from each line).
            attrs: { caption: captionText, diagramContent },
            children: [],
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
