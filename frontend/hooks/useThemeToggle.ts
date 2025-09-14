import { useState, useEffect } from 'react';

interface UseThemeToggleReturn {
  themeToggleCount: number;
  resetThemeToggleCount: () => void;
  incrementThemeToggleCount: () => void;
}

export const useThemeToggle = (): UseThemeToggleReturn => {
  const [themeToggleCount, setThemeToggleCount] = useState(0);

  // Загружаем счетчик из localStorage при инициализации
  useEffect(() => {
    const savedCount = localStorage.getItem('themeToggleCount');
    if (savedCount) {
      setThemeToggleCount(parseInt(savedCount, 10));
    }
  }, []);

  // Сохраняем счетчик в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('themeToggleCount', themeToggleCount.toString());
  }, [themeToggleCount]);

  const incrementThemeToggleCount = () => {
    setThemeToggleCount(prev => prev + 1);
  };

  const resetThemeToggleCount = () => {
    setThemeToggleCount(0);
    localStorage.removeItem('themeToggleCount');
  };

  return {
    themeToggleCount,
    resetThemeToggleCount,
    incrementThemeToggleCount
  };
};
