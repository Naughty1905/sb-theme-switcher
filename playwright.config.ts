import { defineConfig } from '@playwright/test';

const major = process.env.SB_EXAMPLE ?? '10';
const port = 6100 + Number(major);

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  // The bare 'github' reporter only emits inline annotations and never writes
  // playwright-report/, which CI uploads on failure — pair it with 'html' so that
  // artifact actually exists when a smoke test fails on a major we can't reproduce locally.
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure'
  },
  webServer: {
    command: `cd examples/storybook-${major} && npx storybook dev -p ${port} --no-open --ci`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
});
