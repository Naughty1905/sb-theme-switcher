import React from 'react';
import type { Preview } from '@storybook/react';
import { DocsContainer } from 'sb-theme-switcher';
import { lightTheme, darkTheme, blueTheme } from './themes';
import './preview.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    'sb-theme-switcher': {
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
    },
    docs: {
      container: (props) => (
        <DocsContainer
          {...props}
          themes={[
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
          ]}
        />
      )
    }
  }
};

export default preview;
