import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
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

              {/* Logo */}
              <div style={{
                textAlign: 'center',
                padding: '40px 0',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#fff' : '#000'
              }}>
                GRITHER
              </div>

              {/* Achievements Card */}
              <div style={{
                background: theme === 'dark' ? '#161A22' : '#fff',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Ваши достижения</h3>
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
                    👁️
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #5AA7FF, #A7D0FF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px'
                  }}>
                    🛡️
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Новичок</div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Достигните 2 уровня</div>
                    <div style={{ color: '#5AA7FF', fontSize: '12px' }}>50%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #A855F7, #C084FC)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px'
                  }}>
                    ⚡
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Трудолюбивый</div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Выполните 10 задач</div>
                    <div style={{ color: '#A855F7', fontSize: '12px' }}>30%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
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
                    📦
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Коллекционер</div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Откройте 5 кейсов</div>
                    <div style={{ color: '#3B82F6', fontSize: '12px' }}>20%</div>
                  </div>
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
                  color: '#5AA7FF'
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
                  color: theme === 'dark' ? '#666' : '#999'
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
          } />
          <Route path="/achievements" element={
            <div style={{ 
              padding: '20px', 
              backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
              minHeight: '100vh'
            }}>
              <h1 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Достижения</h1>
              <p style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>Страница достижений работает!</p>
            </div>
          } />
          <Route path="/tasks" element={
            <div style={{ 
              padding: '20px', 
              backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
              minHeight: '100vh'
            }}>
              <h1 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Задачи</h1>
              <p style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>Страница задач работает!</p>
            </div>
          } />
          <Route path="/shop" element={
            <div style={{ 
              padding: '20px', 
              backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
              minHeight: '100vh'
            }}>
              <h1 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Магазин</h1>
              <p style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>Страница магазина работает!</p>
            </div>
          } />
          <Route path="/profile" element={
            <div style={{ 
              padding: '20px', 
              backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
              minHeight: '100vh'
            }}>
              <h1 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Профиль</h1>
              <p style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>Страница профиля работает!</p>
            </div>
          } />
        </Routes>
      </div>
    </HashRouter>
  );
}