import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface AchievementsPageFixedProps {
  onNavigate: (page: string) => void;
  achievements: any[];
  setAchievements: (achievements: any[]) => void;
  theme: 'light' | 'dark';
}

export const AchievementsPageFixed: React.FC<AchievementsPageFixedProps> = ({
  onNavigate,
  theme,
}) => {
  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={() => {}}
        theme={theme}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        <div className={`p-6 rounded-3xl border ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Доступные достижения</h1>
            <button className="p-2 rounded-xl bg-white/10">
              <span className="text-lg">☰</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/50">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white">🏆</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">Первые шаги</div>
                <div className="text-sm text-gray-400">Выполните первую задачу</div>
              </div>
              <div className="text-sm text-gray-400">0%</div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-700/50">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white">🏆</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">Трудолюбивый</div>
                <div className="text-sm text-gray-400">Выполните 10 задач</div>
              </div>
              <div className="text-sm text-gray-400">0%</div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation 
        currentPage="achievements"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};