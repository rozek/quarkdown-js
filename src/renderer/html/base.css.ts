export const baseCss = `
.qd-document { max-width: 800px; margin: 0 auto; padding: 2rem; font-family: var(--qd-font-body); font-size: var(--qd-font-size-base); line-height: var(--qd-line-height); color: var(--qd-color-text); background: var(--qd-color-bg); }
.qd-center { display: flex; justify-content: center; text-align: center; }
.qd-row { display: flex; flex-direction: row; gap: var(--qd-space); align-items: flex-start; }
.qd-column { display: flex; flex-direction: column; gap: var(--qd-space); }
.qd-grid { display: grid; gap: var(--qd-space); grid-template-columns: repeat(var(--qd-grid-cols, 2), 1fr); }
.qd-stack { display: flex; flex-direction: column; gap: var(--qd-space); }
.qd-box { border: 1px solid var(--qd-color-border); border-radius: 4px; padding: var(--qd-space); background: var(--qd-color-surface); }
.qd-alert { border-left: 4px solid; padding: 0.75rem 1rem; border-radius: 0 4px 4px 0; margin: 1rem 0; }
.qd-alert--info { border-color: #0066cc; background: #e8f0fe; }
.qd-alert--warning { border-color: #f59e0b; background: #fef3c7; }
.qd-alert--error { border-color: #dc2626; background: #fee2e2; }
.qd-alert--success { border-color: #16a34a; background: #dcfce7; }
.qd-collapsible summary { cursor: pointer; font-weight: bold; }
.qd-tabs { border: 1px solid var(--qd-color-border); border-radius: 4px; overflow: hidden; }
.qd-pagebreak { page-break-after: always; break-after: page; }
.qd-space { height: var(--qd-space); }
.qd-figure { margin: 1.5rem auto; text-align: center; }
.qd-toc { margin: 1.5rem 0; padding: 1rem; background: var(--qd-color-surface); border-radius: 4px; }
.qd-toc ol { padding-left: 1.5rem; }
`
