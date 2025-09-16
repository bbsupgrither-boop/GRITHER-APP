import { useState, useEffect } from 'react';

interface UseThemeToggleReturn {
  themeToggleCount: number;
  resetThemeToggleCount: () => void;
  incrementThemeToggleCount: () => void;
}

export const useThemeToggle = (): UseThemeToggleReturn => {
  const [themeToggleCount, setThemeToggleCount] = useState(0);

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В¶Р В Р’В°Р В Р’ВµР В РЎВ Р РЋР С“Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќ Р В РЎвЂР В Р’В· localStorage Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р В РЎвЂР В Р’В°Р В Р’В»Р В РЎвЂР В Р’В·Р В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ
  useEffect(() => {
    const savedCount = localStorage.getItem('themeToggleCount');
    if (savedCount) {
      const count = parseInt(savedCount, 10);
      console.log(`РЎР‚РЎСџРІР‚СљР вЂ° Loaded theme toggle count from localStorage: ${count}`);
      setThemeToggleCount(count);
    } else {
      console.log('РЎР‚РЎСџРІР‚СљР вЂ° No saved theme toggle count, starting from 0');
      setThemeToggleCount(0);
    }
  }, []);

  // Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р РЋР РЏР В Р’ВµР В РЎВ Р РЋР С“Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќ Р В Р вЂ  localStorage Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂР В Р’В·Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РЎвЂ
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
