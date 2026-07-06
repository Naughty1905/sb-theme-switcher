# sb-theme-switcher — Storybook 8 example

Two themes (Light, Dark) → the addon renders a **toggle button** (sun/moon). Docs pages re-theme via `DocsContainer`.

On Storybook 8 the addon automatically uses a dedicated manager bundle (`manager-sb8`) — SB 8 only aliases `storybook/internal/manager-api` in its manager builder. No extra configuration is needed.

## Run

From the repository root:

```bash
yarn build
cd examples/storybook-8
yarn install
yarn storybook   # http://localhost:6106
```
