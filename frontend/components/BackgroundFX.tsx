import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
  isHomePage?: boolean;
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme, isHomePage = false }) => {
  // Цветовая система градиентов
  const gradientColors = {
    primary: '#0084FF',
    primaryLight: '#40A0FF',
    primaryMuted: 'rgba(64, 160, 255, 0.4)',
    primarySubtle: 'rgba(43, 130, 255, 0.03)',
    primaryVerySubtle: 'rgba(43, 130, 255, 0.015)',
    
    backgroundStart: '#F5F7FA',
    backgroundMiddle: '#FFFFFF',
    backgroundEnd: '#F8FAFC',
    
    vignetteDark: 'rgba(15, 23, 42, 0.04)',
    vignetteMid: 'rgba(15, 23, 42, 0.025)',
    vignetteLight: 'rgba(15, 23, 42, 0.01)',
    
    spotlightCenter: 'rgba(43, 130, 255, 0.08)',
    spotlightMiddle: 'rgba(43, 130, 255, 0.04)',
    spotlightEdge: 'rgba(43, 130, 255, 0.015)',
    spotlightSecondary: 'rgba(43, 130, 255, 0.02)'
  };

  if (isHomePage && theme === 'light') {
    // Простая система для главной страницы - как на первом фото
    return (
      <div className="fixed inset-0 background-fx">
        {/* 1. ОСНОВНОЙ ГРАДИЕНТНЫЙ СЛОЙ - как на первом фото */}
        <div 
          className="absolute inset-0"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 'clamp(280px, 32vh, 340px)',
            background: 'linear-gradient(180deg, #0084FF 0%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* 2. ЗЕРНИСТОСТЬ (Noise/Grain эффект) - как на первом фото */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            height: 'clamp(280px, 32vh, 340px)',
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  // Система для других страниц
  return (
    <div className="fixed inset-0 background-fx">
      {theme === 'dark' ? (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
          }}
        />
      ) : (
        <>
          {/* 1. ОСНОВА - СЛОЖНЫЙ СВЕТЛЫЙ ГРАДИЕНТ */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, 
                ${gradientColors.backgroundStart} 0%, 
                ${gradientColors.backgroundMiddle} 40%, 
                ${gradientColors.backgroundEnd} 100%
              )`
            }}
          />

          {/* 2. ВЕРХНИЙ СИНИЙ СЛОЙ - ОЧЕНЬ ПЛАВНЫЙ */}
          <div 
            className="absolute inset-0"
            style={{
              height: '50vh',
              background: `linear-gradient(180deg,
                ${gradientColors.primarySubtle} 0%, 
                ${gradientColors.primaryVerySubtle} 40%, 
                rgba(43, 130, 255, 0.005) 70%, 
                transparent 100%
              )`
            }}
          />

          {/* 3. ОСНОВНОЙ SPOTLIGHT (круглый) */}
          <div 
            className="absolute opacity-60"
            style={{
              top: '30vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              background: `radial-gradient(circle,
                ${gradientColors.spotlightCenter} 0%, 
                ${gradientColors.spotlightMiddle} 30%, 
                ${gradientColors.spotlightEdge} 60%, 
                transparent 100%
              )`
            }}
          />

          {/* 4. ДОПОЛНИТЕЛЬНЫЙ SPOTLIGHT (эллиптический) */}
          <div 
            className="absolute opacity-40"
            style={{
              top: '20vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '800px',
              height: '400px',
              background: `radial-gradient(ellipse 100% 50%,
                ${gradientColors.spotlightMiddle} 0%, 
                ${gradientColors.spotlightSecondary} 50%, 
                transparent 100%
              )`
            }}
          />

          {/* 5. ОСНОВНАЯ ЦЕНТРАЛЬНАЯ ВИНЬЕТКА */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center,
                transparent 30%, 
                ${gradientColors.vignetteLight} 60%, 
                ${gradientColors.vignetteMid} 80%, 
                ${gradientColors.vignetteDark} 100%
              )`
            }}
          />

          {/* 6. УГЛОВЫЕ ВИНЬЕТКИ (4 угла) */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 0% 0%, ${gradientColors.vignetteMid} 0%, transparent 50%), 
                radial-gradient(circle at 100% 0%, ${gradientColors.vignetteMid} 0%, transparent 50%), 
                radial-gradient(circle at 0% 100%, ${gradientColors.vignetteLight} 0%, transparent 50%), 
                radial-gradient(circle at 100% 100%, ${gradientColors.vignetteLight} 0%, transparent 50%)
              `
            }}
          />

          {/* 7. ТЕКСТУРНЫЙ СЛОЙ */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </>
      )}
    </div>
  );
};