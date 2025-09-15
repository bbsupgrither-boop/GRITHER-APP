п»їimport React from 'react';
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
          Р‘Р°С‚С‚Р»С‹
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
          {/* РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹ */}
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
              {battle.participants[0]?.name || 'РРіСЂРѕРє 1'} vs {battle.participants[1]?.name || 'РРіСЂРѕРє 2'}
            </div>
          ))}

          {/* РџСЂРёРіР»Р°С€РµРЅРёСЏ */}
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
              {invitation.from?.name || 'РРіСЂРѕРє'} РІС‹Р·С‹РІР°РµС‚
            </div>
          ))}

          {/* РџРѕРєР°Р·Р°С‚СЊ Р±РѕР»СЊС€Рµ */}
          {(activeBattles.length > 2 || pendingInvitations.length > 2) && (
            <div 
              style={{
                fontSize: '12px',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                textAlign: 'center',
                padding: '4px'
              }}
            >
              +{Math.max(0, activeBattles.length - 2) + Math.max(0, pendingInvitations.length - 2)} РµС‰Рµ
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
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>вљ”пёЏ</div>
          <div style={{ fontSize: '14px', marginBottom: '4px' }}>РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ</div>
          <div style={{ fontSize: '12px' }}>РќР°Р¶РјРёС‚Рµ + С‡С‚РѕР±С‹ СЃРѕР·РґР°С‚СЊ РІС‹Р·РѕРІ</div>
        </div>
      )}
    </div>
  );
};