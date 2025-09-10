import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Achievement } from '../types/achievements';
import { Notification } from '../types/notifications';
import { Battle, BattleInvitation, User } from '../types/battles';
import { LeaderboardEntry } from '../types/global';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  achievements: Achievement[];
  profilePhoto?: string | null;
  personalBattles: any[];
  setPersonalBattles: (battles: any[]) => void;
  theme?: 'light' | 'dark';
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onRemoveNotification?: (id: string) => void;
  onClearAllNotifications?: () => void;
  addNotification?: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  battles?: Battle[];
  battleInvitations?: BattleInvitation[];
  users?: User[];
  leaderboard?: LeaderboardEntry[];
  onCreateBattleInvitation?: (invitation: Omit<BattleInvitation, 'id' | 'createdAt' | 'expiresAt' | 'status'>) => void;
  onAcceptBattleInvitation?: (invitationId: string) => void;
  onDeclineBattleInvitation?: (invitationId: string) => void;
  onCompleteBattle?: (battleId: string, winnerId: string) => void;
  currentUser?: User;
}

export function HomePage({
  onNavigate,
  currentPage,
  onOpenSettings,
  achievements,
  profilePhoto,
  personalBattles,
  setPersonalBattles,
  theme = 'dark',
  notifications = [],
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  addNotification,
  battles = [],
  battleInvitations = [],
  users = [],
  leaderboard = [],
  onCreateBattleInvitation,
  onAcceptBattleInvitation,
  onDeclineBattleInvitation,
  onCompleteBattle,
  currentUser
}: HomePageProps) {
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <Header 
        onOpenSettings={onOpenSettings}
        profilePhoto={profilePhoto}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
        unreadCount={unreadNotifications}
        theme={theme}
      />

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        
        {/* Main Logo */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-2">GRITHER</h1>
        </div>

        {/* Achievements Card */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">аши достижения</h2>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-400 text-sm">ет достижений в процессе выполнения</p>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Статус —</span>
            <span className="text-gray-400 text-sm">XP: —</span>
            <span className="text-gray-400 text-sm">lvl —</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Battles Card */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">аттлы</h3>
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm mb-2">ктивные баттлы</p>
                <div className="bg-blue-600 rounded-lg p-3">
                  <p className="text-white text-sm font-medium">лена орозова VS ы</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400 text-sm mb-2">риглашения</p>
                <div className="space-y-2">
                  <div className="bg-orange-600 rounded-lg p-3">
                    <p className="text-white text-sm">ария Сидорова вызывает</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-white text-sm">нна ванова вызывает</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Card */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">ейтинг</h3>
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-3">о уровню</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">1. етр етров</span>
                  <span className="text-gray-400 text-sm">р.18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">2. лена орозова</span>
                  <span className="text-gray-400 text-sm">р.16</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">3. нна ванова</span>
                  <span className="text-gray-400 text-sm">р.15</span>
                </div>
              </div>
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
}
