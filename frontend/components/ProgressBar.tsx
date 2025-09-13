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
  const progressPercentage = maxExperience > 0 ? (experience / maxExperience) * 100 : 0;
  const isPlaceholder = level === 0 && experience === 0 && maxExperience === 100;

  return (
    <div 
      className="glass-card p-4"
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
            {isPlaceholder ? 'lvl —' : `lvl ${level}`}
          </span>
          <span 
            style={{ 
              fontSize: '12px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            {isPlaceholder ? '—' : 'Опыт'}
          </span>
        </div>
        
        <button
          onClick={onExperienceClick}
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
            opacity: isPlaceholder ? 0.5 : 1,
            cursor: isPlaceholder ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '6px',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!isPlaceholder) {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {isPlaceholder ? '—' : `${experience}/${maxExperience} XP`}
        </button>
      </div>

      <div 
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          opacity: isPlaceholder ? 0.5 : 1
        }}
      >
        <div 
          style={{
            width: `${progressPercentage}%`,
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