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
            И
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Иван Иванов</div>
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
            🔔
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
            ⚙️
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
        <h1 style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: '1.5rem' }}>Доступные достижения</h1>
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
          ☰
        </button>
      </div>

      {/* Achievements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Покупатель */}
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
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Покупатель</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Совершите 10 покупок в магазине</div>
            <div style={{ fontSize: '10px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              📎 Файл прикреплен
            </div>
          </div>
          <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 'bold' }}>70%</div>
        </div>

        {/* Воин */}
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
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Воин</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Выиграйте 5 баттлов</div>
          </div>
          <div style={{ color: '#8B5CF6', fontSize: '14px', fontWeight: 'bold' }}>40%</div>
        </div>

        {/* Трудолюбивый */}
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
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Трудолюбивый</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Выполните 10 задач</div>
          </div>
          <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 'bold' }}>30%</div>
        </div>

        {/* Легенда */}
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
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Легенда</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Достигните 20 уровня</div>
          </div>
          <div style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 'bold' }}>5%</div>
        </div>

        {/* Первые шаги */}
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
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000', marginBottom: '4px' }}>Первые шаги</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Выполните первую задачу</div>
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
          <div style={{ fontSize: '20px' }}>🏠</div>
          <div style={{ fontSize: '10px' }}>Главная</div>
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
          <div style={{ fontSize: '20px' }}>🏆</div>
          <div style={{ fontSize: '10px' }}>Достижения</div>
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
          <div style={{ fontSize: '20px' }}>✅</div>
          <div style={{ fontSize: '10px' }}>Задачи</div>
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
          <div style={{ fontSize: '20px' }}>🛒</div>
          <div style={{ fontSize: '10px' }}>Магазин</div>
        </button>
      </div>
    </div>
  );
};
