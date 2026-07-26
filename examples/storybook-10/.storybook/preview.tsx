import type { Preview } from '@storybook/react';
import { DocsContainer } from 'sb-theme-switcher/docs';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      // Themes are picked up automatically from the addon options in main.ts
      container: DocsContainer
    }
  }
};

export default preview;
