import { DEFAULT_STORAGE_KEY } from './constants';
import type { ThemeSwitcherOptions } from './types';

/**
 * Read addon options injected by the preset (managerHead/previewHead)
 * or defined manually in manager-head.html / preview-head.html.
 * Works in both the manager window and the preview iframe.
 */
export const getWindowOptions = (): ThemeSwitcherOptions | null => {
  try {
    if (typeof window !== 'undefined' && (window as any).__SB_THEME_SWITCHER_OPTIONS__) {
      return (window as any).__SB_THEME_SWITCHER_OPTIONS__ as ThemeSwitcherOptions;
    }
  } catch {
    // ignore cross-origin or sandbox failures
  }
  return null;
};

export const getStorageKey = (): string => {
  return getWindowOptions()?.storageKey || DEFAULT_STORAGE_KEY;
};
