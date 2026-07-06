# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-06

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
