/**
 * Storybook preset for automatic addon registration
 */

export function managerEntries(entry: string[] = [], options: any = {}): string[] {
  // Store options in global for manager to access
  if (typeof global !== 'undefined') {
    (global as any).__SB_THEME_SWITCHER_OPTIONS__ = options;
  }
  return [...entry, require.resolve('./manager')];
}

export function config(entry: string[] = []): string[] {
  return [...entry, require.resolve('./preview')];
}
