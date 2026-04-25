import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'

const source = `<<<

some text`

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)

const parsed = processor.parse(source)
console.log(JSON.stringify(parsed, null, 2))
