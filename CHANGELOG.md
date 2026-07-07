# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
