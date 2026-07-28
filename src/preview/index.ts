import { getStorageKey, getWindowOptions } from '../options';
import { resolveTheme, isThemeClassAllowed } from '../resolveTheme';

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

  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === `${storageKey}-class` && e.newValue) {
      const themes = getWindowOptions()?.themes || [];
      if (isThemeClassAllowed(e.newValue, themes)) {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
    }
  });

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data?.type === 'sb-theme-switcher:theme-change') {
      const themeClass = event.data.themeClass;
      const themes = getWindowOptions()?.themes || [];
      if (themeClass && isThemeClassAllowed(themeClass, themes)) {
        document.documentElement.setAttribute('data-theme', themeClass);
      }
    }
  });
};

if (typeof window !== 'undefined') {
  initializePreviewTheme();
  observeThemeChanges();
}
