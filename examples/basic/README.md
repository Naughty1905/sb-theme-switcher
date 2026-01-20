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
# Install dependencies
cd examples/basic
yarn install

# Link the addon
cd ../..
yarn build
cd examples/basic

# Start Storybook
yarn storybook
```

Or from the example directory:

```bash
yarn install
yarn storybook
```

## What to Try

1. **Switch themes** using the dropdown in the toolbar
2. **Navigate to Docs** and see the theme apply automatically
3. **Open multiple tabs** and see theme sync across them
4. **Inspect components** to see CSS variables in action

## Configuration

See `.storybook/main.ts` for the addon configuration with three themes.

See `.storybook/preview.tsx` for the Docs container setup.

See `.storybook/preview.css` for theme CSS variables.
