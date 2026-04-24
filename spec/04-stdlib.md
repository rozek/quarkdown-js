# QuarkdownJS — Standard Library Specification

All built-in functions are registered in the root `Context` before compilation.
Each function signature uses the notation: `.name param1 param2? → returnType`

Optional parameters are marked with `?`. The final parameter (if named `body`) accepts
block content (indented block body shortcut).

---

## 1. Document Metadata (`stdlib/document.ts`)

| Signature | Description |
|-----------|-------------|
| `.doctype {type}` | Set document type: `plain` \| `paged` \| `slides` \| `docs` |
| `.docname {name}` | Set document title |
| `.author {name}` | Add an author (may be called multiple times) |
| `.lang {code}` | Set BCP-47 language code (e.g. `en`, `de`) |
| `.theme {color} {layout?}` | Set color theme and optional layout theme |
| `.pageformat {size}` | Page size for paged/slides (e.g. `A4`, `letter`) |
| `.pageorientation {o}` | `portrait` or `landscape` |

---

## 2. Logic & Control (`stdlib/logic.ts`)

| Signature | Description |
|-----------|-------------|
| `.if {cond} {body}` | Emit `body` only if `cond` is true |
| `.ifnot {cond} {body}` | Emit `body` only if `cond` is false |
| `.foreach {iter} {lambda}` | Map lambda over iterable; emit concatenated results |
| `.repeat {n} {lambda}` | Shorthand for `.foreach {1..n}` |
| `.let {name} {value} {body}` | Bind `name` in scope of `body` |
| `.var {name} {value}` | Define/reassign document-wide variable |
| `.function {name} {body}` | Define custom function (params declared in body) |

---

## 3. Operators (`stdlib/logic.ts`)

| Signature | Description |
|-----------|-------------|
| `.equals {a} {b}` | `a == b` → boolean |
| `.notEquals {a} {b}` | `a != b` → boolean |
| `.gt {a} {b}` | `a > b` → boolean |
| `.lt {a} {b}` | `a < b` → boolean |
| `.gte {a} {b}` | `a >= b` → boolean |
| `.lte {a} {b}` | `a <= b` → boolean |
| `.and {a} {b}` | Logical AND → boolean |
| `.or {a} {b}` | Logical OR → boolean |
| `.not {a}` | Logical NOT → boolean |
| `.otherwise {a} {default}` | If `a` is `none`, return `default`; else return `a` |

---

## 4. Math (`stdlib/math.ts`)

| Signature | Description |
|-----------|-------------|
| `.sum {a} {b}` | `a + b` |
| `.subtract {a} {b}` | `a - b` |
| `.multiply {a} {b}` | `a * b` |
| `.divide {a} {b}` | `a / b` |
| `.pow {base} to:{exp}` | `base ^ exp` |
| `.sqrt {n}` | Square root |
| `.abs {n}` | Absolute value |
| `.mod {a} {b}` | Modulo |
| `.truncate {n} {decimals?}` | Round to N decimal places (default 0) |
| `.floor {n}` | Floor |
| `.ceil {n}` | Ceil |
| `.min {a} {b}` | Minimum |
| `.max {a} {b}` | Maximum |
| `.pi` | π constant |
| `.e` | Euler's number |

---

## 5. Text (`stdlib/text.ts`)

| Signature | Description |
|-----------|-------------|
| `.uppercase {text}` | Convert to uppercase |
| `.lowercase {text}` | Convert to lowercase |
| `.capitalize {text}` | Capitalize first letter |
| `.trim {text}` | Strip leading/trailing whitespace |
| `.length {value}` | Character count (string) or item count (iterable) |
| `.substring {text} from:{n} to:{m?}` | Substring |
| `.replace {text} {pattern} {replacement}` | String replace |
| `.concat {a} {b}` | Concatenate strings |
| `.tostring {value}` | Convert any value to string |
| `.tonumber {text}` | Parse string to number |
| `.toboolean {text}` | Parse `"true"`/`"false"` to boolean |

---

## 6. Layout (`stdlib/layout.ts`)

All layout functions accept block content as their body.

| Signature | Description |
|-----------|-------------|
| `.center {body}` | Center content horizontally |
| `.row {body}` | Flex row (children are the block elements inside body) |
| `.column {body}` | Flex column |
| `.grid cols:{n} {body}` | CSS grid with N columns |
| `.stack {body}` | Vertical stack with gap |
| `.box {title?} {body}` | Styled content box |
| `.alert type:{t} {body}` | Alert box; type: `info`\|`warning`\|`error`\|`success` |
| `.collapsible {title} {body}` | Expandable `<details>` element |
| `.tab {title} {body}` | Tab panel (requires parent `.tabs`) |
| `.tabs {body}` | Tab container |
| `.pagebreak` | Explicit page break (paged/slides only) |
| `.space {size?}` | Vertical spacer |
| `.hrule` | Horizontal rule |

---

## 7. Figures & Media (`stdlib/layout.ts`)

| Signature | Description |
|-----------|-------------|
| `.figure {body}` | Wrap image in `<figure>` |
| `.caption {text}` | Add `<figcaption>` |
| `.imagesize width:{w} height:{h?} {body}` | Constrain image dimensions |

---

## 8. Code (`stdlib/document.ts`)

| Signature | Description |
|-----------|-------------|
| `.code lang:{l?} linenumbers:{b?} focus:{range?} {body}` | Advanced code block |
| `.codespan {text}` | Inline code (dynamic alternative to backtick) |

---

## 9. Cross-references & TOC (`stdlib/document.ts`)

| Signature | Description |
|-----------|-------------|
| `.id {name} {body}` | Assign an anchor ID to content |
| `.ref {name}` | Inline reference link to an ID |
| `.toc depth:{n?}` | Generate table of contents |
| `.footnote {text}` | Inline footnote |
| `.numbering type:{t}` | Enable auto-numbering: `figures`\|`tables`\|`sections` |
| `.counter {name}` | Inline counter value |

---

## 10. File I/O (`stdlib/io.ts`)

| Signature | Description |
|-----------|-------------|
| `.include {path}` | Include and compile another `.qd` file |
| `.read {path}` | Read file as raw string |
| `.csv {path}` | Read CSV file → iterable of dicts |

All resolve via the `Context.fetch` function.

---

## 11. Slides (`stdlib/document.ts`, slides mode only)

| Signature | Description |
|-----------|-------------|
| `.slide` | Insert a slide break |
| `.speakernotes {body}` | Slide speaker notes |
| `.slidetheme {name}` | Override Reveal.js theme |
| `.slidetransition {type}` | Transition: `fade`\|`slide`\|`zoom`\|`none` |

---

## 12. Iterables & Ranges (`stdlib/logic.ts`)

| Signature | Description |
|-----------|-------------|
| `.range {from} {to}` | Explicit range (same as `from..to` literal) |
| `.count {iter}` | Number of items |
| `.first {iter}` | First item |
| `.last {iter}` | Last item |
| `.item {iter} at:{n}` | Item at index N (1-based) |
| `.filter {iter} {predicate}` | Filter iterable |
| `.map {iter} {transform}` | Transform iterable |
| `.sort {iter} by:{key?}` | Sort iterable |
| `.join {iter} {sep?}` | Join to string |
| `.sum {iter}` | Sum all numeric items (overloads `.sum {a} {b}`) |
