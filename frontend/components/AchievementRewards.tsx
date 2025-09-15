п»їimport React from 'react';
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
  // РџРѕР»СѓС‡Р°РµРј РїРѕСЃР»РµРґРЅРёРµ 5 СЂР°Р·Р±Р»РѕРєРёСЂРѕРІР°РЅРЅС‹С… РґРѕСЃС‚РёР¶РµРЅРёР№
  const unlockedAchievements = achievements
    .filter(achievement => achievement.unlocked)
    .slice(-5);

  // Р—Р°РїРѕР»РЅСЏРµРј РґРѕ 5 СЃР»РѕС‚РѕРІ (РїСѓСЃС‚С‹Рµ СЃР»РѕС‚С‹ РІ РєРѕРЅС†Рµ)
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
      case 'legendary': return 'рџ‘‘';
      case 'epic': return 'рџ’њ';
      case 'rare': return 'рџ”µ';
      case 'common':
      default: return 'в­ђ';
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
          РђС‡РёРІРєРё
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
                {/* Р“СЂР°РґРёРµРЅС‚РЅС‹Р№ С„РѕРЅ */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: getRarityGradient(achievement.rarity),
                    zIndex: 1
                  }}
                />
                
                {/* РРєРѕРЅРєР° */}
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
                {/* РџСѓСЃС‚РѕР№ СЃР»РѕС‚ */}
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
          РќРµС‚ СЂР°Р·Р±Р»РѕРєРёСЂРѕРІР°РЅРЅС‹С… РґРѕСЃС‚РёР¶РµРЅРёР№
        </div>
      )}
    </div>
  );
};