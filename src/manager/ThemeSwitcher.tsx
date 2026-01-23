import React, { useState, useCallback } from 'react';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import type { Theme } from '../types';
import { applyManagerTheme, applyPreviewTheme } from './utils';
import { SunIcon, MoonIcon } from './icons';

interface ThemeSwitcherProps {
  themes: Theme[];
  currentTheme: Theme;
  storageKey: string;
  onThemeChange: (theme: Theme) => void;
}

/**
 * Toggle button for 2 themes using native button (no border, like ds-2.0)
 */
const ThemeToggle: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, storageKey, onThemeChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleToggle = useCallback(() => {
    const currentIndex = themes.findIndex(t => t.id === currentTheme.id);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    localStorage.setItem(storageKey, nextTheme.id);
    applyManagerTheme(nextTheme);
    applyPreviewTheme(nextTheme.class, storageKey);
    onThemeChange(nextTheme);
  }, [themes, currentTheme, storageKey, onThemeChange]);

  const isDark = currentTheme.storybookTheme.base === 'dark';
  const toggleLabel = `Переключить на ${isDark ? 'светлую' : 'темную'} тему`;

  const IconComponent = currentTheme.icon 
    ? (typeof currentTheme.icon === 'string' 
        ? () => <span dangerouslySetInnerHTML={{ __html: currentTheme.icon as string }} />
        : currentTheme.icon as React.ComponentType)
    : (isDark ? SunIcon : MoonIcon);

  return (
    <button
      key="theme-toggle"
      title={toggleLabel}
      onClick={handleToggle}
      aria-label={toggleLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        background: isHovered ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
        outline: 'none',
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
const ThemeDropdown: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, storageKey, onThemeChange }) => {
  const handleThemeSelect = useCallback((theme: Theme) => {
    localStorage.setItem(storageKey, theme.id);
    applyManagerTheme(theme);
    applyPreviewTheme(theme.class, storageKey);
    onThemeChange(theme);
  }, [storageKey, onThemeChange]);

  const links = themes.map(theme => ({
    id: theme.id,
    title: theme.title,
    active: theme.id === currentTheme.id,
    onClick: () => handleThemeSelect(theme),
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
        title="Выбрать тему"
        aria-label="Выбрать тему"
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
  const [, forceUpdate] = useState({});

  React.useEffect(() => {
    forceUpdate({});
  }, [themes.length]);

  if (themes.length <= 2) {
    return <ThemeToggle {...props} />;
  }

  return <ThemeDropdown {...props} />;
};
