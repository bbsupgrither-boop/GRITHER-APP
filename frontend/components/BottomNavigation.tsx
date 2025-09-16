import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from 'lucide-react/dist/esm/icons/home';
import TrophyIcon from 'lucide-react/dist/esm/icons/trophy';
import CheckSquareIcon from 'lucide-react/dist/esm/icons/check-square';
import ShoppingCartIcon from 'lucide-react/dist/esm/icons/shopping-cart';
import UserIcon from 'lucide-react/dist/esm/icons/user';

interface BottomNavigationProps {
  className?: string;
  theme?: 'light' | 'dark';
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function BottomNavigation({ className = '', theme, currentPage, onNavigate }: BottomNavigationProps): JSX.Element {
  const location = useLocation();

  const navItems = [
    {
      path: '/home',
      icon: HomeIcon,
      label: 'Главная',
      active: (currentPage ? currentPage === 'home' : (location.pathname === '/home' || location.pathname === '/' || location.pathname === ''))
    },
    {
      path: '/achievements',
      icon: TrophyIcon,
      label: 'Достижения',
      active: currentPage ? currentPage === 'achievements' : location.pathname === '/achievements'
    },
    {
      path: '/tasks',
      icon: CheckSquareIcon,
      label: 'Задания',
      active: currentPage ? currentPage === 'tasks' : location.pathname === '/tasks'
    },
    {
      path: '/shop',
      icon: ShoppingCartIcon,
      label: 'Магазин',
      active: currentPage ? currentPage === 'shop' : location.pathname === '/shop'
    },
    {
      path: '/profile',
      icon: UserIcon,
      label: 'Профиль',
      active: currentPage ? currentPage === 'profile' : location.pathname === '/profile'
    }
  ];

  return (
    <nav className={`bottom-nav ${className}`}>
      <div className="nav-items">
        {navItems.map((item) => {
          const Icon = item.icon;
          const pageKey = item.path.replace('/', '');
          if (onNavigate) {
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(pageKey)}
                className={`nav-item ${item.active ? 'active' : ''}`}
                aria-label={item.label}
              >
                <Icon className="nav-icon" />
              </button>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${item.active ? 'active' : ''}`}
              aria-label={item.label}
            >
              <Icon className="nav-icon" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
