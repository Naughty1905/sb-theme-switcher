import React, { FC, PropsWithChildren, useMemo } from 'react';
import { useTheme } from './useTheme';
import type { Theme, StorybookTheme } from '../types';

interface DocsContainerProps extends PropsWithChildren {
  themes?: Theme[];
  context?: any;
  [key: string]: any;
}

/**
 * Wrapper for Storybook DocsContainer that applies theme based on data-theme attribute
 * Users should pass their themes configuration to this component
 * 
 * Usage in .storybook/preview.tsx:
 * import { DocsContainer } from 'sb-theme-switcher';
 * 
 * export const parameters = {
 *   docs: {
 *     container: (props) => <DocsContainer {...props} themes={yourThemes} />
 *   }
 * };
 */
export const DocsContainer: FC<DocsContainerProps> = ({ children, themes, ...props }) => {
  const currentThemeClass = useTheme();
  
  // Find matching theme based on class
  const theme: StorybookTheme = useMemo(() => {
    if (!themes || themes.length === 0) {
      // Fallback: determine theme based on class name
      const isDark = currentThemeClass.includes('dark');
      return { base: isDark ? 'dark' : 'light' } as StorybookTheme;
    }
    
    const matchedTheme = themes.find(t => t.class === currentThemeClass);
    return matchedTheme?.storybookTheme || themes[0].storybookTheme;
  }, [currentThemeClass, themes]);

  // Dynamically import and use DocsContainer from Storybook
  // This avoids build-time dependency issues
  const DocsContainerComponent = useMemo(() => {
    try {
      // Try to import from storybook/internal/blocks (Storybook 8+)
      const blocks = require('storybook/internal/blocks');
      return blocks.DocsContainer;
    } catch {
      try {
        // Fallback to @storybook/blocks (Storybook 7)
        const blocks = require('@storybook/blocks');
        return blocks.DocsContainer;
      } catch {
        // If no DocsContainer available, return a simple wrapper
        return ({ children: c }: any) => <div data-theme={currentThemeClass}>{c}</div>;
      }
    }
  }, [currentThemeClass]);

  return (
    <DocsContainerComponent {...props} theme={theme}>
      {children}
    </DocsContainerComponent>
  );
};
