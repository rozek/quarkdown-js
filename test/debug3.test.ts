import { describe, it } from 'vitest'
import { parseQd } from './helpers.js'

describe('debug3', () => {
  it('shows walk output for .if with inline body', () => {
    const root = parseQd('.if {true}\n    Content shown.')
    console.log('WALK IF:', JSON.stringify(root, null, 2))
  })
  it('shows walk output for .foreach', () => {
    const root = parseQd('.foreach {1..3}\n    n:\n    Item .n')
    console.log('WALK FOREACH:', JSON.stringify(root, null, 2))
  })
  it('shows walk output for .function', () => {
    const root = parseQd('.function {greet}\n    name:\n    Hello .name!\n\n.greet {World}')
    console.log('WALK FUNCTION:', JSON.stringify(root, null, 2))
  })
})
