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
  // Р В Р’В Р РЋРІР‚С”Р В Р’В Р вЂ™Р’В±Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° Escape
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Р В Р’В Р РЋРЎСџР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СњР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В» Р В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°
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
          opacity: '1', // 100% Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°
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
          // Р В Р’В Р В РІвЂљВ¬Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р’В Р В РІР‚В Р В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ Р В Р Р‹Р В Р Р‰Р В Р Р‹Р Р†Р вЂљРЎвЂєР В Р Р‹Р Р†Р вЂљРЎвЂєР В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋР’ВР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р РЋРІР‚В Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚В
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
