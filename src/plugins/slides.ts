import type { Plugin } from '../core/pipeline/index.js'

export function slidesPlugin(options: { theme?: string; transition?: string } = {}): Plugin {
  const { theme = 'white', transition = 'slide' } = options
  return {
    name: 'slides',
    clientScripts: [
      {
        id: 'reveal-css',
        src: 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css',
        position: 'head',
      },
      {
        id: 'reveal-theme-css',
        src: `https://cdn.jsdelivr.net/npm/reveal.js@5/dist/theme/${theme}.css`,
        position: 'head',
      },
      {
        id: 'reveal-js',
        src: 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.esm.js',
        position: 'body-end',
      },
      {
        id: 'reveal-init',
        content: `import Reveal from 'https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.esm.js';
Reveal.initialize({ transition: '${transition}', hash: true });`,
        position: 'body-end',
      },
    ],
  }
}
