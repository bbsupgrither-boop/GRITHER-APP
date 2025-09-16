import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Target from 'lucide-react/dist/esm/icons/target';
import Users from 'lucide-react/dist/esm/icons/users';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Gift from 'lucide-react/dist/esm/icons/gift';
import { ProductionModal } from './ProductionModal';

interface User {
  id: string;
  name: string;
  role: string;
  level: number;
  xp: number;
  coins: number;
  achievements: number;
}

interface Battle {
  id: string;
  opponent: string;
  status: string;
}

interface BattleInvitation {
  id: string;
  challenger: string;
  status: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
}

interface HomePageProps {
  onCreateBattle: () => void;
  currentUser: User;
}

export const HomePage = ({ onCreateBattle, currentUser }: HomePageProps) => {
  // Mock data for battles
  const activeBattles: Battle[] = [
    { id: '1', opponent: 'Александр Петрович', status: 'active' }
  ];

  const mockBattleInvitations: BattleInvitation[] = [
    { id: '1', challenger: 'Мария Сергеевна', status: 'pending' },
    { id: '2', challenger: 'Дмитрий Николаевич', status: 'pending' }
  ];

  const mockLeaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Александр Александрович', level: 18 },
    { id: '2', name: 'Александр Петрович', level: 16 },
    { id: '3', name: 'Дмитрий Николаевич', level: 15 }
  ];

  // Get current level data for display
  const getCurrentLevelData = () => {
    return {
      currentXP: currentUser?.xp || 0,
      currentLevel: currentUser?.level || 1,
      nextLevelXP: (currentUser?.level || 1) * 100
    };
  };

  const getProgressPercentage = (type: string) => {
    switch (type) {
      case 'level': return 'Уровень достижений';
      case 'achievements': return 'Достижения разблокированы';
      case 'balance': return 'Баланс монет';
      default: return 'Прогресс';
    }
  };

  const getProgressValue = (type: string) => {
    const levelData = getCurrentLevelData();
    switch (type) {
      case 'level': return Math.min((levelData.currentXP / levelData.nextLevelXP) * 100, 100);
      case 'achievements': return Math.min(((currentUser?.achievements || 0) / 50) * 100, 100);
      case 'balance': return Math.min(((currentUser?.coins || 0) / 1000) * 100, 100);
      default: return 0;
    }
  };

  const [isCreateBattleModalOpen, setIsCreateBattleModalOpen] = useState(false);

  const handleCreateBattle = () => {
    setIsCreateBattleModalOpen(true);
  };

  const handleCloseCreateBattleModal = () => {
    setIsCreateBattleModalOpen(false);
  };

  return (
    <div className="app">
      {/* Main Content */}
      <div className="container">
        {/* Logo Section */}
        <div className="text-center fade-in">
          <h1>GRITHER</h1>
          <p>Добро пожаловать в мир достижений!</p>
        </div>
                  
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card fade-in">
            <div className="stat-value">{currentUser?.level || 1}</div>
            <p className="stat-label">Уровень</p>
            <div className="progress">
              <div 
                className="progress-bar"
                style={{ width: `${getProgressValue('level')}%` }}
              ></div>
            </div>
            <p className="stat-label">{Math.round(getProgressValue('level'))}% прогресс</p>
          </div>

          <div className="stat-card fade-in">
            <div className="stat-value">{currentUser?.achievements || 0}</div>
            <p className="stat-label">Достижения</p>
            <div className="progress">
              <div 
                className="progress-bar"
                style={{ width: `${getProgressValue('achievements')}%` }}
              ></div>
            </div>
            <p className="stat-label">{Math.round(getProgressValue('achievements'))}% прогресс</p>
          </div>

          <div className="stat-card fade-in">
            <div className="stat-value">{currentUser?.coins || 0}</div>
            <p className="stat-label">Монеты</p>
            <div className="progress">
              <div 
                className="progress-bar"
                style={{ width: `${getProgressValue('balance')}%` }}
              ></div>
            </div>
            <p className="stat-label">{Math.round(getProgressValue('balance'))}% прогресс</p>
          </div>
        </div>

        {/* Battle Section */}
        <div className="card fade-in">
          <div className="card-content">
            <h3>Битвы</h3>
            <button 
              onClick={handleCreateBattle}
              className="btn btn-primary"
            >
              Создать битву
            </button>
          </div>

          {activeBattles.length > 0 ? (
            <div className="space-y-3">
              {activeBattles.map((battle) => (
                <div key={battle.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Битва с {battle.opponent}</p>
                      <p className="text-sm text-gray-500">Статус: Активна</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Продолжить
                  </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">У вас пока нет активных битв</p>
              <button
                onClick={handleCreateBattle}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Создать первую битву
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link 
            to="/achievements" 
            className="card fade-in"
          >
            <div className="card-content">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-accent-w-1" />
                <div>
                  <p className="font-medium">Достижения</p>
                  <p className="text-sm opacity-90">Просмотреть награды</p>
                </div>
              </div>
            </div>
          </Link>

          <Link 
            to="/shop" 
            className="card fade-in"
          >
            <div className="card-content">
              <div className="flex items-center space-x-3">
                <Gift className="w-6 h-6 text-accent-c-1" />
                <div>
                  <p className="font-medium">Магазин</p>
                  <p className="text-sm opacity-90">Купить предметы</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="card fade-in">
          <div className="card-content">
            <h3>Лидерборд</h3>
            <div className="space-y-3">
            {mockLeaderboard.map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{entry.name}</p>
                    <p className="text-sm text-gray-500">Уровень {entry.level}</p>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Battle Modal */}
      <ProductionModal
        isOpen={isCreateBattleModalOpen}
        onClose={handleCloseCreateBattleModal}
        title="Создать битву"
        modalId="create-battle-modal"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Выберите противника для битвы:</p>
          <div className="space-y-2">
            {mockBattleInvitations.map((invitation) => (
              <button
                key={invitation.id}
                className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{invitation.challenger}</span>
                  <span className="text-sm text-gray-500">Пригласить</span>
                </div>
              </button>
            ))}
                </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleCloseCreateBattleModal}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={() => {
                onCreateBattle();
                handleCloseCreateBattleModal();
              }}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Создать
            </button>
            </div>
        </div>
        </ProductionModal>
    </div>
  );
};
