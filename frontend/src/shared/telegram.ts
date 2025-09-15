// Р‘РµР·РѕРїР°СЃРЅС‹Р№ РґРѕСЃС‚СѓРї Рє Telegram WebApp API

export function getTelegramWebApp() {
  return (window as any).Telegram?.WebApp;
}

export function expandWebApp() {
  const tg = getTelegramWebApp();
  tg?.expand?.();
}

export function onViewportChange(handler: (height: number) => void) {
  const tg = getTelegramWebApp();
  if (!tg?.onEvent) return () => {};
  
  tg.onEvent("viewportChanged", handler);
  
  // Р’РѕР·РІСЂР°С‰Р°РµРј С„СѓРЅРєС†РёСЋ РѕС‡РёСЃС‚РєРё
  return () => {
    // Telegram WebApp РЅРµ РїСЂРµРґРѕСЃС‚Р°РІР»СЏРµС‚ СЃРїРѕСЃРѕР± РѕС‚РїРёСЃР°С‚СЊСЃСЏ РѕС‚ СЃРѕР±С‹С‚РёР№
    // РџРѕСЌС‚РѕРјСѓ РїСЂРѕСЃС‚Рѕ РёРіРЅРѕСЂРёСЂСѓРµРј РѕС€РёР±РєРё
  };
}

export function getTelegramTheme() {
  const tg = getTelegramWebApp();
  return tg?.colorScheme === 'light' ? 'light' : 'dark';
}

export function initTelegramWebApp() {
  const tg = getTelegramWebApp();
  if (!tg) {
    console.warn('Telegram WebApp not available, running in browser mode');
    return;
  }
  
  try {
    tg.ready();
    tg.expand();
  } catch (error) {
    console.warn('Failed to initialize Telegram WebApp:', error);
  }
}
