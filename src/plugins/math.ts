import type { Plugin, ClientScript } from '../core/pipeline/index.js'

const katexCdnCss: ClientScript = {
  id: 'katex-css',
  src: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
  position: 'head',
}

const katexScript: ClientScript = {
  id: 'katex-js',
  src: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
  position: 'body-end',
}

const katexAutoRenderScript: ClientScript = {
  id: 'katex-autorender',
  src: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js',
  position: 'body-end',
}

const katexInitScript: ClientScript = {
  id: 'katex-init',
  content: `document.addEventListener('DOMContentLoaded', () => {
  renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ],
    throwOnError: false
  });
});`,
  position: 'body-end',
}

function renderKatex(tex: string, displayMode: boolean): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const katex = require('katex') as typeof import('katex')
    return katex.renderToString(tex, { throwOnError: false, displayMode })
  } catch {
    // katex not installed or failed — return escaped tex
    return displayMode ? `<pre>$$${tex}$$</pre>` : `<code>$${tex}$</code>`
  }
}

export const mathPlugin: Plugin = {
  name: 'math',
  handlers: {
    // Handle inline math: $ … $ (remark-math produces 'inlineMath' nodes)
    inlineMath(_state: any, node: any) {
      return {
        type: 'element',
        tagName: 'span',
        properties: { className: ['qd-math-inline'] },
        children: [{ type: 'raw', value: renderKatex(node.value, false) }],
      }
    },
    // Handle block math: $$ … $$
    math(_state: any, node: any) {
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['qd-math-block'] },
        children: [{ type: 'raw', value: renderKatex(node.value, true) }],
      }
    },
  },
  clientScripts: [katexCdnCss, katexScript, katexAutoRenderScript, katexInitScript],
}
