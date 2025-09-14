import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
  isHomePage?: boolean;
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme, isHomePage = false }) => {
  if (isHomePage && theme === 'light') {
    // Red background theme with white content blocks and yellow borders
    return (
      <div className="fixed inset-0 background-fx">
        {/* Основной красный фон */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              #DC2626 0%, 
              #B91C1C 30%, 
              #991B1B 70%, 
              #7F1D1D 100%
            )`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        {/* Дополнительный слой для глубины */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center top, 
              rgba(220, 38, 38, 0.8) 0%, 
              transparent 60%
            )`,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  if (isHomePage && theme === 'dark') {
    // Темная тема для главной страницы
    return (
      <div className="fixed inset-0 background-fx">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(0, 132, 255, 0.15) 0%, 
              rgba(18, 21, 27, 0.9) 30%, 
              #12151B 100%
            )`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  // Обычные страницы
  if (theme === 'light') {
    return (
      <div className="fixed inset-0 background-fx">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              #DC2626 0%, 
              #B91C1C 50%, 
              #991B1B 100%
            )`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  // Темная тема для обычных страниц
  return (
    <div className="fixed inset-0 background-fx">
      <div 
        className="absolute inset-0"
        style={{
          background: '#12151B',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};