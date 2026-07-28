import { addons } from 'storybook/manager-api';
import { resolveTheme } from '../resolveTheme';
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

export const applyPreviewTheme = (themeClass: string, storageKey: string): void => {
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
  const theme = resolveTheme({
    savedId: localStorage.getItem(storageKey),
    savedClass: localStorage.getItem(`${storageKey}-class`),
    themes,
    defaultThemeId,
    prefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches
  });

  // Callers only invoke this with a non-empty themes array.
  return theme ?? themes[0];
};

export const observePreviewIframe = (storageKey: string, themes: Theme[], defaultThemeId?: string): void => {
  let lastIframe: HTMLIFrameElement | null = null;

  const applyThemeToIframe = (iframe: HTMLIFrameElement) => {
    // Resolved inside checkTheme (not once per iframe) so a later 'load' event
    // on the same long-lived iframe re-reads localStorage instead of replaying
    // whatever theme was current when the listener was first attached.
    const checkTheme = () => {
      const theme = resolveTheme({
        savedId: localStorage.getItem(storageKey),
        savedClass: localStorage.getItem(`${storageKey}-class`),
        themes,
        defaultThemeId,
        prefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches
      });
      if (!theme) return;

      const previewDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (previewDoc?.documentElement) {
        const currentTheme = previewDoc.documentElement.getAttribute('data-theme');
        if (currentTheme !== theme.class) {
          applyPreviewTheme(theme.class, storageKey);
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
