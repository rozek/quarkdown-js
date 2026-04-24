import type { Plugin, ClientScript } from '../core/pipeline/index.js'

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
      code(_state: any, node: any) {
        const lang = node.lang ?? ''
        const code = node.value ?? ''
        const highlighted = highlightCode(code, lang)
        return {
          type: 'element',
          tagName: 'pre',
          properties: {},
          children: [{
            type: 'element',
            tagName: 'code',
            properties: { className: lang ? [`language-${lang}`, 'hljs'] : ['hljs'] },
            children: [{ type: 'raw', value: highlighted }],
          }],
        }
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
