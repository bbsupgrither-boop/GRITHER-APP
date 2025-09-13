import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { User as UserIcon, Edit3, Trophy, Calendar, Zap, Coins } from 'lucide-react';
import coinIcon from '../assets/coin.svg';

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
      backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
      position: 'relative',
      zIndex: 1000
    }}>
      <BackgroundFX theme={theme} />
      
      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={true}
        onOpenSettings={() => onNavigate('settings')}
        theme={theme}
      />
      
      {/* Основной контент */}
      <div style={{
        maxWidth: '448px',
        margin: '20px auto',
        padding: '16px',
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderRadius: '16px',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
        zIndex: 10,
        position: 'relative'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Профиль пользователя</h2>
        
        {/* Фото и основная информация */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <UserIcon size={40} color="white" />
          </div>
          <div>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{user?.name || 'Пользователь'}</p>
            <p style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>Уровень: {user?.level || 1}</p>
            <p style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>Команда: {user?.team || 'Не указана'}</p>
          </div>
        </div>

        {/* Мои баттлы */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={16} color="#3B82F6" />
            Мои баттлы
          </h3>
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            padding: '12px',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280', fontSize: '14px' }}>
              {battles?.length > 0 ? `Участвовал в ${battles.length} баттлах` : 'Пока нет баттлов'}
            </p>
          </div>
        </div>

        {/* Прогресс уровня */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Уровень {user?.level || 1}</span>
            <span style={{ fontSize: '12px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
              {user?.experience || 0}/{user?.maxExperience || 100} XP
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((user?.experience || 0) / (user?.maxExperience || 100)) * 100}%`,
              height: '100%',
              backgroundColor: '#3B82F6',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Статистика */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', marginBottom: '4px' }}>Побед</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{battles?.filter(b => b.winnerId === user?.id).length || 0}</div>
          </div>
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', marginBottom: '4px' }}>Баланс</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '16px', fontWeight: 'bold' }}>
              {user?.balance || 0} <img src={coinIcon} alt="coins" style={{ width: '16px', height: '16px' }} />
            </div>
          </div>
          <div style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', marginBottom: '4px' }}>Ачивки</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>0</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('home')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0084FF',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006DD9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0084FF'}
        >
          Вернуться на главную
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