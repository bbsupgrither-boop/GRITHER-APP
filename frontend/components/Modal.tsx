import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function Modal({ isOpen, onClose, title, children, actions, theme = 'light' }: ModalProps) {
  // Р С›Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р В° Escape
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Р СџРЎР‚Р ВµР Т‘Р С•РЎвЂљР Р†РЎР‚Р В°РЎвЂ°Р В°Р ВµР С РЎРѓР С”РЎР‚Р С•Р В»Р В» РЎвЂћР С•Р Р…Р В°
    document.body.style.overflow = 'hidden';
    
    // Dispatch modal opened event
    document.dispatchEvent(new CustomEvent('modal-opened'));
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      
      // Dispatch modal closed event
      document.dispatchEvent(new CustomEvent('modal-closed'));
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" data-modal="true">
      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
        onClick={onClose || (() => {})}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-[90%] mx-4"
        style={{
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          opacity: '1', // 100% Р Р…Р ВµР С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…Р С•РЎРѓРЎвЂљРЎРЉ
          borderRadius: '16px',
          border: theme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.06)' 
            : '1px solid #E6E9EF',
          boxShadow: theme === 'dark' 
            ? '0 16px 48px rgba(0, 0, 0, 0.6)' 
            : '0 16px 48px rgba(0, 0, 0, 0.25)',
          padding: '16px',
          minWidth: '280px',
          maxHeight: '80vh',
          overflow: 'hidden',
          // Р Р€Р В±Р С‘РЎР‚Р В°Р ВµР С Р Р†РЎРѓР Вµ РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљРЎвЂ№ РЎР‚Р В°Р В·Р СРЎвЂ№РЎвЂљР С‘РЎРЏ Р С‘ Р С—РЎР‚Р С•Р В·РЎР‚Р В°РЎвЂЎР Р…Р С•РЎРѓРЎвЂљР С‘
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-center mb-3">
            <h3 
              className="text-lg font-medium text-center"
              style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A' 
              }}
            >
              {title}
            </h3>
          </div>
        )}
        
        {/* Content */}
        <div style={{ 
          marginBottom: actions ? '12px' : '0',
          maxHeight: title ? 'calc(80vh - 100px)' : 'calc(80vh - 60px)',
          overflow: 'auto'
        }}>
          {children}
        </div>
        
        {/* Actions */}
        {actions && (
          <div className="flex justify-end gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
