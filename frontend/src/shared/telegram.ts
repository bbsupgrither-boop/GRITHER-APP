// Р вЂР ВµР В·Р С•Р С—Р В°РЎРѓР Р…РЎвЂ№Р в„– Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С— Р С” Telegram WebApp API

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
  
  // Р вЂ™Р С•Р В·Р Р†РЎР‚Р В°РЎвЂ°Р В°Р ВµР С РЎвЂћРЎС“Р Р…Р С”РЎвЂ Р С‘РЎР‹ Р С•РЎвЂЎР С‘РЎРѓРЎвЂљР С”Р С‘
  return () => {
    // Telegram WebApp Р Р…Р Вµ Р С—РЎР‚Р ВµР Т‘Р С•РЎРѓРЎвЂљР В°Р Р†Р В»РЎРЏР ВµРЎвЂљ РЎРѓР С—Р С•РЎРѓР С•Р В± Р С•РЎвЂљР С—Р С‘РЎРѓР В°РЎвЂљРЎРЉРЎРѓРЎРЏ Р С•РЎвЂљ РЎРѓР С•Р В±РЎвЂ№РЎвЂљР С‘Р в„–
    // Р СџР С•РЎРЊРЎвЂљР С•Р СРЎС“ Р С—РЎР‚Р С•РЎРѓРЎвЂљР С• Р С‘Р С–Р Р…Р С•РЎР‚Р С‘РЎР‚РЎС“Р ВµР С Р С•РЎв‚¬Р С‘Р В±Р С”Р С‘
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
