# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
