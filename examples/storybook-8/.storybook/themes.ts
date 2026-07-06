// Storybook 8: `storybook/theming` subpath does not exist yet, use @storybook/theming
import { create } from '@storybook/theming';

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Theme Switcher Demo (SB 8)',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',

  colorPrimary: '#167FFB',
  colorSecondary: '#167FFB',

  appBg: '#FFFFFF',
  appContentBg: '#EDEEEF',
  appBorderColor: '#D6DADD',
  appBorderRadius: 4,

  textColor: '#001739',
  textInverseColor: '#FFFFFF',

  barTextColor: '#40515E',
  barSelectedColor: '#167FFB',
  barBg: '#EDEEEF',

  inputBg: '#FFFFFF',
  inputBorder: '#CCD1D4',
  inputTextColor: '#909090',
  inputBorderRadius: 4
});

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Theme Switcher Demo (SB 8)',
  brandUrl: 'https://github.com/Naughty1905/sb-theme-switcher',

  colorPrimary: '#2A8CFF',
  colorSecondary: '#2A8CFF',

  appBg: '#455161',
  appContentBg: '#455161',
  appBorderColor: '#6C7581',
  appBorderRadius: 4,

  textColor: '#FFFFFF',
  textInverseColor: '#001739',

  barTextColor: '#FFFFFF',
  barSelectedColor: '#2A8CFF',
  barBg: '#455161',

  inputBg: '#455161',
  inputBorder: '#7A879B',
  inputTextColor: '#FFFFFF',
  inputBorderRadius: 4
});
