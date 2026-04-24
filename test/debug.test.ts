import { describe, it } from 'vitest'
import { parseAndRefine } from './helpers.js'

describe('debug', () => {
  it('shows AST for .if', () => {
    const root = parseAndRefine('.if {true}\n    Content shown.')
    console.log('IF AST:', JSON.stringify(root, null, 2))
  })
  it('shows AST for .foreach', () => {
    const root = parseAndRefine('.foreach {1..3}\n    n:\n    Item .n')
    console.log('FOREACH AST:', JSON.stringify(root, null, 2))
  })
  it('shows AST for .function', () => {
    const root = parseAndRefine('.function {greet}\n    name:\n    Hello .name!\n\n.greet {World}')
    console.log('FUNCTION AST:', JSON.stringify(root, null, 2))
  })
})
