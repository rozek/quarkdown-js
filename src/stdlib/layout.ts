import type { Context } from '../core/context/context.js'
import type { QdRawArg, QdValue } from '../core/ast/index.js'
import { evalArg } from '../core/pipeline/expand.js'

function layoutNode(layoutType: string, attrs: Record<string, string> = {}, children: any[] = []): any {
  return { type: 'qdLayout', layoutType, attrs, children }
}

function markdownNodes(val: QdValue): any[] {
  if (val.kind === 'markdown') return val.nodes as any[]
  if (val.kind === 'string') return [{ type: 'paragraph', children: [{ type: 'text', value: val.value }] }]
  if (val.kind === 'none') return []
  return []
}

function getNamedArg(args: QdRawArg[], name: string): QdRawArg | undefined {
  return (args as any[]).find((a: any) => a._name === name)
}

function positionalArgs(args: QdRawArg[]): QdRawArg[] {
  return (args as any[]).filter((a: any) => !a._name)
}

export const layoutFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  center: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('center')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('center', {}, markdownNodes(content))] }
  },
  row: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('row')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('row', {}, markdownNodes(content))] }
  },
  column: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('column')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('column', {}, markdownNodes(content))] }
  },
  grid: async (args, ctx) => {
    const colsArg = getNamedArg(args, 'cols') ?? args[0]
    const bodyArg = positionalArgs(args)[0] ?? args[args.length - 1]
    const cols = colsArg ? String((await evalArg(colsArg, ctx) as any).value ?? '2') : '2'
    const content = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('grid', { cols }, markdownNodes(content))] }
  },
  stack: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('stack')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('stack', {}, markdownNodes(content))] }
  },
  box: async (args, ctx) => {
    const titleArg = getNamedArg(args, 'title')
    const bodyArg  = positionalArgs(args)[0] ?? args[args.length - 1]
    const title = titleArg ? String((await evalArg(titleArg, ctx) as any).value ?? '') : ''
    const content = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('box', { title }, markdownNodes(content))] }
  },
  alert: async (args, ctx) => {
    const typeArg = getNamedArg(args, 'type')
    const bodyArg = positionalArgs(args)[0] ?? args[args.length - 1]
    const alertType = typeArg ? String((await evalArg(typeArg, ctx) as any).value ?? 'info') : 'info'
    const content = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('alert', { alertType }, markdownNodes(content))] }
  },
  collapsible: async ([title, body], ctx) => {
    const titleText = title ? String((await evalArg(title, ctx) as any).value ?? '') : ''
    const content = body ? await evalArg(body, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('collapsible', { title: titleText }, markdownNodes(content))] }
  },
  tab: async ([title, body], ctx) => {
    const titleText = title ? String((await evalArg(title, ctx) as any).value ?? '') : ''
    const content = body ? await evalArg(body, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('tab', { title: titleText }, markdownNodes(content))] }
  },
  tabs: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('tabs')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('tabs', {}, markdownNodes(content))] }
  },
  pagebreak: async () => ({ kind: 'markdown', nodes: [layoutNode('pagebreak')] }),
  space: async (args, ctx) => {
    const size = args[0] ? String((await evalArg(args[0], ctx) as any).value ?? '1em') : '1em'
    return { kind: 'markdown', nodes: [layoutNode('space', { size })] }
  },
  hrule: async () => ({ kind: 'markdown', nodes: [{ type: 'thematicBreak' }] }),
  figure: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('figure')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('figure', {}, markdownNodes(content))] }
  },
  caption: async ([text], ctx) => {
    const t = text ? String((await evalArg(text, ctx) as any).value ?? '') : ''
    return { kind: 'markdown', nodes: [layoutNode('caption', { text: t })] }
  },
  imagesize: async (args, ctx) => {
    const widthArg  = getNamedArg(args, 'width')
    const heightArg = getNamedArg(args, 'height')
    const bodyArg   = positionalArgs(args)[0] ?? args[args.length - 1]
    const width  = widthArg  ? String((await evalArg(widthArg, ctx) as any).value ?? '')  : ''
    const height = heightArg ? String((await evalArg(heightArg, ctx) as any).value ?? '') : ''
    const content = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('imagesize', { width, height }, markdownNodes(content))] }
  },
}
