/**
 * Default localStorage key for theme persistence
 */
export const DEFAULT_STORAGE_KEY = 'sb-theme-switcher';

/**
 * Addon ID for Storybook registration
 */
export const ADDON_ID = 'sb-theme-switcher';

/**
 * Tool ID for toolbar button
 */
export const TOOL_ID = `${ADDON_ID}/tool`;

/**
 * Parameter key for addon options
 */
export const PARAM_KEY = 'themeSwitcher';

/**
 * Default theme IDs
 */
export const DEFAULT_THEME_IDS = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;
