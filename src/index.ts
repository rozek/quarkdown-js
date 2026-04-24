export type { CompileOptions, CompileResult, DocumentMetadata, Diagnostic, Plugin }
  from './core/pipeline/index.js'
export { compile } from './core/pipeline/index.js'

export {
  defaultPlugins,
  mathPlugin,
  codePlugin,
  defaultCodePlugin,
  diagramPlugin,
  slidesPlugin,
  pagedPlugin,
  citationsPlugin,
} from './plugins/index.js'
