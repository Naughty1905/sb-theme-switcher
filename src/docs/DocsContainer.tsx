import React, { FC, PropsWithChildren, useMemo } from 'react';
import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs/blocks';
import { useTheme } from './useTheme';
import { getWindowOptions } from '../options';
import type { Theme, StorybookTheme } from '../types';

interface DocsContainerProps extends PropsWithChildren {
  /** Overrides themes from addon options (window.__SB_THEME_SWITCHER_OPTIONS__) */
  themes?: Theme[];
  context?: any;
  [key: string]: any;
}

export const DocsContainer: FC<DocsContainerProps> = ({ children, themes, ...props }) => {
  const currentThemeClass = useTheme();

  const resolvedThemes = themes ?? getWindowOptions()?.themes;

  const theme: StorybookTheme = useMemo(() => {
    if (!resolvedThemes || resolvedThemes.length === 0) {
      const isDark = currentThemeClass.includes('dark');
      return { base: isDark ? 'dark' : 'light' } as StorybookTheme;
    }

    const matchedTheme = resolvedThemes.find(t => t.class === currentThemeClass);
    return matchedTheme?.storybookTheme || resolvedThemes[0].storybookTheme;
  }, [currentThemeClass, resolvedThemes]);

  return (
    <BaseDocsContainer {...(props as any)} theme={theme as any}>
      {children}
    </BaseDocsContainer>
  );
};
