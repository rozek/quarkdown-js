import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Dev server: serve demo as a regular app (no library mode)
    return {
      root: '.',
      server: { open: '/demo/index.html' },
    }
  }

  // Build: library mode — produces ESM + UMD bundles
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'QuarkdownJS',
        formats: ['es', 'umd'],
        fileName: (fmt) => `quarkdown-js.${fmt === 'es' ? 'esm' : fmt}.js`,
      },
    },
  }
})
