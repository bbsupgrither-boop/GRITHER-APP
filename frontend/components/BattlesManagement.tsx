п»їimport { useState } from 'react';
import { Crown, X } from './Icons';
import { Battle, BattleInvitation } from '../types/battles';
import coinIcon from 'figma:asset/29d513144bb95c08c031f3604ac2dd2e7bee6450.png';

interface PublicBattle {
  id: string; // Р ВР В·Р СР ВµР Р…РЎРЏР ВµР С Р Р…Р В° string РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ РЎРѓР С•Р С•РЎвЂљР Р†Р ВµРЎвЂљРЎРѓРЎвЂљР Р†Р С•Р Р†Р В°РЎвЂљРЎРЉ Battle.id
  originalId: string; // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С Р С—Р С•Р В»Р Вµ Р Т‘Р В»РЎРЏ Р С•РЎР‚Р С‘Р С–Р С‘Р Р…Р В°Р В»РЎРЉР Р…Р С•Р С–Р С• ID
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
  // Р СџРЎР‚Р ВµР С•Р В±РЎР‚Р В°Р В·РЎС“Р ВµР С battles Р Р† РЎвЂћР С•РЎР‚Р СР В°РЎвЂљ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ
  const displayBattles: PublicBattle[] = battles.map((battle, index) => ({
    id: `display-${battle.id}-${index}`, // Р Р€Р Р…Р С‘Р С”Р В°Р В»РЎРЉР Р…РЎвЂ№Р в„– display ID
    originalId: battle.id, // Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…РЎРЏР ВµР С Р С•РЎР‚Р С‘Р С–Р С‘Р Р…Р В°Р В»РЎРЉР Р…РЎвЂ№Р в„– ID
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
    // Р РЋР С•Р В·Р Т‘Р В°Р ВµР С РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В» Р С‘ РЎРѓРЎР‚Р В°Р В·РЎС“ Р В·Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р В°Р ВµР С Р ВµР С–Р С•
    const testBattle: Battle = {
      id: `test-battle-${Date.now()}`,
      challengerId: 'user1', 
      challengerName: 'Р С’Р Р…Р Р…Р В° Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°',
      opponentId: 'current-user',
      opponentName: 'Р вЂ™РЎвЂ№',
      stake: 100,
      status: 'active',
      startedAt: new Date()
    };
    
    // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В»
    setBattles(prev => [testBattle, ...prev]);
    
    // Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р В°Р ВµР С Р ВµР С–Р С• РЎвЂЎР ВµРЎР‚Р ВµР В· РЎРѓР ВµР С”РЎС“Р Р…Р Т‘РЎС“, Р Т‘Р ВµР В»Р В°РЎРЏ РЎвЂљР ВµР С”РЎС“РЎвЂ°Р ВµР С–Р С• Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ Р С—Р С•Р В±Р ВµР Т‘Р С‘РЎвЂљР ВµР В»Р ВµР С
    setTimeout(() => {
      onCompleteBattle(testBattle.id, 'current-user');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-text">Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»Р В°Р СР С‘</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-2 rounded-lg">
            <span className="text-sm text-text-muted">Р вЂР В°Р В»Р В°Р Р…РЎРѓ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ:</span>
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
            СЂСџВ§Р„ Р СћР ВµРЎРѓРЎвЂљ Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№ Р Р† Р В±Р В°РЎвЂљРЎвЂљР В»Р Вµ (+100 Р С”Р С•Р С‘Р Р…Р С•Р Р†)
          </button>
          <div className="text-sm text-text-muted">
            Р СџРЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ Р С‘ РЎС“Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ РЎР‚Р ВµР В·РЎС“Р В»РЎРЉРЎвЂљР В°РЎвЂљР В°Р СР С‘ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
          </div>
        </div>
      </div>

      {/* Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№ */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium text-text mb-4">Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№ ({activeBattles.length})</h3>
        
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
                    Р РЋРЎвЂљР В°Р Р†Р С”Р В°: {battle.prize}g
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSetWinner(battle.originalId, 'challenger')}
                    className="flex items-center gap-1 px-3 py-1 bg-chart-2 text-white rounded-lg hover:opacity-80 transition-opacity text-sm"
                    title={`${battle.challenger.name} Р С—Р С•Р В±Р ВµР Т‘Р С‘Р В»`}
                  >
                    <Crown className="w-3 h-3" />
                    {battle.challenger.name}
                  </button>
                  <button
                    onClick={() => handleSetWinner(battle.originalId, 'opponent')}
                    className="flex items-center gap-1 px-3 py-1 bg-chart-2 text-white rounded-lg hover:opacity-80 transition-opacity text-sm"
                    title={`${battle.opponent.name} Р С—Р С•Р В±Р ВµР Т‘Р С‘Р В»`}
                  >
                    <Crown className="w-3 h-3" />
                    {battle.opponent.name}
                  </button>
                  <button
                    onClick={() => handleDeleteBattle(battle.originalId)}
                    className="p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                    title="Р Р€Р Т‘Р В°Р В»Р С‘РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†</p>
        )}
      </div>

      {/* Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№ */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium text-text mb-4">Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№ ({finishedBattles.length})</h3>
        
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
                    Р РЋРЎвЂљР В°Р Р†Р С”Р В°: {battle.prize}g
                  </div>
                  <div className="text-sm text-text-muted">
                    {battle.date}
                  </div>
                  <button
                    onClick={() => handleDeleteBattle(battle.originalId)}
                    className="p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors"
                    title="Р Р€Р Т‘Р В°Р В»Р С‘РЎвЂљРЎРЉ Р С‘Р В· Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘Р С‘"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">Р СњР ВµРЎвЂљ Р В·Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†</p>
        )}
      </div>
    </div>
  );
}
