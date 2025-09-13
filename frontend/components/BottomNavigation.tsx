import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Home, Trophy, CheckSquare, ShoppingCart } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onNavigate,
  theme,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { icon: Home, page: 'home' },           // 🏠 Главная
    { icon: Trophy, page: 'achievements' }, // 🏆 Достижения  
    { icon: CheckSquare, page: 'tasks' },   // ✅ Задачи
    { icon: ShoppingCart, page: 'shop' },   // 🛒 Магазин
  ];

  const navigationContent = (
    <div 
      style={{ 
        position: 'fixed',      // Всегда поверх контента
        bottom: '24px',         // Отступ от нижнего края экрана
        left: '50%',           // Начало от центра экрана
        marginLeft: '-160px',   // Смещение для точного центрирования
        zIndex: 1000,          // Высокий приоритет над контентом
        width: 'calc(100vw - 48px)',  // Ширина экрана минус отступы по 24px с каждой стороны
        maxWidth: '320px',             // Максимальная ширина 320px для больших экранов
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#12151B' : '#F3F5F8', // Полупрозрачный фон
          borderRadius: '24px',        // Сильно закругленные углы
          padding: '8px',              // Внутренние отступы
          gap: '12px',                 // Равномерные отступы между кнопками
          overflow: 'hidden',          // Clip content - кнопки не выходят за пределы
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
              onClick={() => onNavigate(item.page)}
              className="relative flex items-center justify-center transition-all duration-200"
              style={{ 
                width: '44px',      // Фиксированная ширина
                height: '44px',     // Фиксированная высота
                minWidth: '44px',   // Минимальная ширина
                minHeight: '44px',  // Минимальная высота
                maxWidth: '44px',   // Максимальная ширина (предотвращает растягивание)
                maxHeight: '44px',  // Максимальная высота
                borderRadius: '50%', // Круглая форма
                flexShrink: 0,      // Hug contents - кнопки не сжимаются
                flexGrow: 0         // Кнопки не растягиваются
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div 
                  className="absolute rounded-full"
                  style={{
                    width: '36px',              // Немного меньше кнопки
                    height: '36px',
                    backgroundColor: theme === 'dark' 
                      ? 'rgba(43, 130, 255, 0.12)'  // Темная тема: 12% прозрачности
                      : 'rgba(43, 130, 255, 0.10)'  // Светлая тема: 10% прозрачности
                  }}
                />
              )}
              
              {/* Icon */}
              <Icon 
                className="relative z-10 transition-colors duration-200"
                style={{
                  width: '24px',   // Оптимальный размер для круглых кнопок 44px
                  height: '24px',
                  color: isActive 
                    ? '#2B82FF'                                    // Активная: синий Apple
                    : theme === 'dark' ? '#A7B0BD' : '#6B7280'    // Неактивная: серый по теме
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  // Рендерим через портал для избежания влияния родительских контекстов
  return mounted ? createPortal(navigationContent, document.body) : null;
};