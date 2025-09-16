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
      opponentName: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°',
      opponentTeam: 'Team 1',
      status: 'defeat',
      statusText: 'Р В РЎСџР В РЎвЂўР РЋР вЂљР В Р’В°Р В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ',
      stake: '150',
      date: '25.12.2024'
    },
    {
      id: '2',
      opponentName: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°',
      opponentTeam: 'Team 1',
      status: 'win',
      statusText: 'Р В РЎСџР В РЎвЂўР В Р’В±Р В Р’ВµР В РўвЂР В Р’В°',
      stake: '200',
      date: '20.12.2024'
    },
    {
      id: '3',
      opponentName: 'Р В РІР‚СћР В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р’В° Р В РЎС™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°',
      opponentTeam: 'Team 1',
      status: 'active',
      statusText: 'Р В РІР‚в„ў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚В Р В Р’ВµР РЋР С“Р РЋР С“Р В Р’Вµ',
      stake: '250',
      date: '15.12.2024'
    }
  ];

  const userName = safeString(user?.name, 'Р В РІР‚в„ўР РЋРІР‚в„–');
  const userLevel = safeNumber(user?.level, 1);
  const userCoins = safeString(user?.gCoins, '1000');
  const userExperience = safeNumber(user?.experience, 0);

  const getUserStatus = (level: number) => {
    if (level >= 20) return 'Р В РЎС™Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ';
    if (level >= 15) return 'Р В Р’В­Р В РЎвЂќР РЋР С“Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР РЋРІР‚С™';
    if (level >= 10) return 'Р В РЎвЂєР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“';
    if (level >= 5) return 'Р В РЎСџР РЋР вЂљР В РЎвЂўР В РўвЂР В Р вЂ Р В РЎвЂР В Р вЂ¦Р РЋРЎвЂњР РЋРІР‚С™Р РЋРІР‚в„–Р В РІвЂћвЂ“';
    return 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚РЋР В РЎвЂўР В РЎвЂќ';
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
            <button className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center" aria-label="Р В Р’В Р В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р РЋРІР‚С›Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂў">
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
                <span className="text-muted-foreground">Р В Р’ВР В РЎВР РЋР РЏ:</span>
                <span className="font-medium">{userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р В РІР‚СњР В Р’В :</span>
                <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р В РІР‚СњР В РЎвЂўР В Р’В»Р В Р’В¶Р В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋР Р‰:</span>
                <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В°:</span>
                <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р В Р’В¶:</span>
                <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р В РЎС›Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ:</span>
                <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Р В Р’В Р В Р’ВµР В РЎвЂ“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ:</span>
                <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Battles Section */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="unified-heading">Р В РЎС™Р В РЎвЂўР В РЎвЂ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–</h2>
          <button
            onClick={() => setShowBattlesModal(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Р В РЎСџР В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ Р РЋР С“Р В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–"
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
                  {battle.status === 'defeat' && <span className="text-red-500">РЎР‚РЎСџРІР‚СњРўвЂ</span>}
                  {battle.status === 'win' && <span className="text-green-500">РЎР‚РЎСџРЎСџРЎС›</span>}
                  {battle.status === 'active' && <span className="text-blue-500">РЎР‚РЎСџРІР‚СњР’Вµ</span>}
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
                  <span className="text-yellow-500">РЎР‚РЎСџРІР‚в„ўР’В°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="unified-text">Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“: {userStatus}</span>
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
          <p className="unified-text text-muted-foreground mb-1">Р В РЎСџР В РЎвЂўР В Р’В±Р В Р’ВµР В РўвЂ</p>
          <p className="unified-heading">{wins}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="unified-text text-muted-foreground mb-1">Р В РІР‚ВР В Р’В°Р В Р’В»Р В Р’В°Р В Р вЂ¦Р РЋР С“</p>
          <div className="flex items-center justify-center gap-1">
            <span className="unified-heading">{userCoins}</span>
            <span className="text-yellow-500">РЎР‚РЎСџРІР‚в„ўР’В°</span>
          </div>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="unified-text text-muted-foreground mb-1">Р В РЎвЂ™Р РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В РЎвЂќР В РЎвЂ</p>
          <span className="placeholder-text">Р Р†Р вЂљРІР‚СњР Р†Р вЂљРІР‚Сњ</span>
        </div>
      </div>

      {/* Battles Modal */}
      {showBattlesModal && (
        <div className="modal-backdrop open" onClick={() => setShowBattlesModal(false)}>
          <div className="modal" style={{ maxWidth: '90vw', width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="unified-heading">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎВР В РЎвЂўР В РЎвЂ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–</h2>
                <button
                  onClick={() => setShowBattlesModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Р В РІР‚вЂќР В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰"
                >
                  Р Р†РЎС™РІР‚Сћ
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
                        {battle.status === 'defeat' && <span className="text-red-500">РЎР‚РЎСџРІР‚СњРўвЂ</span>}
                        {battle.status === 'win' && <span className="text-green-500">РЎР‚РЎСџРЎСџРЎС›</span>}
                        {battle.status === 'active' && <span className="text-blue-500">РЎР‚РЎСџРІР‚СњР’Вµ</span>}
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
                        <span className="text-yellow-500">РЎР‚РЎСџРІР‚в„ўР’В°</span>
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