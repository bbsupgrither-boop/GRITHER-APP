import React from 'react';
import { X } from 'lucide-react';
import { getCurrentLevelProgress } from '../data/levels';
import { CoinIcon } from './CoinIcon';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentExperience: number;
  theme: 'light' | 'dark';
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  currentExperience,
  theme
}) => {
  if (!isOpen) return null;

  const levelData = getCurrentLevelProgress(currentExperience);
  
  if (!levelData) return null;

  const { level, progress, nextLevel } = levelData;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '320px',
          width: '100%',
          border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          boxShadow: theme === 'dark' 
            ? '0 20px 40px rgba(0, 0, 0, 0.8)' 
            : '0 20px 40px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              margin: 0
            }}
          >
            Текущий уровень
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar with Star */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            {/* Star with Level */}
            <div
              style={{
                width: '48px',
                height: '48px',
                border: `2px solid ${theme === 'dark' ? '#E8ECF2' : '#0F172A'}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                position: 'relative'
              }}
            >
              {/* Star Shape */}
              <div
                style={{
                  position: 'absolute',
                  width: '32px',
                  height: '32px',
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${theme === 'dark' ? '#E8ECF2' : '#0F172A'}'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E") no-repeat center`,
                  backgroundSize: 'contain'
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  zIndex: 1
                }}
              >
                {level.level}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ flex: 1 }}>
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
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #2B82FF 0%, #40A0FF 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  marginTop: '4px',
                  textAlign: 'center'
                }}
              >
                {nextLevel ? `${currentExperience - level.totalExperience}/${nextLevel.experienceRequired} XP` : 'Максимальный уровень'}
              </div>
            </div>
          </div>
        </div>

        {/* Next Level Info */}
        {nextLevel && (
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                marginBottom: '12px'
              }}
            >
              На следующем уровне:
            </h3>
            
            <div style={{ marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                Статус: 
              </span>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  marginLeft: '8px'
                }}
              >
                {nextLevel.status}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                Награда: 
              </span>
              <CoinIcon size={16} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                {nextLevel.reward}G
              </span>
            </div>
          </div>
        )}

        {/* Motivational Text */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: theme === 'dark' ? 'rgba(43, 130, 255, 0.1)' : 'rgba(43, 130, 255, 0.05)',
            borderRadius: '8px',
            border: `1px solid ${theme === 'dark' ? 'rgba(43, 130, 255, 0.2)' : 'rgba(43, 130, 255, 0.1)'}`
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              margin: 0,
              lineHeight: '1.4'
            }}
          >
            Получайте опыт за выполнение задач, участие в баттлах и достижение целей!
          </p>
        </div>
      </div>
    </div>
  );
};
