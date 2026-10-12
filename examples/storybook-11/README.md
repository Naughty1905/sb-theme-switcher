# sb-theme-switcher — Storybook 11 example

Three themes (Light, Dark, Blue Ocean) → the addon renders a **dropdown** with color indicators. Docs pages re-theme via `DocsContainer`.

Written in CSF Next: addon options live in `.storybook/main.ts`, and `preview.tsx` registers the addon's preview entry in `definePreview({ addons })` — CSF Next does not load it from `main.ts`.

## Run

From the repository root:

```bash
yarn build
cd examples/storybook-11
yarn install
yarn storybook   # http://localhost:6111
```
