import { useLayoutEffect, useState } from 'react';

/**
 * Hook to read and observe theme changes from data-theme attribute
 * Uses lazy initialization and MutationObserver for reactivity
 */
export const useTheme = (): string => {
  const [theme, setTheme] = useState(() => {
    // Lazy initialization from DOM
    return document.documentElement.dataset.theme ?? 'light-theme';
  });

  useLayoutEffect(() => {
    const root = document.documentElement;
    
    // Sync initial state
    setTheme(root.dataset.theme ?? 'light-theme');
    
    // Observe changes to data-theme attribute
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme ?? 'light-theme');
    });
    
    observer.observe(root, { attributeFilter: ['data-theme'] });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);

  return theme;
};
