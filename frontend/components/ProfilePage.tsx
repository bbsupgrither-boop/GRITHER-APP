import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: any;
  setUser: (user: any) => void;
  battles: any[];
  leaderboard: any[];
  theme: 'light' | 'dark';
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  user,
  setUser,
  battles,
  leaderboard,
  theme,
}) => {
  console.log('🔥 PROFILE PAGE COMPONENT CALLED 🔥');
  console.log('ProfilePage rendering with:', { user, battles, leaderboard, theme });
  console.log('ProfilePage props:', { onNavigate: typeof onNavigate, user: typeof user, theme: typeof theme });

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'red', // Ярко-красный фон для видимости
      padding: '20px',
      position: 'relative',
      zIndex: 1000
    }}>
      {/* ЭКСТРЕННЫЙ ИНДИКАТОР РЕНДЕРА */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 9999,
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        PROFILE PAGE LOADED! {Date.now()}
      </div>
      {/* BackgroundFX убран для отладки */}
      
      {/* Header убран для отладки */}
      
      {/* ОТЛАДОЧНЫЙ БЛОК */}
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        backgroundColor: 'white',
        border: '10px solid yellow',
        margin: '50px auto',
        borderRadius: '20px',
        maxWidth: '500px',
        boxShadow: '0 0 50px rgba(255,255,0,0.8)',
        zIndex: 9998,
        position: 'relative'
      }}>
        <h1 style={{ color: 'red', fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          🔍 PROFILE PAGE WORKS! 🔍
        </h1>
        <p style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }}>
          User: {user?.name || 'No user'}
        </p>
        <p style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }}>
          Battles: {battles?.length || 0}
        </p>
        <p style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }}>
          Theme: {theme}
        </p>
        <p style={{ color: 'red', fontSize: '20px', marginBottom: '10px' }}>
          User ID: {user?.id || 'No ID'}
        </p>
        <p style={{ color: 'red', fontSize: '20px', marginBottom: '20px' }}>
          User Level: {user?.level || 'No level'}
        </p>
        
        <button 
          onClick={() => onNavigate('home')}
          style={{
            padding: '15px 30px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ← ВЕРНУТЬСЯ НА ГЛАВНУЮ
        </button>
      </div>

      {/* Bottom Navigation убрана для отладки */}
    </div>
  );
};