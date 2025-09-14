import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { Logo } from './Logo';
import { 
  Trophy, 
  Eye, 
  Plus, 
  Menu, 
  Check,
  ArrowLeft,
  User,
  Star,
  Zap,
  Target,
  Award,
  TrendingUp,
  Crown,
  Coins,
  Clock,
  Shield,
  Bell
} from 'lucide-react';
import { Achievement } from '../types/achievements';
import { Battle, BattleInvitation, User as UserType } from '../types/battles';
import { Notification } from '../types/notifications';
import { LeaderboardEntry } from '../types/global';
import { getCurrentLevelData } from '../data/levels';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  achievements: Achievement[];
  theme: 'light' | 'dark';
  notifications: Notification[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  battles: Battle[];
  battleInvitations: BattleInvitation[];
  users: UserType[];
  leaderboard: LeaderboardEntry[];
  currentUser?: UserType;
  onCreateBattle?: () => void;
  onAcceptBattleInvitation?: (invitationId: string) => void;
  onDeclineBattleInvitation?: (invitationId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currentPage,
  onOpenSettings,
  achievements,
  theme,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  battles,
  battleInvitations,
  users,
  leaderboard,
  onAcceptBattleInvitation,
  onDeclineBattleInvitation,
  onCreateBattle,
  currentUser
}) => {
  // Mock data for battles
  const activeBattles = [
    { id: '1', opponent: 'Елена Морозова', status: 'active' }
  ];

  const mockBattleInvitations = [
    { id: '1', challenger: 'Мария Сидорова', status: 'pending' },
    { id: '2', challenger: 'Анна Иванова', status: 'pending' }
  ];

  const mockLeaderboard = [
    { id: '1', name: 'Петр Петров', level: 18 },
    { id: '2', name: 'Елена Морозова', level: 16 },
    { id: '3', name: 'Анна Иванова', level: 15 }
  ];

  // Get current level data for display
  const userExperience = currentUser?.experience || 0;
  const currentLevelData = getCurrentLevelData(userExperience);

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
        position: 'relative'
      }}
    >
      <BackgroundFX theme={theme} isHomePage={true} />

      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        hideUserIcon={false}
        onOpenSettings={onOpenSettings}
        theme={theme}
      />

      {/* Hero Zone */}
      <div 
        className="relative w-full"
        style={{
          height: 'clamp(136px, 150px, 168px)',
          zIndex: 15
        }}
      >
        <Logo theme={theme} />
      </div>

      {/* Main Content Area */}
      <div 
        style={{
          maxWidth: '448px',
          margin: '0 auto',
          padding: '0 16px',
          paddingBottom: '128px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Ваши достижения */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Ваши достижения
              </h3>
              
              <button
                className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div 
              style={{
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                fontSize: '14px'
              }}
            >
              Нет достижений в процессе выполнения
            </div>
          </div>

          {/* Статус/XP/Уровень */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <span 
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Статус: {currentLevelData.status}
                  </span>
                </div>
                <div>
                  <span 
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    XP: {userExperience}
                  </span>
                </div>
                <div>
                  <span 
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                    }}
                  >
                    Lvl {currentLevelData.level}
                  </span>
                </div>
              </div>
            </div>

            <div 
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Баттлы и Рейтинг */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            
            {/* Баттлы */}
            <div 
              className="glass-card p-4"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Баттлы
                </h3>
                
                <button
                  className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Активные баттлы */}
              <div className="mb-4">
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Активные баттлы
                </h4>
                
                {activeBattles.map((battle) => (
                  <div 
                    key={battle.id}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(43, 130, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      marginBottom: '4px'
                    }}
                  >
                    {battle.opponent} vs Вы
                  </div>
                ))}
              </div>

              {/* Приглашения */}
              <div className="mb-4">
                <h4 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Приглашения
                </h4>
                
                {mockBattleInvitations.map((invitation) => (
                  <div 
                    key={invitation.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    <span 
                      style={{
                        fontSize: '14px',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      {invitation.challenger}
                    </span>
                    <button
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#FF6B35',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      вызывает
                    </button>
                  </div>
                ))}
              </div>

              <div 
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  textAlign: 'center'
                }}
              >
                Всего: 3 баттлов
              </div>
            </div>

            {/* Рейтинг */}
            <div 
              className="glass-card p-4"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Рейтинг
                </h3>
                
                <button className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}>
                  <Menu className="w-4 h-4" />
                </button>
              </div>

              <div 
                style={{
                  fontSize: '14px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  marginBottom: '12px'
                }}
              >
                По уровню
              </div>

              <div className="space-y-2">
                {mockLeaderboard.map((player, index) => (
                  <div 
                    key={player.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px'
                    }}
                  >
                    <div 
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                        minWidth: '20px'
                      }}
                    >
                      {index + 1}.
                    </div>
                    <div 
                      style={{
                        flex: 1,
                        fontSize: '14px',
                        fontWeight: '500',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      {player.name}
                    </div>
                    <div 
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      Ур.{player.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ачивки */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 
                style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Ачивки
              </h3>
              
              <button
                className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: `2px dashed ${theme === 'dark' ? '#A7B0BD' : '#6B7280'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  ?
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage={currentPage}
        onNavigate={onNavigate}
        theme={theme}
        hideWhenModalOpen={true}
      />
    </div>
  );
};