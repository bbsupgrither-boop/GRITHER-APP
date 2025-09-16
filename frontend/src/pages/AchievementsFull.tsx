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
            Р В Р’В
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ </div>
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
            РЎР‚РЎСџРІР‚СњРІР‚Сњ
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
            Р Р†РЎв„ўРІвЂћСћР С—РЎвЂР РЏ
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
        <h1 style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: '1.5rem' }}>Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ</h1>
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
          Р Р†Р’ВР’В°
        </button>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Р В РЎСџР В РЎвЂўР В РЎвЂќР РЋРЎвЂњР В РЎвЂ”Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰ */}
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
            РЎР‚РЎСџР РЏРІР‚В 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р В РЎСџР В РЎвЂўР В РЎвЂќР РЋРЎвЂњР В РЎвЂ”Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Р В Р Р‹Р В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 10 Р В РЎвЂ”Р В РЎвЂўР В РЎвЂќР РЋРЎвЂњР В РЎвЂ”Р В РЎвЂўР В РЎвЂќ Р В Р вЂ  Р В РЎВР В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦Р В Р’Вµ</div>
            <div style={{ fontSize: '10px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              РЎР‚РЎСџРІР‚СљР вЂ№ Р В Р’В¤Р В Р’В°Р В РІвЂћвЂ“Р В Р’В» Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В РЎвЂќР РЋР вЂљР В Р’ВµР В РЎвЂ”Р В Р’В»Р В Р’ВµР В Р вЂ¦
            </div>
          </div>
          <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>70%</div>
        </div>

        {/* Р В РІР‚в„ўР В РЎвЂўР В РЎвЂР В Р вЂ¦ */}
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
            РЎР‚РЎСџР РЏРІР‚В 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р В РІР‚в„ўР В РЎвЂўР В РЎвЂР В Р вЂ¦</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ 5 Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ </div>
          </div>
          <div style={{ color: '#8B5CF6', fontSize: '14px', fontWeight: 'bold' }}>40%</div>
        </div>

        {/* Р В РЎС›Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В РЎвЂўР В Р’В»Р РЋР вЂ№Р В Р’В±Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ */}
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
            РЎР‚РЎСџР РЏРІР‚В 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р В РЎС›Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В РЎвЂўР В Р’В»Р РЋР вЂ№Р В Р’В±Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 10 Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ</div>
          </div>
          <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 'bold' }}>30%</div>
        </div>

        {/* Р В РІР‚С”Р В Р’ВµР В РЎвЂ“Р В Р’ВµР В Р вЂ¦Р В РўвЂР В Р’В° */}
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
            РЎР‚РЎСџР РЏРІР‚В 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р В РІР‚С”Р В Р’ВµР В РЎвЂ“Р В Р’ВµР В Р вЂ¦Р В РўвЂР В Р’В°</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ“Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 20 Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР РЏ</div>
          </div>
          <div style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 'bold' }}>5%</div>
        </div>

        {/* Р В РЎСџР В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ Р РЋРІвЂљВ¬Р В Р’В°Р В РЎвЂ“Р В РЎвЂ */}
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
            РЎР‚РЎСџР РЏРІР‚В 
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Р В РЎСџР В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ Р РЋРІвЂљВ¬Р В Р’В°Р В РЎвЂ“Р В РЎвЂ</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРЎвЂњР РЋР вЂ№ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ</div>
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
          <div style={{ fontSize: '20px' }}>РЎР‚РЎСџР РЏР’В </div>
          <div style={{ fontSize: '10px' }}>Р В РІР‚СљР В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р В Р’В°Р РЋР РЏ</div>
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
          <div style={{ fontSize: '20px' }}>РЎР‚РЎСџР РЏРІР‚В </div>
          <div style={{ fontSize: '10px' }}>Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ</div>
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
          <div style={{ fontSize: '20px' }}>Р Р†РЎС™РІР‚В¦</div>
          <div style={{ fontSize: '10px' }}>Р В РІР‚вЂќР В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ</div>
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
          <div style={{ fontSize: '20px' }}>РЎР‚РЎСџРІР‚С”РІР‚в„ў</div>
          <div style={{ fontSize: '10px' }}>Р В РЎС™Р В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦</div>
        </button>
      </div>
    </div>
  );
};
