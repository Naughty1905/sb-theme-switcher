# sb-theme-switcher — Storybook 10 example

Three themes (Light, Dark, Blue Ocean) → the addon renders a **dropdown** with color indicators. Docs pages re-theme via `DocsContainer`.

All configuration lives in `.storybook/main.ts` (addon options); `preview.tsx` only wires up the docs container.

## Run

From the repository root:

```bash
yarn build
cd examples/storybook-10
yarn install
yarn storybook   # http://localhost:6108
```
