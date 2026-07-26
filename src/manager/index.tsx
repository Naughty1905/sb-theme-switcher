import React, { useState, useEffect, useCallback } from 'react';
import { addons, types, useStorybookApi } from 'storybook/manager-api';
import { ADDON_ID, TOOL_ID, DEFAULT_STORAGE_KEY } from '../constants';
import { getWindowOptions } from '../options';
import type { Theme } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { getInitialTheme, applyManagerTheme, applyPreviewTheme, observePreviewIframe } from './utils';

const ThemeSwitcherTool = () => {
  const api = useStorybookApi();
  const options = getWindowOptions();
  const themes = options?.themes || [];
  const storageKey = options?.storageKey || DEFAULT_STORAGE_KEY;

  const [currentTheme, setCurrentTheme] = useState<Theme | null>(() =>
    themes.length >= 2 ? getInitialTheme(themes, storageKey, options?.defaultTheme) : null
  );

  const applyTheme = useCallback(
    (theme: Theme) => {
      localStorage.setItem(storageKey, theme.id);
      applyManagerTheme(theme);
      try {
        // addons.setConfig alone stopped re-theming the whole manager UI at
        // runtime in newer Storybook (10.4+); api.setOptions is the public way
        api.setOptions({ theme: theme.storybookTheme });
      } catch {
        // older managers may not support setOptions at this point
      }
      applyPreviewTheme(theme.class, storageKey);
      setCurrentTheme(theme);
    },
    [api, storageKey]
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const theme = themes.find(t => t.id === e.newValue);
        if (theme) {
          applyTheme(theme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [themes, storageKey, applyTheme]);

  if (themes.length < 2 || !currentTheme) {
    return null;
  }

  return (
    <ThemeSwitcher
      themes={themes}
      currentTheme={currentTheme}
      onThemeChange={applyTheme}
    />
  );
};

const options = getWindowOptions();
if (options && options.themes && options.themes.length >= 2) {
  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const initialTheme = getInitialTheme(options.themes, storageKey, options.defaultTheme);

  applyManagerTheme(initialTheme);
  // The preview is applied by observePreviewIframe, which waits for the iframe
  // to exist and re-applies on every load instead of guessing a delay.
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
