import { unified } from 'unified'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import type { Root } from 'mdast'
import type { Element, Root as HastRoot, Text } from 'hast'
import type { Context } from '../../core/context/context.js'
import type { ClientScript } from '../../core/pipeline/index.js'
import { getThemeCss } from './themes.js'
import { baseCss } from './base.css.js'

// ---------------------------------------------------------------------------
// Layout type → HTML element/class mapping
// ---------------------------------------------------------------------------

const layoutTypeMap: Record<string, { tag: string; className: string }> = {
  center:    { tag: 'div',     className: 'qd-center' },
  row:       { tag: 'div',     className: 'qd-row' },
  column:    { tag: 'div',     className: 'qd-column' },
  grid:      { tag: 'div',     className: 'qd-grid' },
  stack:     { tag: 'div',     className: 'qd-stack' },
  box:       { tag: 'div',     className: 'qd-box' },
  alert:     { tag: 'aside',   className: 'qd-alert' },
  collapsible: { tag: 'details', className: 'qd-collapsible' },
  tabs:      { tag: 'div',     className: 'qd-tabs' },
  tab:       { tag: 'div',     className: 'qd-tab' },
  pagebreak: { tag: 'div',     className: 'qd-pagebreak' },
  space:     { tag: 'div',     className: 'qd-space' },
  figure:    { tag: 'figure',  className: 'qd-figure' },
  caption:   { tag: 'figcaption', className: '' },
  imagesize: { tag: 'div',     className: 'qd-imagesize' },
  mermaid:   { tag: 'div',     className: 'mermaid' },
}

// ---------------------------------------------------------------------------
// Custom remark-rehype handlers for qdLayout nodes
// ---------------------------------------------------------------------------

const handlers: Record<string, (state: any, node: any) => Element | Element[]> = {
  qdLayout(state: any, node: any): Element | Element[] {
    const layoutType: string = node.layoutType ?? 'center'
    const attrs: Record<string, string> = node.attrs ?? {}
    const mapping = layoutTypeMap[layoutType] ?? { tag: 'div', className: `qd-${layoutType}` }

    // Special case: collapsible → <details><summary>title</summary>body...</details>
    if (layoutType === 'collapsible') {
      const summaryText: string = attrs.title ?? ''
      const summaryEl: Element = {
        type: 'element',
        tagName: 'summary',
        properties: {},
        children: [{ type: 'text', value: summaryText } as Text],
      }
      const bodyChildren = state.all(node)
      return {
        type: 'element',
        tagName: 'details',
        properties: { className: ['qd-collapsible'] },
        children: [summaryEl, ...bodyChildren],
      }
    }

    // Special case: alert → aside.qd-alert.qd-alert--{type}
    if (layoutType === 'alert') {
      const alertType: string = attrs.alertType ?? 'info'
      return {
        type: 'element',
        tagName: 'aside',
        properties: { className: ['qd-alert', `qd-alert--${alertType}`] },
        children: state.all(node),
      }
    }

    // Special case: grid — inject --qd-grid-cols custom property
    if (layoutType === 'grid') {
      const cols = attrs.cols ?? '2'
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['qd-grid'],
          style: `--qd-grid-cols: ${cols}`,
        },
        children: state.all(node),
      }
    }

    // Special case: space — inject height from attrs.size
    if (layoutType === 'space') {
      const size = attrs.size ?? '1em'
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['qd-space'],
          style: `height: ${size}`,
        },
        children: [],
      }
    }

    // Special case: caption → figcaption with text content from attrs.text
    if (layoutType === 'caption') {
      const text: string = attrs.text ?? ''
      return {
        type: 'element',
        tagName: 'figcaption',
        properties: {},
        children: [{ type: 'text', value: text } as Text],
      }
    }

    // Default: use mapping
    const properties: Record<string, unknown> = {}
    if (mapping.className) {
      properties.className = [mapping.className]
    }

    return {
      type: 'element',
      tagName: mapping.tag,
      properties,
      children: state.all(node),
    }
  },

  qdToc(_state: any, _node: any): Element {
    return {
      type: 'element',
      tagName: 'nav',
      properties: { className: ['qd-toc'] },
      children: [{ type: 'text', value: '[Table of Contents]' } as Text],
    }
  },

  mermaid(state: any, node: any): Element {
    return {
      type: 'element',
      tagName: 'div',
      properties: { className: ['mermaid'] },
      children: state.all(node),
    }
  },
}

// ---------------------------------------------------------------------------
// Main render function
// ---------------------------------------------------------------------------

export async function renderHtml(tree: Root, ctx: Context): Promise<string> {
  // Collect handlers from plugins
  const pluginHandlers: Record<string, any> = {}
  for (const plugin of ctx.plugins) {
    Object.assign(pluginHandlers, plugin.handlers ?? {})
  }

  // Merge built-in handlers with plugin handlers (plugin handlers take precedence)
  const allHandlers = { ...handlers, ...pluginHandlers }

  const processor = unified()
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: allHandlers,
    } as any)
    .use(rehypeStringify, { allowDangerousHtml: true })

  const hast = await processor.run(tree as any) as HastRoot
  const bodyHtml = processor.stringify(hast) as string

  // Collect client scripts from plugins
  const headScripts: ClientScript[] = []
  const bodyScripts: ClientScript[] = []
  for (const plugin of ctx.plugins) {
    for (const script of plugin.clientScripts ?? []) {
      if (script.position === 'head') headScripts.push(script)
      else bodyScripts.push(script)
    }
  }

  // Theme CSS
  const themeName = String(ctx.metadata.theme ?? 'default')
  const layoutTheme = String(ctx.metadata.layoutTheme ?? 'default')
  const themeCss = getThemeCss(themeName, layoutTheme)
  const docType = String(ctx.metadata.type ?? 'plain')
  const wrapperClass = `qd-document qd-${docType}`

  // Build head scripts HTML
  const headHtml = headScripts.map(s =>
    s.src ? `<link rel="stylesheet" href="${s.src}">` : `<style>${s.content}</style>`
  ).join('\n')

  // Build body scripts HTML
  const tailHtml = bodyScripts.map(s =>
    s.content ? `<script>${s.content}</script>` : `<script src="${s.src}"></script>`
  ).join('\n')

  // Assemble output
  const themeStyle = `<style>${themeCss}\n${baseCss}</style>`

  let output: string

  if (docType === 'slides') {
    output = `${themeStyle}\n${headHtml}\n<div class="reveal"><div class="slides">\n${bodyHtml}\n</div></div>\n${tailHtml}`
  } else {
    output = `${themeStyle}\n${headHtml}\n<div class="${wrapperClass}">\n${bodyHtml}\n</div>\n${tailHtml}`
  }

  return output.trim()
}
