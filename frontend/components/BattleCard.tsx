Р С—Р’В»РЎвЂ”import React from 'react';
import { Plus, Sword } from 'lucide-react';
import { Battle, BattleInvitation } from '../types/battles';

interface BattleCardProps {
  battles: Battle[];
  invitations: BattleInvitation[];
  theme: 'light' | 'dark';
  onCreateBattle?: () => void;
  onViewAll?: () => void;
}

export const BattleCard: React.FC<BattleCardProps> = ({ 
  battles, 
  invitations, 
  theme, 
  onCreateBattle,
  onViewAll 
}) => {
  const activeBattles = battles.filter(battle => battle.status === 'active');
  const pendingInvitations = invitations.filter(invitation => invitation.status === 'pending');

  return (
    <div 
      className="glass-card p-4 cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.96]"
      onClick={onViewAll}
      style={{
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 
          style={{ 
            fontSize: '16px', 
            fontWeight: 'bold',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–
        </h3>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCreateBattle?.();
          }}
          className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {(activeBattles.length > 0 || pendingInvitations.length > 0) ? (
        <div className="space-y-2">
          {/* Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„– */}
          {activeBattles.slice(0, 2).map((battle) => (
            <div 
              key={battle.id}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(43, 130, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              {battle.participants[0]?.name || 'Р В Р’ВР В РЎвЂ“Р РЋР вЂљР В РЎвЂўР В РЎвЂќ 1'} vs {battle.participants[1]?.name || 'Р В Р’ВР В РЎвЂ“Р РЋР вЂљР В РЎвЂўР В РЎвЂќ 2'}
            </div>
          ))}

          {/* Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂ“Р В Р’В»Р В Р’В°Р РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
          {pendingInvitations.slice(0, 2 - activeBattles.length).map((invitation) => (
            <div 
              key={invitation.id}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(255, 159, 10, 0.1)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              {invitation.from?.name || 'Р В Р’ВР В РЎвЂ“Р РЋР вЂљР В РЎвЂўР В РЎвЂќ'} Р В Р вЂ Р РЋРІР‚в„–Р В Р’В·Р РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР РЋРІР‚С™
            </div>
          ))}

          {/* Р В РЎСџР В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋРІвЂљВ¬Р В Р’Вµ */}
          {(activeBattles.length > 2 || pendingInvitations.length > 2) && (
            <div 
              style={{
                fontSize: '12px',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                textAlign: 'center',
                padding: '4px'
              }}
            >
              +{Math.max(0, activeBattles.length - 2) + Math.max(0, pendingInvitations.length - 2)} Р В Р’ВµР РЋРІР‚В°Р В Р’Вµ
            </div>
          )}
        </div>
      ) : (
        <div 
          style={{
            textAlign: 'center',
            padding: '20px 0',
            color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>Р Р†РЎв„ўРІР‚СњР С—РЎвЂР РЏ</div>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ </div>
          <div style={{ fontSize: '12px' }}>Р В РЎСљР В Р’В°Р В Р’В¶Р В РЎВР В РЎвЂР РЋРІР‚С™Р В Р’Вµ + Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂўР В Р’В±Р РЋРІР‚в„– Р РЋР С“Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ Р РЋРІР‚в„–Р В Р’В·Р В РЎвЂўР В Р вЂ </div>
        </div>
      )}
    </div>
  );
};