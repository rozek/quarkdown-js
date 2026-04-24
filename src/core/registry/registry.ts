import type { Context } from '../context/context.js'
import { logicFunctions } from '../../stdlib/logic.js'
import { mathFunctions } from '../../stdlib/math.js'
import { textFunctions } from '../../stdlib/text.js'
import { layoutFunctions } from '../../stdlib/layout.js'
import { documentFunctions } from '../../stdlib/document.js'
import { ioFunctions } from '../../stdlib/io.js'

/** Register all stdlib functions on the given context */
export function registerStdlib(ctx: Context): void {
  const allFunctions = {
    ...logicFunctions,
    ...mathFunctions,
    ...textFunctions,
    ...layoutFunctions,
    ...documentFunctions,
    ...ioFunctions,
  }

  for (const [name, fn] of Object.entries(allFunctions)) {
    ctx.define(name, { kind: 'builtin', fn })
  }
}
