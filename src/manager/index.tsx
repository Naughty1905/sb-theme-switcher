import React, { useState, useEffect } from 'react';
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, TOOL_ID, DEFAULT_STORAGE_KEY } from '../constants';
import { getWindowOptions } from '../options';
import type { Theme } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { getInitialTheme, applyManagerTheme, applyPreviewTheme, observePreviewIframe } from './utils';

const ThemeSwitcherTool = () => {
  const options = getWindowOptions();
  const themes = options?.themes || [];
  const storageKey = options?.storageKey || DEFAULT_STORAGE_KEY;

  const [currentTheme, setCurrentTheme] = useState<Theme | null>(() =>
    themes.length >= 2 ? getInitialTheme(themes, storageKey, options?.defaultTheme) : null
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const theme = themes.find(t => t.id === e.newValue);
        if (theme) {
          setCurrentTheme(theme);
          applyManagerTheme(theme);
          applyPreviewTheme(theme.class, storageKey);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [themes, storageKey]);

  if (themes.length < 2 || !currentTheme) {
    return null;
  }

  return (
    <ThemeSwitcher
      themes={themes}
      currentTheme={currentTheme}
      storageKey={storageKey}
      onThemeChange={setCurrentTheme}
    />
  );
};

const options = getWindowOptions();
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
