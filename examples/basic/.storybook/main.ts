import type { StorybookConfig } from '@storybook/react-vite';
import { lightTheme, darkTheme, blueTheme } from './themes';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    {
      name: 'sb-theme-switcher',
      options: {
        themes: [
          {
            id: 'light',
            title: 'Light',
            class: 'light-theme',
            color: '#ffffff',
            storybookTheme: lightTheme
          },
          {
            id: 'dark',
            title: 'Dark',
            class: 'dark-theme',
            color: '#1a1a1a',
            storybookTheme: darkTheme
          },
          {
            id: 'blue',
            title: 'Blue Ocean',
            class: 'blue-theme',
            color: '#167FFB',
            storybookTheme: blueTheme
          }
        ],
        defaultTheme: 'light',
        storageKey: 'example-theme'
      }
    }
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
};

export default config;
