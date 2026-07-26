import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist/**', 'examples/**', 'node_modules/**', 'coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // TypeScript already checks this (and understands ambient/UMD globals
      // like the `React` namespace from @types/react); the core rule only
      // produces false positives on .ts/.tsx files.
      // https://typescript-eslint.io/troubleshooting/faqs/general/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-i-have-specified-them-in-globals
      'no-undef': 'off'
    }
  },
  {
    // Plain JS/MJS/CJS files (repo scripts, the CJS preset shim) aren't
    // covered by the ts/tsx block above but still need Node globals.
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.node }
    }
  },
  {
    // src/preset.ts runs in Storybook's Node process (it's the addon's
    // `preset.js` entry, never bundled for the browser), so the dynamic
    // `require()` used there for Storybook-major feature detection is
    // intentional and not covered by the "static imports only" rule that
    // applies to browser-bundled code.
    files: ['src/preset.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: { globals: { ...globals.node } }
  }
];
