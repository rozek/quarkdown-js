# QuarkdownJS — Language Specification

Quarkdown extends CommonMark + GitHub Flavored Markdown (GFM) with a function-call
layer. Everything below describes how function calls are parsed and evaluated on top
of standard Markdown.

---

## 1. Function Call Syntax

### 1.1 Basic call

```
.functionName {arg1} {arg2}
```

- Name is preceded by a **literal dot** (`.`)
- Each argument is wrapped in **curly braces** `{ … }`
- Arguments may contain arbitrary Quarkdown content (text, nested calls, markdown)
- Whitespace between arguments is ignored

### 1.2 Named arguments

```
.function positional:{value} key:{value}
```

- Named arguments use `key:{value}` syntax (no space around `:`)
- Named arguments must follow all positional arguments
- Named and positional can be mixed

### 1.3 Multi-line arguments

```
.function {
    line one
    line two
}
```

- Arguments can span multiple lines with arbitrary indentation
- A backslash at the end of a line continues the argument on the next line

### 1.4 Block body (last parameter shortcut)

The **last** parameter of a block-level function call may be written as an indented
block without surrounding braces:

```
.center
    # My heading

    Some paragraph.
```

Equivalent to `.center {# My heading\n\nSome paragraph.}`.
Indentation must be ≥ 2 spaces or 1 tab relative to the function call line.

### 1.5 Inline vs. block context

| Context | Trigger | Limitation |
|---------|---------|-----------|
| **Block** | Call is on its own line | Can output block elements |
| **Inline** | Call appears inside a paragraph | Output must be inline content only |

### 1.6 Tight calls (adjacent to text)

To embed a function call directly adjacent to word characters, wrap the whole call
in curly braces:

```
H{.sub {2}}O       →  H₂O
```

### 1.7 Chaining with `::`

```
.a::b {y}
```

is syntactic sugar for:

```
.b {.a} {y}
```

The chained value is always inserted as the **first positional argument** of the
next call. Chains may be arbitrarily long:

```
.value::uppercase::trim
```

---

## 2. Variables

### 2.1 Definition

```
.var {name} {value}
```

- `value` may be a simple string, a number, a boolean, or multi-line block content
- Variables are **document-wide** (global scope)

### 2.2 Block variable

```
.var {layout}
    .row
        Column A
        Column B
```

### 2.3 Access

A variable is accessed exactly like a parameter-less function call:

```
Hello, **.name**!
```

### 2.4 Reassignment

```
.var {counter} {0}
.var {counter} {1}   ← same syntax as definition
```

Or via direct call: `.counter {newValue}` (only valid if `counter` is a variable,
not a built-in function).

### 2.5 Scoped variables (`.let`)

```
.let {tmp} {42}
    The value is .tmp.
```

`tmp` is only visible inside the indented block. Does not modify the outer scope.

---

## 3. Custom Functions

### 3.1 Declaration

```
.function {greet}
    name:
    title?:
    Hello, {.title::otherwise {Dr.}} **.name**!
```

- Parameters are listed one per line, each ending with `:`
- Optional parameters end with `?:` — they receive `None` when omitted
- No explicit `return`; all output of the body becomes the return value
- The **last** parameter implicitly accepts a block body argument

### 3.2 Parameter access inside body

Named: `.paramName`
Positional (implicit): `.1`, `.2`, …

### 3.3 Calling a custom function

```
.greet {World}
.greet name:{Alice} title:{Prof.}
```

---

## 4. Control Flow

### 4.1 Conditional

```
.if {condition}
    Content rendered only if true.
```

```
.ifnot {condition}
    Content rendered only if false.
```

- `condition` must evaluate to a boolean value
- No dedicated `else`; simulate with `.let` + `.if` + `.ifnot`

**Else pattern:**

```
.let {value} {.someExpression}
    .if {.value}
        Was true.
    .ifnot {.value}
        Was false.
```

### 4.2 Loops

**For-each:**

```
.foreach {iterable}
    item:
    Item: **.item**
```

- `iterable` may be a Range (`1..5`), a list, or any iterable value
- Works like `map`: returns a collection of the same size
- Implicit first-parameter shorthand: `.1`

**Repeat:**

```
.repeat {3}
    Row .1
```

Shorthand for `.foreach {1..3}`.

---

## 5. Types

| Type | Literal examples | Notes |
|------|-----------------|-------|
| `string` | `{hello}` | Default; everything is a string unless otherwise |
| `number` | `{42}`, `{3.14}` | Integer or float |
| `boolean` | `{true}`, `{false}` | |
| `none` | (omitted optional arg) | Like null |
| `range` | `{1..5}` | Inclusive on both ends |
| `iterable` | list result, range | Ordered sequence |
| `markdown` | block body | Unevaluated markdown content |
| `lambda` | function body | Deferred evaluation |
| `size` | `{1.5em}`, `{100px}` | CSS-style size value |
| `color` | `{#ff0000}`, `{red}` | CSS-compatible color |
| `dict` | key-value pairs | From CSV or stdlib |

Dynamic (weak) typing: a value's type is determined at evaluation time.

---

## 6. Math

Inline TeX: `$ expression $`
Block TeX: `$$ expression $$`

In both cases the content is passed verbatim to the math renderer (KaTeX).

---

## 7. Code Blocks

Standard Markdown fenced blocks are supported:

````
```javascript
const x = 1
```
````

Advanced via `.code`:

```
.code lang:{typescript} linenumbers:{false} focus:{2..4}
    const x = 1
    const y = 2
    const z = x + y
```

---

## 8. Multi-file Includes

```
.include {path/to/file}
```

- Resolves the path relative to the current document's `baseUrl`
- In the browser, resolved via the `fetch` option (defaults to `window.fetch`)
- The `.include` with a library name (no path separator) loads from the `libs` registry

---

## 9. Document Metadata Functions

These must appear at the top of the main document (before content):

```
.doctype {plain}
.docname {My Document}
.author {Alice}
.lang {en}
.theme {paperwhite} {latex}
```

Values are stored in `CompileResult.metadata` and influence the renderer.

---

## 10. Operator Functions (selected)

| Call | Description |
|------|-------------|
| `.equals {a} {b}` | Boolean equality |
| `.notEquals {a} {b}` | Boolean inequality |
| `.gt {a} {b}` | Greater than |
| `.lt {a} {b}` | Less than |
| `.and {a} {b}` | Logical AND |
| `.or {a} {b}` | Logical OR |
| `.not {a}` | Logical NOT |
| `.otherwise {a} {default}` | If `a` is `none`, return `default` |
