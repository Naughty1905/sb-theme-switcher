/**
 * Rewrites the manager-api import in the Storybook 8 manager bundle.
 *
 * The SB 8 manager builder only aliases `storybook/internal/manager-api`
 * (the flat `storybook/manager-api` alias appeared in SB 9), and tsup's
 * externalize plugin runs before any esbuild alias can rewrite the specifier,
 * so the substitution is done after the build.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const FROM = '"storybook/manager-api"';
const TO = '"storybook/internal/manager-api"';

for (const file of ['dist/manager-sb8.js', 'dist/manager-sb8.mjs']) {
  const source = readFileSync(file, 'utf8');

  if (!source.includes(FROM)) {
    console.error(
      `[patch-manager-sb8] ${file} does not import ${FROM}.\n` +
        'The SB8 bundle would ship an import the SB8 manager builder cannot alias.\n' +
        'Check whether tsup output or the Storybook module names changed.'
    );
    process.exit(1);
  }

  writeFileSync(file, source.replaceAll(FROM, TO));
}

console.log(`patched manager-sb8: ${FROM} -> ${TO}`);
