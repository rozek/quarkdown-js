# QuarkdownJS — AST Specification

QuarkdownJS extends the [mdast](https://github.com/syntax-tree/mdast) node hierarchy
with Quarkdown-specific node types. Standard Markdown nodes (Paragraph, Heading,
Code, etc.) are used as-is from mdast.

---

## 1. Base Types

```typescript
/** Position in source text */
interface Position {
  line: number    // 1-based
  column: number  // 1-based
  offset?: number // 0-based character offset
}

interface NodeRange {
  start: Position
  end: Position
}

/** Base for all QD-specific nodes */
interface QdNode {
  type: string
  position?: NodeRange
}
```

---

## 2. Value Types

```typescript
type QdValue =
  | QdString
  | QdNumber
  | QdBoolean
  | QdNone
  | QdRange
  | QdIterable
  | QdMarkdown
  | QdLambda
  | QdSize
  | QdColor
  | QdDict

interface QdString  { kind: 'string';   value: string }
interface QdNumber  { kind: 'number';   value: number }
interface QdBoolean { kind: 'boolean';  value: boolean }
interface QdNone    { kind: 'none' }
interface QdRange   { kind: 'range';    from: number; to: number }
interface QdIterable{ kind: 'iterable'; items: QdValue[] }
interface QdMarkdown{ kind: 'markdown'; nodes: MdastNode[] }
interface QdLambda  { kind: 'lambda';   params: string[]; body: MdastNode[] }
interface QdSize    { kind: 'size';     value: number; unit: CssUnit }
interface QdColor   { kind: 'color';    value: string }
interface QdDict    { kind: 'dict';     entries: Record<string, QdValue> }

type CssUnit = 'px' | 'em' | 'rem' | 'pt' | 'cm' | 'mm' | 'in' | 'vh' | 'vw' | '%'
```

---

## 3. Argument Node

Represents a single argument in a function call, before evaluation.

```typescript
interface QdArgument {
  /** Argument name if named, undefined if positional */
  name?: string
  /** Raw content — may be a nested call, a literal, or block markdown */
  value: QdRawArg
}

/** Raw (unevaluated) argument content */
type QdRawArg =
  | { tag: 'literal';  text: string }
  | { tag: 'call';     node: QdFunctionCallNode }
  | { tag: 'block';    nodes: MdastNode[] }
  | { tag: 'chain';    nodes: QdChainNode }
```

---

## 4. Core AST Nodes

### 4.1 FunctionCallNode

```typescript
interface QdFunctionCallNode extends QdNode {
  type: 'qdFunctionCall'
  /** Function or variable name (without the leading dot) */
  name: string
  args: QdArgument[]
  /** true if the call appears inline within a paragraph */
  inline: boolean
}
```

### 4.2 ChainNode

```typescript
/** .a::b::c — resolved to nested QdFunctionCallNode before expansion */
interface QdChainNode extends QdNode {
  type: 'qdChain'
  steps: Array<{ name: string; args: QdArgument[] }>
}
```

### 4.3 FunctionDefinitionNode

Produced by `.function {name} param: body`:

```typescript
interface QdFunctionDefNode extends QdNode {
  type: 'qdFunctionDef'
  name: string
  params: QdParamSpec[]
  body: MdastNode[]
}

interface QdParamSpec {
  name: string
  optional: boolean   // ends with ? in source
  isBody: boolean     // final (block body) parameter
}
```

### 4.4 VariableDefNode

Produced by `.var {name} {value}`:

```typescript
interface QdVariableDefNode extends QdNode {
  type: 'qdVariableDef'
  name: string
  /** Raw (unevaluated) initial value */
  initializer: QdRawArg
}
```

### 4.5 LetNode

Produced by `.let {name} {value} body`:

```typescript
interface QdLetNode extends QdNode {
  type: 'qdLet'
  name: string
  initializer: QdRawArg
  body: MdastNode[]
}
```

### 4.6 ConditionalNode

Produced by `.if` / `.ifnot`:

```typescript
interface QdConditionalNode extends QdNode {
  type: 'qdConditional'
  negate: boolean           // true for .ifnot
  condition: QdRawArg
  consequent: MdastNode[]
}
```

### 4.7 LoopNode

Produced by `.foreach` / `.repeat`:

```typescript
interface QdLoopNode extends QdNode {
  type: 'qdLoop'
  /** Iterable expression */
  iterable: QdRawArg
  /** Parameter name; '_' if using implicit .1 syntax */
  param: string
  body: MdastNode[]
}
```

### 4.8 MetadataNode

Produced by document-level calls (`.doctype`, `.docname`, `.author`, …):

```typescript
interface QdMetadataNode extends QdNode {
  type: 'qdMetadata'
  key: string
  value: string
}
```

---

## 5. MdastNode Union Type

Within this spec, `MdastNode` refers to any node from the
[mdast specification](https://github.com/syntax-tree/mdast) **or** any `QdNode` above.

```typescript
import type { Node as MdastNode } from 'mdast'

type AnyNode = MdastNode | QdFunctionCallNode | QdChainNode
             | QdFunctionDefNode | QdVariableDefNode | QdLetNode
             | QdConditionalNode | QdLoopNode | QdMetadataNode
```

---

## 6. Evaluated Result

After the expansion stage, all `QdNode` instances are replaced with either:
- Standard `MdastNode` trees (for content-producing nodes)
- Side effects registered on the `Context` (for definitions and metadata)
