# QuarkdownJS — Browser Integration & REPL Demo

---

## 1. Browser Entry Point (`browser/index.ts`)

The browser build exposes the full public API as a UMD/ESM bundle:

```typescript
// ESM import (recommended)
import { compile } from 'quarkdown-js'

// Or via script tag (UMD global)
// <script src="quarkdown.min.js"></script>
// window.QuarkdownJS.compile(source, options)
```

**Build targets:**
- ESM: `dist/quarkdown-js.esm.js` (for bundlers / `<script type="module">`)
- UMD: `dist/quarkdown-js.umd.js` (legacy / CDN use)
- Types: `dist/index.d.ts`

**Browser compatibility target:** Chrome 85+, Firefox 78+, Safari 14+, Edge 85+
(ES2020 syntax, no optional-chaining polyfills needed)

---

## 2. Fetch-based File Resolver (`browser/fetch-io.ts`)

Default implementation of `CompileOptions.fetch`:

```typescript
function createFetchResolver(baseUrl: string): (path: string) => Promise<string> {
  return async (path: string) => {
    const url = new URL(path, baseUrl).href
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`)
    }
    return response.text()
  }
}
```

Used automatically when `options.fetch` is not provided.
`baseUrl` defaults to `window.location.href`.

---

## 3. REPL Demo (`demo/index.html`)

A standalone single-file HTML page demonstrating live compilation.

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  QuarkdownJS REPL                           [theme ▾]    │
├───────────────────────┬──────────────────────────────────┤
│                       │                                  │
│   Quarkdown source    │   Rendered output                │
│   (CodeMirror editor) │   (iframe / div)                 │
│                       │                                  │
├───────────────────────┴──────────────────────────────────┤
│  [✓ Auto-compile]  [Compile]   Diagnostics: none         │
└──────────────────────────────────────────────────────────┘
```

On narrow screens (< 768 px): panels stack vertically (source above, output below).

### Features

- **Live compilation**: recompiles on every keystroke (debounced 300 ms) when
  auto-compile is enabled
- **Editor**: CodeMirror 6 with basic Markdown syntax highlighting
- **Output pane**: rendered as an `<iframe srcdoc="…">` to isolate CSS
- **Theme selector**: dropdown to switch between built-in color themes
- **Diagnostics bar**: shows error/warning count; clicking expands a detail list
- **Shareable state**: source stored in `location.hash` (base64-encoded) for
  copy-paste sharing

### Dependencies (loaded from CDN)

- `quarkdown-js` (the compiled bundle from this project)
- CodeMirror 6 (`@codemirror/view`, `@codemirror/lang-markdown`)
- KaTeX (via math plugin)
- Highlight.js (via code plugin)

### Implementation notes

- No build step required for the demo page; all imports via `importmap` or CDN
- Initial source: the mock document from `test/mock/document.qd`
- The demo uses `defaultPlugins` (math + code + diagrams)

---

## 4. GitHub Pages Deployment

The REPL demo is deployed to GitHub Pages from the `docs/` directory:

```
docs/
├── index.html       ← REPL demo (copied from demo/index.html)
├── quarkdown.min.js ← built UMD bundle
└── katex/           ← KaTeX assets (copied from node_modules)
```

A GitHub Actions workflow builds and deploys on every push to `main`.
