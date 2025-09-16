import React from 'react';

interface AchievementsFullProps {
  theme: 'light' | 'dark';
}

export const AchievementsFull: React.FC<AchievementsFullProps> = ({ theme }) => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5AA7FF, #A7D0FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Р В
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Р ВР Р†Р В°Р Р… Р ВР Р†Р В°Р Р…Р С•Р Р†</div>
            <div style={{ fontSize: '12px', color: '#666' }}>WORKER</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            СЂСџвЂќвЂќ
          </button>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            РІС™в„ўРїС‘РЏ
          </button>
        </div>
      </div>

      {/* Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: '1.5rem' }}>Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№Р Вµ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</h1>
        <button style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: 'none',
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          РІВВ°
        </button>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Р СџР С•Р С”РЎС“Р С—Р В°РЎвЂљР ВµР В»РЎРЉ */}
        <div style={{
          background: theme === 'dark' ? '#161A22' : '#fff',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10B981, #34D399)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            СЂСџРЏвЂ 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р СџР С•Р С”РЎС“Р С—Р В°РЎвЂљР ВµР В»РЎРЉ</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Р РЋР С•Р Р†Р ВµРЎР‚РЎв‚¬Р С‘РЎвЂљР Вµ 10 Р С—Р С•Р С”РЎС“Р С—Р С•Р С” Р Р† Р СР В°Р С–Р В°Р В·Р С‘Р Р…Р Вµ</div>
            <div style={{ fontSize: '10px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              СЂСџвЂњР‹ Р В¤Р В°Р в„–Р В» Р С—РЎР‚Р С‘Р С”РЎР‚Р ВµР С—Р В»Р ВµР Р…
            </div>
          </div>
          <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>70%</div>
        </div>

        {/* Р вЂ™Р С•Р С‘Р Р… */}
        <div style={{
          background: theme === 'dark' ? '#161A22' : '#fff',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            СЂСџРЏвЂ 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р вЂ™Р С•Р С‘Р Р…</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р в„–РЎвЂљР Вµ 5 Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†</div>
          </div>
          <div style={{ color: '#8B5CF6', fontSize: '14px', fontWeight: 'bold' }}>40%</div>
        </div>

        {/* Р СћРЎР‚РЎС“Р Т‘Р С•Р В»РЎР‹Р В±Р С‘Р Р†РЎвЂ№Р в„– */}
        <div style={{
          background: theme === 'dark' ? '#161A22' : '#fff',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            СЂСџРЏвЂ 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р СћРЎР‚РЎС“Р Т‘Р С•Р В»РЎР‹Р В±Р С‘Р Р†РЎвЂ№Р в„–</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ 10 Р В·Р В°Р Т‘Р В°РЎвЂЎ</div>
          </div>
          <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 'bold' }}>30%</div>
        </div>

        {/* Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В° */}
        <div style={{
          background: theme === 'dark' ? '#161A22' : '#fff',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px'
          }}>
            СЂСџРЏвЂ 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р вЂќР С•РЎРѓРЎвЂљР С‘Р С–Р Р…Р С‘РЎвЂљР Вµ 20 РЎС“РЎР‚Р С•Р Р†Р Р…РЎРЏ</div>
          </div>
          <div style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 'bold' }}>5%</div>
        </div>

        {/* Р СџР ВµРЎР‚Р Р†РЎвЂ№Р Вµ РЎв‚¬Р В°Р С–Р С‘ */}
        <div style={{
          background: theme === 'dark' ? '#161A22' : '#fff',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '20px'
          }}>
            СЂСџРЏвЂ 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р СџР ВµРЎР‚Р Р†РЎвЂ№Р Вµ РЎв‚¬Р В°Р С–Р С‘</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ Р С—Р ВµРЎР‚Р Р†РЎС“РЎР‹ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“</div>
          </div>
          <div style={{ color: '#666', fontSize: '14px', fontWeight: 'bold' }}>0%</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: theme === 'dark' ? '#161A22' : '#fff',
        borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: theme === 'dark' ? '#666' : '#999'
        }}>
          <div style={{ fontSize: '20px' }}>СЂСџРЏВ </div>
          <div style={{ fontSize: '10px' }}>Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ</div>
        </button>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: '#5AA7FF'
        }}>
          <div style={{ fontSize: '20px' }}>СЂСџРЏвЂ </div>
          <div style={{ fontSize: '10px' }}>Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</div>
        </button>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: theme === 'dark' ? '#666' : '#999'
        }}>
          <div style={{ fontSize: '20px' }}>РІСљвЂ¦</div>
          <div style={{ fontSize: '10px' }}>Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘</div>
        </button>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: theme === 'dark' ? '#666' : '#999'
        }}>
          <div style={{ fontSize: '20px' }}>СЂСџвЂєвЂ™</div>
          <div style={{ fontSize: '10px' }}>Р СљР В°Р С–Р В°Р В·Р С‘Р Р…</div>
        </button>
      </div>
    </div>
  );
};
