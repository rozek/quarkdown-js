# QuarkdownJS — Plugin Architecture

Plugins extend the compiler with additional functions, renderers, and client-side scripts.
They are passed via `CompileOptions.plugins` and registered before Stage 4 runs.

---

## 1. Plugin Interface

```typescript
interface Plugin {
  /** Unique plugin identifier */
  name: string

  /** Additional built-in functions provided by this plugin */
  functions?: FunctionDefinition[]

  /** Called once after Context is created; may register functions or event hooks */
  setup?(ctx: Context): void | Promise<void>

  /** Client-side scripts to inject into the HTML output */
  clientScripts?: ClientScript[]

  /** Custom rehype handlers for nodes produced by this plugin */
  handlers?: Partial<Record<string, Handler>>
}

interface FunctionDefinition {
  name: string
  params: QdParamSpec[]
  fn: (args: QdValue[], ctx: Context) => Promise<QdValue>
}
```

---

## 2. Built-in Plugins

All built-in plugins are importable individually:

```typescript
import { mathPlugin }     from 'quarkdown-js/plugins/math'
import { codePlugin }     from 'quarkdown-js/plugins/code'
import { diagramPlugin }  from 'quarkdown-js/plugins/diagrams'
import { slidesPlugin }   from 'quarkdown-js/plugins/slides'
import { pagedPlugin }    from 'quarkdown-js/plugins/paged'
import { citationsPlugin }from 'quarkdown-js/plugins/citations'
```

### 2.1 Math Plugin (`plugins/math.ts`)

**Dependency:** `katex`

- Handles `$ … $` (inline) and `$$ … $$` (block) math nodes produced by the parser
- During render: calls `katex.renderToString()` and injects the result as HTML
- Injects KaTeX CSS as a `<style>` block or `<link>` tag

```typescript
const mathPlugin: Plugin = {
  name: 'math',
  // no extra functions needed; math nodes handled via custom rehype handler
  handlers: { qdMathInline: …, qdMathBlock: … },
  clientScripts: [{ id: 'katex-css', src: 'katex/dist/katex.min.css', position: 'head' }]
}
```

### 2.2 Code Plugin (`plugins/code.ts`)

**Dependency:** `highlight.js`

- Registers a custom rehype handler for `code` nodes (and `.code` function output)
- Calls `hljs.highlight(code, { language })` during render
- Injects a Highlight.js theme CSS

```typescript
interface CodePluginOptions {
  theme?: string   // hljs theme name, default: 'github'
  languages?: string[]  // auto-detect if omitted
}
```

### 2.3 Diagram Plugin (`plugins/diagrams.ts`)

**Dependency:** `mermaid`

- Registers stdlib function `.mermaid {body}` → emits a `<div class="mermaid">` node
- Injects a Mermaid initialization script (client-side rendering)
- Server-side (Node.js) rendering is out of scope for this browser-first implementation

```typescript
const diagramPlugin: Plugin = {
  name: 'diagrams',
  functions: [{ name: 'mermaid', … }],
  clientScripts: [{ id: 'mermaid-init', content: 'mermaid.initialize({…})', position: 'body-end' }]
}
```

### 2.4 Slides Plugin (`plugins/slides.ts`)

**Dependency:** Reveal.js (CDN or bundled)

- Active only when `metadata.type === 'slides'`
- Wraps content sections in `<section>` elements
- Injects Reveal.js initialization script

```typescript
interface SlidesPluginOptions {
  theme?: string          // reveal.js theme (default: 'white')
  transition?: string     // transition type (default: 'slide')
  revealCdn?: string      // CDN URL override
}
```

### 2.5 Paged Plugin (`plugins/paged.ts`)

**Dependency:** Paged.js (CDN)

- Active only when `metadata.type === 'paged'`
- Injects Paged.js polyfill script
- Adds `@page` CSS rules based on `metadata.pageformat` and `metadata.pageorientation`

### 2.6 Citations Plugin (`plugins/citations.ts`)

**Dependency:** `citeproc-js`

- Registers stdlib functions:
  - `.bibliography {path}` — load a CSL-JSON or BibTeX file
  - `.cite {key}` — inline citation
  - `.references` — render full reference list
- Citation formatting uses the CSL processor from `citeproc-js`
- Bibliography file is fetched via `ctx.fetch`

```typescript
interface CitationsPluginOptions {
  style?: string   // CSL style name or URL (default: 'apa')
  locale?: string  // BCP-47 locale (default: from metadata.lang)
}
```

---

## 3. Plugin Registration Order

Plugins are set up in the order they appear in `options.plugins`.
Built-in stdlib functions are always registered first; plugin functions may
override them (last definition wins).

---

## 4. Default Plugin Bundle

For convenience, a default bundle includes the most common plugins:

```typescript
import { defaultPlugins } from 'quarkdown-js/plugins'
// Equivalent to: [mathPlugin, codePlugin, diagramPlugin]
```

Slides and paged plugins are opt-in due to their bundle size impact.
