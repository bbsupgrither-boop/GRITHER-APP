import { useState } from 'react';

interface BattleLeaderboardSimpleProps {
  leaderboard?: any[];
  activeBattles?: any[];
  onNavigate?: (page: string) => void;
  personalBattles?: any[];
  setPersonalBattles?: (battles: any[]) => void;
  theme?: 'light' | 'dark';
}

export function BattleLeaderboardSimple({ 
  personalBattles = [], 
  setPersonalBattles,
  theme = 'light' 
}: BattleLeaderboardSimpleProps) {
  const [testMode, setTestMode] = useState(false);

  const handleTestClick = () => {
    console.log('TEST BUTTON CLICKED!');
    alert('РўРµСЃС‚РѕРІР°СЏ РєРЅРѕРїРєР° СЂР°Р±РѕС‚Р°РµС‚!');
    setTestMode(!testMode);
  };

  const handleVictoryClick = () => {
    console.log('VICTORY BUTTON CLICKED! personalBattles:', personalBattles);
    alert('РљРЅРѕРїРєР° "Р’С‹РёРіСЂР°Р»" СЂР°Р±РѕС‚Р°РµС‚!');
  };

  const handleCancelClick = () => {
    console.log('CANCEL BUTTON CLICKED! personalBattles:', personalBattles);
    alert('РљРЅРѕРїРєР° "РћС‚РјРµРЅРёС‚СЊ" СЂР°Р±РѕС‚Р°РµС‚!');
  };

  const handleCreateBattle = () => {
    console.log('CREATE BATTLE CLICKED!');
    if (setPersonalBattles) {
      const newBattle = {
        id: Date.now().toString(),
        opponent: { name: 'РўРµСЃС‚ РџСЂРѕС‚РёРІРЅРёРє', team: 2, level: 5 },
        prize: 500,
        status: 'active',
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
      };
      setPersonalBattles([...personalBattles, newBattle]);
      alert('РўРµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р» СЃРѕР·РґР°РЅ!');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Р‘Р°С‚С‚Р» СЃРµРєС†РёСЏ */}
      <div 
        style={{
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          borderRadius: '20px',
          border: theme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.06)' 
            : '1px solid #E6E9EF',
          boxShadow: theme === 'dark' 
            ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
            : '0 8px 24px rgba(0, 0, 0, 0.10)',
          padding: '16px',
          position: 'relative',
          zIndex: 30
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h3 
            style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              textAlign: 'center',
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Р”РёР°РіРЅРѕСЃС‚РёРєР° Р‘Р°С‚С‚Р»РѕРІ
          </h3>
          
          <button
            onClick={handleTestClick}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '8px',
              backgroundColor: testMode ? '#34C759' : '#FF3B30',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              position: 'relative',
              zIndex: 40
            }}
            onMouseDown={(e) => console.log('Mouse down РЅР° С‚РµСЃС‚ РєРЅРѕРїРєРµ')}
            onMouseUp={(e) => console.log('Mouse up РЅР° С‚РµСЃС‚ РєРЅРѕРїРєРµ')}
          >
            РўР•РЎРў РљРќРћРџРљРђ {testMode ? 'вњ“' : 'вњ—'}
          </button>

          <button
            onClick={handleCreateBattle}
            style={{
              width: '100%',
              padding: '6px',
              marginBottom: '8px',
              backgroundColor: '#007AFF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              position: 'relative',
              zIndex: 40
            }}
          >
            РЎРѕР·РґР°С‚СЊ С‚РµСЃС‚РѕРІС‹Р№ Р±Р°С‚С‚Р»
          </button>
        </div>

        {personalBattles.length > 0 ? (
          <div>
            <div 
              style={{ 
                marginBottom: '8px',
                padding: '8px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                borderRadius: '8px'
              }}
            >
              <div 
                style={{ 
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  fontSize: '12px',
                  marginBottom: '4px'
                }}
              >
                Р‘Р°С‚С‚Р» СЃ {personalBattles[0].opponent.name}
              </div>
              <div 
                style={{ 
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  fontSize: '10px',
                  marginBottom: '8px'
                }}
              >
                РЎС‚Р°РІРєР°: {personalBattles[0].prize}g
              </div>
              
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('DIRECT CLICK РЅР° РєРЅРѕРїРєСѓ Р’С‹РёРіСЂР°Р»');
                    handleVictoryClick();
                  }}
                  onMouseDown={(e) => console.log('MouseDown РЅР° Р’С‹РёРіСЂР°Р»')}
                  onMouseUp={(e) => console.log('MouseUp РЅР° Р’С‹РёРіСЂР°Р»')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#34C759',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    position: 'relative',
                    zIndex: 50
                  }}
                >
                  Р’С‹РёРіСЂР°Р»
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('DIRECT CLICK РЅР° РєРЅРѕРїРєСѓ РћС‚РјРµРЅРёС‚СЊ');
                    handleCancelClick();
                  }}
                  onMouseDown={(e) => console.log('MouseDown РЅР° РћС‚РјРµРЅРёС‚СЊ')}
                  onMouseUp={(e) => console.log('MouseUp РЅР° РћС‚РјРµРЅРёС‚СЊ')}
                  style={{
                    padding: '6px 8px',
                    backgroundColor: '#FF3B30',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    position: 'relative',
                    zIndex: 50
                  }}
                >
                  РћС‚РјРµРЅРёС‚СЊ
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div 
            style={{
              textAlign: 'center',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              fontSize: '12px',
              padding: '12px'
            }}
          >
            РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р±Р°С‚С‚Р»РѕРІ
          </div>
        )}
      </div>

      {/* Р›РёРґРµСЂР±РѕСЂРґ СЃРµРєС†РёСЏ (СѓРїСЂРѕС‰РµРЅРЅР°СЏ) */}
      <div 
        style={{
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          borderRadius: '20px',
          border: theme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.06)' 
            : '1px solid #E6E9EF',
          boxShadow: theme === 'dark' 
            ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
            : '0 8px 24px rgba(0, 0, 0, 0.10)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h3 
          style={{ 
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
            margin: '0',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Р›РёРґРµСЂР±РѕСЂРґ
        </h3>
        <div 
          style={{
            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
            fontSize: '12px',
            marginTop: '4px'
          }}
        >
          (Р·Р°РіР»СѓС€РєР°)
        </div>
      </div>
    </div>
  );
}
