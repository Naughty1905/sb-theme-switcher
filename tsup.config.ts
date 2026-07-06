import { defineConfig } from 'tsup';

const external = [
  'react',
  'react-dom',
  'storybook',
  '@storybook/manager-api',
  '@storybook/preview-api',
  '@storybook/theming',
  '@storybook/addon-docs'
];

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      manager: 'src/manager/index.tsx',
      preview: 'src/preview/index.ts',
      preset: 'src/preset.ts'
    },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";'
      };
    }
  },
  {
    // Storybook 8 manager: the builder only aliases storybook/internal/* names,
    // the flat storybook/manager-api alias appeared in Storybook 9.
    entry: {
      'manager-sb8': 'src/manager/index.tsx'
    },
    format: ['cjs', 'esm'],
    dts: false,
    sourcemap: true,
    external,
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";'
      };
    }
  }
]);
