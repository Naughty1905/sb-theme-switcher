# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-25

### Removed
- **Breaking:** `withTheme` — a pass-through decorator that never did anything. Delete it from `decorators`.
- **Breaking:** `PARAM_KEY` — the addon never read Storybook `parameters`.
- **Breaking:** `ThemeState` — an exported type used by nothing.
- **Breaking:** `ThemeSwitcherOptions.icons` — never read; per-theme `icon` is the supported field.
- `DEFAULT_THEME_IDS` — internal, was not part of the public API.

### Changed
- **Breaking:** `DocsContainer` moved to the `sb-theme-switcher/docs` subpath. `@storybook/addon-docs` is declared an optional peer, but the root entry imported it statically, so importing `useTheme` alone crashed when addon-docs was absent. `scripts/check-optional-peer.mjs` now guards this in CI.
- **Breaking:** toolbar strings are English by default (`Switch theme`, `Select theme`, `Switch to {theme}`). Pass the new `labels` option to override them.
- The toggle tooltip names the actual next theme instead of assuming a light/dark pair.

### Fixed
- A saved theme is validated against the configured themes before it is applied. Previously `<storageKey>-class` was trusted first, so a renamed class stuck forever on standalone `iframe.html`, and a saved id pointing at a deleted theme synthesized `${id}-theme` instead of falling back to the default.
- Keyboard focus is visible on the toggle again — the focus outline was removed with no replacement.
- The initial preview theme is applied when the iframe loads instead of after a fixed 1000 ms delay, which raced on slow machines, and is now resolved through the shared `resolveTheme` (the same saved-id → saved-class → default → system-preference fallback the manager uses) instead of a raw saved-id lookup.
- The manager and the preview iframe could disagree on the active theme on a fresh session, or whenever the addon options reached the manager but not the preview (e.g. themes declared only in a hand-written `manager-head.html`): the preview observer looked up a saved id on its own and bailed out with nothing applied when none existed, and never corrected once the two had diverged. Both sides now resolve through the same call.
- `scripts/patch-manager-sb8.mjs` fails the build when the SB 8 import rewrite matches nothing, instead of reporting success. All SB 8 support depends on that substitution.
- The Node-side preset bundle no longer carries a `"use client"` banner.

### Added
- `ThemeSwitcherLabels` is exported from the root entry, alongside the other option types.
- Unit tests (Vitest) for theme resolution, option serialization and labels.
- Playwright smoke tests covering theme switching, persistence and docs re-theming, run against Storybook 8, 9 and 10.
- CI: lint, typecheck, unit tests, the optional-peer contract, and a build + smoke matrix on every pull request.
- `yarn sync-examples` — Yarn 1 copies `file:` dependencies and never refreshes them, so the examples were running builds as old as 0.2.0.
- ESLint 9 flat config; `yarn lint` works again.

### Note
The 0.2.0 entry below says the preset no longer registers `managerEntries`. That was true only briefly within that release: SB 8 support, added in the same version, reintroduced `managerEntries` to select the bundle per Storybook major. The current architecture depends on it.

## [0.2.4] - 2026-07-24

### Fixed
- Docs pages crashed with `PolishedError` ("Passed an incorrect argument to a color function") on Storybook 10.4+ when the addon options did not reach the preview iframe (e.g. themes declared in a hand-written `manager-head.html` instead of the addon options in `main.js`): the `DocsContainer` fallback returned a bare `{ base }` theme with no color fields. The fallback now uses complete copies of Storybook's default light/dark themes and logs a warning explaining how to pass the themes correctly.

### Added
- MDX docs page in `examples/storybook-10` (theme switching now verified on MDX pages, not only autodocs).
- README: recipe for composing `DocsContainer` with an existing custom docs container.

### Removed
- Russian README (`README.ru.md`): single English README from now on.

## [0.2.3] - 2026-07-08

### Changed
- Catalog card polish: package description leads with the differentiator (manager UI + preview + docs switch together), custom addon icon. No code changes.

## [0.2.2] - 2026-07-08

### Changed
- Storybook addon catalog metadata: `storybook-addons` keyword and `storybook` field (displayName, supported frameworks). No code changes.

## [0.2.1] - 2026-07-07

### Fixed
- The manager sidebar was not re-themed on runtime theme switch in Storybook 10.4+: `addons.setConfig({ theme })` alone no longer updates the whole manager UI. The toolbar tool now also calls `api.setOptions({ theme })` (the public manager API), which re-themes the entire UI on 8.x–10.x.

### Added
- Demo GIFs in the README (story and docs pages, 3 themes).

## [0.2.0] - 2026-07-06

### Added
- Storybook 8 support: the preset detects the Storybook major version and registers a dedicated `manager-sb8` bundle (SB 8 only aliases `storybook/internal/manager-api` in its manager builder; the flat `storybook/manager-api` alias appeared in SB 9).
- Runnable examples per supported major: `examples/storybook-8` (toggle), `examples/storybook-9` (toggle), `examples/storybook-10` (3 themes, dropdown) — each verified in the browser (toolbar, manager/preview/docs sync, persistence).
- Storybook 7 is explicitly not supported: the preset logs a warning and skips manager registration.

### Fixed
- Addon options from `main.js` never reached the browser: the preset stored them in the Node process `global`, while manager/preview read `window`. Options are now injected into the HTML head of both the manager window and the preview iframe via the `managerHead`/`previewHead` preset hooks — no more manual `manager-head.html` scripts.
- Preview iframe ignored a custom `storageKey` on load and fell back to the system color scheme (theme flash / wrong theme on reload and on direct `iframe.html` opens). The preview now resolves the saved theme from the injected options.
- `DocsContainer` used runtime `require()`, which silently fails in ESM/Vite builds and rendered docs in a bare `<div>`. Replaced with a static import from `@storybook/addon-docs/blocks` (optional peer dependency).
- `observePreviewIframe` wrote the theme class under the default storage key instead of the configured one.
- React hooks were called after a conditional early return in the toolbar tool component.

### Changed
- `DocsContainer` picks up themes from the addon options automatically; the `themes` prop is now an optional override.
- The preset no longer registers `managerEntries`/`config` — Storybook auto-detects the `./manager` and `./preview` package exports (fixes double loading of the manager entry).
- Non-serializable theme icons (React components) are stripped from `main.js` options; use an SVG string, or define `window.__SB_THEME_SWITCHER_OPTIONS__` manually for component icons.

## [0.1.0] - 2026-01-23

### Added
- Initial release of sb-theme-switcher
- Automatic UI adaptation: toggle button for 2 themes, dropdown for 3+ themes
- Support for Storybook 7.x, 8.x, 9.x, and 10.x
- Full theme synchronization for both manager UI and preview iframe
- Theme persistence via localStorage with configurable storage key
- Cross-tab synchronization via storage events
- Docs mode support with custom DocsContainer wrapper
- TypeScript support with full type definitions
- Customizable themes with unlimited color schemes
- Custom icons support (SVG strings or React components)
- Color indicators in dropdown menu
- `useTheme()` hook for reading current theme in components
- `withTheme` decorator for preview
- Native button for toggle (clean design without borders)
- Dynamic switching between toggle/dropdown based on theme count
- Automatic theme detection from system preferences
- Preview iframe observer for persistent theme application
- PostMessage communication for instant theme synchronization
