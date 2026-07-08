import { getStorageKey, getWindowOptions } from '../options';

/**
 * Resolve the theme class to apply on initial load, in priority order:
 * saved class -> saved id -> defaultTheme option -> system preference.
 */
const resolveInitialThemeClass = (): string => {
  const storageKey = getStorageKey();
  const options = getWindowOptions();
  const themes = options?.themes || [];

  const savedThemeClass = localStorage.getItem(`${storageKey}-class`);
  if (savedThemeClass) {
    return savedThemeClass;
  }

  const savedThemeId = localStorage.getItem(storageKey);
  if (savedThemeId) {
    const savedTheme = themes.find(t => t.id === savedThemeId);
    // Convention fallback: id + '-theme'
    return savedTheme?.class || `${savedThemeId}-theme`;
  }

  if (options?.defaultTheme) {
    const defaultTheme = themes.find(t => t.id === options.defaultTheme);
    if (defaultTheme) {
      return defaultTheme.class;
    }
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const preferredTheme = themes.find(t => t.storybookTheme?.base === (prefersDark ? 'dark' : 'light'));
  return preferredTheme?.class || (prefersDark ? 'dark-theme' : 'light-theme');
};

const initializePreviewTheme = () => {
  document.documentElement.setAttribute('data-theme', resolveInitialThemeClass());
};

const observeThemeChanges = () => {
  const storageKey = getStorageKey();

  // Listen for storage events (cross-tab sync)
  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === `${storageKey}-class` && e.newValue) {
      document.documentElement.setAttribute('data-theme', e.newValue);
    }
  });

  // Listen for custom events from manager (same-tab sync)
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data?.type === 'sb-theme-switcher:theme-change') {
      const themeClass = event.data.themeClass;
      if (themeClass) {
        document.documentElement.setAttribute('data-theme', themeClass);
      }
    }
  });
};

if (typeof window !== 'undefined') {
  initializePreviewTheme();
  observeThemeChanges();
}

/** Optional pass-through decorator, kept for API compatibility */
export const withTheme = (StoryFn: any) => {
  return StoryFn();
};
