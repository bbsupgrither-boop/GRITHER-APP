import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface HomePageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  achievements: any[];
  profilePhoto: string | null;
  personalBattles: any[];
  setPersonalBattles: (battles: any[]) => void;
  theme: 'light' | 'dark';
  notifications: any[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  addNotification: (notification: any) => void;
  battles: any[];
  battleInvitations: any[];
  users: any[];
  leaderboard: any[];
  onCreateBattleInvitation: (invitation: any) => void;
  onAcceptBattleInvitation: (id: string) => void;
  onDeclineBattleInvitation: (id: string) => void;
  onCompleteBattle: (battleId: string, winnerId: string) => void;
  currentUser: any;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currentPage,
  onOpenSettings,
  theme,
}) => {
  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        theme={theme}
        hideUserIcon={false}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            GRITHER
          </h1>
          <p className="text-lg text-gray-400">
            Приложение для Telegram
          </p>
        </div>
        
        <div className="space-y-3">
          {/* Achievement Block */}
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Ваши достижения</h2>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">👁️</span>
              </div>
            </div>
            <p className="text-gray-300">
              Нет достижений в процессе выполнения
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <h2 className="text-xl font-semibold mb-4">Статус</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Статус: Новичок</span>
              <span className="text-sm">XP: 0</span>
              <span className="text-sm">lvl 1</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          {/* Grid 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {/* Battles Card */}
            <div className={`p-6 rounded-3xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Баттлы</h2>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">+</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-gray-400 mb-2">Активные баттлы</div>
                <div className="bg-gray-700 p-3 rounded border border-blue-500">
                  <div className="text-sm">Елена Морозова VS Вы</div>
                </div>
                <div className="bg-gray-700 p-3 rounded border border-blue-500">
                  <div className="text-sm">Алексей Козлов VS Анна Иванова</div>
                </div>
                <div className="text-sm text-gray-400">+1 еще</div>
                <div className="text-sm text-gray-400 mt-3 mb-2">Приглашения</div>
                <div className="bg-gray-700 p-3 rounded border border-blue-500">
                  <div className="text-sm">Мария Сидорова вызывает</div>
                </div>
              </div>
            </div>
            
            {/* Leaderboard Card */}
            <div className={`p-6 rounded-3xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Рейтинг</h2>
                <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">
                  <span className="text-xs">☰</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-sm text-gray-400 mb-2">По уровню</div>
                <div className="space-y-2">
                  <div className="text-sm">1. Петр Петров Ур.18</div>
                  <div className="text-sm">2. Елена Мороз... Ур.16</div>
                  <div className="text-sm">3. Анна Иванова Ур.15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation 
        currentPage={currentPage}
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};