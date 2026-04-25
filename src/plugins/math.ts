import type { Plugin, ClientScript } from '../core/pipeline/index.js'
import type { Element, Text } from 'hast'

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

/**
 * Escape HTML special characters using named entity references.
 * Uses &amp; and &lt; (named) rather than &#x26; / &#x3C; (numeric hex)
 * to match the Quarkdown reference output.
 */
function escapeFormulaHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Build a <formula> element with the given TeX content as a raw child.
 * Extra properties (e.g. data-block, data-location) are merged in.
 * Uses a 'raw' child with manually escaped HTML so that rehype-stringify
 * emits named entities (&amp;, &lt;) rather than numeric hex entities.
 */
function formulaElement(tex: string, extraProps: Record<string, unknown> = {}): Element {
  return {
    type: 'element',
    tagName: 'formula',
    properties: extraProps,
    children: [{ type: 'raw', value: escapeFormulaHtml(tex) } as any],
  }
}

export const mathPlugin: Plugin = {
  name: 'math',
  handlers: {
    /**
     * Inline math: $ expr $ inside a paragraph that is NOT alone on its line.
     * Renders as <formula>expr</formula>.
     */
    inlineMath(_state: unknown, node: { value?: string }): Element {
      return formulaElement(node.value ?? '')
    },

    /**
     * Block math: $$$ ... $$$ (remark-math 'math' node).
     * Renders as <formula data-block="">...</formula>.
     */
    math(_state: unknown, node: { value?: string }): Element {
      return formulaElement(node.value ?? '', { 'data-block': '' })
    },

    /**
     * Paragraph — intercept paragraphs that contain only an inlineMath node
     * (Quarkdown single-$ block math) or inlineMath + text "{#_}" (numbered equation).
     *
     * Cases:
     *   1. Paragraph with exactly one child of type 'inlineMath'
     *      → <p>$<formula>expr</formula>$</p>
     *
     *   2. Paragraph with inlineMath as first child and trailing text " {#_}"
     *      → <formula data-block="" data-location="(1)">expr</formula>
     *      (equation counter increments; we use a module-level counter)
     *
     *   3. Any other paragraph → delegate to remark-rehype default (return undefined).
     */
    paragraph(state: { all: (node: unknown) => Element[] }, node: { children?: unknown[] }): Element | Element[] | undefined {
      const children = node.children ?? []

      if (children.length === 0) return undefined

      // Check case 2: inlineMath + text "{#_}"
      if (
        children.length === 2 &&
        (children[0] as { type?: string }).type === 'inlineMath' &&
        (children[1] as { type?: string }).type === 'text'
      ) {
        const mathNode = children[0] as { value?: string }
        const textNode = children[1] as { value?: string }
        const trailing = (textNode.value ?? '').trim()

        if (trailing === '{#_}') {
          equationCounter++
          return formulaElement(mathNode.value ?? '', {
            'data-block': '',
            'data-location': `(${equationCounter})`,
          })
        }
      }

      // Check case 1: single inlineMath child — treat as block formula
      if (
        children.length === 1 &&
        (children[0] as { type?: string }).type === 'inlineMath'
      ) {
        const mathNode = children[0] as { value?: string }
        return formulaElement(mathNode.value ?? '', { 'data-block': '' })
      }

      // Default: let remark-rehype handle it
      // Return the children processed through state.all so inline math inside
      // normal paragraphs still gets rendered as <formula>.
      return {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: state.all(node),
      }
    },
  },
  clientScripts: [katexCdnCss, katexScript, katexAutoRenderScript, katexInitScript],
}

/** Module-level equation counter — increments for each {#_} numbered equation. */
let equationCounter = 0
