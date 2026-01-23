import { defineConfig } from 'tsup';

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
    external: ['react', 'react-dom', 'storybook', '@storybook/manager-api', '@storybook/preview-api', '@storybook/theming'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";'
      };
      // Suppress require.resolve warnings for preset
      options.logOverride = {
        'require-resolve-not-external': 'silent'
      };
    }
  }
]);
