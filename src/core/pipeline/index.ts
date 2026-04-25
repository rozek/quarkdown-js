import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import type { Root } from 'mdast'
import type { QdValue, QdRawArg, QdParamSpec } from '../ast/index.js'
import { walkPlugin } from '../parser/walk.js'
import { refinePlugin } from '../parser/refine.js'
import { expand } from './expand.js'
import { createContext } from '../context/context.js'
import { renderHtml } from '../../renderer/html/renderer.js'
import { preprocessInlineFootnotes } from '../parser/inline-footnotes.js'

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type DocumentType = 'plain' | 'paged' | 'slides' | 'docs'

export interface CompileOptions {
  type?: DocumentType
  theme?: string
  fetch?: (path: string) => Promise<string>
  plugins?: Plugin[]
  baseUrl?: string
  /** Filesystem directory to resolve relative .read/.include paths against */
  baseDir?: string
  /** When true, output bare HTML without the CSS <style> block or document wrapper div */
  nowrap?: boolean
}

export interface CompileResult {
  html: string
  metadata: DocumentMetadata
  diagnostics: Diagnostic[]
}

export interface DocumentMetadata {
  name?: string
  authors?: string[]
  lang?: string
  type?: DocumentType
  [key: string]: unknown
}

export interface Diagnostic {
  severity: 'error' | 'warning'
  message: string
  line?: number
  column?: number
}

export interface FunctionDefinition {
  name: string
  params: QdParamSpec[]
  fn: (args: QdRawArg[], ctx: unknown) => Promise<QdValue>
}

export interface Plugin {
  name: string
  setup?(ctx: unknown): void | Promise<void>
  functions?: FunctionDefinition[]
  clientScripts?: ClientScript[]
  handlers?: Record<string, unknown>
}

export interface ClientScript {
  id: string
  content?: string
  src?: string
  position: 'head' | 'body-end'
}

// ---------------------------------------------------------------------------
// Main compile function
// ---------------------------------------------------------------------------

export async function compile(source: string, options: CompileOptions = {}): Promise<CompileResult> {
  const ctx = createContext(options)

  // Stage 0: pre-process Quarkdown-specific inline footnote syntax into
  // standard GFM footnote syntax that remark-gfm can handle.
  const preprocessed = preprocessInlineFootnotes(source)

  // Stages 1–3: parse + walk + refine
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(walkPlugin)
    .use(refinePlugin)

  const parsed = processor.parse(preprocessed)
  const refined = await processor.run(parsed) as Root

  // Stage 4: expand (evaluates all QD nodes → standard mdast)
  const expanded = await expand(refined, ctx)

  // Stage 5: render — convert expanded mdast to HTML via remark-rehype + rehype-stringify
  const html = await renderHtml(expanded, ctx)

  return { html, metadata: ctx.metadata, diagnostics: ctx.diagnostics }
}

// ---------------------------------------------------------------------------
// Minimal serializer — converts expanded mdast to a flat text string
// (replaced by proper rehype renderer in Phase 5)
// ---------------------------------------------------------------------------

function serializeToText(root: Root): string {
  return serializeNode(root)
}

function serializeNode(node: any): string {
  if (!node) return ''

  switch (node.type) {
    case 'root':
      return (node.children ?? []).map(serializeNode).join('\n')

    case 'paragraph':
      return '<p>' + (node.children ?? []).map(serializeNode).join('') + '</p>'

    case 'heading': {
      const level = node.depth ?? 1
      const content = (node.children ?? []).map(serializeNode).join('')
      return `<h${level}>${content}</h${level}>`
    }

    case 'text':
      return escapeHtml(node.value ?? '')

    case 'inlineCode':
      return `<code>${escapeHtml(node.value ?? '')}</code>`

    case 'code':
      return `<pre><code>${escapeHtml(node.value ?? '')}</code></pre>`

    case 'strong':
      return `<strong>${(node.children ?? []).map(serializeNode).join('')}</strong>`

    case 'emphasis':
      return `<em>${(node.children ?? []).map(serializeNode).join('')}</em>`

    case 'link': {
      const href = node.url ?? ''
      const content = (node.children ?? []).map(serializeNode).join('')
      return `<a href="${escapeHtml(href)}">${content}</a>`
    }

    case 'image':
      return `<img src="${escapeHtml(node.url ?? '')}" alt="${escapeHtml(node.alt ?? '')}">`

    case 'blockquote':
      return `<blockquote>${(node.children ?? []).map(serializeNode).join('')}</blockquote>`

    case 'list': {
      const tag = node.ordered ? 'ol' : 'ul'
      return `<${tag}>${(node.children ?? []).map(serializeNode).join('')}</${tag}>`
    }

    case 'listItem':
      return `<li>${(node.children ?? []).map(serializeNode).join('')}</li>`

    case 'thematicBreak':
      return '<hr>'

    case 'html':
      return node.value ?? ''

    case 'qdLayout': {
      // Layout nodes: emit a div with data attributes and recurse into children
      const attrs = Object.entries(node.attrs ?? {})
        .map(([k, v]) => ` data-${k}="${escapeHtml(String(v))}"`)
        .join('')
      const content = (node.children ?? []).map(serializeNode).join('')
      return `<div data-layout="${escapeHtml(node.layoutType ?? '')}"${attrs}>${content}</div>`
    }

    case 'table': {
      const rows = (node.children ?? []).map(serializeNode).join('')
      return `<table>${rows}</table>`
    }
    case 'tableRow': {
      const cells = (node.children ?? []).map(serializeNode).join('')
      return `<tr>${cells}</tr>`
    }
    case 'tableCell': {
      const content = (node.children ?? []).map(serializeNode).join('')
      return `<td>${content}</td>`
    }

    default:
      // Fallback: try to serialize children
      if (node.children) {
        return (node.children as any[]).map(serializeNode).join('')
      }
      if (node.value !== undefined) return escapeHtml(String(node.value))
      return ''
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
