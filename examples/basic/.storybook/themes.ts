import { create } from 'storybook/theming/create';

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Theme Switcher Demo',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',
  
  colorPrimary: '#167FFB',
  colorSecondary: '#167FFB',

  // UI
  appBg: '#FFFFFF',
  appContentBg: '#F6F9FC',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333333',
  textInverseColor: '#FFFFFF',

  // Toolbar
  barTextColor: '#666666',
  barSelectedColor: '#167FFB',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E0E0E0',
  inputTextColor: '#333333',
  inputBorderRadius: 4
});

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Theme Switcher Demo',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',
  
  colorPrimary: '#2A8CFF',
  colorSecondary: '#2A8CFF',

  // UI
  appBg: '#1a1a1a',
  appContentBg: '#2d2d2d',
  appBorderColor: '#3d3d3d',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#FFFFFF',
  textInverseColor: '#333333',

  // Toolbar
  barTextColor: '#CCCCCC',
  barSelectedColor: '#2A8CFF',
  barBg: '#1a1a1a',

  // Form colors
  inputBg: '#2d2d2d',
  inputBorder: '#3d3d3d',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 4
});

export const blueTheme = create({
  base: 'dark',
  brandTitle: 'Theme Switcher Demo',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',
  
  colorPrimary: '#00D9FF',
  colorSecondary: '#00D9FF',

  // UI
  appBg: '#0A1929',
  appContentBg: '#132F4C',
  appBorderColor: '#1E4976',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#E3F2FD',
  textInverseColor: '#0A1929',

  // Toolbar
  barTextColor: '#B2D4FF',
  barSelectedColor: '#00D9FF',
  barBg: '#0A1929',

  // Form colors
  inputBg: '#132F4C',
  inputBorder: '#1E4976',
  inputTextColor: '#E3F2FD',
  inputBorderRadius: 4
});
