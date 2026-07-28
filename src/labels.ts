import type { ThemeSwitcherLabels } from './types';

export const DEFAULT_LABELS: Required<ThemeSwitcherLabels> = {
  switchTheme: 'Switch theme',
  selectTheme: 'Select theme',
  switchToTheme: 'Switch to {theme}'
};

export const resolveLabels = (labels?: ThemeSwitcherLabels): Required<ThemeSwitcherLabels> => ({
  ...DEFAULT_LABELS,
  ...labels
});

export const formatSwitchTo = (template: string, themeTitle: string): string =>
  template.split('{theme}').join(themeTitle);
