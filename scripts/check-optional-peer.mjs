/**
 * Guards the optional-peer contract: importing the root entry must not require
 * @storybook/addon-docs. Packs the real tarball and installs it into a temp
 * project outside the repo so Node cannot resolve addon-docs from our own
 * node_modules (a symlinked install silently passes this check).
 */
import { execSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dir = mkdtempSync(join(tmpdir(), 'sb-theme-switcher-peer-'));
const cacheDir = join(dir, '.npm-cache');
mkdirSync(cacheDir, { recursive: true });
const env = { ...process.env, npm_config_cache: cacheDir };

const logSetupFailure = (phase, error) => {
  console.error(`optional peer CHECK FAILED (setup): ${phase} failed, see output below`);
  console.error(error.stdout?.toString() || '');
  console.error(error.stderr?.toString() || error.message);
};

let exitCode = 0;

try {
  let tarball;
  try {
    tarball = execSync(`npm pack --pack-destination ${dir}`, { encoding: 'utf8', env }).trim().split('\n').pop();
  } catch (error) {
    logSetupFailure('npm pack', error);
    exitCode = 2;
  }

  if (exitCode === 0) {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'peer-check', version: '1.0.0' }));

    try {
      execSync(
        `npm install --silent --no-audit --no-fund react@^19 react-dom@^19 storybook@^10 ./${tarball}`,
        { cwd: dir, stdio: 'pipe', env }
      );
    } catch (error) {
      logSetupFailure('npm install', error);
      exitCode = 2;
    }
  }

  if (exitCode === 0) {
    try {
      execSync(`node -e "require('sb-theme-switcher')"`, { cwd: dir, stdio: 'pipe', env });
      execSync(`node --input-type=module -e "import 'sb-theme-switcher'"`, { cwd: dir, stdio: 'pipe', env });
      console.log('optional peer OK: root entry imports without @storybook/addon-docs');
    } catch (error) {
      console.error('optional peer BROKEN: the root entry requires @storybook/addon-docs');
      console.error(error.stdout?.toString() || error.message);
      exitCode = 1;
    }
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}

process.exit(exitCode);
