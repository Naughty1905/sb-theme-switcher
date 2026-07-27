import { describe, it, expect } from 'vitest';
import { resolveLabels, formatSwitchTo, DEFAULT_LABELS } from './labels';

describe('resolveLabels', () => {
  it('returns English defaults when nothing is configured', () => {
    expect(resolveLabels()).toEqual(DEFAULT_LABELS);
    expect(resolveLabels({})).toEqual(DEFAULT_LABELS);
  });

  it('overrides only the provided keys', () => {
    const result = resolveLabels({ switchTheme: 'Переключить тему' });
    expect(result.switchTheme).toBe('Переключить тему');
    expect(result.selectTheme).toBe(DEFAULT_LABELS.selectTheme);
  });
});

describe('formatSwitchTo', () => {
  it('substitutes the theme title', () => {
    expect(formatSwitchTo('Switch to {theme}', 'Dark')).toBe('Switch to Dark');
  });

  it('substitutes every occurrence', () => {
    expect(formatSwitchTo('{theme} → {theme}', 'Blue')).toBe('Blue → Blue');
  });

  it('leaves a template without the placeholder untouched', () => {
    expect(formatSwitchTo('Переключить тему', 'Dark')).toBe('Переключить тему');
  });
});
