import { describe, it } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'

describe('debug2', () => {
  it('shows raw remark parse for .if with indented body', () => {
    const processor = unified().use(remarkParse).use(remarkGfm)
    const tree = processor.parse('.if {true}\n    Content shown.')
    console.log('REMARK RAW:', JSON.stringify(tree, null, 2))
  })
  it('shows raw remark parse for foreach', () => {
    const processor = unified().use(remarkParse).use(remarkGfm)
    const tree = processor.parse('.foreach {1..3}\n    n:\n    Item .n')
    console.log('REMARK RAW FOREACH:', JSON.stringify(tree, null, 2))
  })
  it('shows raw remark parse for function', () => {
    const processor = unified().use(remarkParse).use(remarkGfm)
    const tree = processor.parse('.function {greet}\n    name:\n    Hello .name!\n\n.greet {World}')
    console.log('REMARK RAW FUNCTION:', JSON.stringify(tree, null, 2))
  })
})
