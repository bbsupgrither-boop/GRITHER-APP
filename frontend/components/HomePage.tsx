import React, { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { Hero } from './Hero';
import { AchievementBlock } from './AchievementBlock';
import { ProgressBar } from './ProgressBar';
import { BattleCard } from './BattleCard';
import { BattleLeaderboard } from './BattleLeaderboard';
import { AchievementRewards } from './AchievementRewards';
import { ModalXP } from './ModalXP';
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
  currentUser,
  onCreateBattle,
  onAcceptBattleInvitation,
  onDeclineBattleInvitation
}) => {
  // Отладочная информация
  console.log('🔥 HomePage rendering with:', {
    theme,
    achievements: achievements?.length,
    battles: battles?.length,
    notifications: notifications?.length,
    currentUser: currentUser?.name
  });
  const [isAllBattlesModalOpen, setIsAllBattlesModalOpen] = useState(false);
  const [isCreateBattleModalOpen, setIsCreateBattleModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isXPModalOpen, setIsXPModalOpen] = useState(false);

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
      {/* Отладочный блок */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        right: '10px',
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        zIndex: 9999,
        fontSize: '12px',
        borderRadius: '8px'
      }}>
        🚀 Умный автодеплой работает! Theme: {theme}, Achievements: {achievements?.length || 0}
      </div>
      
      <BackgroundFX theme={theme} />

      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        onOpenSettings={onOpenSettings}
        theme={theme}
        user={userDisplayData}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />

      {/* Hero Zone */}
      <Hero theme={theme} />

      {/* Main Content Area */}
      <div 
        style={{
          maxWidth: '448px',
          margin: '0 auto',
          padding: '0 16px',
          paddingBottom: '128px' // Компенсация для нижней навигации
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Achievement Block */}
          <AchievementBlock 
            achievements={achievements}
            theme={theme}
            onViewAll={() => setIsAchievementsModalOpen(true)}
          />

          {/* Progress Bar */}
          <ProgressBar 
            level={userDisplayData.level}
            experience={userDisplayData.experience}
            maxExperience={userDisplayData.maxExperience}
            theme={theme}
            onExperienceClick={() => setIsXPModalOpen(true)}
          />

          {/* Battle Card + Leaderboard (2 колонки) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <BattleCard 
              battles={battles}
              invitations={battleInvitations}
              theme={theme}
              onCreateBattle={() => setIsCreateBattleModalOpen(true)}
              onViewAll={() => setIsAllBattlesModalOpen(true)}
            />
            
            <BattleLeaderboard 
              leaderboard={leaderboard}
              theme={theme}
            />
          </div>

          {/* Achievement Rewards */}
          <AchievementRewards 
            achievements={achievements}
            theme={theme}
            onViewAll={() => setIsAchievementsModalOpen(true)}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage={currentPage}
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* XP Modal */}
      <ModalXP 
        isOpen={isXPModalOpen}
        onClose={() => setIsXPModalOpen(false)}
        level={userDisplayData.level}
        experience={userDisplayData.experience}
        maxExperience={userDisplayData.maxExperience}
        theme={theme}
      />
    </div>
  );
};