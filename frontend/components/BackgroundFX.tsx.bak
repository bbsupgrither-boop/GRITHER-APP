import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
  isHomePage?: boolean;
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme, isHomePage = false }) => {
  if (isHomePage && theme === 'light') {
    // Красивый градиентный фон для главной страницы с эффектом неба
    return (
      <div className="fixed inset-0 background-fx">
        {/* Основной градиентный слой */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(59, 130, 246, 0.8) 0%, 
              rgba(59, 130, 246, 0.4) 30%, 
              rgba(255, 255, 255, 0.9) 70%, 
              #F8FAFC 100%
            )`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        {/* Декоративный синий эффект неба */}
        <div 
          className="absolute"
          style={{
            top: '-10%',
            right: '-5%',
            width: '50%',
            height: '70%',
            background: `linear-gradient(180deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 100%)`,
            opacity: 0.2,
            filter: 'blur(48px)',
            borderRadius: '50%',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
        
        {/* Дополнительный слой для глубины */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center top, 
              rgba(59, 130, 246, 0.1) 0%, 
              transparent 60%
            )`,
            zIndex: 3,
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
        {/* Основной фон */}
        <div 
          className="absolute inset-0"
          style={{
            background: '#F8FAFC',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        {/* Декоративный синий эффект неба */}
        <div 
          className="absolute"
          style={{
            top: '-10%',
            right: '-5%',
            width: '50%',
            height: '70%',
            background: `linear-gradient(180deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 100%)`,
            opacity: 0.15,
            filter: 'blur(48px)',
            borderRadius: '50%',
            zIndex: 2,
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