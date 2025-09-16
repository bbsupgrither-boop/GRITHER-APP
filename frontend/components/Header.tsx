import React from 'react';
import Bell from 'lucide-react/dist/esm/icons/bell';
import Settings from 'lucide-react/dist/esm/icons/settings';

interface User {
  id: string;
  name: string;
  role: string;
  level: number;
  xp: number;
  coins: number;
  notifications: number;
  rewards: number;
}

interface HeaderProps {
  user: User;
  onNotificationsClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export const Header = ({
  user,
  onNotificationsClick,
  onSettingsClick,
  onProfileClick
}: HeaderProps): JSX.Element => {
  const getLevelColor = (level: number): string => {
    if (level >= 20) return '#fbbf24'; // Золотой уровень GRITHER
    if (level >= 15) return '#a855f7'; // Фиолетовый уровень GLEB
    if (level >= 10) return '#3b82f6'; // Синий уровень SUPPORT
    if (level >= 5) return '#10b981'; // Зеленый уровень TEAMLEAD
    return '#6b7280'; // Серый уровень WORKER
  };

  const getRoleDisplayName = (role: string): string => {
    const roleMap: { [key: string]: string } = {
      'GRITHER': 'GRITHER',
      'GLEB': 'GLEB',
      'SUPPORT': 'SUPPORT',
      'TEAMLEAD': 'TEAMLEAD',
      'WORKER': 'WORKER'
    };
    return roleMap[role] || role;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="flex items-center justify-between">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onProfileClick}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: getLevelColor(user.level) }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <h2 className="font-semibold text-gray-900 text-sm">{user.name}</h2>
                <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={onNotificationsClick}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
              </button>
              {user.notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {user.notifications}
                </span>
              )}
            </div>

            {/* Settings */}
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Уровень {user.level}</span>
            <span className="text-xs text-gray-500">{user.xp} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((user.xp % 100) / 100 * 100, 100)}%`,
                backgroundColor: getLevelColor(user.level)
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};
