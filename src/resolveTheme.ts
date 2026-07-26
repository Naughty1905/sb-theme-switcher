import type { Theme } from './types';

export interface ResolveThemeInput {
  savedId: string | null;
  savedClass: string | null;
  themes: Theme[];
  defaultThemeId?: string;
  prefersDark: boolean;
}

/**
 * Single source of truth for "which theme should be active on load",
 * shared by the manager and the preview iframe.
 *
 * Saved values are always validated against the configured themes so a
 * renamed class or a deleted theme id cannot pin the UI to a dead value.
 */
export const resolveTheme = ({
  savedId,
  savedClass,
  themes,
  defaultThemeId,
  prefersDark
}: ResolveThemeInput): Theme | null => {
  if (themes.length === 0) {
    return null;
  }

  const byId = savedId ? themes.find(t => t.id === savedId) : undefined;
  if (byId) return byId;

  const byClass = savedClass ? themes.find(t => t.class === savedClass) : undefined;
  if (byClass) return byClass;

  const byDefault = defaultThemeId ? themes.find(t => t.id === defaultThemeId) : undefined;
  if (byDefault) return byDefault;

  const byPreference = themes.find(t => t.storybookTheme?.base === (prefersDark ? 'dark' : 'light'));
  if (byPreference) return byPreference;

  return themes[0];
};
