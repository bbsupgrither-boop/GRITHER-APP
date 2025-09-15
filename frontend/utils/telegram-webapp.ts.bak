/**
 * Production TypeScript utilities for Telegram WebApp
 * Handles viewport, safe areas, modals, and Telegram API integration
 */

// Telegram WebApp types
interface TelegramWebApp {
  expand(): void;
  ready(): void;
  close(): void;
  sendData(data: string): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text?: string;
    }>;
  }, callback?: (buttonId: string) => void): void;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    accent_text_color?: string;
    section_bg_color?: string;
    section_header_text_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
  };
  colorScheme: 'light' | 'dark';
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

// Viewport height calculation with fallbacks
export function getViewportHeight(): number {
  if (window.Telegram?.WebApp?.viewportHeight) {
    return window.Telegram.WebApp.viewportHeight;
  }
  
  if (window.visualViewport?.height) {
    return window.visualViewport.height;
  }
  
  return window.innerHeight;
}

// Body scroll lock/unlock
export function lockBodyScroll(): void {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';
}

export function unlockBodyScroll(): void {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.height = '';
}

// Modal management
export class ModalManager {
  private openModals: Set<string> = new Set();
  private focusStack: Array<HTMLElement> = [];
  
  openModal(modalId: string, triggerElement?: HTMLElement): void {
    if (triggerElement) {
      this.focusStack.push(triggerElement);
    }
    
    this.openModals.add(modalId);
    
    if (this.openModals.size === 1) {
      lockBodyScroll();
    }
    
    // Dispatch custom event for modal opened
    document.dispatchEvent(new CustomEvent('modal-opened', { 
      detail: { modalId } 
    }));
  }
  
  closeModal(modalId: string): void {
    this.openModals.delete(modalId);
    
    if (this.openModals.size === 0) {
      unlockBodyScroll();
    }
    
    // Return focus to trigger element
    const triggerElement = this.focusStack.pop();
    if (triggerElement) {
      triggerElement.focus();
    }
    
    // Dispatch custom event for modal closed
    document.dispatchEvent(new CustomEvent('modal-closed', { 
      detail: { modalId } 
    }));
  }
  
  isModalOpen(): boolean {
    return this.openModals.size > 0;
  }
  
  closeAllModals(): void {
    this.openModals.clear();
    this.focusStack = [];
    unlockBodyScroll();
  }
}

// Global modal manager instance
export const modalManager = new ModalManager();

// Theme management
export function applyTelegramTheme(): void {
  if (!window.Telegram?.WebApp?.themeParams) return;
  
  const theme = window.Telegram.WebApp.themeParams;
  const root = document.documentElement;
  
  // Apply Telegram theme colors as CSS custom properties
  if (theme.bg_color) root.style.setProperty('--tg-bg-color', theme.bg_color);
  if (theme.text_color) root.style.setProperty('--tg-text-color', theme.text_color);
  if (theme.hint_color) root.style.setProperty('--tg-hint-color', theme.hint_color);
  if (theme.link_color) root.style.setProperty('--tg-link-color', theme.link_color);
  if (theme.button_color) root.style.setProperty('--tg-button-color', theme.button_color);
  if (theme.button_text_color) root.style.setProperty('--tg-button-text-color', theme.button_text_color);
  if (theme.secondary_bg_color) root.style.setProperty('--tg-secondary-bg-color', theme.secondary_bg_color);
  if (theme.header_bg_color) root.style.setProperty('--tg-header-bg-color', theme.header_bg_color);
  if (theme.accent_text_color) root.style.setProperty('--tg-accent-text-color', theme.accent_text_color);
  if (theme.section_bg_color) root.style.setProperty('--tg-section-bg-color', theme.section_bg_color);
  if (theme.section_header_text_color) root.style.setProperty('--tg-section-header-text-color', theme.section_header_text_color);
  if (theme.subtitle_text_color) root.style.setProperty('--tg-subtitle-text-color', theme.subtitle_text_color);
  if (theme.destructive_text_color) root.style.setProperty('--tg-destructive-text-color', theme.destructive_text_color);
  
  // Apply dark/light theme class
  const isDark = window.Telegram.WebApp.colorScheme === 'dark';
  document.body.classList.toggle('dark', isDark);
  document.body.classList.toggle('light', !isDark);
}

// Viewport change handler
export function onViewportChange(callback: (height: number) => void): () => void {
  let lastHeight = getViewportHeight();
  
  const handleResize = (): void => {
    const currentHeight = getViewportHeight();
    if (currentHeight !== lastHeight) {
      lastHeight = currentHeight;
      callback(currentHeight);
    }
  };
  
  // Listen to multiple events for better compatibility
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize);
  }
  
  // Return cleanup function
  return (): void => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
    
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleResize);
    }
  };
}

// Focus trap for modals
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleTabKey = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }
  
  // Return cleanup function
  return (): void => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

// Telegram WebApp initialization
export function initTelegramWebApp(): void {
  if (!window.Telegram?.WebApp) {
    console.warn('Telegram WebApp API not available');
    return;
  }
  
  const webApp = window.Telegram.WebApp;
  
  // Initialize WebApp
  webApp.ready();
  webApp.expand();
  
  // Apply theme
  applyTelegramTheme();
  
  // Subscribe to theme changes
  webApp.onEvent('themeChanged', applyTelegramTheme);
  
  // Subscribe to viewport changes
  webApp.onEvent('viewportChanged', () => {
    const height = getViewportHeight();
    document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`);
  });
  
  // Set initial viewport height
  const initialHeight = getViewportHeight();
  document.documentElement.style.setProperty('--tg-viewport-height', `${initialHeight}px`);
  
  // Handle back button
  webApp.BackButton.onClick(() => {
    if (modalManager.isModalOpen()) {
      modalManager.closeAllModals();
    } else {
      webApp.close();
    }
  });
  
  console.log('Telegram WebApp initialized successfully');
}

// Form validation utilities
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export function validateField(value: string, rules: ValidationRule): string | null {
  if (rules.required && (!value || value.trim().length === 0)) {
    return 'Это поле обязательно для заполнения';
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    return `Минимум ${rules.minLength} символов`;
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Максимум ${rules.maxLength} символов`;
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Неверный формат';
  }
  
  if (rules.custom) {
    return rules.custom(value);
  }
  
  return null;
}

// Safe area utilities
export function getSafeAreaInsets(): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0'),
  };
}

// Keyboard detection
export function isKeyboardOpen(): boolean {
  if (window.visualViewport) {
    return window.visualViewport.height < window.innerHeight * 0.75;
  }
  return false;
}

// Haptic feedback
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'success' | 'error' | 'warning' | 'selection'): void {
  if (!window.Telegram?.WebApp?.HapticFeedback) return;
  
  const haptic = window.Telegram.WebApp.HapticFeedback;
  
  switch (type) {
    case 'light':
    case 'medium':
    case 'heavy':
    case 'rigid':
    case 'soft':
      haptic.impactOccurred(type);
      break;
    case 'success':
    case 'error':
    case 'warning':
      haptic.notificationOccurred(type);
      break;
    case 'selection':
      haptic.selectionChanged();
      break;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTelegramWebApp);
} else {
  initTelegramWebApp();
}
