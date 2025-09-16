import React, { useState } from 'react';
import User from 'lucide-react/dist/esm/icons/user';
import Settings from 'lucide-react/dist/esm/icons/settings';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Coins from 'lucide-react/dist/esm/icons/coins';
import Star from 'lucide-react/dist/esm/icons/star';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Save from 'lucide-react/dist/esm/icons/save';
import X from 'lucide-react/dist/esm/icons/x';

interface User {
  id: string;
  name: string;
  role: string;
  level: number;
  xp: number;
  coins: number;
  achievements: number;
  battlesWon: number;
  battlesLost: number;
}

interface ProfilePageProps {
  user?: User;
}

export const ProfilePage = ({ user }: ProfilePageProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || 'Пользователь');

  const mockUser: User = user || {
    id: '1',
    name: 'Иван Иванович',
    role: 'WORKER',
    level: 8,
    xp: 750,
    coins: 1250,
    achievements: 12,
    battlesWon: 5,
    battlesLost: 2
  };

  const getLevelColor = (level: number): string => {
    if (level >= 20) return '#fbbf24';
    if (level >= 15) return '#a855f7';
    if (level >= 10) return '#3b82f6';
    if (level >= 5) return '#10b981';
    return '#6b7280';
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

  const handleSaveName = () => {
    // Здесь можно добавить логику сохранения имени
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(mockUser.name);
    setIsEditing(false);
  };

  return (
    <div className="app">
      {/* Profile Header */}
      <div className="header">
        <div className="header-content">
          <div className="flex items-center space-x-4">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
              style={{ backgroundColor: getLevelColor(mockUser.level) }}
            >
              {mockUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-gray-900">{mockUser.name}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-gray-600">{getRoleDisplayName(mockUser.role)}</p>
              <p className="text-sm text-gray-500">Уровень {mockUser.level}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="container">
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">Прогресс уровня</h3>
            <span className="text-sm text-gray-500">
              {mockUser.xp || 0} / {((mockUser.level || 1) + 1) * 100} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(mockUser.xp % 100) / 100 * 100}%`,
                backgroundColor: getLevelColor(mockUser.level)
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            До следующего уровня: {((mockUser.level + 1) * 100) - mockUser.xp} XP
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="container max-w-full overflow-hidden">
        <div className="grid grid-cols-2 gap-3" style={{ maxWidth: '100%' }}>
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{mockUser.achievements}</p>
                <p className="text-sm text-gray-600">Достижений</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Coins className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{mockUser.coins}</p>
                <p className="text-sm text-gray-600">Монет</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{mockUser.battlesWon}</p>
                <p className="text-sm text-gray-600">Побед</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{mockUser.battlesLost}</p>
                <p className="text-sm text-gray-600">Поражений</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Statistics */}
      <div className="container">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Статистика битв</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Всего битв</span>
              <span className="font-semibold">{(mockUser.battlesWon || 0) + (mockUser.battlesLost || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Процент побед</span>
              <span className="font-semibold">
                {Math.round(((mockUser.battlesWon || 0) / ((mockUser.battlesWon || 0) + (mockUser.battlesLost || 0))) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Рейтинг</span>
              <span className="font-semibold text-blue-600">
                {(mockUser.battlesWon || 0) * 10 + (mockUser.level || 1) * 5}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="container pb-20">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Последняя активность</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Получено достижение "Новичок"</p>
                <p className="text-xs text-gray-500">2 часа назад</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Выиграна битва с Александром</p>
                <p className="text-xs text-gray-500">1 день назад</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Coins className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Куплен кейс с наградами</p>
                <p className="text-xs text-gray-500">2 дня назад</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
