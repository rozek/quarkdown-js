/**
 * QuarkdownJS — AST Type Definitions
 * Extends mdast with Quarkdown-specific node types.
 */

import type { Node as MdastNode } from 'mdast'

// ---------------------------------------------------------------------------
// 1. Base types
// ---------------------------------------------------------------------------

/** Position in source text (1-based line/column) */
export interface Position {
  line: number
  column: number
  offset?: number   // 0-based character offset
}

export interface NodeRange {
  start: Position
  end: Position
}

/** Base for all QD-specific nodes */
export interface QdNode {
  type: string
  position?: NodeRange
}

// ---------------------------------------------------------------------------
// 2. Value types
// ---------------------------------------------------------------------------

export type CssUnit = 'px' | 'em' | 'rem' | 'pt' | 'cm' | 'mm' | 'in' | 'vh' | 'vw' | '%'

export interface QdString   { kind: 'string';   value: string }
export interface QdNumber   { kind: 'number';   value: number }
export interface QdBoolean  { kind: 'boolean';  value: boolean }
export interface QdNone     { kind: 'none' }
export interface QdRange    { kind: 'range';    from: number; to: number }
export interface QdIterable { kind: 'iterable'; items: QdValue[] }
export interface QdMarkdown { kind: 'markdown'; nodes: MdastNode[] }
export interface QdLambda   { kind: 'lambda';   params: string[]; body: MdastNode[] }
export interface QdSize     { kind: 'size';     value: number; unit: CssUnit }
export interface QdColor    { kind: 'color';    value: string }
export interface QdDict     { kind: 'dict';     entries: Record<string, QdValue> }

export type QdValue =
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

// ---------------------------------------------------------------------------
// 3. Argument node
// ---------------------------------------------------------------------------

/** Raw (unevaluated) argument content */
export type QdRawArg =
  | { tag: 'literal'; text: string }
  | { tag: 'call';    node: QdFunctionCallNode }
  | { tag: 'block';   nodes: MdastNode[] }
  | { tag: 'chain';   nodes: QdChainNode }

/** A single argument in a function call, before evaluation */
export interface QdArgument {
  /** Argument name if named, undefined if positional */
  name?: string
  /** Raw content — may be a nested call, a literal, or block markdown */
  value: QdRawArg
}

// ---------------------------------------------------------------------------
// 4. Core AST node types
// ---------------------------------------------------------------------------

/** 4.1 Function call node */
export interface QdFunctionCallNode extends QdNode {
  type: 'qdFunctionCall'
  /** Function or variable name (without the leading dot) */
  name: string
  args: QdArgument[]
  /** true if the call appears inline within a paragraph */
  inline: boolean
}

/** 4.2 Chain node — .a::b::c */
export interface QdChainNode extends QdNode {
  type: 'qdChain'
  steps: Array<{ name: string; args: QdArgument[] }>
}

/** 4.3 Function definition node — produced by .function */
export interface QdParamSpec {
  name: string
  optional: boolean   // ends with ? in source
  isBody: boolean     // final (block body) parameter
}

export interface QdFunctionDefNode extends QdNode {
  type: 'qdFunctionDef'
  name: string
  params: QdParamSpec[]
  body: MdastNode[]
}

/** 4.4 Variable definition node — produced by .var */
export interface QdVariableDefNode extends QdNode {
  type: 'qdVariableDef'
  name: string
  /** Raw (unevaluated) initial value */
  initializer: QdRawArg
}

/** 4.5 Let node — produced by .let */
export interface QdLetNode extends QdNode {
  type: 'qdLet'
  name: string
  initializer: QdRawArg
  body: MdastNode[]
}

/** 4.6 Conditional node — produced by .if / .ifnot */
export interface QdConditionalNode extends QdNode {
  type: 'qdConditional'
  negate: boolean       // true for .ifnot
  condition: QdRawArg
  consequent: MdastNode[]
}

/** 4.7 Loop node — produced by .foreach / .repeat */
export interface QdLoopNode extends QdNode {
  type: 'qdLoop'
  iterable: QdRawArg
  /** Parameter name; '_' if using implicit .1 syntax */
  param: string
  body: MdastNode[]
}

/** 4.8 Metadata node — produced by .doctype, .docname, .author, .lang, .theme */
export interface QdMetadataNode extends QdNode {
  type: 'qdMetadata'
  key: string
  value: string
}

// ---------------------------------------------------------------------------
// 5. Union type
// ---------------------------------------------------------------------------

export type AnyNode =
  | MdastNode
  | QdFunctionCallNode
  | QdChainNode
  | QdFunctionDefNode
  | QdVariableDefNode
  | QdLetNode
  | QdConditionalNode
  | QdLoopNode
  | QdMetadataNode
