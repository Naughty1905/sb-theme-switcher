import React, { useState, useCallback } from 'react';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import { resolveLabels, formatSwitchTo } from '../labels';
import type { Theme, ThemeSwitcherLabels } from '../types';
import { SunIcon, MoonIcon } from './icons';

interface ThemeSwitcherProps {
  themes: Theme[];
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  labels?: ThemeSwitcherLabels;
}

/**
 * Toggle button for 2 themes; a native button is used instead of IconButton
 * to avoid its border
 */
const ThemeToggle: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, onThemeChange, labels }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const currentIndex = themes.findIndex(t => t.id === currentTheme.id);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const handleToggle = useCallback(() => {
    onThemeChange(nextTheme);
  }, [nextTheme, onThemeChange]);

  const resolved = resolveLabels(labels);
  const toggleLabel = formatSwitchTo(resolved.switchToTheme, nextTheme.title);

  const isDark = currentTheme.storybookTheme.base === 'dark';

  const IconComponent = currentTheme.icon
    ? (typeof currentTheme.icon === 'string'
        ? () => <span dangerouslySetInnerHTML={{ __html: currentTheme.icon as string }} />
        : currentTheme.icon as React.ComponentType)
    : (isDark ? SunIcon : MoonIcon);

  return (
    <button
      key="theme-toggle"
      title={resolved.switchTheme}
      onClick={handleToggle}
      aria-label={toggleLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        background: isHovered ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
        outline: isFocused ? '2px solid currentColor' : 'none',
        outlineOffset: '2px',
        borderRadius: '4px',
        transition: 'background 0.2s ease, transform 0.1s ease, opacity 0.2s ease',
        height: '28px',
        minWidth: '28px',
        opacity: isHovered ? 0.8 : 1,
        transform: isPressed ? 'scale(0.9)' : 'scale(1)',
        WebkitAppearance: 'none' as const,
        MozAppearance: 'none' as const,
      }}
    >
      <IconComponent />
    </button>
  );
};

/**
 * Dropdown for 3+ themes using Storybook's built-in components
 */
const ThemeDropdown: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, onThemeChange, labels }) => {
  const resolved = resolveLabels(labels);
  const links = themes.map(theme => ({
    id: theme.id,
    title: theme.title,
    active: theme.id === currentTheme.id,
    onClick: () => onThemeChange(theme),
    left: theme.color ? (
      <span
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: theme.color,
          border: theme.storybookTheme.base === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.3)'
            : '1px solid rgba(0, 0, 0, 0.2)',
          display: 'inline-block',
        }}
      />
    ) : undefined,
    right: theme.id === currentTheme.id ? <span style={{ marginLeft: '8px' }}>✓</span> : undefined
  }));

  return (
    <WithTooltip
      placement="bottom"
      trigger="click"
      closeOnOutsideClick
      tooltip={<TooltipLinkList links={links} />}
    >
      <IconButton
        key="theme-dropdown"
        title={resolved.selectTheme}
        aria-label={resolved.selectTheme}
      >
        {currentTheme.color && (
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentTheme.color,
              border: currentTheme.storybookTheme.base === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.4)'
                : '1px solid rgba(0, 0, 0, 0.2)',
              display: 'inline-block',
              marginRight: '4px'
            }}
          />
        )}
        {currentTheme.title}
      </IconButton>
    </WithTooltip>
  );
};

/**
 * Main theme switcher component - automatically chooses toggle or dropdown
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
  const { themes } = props;

  if (themes.length <= 2) {
    return <ThemeToggle {...props} />;
  }

  return <ThemeDropdown {...props} />;
};
