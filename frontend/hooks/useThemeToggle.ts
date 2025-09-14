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
      const count = parseInt(savedCount, 10);
      console.log(`📊 Loaded theme toggle count from localStorage: ${count}`);
      setThemeToggleCount(count);
    } else {
      console.log('📊 No saved theme toggle count, starting from 0');
      setThemeToggleCount(0);
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
