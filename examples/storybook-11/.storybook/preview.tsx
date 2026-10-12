import { definePreview } from '@storybook/react-vite';
import addonDocs from '@storybook/addon-docs';
import * as themeSwitcher from 'sb-theme-switcher/preview';
import { DocsContainer } from 'sb-theme-switcher/docs';
import './preview.css';

export default definePreview({
  addons: [addonDocs(), themeSwitcher],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      container: DocsContainer
    }
  }
});
