import { defineConfig, mergeCatalogRules } from 'pncat'

export default defineConfig({
  catalogRules: mergeCatalogRules([
    {
      name: 'network',
      match: ['undici'],
    },
  ]),
  postRun: 'eslint --fix .',
})
