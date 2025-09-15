/**
 * Production Modal Component for Telegram WebApp
 * Handles accessibility, focus management, and responsive design
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { modalManager, createFocusTrap, triggerHaptic } from '../utils/telegram-webapp';

interface ProductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  modalId: string;
  triggerElement?: HTMLElement | null;
  className?: string;
}

export const ProductionModal: React.FC<ProductionModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  modalId,
  triggerElement,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusTrapCleanup = useRef<(() => void) | null>(null);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      modalManager.openModal(modalId, triggerElement || undefined);
      triggerHaptic('light');
      
      // Set up focus trap
      if (modalRef.current) {
        focusTrapCleanup.current = createFocusTrap(modalRef.current);
      }
    } else {
      modalManager.closeModal(modalId);
      if (focusTrapCleanup.current) {
        focusTrapCleanup.current();
        focusTrapCleanup.current = null;
      }
    }

    return () => {
      if (focusTrapCleanup.current) {
        focusTrapCleanup.current();
      }
    };
  }, [isOpen, modalId, triggerElement]);

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
      triggerHaptic('light');
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      triggerHaptic('light');
    }
  }, [onClose]);

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose();
    triggerHaptic('light');
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${className}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${modalId}-title` : undefined}
      aria-describedby={`${modalId}-content`}
    >
      <div
        ref={modalRef}
        className="modal-content focus-trap"
        style={{
          maxHeight: 'calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 24px)',
        }}
      >
        {title && (
          <div className="modal-header">
            <h2 id={`${modalId}-title`} className="modal-title">
              {title}
            </h2>
            <button
              onClick={handleCloseClick}
              className="modal-close-btn"
              aria-label="Закрыть"
              type="button"
            >
              ✕
            </button>
          </div>
        )}
        
        <div id={`${modalId}-content`} className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// CSS for modal (should be in production.css)
const modalStyles = `
.modal-title {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.dark .modal-title {
  color: #E8ECF2;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 18px;
  color: #6B7280;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #374151;
}

.dark .modal-close-btn {
  color: #A7B0BD;
}

.dark .modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #E8ECF2;
}
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('modal-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'modal-styles';
  styleElement.textContent = modalStyles;
  document.head.appendChild(styleElement);
}
