Р С—Р’В»РЎвЂ”import React from 'react';
import { Eye } from 'lucide-react';
import { Achievement } from '../types/achievements';

interface AchievementBlockProps {
  achievements: Achievement[];
  theme: 'light' | 'dark';
  onViewAll?: () => void;
}

export const AchievementBlock: React.FC<AchievementBlockProps> = ({ 
  achievements, 
  theme, 
  onViewAll 
}) => {
  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р В Р’ВµР В РЎВ Р В РЎС›Р В РЎвЂєР В РЎСџ-3 Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р вЂ  Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚В Р В Р’ВµР РЋР С“Р РЋР С“Р В Р’Вµ Р В Р вЂ Р РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
  const inProgressAchievements = achievements
    .filter(achievement => !achievement.unlocked && achievement.requirements.current > 0)
    .slice(0, 3);

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return '#fbbf24';
      case 'epic': return '#a855f7';
      case 'rare': return '#3b82f6';
      case 'common': 
      default: return '#2B82FF';
    }
  };

  const getRarityIcon = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': return 'РЎР‚РЎСџРІР‚ВРІР‚В';
      case 'epic': return 'РЎР‚РЎСџРІР‚в„ўРЎС™';
      case 'rare': return 'РЎР‚РЎСџРІР‚СњР’Вµ';
      case 'common':
      default: return 'Р Р†Р’В­РЎвЂ™';
    }
  };

  return (
    <div 
      className="glass-card p-4"
      style={{
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 
          style={{ 
            fontSize: '16px', 
            fontWeight: 'bold',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          Р В РІР‚в„ўР В Р’В°Р РЋРІвЂљВ¬Р В РЎвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
        </h3>
        
        <button
          onClick={onViewAll}
          className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {inProgressAchievements.length > 0 ? (
        <div className="space-y-3">
          {inProgressAchievements.map((achievement) => {
            const progressPercentage = (achievement.requirements.current / achievement.requirements.target) * 100;
            
            return (
              <div 
                key={achievement.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  borderRadius: '12px',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                }}
              >
                {/* Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В° Р В Р вЂ  Р РЋРІР‚В Р В Р вЂ Р В Р’ВµР РЋРІР‚С™Р В Р вЂ¦Р В РЎвЂўР В РЎВ Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В Р’В¶Р В РЎвЂќР В Р’Вµ */}
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: getRarityColor(achievement.rarity),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0
                  }}
                >
                  {getRarityIcon(achievement.rarity)}
                </div>

                {/* Р В Р’ВР В Р вЂ¦Р РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РЎвЂў Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РЎвЂ */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {achievement.title}
                  </h4>
                  
                  {/* Р В РЎСџР РЋР вЂљР В РЎвЂўР В РЎвЂ“Р РЋР вЂљР В Р’ВµР РЋР С“Р РЋР С“-Р В Р’В±Р В Р’В°Р РЋР вЂљ */}
                  <div 
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{
                        width: `${progressPercentage}%`,
                        height: '100%',
                        backgroundColor: getRarityColor(achievement.rarity),
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™ Р В Р вЂ Р РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
                <div 
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: getRarityColor(achievement.rarity),
                    minWidth: '35px',
                    textAlign: 'right'
                  }}
                >
                  {Math.round(progressPercentage)}%
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div 
          style={{
            textAlign: 'center',
            padding: '20px',
            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
            fontSize: '14px'
          }}
        >
          Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В Р вЂ  Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚В Р В Р’ВµР РЋР С“Р РЋР С“Р В Р’Вµ
        </div>
      )}
    </div>
  );
};