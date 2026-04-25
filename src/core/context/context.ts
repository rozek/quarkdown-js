import type { QdValue, QdRawArg, QdFunctionDefNode } from '../ast/index.js'
import type { Plugin, CompileOptions, DocumentMetadata, Diagnostic } from '../pipeline/index.js'
import { registerStdlib } from '../registry/registry.js'

/** A callable registered in the context (builtin function, user function, or variable) */
export type QdCallable =
  | { kind: 'builtin'; fn: (args: QdRawArg[], ctx: Context) => Promise<QdValue> }
  | { kind: 'user';    def: QdFunctionDefNode; closure: Context }
  | { kind: 'variable'; value: QdValue }

/** Scope/symbol table for one compilation run */
export interface Context {
  resolve(name: string): QdCallable | undefined
  define(name: string, callable: QdCallable): void
  /** Create a child scope; bindings is pre-populated into the child */
  fork(bindings?: Record<string, QdCallable>): Context
  readonly metadata: DocumentMetadata
  readonly diagnostics: Diagnostic[]
  readonly fetch: (path: string) => Promise<string>
  readonly plugins: Plugin[]
  readonly baseUrl: string
  /** When true, render bare HTML without the CSS wrapper and document wrapper div */
  readonly nowrap: boolean
  addDiagnostic(d: Diagnostic): void
}

class ContextImpl implements Context {
  private readonly symbols: Map<string, QdCallable>
  private readonly parent: ContextImpl | null

  constructor(
    private readonly _metadata: DocumentMetadata,
    private readonly _diagnostics: Diagnostic[],
    private readonly _fetch: (path: string) => Promise<string>,
    private readonly _plugins: Plugin[],
    private readonly _baseUrl: string,
    private readonly _nowrap: boolean = false,
    parent: ContextImpl | null = null,
    initialBindings: Record<string, QdCallable> = {}
  ) {
    this.parent = parent
    this.symbols = new Map(Object.entries(initialBindings))
  }

  resolve(name: string): QdCallable | undefined {
    return this.symbols.get(name) ?? this.parent?.resolve(name)
  }

  define(name: string, callable: QdCallable): void {
    this.symbols.set(name, callable)
  }

  fork(bindings: Record<string, QdCallable> = {}): Context {
    return new ContextImpl(
      this._metadata, this._diagnostics, this._fetch,
      this._plugins, this._baseUrl, this._nowrap, this, bindings
    )
  }

  get metadata() { return this._metadata }
  get diagnostics() { return this._diagnostics }
  get fetch() { return this._fetch }
  get plugins() { return this._plugins }
  get baseUrl() { return this._baseUrl }
  get nowrap() { return this._nowrap }

  addDiagnostic(d: Diagnostic): void {
    this._diagnostics.push(d)
  }
}

export function createContext(options: CompileOptions = {}): Context {
  const metadata: DocumentMetadata = {}
  if (options.theme) metadata.theme = options.theme
  if (options.type)  metadata.type  = options.type
  const diagnostics: Diagnostic[] = []
  const fetchFn = options.fetch ?? (options.baseDir ? defaultFileFetch(options.baseDir) : defaultFetch(options.baseUrl ?? ''))
  const ctx = new ContextImpl(metadata, diagnostics, fetchFn, options.plugins ?? [], options.baseUrl ?? options.baseDir ?? '', options.nowrap ?? false)
  registerStdlib(ctx)
  for (const plugin of (options.plugins ?? [])) {
    plugin.setup?.(ctx)
    for (const fn of (plugin.functions ?? [])) {
      ctx.define(fn.name, { kind: 'builtin', fn: fn.fn as (args: QdRawArg[], ctx: Context) => Promise<QdValue> })
    }
  }
  return ctx
}

function defaultFetch(baseUrl: string): (path: string) => Promise<string> {
  return async (path: string) => {
    const url = baseUrl ? new URL(path, baseUrl).href : path
    const response = await fetch(url)
    if (!response.ok) throw new Error(`fetch failed: ${response.status} ${url}`)
    return response.text()
  }
}

function defaultFileFetch(baseDir: string): (path: string) => Promise<string> {
  return async (path: string) => {
    const { readFileSync } = await import('fs')
    const { join, isAbsolute } = await import('path')
    const resolved = isAbsolute(path) ? path : join(baseDir, path)
    return readFileSync(resolved, 'utf8')
  }
}
