// Р В РІР‚ВР В Р’ВµР В Р’В·Р В РЎвЂўР В РЎвЂ”Р В Р’В°Р РЋР С“Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ” Р В РЎвЂќ Telegram WebApp API

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
  
  // Р В РІР‚в„ўР В РЎвЂўР В Р’В·Р В Р вЂ Р РЋР вЂљР В Р’В°Р РЋРІР‚В°Р В Р’В°Р В Р’ВµР В РЎВ Р РЋРІР‚С›Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР вЂ№ Р В РЎвЂўР РЋРІР‚РЋР В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂќР В РЎвЂ
  return () => {
    // Telegram WebApp Р В Р вЂ¦Р В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В Р’ВµР В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В Р’В»Р РЋР РЏР В Р’ВµР РЋРІР‚С™ Р РЋР С“Р В РЎвЂ”Р В РЎвЂўР РЋР С“Р В РЎвЂўР В Р’В± Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰Р РЋР С“Р РЋР РЏ Р В РЎвЂўР РЋРІР‚С™ Р РЋР С“Р В РЎвЂўР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В РІвЂћвЂ“
    // Р В РЎСџР В РЎвЂўР РЋР РЉР РЋРІР‚С™Р В РЎвЂўР В РЎВР РЋРЎвЂњ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂў Р В РЎвЂР В РЎвЂ“Р В Р вЂ¦Р В РЎвЂўР РЋР вЂљР В РЎвЂР РЋР вЂљР РЋРЎвЂњР В Р’ВµР В РЎВ Р В РЎвЂўР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В РЎвЂ
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
