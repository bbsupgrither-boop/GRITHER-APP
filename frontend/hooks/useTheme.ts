import { useState, useEffect } from 'react';
import { useThemeToggle } from './useThemeToggle';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark'); // РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ С‚РµРјРЅР°СЏ С‚РµРјР°
  const { themeToggleCount, incrementThemeToggleCount, resetThemeToggleCount } = useThemeToggle();

  // РџСЂРёРјРµРЅРµРЅРёРµ С‚РµРјС‹ Рє DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ С‚РµРјС‹ РёР· localStorage РёР»Рё СЃРёСЃС‚РµРјРЅС‹С… РЅР°СЃС‚СЂРѕРµРє
  useEffect(() => {
    // РџСЂРѕРІРµСЂСЏРµРј localStorage
    const savedTheme = localStorage.getItem('grither-theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
      return;
    }

    // РџСЂРѕРІРµСЂСЏРµРј СЃРёСЃС‚РµРјРЅСѓСЋ С‚РµРјСѓ
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }

    // РџСЂРѕРІРµСЂСЏРµРј Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramTheme = window.Telegram.WebApp.colorScheme === 'light' ? 'light' : 'dark';
      setTheme(telegramTheme);
    }
  }, []);

  // Р¤СѓРЅРєС†РёСЏ РїРµСЂРµРєР»СЋС‡РµРЅРёСЏ С‚РµРјС‹
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(`рџЊ— Theme toggle: ${theme} в†’ ${newTheme}`);
    setTheme(newTheme);
    localStorage.setItem('grither-theme', newTheme);
    
    // РЈРІРµР»РёС‡РёРІР°РµРј СЃС‡РµС‚С‡РёРє РїРµСЂРµРєР»СЋС‡РµРЅРёР№ С‚РѕР»СЊРєРѕ РїСЂРё РІРєР»СЋС‡РµРЅРёРё (light -> dark)
    if (newTheme === 'dark') {
      console.log(`рџ”ў Incrementing theme toggle count: ${themeToggleCount} в†’ ${themeToggleCount + 1}`);
      incrementThemeToggleCount();
    }
  };

  // Р¤СѓРЅРєС†РёСЏ СѓСЃС‚Р°РЅРѕРІРєРё РєРѕРЅРєСЂРµС‚РЅРѕР№ С‚РµРјС‹
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
