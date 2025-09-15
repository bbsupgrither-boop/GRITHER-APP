import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { Logo } from './Logo';
import { ProductionModal } from './ProductionModal';
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

  // Sorting state for leaderboard
  const [leaderboardSort, setLeaderboardSort] = useState<'level' | 'achievements' | 'balance'>('level');
  
  // Achievements modal state
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'level': return 'По уровню';
      case 'achievements': return 'По достижениям';
      case 'balance': return 'По балансу';
      default: return 'По уровню';
    }
  };

  const cycleSort = () => {
    const sorts: Array<'level' | 'achievements' | 'balance'> = ['level', 'achievements', 'balance'];
    const currentIndex = sorts.indexOf(leaderboardSort);
    const nextIndex = (currentIndex + 1) % sorts.length;
    setLeaderboardSort(sorts[nextIndex]);
  };

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
        user={currentUser}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />

      {/* Hero Zone */}
      <div 
        className="relative w-full"
        style={{
          height: 'clamp(160px, 180px, 200px)',
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
          paddingBottom: '128px'
        }}
      >
        {/* AUTOGEN START home-content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '448px',
            margin: '0 auto',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: 'calc(96px + env(safe-area-inset-bottom))'
          }}
        >
          
          {/* Ваши достижения - одна панелька с достижениями внутри */}
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
                onClick={() => setIsAchievementsModalOpen(true)}
                aria-label="Открыть ближайшие достижения"
                className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Достижения внутри панельки */}
            <div className="space-y-3">
              {[
                { name: 'Новичок', progress: 50, description: 'Достигните 2 уровня', rarity: 'common' },
                { name: 'Трудолюбивый', progress: 30, description: 'Выполните 10 задач', rarity: 'rare' },
                { name: 'Коллекционер', progress: 20, description: 'Откройте 5 кейсов', rarity: 'epic' }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Achievement icon */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor: '#3B82F6'
                    }}
                  >
                    🛡️
                  </div>
                  
                  {/* Achievement info */}
                  <div className="flex-1">
                    <div 
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                        marginBottom: '2px'
                      }}
                    >
                      {achievement.name}
                    </div>
                    <div 
                      style={{
                        fontSize: '12px',
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                        marginBottom: '4px'
                      }}
                    >
                      {achievement.description}
                    </div>
                  </div>
                  
                  {/* Progress percentage */}
                  <div 
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#3B82F6'
                    }}
                  >
                    {achievement.progress}%
                  </div>
                </div>
              ))}
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
                  <button
                    onClick={() => {
                      // TODO: Open XP modal
                    }}
                    style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#2B82FF' : '#2B82FF',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600',
                      textDecoration: 'underline'
                    }}
                    aria-label={`Открыть детали опыта: ${userExperience} XP`}
                  >
                    XP: {userExperience}
                  </button>
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
                  aria-label="Создать баттл"
                  className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
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
                
                <button 
                  onClick={cycleSort}
                  aria-label={`Сменить сортировку: ${getSortLabel(leaderboardSort)}`}
                  className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
                >
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
                {getSortLabel(leaderboardSort)}
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
                onClick={() => onNavigate('achievements')}
                aria-label="Перейти к странице ачивок"
                className={`apple-button w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-[transform,opacity] duration-200 active:scale-95 ${theme === 'dark' ? 'white-button' : ''}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {[
                { icon: '🏆', rarity: 'legendary', completed: true },
                { icon: '🥇', rarity: 'epic', completed: true },
                { icon: '🥈', rarity: 'rare', completed: true },
                { icon: '🥉', rarity: 'common', completed: false },
                { icon: '🎯', rarity: 'common', completed: false }
              ].map((achievement, index) => (
                <div
                  key={index}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: achievement.completed 
                      ? (achievement.rarity === 'legendary' ? '#fbbf24' :
                         achievement.rarity === 'epic' ? '#a855f7' :
                         achievement.rarity === 'rare' ? '#3b82f6' : '#6b7280')
                      : 'transparent',
                    border: achievement.completed 
                      ? `2px solid ${theme === 'dark' ? '#FFFFFF' : '#000000'}`
                      : `2px dashed ${theme === 'dark' ? '#A7B0BD' : '#6B7280'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: achievement.completed ? 'white' : (theme === 'dark' ? '#A7B0BD' : '#6B7280'),
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {achievement.completed ? achievement.icon : '?'}
                  
                  {/* Rarity glow effect for completed achievements */}
                  {achievement.completed && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-2px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${
                          achievement.rarity === 'legendary' ? 'rgba(251, 191, 36, 0.3)' :
                          achievement.rarity === 'epic' ? 'rgba(168, 85, 247, 0.3)' :
                          achievement.rarity === 'rare' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(107, 114, 128, 0.3)'
                        } 0%, transparent 70%)`,
                        zIndex: -1
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* AUTOGEN END home-content */}
      </div>

      {/* Achievements Modal */}
      <ProductionModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        title="Ближайшие достижения"
        modalId="achievements-modal"
      >
        <div className="space-y-4">
          {/* Top 6 closest achievements or all available if less than 6 */}
          {[
            { name: 'Первый шаг', progress: 75, rarity: 'common', description: 'Выполните первую задачу' },
            { name: 'Активный участник', progress: 45, rarity: 'rare', description: 'Выполните 5 задач' },
            { name: 'Мастер баттлов', progress: 90, rarity: 'epic', description: 'Выиграйте 3 баттла' },
            { name: 'Покупатель', progress: 30, rarity: 'common', description: 'Совершите 3 покупки' },
            { name: 'Воин', progress: 60, rarity: 'rare', description: 'Выиграйте 2 баттла' },
            { name: 'Трудолюбивый', progress: 20, rarity: 'epic', description: 'Выполните 15 задач' }
          ].slice(0, 6).map((achievement, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg" style={{
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
            }}>
              {/* Achievement icon */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{
                  backgroundColor: achievement.rarity === 'common' ? '#6b7280' : 
                                 achievement.rarity === 'rare' ? '#3b82f6' :
                                 achievement.rarity === 'epic' ? '#a855f7' : '#fbbf24'
                }}
              >
                🏆
              </div>
              
              {/* Achievement info */}
              <div className="flex-1">
                <div 
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '4px'
                  }}
                >
                  {achievement.name}
                </div>
                <div 
                  style={{
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    marginBottom: '6px'
                  }}
                >
                  {achievement.description}
                </div>
                
                {/* Progress bar */}
                <div 
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: theme === 'dark' ? '#2A2F36' : '#E6E9EF',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      width: `${achievement.progress}%`,
                      height: '100%',
                      backgroundColor: theme === 'dark' ? '#2B82FF' : '#2B82FF',
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                
                <div 
                  style={{
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    marginTop: '4px'
                  }}
                >
                  {achievement.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>
        </ProductionModal>

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