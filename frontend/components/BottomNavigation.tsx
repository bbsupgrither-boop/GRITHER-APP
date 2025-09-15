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
    { icon: Home, page: '/home', label: 'Главная' },
    { icon: Trophy, page: '/achievements', label: 'Достижения' },
    { icon: CheckSquare, page: '/tasks', label: 'Задачи' },
    { icon: ShoppingCart, page: '/shop', label: 'Магазин' },
  ];

  const currentPage = location.pathname;

  // Don't render if modal is open and hideWhenModalOpen is true
  if (hideWhenModalOpen && isModalOpen) {
    return null;
  }

  const navigationContent = (
    <div 
      style={{ 
        position: 'fixed',      // Р’СЃРµРіРґР° РїРѕРІРµСЂС… РєРѕРЅС‚РµРЅС‚Р°
        bottom: '24px',         // РћС‚СЃС‚СѓРї РѕС‚ РЅРёР¶РЅРµРіРѕ РєСЂР°СЏ СЌРєСЂР°РЅР°
        left: '50%',           // РќР°С‡Р°Р»Рѕ РѕС‚ С†РµРЅС‚СЂР° СЌРєСЂР°РЅР°
        marginLeft: '-160px',   // РЎРјРµС‰РµРЅРёРµ РґР»СЏ С‚РѕС‡РЅРѕРіРѕ С†РµРЅС‚СЂРёСЂРѕРІР°РЅРёСЏ
        zIndex: 1000,          // Р’С‹СЃРѕРєРёР№ РїСЂРёРѕСЂРёС‚РµС‚ РЅР°Рґ РєРѕРЅС‚РµРЅС‚РѕРј
        width: 'calc(100vw - 48px)',  // РЁРёСЂРёРЅР° СЌРєСЂР°РЅР° РјРёРЅСѓСЃ РѕС‚СЃС‚СѓРїС‹ РїРѕ 24px СЃ РєР°Р¶РґРѕР№ СЃС‚РѕСЂРѕРЅС‹
        maxWidth: '320px',             // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° 320px РґР»СЏ Р±РѕР»СЊС€РёС… СЌРєСЂР°РЅРѕРІ
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#12151B' : '#F3F5F8', // РџРѕР»СѓРїСЂРѕР·СЂР°С‡РЅС‹Р№ С„РѕРЅ
          borderRadius: '24px',        // РЎРёР»СЊРЅРѕ Р·Р°РєСЂСѓРіР»РµРЅРЅС‹Рµ СѓРіР»С‹
          padding: '8px',              // Р’РЅСѓС‚СЂРµРЅРЅРёРµ РѕС‚СЃС‚СѓРїС‹
          gap: '12px',                 // Р Р°РІРЅРѕРјРµСЂРЅС‹Рµ РѕС‚СЃС‚СѓРїС‹ РјРµР¶РґСѓ РєРЅРѕРїРєР°РјРё
          overflow: 'hidden',          // Clip content - РєРЅРѕРїРєРё РЅРµ РІС‹С…РѕРґСЏС‚ Р·Р° РїСЂРµРґРµР»С‹
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
                width: '44px',      // Р¤РёРєСЃРёСЂРѕРІР°РЅРЅР°СЏ С€РёСЂРёРЅР°
                height: '44px',     // Р¤РёРєСЃРёСЂРѕРІР°РЅРЅР°СЏ РІС‹СЃРѕС‚Р°
                minWidth: '44px',   // РњРёРЅРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР°
                minHeight: '44px',  // РњРёРЅРёРјР°Р»СЊРЅР°СЏ РІС‹СЃРѕС‚Р°
                maxWidth: '44px',   // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ С€РёСЂРёРЅР° (РїСЂРµРґРѕС‚РІСЂР°С‰Р°РµС‚ СЂР°СЃС‚СЏРіРёРІР°РЅРёРµ)
                maxHeight: '44px',  // РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ РІС‹СЃРѕС‚Р°
                borderRadius: '50%', // РљСЂСѓРіР»Р°СЏ С„РѕСЂРјР°
                flexShrink: 0,      // Hug contents - РєРЅРѕРїРєРё РЅРµ СЃР¶РёРјР°СЋС‚СЃСЏ
                flexGrow: 0         // РљРЅРѕРїРєРё РЅРµ СЂР°СЃС‚СЏРіРёРІР°СЋС‚СЃСЏ
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div 
                  className="absolute rounded-full"
                  style={{
                    width: '36px',              // РќРµРјРЅРѕРіРѕ РјРµРЅСЊС€Рµ РєРЅРѕРїРєРё
                    height: '36px',
                    backgroundColor: theme === 'dark' 
                      ? 'rgba(43, 130, 255, 0.12)'  // РўРµРјРЅР°СЏ С‚РµРјР°: 12% РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚Рё
                      : 'rgba(43, 130, 255, 0.10)'  // РЎРІРµС‚Р»Р°СЏ С‚РµРјР°: 10% РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚Рё
                  }}
                />
              )}
              
              {/* Icon */}
              <Icon 
                className="relative z-10 transition-colors duration-200"
                style={{
                  width: '24px',   // РћРїС‚РёРјР°Р»СЊРЅС‹Р№ СЂР°Р·РјРµСЂ РґР»СЏ РєСЂСѓРіР»С‹С… РєРЅРѕРїРѕРє 44px
                  height: '24px',
                  color: isActive 
                    ? '#2B82FF'                                    // РђРєС‚РёРІРЅР°СЏ: СЃРёРЅРёР№ Apple
                    : theme === 'dark' ? '#A7B0BD' : '#6B7280'    // РќРµР°РєС‚РёРІРЅР°СЏ: СЃРµСЂС‹Р№ РїРѕ С‚РµРјРµ
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  // Р РµРЅРґРµСЂРёРј РЅР°РІРёРіР°С†РёСЋ
  return navigationContent;
};