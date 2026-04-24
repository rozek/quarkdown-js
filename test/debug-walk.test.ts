import { it, expect } from 'vitest'
import { parseQd } from './helpers.js'

it('walk result for function def', () => {
  const source = `.function {greet}
    name:
    Hello **.name**!

.greet {World}`
  const root = parseQd(source)
  console.log('root:', JSON.stringify(root, null, 2))
})
