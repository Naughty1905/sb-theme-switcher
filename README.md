# sb-theme-switcher

A Storybook addon that lets your users toggle between multiple themes with intelligent UI adaptation.

![Storybook 7](https://img.shields.io/badge/Storybook-7.x-ff4785?logo=storybook)
![Storybook 8](https://img.shields.io/badge/Storybook-8.x-ff4785?logo=storybook)
![Storybook 9](https://img.shields.io/badge/Storybook-9.x-ff4785?logo=storybook)
![Storybook 10](https://img.shields.io/badge/Storybook-10.x-ff4785?logo=storybook)
![npm version](https://img.shields.io/npm/v/sb-theme-switcher.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**English** | [🇷🇺 Русский](./README.ru.md)

## Why sb-theme-switcher?

Unlike [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode) which only supports light/dark themes, **sb-theme-switcher** gives you:

### 🎯 **Complete Theme Control**

- **Automatic UI Adaptation**: Toggle button for 2 themes, dropdown for 3+ themes
- **Unlimited Themes**: Not just dark/light - add as many themes as you need
- **Full Synchronization**: Theme changes apply to **both** Storybook manager UI **and** preview iframe automatically

### ⚡ **Zero Configuration Hassle**

- **No Decorators Required**: Works out of the box without wrapping your stories
- **Automatic Preview Sync**: Theme instantly applies to your components in the preview
- **Automatic Manager Sync**: Storybook UI theme changes automatically

### 🎨 **Maximum Flexibility**

- **Custom Icons**: Use your own icons for each theme
- **Color Indicators**: Visual theme identification in dropdown
- **TypeScript First**: Full type safety and IntelliSense support

## Features

✨ **Smart UI**: Automatically chooses toggle (2 themes) or dropdown (3+ themes)  
🔄 **Full Sync**: Changes both Storybook manager **and** preview iframe theme  
🎨 **Unlimited Themes**: Support for 2, 3, 4, or more themes  
💾 **Persistent**: Saves theme preference to localStorage  
📱 **Cross-tab Sync**: Theme syncs across browser tabs  
📚 **Docs Mode**: Works perfectly in both Canvas and Docs  
🔧 **TypeScript**: Complete type definitions included

## Installation

```bash
npm install sb-theme-switcher
# or
yarn add sb-theme-switcher
```

## Quick Start

### 1. Configure themes

Create your Storybook themes (`.storybook/themes.ts`):

```typescript
import { create } from 'storybook/theming';

export const lightTheme = create({
  base: 'light',
  brandTitle: 'My App',
  colorPrimary: '#167FFB'
  // ... other theme options
});

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'My App',
  colorPrimary: '#2A8CFF'
  // ... other theme options
});
```

### 2. Register the addon

In `.storybook/main.ts`:

```typescript
import type { StorybookConfig } from 'storybook/internal/types';
import { lightTheme, darkTheme } from './themes';

const config: StorybookConfig = {
  addons: [
    // ... other addons
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
          }
        ],
        defaultTheme: 'light',
        storageKey: 'my-app-theme'
      }
    }
  ]
};

export default config;
```

### 3. Enable Docs support (optional)

In `.storybook/preview.tsx`:

```typescript
import { DocsContainer } from 'sb-theme-switcher';
import { lightTheme, darkTheme } from './themes';

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
  }
];

export const parameters = {
  docs: {
    container: props => <DocsContainer {...props} themes={themes} />
  }
};
```

### 4. Add CSS for themes

In your global CSS (e.g., `preview-head.html` or main CSS file):

```css
[data-theme='light-theme'] {
  --background: #ffffff;
  --text-color: #000000;
  /* ... your light theme variables */
}

[data-theme='dark-theme'] {
  --background: #1a1a1a;
  --text-color: #ffffff;
  /* ... your dark theme variables */
}
```

## Configuration Options

### Theme Object

```typescript
interface Theme {
  id: string; // Unique identifier
  title: string; // Display name in dropdown
  class: string; // CSS class applied to document.documentElement
  color?: string; // Color indicator in dropdown
  storybookTheme: object; // Storybook theme object
  icon?: string | React.ComponentType; // Custom icon (SVG string or component)
}
```

### Addon Options

```typescript
interface ThemeSwitcherOptions {
  themes: Theme[]; // Array of themes (minimum 2)
  defaultTheme?: string; // Default theme ID
  storageKey?: string; // localStorage key (default: 'sb-theme-switcher')
  icons?: Record<string, string | React.ComponentType>; // Custom icons per theme
}
```

## Examples

### Example 1: Two Themes (Toggle)

```typescript
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
    ]
  }
}
```

Result: Toggle button with sun/moon icons

### Example 2: Multiple Themes (Dropdown)

```typescript
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
        title: 'Blue',
        class: 'blue-theme',
        color: '#167FFB',
        storybookTheme: blueTheme
      }
    ],
    defaultTheme: 'light'
  }
}
```

Result: Dropdown menu with color indicators

### Example 3: Custom Icons

```typescript
{
  name: 'sb-theme-switcher',
  options: {
    themes: [
      {
        id: 'light',
        title: 'Light',
        class: 'light-theme',
        storybookTheme: lightTheme,
        icon: '<svg>...</svg>' // Custom SVG string
      },
      {
        id: 'dark',
        title: 'Dark',
        class: 'dark-theme',
        storybookTheme: darkTheme,
        icon: MyCustomIcon // React component
      }
    ]
  }
}
```

## How It Works

### Automatic Theme Synchronization

When you switch themes, **sb-theme-switcher** automatically updates:

1. **Storybook Manager UI** - The entire Storybook interface (sidebar, toolbar, panels) changes theme
2. **Preview Iframe** - Your components in the preview get the `data-theme` attribute updated
3. **Docs Pages** - Documentation pages automatically switch to match the selected theme

This is a **major advantage** over other solutions that only change the preview or require manual decorator configuration.

### Technical Details

1. **Manager UI**: Adds a toolbar button (toggle for 2 themes) or dropdown (for 3+ themes)
2. **Theme Application**:
   - Applies Storybook theme object to manager UI via `addons.setConfig()`
   - Sets `data-theme` attribute on preview iframe's `document.documentElement`
   - Sends postMessage to preview for instant synchronization
3. **Persistence**: Saves selected theme to localStorage with configurable key
4. **Cross-tab Sync**: Listens to storage events for multi-tab synchronization
5. **Docs Support**: Custom `DocsContainer` with `MutationObserver` for reactive theme updates

## API Reference

### Exports

```typescript
// Main exports
export { DocsContainer } from 'sb-theme-switcher';
export { useTheme } from 'sb-theme-switcher';
export { withTheme } from 'sb-theme-switcher';

// Types
export type { Theme, ThemeSwitcherOptions, StorybookTheme, ThemeState } from 'sb-theme-switcher';
```

### `useTheme()` Hook

React hook to read current theme in your components:

```typescript
import { useTheme } from 'sb-theme-switcher';

function MyComponent() {
  const theme = useTheme(); // Returns current theme class, e.g., 'dark-theme'
  return <div>Current theme: {theme}</div>;
}
```

## Comparison with storybook-dark-mode

| Feature                | sb-theme-switcher       | storybook-dark-mode        |
| ---------------------- | ----------------------- | -------------------------- |
| Number of themes       | Unlimited (2+)          | Only 2 (light/dark)        |
| Manager UI theme sync  | ✅ Automatic            | ❌ Manual configuration    |
| Preview theme sync     | ✅ Automatic            | ✅ Via decorator           |
| Docs theme sync        | ✅ Automatic            | ⚠️ Requires setup          |
| UI adaptation          | Smart (toggle/dropdown) | Toggle only                |
| Custom icons           | ✅ Per theme            | ✅ Global                  |
| Color indicators       | ✅ Yes                  | ❌ No                      |
| Setup complexity       | Low (one config)        | Medium (decorators needed) |
| Storybook 7-10 support | ✅ Yes                  | ⚠️ Limited                 |

## Compatibility

- **Storybook**: 7.x, 8.x, 9.x, 10.x
- **React**: 16.8+, 17.x, 18.x
- **TypeScript**: 5.x

## Troubleshooting

### Theme not applying to preview

Make sure you have CSS rules for your theme classes:

```css
[data-theme='your-theme-class'] {
  /* your theme variables */
}
```

### Theme not persisting

Check that `storageKey` is unique and not conflicting with other localStorage keys.

### Docs not updating

Make sure you've configured `DocsContainer` in `.storybook/preview.tsx` and passed the `themes` prop.

## Migrating from storybook-dark-mode

Switching from [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode) is straightforward:

### Before (storybook-dark-mode)

```typescript
// .storybook/preview.tsx
import { themes } from '@storybook/theming';

export const parameters = {
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.light }
  }
};

// Decorators needed for preview
export const decorators = [withTheme];
```

### After (sb-theme-switcher)

```typescript
// .storybook/main.ts
import { lightTheme, darkTheme } from './themes';

export default {
  addons: [
    {
      name: 'sb-theme-switcher',
      options: {
        themes: [
          { id: 'light', title: 'Light', class: 'light-theme', storybookTheme: lightTheme },
          { id: 'dark', title: 'Dark', class: 'dark-theme', storybookTheme: darkTheme }
        ]
      }
    }
  ]
};

// No decorators needed! Everything works automatically
```

**Benefits:**

- ✅ No decorators required
- ✅ Manager UI theme changes automatically
- ✅ Preview theme changes automatically
- ✅ Docs theme changes automatically
- ✅ Can add more than 2 themes anytime

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or PR on [GitHub](https://github.com/Naughty1905/sb-theme-switcher).

## Acknowledgments

Inspired by [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode) and the theme switching needs of modern design systems.
