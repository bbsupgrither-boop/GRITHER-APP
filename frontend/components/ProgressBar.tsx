Р С—Р’В»РЎвЂ”import React from 'react';

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
  // Р В Р в‚¬Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р В Р вЂ¦Р В Р’В°Р В Р вЂ Р В Р’В»Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РЎвЂ“Р РЋР вЂљР В Р’ВµР РЋР С“Р РЋР С“ Р В Р вЂ¦Р В Р’В° 60% Р В Р’ВµР РЋР С“Р В Р’В»Р В РЎвЂ Р РЋР РЉР РЋРІР‚С™Р В РЎвЂў Р В РЎвЂ”Р В Р’В»Р В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚В¦Р В РЎвЂўР В Р’В»Р В РўвЂР В Р’ВµР РЋР вЂљ
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
            Р В РЎвЂєР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™
          </span>
        </div>
        
        {/* XP Р В РЎвЂ”Р В РЎвЂў Р РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќР В Р’В° */}
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
        
        {/* Р В РЎСџР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В РІвЂћвЂ“ div Р В РўвЂР В Р’В»Р РЋР РЏ Р В Р’В±Р В Р’В°Р В Р’В»Р В Р’В°Р В Р вЂ¦Р РЋР С“Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В РЎвЂќР В РЎвЂ */}
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