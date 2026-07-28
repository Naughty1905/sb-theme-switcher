/**
 * Replaces the sb-theme-switcher copy inside examples/ with a freshly packed
 * tarball of the current source.
 *
 * Yarn 1 copies `file:` dependencies at install time and never refreshes them,
 * so without this the examples silently run an old build.
 */
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const requested = process.argv[2];
const majors = requested ? [requested] : ['8', '9', '10'];

const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const staging = mkdtempSync(join(tmpdir(), 'sb-theme-switcher-sync-'));

try {
  const tarball = execSync(`npm pack --pack-destination ${staging}`, { cwd: ROOT, encoding: 'utf8' })
    .trim()
    .split('\n')
    .pop();

  execSync(`tar -xzf ${join(staging, tarball)} -C ${staging}`);
  const packed = join(staging, 'package');

  for (const major of majors) {
    const target = join(ROOT, `examples/storybook-${major}/node_modules/sb-theme-switcher`);

    if (!existsSync(target)) {
      console.warn(`skip SB${major}: ${target} does not exist (run yarn install in that example first)`);
      continue;
    }

    rmSync(target, { recursive: true, force: true });
    execSync(`cp -R ${packed} ${target}`);
    console.log(`synced SB${major} -> sb-theme-switcher@${version}`);
  }
} finally {
  rmSync(staging, { recursive: true, force: true });
}
