/**
 * Main entry point for sb-theme-switcher
 * Exports types and utilities for users
 */

export type { Theme, ThemeSwitcherOptions, StorybookTheme, ThemeState } from './types';
export { DEFAULT_STORAGE_KEY, ADDON_ID, PARAM_KEY } from './constants';
export { DocsContainer } from './docs/DocsContainer';
export { useTheme } from './docs/useTheme';
export { withTheme } from './preview';
