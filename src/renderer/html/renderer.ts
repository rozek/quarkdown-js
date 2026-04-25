import { unified } from 'unified'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
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
  row:       { tag: 'div',     className: 'stack stack-row' },
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

function escapeHtmlRenderer(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const handlers: Record<string, (state: any, node: any) => Element | Element[]> = {
  // Custom code block handler: supports focus lines, linenumbers toggle, and caption.
  code(_state: any, node: any): Element | Element[] {
    const lang: string = node.lang ?? ''
    const value: string = node.value ?? ''
    const data: Record<string, unknown> = (node.data ?? {}) as Record<string, unknown>
    const focusStr: string = String(data.focus ?? '')
    const lineNumbers: boolean = !(data.lineNumbers === false || data.lineNumbers === 'false'
      || data.lineNumbers === 'no')
    const caption: string = String(data.caption ?? '')

    const classes: string[] = []
    if (lang) classes.push(`language-${lang}`)
    if (focusStr) classes.push('focus-lines')
    if (!lineNumbers) classes.push('nohljsln')

    const codeProps: Record<string, unknown> = { className: classes }
    if (focusStr) {
      const m = focusStr.match(/^(\d+)\.\.(\d+)$/)
      if (m) {
        codeProps['dataFocusStart'] = m[1]
        codeProps['dataFocusEnd'] = m[2]
      }
    }

    const codeEl: Element = {
      type: 'element',
      tagName: 'code',
      properties: codeProps,
      children: [{ type: 'raw', value: escapeHtmlRenderer(value) } as any],
    }

    const preEl: Element = {
      type: 'element',
      tagName: 'pre',
      properties: {},
      children: [codeEl],
    }

    if (caption) {
      const figcaptionEl: Element = {
        type: 'element',
        tagName: 'figcaption',
        properties: { className: ['caption-bottom'] },
        children: [{ type: 'text', value: caption } as Text],
      }
      return {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [preEl, figcaptionEl],
      }
    }

    return preEl
  },

  // Inline code: wrap <code> in <span class="codespan-content">
  // Use 'raw' child with explicit HTML escaping to ensure &lt; / &gt; entities
  // (rehype-stringify with allowDangerousHtml would produce &#x3C; for '<').
  inlineCode(_state: any, node: any): Element {
    const codeEl: Element = {
      type: 'element',
      tagName: 'code',
      properties: {},
      children: [{ type: 'raw', value: escapeHtmlRenderer(node.value ?? '') } as any],
    }
    return {
      type: 'element',
      tagName: 'span',
      properties: { className: ['codespan-content'] },
      children: [codeEl],
    }
  },

  // Inline text span: <span class="..." style="...">children</span>
  qdInlineSpan(state: any, node: any): Element {
    const className: string | undefined = node.className || undefined
    const style: string | undefined = node.style || undefined
    const properties: Record<string, unknown> = {}
    if (className) properties.className = [className]
    if (style) properties.style = style
    return {
      type: 'element',
      tagName: 'span',
      properties,
      children: state.all(node),
    }
  },

  // Attribution paragraph: <p class="attribution">...</p>
  qdAttribution(state: any, node: any): Element {
    return {
      type: 'element',
      tagName: 'p',
      properties: { className: ['attribution'] },
      children: state.all(node),
    }
  },

  // Blockquote: handle GFM alert type (adds CSS class)
  blockquote(state: any, node: any): Element {
    const alertType: string | undefined = node.data?.alertType
    const properties: Record<string, unknown> = {}
    if (alertType) {
      properties.className = [alertType]
    }
    return {
      type: 'element',
      tagName: 'blockquote',
      properties,
      children: state.all(node),
    }
  },

  qdLayout(state: any, node: any): Element | Element[] {
    const layoutType: string = node.layoutType ?? 'center'
    const attrs: Record<string, string> = node.attrs ?? {}

    // Special case: qdPageBreak → <div class="page-break" data-hidden="">
    if (layoutType === 'qdPageBreak') {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['page-break'], dataHidden: '' },
        children: [],
      }
    }

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

    // Special case: row — flex row with default alignment style
    if (layoutType === 'row') {
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          style: 'justify-content: flex-start; align-items: center;',
          className: ['stack', 'stack-row'],
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

    // Special case: mermaid → <figure><pre class="mermaid">content</pre>[<figcaption>caption</figcaption>]</figure>
    if (layoutType === 'mermaid') {
      const caption: string = attrs.caption ?? ''
      // diagramContent is the raw diagram source stored by the diagrams plugin.
      // Fall back to child nodes if diagramContent is absent (legacy path).
      const diagramContent: string | undefined = attrs.diagramContent
      const preChildren: (Element | Text)[] = diagramContent !== undefined
        ? [{ type: 'text', value: diagramContent } as Text]
        : (state.all(node) as (Element | Text)[])
      const preEl: Element = {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'] },
        children: preChildren,
      }
      const figChildren: (Element | Text)[] = [preEl]
      if (caption) {
        const figcaptionEl: Element = {
          type: 'element',
          tagName: 'figcaption',
          properties: { className: ['caption-bottom'] },
          children: [{ type: 'text', value: caption } as Text],
        }
        figChildren.push(figcaptionEl)
      }
      return {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: figChildren,
      }
    }

    // Special case: qdError → <div class="box error"> with error details
    if (layoutType === 'qdError') {
      const funcName: string = attrs.funcName ?? 'unknown'
      const signature: string = attrs.signature ?? ''
      const argsGiven: string = attrs.argsGiven ?? ''
      const message: string = attrs.message ?? ''
      const sourceSnippet: string = attrs.sourceSnippet ?? ''

      const signatureSpan: Element = {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['inline-collapse'],
          'data-full-text': signature,
          'data-collapsed-text': '(...)',
          'data-collapsed': 'true',
        },
        children: [{ type: 'text', value: '(...)' } as Text],
      }
      const argsSpan: Element = {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['inline-collapse'],
          'data-full-text': argsGiven,
          'data-collapsed-text': '(...)',
          'data-collapsed': 'false',
        },
        children: [{ type: 'text', value: argsGiven } as Text],
      }
      const errorEm: Element = {
        type: 'element',
        tagName: 'em',
        properties: {},
        children: [{ type: 'text', value: message } as Text],
      }
      const br: Element = { type: 'element', tagName: 'br', properties: {}, children: [] }
      const descPara: Element = {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          { type: 'text', value: `Cannot call function ${funcName}` } as Text,
          signatureSpan,
          { type: 'text', value: ' with arguments ' } as Text,
          argsSpan,
          { type: 'text', value: ': ' } as Text,
          br,
          errorEm,
        ],
      }
      const pre: Element = {
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'code',
          properties: { className: ['no-highlight', 'nohljsln'] },
          children: [{ type: 'text', value: sourceSnippet } as Text],
        }],
      }
      const boxContent: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['box-content'] },
        children: [descPara, pre],
      }
      const header: Element = {
        type: 'element',
        tagName: 'header',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'h4',
          properties: { 'data-qd-noid': true },
          children: [{ type: 'text', value: `Error: ${funcName}` } as Text],
        }],
      }
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['box', 'error'], 'data-qd-error': true },
        children: [header, boxContent],
      }
    }

    // Special case: box → <div class="box {type}"> with optional header and box-content wrapper
    if (layoutType === 'box') {
      const boxType: string = attrs.boxType ?? 'callout'
      const title: string = attrs.title ?? ''
      const contentChildren: Element[] = state.all(node)
      const boxContentEl: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['box-content'] },
        children: contentChildren,
      }
      const boxChildren: Element[] = []
      if (title) {
        const headerEl: Element = {
          type: 'element',
          tagName: 'header',
          properties: {},
          children: [{
            type: 'element',
            tagName: 'h4',
            properties: { 'data-qd-noid': true },
            children: [{ type: 'text', value: title } as Text],
          }],
        }
        boxChildren.push(headerEl)
      }
      boxChildren.push(boxContentEl)
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['box', boxType] },
        children: boxChildren,
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
// Quarkdown footnote transformer — converts GFM-style footnotes to
// Quarkdown's __footnote-* id/class structure.
// ---------------------------------------------------------------------------

/**
 * Rehype plugin that rewrites GFM footnotes generated by remark-gfm into the
 * Quarkdown footnote format:
 *
 * References:
 *   GFM:  <sup><a href="#user-content-fn-{label}" data-footnote-ref>N</a></sup>
 *   QD:   <sup class="footnote-reference footnote-label"
 *               data-definition="__footnote-{label}">
 *           <a href="#__footnote-{label}">N</a>
 *         </sup>
 *
 * Definitions section:
 *   GFM:  <section data-footnotes class="footnotes"><ol>
 *           <li id="user-content-fn-{label}"><p>…backref-link…</p></li>
 *         </ol></section>
 *   QD:   <section class="footnotes">
 *           <span class="footnote-definition" id="__footnote-{label}">
 *             …content without backref link…
 *           </span>
 *         </section>
 */
function quarkdownFootnotes() {
  return (tree: HastRoot) => {
    // ── Pass 1: rewrite footnote references ──────────────────────────────────
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'sup') return
      // Look for a single child <a data-footnote-ref href="#user-content-fn-...">
      if (node.children.length !== 1) return
      const child = node.children[0]
      if (child.type !== 'element') return
      const a = child as Element
      if (a.tagName !== 'a') return
      if (!a.properties?.dataFootnoteRef && a.properties?.['data-footnote-ref'] === undefined) {
        // Check whether the property exists with any truthy form
        const hasRef = 'dataFootnoteRef' in a.properties ||
          Object.prototype.hasOwnProperty.call(a.properties, 'data-footnote-ref')
        if (!hasRef) return
      }

      const href = String(a.properties?.href ?? '')
      const match = href.match(/^#user-content-fn-(.+)$/)
      if (!match) return
      const label = match[1]
      const qdId = `__footnote-${label}`

      // Replace <a> with Quarkdown-style <a>
      const newA: Element = {
        type: 'element',
        tagName: 'a',
        properties: { href: `#${qdId}` },
        children: a.children,
      }

      // Replace the <sup> in-place
      if (parent && index !== undefined) {
        const newSup: Element = {
          type: 'element',
          tagName: 'sup',
          properties: {
            className: ['footnote-reference', 'footnote-label'],
            'data-definition': qdId,
          },
          children: [newA],
        }
        ;(parent.children as Element[])[index] = newSup
      }
    })

    // ── Pass 2: rewrite footnote definitions section ──────────────────────────
    visit(tree, 'element', (node: Element, index, parent) => {
      // Find <section data-footnotes ...>
      if (node.tagName !== 'section') return
      if (!('dataFootnotes' in node.properties) &&
          !Object.prototype.hasOwnProperty.call(node.properties, 'data-footnotes')) return

      // Collect all <li id="user-content-fn-..."> items from any nested <ol>/<ul>
      const defSpans: Element[] = []
      visit(node, 'element', (li: Element) => {
        if (li.tagName !== 'li') return
        const liId = String(li.properties?.id ?? '')
        const liMatch = liId.match(/^user-content-fn-(.+)$/)
        if (!liMatch) return
        const label = liMatch[1]
        const qdId = `__footnote-${label}`

        // Collect li children, stripping backref <a data-footnote-backref> links
        const filteredChildren = filterBackrefs(li.children as Element[])

        defSpans.push({
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['footnote-definition'],
            id: qdId,
          },
          children: filteredChildren,
        })
      })

      // Replace the section with a new <section class="footnotes"> containing
      // the spans
      if (parent && index !== undefined && defSpans.length > 0) {
        const newSection: Element = {
          type: 'element',
          tagName: 'section',
          properties: { className: ['footnotes'] },
          children: defSpans,
        }
        ;(parent.children as Element[])[index] = newSection
      }
    })
  }
}

/**
 * Recursively remove `<a data-footnote-backref>` elements from a list of
 * HAST nodes, returning a new array. Content nodes are kept as-is.
 */
function filterBackrefs(nodes: Element[]): Element[] {
  const result: Element[] = []
  for (const node of nodes) {
    if (node.type === 'element' &&
        (node as Element).tagName === 'a' &&
        ('dataFootnoteBackref' in (node as Element).properties ||
         Object.prototype.hasOwnProperty.call((node as Element).properties, 'data-footnote-backref'))) {
      continue
    }
    if (node.type === 'element' && (node as Element).children) {
      const filtered = filterBackrefs((node as Element).children as Element[])
      result.push({ ...(node as Element), children: filtered })
    } else {
      result.push(node)
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Smart typography — applied to text nodes in the HAST tree
// ---------------------------------------------------------------------------

/**
 * Convert a heading text to a slug id (lower-case, spaces → hyphens, strip
 * non-alphanumeric characters), matching the Quarkdown reference behaviour.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/**
 * Extract the plain text content of a HAST element for id generation.
 */
function hastTextContent(node: Element | HastRoot): string {
  let text = ''
  const stack: (Element | HastRoot | Text)[] = [node as Element | HastRoot]
  while (stack.length > 0) {
    const current = stack.pop()!
    if (current.type === 'text') {
      text += (current as Text).value
    } else if ((current as any).type === 'raw') {
      // 'raw' nodes are produced by inlineCode → escapeHtmlRenderer; decode HTML
      // entities to recover the original text for slug generation.
      text += ((current as any).value as string)
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
    } else if ('children' in current) {
      for (let i = (current as Element | HastRoot).children.length - 1; i >= 0; i--) {
        const child = (current as Element | HastRoot).children[i]
        if (child.type === 'text' || child.type === 'element' || (child as any).type === 'raw') {
          stack.push(child as Text | Element)
        }
      }
    }
  }
  return text
}

/**
 * Apply Quarkdown-compatible smart typography to a text string:
 * - Apostrophes and right single quotes → &rsquo; (right single quotation mark)
 * - Opening single quotes (preceded by space or start) → &lsquo;
 * - Space-hyphen-space (em dash context) → &ndash;
 */
function applySmartTypography(text: string): string {
  // Replace " - " (space-hyphen-space) with en-dash
  text = text.replace(/ - /g, ' \u2013 ')
  // Replace straight apostrophe/right single quote with right curly quote
  // First handle opening single quotes: preceded by whitespace or start of string
  text = text.replace(/(^|\s)'/g, (_, prefix: string) => `${prefix}\u2018`)
  // All remaining straight quotes are closing/apostrophes
  text = text.replace(/'/g, '\u2019')
  return text
}

/**
 * Recursively apply smart typography to all text nodes in the HAST tree,
 * but skip subtrees rooted at `.box.error` elements (system-generated error
 * messages must not be altered by typographic transforms).
 */
function applySmartTypographyToTree(node: HastRoot | Element | Text): void {
  if (node.type === 'text') {
    ;(node as Text).value = applySmartTypography((node as Text).value)
    return
  }
  if (node.type === 'element') {
    const el = node as Element
    // Skip system-generated error boxes (qdError nodes), identified by data-qd-error attribute.
    // User-defined .box type:{error} boxes should still receive smart typography.
    if (el.tagName === 'div' && el.properties?.['data-qd-error']) {
      return
    }
    for (const child of el.children) {
      applySmartTypographyToTree(child as HastRoot | Element | Text)
    }
    return
  }
  if ('children' in node) {
    for (const child of (node as HastRoot).children) {
      applySmartTypographyToTree(child as HastRoot | Element | Text)
    }
  }
}

/**
 * Rehype plugin that:
 * 1. Applies smart typography to all text nodes (before stripping internal markers)
 * 2. Adds id="{slug}" to all heading elements; adds class="page-break" only to H1
 * 3. Strips internal marker attributes (data-qd-error, data-qd-noid)
 */
function quarkdownPostProcess() {
  return (tree: HastRoot) => {
    // Pass 1: smart typography on text nodes.
    // The data-qd-error attribute is still present here so the traversal can
    // skip error-box subtrees (applySmartTypographyToTree checks for it).
    applySmartTypographyToTree(tree)

    // Pass 2: headings — add id; add page-break class only to H1.
    // Also strip internal marker attributes now that smart typography is done.
    visit(tree, 'element', (node: Element) => {
      // Strip the internal qdError marker now that smart-typography pass is done.
      if (node.properties?.['data-qd-error']) {
        delete node.properties['data-qd-error']
      }
      if (/^h[1-6]$/.test(node.tagName)) {
        if (node.properties['data-qd-noid']) {
          delete node.properties['data-qd-noid']
          return
        }
        const text = hastTextContent(node)
        const id = slugify(text)
        // Apply class="page-break" to H1 BEFORE id to match Quarkdown's attribute order.
        if (node.tagName === 'h1') {
          const existingClass = (node.properties.className as string[] | undefined) ?? []
          node.properties.className = ['page-break', ...existingClass.filter((c: string) => c !== 'page-break')]
        }
        if (id) {
          node.properties.id = id
        }
      }
    })
  }
}

// ---------------------------------------------------------------------------
// Typographic entity encoding
// ---------------------------------------------------------------------------

/**
 * Convert typographic Unicode characters to their named HTML entities,
 * matching the output of the original Quarkdown Java serialiser.
 * Only the six smartquote / dash code points are replaced; ASCII is untouched.
 */
function encodeTypographicEntities(html: string): string {
  return html
    .replace(/\u2018/g, '&lsquo;')
    .replace(/\u2019/g, '&rsquo;')
    .replace(/\u201C/g, '&ldquo;')
    .replace(/\u201D/g, '&rdquo;')
    .replace(/\u2013/g, '&ndash;')
    .replace(/\u2014/g, '&mdash;')
}

// ---------------------------------------------------------------------------
// Main render function
// ---------------------------------------------------------------------------

export async function renderHtml(tree: Root, ctx: Context): Promise<string> {
  // Collect handlers from plugins
  const pluginHandlers: Record<string, unknown> = {}
  for (const plugin of ctx.plugins) {
    Object.assign(pluginHandlers, plugin.handlers ?? {})
  }

  // Merge built-in handlers with plugin handlers (plugin handlers take precedence)
  const allHandlers = { ...handlers, ...pluginHandlers }

  const processor = unified()
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: allHandlers,
    } as Parameters<typeof unified.prototype.use>[0])
    .use(quarkdownFootnotes)
    .use(quarkdownPostProcess)
    .use(rehypeStringify, { allowDangerousHtml: true, closeSelfClosing: true })

  const hast = await processor.run(tree as Parameters<typeof processor.run>[0]) as HastRoot
  const bodyHtml = encodeTypographicEntities(processor.stringify(hast) as string)

  // In nowrap mode, return bare HTML matching Quarkdown's --pipe output
  if (ctx.nowrap) {
    return bodyHtml
  }

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
