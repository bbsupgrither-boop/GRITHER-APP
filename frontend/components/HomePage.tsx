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
  Shield
} from 'lucide-react';
import { Achievement } from '../types/achievements';
import { Battle, BattleInvitation, User as UserType } from '../types/battles';
import { Notification } from '../types/notifications';
import { LeaderboardEntry } from '../types/global';

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
  addNotification?: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  battles: Battle[];
  battleInvitations: BattleInvitation[];
  users: UserType[];
  leaderboard: LeaderboardEntry[];
  onCreateBattleInvitation?: (invitation: Omit<BattleInvitation, 'id' | 'createdAt' | 'expiresAt' | 'status'>) => void;
  onAcceptBattleInvitation?: (invitationId: string) => void;
  onDeclineBattleInvitation?: (invitationId: string) => void;
  onCompleteBattle?: (battleId: string) => void;
  onCreateBattle?: () => void;
  currentUser?: UserType;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currentPage,
  onOpenSettings,
  achievements,
  profilePhoto,
  personalBattles,
  setPersonalBattles,
  theme,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  addNotification,
  battles,
  battleInvitations,
  users,
  leaderboard,
  onCreateBattleInvitation,
  onAcceptBattleInvitation,
  onDeclineBattleInvitation,
  onCompleteBattle,
  onCreateBattle,
  currentUser
}) => {
  const [isAllBattlesModalOpen, setIsAllBattlesModalOpen] = useState(false);
  const [isCreateBattleModalOpen, setIsCreateBattleModalOpen] = useState(false);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  // Подготавливаем данные пользователя для отображения
  const userDisplayData = {
    id: currentUser?.id || 'placeholder',
    name: currentUser?.name || 'Пользователь',
    username: '@user',
    level: currentUser?.level || 0,
    experience: currentUser?.experience || 0,
    maxExperience: currentUser?.maxExperience || 100,
    balance: currentUser?.balance || 0,
    team: currentUser?.team || 'Не указана',
    role: currentUser?.role || 'user',
    online: currentUser?.online || false
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#12151B' : '#F5F7FA',
        position: 'relative'
      }}
    >
      <BackgroundFX theme={theme} />

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
          
          {/* Achievement Block */}
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
                onClick={() => setIsAchievementModalOpen(true)}
                className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {achievements && achievements.length > 0 ? (
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div 
                    key={achievement.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '12px'
                    }}
                  >
                    <div 
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#2B82FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}
                    >
                      ⭐
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 
                        style={{ 
                          fontSize: '14px', 
                          fontWeight: '600',
                          color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                          marginBottom: '4px'
                        }}
                      >
                        {achievement.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div 
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                  fontSize: '14px'
                }}
              >
                Нет достижений в процессе
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div 
            className="glass-card p-4"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  lvl {currentUser?.level || 1}
                </span>
                <span 
                  style={{ 
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  Опыт
                </span>
              </div>
              
              <div 
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                {currentUser?.experience || 0}/{currentUser?.maxExperience || 100} XP
              </div>
            </div>

            <div 
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  width: `${((currentUser?.experience || 0) / (currentUser?.maxExperience || 100)) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #2B82FF 0%, #40A0FF 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Battle Card + Leaderboard */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            
            {/* Battle Card */}
            <div 
              className="glass-card p-4 cursor-pointer transition-all hover:scale-[0.98]"
              onClick={() => setIsAllBattlesModalOpen(true)}
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-3">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreateBattleModalOpen(true);
                  }}
                  className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {battles && battles.length > 0 ? (
                <div className="space-y-2">
                  {battles.slice(0, 2).map((battle) => (
                    <div 
                      key={battle.id}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(43, 130, 255, 0.1)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    >
                      Баттл #{battle.id.slice(0, 6)}
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚔️</div>
                  <div style={{ fontSize: '14px', marginBottom: '4px' }}>Нет активных баттлов</div>
                  <div style={{ fontSize: '12px' }}>Нажмите + чтобы создать вызов</div>
                </div>
              )}
            </div>

            {/* Leaderboard */}
            <div 
              className="glass-card p-4"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : '#E6E9EF'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  Рейтинг
                </h3>
              </div>

              {leaderboard && leaderboard.length > 0 ? (
                <div className="space-y-2">
                  {leaderboard.slice(0, 3).map((player, index) => (
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
                      <div style={{ fontSize: '16px' }}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
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
              ) : (
                <div 
                  style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '14px'
                  }}
                >
                  Нет данных рейтинга
                </div>
              )}
            </div>
          </div>

          {/* Achievement Rewards */}
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
                onClick={() => setIsAchievementModalOpen(true)}
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
                    backgroundColor: '#2B82FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}
                >
                  ⭐
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
      />
    </div>
  );
};