import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { 
  User, 
  Camera, 
  Edit3, 
  Trophy, 
  Calendar, 
  Star, 
  TrendingUp,
  Settings,
  Award,
  Target,
  Clock,
  Coins,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  Zap
} from 'lucide-react';
import { User as UserType, Battle, LeaderboardEntry } from '../types/global';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: UserType;
  setUser: (user: UserType) => void;
  battles: Battle[];
  leaderboard: LeaderboardEntry[];
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

  const handleOpenSettings = () => {
    onNavigate('home'); // Возвращаемся на главную для открытия настроек
  };

  console.log('ProfilePage render start - SIMPLE VERSION');

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA' }}>
      <BackgroundFX theme={theme} />
      
      {/* Header без иконки пользователя */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={true}
        onOpenSettings={handleOpenSettings}
        theme={theme}
      />
      
      {/* ОТЛАДОЧНЫЙ БЛОК */}
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        border: '3px solid red',
        margin: '20px',
        borderRadius: '10px'
      }}>
        <h1 style={{ color: 'red', fontSize: '28px', fontWeight: 'bold' }}>🔍 PROFILE PAGE DEBUG 🔍</h1>
        <p style={{ color: 'red', fontSize: '18px' }}>User: {user?.name || 'No user'}</p>
        <p style={{ color: 'red', fontSize: '18px' }}>Battles: {battles?.length || 0}</p>
        <p style={{ color: 'red', fontSize: '18px' }}>Theme: {theme}</p>
        <p style={{ color: 'red', fontSize: '18px' }}>User ID: {user?.id || 'No ID'}</p>
        <p style={{ color: 'red', fontSize: '18px' }}>User Level: {user?.level || 'No level'}</p>
      </div>

      {/* ПРОСТОЙ КОНТЕНТ ДЛЯ ТЕСТИРОВАНИЯ */}
      <div className="max-w-md mx-auto px-4 pb-24">
        
        {/* Тестовая карточка */}
        <div 
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '20px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 style={{ 
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Тестовая карточка профиля
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div 
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User style={{ 
                width: '40px', 
                height: '40px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' 
              }} />
            </div>
            
            <div>
              <h3 style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '18px',
                fontWeight: '500',
                marginBottom: '4px'
              }}>
                {user?.name || 'Пользователь'}
              </h3>
              <p style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                fontSize: '14px'
              }}>
                Уровень: {user?.level || 1}
              </p>
              <p style={{ 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                fontSize: '14px'
              }}>
                Баланс: {user?.balance || 0} 💰
              </p>
            </div>
          </div>

          {/* Кнопка возврата */}
          <button 
            onClick={() => onNavigate('home')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: theme === 'dark' ? '#3B82F6' : '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2563EB' : '#1D4ED8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? '#3B82F6' : '#2563EB';
            }}
          >
            ← Вернуться на главную
          </button>
        </div>

        {/* Тестовая статистика */}
        <div 
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            padding: '20px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 style={{ 
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Статистика
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div 
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <Trophy style={{ 
                width: '24px', 
                height: '24px', 
                color: '#FCD34D',
                margin: '0 auto 8px'
              }} />
              <div style={{ 
                fontSize: '12px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '4px'
              }}>Побед</div>
              <div style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}>1</div>
            </div>
            
            <div 
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <Coins style={{ 
                width: '24px', 
                height: '24px', 
                color: '#FCD34D',
                margin: '0 auto 8px'
              }} />
              <div style={{ 
                fontSize: '12px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '4px'
              }}>Баланс</div>
              <div style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}>{user?.balance || 1000}</div>
            </div>
            
            <div 
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}
            >
              <Award style={{ 
                width: '24px', 
                height: '24px', 
                color: '#FCD34D',
                margin: '0 auto 8px'
              }} />
              <div style={{ 
                fontSize: '12px', 
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                marginBottom: '4px'
              }}>Ачивки</div>
              <div style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
              }}>—</div>
            </div>
          </div>
        </div>
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