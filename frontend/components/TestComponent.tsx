import React from 'react';

export const TestComponent: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      color: '#333',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        🚀 GRITHER App Test
      </h1>
      <p style={{ fontSize: '16px', textAlign: 'center' }}>
        Если вы видите этот текст, то React компоненты загружаются корректно!
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        backgroundColor: '#4CAF50', 
        color: 'white',
        borderRadius: '5px'
      }}>
        ✅ Приложение работает!
      </div>
    </div>
  );
};
