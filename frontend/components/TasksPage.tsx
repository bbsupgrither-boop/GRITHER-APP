import React from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface TasksPageProps {
  onNavigate: (page: string) => void;
  tasks: any[];
  setTasks: (tasks: any[]) => void;
  theme: 'light' | 'dark';
}

export const TasksPage: React.FC<TasksPageProps> = ({
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
            <div className="flex items-center gap-2">
              <span className="text-lg">🕒</span>
              <h1 className="text-xl font-semibold">Доступные задачи</h1>
            </div>
            <button className="p-2 rounded-xl bg-white/10">
              <span className="text-lg">☰</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium mb-2">Создать новый компонент</div>
                  <div className="text-sm text-gray-400 mb-1">Статус: В процессе</div>
                  <div className="text-sm text-gray-400">Сотрудник: Иван Иванов, Команда разработки</div>
                </div>
                <div className="text-right">
                  <button className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm mb-2">
                    Выполнить
                  </button>
                  <div className="text-xs text-gray-400 mb-1">Время</div>
                  <div className="text-sm text-red-500">Время истекло</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation 
        currentPage="tasks"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};