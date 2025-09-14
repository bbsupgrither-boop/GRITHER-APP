import { useState, useEffect } from 'react';
import { useThemeToggle } from './useThemeToggle';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark'); // По умолчанию темная тема
  const { themeToggleCount, incrementThemeToggleCount, resetThemeToggleCount } = useThemeToggle();

  // Применение темы к DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Инициализация темы из localStorage или системных настроек
  useEffect(() => {
    // Проверяем localStorage
    const savedTheme = localStorage.getItem('grither-theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
      return;
    }

    // Проверяем системную тему
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }

    // Проверяем Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramTheme = window.Telegram.WebApp.colorScheme === 'light' ? 'light' : 'dark';
      setTheme(telegramTheme);
    }
  }, []);

  // Функция переключения темы
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('grither-theme', newTheme);
    
    // Увеличиваем счетчик переключений только при включении (light -> dark)
    if (newTheme === 'dark') {
      incrementThemeToggleCount();
    }
  };

  // Функция установки конкретной темы
  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('grither-theme', newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    themeToggleCount,
    resetThemeToggleCount
  };
};
