# sb-theme-switcher Example

This example demonstrates how to use `sb-theme-switcher` in a Storybook project.

## Features Demonstrated

- ✅ Three themes (Light, Dark, Blue Ocean)
- ✅ Automatic dropdown UI (3+ themes)
- ✅ Theme synchronization in both manager and preview
- ✅ Docs mode support
- ✅ CSS variables for theming
- ✅ Custom theme colors and styling

## Running the Example

From the root of the repository:

```bash
# Install dependencies and build
yarn build

# Run example
yarn example
```

Or manually:

```bash
cd examples/basic
yarn install
yarn storybook
```

## What to Try

1. **Switch themes** using the dropdown in the toolbar
2. **Navigate to Docs** and see the theme apply automatically
3. **Open multiple tabs** and see theme sync across them
4. **Inspect components** to see CSS variables in action

## Configuration Files

- `.storybook/main.ts` - Addon registration
- `.storybook/manager-head.html` - Theme configuration and CSS fixes for Storybook UI
- `.storybook/preview.tsx` - Docs container setup
- `.storybook/preview.css` - Theme CSS variables for your components
- `.storybook/themes.ts` - Storybook theme objects
