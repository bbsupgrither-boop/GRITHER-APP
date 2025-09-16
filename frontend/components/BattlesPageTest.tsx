Р С—Р’В»РЎвЂ”import { useState } from 'react';
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
        name: 'Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°',
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
    name: 'Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦ Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ',
    username: '@iivanov'
  };

  const handleVictoryClick = (battle: any) => {
    console.log('VICTORY CLICKED!', battle);
    alert('Р В Р’В Р РЋРІвЂћСћР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° "Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»" Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў!');
  };

  const handleCancelClick = (battle: any) => {
    console.log('CANCEL CLICKED!', battle);
    alert('Р В Р’В Р РЋРІвЂћСћР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В° "Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°" Р В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В±Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў!');
  };

  const createTestBattle = () => {
    console.log('CREATE BATTLE CLICKED!');
    const newBattle = {
      id: 'test-' + Date.now(),
      opponent: {
        name: 'Р В Р’В Р РЋРЎС™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ў',
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
            Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р Р†Р вЂљР’ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В 
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
            Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»
          </button>

          {(testBattles.length > 0 || personalBattles.length > 0) ? (
            <div className="space-y-4">
              {/* Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’Вµ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ */}
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
                      Р В Р’В Р РЋРЎвЂєР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В» {index + 1}: {battle.opponent.name}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {battle.opponent.team} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р вЂ° {battle.opponent.level} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє {battle.prize}g
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
                      Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В» Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»
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
                      Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ°
                    </button>
                  </div>
                </div>
              ))}

              {/* Р В Р’В Р РЋРЎСџР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’В personalBattles */}
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
                      Р В Р’В Р Р†Р вЂљРЎС™Р В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В» {index + 1}: {battle.opponent?.name || 'Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В·Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ'}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      Р В Р’В Р РЋРІвЂћСћР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В° {battle.opponent?.team} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє Р В Р’В Р В РІвЂљВ¬Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р Р‹Р В Р вЂ° {battle.opponent?.level} Р В Р вЂ Р В РІР‚С™Р РЋРЎвЂє {battle.prize}g
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
                      Р В Р’В Р Р†Р вЂљРІвЂћСћР В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚ВР В Р’В Р РЋРІР‚вЂњР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В» (Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ)
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
                      Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° (Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р вЂ°Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ)
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
                Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р Р‹Р В Р РЏ Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ
              </p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} theme={theme} />
    </div>
  );
}
