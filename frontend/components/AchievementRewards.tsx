Р С—Р’В»РЎвЂ”import React from 'react';
import { Eye, Trophy } from 'lucide-react';
import { Achievement } from '../types/achievements';

interface AchievementRewardsProps {
  achievements: Achievement[];
  theme: 'light' | 'dark';
  onViewAll?: () => void;
}

export const AchievementRewards: React.FC<AchievementRewardsProps> = ({ 
  achievements, 
  theme, 
  onViewAll 
}) => {
  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂ”Р В РЎвЂўР РЋР С“Р В Р’В»Р В Р’ВµР В РўвЂР В Р вЂ¦Р В РЎвЂР В Р’Вµ 5 Р РЋР вЂљР В Р’В°Р В Р’В·Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќР В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
  const unlockedAchievements = achievements
    .filter(achievement => achievement.unlocked)
    .slice(-5);

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р РЋР РЏР В Р’ВµР В РЎВ Р В РўвЂР В РЎвЂў 5 Р РЋР С“Р В Р’В»Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂўР В Р вЂ  (Р В РЎвЂ”Р РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р РЋРІР‚в„–Р В Р’Вµ Р РЋР С“Р В Р’В»Р В РЎвЂўР РЋРІР‚С™Р РЋРІР‚в„– Р В Р вЂ  Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚В Р В Р’Вµ)
  const slots = [...unlockedAchievements];
  while (slots.length < 5) {
    slots.push(null);
  }

  const getRarityGradient = (rarity?: string) => {
    switch (rarity) {
      case 'legendary': 
        return 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)';
      case 'epic': 
        return 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)';
      case 'rare': 
        return 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
      case 'common':
      default: 
        return 'linear-gradient(135deg, #2B82FF 0%, #1E40AF 100%)';
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
          Р В РЎвЂ™Р РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В РЎвЂќР В РЎвЂ
        </h3>
        
        <button
          onClick={onViewAll}
          className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {slots.map((achievement, index) => (
          <div
            key={index}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              position: 'relative'
            }}
          >
            {achievement ? (
              <>
                {/* Р В РІР‚СљР РЋР вЂљР В Р’В°Р В РўвЂР В РЎвЂР В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋРІР‚С›Р В РЎвЂўР В Р вЂ¦ */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: getRarityGradient(achievement.rarity),
                    zIndex: 1
                  }}
                />
                
                {/* Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В° */}
                <div 
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                  }}
                >
                  {getRarityIcon(achievement.rarity)}
                </div>
              </>
            ) : (
              <>
                {/* Р В РЎСџР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В РІвЂћвЂ“ Р РЋР С“Р В Р’В»Р В РЎвЂўР РЋРІР‚С™ */}
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: `2px dashed ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                  }}
                >
                  <Trophy 
                    size={20} 
                    color={theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {unlockedAchievements.length === 0 && (
        <div 
          style={{
            textAlign: 'center',
            marginTop: '12px',
            fontSize: '12px',
            color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
          }}
        >
          Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р РЋР вЂљР В Р’В°Р В Р’В·Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќР В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
        </div>
      )}
    </div>
  );
};