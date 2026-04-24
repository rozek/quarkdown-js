import type { Plugin } from '../core/pipeline/index.js'

export const pagedPlugin: Plugin = {
  name: 'paged',
  clientScripts: [
    {
      id: 'paged-js',
      src: 'https://cdn.jsdelivr.net/npm/pagedjs@0.4.3/dist/paged.polyfill.js',
      position: 'body-end',
    },
  ],
}
