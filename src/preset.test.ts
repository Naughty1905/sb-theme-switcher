import { describe, it, expect } from 'vitest';
import { serializeOptions } from './preset';

const themes = [
  { id: 'light', title: 'Light', class: 'light-theme', storybookTheme: { base: 'light' } },
  { id: 'dark', title: 'Dark', class: 'dark-theme', storybookTheme: { base: 'dark' } }
];

describe('serializeOptions', () => {
  it('returns null when fewer than two themes are configured', () => {
    expect(serializeOptions({ themes: [themes[0]] })).toBeNull();
    expect(serializeOptions({ themes: [] })).toBeNull();
    expect(serializeOptions({})).toBeNull();
  });

  it('serializes themes, defaultTheme and storageKey', () => {
    const result = serializeOptions({ themes, defaultTheme: 'dark', storageKey: 'my-key' });
    expect(JSON.parse(result as string)).toEqual({ themes, defaultTheme: 'dark', storageKey: 'my-key' });
  });

  it('keeps string icons', () => {
    const withIcon = [{ ...themes[0], icon: '<svg />' }, themes[1]];
    const result = JSON.parse(serializeOptions({ themes: withIcon }) as string);
    expect(result.themes[0].icon).toBe('<svg />');
  });

  it('strips non-serializable component icons', () => {
    const withComponent = [{ ...themes[0], icon: () => null }, themes[1]];
    const result = JSON.parse(serializeOptions({ themes: withComponent }) as string);
    expect(result.themes[0]).not.toHaveProperty('icon');
  });

  it('escapes < so the payload cannot close the script tag', () => {
    const hostile = [{ ...themes[0], title: '</script><script>alert(1)</script>' }, themes[1]];
    const result = serializeOptions({ themes: hostile }) as string;
    expect(result).not.toContain('</script>');
    expect(result).toContain('\\u003c');
  });
});
