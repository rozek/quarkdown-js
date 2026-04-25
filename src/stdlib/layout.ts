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

const VALID_MAIN_AXIS_ALIGNMENTS = ['start', 'center', 'end', 'spacebetween', 'spacearound', 'spaceevenly']

function errorNode(funcName: string, signature: string, argsGiven: string, message: string, sourceSnippet: string): any {
  return layoutNode('qdError', {
    funcName,
    signature,
    argsGiven,
    message,
    sourceSnippet,
  })
}

export const layoutFunctions: Record<string, (args: QdRawArg[], ctx: Context) => Promise<QdValue>> = {
  center: async ([body], ctx) => {
    if (!body) return { kind: 'markdown', nodes: [layoutNode('center')] }
    const content = await evalArg(body, ctx)
    return { kind: 'markdown', nodes: [layoutNode('center', {}, markdownNodes(content))] }
  },
  row: async (args, ctx) => {
    const alignmentArg = getNamedArg(args, 'alignment')
    const posArgs = positionalArgs(args)
    const bodyArg = posArgs[0]

    if (alignmentArg) {
      const alignVal = await evalArg(alignmentArg, ctx)
      const alignStr = alignVal.kind === 'string' ? alignVal.value : String((alignVal as any).value ?? '')
      if (!VALID_MAIN_AXIS_ALIGNMENTS.includes(alignStr)) {
        const bodyArgStr = bodyArg ? (await evalArg(bodyArg, ctx) as any).value ?? 'Hello!' : 'Hello!'
        const argsGiven = `(${alignStr}, ${bodyArgStr})`
        const signature = '(optional MainAxisAlignment alignment, optional CrossAxisAlignment cross, optional Size gap, MarkdownContent body)'
        const message = `No such element '${alignStr}' among values [${VALID_MAIN_AXIS_ALIGNMENTS.join(', ')}]`
        const sourceSnippet = `.row alignment:{${alignStr}}\n    ${bodyArgStr}`
        return { kind: 'markdown', nodes: [errorNode('row', signature, argsGiven, message, sourceSnippet)] }
      }
    }

    const body = bodyArg ?? (args.length > 0 ? args[args.length - 1] : undefined)
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
    const typeArg  = getNamedArg(args, 'type')
    const posArgs  = positionalArgs(args)
    // First positional arg is the title (optional); last positional is the body
    const titleArg = posArgs.length >= 2 ? posArgs[0] : undefined
    const bodyArg  = posArgs.length >= 2 ? posArgs[posArgs.length - 1]
                   : posArgs.length === 1 ? posArgs[0]
                   : (args.length > 0 ? args[args.length - 1] : undefined)
    const boxType  = typeArg ? String((await evalArg(typeArg, ctx) as any).value ?? 'callout') : 'callout'
    const title    = titleArg ? String((await evalArg(titleArg, ctx) as any).value ?? '') : ''
    const content  = bodyArg ? await evalArg(bodyArg, ctx) : { kind: 'none' as const }
    return { kind: 'markdown', nodes: [layoutNode('box', { boxType, title }, markdownNodes(content))] }
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
  whitespace: async () => ({ kind: 'markdown', nodes: [{ type: 'html', value: '<span>&nbsp;</span>' }] }),
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

  // .text {content} size:{} decoration:{} style:{} weight:{} case:{} variant:{}
  // Produces an inline <span> with appropriate CSS class and style attributes.
  text: async (args, ctx) => {
    const contentArg = positionalArgs(args)[0] ?? args[0]
    const sizeArg      = getNamedArg(args, 'size')
    const decorArg     = getNamedArg(args, 'decoration')
    const styleArg     = getNamedArg(args, 'style')
    const weightArg    = getNamedArg(args, 'weight')
    const caseArg      = getNamedArg(args, 'case')
    const variantArg   = getNamedArg(args, 'variant')

    // Evaluate the content to get child nodes
    const contentVal = contentArg ? await evalArg(contentArg, ctx) : { kind: 'none' as const }
    const children: any[] = contentVal.kind === 'string'
      ? [{ type: 'text', value: contentVal.value }]
      : contentVal.kind === 'markdown'
        ? (contentVal as any).nodes
        : []

    // Build className from size
    let className = ''
    if (sizeArg) {
      const sizeVal = String((await evalArg(sizeArg, ctx) as any).value ?? '')
      className = `size-${sizeVal}`
    }

    // Build inline style string
    const styleParts: string[] = []

    if (styleArg) {
      const sv = String((await evalArg(styleArg, ctx) as any).value ?? '')
      if (sv === 'italic') styleParts.push('font-style: italic')
      else if (sv === 'bold') styleParts.push('font-style: bold')
    }
    if (weightArg) {
      const wv = String((await evalArg(weightArg, ctx) as any).value ?? '')
      if (wv === 'bold') styleParts.push('font-weight: bold')
      else if (wv === 'thin' || wv === 'light') styleParts.push(`font-weight: ${wv}`)
    }
    if (decorArg) {
      const dv = String((await evalArg(decorArg, ctx) as any).value ?? '')
      const decorMap: Record<string, string> = {
        underline:      'text-decoration: underline',
        overline:       'text-decoration: overline',
        underoverline:  'text-decoration: underline overline',
        strikethrough:  'text-decoration: line-through',
        all:            'text-decoration: underline overline line-through',
      }
      if (decorMap[dv]) styleParts.push(decorMap[dv])
    }
    if (caseArg) {
      const cv = String((await evalArg(caseArg, ctx) as any).value ?? '')
      styleParts.push(`text-transform: ${cv}`)
    }
    if (variantArg) {
      const vv = String((await evalArg(variantArg, ctx) as any).value ?? '')
      if (vv === 'smallcaps') styleParts.push('font-variant: small-caps')
      else styleParts.push(`font-variant: ${vv}`)
    }

    const style = styleParts.length > 0 ? styleParts.join('; ') + ';' : ''

    const spanNode: any = {
      type: 'qdInlineSpan',
      className: className || undefined,
      style: style || undefined,
      children,
    }

    return { kind: 'markdown', nodes: [spanNode] }
  },
}
