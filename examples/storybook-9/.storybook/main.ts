import type { StorybookConfig } from '@storybook/react-vite';
import { lightTheme, darkTheme } from './themes';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    {
      name: 'sb-theme-switcher',
      options: {
        themes: [
          {
            id: 'light',
            title: 'Light',
            class: 'light-theme',
            storybookTheme: lightTheme
          },
          {
            id: 'dark',
            title: 'Dark',
            class: 'dark-theme',
            storybookTheme: darkTheme
          }
        ],
        defaultTheme: 'light',
        storageKey: 'example-theme-sb9'
      }
    }
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
};

export default config;
