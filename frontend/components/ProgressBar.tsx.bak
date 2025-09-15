import React from 'react';

interface ProgressBarProps {
  level: number;
  experience: number;
  maxExperience: number;
  theme: 'light' | 'dark';
  onExperienceClick?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  level, 
  experience, 
  maxExperience, 
  theme,
  onExperienceClick 
}) => {
  // Устанавливаем прогресс на 60% если это плейсхолдер
  const isPlaceholder = level === 0 && experience === 0 && maxExperience === 100;
  const actualProgress = isPlaceholder ? 60 : (maxExperience > 0 ? (experience / maxExperience) * 100 : 0);
  const displayExperience = isPlaceholder ? 60 : experience;
  const displayMaxExperience = isPlaceholder ? 100 : maxExperience;

  return (
    <div 
      className="glass-card p-4 cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.96]"
      onClick={onExperienceClick}
      style={{
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span 
            style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            {isPlaceholder ? 'lvl 5' : `lvl ${level}`}
          </span>
          <span 
            style={{ 
              fontSize: '12px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Опыт
          </span>
        </div>
        
        {/* XP по центру блока */}
        <div className="flex-1 text-center">
          <span
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            {displayExperience}/{displayMaxExperience} XP
          </span>
        </div>
        
        {/* Пустой div для балансировки */}
        <div style={{ width: '80px' }}></div>
      </div>

      <div 
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            width: `${actualProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #2B82FF 0%, #40A0FF 100%)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};