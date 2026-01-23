import { DEFAULT_STORAGE_KEY } from '../constants';

/**
 * Get storage key from window or use default
 */
const getStorageKey = (): string => {
  try {
    if (typeof window !== 'undefined' && (window as any).__SB_THEME_SWITCHER_OPTIONS__) {
      return (window as any).__SB_THEME_SWITCHER_OPTIONS__.storageKey || DEFAULT_STORAGE_KEY;
    }
  } catch {
    // Fallback to default
  }
  return DEFAULT_STORAGE_KEY;
};

/**
 * Initialize theme in preview iframe
 * This runs when the preview loads
 */
const initializePreviewTheme = () => {
  const storageKey = getStorageKey();
  
  // Try to get theme ID from localStorage (manager saves it)
  const savedThemeId = localStorage.getItem(storageKey);
  
  // Try to get theme class from localStorage (manager also saves it)
  const savedThemeClass = localStorage.getItem(`${storageKey}-class`);
  
  if (savedThemeClass) {
    document.documentElement.setAttribute('data-theme', savedThemeClass);
  } else if (savedThemeId) {
    // Fallback: try to construct class from ID (convention: id + '-theme')
    document.documentElement.setAttribute('data-theme', `${savedThemeId}-theme`);
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
