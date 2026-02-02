import React, { FC, PropsWithChildren, useMemo } from 'react';
import { useTheme } from './useTheme';
import type { Theme, StorybookTheme } from '../types';

interface DocsContainerProps extends PropsWithChildren {
  themes?: Theme[];
  context?: any;
  [key: string]: any;
}

export const DocsContainer: FC<DocsContainerProps> = ({ children, themes, ...props }) => {
  const currentThemeClass = useTheme();
  
  const theme: StorybookTheme = useMemo(() => {
    if (!themes || themes.length === 0) {
      const isDark = currentThemeClass.includes('dark');
      return { base: isDark ? 'dark' : 'light' } as StorybookTheme;
    }
    
    const matchedTheme = themes.find(t => t.class === currentThemeClass);
    return matchedTheme?.storybookTheme || themes[0].storybookTheme;
  }, [currentThemeClass, themes]);

  const DocsContainerComponent = useMemo(() => {
    try {
      const { DocsContainer } = require('@storybook/addon-docs');
      return DocsContainer;
    } catch {
      try {
        const blocks = require('storybook/internal/blocks');
        return blocks.DocsContainer;
      } catch {
        try {
          const blocks = require('@storybook/blocks');
          return blocks.DocsContainer;
        } catch {
          return ({ children: c }: any) => <div data-theme={currentThemeClass}>{c}</div>;
        }
      }
    }
  }, [currentThemeClass]);

  return (
    <DocsContainerComponent {...props} theme={theme}>
      {children}
    </DocsContainerComponent>
  );
};
