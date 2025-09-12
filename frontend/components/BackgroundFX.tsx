import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme }) => {
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
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)'
          }}
        />
      )}
      
      {/* Зернистость для светлой темы */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            height: 'clamp(280px, 32vh, 340px)'
          }}
        />
      )}
    </div>
  );
};