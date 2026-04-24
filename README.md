# QuarkdownJS

A browser-native ECMAScript module that compiles [Quarkdown](https://quarkdown.com) (`.qd`) source to HTML — running entirely client-side, no server required.

> **Clean-room implementation** based on the public Quarkdown documentation and wiki. Licensed under MIT.

## Quick Start

```typescript
import { compile, defaultPlugins } from 'quarkdown-js'

const result = await compile(source, {
  plugins: defaultPlugins,  // math (KaTeX) + code (Highlight.js) + diagrams (Mermaid)
})

document.body.innerHTML = result.html
```

## Features

- **Full Quarkdown syntax** — functions, variables, conditionals, loops, chaining
- **Multiple output modes** — `plain`, `paged`, `slides`, `docs`
- **Math rendering** — KaTeX (`$...$` and `$$...$$`)
- **Code highlighting** — Highlight.js with language detection
- **Diagrams** — Mermaid (client-side)
- **Presentations** — Reveal.js integration
- **Print/PDF** — Paged.js integration
- **Citations** — citeproc-js stub (extensible)
- **fetch-based includes** — `.include {path}` resolved via `fetch`
- **Themes** — `default`, `paperwhite`, `galactic`, `dark`
- **TypeScript** — full type definitions included
- **Tree-shakeable** — import only what you need

## Installation

```bash
npm install quarkdown-js
```

Or use directly from CDN:

```html
<script type="module">
  import { compile, defaultPlugins } from 'https://cdn.jsdelivr.net/npm/quarkdown-js/dist/quarkdown-js.esm.js'
</script>
```

## API

```typescript
compile(source: string, options?: CompileOptions): Promise<CompileResult>
```

### `CompileOptions`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'plain' \| 'paged' \| 'slides' \| 'docs'` | `'plain'` | Document layout type |
| `theme` | `string` | `'default'` | Color theme name |
| `fetch` | `(path: string) => Promise<string>` | `window.fetch` | File resolver for `.include` |
| `plugins` | `Plugin[]` | `[]` | Optional plugins |
| `baseUrl` | `string` | `window.location.href` | Base URL for relative includes |

### `CompileResult`

| Field | Type | Description |
|-------|------|-------------|
| `html` | `string` | Rendered HTML fragment |
| `metadata` | `DocumentMetadata` | Extracted document metadata |
| `diagnostics` | `Diagnostic[]` | Warnings and errors |

## Plugins

```typescript
import {
  defaultPlugins,   // [mathPlugin, codePlugin, diagramPlugin]
  mathPlugin,       // KaTeX math rendering
  codePlugin,       // Highlight.js code highlighting
  diagramPlugin,    // Mermaid diagrams (client-side)
  slidesPlugin,     // Reveal.js presentations
  pagedPlugin,      // Paged.js print/PDF
  citationsPlugin,  // Citation management (stub)
} from 'quarkdown-js'
```

## Live Demo

**[Try the REPL ->](https://rozek.github.io/quarkdown-js/)**

## Quarkdown Language

See the [spec/](spec/) directory for the full language specification, or the [official Quarkdown docs](https://quarkdown.com/wiki).

```
.var {name} {World}

# Hello .name!

.foreach {1..3}
    n:
    - Item **.n**

.if {true}
    > This renders only when true.

Math: $E = mc^2$
```

## Browser Compatibility

Chrome 85+, Firefox 78+, Safari 14+, Edge 85+ (ES2020, no polyfills needed).

## License

MIT — see [LICENSE](LICENSE.md).

Not affiliated with the original [Quarkdown](https://github.com/iamgio/quarkdown) project (Kotlin, GPL-3.0).
