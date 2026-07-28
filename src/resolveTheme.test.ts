import { describe, it, expect } from 'vitest';
import { resolveTheme, isThemeClassAllowed } from './resolveTheme';
import type { Theme } from './types';

const light: Theme = { id: 'light', title: 'Light', class: 'light-theme', storybookTheme: { base: 'light' } };
const dark: Theme = { id: 'dark', title: 'Dark', class: 'dark-theme', storybookTheme: { base: 'dark' } };
const themes = [light, dark];

describe('resolveTheme', () => {
  it('prefers a saved id that matches a configured theme', () => {
    const result = resolveTheme({ savedId: 'dark', savedClass: null, themes, prefersDark: false });
    expect(result).toEqual(dark);
  });

  it('ignores a stale saved class when the saved id is valid', () => {
    const result = resolveTheme({ savedId: 'dark', savedClass: 'old-renamed-theme', themes, prefersDark: false });
    expect(result).toEqual(dark);
  });

  it('falls back to the default theme when the saved id no longer exists', () => {
    const result = resolveTheme({
      savedId: 'deleted',
      savedClass: null,
      themes,
      defaultThemeId: 'light',
      prefersDark: true
    });
    expect(result).toEqual(light);
  });

  it('resolves a saved class when no id is saved', () => {
    const result = resolveTheme({ savedId: null, savedClass: 'dark-theme', themes, prefersDark: false });
    expect(result).toEqual(dark);
  });

  it('ignores an unknown saved class', () => {
    const result = resolveTheme({ savedId: null, savedClass: 'nope-theme', themes, prefersDark: true });
    expect(result).toEqual(dark);
  });

  it('uses the system preference when nothing is saved', () => {
    expect(resolveTheme({ savedId: null, savedClass: null, themes, prefersDark: true })).toEqual(dark);
    expect(resolveTheme({ savedId: null, savedClass: null, themes, prefersDark: false })).toEqual(light);
  });

  it('falls back to the first theme when no base matches the system preference', () => {
    const onlyLight = [light, { ...light, id: 'light2', class: 'light2-theme' }];
    expect(resolveTheme({ savedId: null, savedClass: null, themes: onlyLight, prefersDark: true })).toEqual(light);
  });

  it('returns null when no themes are configured', () => {
    expect(resolveTheme({ savedId: 'dark', savedClass: 'dark-theme', themes: [], prefersDark: false })).toBeNull();
  });
});

describe('isThemeClassAllowed', () => {
  it('accepts a class that belongs to a configured theme', () => {
    expect(isThemeClassAllowed('dark-theme', themes)).toBe(true);
  });

  it('rejects a class no configured theme declares', () => {
    expect(isThemeClassAllowed('removed-theme', themes)).toBe(false);
  });

  it('trusts any class when no themes are configured', () => {
    expect(isThemeClassAllowed('anything-theme', [])).toBe(true);
  });
});
