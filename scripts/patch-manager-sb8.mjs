/**
 * Rewrites the manager-api import in the Storybook 8 manager bundle.
 *
 * The SB 8 manager builder only aliases `storybook/internal/manager-api`
 * (the flat `storybook/manager-api` alias appeared in SB 9), and tsup's
 * externalize plugin runs before any esbuild alias can rewrite the specifier,
 * so the substitution is done after the build.
 */
import { readFileSync, writeFileSync } from 'node:fs';

for (const file of ['dist/manager-sb8.js', 'dist/manager-sb8.mjs']) {
  const source = readFileSync(file, 'utf8');
  writeFileSync(file, source.replaceAll('"storybook/manager-api"', '"storybook/internal/manager-api"'));
}

console.log('patched manager-sb8: storybook/manager-api -> storybook/internal/manager-api');
