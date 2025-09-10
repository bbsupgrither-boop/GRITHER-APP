import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Trophy } from './Icons';

interface BattlesPageTestProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  personalBattles?: any[];
  setPersonalBattles?: (battles: any[]) => void;
  theme?: 'light' | 'dark';
}

export function BattlesPageTest({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto, 
  personalBattles = [], 
  setPersonalBattles,
  theme = 'light' 
}: BattlesPageTestProps) {
  const [testBattles, setTestBattles] = useState<any[]>([
    {
      id: 'test-battle-1',
      opponent: {
        name: 'РўРµСЃС‚ РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ',
        team: 2,
        level: 5
      },
      prize: 500,
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'active'
    }
  ]);

  const currentUser = {
    id: 'user1',
    name: 'РРІР°РЅ РРІР°РЅРѕРІ',
    username: '@iivanov'
  };

  const handleVictoryClick = (battle: any) => {
    console.log('VICTORY CLICKED!', battle);
    alert('РљРЅРѕРїРєР° "Р’С‹РёРіСЂР°Р»" СЂР°Р±РѕС‚Р°РµС‚!');
  };

  const handleCancelClick = (battle: any) => {
    console.log('CANCEL CLICKED!', battle);
    alert('РљРЅРѕРїРєР° "РћС‚РјРµРЅРёС‚СЊ" СЂР°Р±РѕС‚Р°РµС‚!');
  };

  const createTestBattle = () => {
    console.log('CREATE BATTLE CLICKED!');
    const newBattle = {
      id: 'test-' + Date.now(),
      opponent: {
        name: 'РќРѕРІС‹Р№ РўРµСЃС‚',
        team: 3,
        level: 7
      },
      prize: 1000,
      endDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      status: 'active'
    };
    setTestBattles([...testBattles, newBattle]);
    
    if (setPersonalBattles) {
      setPersonalBattles([...personalBattles, newBattle]);
    }
  };

  console.log('BattlesPageTest rendering with battles:', testBattles);
  console.log('personalBattles from props:', personalBattles);

  return (
    <div 
      className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
      style={{
        background: 'transparent',
        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
      }}
    >
      <Header 
        onNavigate={onNavigate} 
        currentPage={currentPage} 
        onOpenSettings={onOpenSettings}
        user={currentUser}
        profilePhoto={profilePhoto}
        theme={theme}
      />
      
      <div className="max-w-md mx-auto px-4 pb-24">
        <div 
          className="glass-card rounded-2xl p-6" 
          style={{ minHeight: '400px' }}
        >
          <h2 
            className="text-lg font-medium text-center mb-6"
            style={{
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            РўРµСЃС‚ Р‘Р°С‚С‚Р»РѕРІ
          </h2>

          <button
            onClick={createTestBattle}
            className="w-full mb-6 py-3 px-4 rounded-xl text-sm font-medium"
            style={{
              background: theme === 'dark' ? '#FFFFFF' : '#2B82FF',
              color: theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            РЎРѕР·РґР°С‚СЊ С‚РµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р»
          </button>

          {(testBattles.length > 0 || personalBattles.length > 0) ? (
            <div className="space-y-4">
              {/* РџРѕРєР°Р·С‹РІР°РµРј С‚РµСЃС‚РѕРІС‹Рµ Р±Р°С‚С‚Р»С‹ */}
              {testBattles.map((battle, index) => (
                <div
                  key={battle.id}
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF'
                  }}
                >
                  <div className="mb-4">
                    <h3 
                      className="font-medium"
                      style={{
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      РўРµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р» {index + 1}: {battle.opponent.name}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      РљРѕРјР°РЅРґР° {battle.opponent.team} вЂў РЈСЂРѕРІРµРЅСЊ {battle.opponent.level} вЂў {battle.prize}g
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Button clicked directly!', battle);
                        handleVictoryClick(battle);
                      }}
                      className="flex-1 py-2 px-4 rounded-xl text-sm font-medium"
                      style={{
                        background: '#34C759',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Р’С‹РёРіСЂР°Р» Р±Р°С‚С‚Р»
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Cancel button clicked directly!', battle);
                        handleCancelClick(battle);
                      }}
                      className="py-2 px-4 rounded-xl text-sm font-medium"
                      style={{
                        background: '#FF3B30',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      РћС‚РјРµРЅРёС‚СЊ
                    </button>
                  </div>
                </div>
              ))}

              {/* РџРѕРєР°Р·С‹РІР°РµРј personalBattles */}
              {personalBattles.map((battle, index) => (
                <div
                  key={battle.id}
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1C2029' : '#ECEFF3',
                    border: theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF'
                  }}
                >
                  <div className="mb-4">
                    <h3 
                      className="font-medium"
                      style={{
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      Р“Р»РѕР±Р°Р»СЊРЅС‹Р№ Р±Р°С‚С‚Р» {index + 1}: {battle.opponent?.name || 'РќРµРёР·РІРµСЃС‚РЅС‹Р№'}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      РљРѕРјР°РЅРґР° {battle.opponent?.team} вЂў РЈСЂРѕРІРµРЅСЊ {battle.opponent?.level} вЂў {battle.prize}g
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Global victory button clicked!', battle);
                        handleVictoryClick(battle);
                      }}
                      className="flex-1 py-2 px-4 rounded-xl text-sm font-medium"
                      style={{
                        background: '#007AFF',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Р’С‹РёРіСЂР°Р» (РіР»РѕР±Р°Р»СЊРЅС‹Р№)
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Global cancel button clicked!', battle);
                        handleCancelClick(battle);
                      }}
                      className="py-2 px-4 rounded-xl text-sm font-medium"
                      style={{
                        background: '#FF9500',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      РћС‚РјРµРЅРёС‚СЊ (РіР»РѕР±Р°Р»СЊРЅС‹Р№)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy 
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              />
              <p 
                className="text-sm"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                РќРµС‚ Р±Р°С‚С‚Р»РѕРІ РґР»СЏ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ
              </p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} theme={theme} />
    </div>
  );
}
