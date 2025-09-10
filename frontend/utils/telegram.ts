// Telegram Web App Integration

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
    };
    chat_type?: string;
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
  };
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  showPopup: (params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }, callback?: (buttonId: string) => void) => void;
  showAlert: (message: string, callback?: () => void) => void;
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
  showScanQrPopup: (params: {
    text?: string;
  }, callback?: (text: string) => void) => void;
  closeScanQrPopup: () => void;
  readTextFromClipboard: (callback?: (text: string) => void) => void;
  sendData: (data: string) => void;
  requestWriteAccess: (callback?: (granted: boolean) => void) => void;
  requestContact: (callback?: (granted: boolean) => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

// РћСЃРЅРѕРІРЅРѕР№ РєР»Р°СЃСЃ РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ Telegram Web App
export class TelegramService {
  private static instance: TelegramService;
  private webApp: TelegramWebApp | null = null;
  private isInitialized = false;

  private constructor() {
    this.init();
  }

  static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  private init() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.webApp = window.Telegram.WebApp;
      this.webApp.ready();
      this.webApp.expand();
      this.isInitialized = true;
      
      console.log('Telegram Web App initialized:', {
        version: this.webApp.version,
        platform: this.webApp.platform,
        colorScheme: this.webApp.colorScheme,
        user: this.webApp.initDataUnsafe?.user
      });

      // РќР°СЃС‚СЂРѕР№РєР° С‚РµРјС‹ РїСЂРёР»РѕР¶РµРЅРёСЏ РЅР° РѕСЃРЅРѕРІРµ Telegram
      this.setupTheme();
    } else {
      console.log('Telegram Web App not available - running in browser mode');
    }
  }

  private setupTheme() {
    if (!this.webApp) return;

    const isDark = this.webApp.colorScheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);

    // РџСЂРёРјРµРЅСЏРµРј С†РІРµС‚Р° С‚РµРјС‹ Telegram
    const theme = this.webApp.themeParams;
    if (theme.bg_color) {
      document.documentElement.style.setProperty('--tg-bg-color', theme.bg_color);
    }
    if (theme.text_color) {
      document.documentElement.style.setProperty('--tg-text-color', theme.text_color);
    }
  }

  // РџСЂРѕРІРµСЂРєР° РґРѕСЃС‚СѓРїРЅРѕСЃС‚Рё Telegram Web App
  isAvailable(): boolean {
    return this.isInitialized && this.webApp !== null;
  }

  // РџРѕР»СѓС‡РµРЅРёРµ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUser() {
    if (!this.webApp) return null;
    return this.webApp.initDataUnsafe?.user || null;
  }

  // РџРѕР»СѓС‡РµРЅРёРµ init data РґР»СЏ Р°РІС‚РѕСЂРёР·Р°С†РёРё РЅР° Р±СЌРєРµРЅРґРµ
  getInitData(): string {
    if (!this.webApp) return '';
    return this.webApp.initData || '';
  }

  // РџСЂРѕРІРµСЂРєР° С‚РµРјС‹
  getColorScheme(): 'light' | 'dark' {
    if (!this.webApp) return 'dark'; // РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ С‚РµРјРЅР°СЏ С‚РµРјР°
    return this.webApp.colorScheme;
  }

  // РџРѕРєР°Р· РіР»Р°РІРЅРѕР№ РєРЅРѕРїРєРё
  showMainButton(text: string, callback: () => void) {
    if (!this.webApp) return;
    
    this.webApp.MainButton.setText(text);
    this.webApp.MainButton.onClick(callback);
    this.webApp.MainButton.show();
  }

  // РЎРєСЂС‹С‚РёРµ РіР»Р°РІРЅРѕР№ РєРЅРѕРїРєРё
  hideMainButton() {
    if (!this.webApp) return;
    this.webApp.MainButton.hide();
  }

  // РџРѕРєР°Р· РєРЅРѕРїРєРё "РќР°Р·Р°Рґ"
  showBackButton(callback: () => void) {
    if (!this.webApp) return;
    
    this.webApp.BackButton.onClick(callback);
    this.webApp.BackButton.show();
  }

  // РЎРєСЂС‹С‚РёРµ РєРЅРѕРїРєРё "РќР°Р·Р°Рґ"
  hideBackButton() {
    if (!this.webApp) return;
    this.webApp.BackButton.hide();
  }

  // Haptic feedback
  impactFeedback(style: 'light' | 'medium' | 'heavy' = 'medium') {
    if (!this.webApp) return;
    this.webApp.HapticFeedback.impactOccurred(style);
  }

  notificationFeedback(type: 'error' | 'success' | 'warning') {
    if (!this.webApp) return;
    this.webApp.HapticFeedback.notificationOccurred(type);
  }

  selectionFeedback() {
    if (!this.webApp) return;
    this.webApp.HapticFeedback.selectionChanged();
  }

  // РџРѕРєР°Р· Р°Р»РµСЂС‚Р°
  showAlert(message: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        alert(message);
        resolve();
        return;
      }
      
      this.webApp.showAlert(message, () => resolve());
    });
  }

  // РџРѕРєР°Р· РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ
  showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        resolve(confirm(message));
        return;
      }
      
      this.webApp.showConfirm(message, (confirmed) => resolve(confirmed));
    });
  }

  // РћС‚РїСЂР°РІРєР° РґР°РЅРЅС‹С… Р±РѕС‚Сѓ
  sendData(data: any) {
    if (!this.webApp) return;
    this.webApp.sendData(JSON.stringify(data));
  }

  // Р—Р°РєСЂС‹С‚РёРµ РїСЂРёР»РѕР¶РµРЅРёСЏ
  close() {
    if (!this.webApp) return;
    this.webApp.close();
  }

  // РџСЂРѕРІРµСЂРєР° РЅР° РјРѕР±РёР»СЊРЅРѕРµ СѓСЃС‚СЂРѕР№СЃС‚РІРѕ
  isMobile(): boolean {
    if (!this.webApp) return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return ['android', 'ios'].includes(this.webApp.platform);
  }

  // РџРѕР»СѓС‡РµРЅРёРµ РёРЅС„РѕСЂРјР°С†РёРё Рѕ РїР»Р°С‚С„РѕСЂРјРµ
  getPlatform(): string {
    if (!this.webApp) return 'web';
    return this.webApp.platform;
  }

  // РџРѕР»СѓС‡РµРЅРёРµ СЂР°Р·РјРµСЂРѕРІ viewport
  getViewportHeight(): number {
    if (!this.webApp) return window.innerHeight;
    return this.webApp.viewportHeight;
  }

  getStableViewportHeight(): number {
    if (!this.webApp) return window.innerHeight;
    return this.webApp.viewportStableHeight;
  }
}

// РҐСѓРє РґР»СЏ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ РІ React РєРѕРјРїРѕРЅРµРЅС‚Р°С…
export const useTelegram = () => {
  const telegram = TelegramService.getInstance();
  
  return {
    webApp: telegram.isAvailable() ? telegram : null,
    user: telegram.getUser(),
    colorScheme: telegram.getColorScheme(),
    isAvailable: telegram.isAvailable(),
    showMainButton: telegram.showMainButton.bind(telegram),
    hideMainButton: telegram.hideMainButton.bind(telegram),
    showBackButton: telegram.showBackButton.bind(telegram),
    hideBackButton: telegram.hideBackButton.bind(telegram),
    impactFeedback: telegram.impactFeedback.bind(telegram),
    notificationFeedback: telegram.notificationFeedback.bind(telegram),
    selectionFeedback: telegram.selectionFeedback.bind(telegram),
    showAlert: telegram.showAlert.bind(telegram),
    showConfirm: telegram.showConfirm.bind(telegram),
    sendData: telegram.sendData.bind(telegram),
    close: telegram.close.bind(telegram),
    isMobile: telegram.isMobile(),
    platform: telegram.getPlatform(),
    viewportHeight: telegram.getViewportHeight(),
    stableViewportHeight: telegram.getStableViewportHeight(),
    initData: telegram.getInitData()
  };
};

// РЈС‚РёР»РёС‚С‹ РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ РґР°РЅРЅС‹РјРё
export const telegramUtils = {
  // РџСЂРѕРІРµСЂРєР° РІР°Р»РёРґРЅРѕСЃС‚Рё init data (РґР»СЏ Р±СЌРєРµРЅРґР°)
  validateInitData: (initData: string, botToken: string): boolean => {
    // Р­С‚Р° С„СѓРЅРєС†РёСЏ РґРѕР»Р¶РЅР° Р±С‹С‚СЊ РЅР° Р±СЌРєРµРЅРґРµ РґР»СЏ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё
    // Р—РґРµСЃСЊ С‚РѕР»СЊРєРѕ Р·Р°РіР»СѓС€РєР°
    return initData.length > 0;
  },

  // Р¤РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёРµ РёРјРµРЅРё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  formatUserName: (user: any): string => {
    if (!user) return 'Р“РѕСЃС‚СЊ';
    
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    const username = user.username || '';
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (username) {
      return `@${username}`;
    } else {
      return `User ${user.id}`;
    }
  },

  // РџРѕР»СѓС‡РµРЅРёРµ Р°РІР°С‚Р°СЂР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUserAvatar: (user: any): string | null => {
    return user?.photo_url || null;
  },

  // РћРїСЂРµРґРµР»РµРЅРёРµ СЏР·С‹РєР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUserLanguage: (user: any): string => {
    return user?.language_code || 'ru';
  }
};

export default TelegramService;
