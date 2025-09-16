import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, CheckSquare, ShoppingCart } from 'lucide-react';

interface BottomNavigationProps {
  theme: 'light' | 'dark';
  hideWhenModalOpen?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  theme,
  hideWhenModalOpen = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for modal open/close events
  useEffect(() => {
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    // Listen for custom events that indicate modal state
    document.addEventListener('modal-opened', handleModalOpen);
    document.addEventListener('modal-closed', handleModalClose);

    // Also check for modal elements in the DOM
    const checkForModals = () => {
      const modals = document.querySelectorAll('[data-modal="true"]');
      const hasOpenModal = Array.from(modals).some(modal => {
        const style = window.getComputedStyle(modal);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });
      setIsModalOpen(hasOpenModal);
    };

    // Check initially and set up mutation observer
    checkForModals();
    const observer = new MutationObserver(checkForModals);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('modal-opened', handleModalOpen);
      document.removeEventListener('modal-closed', handleModalClose);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { icon: Home, page: '/home', label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ' },
    { icon: Trophy, page: '/achievements', label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ' },
    { icon: CheckSquare, page: '/tasks', label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘' },
    { icon: ShoppingCart, page: '/shop', label: 'Р СљР В°Р С–Р В°Р В·Р С‘Р Р…' },
  ];

  const currentPage = location.pathname;

  // Don't render if modal is open and hideWhenModalOpen is true
  if (hideWhenModalOpen && isModalOpen) {
    return null;
  }

  const navigationContent = (
    <div 
      style={{ 
        position: 'fixed',      // Р В РІР‚в„ўР РЋР С“Р В Р’ВµР В РЎвЂ“Р В РўвЂР В Р’В° Р В РЎвЂ”Р В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІР‚В¦ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В Р’В°
        bottom: '24px',         // Р В РЎвЂєР РЋРІР‚С™Р РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ” Р В РЎвЂўР РЋРІР‚С™ Р В Р вЂ¦Р В РЎвЂР В Р’В¶Р В Р вЂ¦Р В Р’ВµР В РЎвЂ“Р В РЎвЂў Р В РЎвЂќР РЋР вЂљР В Р’В°Р РЋР РЏ Р РЋР РЉР В РЎвЂќР РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’В°
        left: '50%',           // Р В РЎСљР В Р’В°Р РЋРІР‚РЋР В Р’В°Р В Р’В»Р В РЎвЂў Р В РЎвЂўР РЋРІР‚С™ Р РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р РЋР вЂљР В Р’В° Р РЋР РЉР В РЎвЂќР РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’В°
        marginLeft: '-160px',   // Р В Р Р‹Р В РЎВР В Р’ВµР РЋРІР‚В°Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РўвЂР В Р’В»Р РЋР РЏ Р РЋРІР‚С™Р В РЎвЂўР РЋРІР‚РЋР В Р вЂ¦Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ
        zIndex: 1000,          // Р В РІР‚в„ўР РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР В РЎвЂќР В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В РЎвЂўР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В Р’ВµР РЋРІР‚С™ Р В Р вЂ¦Р В Р’В°Р В РўвЂ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В РЎвЂўР В РЎВ
        width: 'calc(100vw - 48px)',  // Р В Р РѓР В РЎвЂР РЋР вЂљР В РЎвЂР В Р вЂ¦Р В Р’В° Р РЋР РЉР В РЎвЂќР РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’В° Р В РЎВР В РЎвЂР В Р вЂ¦Р РЋРЎвЂњР РЋР С“ Р В РЎвЂўР РЋРІР‚С™Р РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р РЋРІР‚в„– Р В РЎвЂ”Р В РЎвЂў 24px Р РЋР С“ Р В РЎвЂќР В Р’В°Р В Р’В¶Р В РўвЂР В РЎвЂўР В РІвЂћвЂ“ Р РЋР С“Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ¦Р РЋРІР‚в„–
        maxWidth: '320px',             // Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІвЂљВ¬Р В РЎвЂР РЋР вЂљР В РЎвЂР В Р вЂ¦Р В Р’В° 320px Р В РўвЂР В Р’В»Р РЋР РЏ Р В Р’В±Р В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚В¦ Р РЋР РЉР В РЎвЂќР РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#12151B' : '#F3F5F8', // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В·Р РЋР вЂљР В Р’В°Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋРІР‚С›Р В РЎвЂўР В Р вЂ¦
          borderRadius: '24px',        // Р В Р Р‹Р В РЎвЂР В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂў Р В Р’В·Р В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р РЋРІР‚в„–
          padding: '8px',              // Р В РІР‚в„ўР В Р вЂ¦Р РЋРЎвЂњР РЋРІР‚С™Р РЋР вЂљР В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂўР РЋРІР‚С™Р РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р РЋРІР‚в„–
          gap: '12px',                 // Р В Р’В Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р В РЎвЂўР В РЎВР В Р’ВµР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂўР РЋРІР‚С™Р РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р РЋРІР‚в„– Р В РЎВР В Р’ВµР В Р’В¶Р В РўвЂР РЋРЎвЂњ Р В РЎвЂќР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В Р’В°Р В РЎВР В РЎвЂ
          overflow: 'hidden',          // Clip content - Р В РЎвЂќР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В РЎвЂ Р В Р вЂ¦Р В Р’Вµ Р В Р вЂ Р РЋРІР‚в„–Р РЋРІР‚В¦Р В РЎвЂўР В РўвЂР РЋР РЏР РЋРІР‚С™ Р В Р’В·Р В Р’В° Р В РЎвЂ”Р РЋР вЂљР В Р’ВµР В РўвЂР В Р’ВµР В Р’В»Р РЋРІР‚в„–
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className="relative flex items-center justify-center transition-all duration-200"
              style={{ 
                width: '44px',      // Р В Р’В¤Р В РЎвЂР В РЎвЂќР РЋР С“Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІвЂљВ¬Р В РЎвЂР РЋР вЂљР В РЎвЂР В Р вЂ¦Р В Р’В°
                height: '44px',     // Р В Р’В¤Р В РЎвЂР В РЎвЂќР РЋР С“Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р В Р вЂ Р РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р В Р’В°
                minWidth: '44px',   // Р В РЎС™Р В РЎвЂР В Р вЂ¦Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІвЂљВ¬Р В РЎвЂР РЋР вЂљР В РЎвЂР В Р вЂ¦Р В Р’В°
                minHeight: '44px',  // Р В РЎС™Р В РЎвЂР В Р вЂ¦Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р В Р вЂ Р РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р В Р’В°
                maxWidth: '44px',   // Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІвЂљВ¬Р В РЎвЂР РЋР вЂљР В РЎвЂР В Р вЂ¦Р В Р’В° (Р В РЎвЂ”Р РЋР вЂљР В Р’ВµР В РўвЂР В РЎвЂўР РЋРІР‚С™Р В Р вЂ Р РЋР вЂљР В Р’В°Р РЋРІР‚В°Р В Р’В°Р В Р’ВµР РЋРІР‚С™ Р РЋР вЂљР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР РЏР В РЎвЂ“Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ)
                maxHeight: '44px',  // Р В РЎС™Р В Р’В°Р В РЎвЂќР РЋР С“Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р В Р вЂ Р РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р В Р’В°
                borderRadius: '50%', // Р В РЎв„ўР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В Р’В°Р РЋР РЏ Р РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР В Р’В°
                flexShrink: 0,      // Hug contents - Р В РЎвЂќР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В РЎвЂ Р В Р вЂ¦Р В Р’Вµ Р РЋР С“Р В Р’В¶Р В РЎвЂР В РЎВР В Р’В°Р РЋР вЂ№Р РЋРІР‚С™Р РЋР С“Р РЋР РЏ
                flexGrow: 0         // Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В РЎвЂ Р В Р вЂ¦Р В Р’Вµ Р РЋР вЂљР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР РЏР В РЎвЂ“Р В РЎвЂР В Р вЂ Р В Р’В°Р РЋР вЂ№Р РЋРІР‚С™Р РЋР С“Р РЋР РЏ
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div 
                  className="absolute rounded-full"
                  style={{
                    width: '36px',              // Р В РЎСљР В Р’ВµР В РЎВР В Р вЂ¦Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р В РЎВР В Р’ВµР В Р вЂ¦Р РЋР Р‰Р РЋРІвЂљВ¬Р В Р’Вµ Р В РЎвЂќР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В РЎвЂ
                    height: '36px',
                    backgroundColor: theme === 'dark' 
                      ? 'rgba(43, 130, 255, 0.12)'  // Р В РЎС›Р В Р’ВµР В РЎВР В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В°: 12% Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В·Р РЋР вЂљР В Р’В°Р РЋРІР‚РЋР В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂ
                      : 'rgba(43, 130, 255, 0.10)'  // Р В Р Р‹Р В Р вЂ Р В Р’ВµР РЋРІР‚С™Р В Р’В»Р В Р’В°Р РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В°: 10% Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В·Р РЋР вЂљР В Р’В°Р РЋРІР‚РЋР В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂ
                  }}
                />
              )}
              
              {/* Icon */}
              <Icon 
                className="relative z-10 transition-colors duration-200"
                style={{
                  width: '24px',   // Р В РЎвЂєР В РЎвЂ”Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР вЂљР В Р’В°Р В Р’В·Р В РЎВР В Р’ВµР РЋР вЂљ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂќР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂўР В РЎвЂќ 44px
                  height: '24px',
                  color: isActive 
                    ? '#2B82FF'                                    // Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В Р’В°Р РЋР РЏ: Р РЋР С“Р В РЎвЂР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Apple
                    : theme === 'dark' ? '#A7B0BD' : '#6B7280'    // Р В РЎСљР В Р’ВµР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В Р’В°Р РЋР РЏ: Р РЋР С“Р В Р’ВµР РЋР вЂљР РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂ”Р В РЎвЂў Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’Вµ
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  // Р В Р’В Р В Р’ВµР В Р вЂ¦Р В РўвЂР В Р’ВµР РЋР вЂљР В РЎвЂР В РЎВ Р В Р вЂ¦Р В Р’В°Р В Р вЂ Р В РЎвЂР В РЎвЂ“Р В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР вЂ№
  return navigationContent;
};