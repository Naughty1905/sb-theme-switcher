import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['sb-theme-switcher'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
};

export default config;
