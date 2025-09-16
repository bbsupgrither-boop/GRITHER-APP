import React from 'react';
import { BackgroundFX } from '../../components/BackgroundFX';
import { safeString, safeNumber } from '../shared/utils';

interface HomePageProps {
  theme: 'light' | 'dark';
  currentUser: any;
  notifications: any[];
  achievements: any[];
  onOpenSettings: () => void;
}

export default function HomePage({
  theme,
  currentUser,
  notifications,
  achievements,
  onOpenSettings
}: HomePageProps) {
  // AUTOGEN START home-content
  const userName = safeString(currentUser?.name, 'Пользователь');
  const userLevel = safeNumber(currentUser?.level, 1);
  const userCoins = safeNumber(currentUser?.gCoins, 0);
  
  const inProgressAchievements = achievements.filter(a => 
    a.requirements?.current < a.requirements?.target
  ).slice(0, 3);

  return (
    <div className="py-4">
      <BackgroundFX theme={theme} />
      
      {/* Hero Section */}
      <div className="glass-card p-6 mb-4">
        <h1 className="unified-heading mb-2">Добро пожаловать, {userName}!</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="unified-text">Уровень {userLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="unified-text">Баланс {userCoins} G-COIN</span>
          </div>
        </div>
      </div>

      {/* Achievements Preview */}
      {inProgressAchievements.length > 0 && (
        <div className="glass-card p-4 mb-4">
          <h2 className="unified-heading mb-3">Достижения в процессе</h2>
          <div className="space-y-3">
            {inProgressAchievements.map((achievement) => {
              const progress = achievement.requirements?.current || 0;
              const target = achievement.requirements?.target || 1;
              const percentage = Math.round((progress / target) * 100);
              
              return (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="unified-text font-medium">{achievement.title}</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="unified-text text-sm opacity-75 mt-1">
                      {progress}/{target} ({percentage}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            className="apple-button w-full mt-4"
            aria-label="Открыть полный список достижений"
          >
            Показать все достижения
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="apple-button p-4" aria-label="Открыть магазин">
            В магазин
          </button>
          <button className="apple-button p-4" aria-label="Открыть задания">
            К задачам
          </button>
          <button className="apple-button p-4" aria-label="Открыть профиль">
            В профиль
          </button>
          <button className="apple-button p-4" aria-label="Открыть уведомления">
            Уведомления
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END home-content
}
