import { DEFAULT_STORAGE_KEY } from '../constants';

/**
 * Initialize theme in preview iframe
 * This runs when the preview loads
 */
const initializePreviewTheme = () => {
  // Try to get theme from localStorage
  const storageKey = DEFAULT_STORAGE_KEY;
  const savedThemeClass = localStorage.getItem(`${storageKey}-class`);
  
  if (savedThemeClass) {
    document.documentElement.setAttribute('data-theme', savedThemeClass);
  } else {
    // Fallback to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark-theme' : 'light-theme');
  }
};

/**
 * Listen for theme changes from manager
 */
const observeThemeChanges = () => {
  const storageKey = DEFAULT_STORAGE_KEY;
  
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

// Initialize on load
if (typeof window !== 'undefined') {
  initializePreviewTheme();
  observeThemeChanges();
}

/**
 * Preview decorator (optional, for additional functionality)
 */
export const withTheme = (StoryFn: any) => {
  return StoryFn();
};
