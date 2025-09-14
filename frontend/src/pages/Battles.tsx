import React from 'react';
import { Zap, Sword, Trophy } from 'lucide-react';

interface BattlesPageProps {
  theme: 'light' | 'dark';
  currentUser: any;
  notifications: any[];
  onOpenSettings: () => void;
}

export default function BattlesPage({
  theme,
  currentUser,
  notifications,
  onOpenSettings,
}: BattlesPageProps) {
  // AUTOGEN START battles-content
  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="unified-heading">Баттлы</h1>
            <p className="unified-text text-muted-foreground">
              Сражайтесь с другими игроками
            </p>
          </div>
        </div>
        
        <button className="apple-button p-3" aria-label="Создать баттл">
          <Sword className="w-5 h-5" />
        </button>
      </div>

      {/* Active Battles */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">Активные баттлы</h2>
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="unified-text font-medium">Баттл #123</h3>
              <span className="unified-text text-sm text-yellow-500">💰 500 монет</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <p className="unified-text text-sm">Вы</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <span className="unified-text text-sm">VS</span>
              <div className="flex-1">
                <p className="unified-text text-sm">Противник</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
            <button className="w-full apple-button" aria-label="Продолжить баттл">
              Продолжить баттл
            </button>
          </div>
        </div>
      </div>

      {/* Battle History */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">История баттлов</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Победа</p>
              <p className="unified-text text-sm text-muted-foreground">
                Противник: Player123 - 2 часа назад
              </p>
            </div>
            <span className="unified-text text-sm text-green-500">+250 монет</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Sword className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Поражение</p>
              <p className="unified-text text-sm text-muted-foreground">
                Противник: Player456 - 1 день назад
              </p>
            </div>
            <span className="unified-text text-sm text-red-500">-100 монет</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="apple-button p-4" aria-label="Создать баттл">
            <Sword className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">Создать баттл</span>
          </button>
          <button className="apple-button p-4" aria-label="Присоединиться к баттлу">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">Присоединиться</span>
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END battles-content
}
