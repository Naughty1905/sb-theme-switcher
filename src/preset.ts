/**
 * Storybook preset for automatic addon registration.
 *
 * Storybook (7+) auto-detects the `./manager` and `./preview` package exports,
 * so this preset only needs to deliver the addon options (from main.js) into
 * the browser: both the manager window and the preview iframe read
 * `window.__SB_THEME_SWITCHER_OPTIONS__`.
 */

interface SerializableOptions {
  themes?: Array<Record<string, unknown>>;
  defaultTheme?: string;
  storageKey?: string;
}

const serializeOptions = (options: SerializableOptions): string | null => {
  const { themes, defaultTheme, storageKey } = options || {};

  if (!Array.isArray(themes) || themes.length < 2) {
    return null;
  }

  // Strip non-serializable fields (React component icons can only be
  // provided via a manual `window.__SB_THEME_SWITCHER_OPTIONS__` script).
  const safeThemes = themes.map(theme => {
    const { icon, ...rest } = theme as { icon?: unknown };
    return typeof icon === 'string' ? { ...rest, icon } : rest;
  });

  return JSON.stringify({ themes: safeThemes, defaultTheme, storageKey }).replace(/</g, '\\u003c');
};

const injectionScript = (options: SerializableOptions): string => {
  const serialized = serializeOptions(options);
  if (!serialized) {
    return '';
  }
  return `<script>window.__SB_THEME_SWITCHER_OPTIONS__ = ${serialized};</script>`;
};

export function managerHead(head: string = '', options: any = {}): string {
  return `${head}\n${injectionScript(options)}`;
}

export function previewHead(head: string = '', options: any = {}): string {
  return `${head}\n${injectionScript(options)}`;
}
