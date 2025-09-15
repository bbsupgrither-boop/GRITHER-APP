п»їimport { useState } from 'react';

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
    alert('Р СћР ВµРЎРѓРЎвЂљР С•Р Р†Р В°РЎРЏ Р С”Р Р…Р С•Р С—Р С”Р В° РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
    setTestMode(!testMode);
  };

  const handleVictoryClick = () => {
    console.log('VICTORY BUTTON CLICKED! personalBattles:', personalBattles);
    alert('Р С™Р Р…Р С•Р С—Р С”Р В° "Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»" РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
  };

  const handleCancelClick = () => {
    console.log('CANCEL BUTTON CLICKED! personalBattles:', personalBattles);
    alert('Р С™Р Р…Р С•Р С—Р С”Р В° "Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ" РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
  };

  const handleCreateBattle = () => {
    console.log('CREATE BATTLE CLICKED!');
    if (setPersonalBattles) {
      const newBattle = {
        id: Date.now().toString(),
        opponent: { name: 'Р СћР ВµРЎРѓРЎвЂљ Р СџРЎР‚Р С•РЎвЂљР С‘Р Р†Р Р…Р С‘Р С”', team: 2, level: 5 },
        prize: 500,
        status: 'active',
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
      };
      setPersonalBattles([...personalBattles, newBattle]);
      alert('Р СћР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В» РЎРѓР С•Р В·Р Т‘Р В°Р Р…!');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓР ВµР С”РЎвЂ Р С‘РЎРЏ */}
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
            Р вЂќР С‘Р В°Р С–Р Р…Р С•РЎРѓРЎвЂљР С‘Р С”Р В° Р вЂР В°РЎвЂљРЎвЂљР В»Р С•Р Р†
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
            onMouseDown={(e) => console.log('Mouse down Р Р…Р В° РЎвЂљР ВµРЎРѓРЎвЂљ Р С”Р Р…Р С•Р С—Р С”Р Вµ')}
            onMouseUp={(e) => console.log('Mouse up Р Р…Р В° РЎвЂљР ВµРЎРѓРЎвЂљ Р С”Р Р…Р С•Р С—Р С”Р Вµ')}
          >
            Р СћР вЂўР РЋР Сћ Р С™Р СњР С›Р СџР С™Р С’ {testMode ? 'РІСљвЂњ' : 'РІСљвЂ”'}
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
            Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎвЂ№Р в„– Р В±Р В°РЎвЂљРЎвЂљР В»
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
                Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ {personalBattles[0].opponent.name}
              </div>
              <div 
                style={{ 
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  fontSize: '10px',
                  marginBottom: '8px'
                }}
              >
                Р РЋРЎвЂљР В°Р Р†Р С”Р В°: {personalBattles[0].prize}g
              </div>
              
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('DIRECT CLICK Р Р…Р В° Р С”Р Р…Р С•Р С—Р С”РЎС“ Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»');
                    handleVictoryClick();
                  }}
                  onMouseDown={(e) => console.log('MouseDown Р Р…Р В° Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»')}
                  onMouseUp={(e) => console.log('MouseUp Р Р…Р В° Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»')}
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
                  Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('DIRECT CLICK Р Р…Р В° Р С”Р Р…Р С•Р С—Р С”РЎС“ Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ');
                    handleCancelClick();
                  }}
                  onMouseDown={(e) => console.log('MouseDown Р Р…Р В° Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ')}
                  onMouseUp={(e) => console.log('MouseUp Р Р…Р В° Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ')}
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
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
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
            Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†
          </div>
        )}
      </div>

      {/* Р вЂєР С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘ РЎРѓР ВµР С”РЎвЂ Р С‘РЎРЏ (РЎС“Р С—РЎР‚Р С•РЎвЂ°Р ВµР Р…Р Р…Р В°РЎРЏ) */}
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
          Р вЂєР С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘
        </h3>
        <div 
          style={{
            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
            fontSize: '12px',
            marginTop: '4px'
          }}
        >
          (Р В·Р В°Р С–Р В»РЎС“РЎв‚¬Р С”Р В°)
        </div>
      </div>
    </div>
  );
}
