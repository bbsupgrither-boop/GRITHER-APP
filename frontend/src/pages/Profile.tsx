import React, { useState } from 'react';
import { User, Edit3, Eye, UserIcon } from 'lucide-react';
import { safeString, safeNumber } from '../shared/utils';
import './profile.css';

// AUTOGEN START profile
export default function Profile({ theme, user, setUser, battles = [], leaderboard = [] }: any) {
  const [showBattlesModal, setShowBattlesModal] = useState(false);

  // Mock data for battles
  const mockBattles = [
    {
      id: '1',
      opponentName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
      opponentTeam: 'Team 1',
      status: 'defeat',
      statusText: 'РџРѕСЂР°Р¶РµРЅРёРµ',
      stake: '150',
      date: '25.12.2024'
    },
    {
      id: '2',
      opponentName: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°',
      opponentTeam: 'Team 1',
      status: 'win',
      statusText: 'РџРѕР±РµРґР°',
      stake: '200',
      date: '20.12.2024'
    },
    {
      id: '3',
      opponentName: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°',
      opponentTeam: 'Team 1',
      status: 'active',
      statusText: 'Р’ РїСЂРѕС†РµСЃСЃРµ',
      stake: '250',
      date: '15.12.2024'
    }
  ];

  const userName = safeString(user?.name, 'Р’С‹');
  const userLevel = safeNumber(user?.level, 1);
  const userCoins = safeString(user?.gCoins, '1000');
  const userExperience = safeNumber(user?.experience, 0);

  const getUserStatus = (level: number) => {
    if (level >= 20) return 'РњР°СЃС‚РµСЂ';
    if (level >= 15) return 'Р­РєСЃРїРµСЂС‚';
    if (level >= 10) return 'РћРїС‹С‚РЅС‹Р№';
    if (level >= 5) return 'РџСЂРѕРґРІРёРЅСѓС‚С‹Р№';
    return 'РќРѕРІРёС‡РѕРє';
  };

  const userStatus = getUserStatus(userLevel);
  const wins = mockBattles.filter(b => b.status === 'win').length;
  const achievementsCount = safeNumber(user?.achievements?.length, 0);

  return (
    <div className="py-4">
      {/* Profile Header with Avatar and Info Card */}
      <div className="glass-card p-6 mb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <button className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center" aria-label="Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ С„РѕС‚Рѕ">
              <Edit3 className="w-3 h-3 text-gray-600" />
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">@user</p>
          </div>

          {/* Info Card */}
          <div className="flex-1">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">current-user</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">РРјСЏ:</span>
                <span className="font-medium">{userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р”Р :</span>
                <span className="placeholder-text">вЂ”вЂ”</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р”РѕР»Р¶РЅРѕСЃС‚СЊ:</span>
                <span className="placeholder-text">вЂ”вЂ”</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">РљРѕРјР°РЅРґР°:</span>
                <span className="placeholder-text">вЂ”вЂ”</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">РЎС‚Р°Р¶:</span>
                <span className="placeholder-text">вЂ”вЂ”</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">РўРёРјР»РёРґ:</span>
                <span className="placeholder-text">вЂ”вЂ”</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р РµРіРёСЃС‚СЂР°С†РёСЏ:</span>
                <span className="placeholder-text">вЂ”вЂ”</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Battles Section */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="unified-heading">РњРѕРё Р±Р°С‚С‚Р»С‹</h2>
          <button
            onClick={() => setShowBattlesModal(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="РџРѕРєР°Р·Р°С‚СЊ РІСЃРµ Р±Р°С‚С‚Р»С‹"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {mockBattles.map((battle) => (
            <div
              key={battle.id}
              className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="unified-text font-medium">{battle.opponentName}</p>
                  <p className="unified-text text-sm text-muted-foreground">{battle.opponentTeam}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  {battle.status === 'defeat' && <span className="text-red-500">рџ”ґ</span>}
                  {battle.status === 'win' && <span className="text-green-500">рџџў</span>}
                  {battle.status === 'active' && <span className="text-blue-500">рџ”µ</span>}
                  <span className={`unified-text text-sm font-medium ${
                    battle.status === 'defeat' ? 'text-red-500' :
                    battle.status === 'win' ? 'text-green-500' :
                    'text-blue-500'
                  }`}>
                    {battle.statusText}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="unified-text text-sm">{battle.stake}</span>
                  <span className="text-yellow-500">рџ’°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="unified-text">РЎС‚Р°С‚СѓСЃ: {userStatus}</span>
          <span className="unified-text">XP: {userExperience}</span>
          <span className="unified-text">lvl {userLevel}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="unified-text text-muted-foreground mb-1">РџРѕР±РµРґ</p>
          <p className="unified-heading">{wins}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="unified-text text-muted-foreground mb-1">Р‘Р°Р»Р°РЅСЃ</p>
          <div className="flex items-center justify-center gap-1">
            <span className="unified-heading">{userCoins}</span>
            <span className="text-yellow-500">рџ’°</span>
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="unified-text text-muted-foreground mb-1">РђС‡РёРІРєРё</p>
          <span className="placeholder-text">вЂ”вЂ”</span>
        </div>
      </div>

      {/* Battles Modal */}
      {showBattlesModal && (
        <div className="modal-backdrop open" onClick={() => setShowBattlesModal(false)}>
          <div className="modal" style={{ maxWidth: '90vw', width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="unified-heading">Р’СЃРµ РјРѕРё Р±Р°С‚С‚Р»С‹</h2>
                <button
                  onClick={() => setShowBattlesModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Р—Р°РєСЂС‹С‚СЊ"
                >
                  вњ•
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockBattles.map((battle) => (
                  <div key={battle.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="unified-text font-medium">{battle.opponentName}</p>
                        <p className="unified-text text-sm text-muted-foreground">{battle.opponentTeam}</p>
                        <p className="unified-text text-xs text-muted-foreground">{battle.date}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {battle.status === 'defeat' && <span className="text-red-500">рџ”ґ</span>}
                        {battle.status === 'win' && <span className="text-green-500">рџџў</span>}
                        {battle.status === 'active' && <span className="text-blue-500">рџ”µ</span>}
                        <span className={`unified-text text-sm font-medium ${
                          battle.status === 'defeat' ? 'text-red-500' :
                          battle.status === 'win' ? 'text-green-500' :
                          'text-blue-500'
                        }`}>
                          {battle.statusText}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="unified-text text-sm">{battle.stake}</span>
                        <span className="text-yellow-500">рџ’°</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// AUTOGEN END profile