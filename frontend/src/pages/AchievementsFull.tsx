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
            Р
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>РРІР°РЅ РРІР°РЅРѕРІ</div>
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
            рџ””
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
            вљ™пёЏ
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
        <h1 style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: '1.5rem' }}>Р”РѕСЃС‚СѓРїРЅС‹Рµ РґРѕСЃС‚РёР¶РµРЅРёСЏ</h1>
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
          в°
        </button>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* РџРѕРєСѓРїР°С‚РµР»СЊ */}
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
            рџЏ†
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>РџРѕРєСѓРїР°С‚РµР»СЊ</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>РЎРѕРІРµСЂС€РёС‚Рµ 10 РїРѕРєСѓРїРѕРє РІ РјР°РіР°Р·РёРЅРµ</div>
            <div style={{ fontSize: '10px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              рџ“Ћ Р¤Р°Р№Р» РїСЂРёРєСЂРµРїР»РµРЅ
            </div>
          </div>
          <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>70%</div>
        </div>

        {/* Р’РѕРёРЅ */}
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
            рџЏ†
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р’РѕРёРЅ</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р’С‹РёРіСЂР°Р№С‚Рµ 5 Р±Р°С‚С‚Р»РѕРІ</div>
          </div>
          <div style={{ color: '#8B5CF6', fontSize: '14px', fontWeight: 'bold' }}>40%</div>
        </div>

        {/* РўСЂСѓРґРѕР»СЋР±РёРІС‹Р№ */}
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
            рџЏ†
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>РўСЂСѓРґРѕР»СЋР±РёРІС‹Р№</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р’С‹РїРѕР»РЅРёС‚Рµ 10 Р·Р°РґР°С‡</div>
          </div>
          <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 'bold' }}>30%</div>
        </div>

        {/* Р›РµРіРµРЅРґР° */}
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
            рџЏ†
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р›РµРіРµРЅРґР°</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р”РѕСЃС‚РёРіРЅРёС‚Рµ 20 СѓСЂРѕРІРЅСЏ</div>
          </div>
          <div style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 'bold' }}>5%</div>
        </div>

        {/* РџРµСЂРІС‹Рµ С€Р°РіРё */}
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
            рџЏ†
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>РџРµСЂРІС‹Рµ С€Р°РіРё</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р’С‹РїРѕР»РЅРёС‚Рµ РїРµСЂРІСѓСЋ Р·Р°РґР°С‡Сѓ</div>
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
          <div style={{ fontSize: '20px' }}>рџЏ </div>
          <div style={{ fontSize: '10px' }}>Р“Р»Р°РІРЅР°СЏ</div>
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
          <div style={{ fontSize: '20px' }}>рџЏ†</div>
          <div style={{ fontSize: '10px' }}>Р”РѕСЃС‚РёР¶РµРЅРёСЏ</div>
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
          <div style={{ fontSize: '20px' }}>вњ…</div>
          <div style={{ fontSize: '10px' }}>Р—Р°РґР°С‡Рё</div>
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
          <div style={{ fontSize: '20px' }}>рџ›’</div>
          <div style={{ fontSize: '10px' }}>РњР°РіР°Р·РёРЅ</div>
        </button>
      </div>
    </div>
  );
};
