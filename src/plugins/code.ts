import type { Plugin, ClientScript } from '../core/pipeline/index.js'
import type { Element, Text } from 'hast'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function highlightCode(code: string, lang: string): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const hljs = require('highlight.js') as typeof import('highlight.js').default
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    }
    return hljs.highlightAuto(code).value
  } catch {
    return escapeHtml(code)
  }
}

export function codePlugin(theme = 'github'): Plugin {
  return {
    name: 'code',
    handlers: {
      code(_state: unknown, node: Record<string, unknown>): Element | Element[] {
        const lang: string = (node.lang as string | undefined) ?? ''
        const code: string = (node.value as string | undefined) ?? ''
        const data: Record<string, unknown> = (node.data as Record<string, unknown> | undefined) ?? {}
        const focusStr: string = String(data.focus ?? '')
        const lineNumbers: boolean = !(data.lineNumbers === false || data.lineNumbers === 'false'
          || data.lineNumbers === 'no')
        const caption: string = String(data.caption ?? '')

        const highlighted = highlightCode(code, lang)

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
          children: [{ type: 'raw', value: highlighted } as unknown as Text],
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
    },
    clientScripts: [
      {
        id: 'hljs-css',
        src: `https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/styles/${theme}.min.css`,
        position: 'head',
      } as ClientScript,
      {
        id: 'hljs-js',
        src: 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/highlight.min.js',
        position: 'body-end',
      } as ClientScript,
      {
        id: 'hljs-init',
        content: `if (typeof hljs !== 'undefined') hljs.highlightAll();`,
        position: 'body-end',
      } as ClientScript,
    ],
  }
}

// Default export with github theme
export const defaultCodePlugin = codePlugin()
