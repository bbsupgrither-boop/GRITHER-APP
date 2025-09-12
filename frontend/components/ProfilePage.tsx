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
  console.log('ProfilePage rendering with:', { user, battles, leaderboard, theme });

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
      padding: '20px'
    }}>
      <BackgroundFX theme={theme} />
      
      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={true}
        onOpenSettings={() => onNavigate('home')}
        theme={theme}
      />
      
      {/* ОТЛАДОЧНЫЙ БЛОК */}
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        border: '5px solid red',
        margin: '20px',
        borderRadius: '15px'
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

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="profile"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};