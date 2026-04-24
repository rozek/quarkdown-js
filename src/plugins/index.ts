import { mathPlugin } from './math.js'
import { defaultCodePlugin } from './code.js'
import { diagramPlugin } from './diagrams.js'
import type { Plugin } from '../core/pipeline/index.js'

export { mathPlugin } from './math.js'
export { codePlugin, defaultCodePlugin } from './code.js'
export { diagramPlugin } from './diagrams.js'
export { slidesPlugin } from './slides.js'
export { pagedPlugin } from './paged.js'
export { citationsPlugin } from './citations.js'

export const defaultPlugins: Plugin[] = [mathPlugin, defaultCodePlugin, diagramPlugin]
