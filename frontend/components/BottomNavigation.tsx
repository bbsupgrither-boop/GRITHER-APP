import React from 'react';
import { Home, Trophy, CheckSquare, ShoppingCart } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  onNavigate,
  theme,
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'achievements', icon: Trophy, label: 'Достижения' },
    { id: 'tasks', icon: CheckSquare, label: 'Задачи' },
    { id: 'cases', icon: ShoppingCart, label: 'Магазин' },
  ];

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 ${
      theme === 'dark' 
        ? 'bg-gray-800/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    } rounded-3xl border px-3 py-2 max-w-[320px] w-full mx-4`}>
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};