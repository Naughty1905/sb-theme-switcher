import type { StorybookTheme } from '../types';

/**
 * Copies of Storybook's default light/dark themes (storybook/theming `themes`).
 * Inlined because `storybook/theming` is not importable on Storybook 8
 * (only `storybook/internal/theming` exists there), and a bare `{ base }`
 * object crashes addon-docs 10.4+ (its `ensure()` runs color functions
 * on the missing fields).
 */
export const fallbackLightTheme: StorybookTheme = {
  base: 'light',
  colorPrimary: '#FF4785',
  colorSecondary: '#006DEB',
  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appHoverBg: '#DBECFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: 'hsl(212 50% 30% / 0.15)',
  appBorderRadius: 4,
  fontBase:
    '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode:
    'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
  textColor: '#2E3338',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#5C6570',
  barTextColor: '#5C6570',
  barHoverColor: '#005CC7',
  barSelectedColor: '#0063D6',
  barBg: '#FFFFFF',
  buttonBg: '#F6F9FC',
  buttonBorder: '#D9E5F2',
  booleanBg: '#ECF2F9',
  booleanSelectedBg: '#FFFFFF',
  inputBg: '#FFFFFF',
  inputBorder: 'hsl(212 50% 30% / 0.15)',
  inputTextColor: '#2E3338',
  inputBorderRadius: 4
};

export const fallbackDarkTheme: StorybookTheme = {
  base: 'dark',
  colorPrimary: '#FF4785',
  colorSecondary: '#479DFF',
  appBg: '#1B1C1D',
  appContentBg: '#222325',
  appHoverBg: '#233952',
  appPreviewBg: '#FFFFFF',
  appBorderColor: 'hsl(0 0% 100% / 0.1)',
  appBorderRadius: 4,
  fontBase:
    '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode:
    'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
  textColor: '#C9CCCF',
  textInverseColor: '#1B1C1D',
  textMutedColor: '#95999D',
  barTextColor: '#95999D',
  barHoverColor: '#70B3FF',
  barSelectedColor: '#479DFF',
  barBg: '#222325',
  buttonBg: '#1B1C1D',
  buttonBorder: 'hsl(0 0% 100% / 0.1)',
  booleanBg: '#1B1C1D',
  booleanSelectedBg: '#292B2E',
  inputBg: '#1B1C1D',
  inputBorder: 'hsl(0 0% 100% / 0.1)',
  inputTextColor: '#C9CCCF',
  inputBorderRadius: 4
};
