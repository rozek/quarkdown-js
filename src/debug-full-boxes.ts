import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { readFileSync } from 'fs'

const source = readFileSync('/workspace/group/Topics/Developments/QuarkdownJS/compatibility-tests/boxes.qd', 'utf8')

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)

const parsed = processor.parse(source)

// Print nodes
for (const child of (parsed as any).children) {
  if (child.type === 'paragraph') {
    const texts = (child.children ?? []).map((c: any) => `${c.type}:${JSON.stringify((c.value ?? '').slice(0,50))}`)
    console.log(`P: ${texts.join(' | ')}`)
  } else if (child.type === 'heading') {
    console.log(`H${child.depth}: ${child.children?.map((c: any) => c.value).join('')}`)
  } else if (child.type === 'code') {
    console.log(`CODE: ${JSON.stringify(child.value?.slice(0,50))}`)
  } else {
    console.log(`${child.type}`)
  }
}
