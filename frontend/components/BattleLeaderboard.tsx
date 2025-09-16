Р С—Р’В»РЎвЂ”import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { LeaderboardEntry } from '../types/global';

interface BattleLeaderboardProps {
  leaderboard: LeaderboardEntry[];
  theme: 'light' | 'dark';
}

type SortType = 'level' | 'achievements' | 'balance';

export const BattleLeaderboard: React.FC<BattleLeaderboardProps> = ({ 
  leaderboard, 
  theme 
}) => {
  const [sortType, setSortType] = useState<SortType>('level');

  const getSortTypeLabel = (type: SortType) => {
    switch (type) {
      case 'level': return 'Р В Р в‚¬Р РЋР вЂљ.';
      case 'achievements': return 'Р Р†Р’ВРІР‚В¦';
      case 'balance': return 'g';
    }
  };

  const getSortValue = (entry: LeaderboardEntry, type: SortType) => {
    switch (type) {
      case 'level': return entry.level;
      case 'achievements': return entry.achievements;
      case 'balance': return entry.balance;
    }
  };

  const cycleSortType = () => {
    const types: SortType[] = ['level', 'achievements', 'balance'];
    const currentIndex = types.indexOf(sortType);
    const nextIndex = (currentIndex + 1) % types.length;
    setSortType(types[nextIndex]);
  };

  // Р В Р Р‹Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР РЋРЎвЂњР В Р’ВµР В РЎВ Р В РЎвЂ Р В Р’В±Р В Р’ВµР РЋР вЂљР В Р’ВµР В РЎВ Р В РЎС›Р В РЎвЂєР В РЎСџ-3
  const topPlayers = [...leaderboard]
    .sort((a, b) => getSortValue(b, sortType) - getSortValue(a, sortType))
    .slice(0, 3);

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return 'РЎР‚РЎСџРўС’РІР‚РЋ';
      case 2: return 'РЎР‚РЎСџРўС’РІвЂљВ¬';
      case 3: return 'РЎР‚РЎСџРўС’РІР‚В°';
      default: return 'РЎР‚РЎСџР РЏРІР‚В¦';
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
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 
            style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            Р В Р’В Р В Р’ВµР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂ“
          </h3>
          <div 
            style={{ 
              fontSize: '12px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
            }}
          >
            Р В РЎСџР В РЎвЂў {sortType === 'level' ? 'Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР вЂ№' : sortType === 'achievements' ? 'Р В Р’В°Р РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В РЎвЂќР В Р’В°Р В РЎВ' : 'Р В Р’В±Р В Р’В°Р В Р’В»Р В Р’В°Р В Р вЂ¦Р РЋР С“Р РЋРЎвЂњ'}
          </div>
        </div>
        
        <button
          onClick={cycleSortType}
          className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {topPlayers.length > 0 ? (
        <div className="space-y-2">
          {topPlayers.map((player, index) => (
            <div 
              key={player.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: '8px'
              }}
            >
              {/* Р В Р’В Р В Р’В°Р В Р вЂ¦Р В РЎвЂ“ */}
              <div style={{ fontSize: '16px' }}>
                {getRankEmoji(index + 1)}
              </div>

              {/* Р В РЎвЂ™Р В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљ */}
              <div 
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#2B82FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: 'white',
                  flexShrink: 0
                }}
              >
                {player.name.charAt(0).toUpperCase()}
              </div>

              {/* Р В Р’ВР В РЎВР РЋР РЏ */}
              <div 
                style={{
                  flex: 1,
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {player.name}
              </div>

              {/* Р В РІР‚вЂќР В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В РЎвЂќР В РЎвЂ */}
              <div 
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  minWidth: '30px',
                  textAlign: 'right'
                }}
              >
                {getSortValue(player, sortType)}{getSortTypeLabel(sortType)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div 
          style={{
            textAlign: 'center',
            padding: '20px 0',
            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
            fontSize: '14px'
          }}
        >
          Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р РЋР вЂљР В Р’ВµР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂ“Р В Р’В°
        </div>
      )}
    </div>
  );
};