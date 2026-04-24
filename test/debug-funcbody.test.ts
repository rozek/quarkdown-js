import { it, expect } from 'vitest'
import { parseAndRefine, findQdNodes } from './helpers.js'

it('function body parsing', () => {
  const source = `.function {greet}
    name:
    Hello **.name**!

.greet {World}`
  const root = parseAndRefine(source)
  const funcDef = findQdNodes(root, 'qdFunctionDef')
  console.log('funcDef:', JSON.stringify(funcDef[0], null, 2))
  expect(funcDef).toHaveLength(1)
})
