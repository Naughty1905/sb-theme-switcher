import React, { useState, useEffect } from 'react';
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, TOOL_ID, PARAM_KEY, DEFAULT_STORAGE_KEY } from '../constants';
import type { ThemeSwitcherOptions, Theme } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { getInitialTheme, applyManagerTheme, applyPreviewTheme, observePreviewIframe } from './utils';

const getAddonOptions = (): ThemeSwitcherOptions | null => {
  try {
    if (typeof window !== 'undefined' && (window as any).__SB_THEME_SWITCHER_OPTIONS__) {
      return (window as any).__SB_THEME_SWITCHER_OPTIONS__;
    }
    return null;
  } catch {
    return null;
  }
};

const ThemeSwitcherTool = () => {
  const options = getAddonOptions();
  
  if (!options || !options.themes || options.themes.length < 2) {
    return null;
  }

  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => 
    getInitialTheme(options.themes, storageKey, options.defaultTheme)
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const theme = options.themes.find(t => t.id === e.newValue);
        if (theme) {
          setCurrentTheme(theme);
          applyManagerTheme(theme);
          applyPreviewTheme(theme.class, storageKey);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [options.themes, storageKey]);

  return (
    <ThemeSwitcher
      themes={options.themes}
      currentTheme={currentTheme}
      storageKey={storageKey}
      onThemeChange={setCurrentTheme}
    />
  );
};

const options = getAddonOptions();
if (options && options.themes && options.themes.length >= 2) {
  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const initialTheme = getInitialTheme(options.themes, storageKey, options.defaultTheme);
  
  applyManagerTheme(initialTheme);
  setTimeout(() => applyPreviewTheme(initialTheme.class, storageKey), 1000);
  observePreviewIframe(storageKey, options.themes);
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Переключить тему',
    match: () => true,
    render: () => <ThemeSwitcherTool />
  });
});
