import React, { FC, PropsWithChildren, useMemo } from 'react';
import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs/blocks';
import { useTheme } from '../useTheme';
import { getWindowOptions } from '../options';
import { fallbackLightTheme, fallbackDarkTheme } from './fallbackThemes';
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
      // eslint-disable-next-line no-console
      console.warn(
        '[sb-theme-switcher] No themes in the preview iframe: pass the `themes` option to the addon in main.js (or the `themes` prop to DocsContainer). Falling back to the default Storybook theme.'
      );
      const isDark = currentThemeClass.includes('dark');
      return isDark ? fallbackDarkTheme : fallbackLightTheme;
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
