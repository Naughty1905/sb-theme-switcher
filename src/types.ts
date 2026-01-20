/**
 * Storybook theme object from @storybook/theming
 */
export interface StorybookTheme {
  base: 'light' | 'dark';
  colorPrimary?: string;
  colorSecondary?: string;
  appBg?: string;
  appContentBg?: string;
  appBorderColor?: string;
  textColor?: string;
  barTextColor?: string;
  barSelectedColor?: string;
  barBg?: string;
  [key: string]: any;
}

/**
 * Single theme configuration
 */
export interface Theme {
  /** Unique theme identifier */
  id: string;
  /** Display title for the theme */
  title: string;
  /** CSS class to apply to document.documentElement */
  class: string;
  /** Theme color (used in dropdown) */
  color?: string;
  /** Storybook theme object for manager UI */
  storybookTheme: StorybookTheme;
  /** Custom icon (SVG string or React component) */
  icon?: string | React.ComponentType;
}

/**
 * Plugin configuration options
 */
export interface ThemeSwitcherOptions {
  /** Array of available themes (minimum 2) */
  themes: Theme[];
  /** Default theme ID (must match one of the themes) */
  defaultTheme?: string;
  /** Custom localStorage key for theme persistence */
  storageKey?: string;
  /** Custom icons for themes (keyed by theme ID) */
  icons?: Record<string, string | React.ComponentType>;
}

/**
 * Internal theme state
 */
export interface ThemeState {
  currentThemeId: string;
  themes: Theme[];
  storageKey: string;
}
