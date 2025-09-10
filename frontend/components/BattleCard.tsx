import { Plus } from 'lucide-react';
import { Battle, BattleInvitation } from '../types/battles';

interface BattleCardProps {
  battles: Battle[];
  invitations: BattleInvitation[];
  onShowAllBattles: () => void;
  onCreateBattle: () => void;
  theme?: 'light' | 'dark';
}

export function BattleCard({ 
  battles, 
  invitations, 
  onShowAllBattles, 
  onCreateBattle, 
  theme = 'light' 
}: BattleCardProps) {
  const activeBattles = battles.filter(b => b.status === 'active');
  const pendingInvitations = invitations.filter(i => i.status === 'pending');
  const totalCount = activeBattles.length + pendingInvitations.length;

  return (
    <div 
      className="cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.96]"
      onClick={onShowAllBattles}
      style={{
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderRadius: '20px',
        border: theme === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.06)' 
          : '1px solid #E6E9EF',
        boxShadow: theme === 'dark' 
          ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
          : '0 8px 24px rgba(0, 0, 0, 0.10)',
        position: 'relative'
      }}
    >
      {/* Р—Р°РіРѕР»РѕРІРѕРє */}
      <div className="relative p-4 pb-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCreateBattle();
          }}
          className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-105"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' 
              : '#FFFFFF',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.2)' 
              : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 4px 15px rgba(255, 255, 255, 0.2)' 
              : '0 2px 8px rgba(0, 0, 0, 0.06)',
            zIndex: 30
          }}
        >
          <Plus 
            style={{
              width: '14px',
              height: '14px',
              color: theme === 'dark' ? '#1A1A1A' : '#6B7280'
            }}
          />
        </button>
        <div className="text-center" style={{ marginTop: '-2px' }}>
          <h3 
            className="font-medium"
            style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '18px',
              lineHeight: '23.62px'
            }}
          >
            Р‘Р°С‚С‚Р»С‹
          </h3>
        </div>
      </div>

      {/* РљРѕРЅС‚РµРЅС‚ */}
      <div className="space-y-3 px-4 pb-4" style={{ marginTop: '16px' }}>
        {/* РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹ */}
        {activeBattles.length > 0 && (
          <div>
            <div 
              className="text-xs font-medium mb-2"
              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
            >
              РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹
            </div>
            
            <div className="space-y-2">
              {activeBattles.slice(0, 2).map((battle) => (
                <div
                  key={battle.id}
                  className="flex items-center py-2 px-3 rounded-xl"
                  style={{
                    background: theme === 'dark' 
                      ? 'rgba(43, 130, 255, 0.1)' 
                      : 'rgba(43, 130, 255, 0.05)',
                    border: theme === 'dark' 
                      ? '1px solid rgba(43, 130, 255, 0.2)' 
                      : '1px solid rgba(43, 130, 255, 0.15)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-medium"
                      style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                    >
                      {battle.challengerName}
                    </span>
                    <span 
                      className="text-xs"
                      style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                    >
                      VS
                    </span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                    >
                      {battle.opponentName}
                    </span>
                  </div>
                </div>
              ))}
              
              {activeBattles.length > 2 && (
                <div 
                  className="text-xs text-center py-1"
                  style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                >
                  +{activeBattles.length - 2} РµС‰Рµ
                </div>
              )}
            </div>
          </div>
        )}

        {/* РџСЂРёРіР»Р°С€РµРЅРёСЏ */}
        {pendingInvitations.length > 0 && (
          <div>
            <div 
              className="text-xs font-medium mb-2"
              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
            >
              РџСЂРёРіР»Р°С€РµРЅРёСЏ
            </div>
            
            <div className="space-y-2">
              {pendingInvitations.slice(0, 2).map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center py-2 px-3 rounded-xl"
                  style={{
                    background: theme === 'dark' 
                      ? 'rgba(255, 159, 10, 0.1)' 
                      : 'rgba(255, 159, 10, 0.05)',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 159, 10, 0.2)' 
                      : '1px solid rgba(255, 159, 10, 0.15)'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-medium"
                      style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                    >
                      {invitation.challengerName}
                    </span>
                    <span 
                      className="text-xs"
                      style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                    >
                      РІС‹Р·С‹РІР°РµС‚
                    </span>
                  </div>
                </div>
              ))}
              
              {pendingInvitations.length > 2 && (
                <div 
                  className="text-xs text-center py-1"
                  style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                >
                  +{pendingInvitations.length - 2} РµС‰Рµ
                </div>
              )}
            </div>
          </div>
        )}

        {/* РџСѓСЃС‚РѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ */}
        {totalCount === 0 && (
          <div className="text-center py-6">
            <div 
              className="text-2xl mb-2"
              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
            >
              вљ”пёЏ
            </div>
            <p 
              className="text-xs"
              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
            >
              РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ
            </p>
            <p 
              className="text-xs mt-1"
              style={{ color: theme === 'dark' ? '#6B7280' : '#9CA3AF' }}
            >
              РќР°Р¶РјРёС‚Рµ + С‡С‚РѕР±С‹ СЃРѕР·РґР°С‚СЊ РІС‹Р·РѕРІ
            </p>
          </div>
        )}

        {/* РЎС‡РµС‚С‡РёРє РІРЅРёР·Сѓ */}
        {totalCount > 0 && (
          <div 
            className="text-xs text-center pt-2 border-t"
            style={{ 
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              borderColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.06)' 
                : 'rgba(0, 0, 0, 0.1)'
            }}
          >
            Р’СЃРµРіРѕ: {totalCount} {totalCount === 1 ? 'Р±Р°С‚С‚Р»' : 'Р±Р°С‚С‚Р»РѕРІ'}
          </div>
        )}
      </div>
    </div>
  );
}
