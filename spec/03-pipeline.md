# QuarkdownJS — Compilation Pipeline

The pipeline is a linear sequence of async stages. Each stage receives the output
of the previous stage and returns a transformed result.

```
source string
  └─ Stage 1: parse       → raw mdast (CommonMark + GFM)
  └─ Stage 2: walk        → mdast with QdFunctionCallNode injected
  └─ Stage 3: refine      → QdChainNode flattened, args fully parsed
  └─ Stage 4: expand      → all QdNodes replaced with evaluated mdast
  └─ Stage 5: render      → HTML string
```

---

## 1. Stage 1 — Parse

**Input:** `string`
**Output:** `Root` (mdast root node)

Uses `remark-parse` + `remark-gfm`. Produces a standard mdast tree.
No Quarkdown-specific processing yet.

---

## 2. Stage 2 — Walk (remark plugin)

**Input:** `Root`
**Output:** `Root` with `QdFunctionCallNode` and `QdChainNode` nodes injected

A `remark` plugin traverses the tree using `unist-util-visit`. It detects the pattern
`.name` (dot followed by a valid identifier) at:

- The start of a `Paragraph` text run → **block call candidate**
- Inside any `Text` node → **inline call**

The walker identifies:
1. The function name (everything after `.` up to whitespace or `{`)
2. Raw argument strings (balanced `{ … }` pairs)
3. Chaining sequences (`::`)
4. Block bodies (next sibling lines with deeper indentation)

The walker does **not** evaluate any arguments; it only produces `QdFunctionCallNode`
with `QdArgument` instances whose `value` is tagged `literal` or `block`.

**Error handling:** If a `{` is opened but never closed, emit a `Diagnostic` and
skip the call.

---

## 3. Stage 3 — Refine

**Input:** `Root` with raw `QdFunctionCallNode`
**Output:** `Root` with fully parsed AST nodes

The refiner:

1. **Flattens chains**: `.a::b {y}` → `QdFunctionCallNode('b', [call('a'), literal('y')])`
2. **Parses nested calls**: literal args that start with `.name` are re-parsed as
   nested `QdFunctionCallNode`
3. **Detects known structural calls** and replaces them with typed nodes:
   - `.function` → `QdFunctionDefNode`
   - `.var` → `QdVariableDefNode`
   - `.let` → `QdLetNode`
   - `.if` / `.ifnot` → `QdConditionalNode`
   - `.foreach` / `.repeat` → `QdLoopNode`
   - `.doctype`, `.docname`, `.author`, `.lang`, `.theme` → `QdMetadataNode`
4. **Resolves named arguments** by matching them against parameter position lists
   where known

---

## 4. Stage 4 — Expand

**Input:** `Root` with typed QD nodes
**Output:** `Root` containing only standard mdast nodes (all QD nodes replaced)

This is the core evaluation stage. It uses a **Context** (see below) and processes
nodes depth-first.

### 4.1 Context

```typescript
interface Context {
  /** Look up a symbol (function or variable) */
  resolve(name: string): QdCallable | undefined

  /** Register a symbol in the current scope */
  define(name: string, callable: QdCallable): void

  /** Create a child scope (for .let) */
  fork(bindings?: Record<string, QdCallable>): Context

  /** Metadata collected from QdMetadataNode */
  metadata: DocumentMetadata

  /** Diagnostics accumulated during expansion */
  diagnostics: Diagnostic[]

  /** File resolver (for .include / .read) */
  fetch: (path: string) => Promise<string>

  /** Registered plugins */
  plugins: Plugin[]
}

type QdCallable =
  | { kind: 'builtin'; fn: (args: QdValue[], ctx: Context) => Promise<QdValue> }
  | { kind: 'user';    def: QdFunctionDefNode; closure: Context }
  | { kind: 'variable'; value: QdValue }
```

### 4.2 Evaluation rules

| Node type | Action |
|-----------|--------|
| `QdMetadataNode` | Write to `ctx.metadata`; emit nothing |
| `QdVariableDefNode` | `ctx.define(name, {kind:'variable', value: eval(init)})` |
| `QdFunctionDefNode` | `ctx.define(name, {kind:'user', def, closure: ctx})` |
| `QdLetNode` | Fork context; define binding; expand body; discard fork |
| `QdConditionalNode` | Evaluate condition; expand consequent or emit nothing |
| `QdLoopNode` | Evaluate iterable; fork per item; concatenate expanded bodies |
| `QdFunctionCallNode` | Resolve name; evaluate args lazily; call fn; splice result |

### 4.3 Lazy argument evaluation

Arguments are **not** pre-evaluated before passing to a function. Each function
receives `QdRawArg` values and calls `eval(arg, ctx)` when/if it needs the value.
This enables body-parameter semantics (deferred markdown content).

### 4.4 Include

When `.include {path}` is encountered:
1. Resolve path relative to `ctx.baseUrl`
2. `await ctx.fetch(path)`
3. Run stages 1–4 on the included source using the same context
4. Splice the resulting mdast nodes in place

---

## 5. Stage 5 — Render

**Input:** `Root` (standard mdast only)
**Output:** `string` (HTML)

Uses the `remark-rehype` bridge and `rehype-stringify`. Custom hast handlers in the
`QdRenderer` class extend default rendering for:

- Math nodes (`$…$`, `$$…$$`) → delegated to the math plugin
- Code blocks with `.code` attributes → delegated to the code plugin
- Layout nodes (`.row`, `.column`, etc.) → rendered as `<div>` with CSS classes
- Alerts, figures, boxes, collapsibles → semantic HTML elements

The renderer also injects:
- A `<style>` block with theme CSS (if `metadata.theme` is set)
- Script tags for client-side plugins (Reveal.js, Paged.js, Mermaid) if needed

---

## 6. Pipeline Orchestration

```typescript
class Pipeline {
  constructor(private readonly options: CompileOptions) {}

  async run(source: string): Promise<CompileResult> {
    const ctx = createContext(this.options)
    const mdast = await parse(source)           // Stage 1
    await walk(mdast, ctx)                      // Stage 2
    await refine(mdast, ctx)                    // Stage 3
    const expanded = await expand(mdast, ctx)   // Stage 4
    const html = await render(expanded, ctx)    // Stage 5
    return { html, metadata: ctx.metadata, diagnostics: ctx.diagnostics }
  }
}
```
