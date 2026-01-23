import { addons } from 'storybook/manager-api';
import type { Theme } from '../types';

export const applyManagerTheme = (theme: Theme): void => {
  addons.setConfig({
    theme: theme.storybookTheme as any
  });

  const isDark = theme.storybookTheme.base === 'dark';
  document.body.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.setAttribute('data-theme', theme.class);
};

export const applyPreviewTheme = (themeClass: string, storageKey: string = 'sb-theme-switcher'): void => {
  localStorage.setItem(`${storageKey}-class`, themeClass);
  
  const previewIframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;
  if (previewIframe?.contentWindow) {
    const previewDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
    if (previewDoc) {
      previewDoc.documentElement.setAttribute('data-theme', themeClass);
    }
    
    previewIframe.contentWindow.postMessage({
      type: 'sb-theme-switcher:theme-change',
      themeClass
    }, '*');
  }
};

export const getInitialTheme = (themes: Theme[], storageKey: string, defaultThemeId?: string): Theme => {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const theme = themes.find(t => t.id === saved);
    if (theme) return theme;
  }

  if (defaultThemeId) {
    const theme = themes.find(t => t.id === defaultThemeId);
    if (theme) return theme;
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const darkTheme = themes.find(t => t.storybookTheme.base === 'dark');
  const lightTheme = themes.find(t => t.storybookTheme.base === 'light');

  return (prefersDark && darkTheme) ? darkTheme : (lightTheme || themes[0]);
};

export const observePreviewIframe = (storageKey: string, themes: Theme[]): void => {
  let lastIframe: HTMLIFrameElement | null = null;

  const applyThemeToIframe = (iframe: HTMLIFrameElement) => {
    const savedThemeId = localStorage.getItem(storageKey);
    const theme = savedThemeId ? themes.find(t => t.id === savedThemeId) : null;
    
    if (!theme) return;

    const checkTheme = () => {
      const previewDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (previewDoc?.documentElement) {
        const currentTheme = previewDoc.documentElement.getAttribute('data-theme');
        if (currentTheme !== theme.class) {
          applyPreviewTheme(theme.class);
        }
      }
    };

    checkTheme();
    iframe.addEventListener('load', checkTheme);
  };

  const observer = new MutationObserver(() => {
    const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;
    if (iframe && iframe !== lastIframe) {
      lastIframe = iframe;
      applyThemeToIframe(iframe);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const initialIframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;
  if (initialIframe) {
    lastIframe = initialIframe;
    applyThemeToIframe(initialIframe);
  }
};
