import { useState } from 'react';
import { Crown, X } from './Icons';
import { Battle, BattleInvitation } from '../types/battles';
import coinIcon from 'figma:asset/29d513144bb95c08c031f3604ac2dd2e7bee6450.png';

interface PublicBattle {
  id: string; // РР·РјРµРЅСЏРµРј РЅР° string С‡С‚РѕР±С‹ СЃРѕРѕС‚РІРµС‚СЃС‚РІРѕРІР°С‚СЊ Battle.id
  originalId: string; // Р”РѕР±Р°РІР»СЏРµРј РїРѕР»Рµ РґР»СЏ РѕСЂРёРіРёРЅР°Р»СЊРЅРѕРіРѕ ID
  challenger: { name: string; status: 'winning' | 'losing' | 'neutral' };
  opponent: { name: string; status: 'winning' | 'losing' | 'neutral' };
  date: string;
  prize: number;
  status: 'active' | 'finished';
}

interface BattlesManagementProps {
  battles: Battle[];
  setBattles: (battles: Battle[]) => void;
  battleInvitations: BattleInvitation[];
  setBattleInvitations: (invitations: BattleInvitation[]) => void;
  onCompleteBattle: (battleId: string, winnerId: string) => void;
  currentUserBalance?: number;
}

export function BattlesManagement({ 
  battles, 
  setBattles, 
  battleInvitations, 
  setBattleInvitations, 
  onCompleteBattle,
  currentUserBalance = 0
}: BattlesManagementProps) {
  // РџСЂРµРѕР±СЂР°Р·СѓРµРј battles РІ С„РѕСЂРјР°С‚ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
  const displayBattles: PublicBattle[] = battles.map((battle, index) => ({
    id: `display-${battle.id}-${index}`, // РЈРЅРёРєР°Р»СЊРЅС‹Р№ display ID
    originalId: battle.id, // РЎРѕС…СЂР°РЅСЏРµРј РѕСЂРёРіРёРЅР°Р»СЊРЅС‹Р№ ID
    challenger: { 
      name: battle.challengerName, 
      status: battle.winnerId === battle.challengerId ? 'winning' : 
              battle.winnerId === battle.opponentId ? 'losing' : 'neutral' 
    },
    opponent: { 
      name: battle.opponentName, 
      status: battle.winnerId === battle.opponentId ? 'winning' : 
              battle.winnerId === battle.challengerId ? 'losing' : 'neutral' 
    },
    date: battle.startedAt.toLocaleDateString('ru-RU'),
    prize: battle.stake,
    status: battle.status === 'completed' ? 'finished' : 'active'
  }));

  const handleSetWinner = (originalId: string, winner: 'challenger' | 'opponent') => {
    const battle = battles.find(b => b.id === originalId);
    if (!battle) return;

    const winnerId = winner === 'challenger' ? battle.challengerId : battle.opponentId;
    onCompleteBattle(battle.id, winnerId);
  };

  const handleDeleteBattle = (originalId: string) => {
    const battleToDelete = battles.find(b => b.id === originalId);
    if (battleToDelete) {
      setBattles(battles.filter(b => b.id !== battleToDelete.id));
    }
  };

  const activeBattles = displayBattles.filter(b => b.status === 'active');
  const finishedBattles = displayBattles.filter(b => b.status === 'finished');

  const handleTestBattleComplete = () => {
    // РЎРѕР·РґР°РµРј С‚РµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р» Рё СЃСЂР°Р·Сѓ Р·Р°РІРµСЂС€Р°РµРј РµРіРѕ
    const testBattle: Battle = {
      id: `test-battle-${Date.now()}`,
      challengerId: 'user1', 
      challengerName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
      opponentId: 'current-user',
      opponentName: 'Р’С‹',
      stake: 100,
      status: 'active',
      startedAt: new Date()
    };
    
    // Р”РѕР±Р°РІР»СЏРµРј С‚РµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р»
    setBattles(prev => [testBattle, ...prev]);
    
    // Р—Р°РІРµСЂС€Р°РµРј РµРіРѕ С‡РµСЂРµР· СЃРµРєСѓРЅРґСѓ, РґРµР»Р°СЏ С‚РµРєСѓС‰РµРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РїРѕР±РµРґРёС‚РµР»РµРј
    setTimeout(() => {
      onCompleteBattle(testBattle.id, 'current-user');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-text">РЈРїСЂР°РІР»РµРЅРёРµ Р±Р°С‚С‚Р»Р°РјРё</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-2 rounded-lg">
            <span className="text-sm text-text-muted">Р‘Р°Р»Р°РЅСЃ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-text">{currentUserBalance}</span>
              <img 
                src={coinIcon} 
                alt="coins" 
                className="w-4 h-4"
              />
            </div>
          </div>
          <button
            onClick={handleTestBattleComplete}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            рџ§Є РўРµСЃС‚ РїРѕР±РµРґС‹ РІ Р±Р°С‚С‚Р»Рµ (+100 РєРѕРёРЅРѕРІ)
          </button>
          <div className="text-sm text-text-muted">
            РџСЂРѕСЃРјРѕС‚СЂ Рё СѓРїСЂР°РІР»РµРЅРёРµ СЂРµР·СѓР»СЊС‚Р°С‚Р°РјРё Р±Р°С‚С‚Р»РѕРІ
          </div>
        </div>
      </div>

      {/* РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹ */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium text-text mb-4">РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹ ({activeBattles.length})</h3>
        
        {activeBattles.length > 0 ? (
          <div className="space-y-4">
            {activeBattles.map((battle, index) => (
              <div
                key={battle.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-surface-2 rounded-full text-sm font-medium">
                      {battle.challenger.name}
                    </span>
                    <span className="text-text-muted text-sm">VS</span>
                    <span className="px-3 py-1 bg-surface-2 rounded-full text-sm font-medium">
                      {battle.opponent.name}
                    </span>
                  </div>
                  <div className="text-sm text-text-muted">
                    РЎС‚Р°РІРєР°: {battle.prize}g
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetWinner(battle.originalId, 'challenger')}
                    className="flex items-center gap-1 px-3 py-1 bg-chart-2 text-white rounded-lg hover:opacity-80 transition-opacity text-sm"
                    title={`${battle.challenger.name} РїРѕР±РµРґРёР»`}
                  >
                    <Crown className="w-3 h-3" />
                    {battle.challenger.name}
                  </button>
                  <button
                    onClick={() => handleSetWinner(battle.originalId, 'opponent')}
                    className="flex items-center gap-1 px-3 py-1 bg-chart-2 text-white rounded-lg hover:opacity-80 transition-opacity text-sm"
                    title={`${battle.opponent.name} РїРѕР±РµРґРёР»`}
                  >
                    <Crown className="w-3 h-3" />
                    {battle.opponent.name}
                  </button>
                  <button
                    onClick={() => handleDeleteBattle(battle.originalId)}
                    className="p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                    title="РЈРґР°Р»РёС‚СЊ Р±Р°С‚С‚Р»"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ</p>
        )}
      </div>

      {/* Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ Р±Р°С‚С‚Р»С‹ */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium text-text mb-4">Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ Р±Р°С‚С‚Р»С‹ ({finishedBattles.length})</h3>
        
        {finishedBattles.length > 0 ? (
          <div className="space-y-3">
            {finishedBattles.map((battle, index) => (
              <div
                key={battle.id}
                className="flex items-center justify-between p-3 bg-surface-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      battle.challenger.status === 'winning' 
                        ? 'bg-chart-2 text-white' 
                        : 'bg-destructive text-destructive-foreground'
                    }`}
                  >
                    {battle.challenger.name}
                  </span>
                  <span className="text-text-muted text-sm">VS</span>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      battle.opponent.status === 'winning' 
                        ? 'bg-chart-2 text-white' 
                        : 'bg-destructive text-destructive-foreground'
                    }`}
                  >
                    {battle.opponent.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm text-text-muted">
                    РЎС‚Р°РІРєР°: {battle.prize}g
                  </div>
                  <div className="text-sm text-text-muted">
                    {battle.date}
                  </div>
                  <button
                    onClick={() => handleDeleteBattle(battle.originalId)}
                    className="p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                    title="РЈРґР°Р»РёС‚СЊ РёР· РёСЃС‚РѕСЂРёРё"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">РќРµС‚ Р·Р°РІРµСЂС€РµРЅРЅС‹С… Р±Р°С‚С‚Р»РѕРІ</p>
        )}
      </div>
    </div>
  );
}
