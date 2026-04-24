# QuarkdownJS — HTML Renderer Specification

The renderer converts the fully expanded mdast tree into an HTML string.
It is built on top of `remark-rehype` (mdast → hast) and `rehype-stringify`
(hast → string), extended with custom handlers for Quarkdown-specific constructs.

---

## 1. Output Modes

| Document type | HTML output structure |
|--------------|----------------------|
| `plain` | `<div class="qd-document qd-plain">…</div>` |
| `paged` | Same + Paged.js script injected |
| `slides` | `<div class="reveal">…</div>` + Reveal.js init script |
| `docs` | `<div class="qd-document qd-docs">…</div>` + sidebar |

The renderer produces an **HTML fragment** (no `<html>/<body>` wrapper) unless
`options.fullDocument` is set. Consumers are responsible for wrapping.

---

## 2. CSS Classes

Layout function → HTML element mapping:

| Function | Element | CSS class |
|----------|---------|-----------|
| `.center` | `<div>` | `qd-center` |
| `.row` | `<div>` | `qd-row` |
| `.column` | `<div>` | `qd-column` |
| `.grid` | `<div>` | `qd-grid` (+ `--cols` CSS var) |
| `.stack` | `<div>` | `qd-stack` |
| `.box` | `<div>` | `qd-box` |
| `.alert` | `<aside>` | `qd-alert qd-alert--{type}` |
| `.collapsible` | `<details>` | `qd-collapsible` |
| `.tabs` | `<div>` | `qd-tabs` |
| `.tab` | `<div>` | `qd-tab` |
| `.pagebreak` | `<div>` | `qd-pagebreak` |
| `.space` | `<div>` | `qd-space` |
| `.figure` | `<figure>` | `qd-figure` |
| `.caption` | `<figcaption>` | — |

Standard Markdown elements use their native HTML elements without extra classes.

---

## 3. Theme CSS

Themes are provided as CSS custom property sets. The renderer injects a `<style>` block:

```html
<style>
:root {
  --qd-color-bg: #fff;
  --qd-color-text: #111;
  --qd-font-body: Georgia, serif;
  /* … */
}
</style>
```

Built-in themes: `default`, `paperwhite`, `galactic`, `dark`.
Layout themes: `default`, `latex`.

A theme is a JSON object `Record<string, string>` mapping CSS variable names to values.
Custom themes can be registered via `options.themes`.

---

## 4. Custom rehype Handlers

The `QdRenderer` class provides a `handlers` map passed to `remark-rehype`:

```typescript
interface QdRenderer {
  handlers: Partial<Record<string, Handler>>
  /** Finalizes the hast tree before stringification */
  postProcess(root: HastRoot, ctx: Context): HastRoot
}
```

Required custom handlers:

| Handler for… | Behaviour |
|--------------|-----------|
| `qdMath` (inline) | Wraps in `<span class="qd-math-inline">`, plugin renders |
| `qdMathBlock` | Wraps in `<div class="qd-math-block">`, plugin renders |
| `qdCode` | Wraps in `<pre><code>` with language class + attributes |
| `qdLayout*` | All layout nodes → div/aside/figure with correct classes |
| `qdAlert` | `<aside role="note" class="qd-alert qd-alert--{type}">` |
| `qdCollapsible` | `<details><summary>…</summary>…</details>` |
| `qdTabs` | `<div class="qd-tabs">` with child tab panels |
| `qdPagebreak` | `<div class="qd-pagebreak" aria-hidden="true"></div>` |
| `qdFootnote` | Rendered inline as `<aside class="qd-footnote">` |
| `qdRef` | `<a href="#{id}" class="qd-ref">` |
| `qdId` | Wraps children in `<span id="{name}">` or sets `id` on block |

---

## 5. Script Injection

The renderer calls `ctx.plugins` to determine which client-side scripts are needed,
then appends them to the output:

```typescript
interface ClientScript {
  /** Unique script identifier (prevents duplicates) */
  id: string
  /** Raw script content or a URL */
  content?: string
  src?: string
  /** Where to inject: 'head' | 'body-end' */
  position: 'head' | 'body-end'
}
```

---

## 6. Slides Mode

When `metadata.type === 'slides'`:

- The renderer wraps all top-level sections between `.slide` calls in
  `<section>` elements
- The entire output is wrapped in `<div class="reveal"><div class="slides">…</div></div>`
- A Reveal.js initialization script is injected

---

## 7. Paged Mode

When `metadata.type === 'paged'`:

- The Paged.js polyfill script is injected
- `.pagebreak` → `<div style="break-before: page">` (CSS paged media)
- Page size and orientation from metadata are set via `@page` CSS rules

---

## 8. Table of Contents

`.toc` expands to an `<nav class="qd-toc">` containing an `<ol>` built from
all headings (up to depth N, default 3) collected during the expand stage.
TOC is collected as a side effect during Stage 4 and materialized in Stage 5.
