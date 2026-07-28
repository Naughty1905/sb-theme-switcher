/**
 * Storybook preset for automatic addon registration.
 *
 * Responsibilities:
 * - register the manager entry matching the Storybook version (see managerEntries);
 *   the `./preview` package export is auto-detected by Storybook itself;
 * - deliver the addon options (from main.js) into the browser: both the manager
 *   window and the preview iframe read `window.__SB_THEME_SWITCHER_OPTIONS__`.
 */

interface SerializableOptions {
  themes?: Array<Record<string, unknown>>;
  defaultTheme?: string;
  storageKey?: string;
  labels?: Record<string, string>;
}

export const serializeOptions = (options: SerializableOptions): string | null => {
  const { themes, defaultTheme, storageKey, labels } = options || {};

  if (!Array.isArray(themes) || themes.length < 2) {
    return null;
  }

  // Strip non-serializable fields (React component icons can only be
  // provided via a manual `window.__SB_THEME_SWITCHER_OPTIONS__` script).
  const safeThemes = themes.map(theme => {
    const { icon, ...rest } = theme as { icon?: unknown };
    return typeof icon === 'string' ? { ...rest, icon } : rest;
  });

  return JSON.stringify({ themes: safeThemes, defaultTheme, storageKey, labels }).replace(/</g, '\\u003c');
};

const injectionScript = (options: SerializableOptions): string => {
  const serialized = serializeOptions(options);
  if (!serialized) {
    return '';
  }
  return `<script>window.__SB_THEME_SWITCHER_OPTIONS__ = ${serialized};</script>`;
};

const getStorybookMajor = (): number => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require('storybook/package.json');
    return parseInt(version, 10) || 0;
  } catch {
    return 0;
  }
};

/**
 * The manager entry is registered here (not via the `./manager` package export)
 * so the right bundle can be picked per Storybook version: SB 9/10 alias
 * `storybook/manager-api` in the manager builder, SB 8 only aliases
 * `storybook/internal/manager-api`.
 */
export function managerEntries(entry: string[] = []): string[] {
  const major = getStorybookMajor();

  if (major > 0 && major < 8) {
    // eslint-disable-next-line no-console
    console.warn(
      `[sb-theme-switcher] Storybook ${major}.x is not supported (requires 8.x or newer), the theme toolbar will not be registered.`
    );
    return entry;
  }

  return [...entry, require.resolve(major === 8 ? './manager-sb8' : './manager')];
}

export function managerHead(head: string = '', options: any = {}): string {
  return `${head}\n${injectionScript(options)}`;
}

export function previewHead(head: string = '', options: any = {}): string {
  return `${head}\n${injectionScript(options)}`;
}
