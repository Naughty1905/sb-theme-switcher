import { useLayoutEffect, useState } from 'react';

/**
 * Reads the current theme class from the data-theme attribute,
 * reactively via MutationObserver
 */
export const useTheme = (): string => {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.dataset.theme ?? 'light-theme';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;

    setTheme(root.dataset.theme ?? 'light-theme');

    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme ?? 'light-theme');
    });

    observer.observe(root, { attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return theme;
};
