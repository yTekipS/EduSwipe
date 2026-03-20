import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      const savedIsDark = savedTheme === 'dark';
      setIsDarkMode(savedIsDark);
      applyTheme(savedIsDark);
      return;
    }

    const prefersDark = mediaQuery.matches;
    setIsDarkMode(prefersDark);
    applyTheme(prefersDark);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      applyTheme(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      applyTheme(next);
      return next;
    });
  };

  return { isDarkMode, toggleDarkMode };
};
