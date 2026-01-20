import React from 'react';
import type { Preview } from '@storybook/react';
import { DocsContainer } from 'sb-theme-switcher';
import { lightTheme, darkTheme, blueTheme } from './themes';
import './preview.css';

const themes = [
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
  },
  {
    id: 'blue',
    title: 'Blue Ocean',
    class: 'blue-theme',
    storybookTheme: blueTheme
  }
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      container: (props) => <DocsContainer {...props} themes={themes} />
    }
  }
};

export default preview;
