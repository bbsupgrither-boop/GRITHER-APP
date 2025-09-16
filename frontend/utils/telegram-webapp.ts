// Telegram WebApp utilities
export const modalManager = {
  isModalOpen: () => {
    return document.querySelector('[data-modal-open="true"]') !== null;
  },
  open: (id: string) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.setAttribute('data-modal-open', 'true');
      modal.style.display = 'block';
    }
  },
  close: (id: string) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.setAttribute('data-modal-open', 'false');
      modal.style.display = 'none';
    }
  },
  closeModal: (id: string) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.setAttribute('data-modal-open', 'false');
      modal.style.display = 'none';
    }
  },
  closeAllModals: () => {
    const modals = document.querySelectorAll('[data-modal-open="true"]');
    modals.forEach(modal => {
      modal.setAttribute('data-modal-open', 'false');
      (modal as HTMLElement).style.display = 'none';
    });
  }
};

export function createFocusTrap(root: HTMLElement) {
  const focusableElements = root.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  return {
    activate: () => {
      if (firstElement) firstElement.focus();
    },
    deactivate: () => {
      // Remove focus from modal elements
    }
  };
}

export function triggerHaptic(type: 'light' | 'medium' | 'heavy' = 'light') {
  try {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.HapticFeedback) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred(type);
    }
  } catch (error) {
    console.warn('Haptic feedback not available:', error);
  }
}

// Telegram WebApp initialization
export function initializeTelegramWebApp() {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
    const webApp = (window as any).Telegram.WebApp;
    
    // Handle back button
    if (webApp.BackButton && webApp.BackButton.onClick) {
      webApp.BackButton.onClick(() => {
        if (modalManager.isModalOpen()) {
          modalManager.closeAllModals();
        } else {
          webApp.close();
        }
      });
    }
    
    return webApp;
  }
  return null;
}

// Validation rules
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export function validateField(value: string, rules: ValidationRule): string | null {
  if (rules.required && (!value || value.trim().length === 0)) {
    return 'Поле обязательно для заполнения';
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    return `Минимум ${rules.minLength} символов`;
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Максимум ${rules.maxLength} символов`;
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Некорректный формат';
  }
  
  if (rules.custom) {
    return rules.custom(value);
  }
  
  return null;
}
