import React, { useState, useEffect } from 'react';
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, TOOL_ID, PARAM_KEY, DEFAULT_STORAGE_KEY } from '../constants';
import type { ThemeSwitcherOptions, Theme } from '../types';
import { ThemeSwitcher } from './ThemeSwitcher';
import { getInitialTheme, applyManagerTheme, applyPreviewTheme, observePreviewIframe } from './utils';

// Get addon options from Storybook config
const getAddonOptions = (): ThemeSwitcherOptions | null => {
  try {
    const config = addons.getConfig();
    return (config as any)?.[PARAM_KEY] || null;
  } catch {
    return null;
  }
};

// Initialize theme on load
const initializeTheme = (options: ThemeSwitcherOptions | null) => {
  if (!options || !options.themes || options.themes.length < 2) {
    console.warn('[sb-theme-switcher] Invalid configuration. At least 2 themes are required.');
    return;
  }

  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const initialTheme = getInitialTheme(options.themes, storageKey, options.defaultTheme);
  
  applyManagerTheme(initialTheme);
  
  // Apply to preview with a delay to ensure iframe is loaded
  setTimeout(() => applyPreviewTheme(initialTheme.class, storageKey), 1000);
  
  // Observe iframe changes
  observePreviewIframe(storageKey, options.themes);
};

// Toolbar component wrapper
const ThemeSwitcherTool = () => {
  const options = getAddonOptions();
  
  if (!options || !options.themes || options.themes.length < 2) {
    return null;
  }

  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => 
    getInitialTheme(options.themes, storageKey, options.defaultTheme)
  );

  // Sync with localStorage changes (for multi-tab support)
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

// Register addon
addons.register(ADDON_ID, () => {
  const options = getAddonOptions();
  
  // Initialize theme
  initializeTheme(options);

  // Add toolbar button
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Переключить тему',
    match: () => true,
    render: () => <ThemeSwitcherTool />
  });
});
