# QuarkdownJS — Test Strategy & Mock Document

---

## 1. Test Framework

- **Vitest** (v2+) — fast, Vite-native, TypeScript-first
- Tests live in `test/` alongside the source
- Each pipeline stage has dedicated unit tests
- Integration tests run the full pipeline on the mock document
- Coverage target: ≥ 80% line coverage on `src/`

---

## 2. Test Structure

```
test/
├── mock/
│   └── document.qd         ← comprehensive mock document
├── parser/
│   ├── function-call.test.ts
│   ├── chaining.test.ts
│   └── block-body.test.ts
├── refiner/
│   ├── structural-nodes.test.ts
│   └── nested-calls.test.ts
├── expander/
│   ├── variables.test.ts
│   ├── functions.test.ts
│   ├── conditionals.test.ts
│   ├── loops.test.ts
│   └── include.test.ts
├── stdlib/
│   ├── logic.test.ts
│   ├── math.test.ts
│   ├── text.test.ts
│   └── layout.test.ts
├── renderer/
│   └── html.test.ts
└── integration/
    └── full-pipeline.test.ts
```

---

## 3. Test Conventions

```typescript
// Each test file follows this pattern:
import { describe, it, expect } from 'vitest'
import { compileFragment } from '../helpers'

// compileFragment: runs stages 1-4 only, returns mdast
// compileHtml: runs all 5 stages, returns HTML string

describe('FunctionCall parser', () => {
  it('parses a simple function call', async () => {
    const result = await compileFragment('.center {hello}')
    expect(result).toMatchSnapshot()
  })
})
```

Snapshots are stored in `test/__snapshots__/` and reviewed on first run.

---

## 4. Mock Document

The mock document is designed to cover all language features in a compact form.
It is used both for integration tests and as the default source in the REPL demo.

```markdown
<!-- test/mock/document.qd -->

.doctype {plain}
.docname {QuarkdownJS Test Document}
.author {Test Suite}
.lang {en}
.theme {paperwhite}

# Variables & Types

.var {project} {QuarkdownJS}
.var {version} {0.1.0}
.var {beta} {true}

Project: **.project** v**.version** — beta: **.beta**

# Custom Functions

.function {greet}
    name:
    title?:
    Hello, {.title::otherwise {Dr.}} **.name**!

.greet {World}
.greet name:{Alice} title:{Prof.}

# Conditionals

.if {.beta}
    > This is a **beta** release.

.ifnot {.beta}
    > Stable release.

.let {x} {7}
    .if {.x::gt {5}}
        .x is greater than 5.
    .ifnot {.x::gt {5}}
        .x is not greater than 5.

# Loops

.foreach {1..4}
    n:
    - Item **.n**

.repeat {3}
    Row .1

# Chaining

.var {title} {  hello world  }
Trimmed & uppercased: **.title::trim::uppercase**

# Math

.var {r} {8}
Circle area (r=.r): **.pow {.r} to:{2}::multiply {.pi}::truncate {2}**

Inline math: $E = mc^2$

Block math:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

# Code

.code lang:{javascript} linenumbers:{true}
    const greet = (name) => `Hello, ${name}!`
    console.log(greet('World'))

Inline: H{.sub {2}}O and {.codespan {const x = 1}}

# Layout

.center
    **Centered content**

.row
    Column A
    Column B
    Column C

.box
    This is a styled box.

.alert type:{info}
    This is an informational alert.

.collapsible {Click to expand}
    Hidden content revealed on click.

# Operators

Equals: {.equals {foo} {foo}}
Not: {.not {false}}
Otherwise: {.otherwise {.none} {fallback}}

# Ranges & Iterables

Items: {.foreach {3..5} n: **.n** }

Count: {.count {.foreach {1..10} n: .n}}

# Document

.toc

# Text Utilities

Upper: {.uppercase {hello}}
Length: {.length {Quarkdown}}
Concat: {.concat {foo} {bar}}
```

---

## 5. Integration Test Expectations

The full-pipeline integration test asserts:

1. `result.metadata.name === 'QuarkdownJS Test Document'`
2. `result.metadata.type === 'plain'`
3. `result.metadata.authors` includes `'Test Suite'`
4. `result.html` contains `<h1>Variables &amp; Types</h1>` (or similar heading)
5. `result.html` contains `Hello, Dr. World!` (custom function output)
6. `result.html` contains `Hello, Prof. Alice!` (named args)
7. `result.html` contains `This is a **beta** release.` rendered (conditional true)
8. The loop produces 4 list items (`- Item 1` … `- Item 4`)
9. `HELLO WORLD` appears (chain: trim + uppercase)
10. The circle area `201.06` appears (math chain)
11. `result.diagnostics` has no errors
