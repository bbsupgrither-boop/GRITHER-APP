import React from 'react';
import { User as UserIcon, Edit3, Trophy, Calendar, Zap, Coins } from 'lucide-react';

interface ProfilePageProps {
  theme: 'light' | 'dark';
  user: any;
  setUser: (user: any) => void;
  battles: any[];
  leaderboard: any[];
}

export default function ProfilePage({
  theme,
  user,
  setUser,
  battles,
  leaderboard,
}: ProfilePageProps) {
  // AUTOGEN START profile-content
  return (
    <div className="py-4">
      {/* Profile Header */}
      <div className="glass-card p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="unified-heading mb-1">{user?.name || 'Пользователь'}</h1>
            <p className="unified-text text-muted-foreground">
              Уровень {user?.level || 1}
            </p>
          </div>
          <button className="apple-button p-3" aria-label="Редактировать профиль">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <Coins className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
            <p className="unified-text text-sm text-muted-foreground">Монеты</p>
            <p className="unified-heading">{user?.gCoins || 0}</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
            <p className="unified-text text-sm text-muted-foreground">Достижения</p>
            <p className="unified-heading">{user?.achievements?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">Последняя активность</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Получено достижение</p>
              <p className="unified-text text-sm text-muted-foreground">
                "Новичок" - 2 часа назад
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Завершена задача</p>
              <p className="unified-text text-sm text-muted-foreground">
                "Изучить документацию" - 1 день назад
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Настройки</h2>
        <div className="space-y-3">
          <button className="w-full p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎨</span>
              <span className="unified-text">Тема оформления</span>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <span className="unified-text">Уведомления</span>
            </div>
          </button>
          
          <button className="w-full p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span className="unified-text">Статистика</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END profile-content
}
