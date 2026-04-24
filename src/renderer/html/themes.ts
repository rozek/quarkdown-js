export interface ThemeVars { [varName: string]: string }

const themes: Record<string, ThemeVars> = {
  default: {
    '--qd-color-bg': '#ffffff',
    '--qd-color-text': '#1a1a1a',
    '--qd-color-primary': '#0066cc',
    '--qd-color-border': '#e0e0e0',
    '--qd-color-surface': '#f5f5f5',
    '--qd-font-body': 'system-ui, sans-serif',
    '--qd-font-mono': 'monospace',
    '--qd-font-size-base': '16px',
    '--qd-line-height': '1.6',
    '--qd-space': '1rem',
  },
  paperwhite: {
    '--qd-color-bg': '#faf9f7',
    '--qd-color-text': '#2c2c2c',
    '--qd-color-primary': '#1a5276',
    '--qd-color-border': '#d5c9b8',
    '--qd-color-surface': '#f0ece6',
    '--qd-font-body': 'Georgia, "Times New Roman", serif',
    '--qd-font-mono': '"Courier New", monospace',
    '--qd-font-size-base': '17px',
    '--qd-line-height': '1.7',
    '--qd-space': '1.2rem',
  },
  galactic: {
    '--qd-color-bg': '#0d1117',
    '--qd-color-text': '#e6edf3',
    '--qd-color-primary': '#58a6ff',
    '--qd-color-border': '#30363d',
    '--qd-color-surface': '#161b22',
    '--qd-font-body': '"Segoe UI", system-ui, sans-serif',
    '--qd-font-mono': '"Fira Code", monospace',
    '--qd-font-size-base': '16px',
    '--qd-line-height': '1.6',
    '--qd-space': '1rem',
  },
  dark: {
    '--qd-color-bg': '#1e1e1e',
    '--qd-color-text': '#d4d4d4',
    '--qd-color-primary': '#4ec9b0',
    '--qd-color-border': '#3c3c3c',
    '--qd-color-surface': '#252526',
    '--qd-font-body': '"Segoe UI", system-ui, sans-serif',
    '--qd-font-mono': '"Cascadia Code", monospace',
    '--qd-font-size-base': '15px',
    '--qd-line-height': '1.65',
    '--qd-space': '1rem',
  },
}

const layoutThemes: Record<string, ThemeVars> = {
  default: {},
  latex: {
    '--qd-font-body': '"Computer Modern", "Latin Modern", Georgia, serif',
    '--qd-font-size-base': '12pt',
    '--qd-line-height': '1.5',
    '--qd-space': '1.5em',
  },
}

export function getThemeCss(colorTheme = 'default', layoutTheme = 'default'): string {
  const colorVars = themes[colorTheme] ?? themes.default
  const layoutVars = layoutThemes[layoutTheme] ?? {}
  const merged = { ...colorVars, ...layoutVars }
  const vars = Object.entries(merged).map(([k, v]) => `  ${k}: ${v};`).join('\n')
  return `:root {\n${vars}\n}`
}
