import '@testing-library/jest-dom';

// Настройка для тестов
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Мокаем Telegram WebApp
Object.defineProperty(window, 'Telegram', {
  value: {
    WebApp: {
      initData: '',
      initDataUnsafe: {},
      version: '6.0',
      platform: 'web',
      colorScheme: 'light',
      themeParams: {},
      isExpanded: false,
      viewportHeight: 600,
      viewportStableHeight: 600,
      headerColor: '#ffffff',
      backgroundColor: '#ffffff',
      BackButton: {
        show: () => {},
        hide: () => {},
        onClick: () => {},
      },
      MainButton: {
        text: '',
        color: '#ffffff',
        textColor: '#000000',
        isVisible: false,
        isProgressVisible: false,
        isActive: true,
        show: () => {},
        hide: () => {},
        enable: () => {},
        disable: () => {},
        showProgress: () => {},
        hideProgress: () => {},
        onClick: () => {},
      },
      HapticFeedback: {
        impactOccurred: () => {},
        notificationOccurred: () => {},
        selectionChanged: () => {},
      },
      ready: () => {},
      expand: () => {},
      close: () => {},
    },
  },
  writable: true,
});
