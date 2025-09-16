// Утилиты для определения мобильных устройств и адаптации интерфейса

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  );
}

export function getScreenSize(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function isTelegramWebApp(): boolean {
  if (typeof window === 'undefined') return false;
  
  return !!(window as any).Telegram?.WebApp;
}

export function getTelegramPlatform(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const webApp = (window as any).Telegram?.WebApp;
  return webApp?.platform || 'unknown';
}

export function shouldUseMobileLayout(): boolean {
  return isMobileDevice() || isTelegramWebApp() || getScreenSize() === 'mobile';
}

// Хук для отслеживания изменений размера экрана
export function useScreenSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, isMobile: false };
  }
  
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: shouldUseMobileLayout()
  });
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: shouldUseMobileLayout()
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screenSize;
}

// Импорт React хуков
import { useState, useEffect } from 'react';
