# QuarkdownJS — Specification Overview

## Goal

A browser-native ECMAScript module that compiles [Quarkdown](https://quarkdown.com) source
(`.qd` files) to HTML. The compiler runs entirely client-side; external files are resolved
via `fetch`. The implementation is a clean-room reimplementation based on the public
Quarkdown documentation and wiki.

**License:** MIT (no Quarkdown source code used)

---

## Spec File Index

| File | Topic |
|------|-------|
| `00-overview.md` | This file: architecture, API, design principles, dependencies |
| `01-language.md` | Quarkdown language syntax and semantics |
| `02-ast.md` | Abstract syntax tree node types |
| `03-pipeline.md` | Compilation pipeline stages |
| `04-stdlib.md` | Standard library function signatures |
| `05-renderer.md` | HTML renderer specification |
| `06-plugins.md` | Plugin architecture and built-in plugins |
| `07-browser.md` | Browser entry point, fetch I/O, REPL demo |
| `08-testing.md` | Test strategy and mock document |

---

## Public API

```typescript
// Main entry point
import { compile } from 'quarkdown-js'

const result = await compile(source, options)
```

### Types

```typescript
type DocumentType = 'plain' | 'paged' | 'slides' | 'docs'

interface CompileOptions {
  /** Document layout type (default: 'plain') */
  type?: DocumentType
  /** Color theme name */
  theme?: string
  /** Async file resolver for .include and file I/O (default: fetch-based) */
  fetch?: (path: string) => Promise<string>
  /** Optional plugins (math, diagrams, code highlighting, …) */
  plugins?: Plugin[]
  /** Base URL for relative includes (default: window.location.href) */
  baseUrl?: string
}

interface CompileResult {
  /** Rendered HTML string (fragment or full document) */
  html: string
  /** Extracted document metadata (.docname, .author, etc.) */
  metadata: DocumentMetadata
  /** Non-fatal warnings and errors encountered during compilation */
  diagnostics: Diagnostic[]
}

interface DocumentMetadata {
  name?: string
  authors?: string[]
  lang?: string
  type?: DocumentType
  [key: string]: unknown
}

interface Diagnostic {
  severity: 'error' | 'warning'
  message: string
  /** Source position, if known */
  line?: number
  column?: number
}
```

### Plugin interface

```typescript
interface Plugin {
  name: string
  /** Called once after the pipeline is set up */
  setup?(context: PluginContext): void | Promise<void>
  /** Additional stdlib functions provided by this plugin */
  functions?: FunctionDefinition[]
}
```

---

## Architecture

```
quarkdown-js/
├── src/
│   ├── core/
│   │   ├── parser/        ← remark plugin: QD syntax → mdast extensions
│   │   ├── ast/           ← QD-specific mdast node types (TypeScript interfaces)
│   │   ├── pipeline/      ← multi-stage compilation orchestration
│   │   ├── context/       ← scope / symbol table management
│   │   └── registry/      ← function and variable registry
│   ├── stdlib/            ← built-in QD functions
│   │   ├── logic.ts       ← .if, .ifnot, .foreach, .repeat, .let
│   │   ├── text.ts        ← .uppercase, .lowercase, .trim, .length, …
│   │   ├── math.ts        ← .sum, .multiply, .pow, .truncate, …
│   │   ├── layout.ts      ← .center, .row, .column, .grid, .stack, …
│   │   ├── document.ts    ← .doctype, .docname, .author, .theme, …
│   │   └── io.ts          ← .include, .read, .csv
│   ├── renderer/
│   │   └── html/          ← rehype-based HTML rendering
│   ├── plugins/           ← optional built-in plugins
│   │   ├── math.ts        ← KaTeX
│   │   ├── diagrams.ts    ← Mermaid
│   │   ├── code.ts        ← Highlight.js
│   │   ├── slides.ts      ← Reveal.js
│   │   ├── paged.ts       ← Paged.js
│   │   └── citations.ts   ← citeproc-js
│   ├── browser/
│   │   ├── index.ts       ← browser bundle entry point
│   │   └── fetch-io.ts    ← fetch-based file resolver
│   └── index.ts           ← public API re-export
├── test/
│   ├── mock/
│   │   └── document.qd    ← comprehensive test document
│   └── *.test.ts          ← unit + integration tests (Vitest)
├── demo/
│   └── index.html         ← live REPL (split-pane editor)
├── spec/                  ← this directory
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Design Principles

- **SOLID**: each module has a single, well-defined responsibility
- **Extensible**: plugins add functions and rendering hooks; no core changes needed
- **Async-first**: the pipeline is fully `async` to support `fetch`-based file I/O
- **No server required**: runs entirely in the browser
- **Browser compatibility**: ES2020 target; compatible with browsers released since 2020
  (Chrome 85+, Firefox 78+, Safari 14+, Edge 85+)
- **Tree-shakeable**: each stdlib file and plugin can be imported independently
- **TypeScript strict mode** throughout

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `unified` | ^11 | Plugin pipeline infrastructure |
| `remark-parse` | ^11 | CommonMark parser → mdast |
| `remark-gfm` | ^4 | GitHub Flavored Markdown |
| `remark-rehype` | ^11 | mdast → hast bridge |
| `rehype-stringify` | ^10 | hast → HTML string |
| `katex` | ^0.16 | Math rendering (plugin) |
| `mermaid` | ^11 | Diagram rendering (plugin) |
| `highlight.js` | ^11 | Code highlighting (plugin) |
| `vitest` | ^2 | Testing framework |
| `vite` | ^5 | Bundler / dev server |
| `typescript` | ^5.7 | Type system |
