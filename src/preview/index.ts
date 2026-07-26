import { getStorageKey, getWindowOptions } from '../options';
import { resolveTheme } from '../resolveTheme';

/**
 * Resolve the theme class to apply on initial load.
 *
 * When the addon options never reached the iframe (themes are empty) there is
 * nothing to validate against, so a saved class is trusted as-is.
 */
const resolveInitialThemeClass = (): string => {
  const storageKey = getStorageKey();
  const options = getWindowOptions();
  const themes = options?.themes || [];

  const savedClass = localStorage.getItem(`${storageKey}-class`);
  const savedId = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const theme = resolveTheme({
    savedId,
    savedClass,
    themes,
    defaultThemeId: options?.defaultTheme,
    prefersDark
  });

  if (theme) {
    return theme.class;
  }

  return savedClass || (prefersDark ? 'dark-theme' : 'light-theme');
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
