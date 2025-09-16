import React, { useState } from 'react';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import Star from 'lucide-react/dist/esm/icons/star';
import Target from 'lucide-react/dist/esm/icons/target';
import Award from 'lucide-react/dist/esm/icons/award';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Crown from 'lucide-react/dist/esm/icons/crown';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  reward: {
    xp: number;
    coins: number;
  };
}

interface AchievementsPageProps {
  user: {
    level: number;
    xp: number;
    coins: number;
  };
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Новичок',
      description: 'Выполните первое задание',
      icon: 'trophy',
      progress: 1,
      maxProgress: 1,
      isCompleted: true,
      category: 'progress',
      rarity: 'common',
      reward: { xp: 50, coins: 100 }
    },
    {
      id: '2',
      title: 'Упорный',
      description: 'Выполните 10 заданий',
      icon: 'target',
      progress: 7,
      maxProgress: 10,
      isCompleted: false,
      category: 'progress',
      rarity: 'rare',
      reward: { xp: 200, coins: 500 }
    },
    {
      id: '3',
      title: 'Боец',
      description: 'Создайте 5 битв',
      icon: 'zap',
      progress: 2,
      maxProgress: 5,
      isCompleted: false,
      category: 'battles',
      rarity: 'rare',
      reward: { xp: 150, coins: 300 }
    },
    {
      id: '4',
      title: 'Победитель',
      description: 'Выиграйте 10 битв',
      icon: 'crown',
      progress: 0,
      maxProgress: 10,
      isCompleted: false,
      category: 'battles',
      rarity: 'epic',
      reward: { xp: 500, coins: 1000 }
    },
    {
      id: '5',
      title: 'Коллекционер',
      description: 'Получите 20 достижений',
      icon: 'star',
      progress: 4,
      maxProgress: 20,
      isCompleted: false,
      category: 'collection',
      rarity: 'legendary',
      reward: { xp: 1000, coins: 2000 }
    },
    {
      id: '6',
      title: 'Мастер',
      description: 'Достигните 15 уровня',
      icon: 'award',
      progress: 8,
      maxProgress: 15,
      isCompleted: false,
      category: 'progress',
      rarity: 'epic',
      reward: { xp: 300, coins: 750 }
    }
  ]);

  const categories = [
    { id: 'all', name: 'Все достижения' },
    { id: 'progress', name: 'Прогресс' },
    { id: 'battles', name: 'Битвы' },
    { id: 'collection', name: 'Коллекция' }
  ];

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      trophy: Trophy,
      target: Target,
      zap: Zap,
      crown: Crown,
      star: Star,
      award: Award
    };
    const Icon = icons[iconName] || Trophy;
    return <Icon className="w-6 h-6" />;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычное';
      case 'rare': return 'Редкое';
      case 'epic': return 'Эпическое';
      case 'legendary': return 'Легендарное';
      default: return 'Неизвестно';
    }
  };

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);

  const completedAchievements = achievements.filter(a => a.isCompleted).length;
  const totalAchievements = achievements.length;

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Достижения</h1>
              <p className="text-gray-600 mt-1">Получайте награды за выполнение целей</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completedAchievements}/{totalAchievements}</div>
              <div className="text-sm text-gray-500">Получено</div>
            </div>
          </div>
        </div>
      </div>
                        
      {/* Progress Overview */}
      <div className="container">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Общий прогресс</h3>
            <span className="text-sm text-gray-500">
              {Math.round((completedAchievements / totalAchievements) * 100)}%
            </span>
                            </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedAchievements / totalAchievements) * 100}%` }}
            ></div>
                        </div>
                      </div>
        </div>
        
      {/* Categories */}
      <div className="container">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
          <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{category.name}</span>
          </button>
          ))}
        </div>
      </div>

      {/* Achievements List */}
      <div className="container pb-20">
        <div className="space-y-4">
          {filteredAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`card ${getRarityColor(achievement.rarity)} ${
                achievement.isCompleted ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {getIconComponent(achievement.icon)}
            </div>
            
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                      achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getRarityLabel(achievement.rarity)}
                </span>
            </div>
            
                  {/* Progress Bar */}
                  {!achievement.isCompleted && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Прогресс</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
            </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
          </div>
        </div>
      )}

                  {/* Rewards */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Star className="w-4 h-4" />
                      <span>{achievement.reward.xp} XP</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Target className="w-4 h-4" />
                      <span>{achievement.reward.coins} монет</span>
            </div>
                    {achievement.isCompleted && (
                      <span className="text-green-600 font-medium">✓ Получено</span>
                    )}
              </div>
            </div>
          </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Достижения не найдены</h3>
            <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
        </div>
      )}
      </div>
    </div>
  );
};
