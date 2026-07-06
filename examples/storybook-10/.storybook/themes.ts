import { create } from 'storybook/theming/create';

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Theme Switcher Demo',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',
  
  colorPrimary: '#167FFB',
  colorSecondary: '#167FFB',

  // UI
  appBg: '#FFFFFF',
  appContentBg: '#EDEEEF',
  appBorderColor: '#D6DADD',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Text colors
  textColor: '#001739',
  textInverseColor: '#FFFFFF',

  // Toolbar
  barTextColor: '#40515E',
  barSelectedColor: '#167FFB',
  barBg: '#EDEEEF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#CCD1D4',
  inputTextColor: '#909090',
  inputBorderRadius: 4
});

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Theme Switcher Demo',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',
  
  colorPrimary: '#2A8CFF',
  colorSecondary: '#2A8CFF',

  // UI
  appBg: '#455161',
  appContentBg: '#455161',
  appBorderColor: '#6C7581',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Text colors
  textColor: '#FFFFFF',
  textInverseColor: '#001739',

  // Toolbar
  barTextColor: '#FFFFFF',
  barSelectedColor: '#2A8CFF',
  barBg: '#455161',

  // Form colors
  inputBg: '#455161',
  inputBorder: '#7A879B',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 4
});

export const blueTheme = create({
  base: 'dark',
  brandTitle: 'Theme Switcher Demo',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',
  
  colorPrimary: '#29B6F6',
  colorSecondary: '#29B6F6',

  // UI
  appBg: '#3c4854',
  appContentBg: '#3c4854',
  appBorderColor: '#526172',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Text colors
  textColor: '#FFFFFF',
  textInverseColor: '#001E3C',

  // Toolbar
  barTextColor: '#FFFFFF',
  barSelectedColor: '#29B6F6',
  barBg: '#3c4854',

  // Form colors
  inputBg: '#3c4854',
  inputBorder: '#526172',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 4
});
