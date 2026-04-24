import type { Context } from '../core/context/context.js'
import type { QdRawArg, QdValue } from '../core/ast/index.js'
import { evalArg } from '../core/pipeline/expand.js'

function layoutNode(layoutType: string, attrs: Record<string, string> = {}, children: any[] = []): any {
  return { type: 'qdLayout', layoutType, attrs, children }
}

function getNamedArg(args: QdRawArg[], name: string): QdRawArg | undefined {
  return (args as any[]).find((a: any) => a.name === name)
}

function positionalArgs(args: QdRawArg[]): QdRawArg[] {
  return (args as any[]).filter((a: any) => !a.name)
}

export const documentFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  // Metadata — handled by expander as qdMetadata nodes; noops here
  doctype: async () => ({ kind: 'none' }),
  docname: async () => ({ kind: 'none' }),
  author:  async () => ({ kind: 'none' }),
  lang:    async () => ({ kind: 'none' }),
  theme:   async () => ({ kind: 'none' }),

  toc: async () => ({ kind: 'markdown', nodes: [layoutNode('toc')] }),

  id: async (args, ctx) => {
    const nameArg = positionalArgs(args)[0] ?? args[0]
    const bodyArg = positionalArgs(args)[1] ?? args[1]
    const name = nameArg ? String((await evalArg(nameArg, ctx) as any).value ?? '') : ''
    const body = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'none' as const }
    const children = body.kind === 'markdown' ? body.nodes : []
    return { kind: 'markdown', nodes: [layoutNode('id', { name }, children as any[])] }
  },

  ref: async ([a], ctx) => {
    const name = a ? String((await evalArg(a, ctx) as any).value ?? '') : ''
    return { kind: 'markdown', nodes: [layoutNode('ref', { name })] }
  },

  footnote: async ([text], ctx) => {
    const t = text ? String((await evalArg(text, ctx) as any).value ?? '') : ''
    return { kind: 'markdown', nodes: [layoutNode('footnote', { text: t })] }
  },

  numbering: async ([type], ctx) => {
    const t = type ? String((await evalArg(type, ctx) as any).value ?? '') : ''
    return { kind: 'markdown', nodes: [layoutNode('numbering', { numberingType: t })] }
  },

  counter: async ([name], ctx) => {
    const n = name ? String((await evalArg(name, ctx) as any).value ?? '') : ''
    return { kind: 'markdown', nodes: [layoutNode('counter', { name: n })] }
  },

  code: async (args, ctx) => {
    const langArg = getNamedArg(args, 'lang')
    const lnArg   = getNamedArg(args, 'linenumbers')
    const focusArg = getNamedArg(args, 'focus')
    const bodyArg = positionalArgs(args)[0] ?? args[args.length - 1]
    const lang = langArg ? String((await evalArg(langArg, ctx) as any).value ?? '') : ''
    const lineNumbers = lnArg ? (await evalArg(lnArg, ctx) as any).value !== false : true
    const focus = focusArg ? String((await evalArg(focusArg, ctx) as any).value ?? '') : ''
    const body = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'string' as const, value: '' }
    const code = (body as any).value ?? ''
    return { kind: 'markdown', nodes: [{ type: 'code', lang, value: code, data: { lineNumbers, focus } }] }
  },

  codespan: async ([text], ctx) => {
    const t = text ? String((await evalArg(text, ctx) as any).value ?? '') : ''
    return { kind: 'markdown', nodes: [{ type: 'inlineCode', value: t }] }
  },

  // Slides
  slide:      async () => ({ kind: 'markdown', nodes: [layoutNode('slide')] }),
  speakernotes: async ([body], ctx) => {
    const content = body ? await evalArg(body, ctx) : { kind: 'none' as const }
    const children = content.kind === 'markdown' ? content.nodes : []
    return { kind: 'markdown', nodes: [layoutNode('speakernotes', {}, children as any[])] }
  },
  slidetheme: async ([name], ctx) => {
    if (name) {
      (ctx.metadata as any).slideTheme = String((await evalArg(name, ctx) as any).value ?? '')
    }
    return { kind: 'none' }
  },
  slidetransition: async ([t], ctx) => {
    if (t) {
      (ctx.metadata as any).slideTransition = String((await evalArg(t, ctx) as any).value ?? '')
    }
    return { kind: 'none' }
  },

  // Page format
  pageformat: async ([size], ctx) => {
    if (size) {
      (ctx.metadata as any).pageFormat = String((await evalArg(size, ctx) as any).value ?? 'A4')
    }
    return { kind: 'none' }
  },
  pageorientation: async ([o], ctx) => {
    if (o) {
      (ctx.metadata as any).pageOrientation = String((await evalArg(o, ctx) as any).value ?? 'portrait')
    }
    return { kind: 'none' }
  },
}
