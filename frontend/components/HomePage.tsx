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
  profilePhoto: string | null;
  personalBattles: any[];
  setPersonalBattles: (battles: any[]) => void;
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
  onCompleteBattle?: (battleId: string, winnerId: string) => void;
  currentUser: UserType | null;
}

// Mock data for testing
const mockUsers = [
  { id: '1', name: 'Анна Иванова', team: 'Team 1', level: 15, balance: '5400g', achievements: 32 },
  { id: '2', name: 'Петр Петров', team: 'Team 2', level: 12, balance: '8200g', achievements: 28 },
  { id: '3', name: 'Мария Сидорова', team: 'Team 3', level: 18, balance: '3600g', achievements: 45 }
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
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
  currentUser
}) => {
  // Modal states
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isAllBattlesModalOpen, setIsAllBattlesModalOpen] = useState(false);
  const [isCreateBattleModalOpen, setIsCreateBattleModalOpen] = useState(false);
  const [isXpDialogOpen, setIsXpDialogOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

  // Selection states
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);

  // Sort states
  const [sortType, setSortType] = useState<'level' | 'achievements' | 'balance'>('level');

  // User display data
  const userDisplayData = {
    id: currentUser?.id || 'placeholder',
    name: currentUser?.name || 'Пользователь',
    username: '@user',
    level: currentUser?.level || 1,
    experience: currentUser?.experience || 0,
    maxExperience: currentUser?.maxExperience || 100,
    balance: currentUser?.balance || 1000
  };

  // Filter achievements in progress (0% < progress < 100%)
  const achievementsInProgress = achievements.filter(achievement => {
    const percentage = (achievement.requirements.current / achievement.requirements.target) * 100;
    return percentage > 0 && percentage < 100;
  }).sort((a, b) => {
    const percentA = (a.requirements.current / a.requirements.target) * 100;
    const percentB = (b.requirements.current / b.requirements.target) * 100;
    return percentB - percentA;
  });

  // Top 3 achievements for homepage
  const topAchievements = achievementsInProgress.slice(0, 3);

  // Filter completed achievements (100% completed)
  const completedAchievements = achievements.filter(achievement => {
    const percentage = (achievement.requirements.current / achievement.requirements.target) * 100;
    return percentage >= 100;
  });

  // Create 5 slots for achievements display
  const achievementSlots = Array(5).fill(null).map((_, index) => 
    completedAchievements[index] || null
  );

  // Battle data
  const activeBattles = battles.filter(b => b.status === 'active');
  const pendingInvitations = battleInvitations.filter(i => i.status === 'pending');
  const totalBattleCount = activeBattles.length + pendingInvitations.length;

  // Sort users for leaderboard
  const sortUsers = (users: any[], sortType: 'level' | 'achievements' | 'balance') => {
    return [...users].sort((a, b) => {
      switch (sortType) {
        case 'level':
          return b.level - a.level;
        case 'achievements':
          return b.achievements - a.achievements;
        case 'balance':
          const balanceA = parseInt(a.balance.replace('g', ''));
          const balanceB = parseInt(b.balance.replace('g', ''));
          return balanceB - balanceA;
        default:
          return 0;
      }
    });
  };

  // Get status by level
  const getStatusByLevel = (level: number) => {
    if (level === 1) return 'Новичок';
    if (level <= 5) return 'Ученик';
    if (level <= 10) return 'Специалист';
    if (level <= 15) return 'Эксперт';
    if (level <= 20) return 'Мастер';
    return 'Легенда';
  };

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'rgba(255, 193, 7, 0.20)';
      case 'epic': return 'rgba(156, 39, 176, 0.20)';
      case 'rare': return 'rgba(33, 150, 243, 0.20)';
      default: return 'rgba(43, 130, 255, 0.20)';
    }
  };

  // Get achievement icon
  const getAchievementIcon = (icon: string, rarity: string) => {
    const iconStyle = {
      legendary: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
      epic: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      rare: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      common: 'linear-gradient(135deg, #2B82FF 0%, #1E40AF 100%)'
    };

    return (
      <div 
        className="w-full h-full rounded-full flex items-center justify-center"
        style={{ background: iconStyle[rarity as keyof typeof iconStyle] || iconStyle.common }}
      >
        <Trophy className="w-6 h-6 text-white" />
      </div>
    );
  };

  // Handlers
  const handleSelectionModeToggle = () => {
    setIsSelectionMode(!isSelectionMode);
    if (!isSelectionMode) {
      setSelectedAchievements(completedAchievements.slice(0, 5).map(a => a.id));
    }
  };

  const handleAchievementToggle = (achievementId: string) => {
    setSelectedAchievements(prev => {
      if (prev.includes(achievementId)) {
        return prev.filter(id => id !== achievementId);
      } else if (prev.length < 5) {
        return [...prev, achievementId];
      }
      return prev;
    });
  };

  const handleConfirmSelection = () => {
    setIsSelectionMode(false);
    console.log('Selected achievements:', selectedAchievements);
  };

  const nextSortType = () => {
    setSortType(prev => 
      prev === 'level' ? 'balance' : 
      prev === 'balance' ? 'achievements' : 'level'
    );
  };

  return (
    <div className="min-h-screen">
      {/* Background Effects - Multi-layer gradient system */}
      <BackgroundFX theme={theme} isHomePage={true} />

      {/* Header */}
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        theme={theme}
      />

      {/* Hero Zone - Logo */}
      <div 
        className="hero-zone relative w-full"
        style={{ 
          height: 'clamp(160px, 180px, 200px)',
          marginTop: '0px',
          marginBottom: '8px',
          overflow: 'visible',
          background: 'transparent',
          zIndex: 10,
          position: 'relative',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Logo theme={theme} />
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-32 relative z-10">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Achievement Block */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8"></div>
              <h2 className="text-xl font-semibold">Ваши достижения</h2>
              <button 
                onClick={() => setIsAchievementModalOpen(true)}
                className="p-2 rounded-full transition-all hover:scale-105"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
            
            {topAchievements.length > 0 ? (
              <div className="space-y-3">
                {topAchievements.map((achievement) => {
                  const percentage = Math.round((achievement.requirements.current / achievement.requirements.target) * 100);
                  return (
                    <div key={achievement.id} className="relative p-4 rounded-2xl border overflow-hidden">
                      {/* Progress Background */}
                      <div 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: 'rgba(43, 130, 255, 0.10)',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '16px'
                        }} 
                      />
                      
                      {/* Content */}
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                          >
                            <Trophy className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{achievement.title}</div>
                            <div className="text-xs text-gray-400">{achievement.description}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-500">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[60px]">
                <p className="text-center opacity-70 text-sm">
                  Нет достижений в процессе выполнения
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="glass-card p-6">
            <div className="flex items-center mb-4 px-1 gap-2">
              <span className="text-gray-400 whitespace-nowrap text-xs">
                Статус: {getStatusByLevel(userDisplayData.level)}
              </span>
              
              <button 
                onClick={() => setIsXpDialogOpen(true)}
                className="flex-1 text-center text-sm font-medium"
              >
                XP: {userDisplayData.experience}
              </button>
              
              <span className="text-right whitespace-nowrap text-xs">
                lvl {userDisplayData.level}
              </span>
            </div>
            
            <div 
              className="w-full rounded-full h-3"
              style={{
                backgroundColor: theme === 'dark' ? '#0F1116' : '#ECEFF3',
                border: `1px solid ${theme === 'dark' ? '#2A2F36' : '#E6E9EF'}`
              }}
            >
              <div 
                className="h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((userDisplayData.experience / userDisplayData.maxExperience) * 100, 100)}%`,
                  background: theme === 'dark' 
                    ? '#2B82FF'
                    : 'linear-gradient(90deg, #2B82FF 0%, #62A6FF 100%)'
                }}
              />
            </div>
          </div>

          {/* Battles and Leaderboard Grid */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Battle Card */}
            <div 
              onClick={() => setIsAllBattlesModalOpen(true)}
              className="glass-card p-4 cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.96]"
            >
              <div className="relative">
                <h3 className="text-center font-medium mb-3">Баттлы</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCreateBattleModalOpen(true);
                  }}
                  className="apple-button absolute top-0 right-0 w-7 h-7 flex items-center justify-center"
                >
                  <Plus style={{ width: '14px', height: '14px' }} />
                </button>
              </div>

              {totalBattleCount > 0 ? (
                <div className="space-y-3">
                  {activeBattles.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-2">Активные баттлы</div>
                      <div className="space-y-2">
                        {activeBattles.slice(0, 2).map((battle, index) => (
                          <div key={index} className="flex items-center py-2 px-3 rounded-xl" style={{
                            background: 'rgba(43, 130, 255, 0.05)',
                            border: '1px solid rgba(43, 130, 255, 0.15)'
                          }}>
                            <span className="text-xs">{battle.challengerName || 'Игрок 1'}</span>
                            <span className="text-xs mx-1">VS</span>
                            <span className="text-xs">{battle.opponentName || 'Игрок 2'}</span>
                          </div>
                        ))}
                        {activeBattles.length > 2 && (
                          <div className="text-xs text-center">
                            +{activeBattles.length - 2} еще
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {pendingInvitations.length > 0 && (
                    <div>
                      <div className="text-xs font-medium mb-2">Приглашения</div>
                      <div className="space-y-2">
                        {pendingInvitations.slice(0, 2).map((invitation, index) => (
                          <div key={index} className="flex items-center py-2 px-3 rounded-xl" style={{
                            background: 'rgba(255, 159, 10, 0.05)',
                            border: '1px solid rgba(255, 159, 10, 0.15)'
                          }}>
                            <span className="text-xs">{invitation.challengerName || 'Игрок'} вызывает</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-center pt-2 border-t">
                    Всего: {totalBattleCount} {totalBattleCount === 1 ? 'баттл' : 'баттлов'}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-2xl mb-2">⚔️</div>
                  <p className="text-xs">Нет активных баттлов</p>
                  <p className="text-xs mt-1">Нажмите + чтобы создать вызов</p>
                </div>
              )}
            </div>

            {/* Battle Leaderboard */}
            <div 
              onClick={() => setIsLeaderboardModalOpen(true)}
              className="glass-card p-4 cursor-pointer transition-all hover:scale-[0.98] active:scale-[0.96]"
            >
              <div className="relative">
                <h3 className="text-center font-medium mb-3">Рейтинг</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSortType();
                  }}
                  className="apple-button absolute top-0 right-0 w-7 h-7 flex items-center justify-center"
                >
                  <Menu style={{ width: '14px', height: '14px' }} />
                </button>
                <p className="text-xs opacity-60 mt-1 text-center">
                  {sortType === 'level' ? 'По уровню' : 
                   sortType === 'balance' ? 'По балансу' : 
                   'По достижениям'}
                </p>
              </div>

              <div className="space-y-2">
                {sortUsers(mockUsers, sortType).slice(0, 3).map((user, index) => (
                  <div key={`${user.id}-${sortType}`} className="flex items-center gap-2 text-xs fade-in">
                    <span className="font-medium w-4">{index + 1}.</span>
                    <span className="truncate flex-1">{user.name}</span>
                    <span className="text-xs font-medium">
                      {sortType === 'level' && `Ур.${user.level}`}
                      {sortType === 'achievements' && `${user.achievements}★`}
                      {sortType === 'balance' && user.balance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievement Rewards Panel */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <h3 className="font-medium">Ачивки</h3>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('EYE BUTTON CLICKED! Opening modal...');
                  setIsRewardModalOpen(true);
                  
                  if (addNotification) {
                    addNotification({
                      type: 'system',
                      title: '👁️ Модал достижений открыт',
                      message: 'Проверка работы кнопки-глазика',
                      priority: 'low'
                    });
                  }
                }}
                className="p-2 rounded-full transition-all hover:scale-105"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center gap-3">
              {achievementSlots.map((achievement, index) => (
                <div key={index} className="flex items-center justify-center">
                  {achievement ? (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                      background: achievement.rarity === 'legendary' 
                        ? 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)'
                        : achievement.rarity === 'epic' 
                          ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)'
                          : achievement.rarity === 'rare' 
                            ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                            : 'linear-gradient(135deg, #2B82FF 0%, #1E40AF 100%)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)',
                      border: '2px solid rgba(255, 255, 255, 0.20)'
                    }}>
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed" style={{
                      backgroundColor: 'rgba(107, 114, 128, 0.10)',
                      borderColor: 'rgba(107, 114, 128, 0.30)'
                    }}>
                      <Trophy className="w-5 h-5 text-gray-400 opacity-40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="home"
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Achievement Modal */}
      {isAchievementModalOpen && (
        <div className="fixed inset-0 modal-backdrop-light dark:modal-backdrop-dark flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="relative mb-6">
              <button 
                onClick={() => setIsAchievementModalOpen(false)}
                className="apple-button p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-center text-xl font-semibold">Ваши достижения</h2>
            </div>
            
            <div className="space-y-3">
              {achievementsInProgress.length > 0 ? (
                achievementsInProgress.map((achievement) => {
                  const percentage = Math.round((achievement.requirements.current / achievement.requirements.target) * 100);
                  return (
                    <div key={achievement.id} className="relative p-4 rounded-2xl border overflow-hidden">
                      <div 
                        style={{ 
                          width: `${percentage}%`,
                          background: 'linear-gradient(90deg, rgba(43, 130, 255, 0.15) 0%, rgba(43, 130, 255, 0.05) 100%)',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '16px'
                        }} 
                      />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                          >
                            <Trophy className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{achievement.title}</div>
                            <div className="text-xs text-gray-400">
                              {achievement.requirements.current}/{achievement.requirements.target}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-500">{percentage}%</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center min-h-[120px]">
                  <p className="text-gray-400 text-center">
                    Нет достижений в процессе выполнения
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {isRewardModalOpen && (
        <div className="fixed inset-0 modal-backdrop-light dark:modal-backdrop-dark flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="relative mb-6">
              <button 
                onClick={() => setIsRewardModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-center text-xl font-semibold">Полученные ачивки</h2>
              
              {!isSelectionMode ? (
                <button 
                  onClick={handleSelectionModeToggle}
                  className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleConfirmSelection}
                  className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>

            {isSelectionMode && (
              <div className="mb-4 p-3 rounded-xl border border-blue-500/30" style={{
                background: theme === 'dark' ? 'rgba(43, 130, 255, 0.05)' : 'rgba(43, 130, 255, 0.05)'
              }}>
                <p className="text-xs text-center text-gray-400">
                  Выберите до 5 достижений для отображения на главной странице
                </p>
                <p className="text-xs text-center text-blue-500 mt-1">
                  Выбрано: {selectedAchievements.length}/5
                </p>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              {completedAchievements.map((achievement) => {
                const isSelected = selectedAchievements.includes(achievement.id);
                const canSelect = selectedAchievements.length < 5 || isSelected;
                
                return (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center gap-2 ${
                      isSelectionMode && canSelect ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => isSelectionMode && canSelect && handleAchievementToggle(achievement.id)}
                  >
                    <div className={`relative w-16 h-16 rounded-full ${isSelected ? 'border-blue-500' : 'border-white/20'}`}>
                      {getAchievementIcon(achievement.icon || 'trophy', achievement.rarity)}
                      
                      {isSelectionMode && isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs font-medium text-center overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {achievement.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* XP Modal */}
      {isXpDialogOpen && (
        <div className="fixed inset-0 modal-backdrop-light dark:modal-backdrop-dark flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Информация об опыте</h2>
              <button
                onClick={() => setIsXpDialogOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="text-sm font-medium mb-2">Текущий уровень</div>
                <div className="text-2xl font-bold text-blue-500">Уровень {userDisplayData.level}</div>
                <div className="text-sm text-gray-400">
                  {userDisplayData.experience} / {userDisplayData.maxExperience} XP
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="text-sm font-medium mb-2">Статус</div>
                <div className="text-lg font-semibold">{getStatusByLevel(userDisplayData.level)}</div>
              </div>

              <div className="text-xs text-gray-400">
                Получайте опыт за выполнение задач, участие в баттлах и достижение целей!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Battles Modal */}
      {isAllBattlesModalOpen && (
        <div className="fixed inset-0 modal-backdrop-light dark:modal-backdrop-dark flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Все баттлы</h2>
              <button
                onClick={() => setIsAllBattlesModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {totalBattleCount > 0 ? (
                <>
                  {activeBattles.map((battle, index) => (
                    <div key={index} className="p-4 rounded-xl border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{battle.title || 'Баттл'}</span>
                        <span className="text-sm text-blue-500">Активен</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {battle.challengerName || 'Игрок 1'} VS {battle.opponentName || 'Игрок 2'}
                      </div>
                    </div>
                  ))}
                  
                  {pendingInvitations.map((invitation, index) => (
                    <div key={index} className="p-4 rounded-xl border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Приглашение</span>
                        <span className="text-sm text-orange-500">Ожидает</span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        {invitation.challengerName || 'Игрок'} вызывает вас на бой
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 px-4 rounded-xl bg-green-500 text-white text-sm">
                          Принять
                        </button>
                        <button className="flex-1 py-2 px-4 rounded-xl bg-red-500 text-white text-sm">
                          Отклонить
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">⚔️</div>
                  <p className="text-gray-400">Нет активных баттлов</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Battle Modal */}
      {isCreateBattleModalOpen && (
        <div className="fixed inset-0 modal-backdrop-light dark:modal-backdrop-dark flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Создать баттл</h2>
              <button
                onClick={() => setIsCreateBattleModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Выберите противника</label>
                <select className="w-full p-3 rounded-xl border">
                  <option>Анна Иванова</option>
                  <option>Петр Петров</option>
                  <option>Мария Сидорова</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ставка (монеты)</label>
                <input 
                  type="number" 
                  placeholder="100" 
                  className="w-full p-3 rounded-xl border"
                />
              </div>

              <button className="w-full py-3 px-4 rounded-xl bg-blue-500 text-white">
                Создать вызов
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardModalOpen && (
        <div className="fixed inset-0 modal-backdrop-light dark:modal-backdrop-dark flex items-center justify-center z-50">
          <div className="glass-card p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Полный рейтинг</h2>
              <button
                onClick={() => setIsLeaderboardModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
                {sortUsers(mockUsers, sortType).map((user, index) => (
                  <div key={`${user.id}-${sortType}`} className="flex items-center gap-3 p-3 rounded-xl border fade-in">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {sortType === 'level' && `Ур.${user.level}`}
                      {sortType === 'achievements' && `${user.achievements}★`}
                      {sortType === 'balance' && user.balance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};