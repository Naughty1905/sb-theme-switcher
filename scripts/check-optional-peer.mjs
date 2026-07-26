/**
 * Guards the optional-peer contract: importing the root entry must not require
 * @storybook/addon-docs. Packs the real tarball and installs it into a temp
 * project outside the repo so Node cannot resolve addon-docs from our own
 * node_modules (a symlinked install silently passes this check).
 */
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'sb-theme-switcher-peer-'));

try {
  const tarball = execSync(`npm pack --pack-destination ${dir}`, { encoding: 'utf8' }).trim().split('\n').pop();
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'peer-check', version: '1.0.0' }));
  execSync(`npm install --silent --no-audit --no-fund react react-dom storybook ./${tarball}`, {
    cwd: dir,
    stdio: 'ignore'
  });

  execSync(`node -e "require('sb-theme-switcher')"`, { cwd: dir, stdio: 'pipe' });
  execSync(`node --input-type=module -e "import 'sb-theme-switcher'"`, { cwd: dir, stdio: 'pipe' });

  console.log('optional peer OK: root entry imports without @storybook/addon-docs');
} catch (error) {
  console.error('optional peer BROKEN: the root entry requires @storybook/addon-docs');
  console.error(error.stdout?.toString() || error.message);
  process.exit(1);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
