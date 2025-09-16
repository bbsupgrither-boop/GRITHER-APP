import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Target, 
  Users, 
  Zap, 
  Star,
  TrendingUp,
  Award,
  Coins,
  Gift
} from 'lucide-react';
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

export const HomePage: React.FC<HomePageProps> = ({
  onCreateBattle,
  currentUser
}) => {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Logo Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GRITHER</h1>
          <p className="text-gray-600">Добро пожаловать в мир достижений!</p>
        </div>
                  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Уровень</p>
                <p className="text-2xl font-bold text-blue-600">{currentUser?.level || 1}</p>
                    </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Прогресс</span>
                <span>{Math.round(getProgressValue('level'))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressValue('level')}%` }}
                ></div>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
                <div>
                <p className="text-sm text-gray-500">Достижения</p>
                <p className="text-2xl font-bold text-green-600">{currentUser?.achievements || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
                </div>
                </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Прогресс</span>
                <span>{Math.round(getProgressValue('achievements'))}%</span>
                </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressValue('achievements')}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Монеты</p>
                <p className="text-2xl font-bold text-yellow-600">{currentUser?.coins || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-yellow-600" />
              </div>
                  </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Прогресс</span>
                <span>{Math.round(getProgressValue('balance'))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressValue('balance')}%` }}
                ></div>
              </div>
            </div>
              </div>
            </div>

        {/* Battle Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Битвы</h3>
            <button 
              onClick={handleCreateBattle}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
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
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6" />
              <div>
                <p className="font-medium">Достижения</p>
                <p className="text-sm opacity-90">Просмотреть награды</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/shop" 
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <Gift className="w-6 h-6" />
              <div>
                <p className="font-medium">Магазин</p>
                <p className="text-sm opacity-90">Купить предметы</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Лидерборд</h3>
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
