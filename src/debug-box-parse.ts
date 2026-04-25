import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'

const source = `.var {boxtext}
    Don't fight it, use what happens.

    - The quick brown fox jumps over the lazy dog.
    - The quick brown fox jumps over the lazy dog.

.box
    .boxtext

.box {The quick brown fox jumps over the lazy dog}
    .boxtext
`

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)

const parsed = processor.parse(source)
console.log(JSON.stringify(parsed, null, 2))
