import React from 'react';

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        GRITHER - Приложение для Telegram
      </h1>
      
      <div style={{ 
        backgroundColor: '#333', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
          Ваши достижения
        </h2>
        <p style={{ color: '#ccc' }}>
          Просмотр достижений
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#333', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
          Статус
        </h2>
        <p style={{ color: '#ccc' }}>
          ХР: 0 | Уровень: 1
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#333', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
          Баттлы
        </h2>
        <p style={{ color: '#ccc' }}>
          Активные баттлы
        </p>
      </div>
      
      <div style={{ 
        backgroundColor: '#333', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
          Рейтинг
        </h2>
        <p style={{ color: '#ccc' }}>
          По уровню
        </p>
      </div>
      
      <p style={{ color: '#888', fontSize: '14px', marginTop: '40px' }}>
        Тестовая версия приложения - если вы видите этот текст, значит React работает!
      </p>
    </div>
  );
}