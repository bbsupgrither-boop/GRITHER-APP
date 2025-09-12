import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  battles: any[];
  battleInvitations: any[];
  users: any[];
  currentUser: any;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  theme,
}) => {
  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={() => {}}
        theme={theme}
        hideUserIcon={true}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        <div className="space-y-6">
          {/* Profile Info */}
          <div className="flex gap-4">
            <div className={`p-2 rounded-3xl ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
            }`}>
              <div className="relative">
                <div className="w-24 h-24 bg-gray-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">👤</span>
                </div>
                <button className="absolute top-2 right-2 w-6 h-6 bg-black/30 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✏️</span>
                </button>
              </div>
              <div className="text-center mt-2 text-sm text-gray-400">@user</div>
            </div>
            
            <div className={`flex-1 p-4 rounded-3xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">Id:</span>
                  <span className="text-gray-400">current-user</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">Имя:</span>
                  <span className="text-gray-400">Вы</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">ДР:</span>
                  <span className="text-gray-400">—</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">Должность:</span>
                  <span className="text-gray-400">—</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">Команда:</span>
                  <span className="text-gray-400">—</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">Стаж:</span>
                  <span className="text-gray-400">—</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span className="text-gray-400 w-20">Тимлид:</span>
                  <span className="text-gray-400">—</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 w-20">Регистрация:</span>
                  <span className="text-gray-400">—</span>
                </div>
              </div>
            </div>
          </div>

          {/* My Battles */}
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Мои баттлы</h2>
              <button className="p-2 rounded-xl bg-white/10">
                <span className="text-lg">👁️</span>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👤</span>
                  </div>
                  <div>
                    <div className="text-sm">Анна Иванова</div>
                    <div className="text-xs text-gray-400">Team 1</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-500">🏆</span>
                    <span className="text-sm text-red-500">Поражение</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">150</span>
                    <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Статус: Новичок</span>
              <span className="text-sm">XP: 0</span>
              <span className="text-sm">lvl 1</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-2xl text-center ${
              theme === 'dark' 
                ? 'bg-gray-800/50' 
                : 'bg-white/80'
            }`}>
              <div className="text-sm text-gray-400 mb-1">Побед</div>
              <div className="font-semibold">0</div>
            </div>
            <div className={`p-3 rounded-2xl text-center ${
              theme === 'dark' 
                ? 'bg-gray-800/50' 
                : 'bg-white/80'
            }`}>
              <div className="text-sm text-gray-400 mb-1">Баланс</div>
              <div className="flex items-center justify-center gap-1">
                <span className="font-semibold">0</span>
                <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
              </div>
            </div>
            <div className={`p-3 rounded-2xl text-center ${
              theme === 'dark' 
                ? 'bg-gray-800/50' 
                : 'bg-white/80'
            }`}>
              <div className="text-sm text-gray-400 mb-1">Ачивки</div>
              <div className="font-semibold text-gray-400 opacity-50">—</div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation 
        currentPage="profile"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};