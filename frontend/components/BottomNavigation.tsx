import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, CheckSquare, ShoppingCart, User } from 'lucide-react';

interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ className = '' }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/home',
      icon: Home,
      label: 'Главная',
      active: location.pathname === '/home' || location.pathname === '/' || location.pathname === ''
    },
    {
      path: '/achievements',
      icon: Trophy,
      label: 'Достижения',
      active: location.pathname === '/achievements'
    },
    {
      path: '/tasks',
      icon: CheckSquare,
      label: 'Задания',
      active: location.pathname === '/tasks'
    },
    {
      path: '/shop',
      icon: ShoppingCart,
      label: 'Магазин',
      active: location.pathname === '/shop'
    },
    {
      path: '/profile',
      icon: User,
      label: 'Профиль',
      active: location.pathname === '/profile'
    }
  ];

  return (
    <nav className={`bg-white border-t border-gray-200 px-4 py-2 ${className}`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.active
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${item.active ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className={`text-xs font-medium ${item.active ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
