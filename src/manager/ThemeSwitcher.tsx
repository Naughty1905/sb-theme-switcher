import React, { useState, useCallback, useRef, useEffect } from 'react';
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
 * Toggle button for 2 themes
 */
const ThemeToggle: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, storageKey, onThemeChange }) => {
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

  // Custom icon or default
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
      style={{
        background: 'transparent',
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
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        opacity: 1
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.opacity = '1';
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'scale(0.9)';
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <IconComponent />
    </button>
  );
};

/**
 * Dropdown for 3+ themes
 */
const ThemeDropdown: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, storageKey, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeSelect = useCallback((theme: Theme) => {
    localStorage.setItem(storageKey, theme.id);
    applyManagerTheme(theme);
    applyPreviewTheme(theme.class, storageKey);
    onThemeChange(theme);
    setIsOpen(false);
  }, [storageKey, onThemeChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const isDark = currentTheme.storybookTheme.base === 'dark';

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        title="Выбрать тему"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать тему"
        aria-expanded={isOpen}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          color: 'inherit',
          outline: 'none',
          borderRadius: '4px',
          transition: 'background 0.2s ease',
          height: '28px',
          minWidth: '28px',
          fontSize: '12px',
          fontWeight: 500
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        {currentTheme.color && (
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentTheme.color,
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          />
        )}
        <span>{currentTheme.title}</span>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
          <path d="M4 5L1 2h6L4 5z" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '4px',
            background: isDark ? '#2e3438' : '#ffffff',
            border: `1px solid ${isDark ? '#4a5159' : '#e0e0e0'}`,
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            minWidth: '150px',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: 'none',
                background: theme.id === currentTheme.id 
                  ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)')
                  : 'transparent',
                color: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                textAlign: 'left',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={e => {
                if (theme.id !== currentTheme.id) {
                  e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
                }
              }}
              onMouseLeave={e => {
                if (theme.id !== currentTheme.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {theme.color && (
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: theme.color,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    flexShrink: 0
                  }}
                />
              )}
              <span>{theme.title}</span>
              {theme.id === currentTheme.id && (
                <span style={{ marginLeft: 'auto', fontSize: '16px' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main theme switcher component - automatically chooses toggle or dropdown
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
  const { themes } = props;

  if (themes.length === 2) {
    return <ThemeToggle {...props} />;
  }

  return <ThemeDropdown {...props} />;
};
