import { useState, useEffect } from 'react';

interface UseThemeToggleReturn {
  themeToggleCount: number;
  resetThemeToggleCount: () => void;
  incrementThemeToggleCount: () => void;
}

export const useThemeToggle = (): UseThemeToggleReturn => {
  const [themeToggleCount, setThemeToggleCount] = useState(0);

  // Р—Р°РіСЂСѓР¶Р°РµРј СЃС‡РµС‚С‡РёРє РёР· localStorage РїСЂРё РёРЅРёС†РёР°Р»РёР·Р°С†РёРё
  useEffect(() => {
    const savedCount = localStorage.getItem('themeToggleCount');
    if (savedCount) {
      const count = parseInt(savedCount, 10);
      console.log(`рџ“Љ Loaded theme toggle count from localStorage: ${count}`);
      setThemeToggleCount(count);
    } else {
      console.log('рџ“Љ No saved theme toggle count, starting from 0');
      setThemeToggleCount(0);
    }
  }, []);

  // РЎРѕС…СЂР°РЅСЏРµРј СЃС‡РµС‚С‡РёРє РІ localStorage РїСЂРё РёР·РјРµРЅРµРЅРёРё
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
