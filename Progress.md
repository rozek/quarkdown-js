# QuarkdownJS — Progress

## Current Phase
done ✓

## Completed Phases
- [x] 0 — Setup
- [x] 1 — Parser
- [x] 2 — Refiner
- [x] 3 — Context & Registry
- [x] 4 — Expander & Stdlib
- [x] 5 — HTML Renderer
- [x] 6 — Plugins
- [x] 7 — Integration Test
- [x] 8 — REPL Demo
- [x] 9 — GitHub Preparation

## Open Issues
(none)

## Key Decisions
- remark-parse v11 (ESM-compatible)
- Lazy arg evaluation via tagged union (QdRawArg)
- Named args passed as raw QdRawArg to builtin fns; stdlib uses arg.name to identify
- Walker: inline calls detected in text nodes; block calls detected in paragraph nodes
- Refiner: structural nodes (if/foreach/var/function) detected by name
- foreach loop param extracted from first line of block body ("n:" syntax)
- Math chain with named `to:` arg handled in stdlib/math.ts
- Citations plugin: functional stub (citeproc-js integration deferred)
