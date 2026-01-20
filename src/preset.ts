/**
 * Storybook preset for automatic addon registration
 */

export function managerEntries(entry: string[] = []): string[] {
  return [...entry, require.resolve('./dist/manager')];
}

export function config(entry: string[] = []): string[] {
  return [...entry, require.resolve('./dist/preview')];
}
