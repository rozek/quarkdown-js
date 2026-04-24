import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { walkPlugin } from '../src/core/parser/walk.js'
import { refinePlugin } from '../src/core/parser/refine.js'
import type { Root } from 'mdast'
import { compile } from '../src/index.js'
import type { CompileResult, CompileOptions } from '../src/index.js'

export function parseQd(source: string): Root {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(walkPlugin)
  const tree = processor.parse(source)
  // .parse() only runs the parser, not transformers.
  // .runSync() applies all transformer plugins (including walkPlugin).
  return processor.runSync(tree) as Root
}

export function parseAndRefine(source: string): Root {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(walkPlugin)
    .use(refinePlugin)
  const tree = processor.parse(source)
  return processor.runSync(tree) as Root
}

export function findQdNodes(root: Root, type: string): any[] {
  return findNodes(root, type)
}

export function findNodes(root: any, type: string): any[] {
  const results: any[] = []
  function visit(node: any) {
    if (node.type === type) results.push(node)
    if (node.children) node.children.forEach(visit)
    // Also check inside args
    if (node.args) {
      node.args.forEach((arg: any) => {
        if (arg.value?.tag === 'call') visit(arg.value.node)
        if (arg.value?.tag === 'block') arg.value.nodes?.forEach(visit)
      })
    }
    // Check body
    if (node.body) node.body.forEach(visit)
    if (node.consequent) node.consequent.forEach(visit)
    if (node.iterable) { /* skip */ }
  }
  visit(root)
  return results
}

export async function compileHtml(source: string, options: CompileOptions = {}): Promise<CompileResult> {
  return compile(source, options)
}

export async function compileMeta(source: string) {
  const result = await compile(source)
  return result.metadata
}
