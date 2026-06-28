import { useLayoutEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'binerin-theme';
const supportedThemes = ['dark', 'light'];

function readStoredTheme() {
  if (typeof window === 'undefined') return 'dark';

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return supportedThemes.includes(storedTheme) ? storedTheme : 'dark';
  } catch {
    return 'dark';
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme still works for the current session if storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    isLightMode: theme === 'light',
    toggleTheme,
  };
}
