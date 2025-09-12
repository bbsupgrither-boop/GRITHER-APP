import React, { useState, useRef } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { 
  User, 
  Camera, 
  Edit3, 
  Trophy, 
  Calendar, 
  Star, 
  TrendingUp,
  Settings,
  Award,
  Target,
  Clock,
  Coins,
  X,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { User as UserType, Battle, LeaderboardEntry } from '../types/global';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: UserType;
  setUser: (user: UserType) => void;
  battles: Battle[];
  leaderboard: LeaderboardEntry[];
  theme: 'light' | 'dark';
}

type TabType = 'overview' | 'battles' | 'achievements';

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  user,
  setUser,
  battles,
  leaderboard,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);
  const [isBattleHistoryOpen, setIsBattleHistoryOpen] = useState(false);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock battle data
  const mockBattles: Battle[] = [
    {
      id: 'battle1',
      title: 'Турнир по программированию',
      description: 'Еженедельный турнир по алгоритмам',
      participants: ['user1', 'user2', 'user3'],
      winner: 'user1',
      prize: 500,
      startTime: new Date('2024-12-15T10:00:00'),
      endTime: new Date('2024-12-15T12:00:00'),
      status: 'completed',
      category: 'programming'
    },
    {
      id: 'battle2',
      title: 'Конкурс дизайна',
      description: 'Создание логотипа для нового проекта',
      participants: ['user1', 'user4', 'user5'],
      winner: 'user4',
      prize: 300,
      startTime: new Date('2024-12-10T14:00:00'),
      endTime: new Date('2024-12-10T16:00:00'),
      status: 'completed',
      category: 'design'
    },
    {
      id: 'battle3',
      title: 'Марафон задач',
      description: 'Решение максимального количества задач за 24 часа',
      participants: ['user1', 'user2', 'user3', 'user4', 'user5'],
      winner: 'user2',
      prize: 1000,
      startTime: new Date('2024-12-08T00:00:00'),
      endTime: new Date('2024-12-09T00:00:00'),
      status: 'completed',
      category: 'marathon'
    }
  ];

  // Mock achievements data
  const mockAchievements = [
    { id: 'ach1', name: 'Первый баттл', description: 'Участие в первом баттле', icon: '🏆', unlocked: true },
    { id: 'ach2', name: 'Победитель', description: 'Победа в 5 баттлах', icon: '🥇', unlocked: true },
    { id: 'ach3', name: 'Марафонец', description: 'Участие в марафоне', icon: '🏃', unlocked: true },
    { id: 'ach4', name: 'Легенда', description: 'Победа в 10 баттлах', icon: '👑', unlocked: false },
    { id: 'ach5', name: 'Мастер', description: 'Победа в турнире', icon: '🎯', unlocked: false }
  ];

  const getUserRank = () => {
    const rank = leaderboard.findIndex(entry => entry.id === user.id);
    return rank !== -1 ? rank + 1 : leaderboard.length + 1;
  };

  const getUserStats = () => {
    const userBattles = battles.filter(battle => 
      battle.participants.includes(user.id)
    );
    const wins = userBattles.filter(battle => battle.winner === user.id).length;
    const totalPrize = userBattles
      .filter(battle => battle.winner === user.id)
      .reduce((sum, battle) => sum + battle.prize, 0);
    
    return {
      battlesPlayed: userBattles.length,
      battlesWon: wins,
      winRate: userBattles.length > 0 ? Math.round((wins / userBattles.length) * 100) : 0,
      totalPrize
    };
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({
          ...user,
          avatar: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
      setIsPhotoUploadOpen(false);
    }
  };

  const handleEditStart = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (editingField) {
      setUser({
        ...user,
        [editingField]: editValue
      });
      setIsEditModalOpen(false);
      setEditingField(null);
      setEditValue('');
    }
  };

  const stats = getUserStats();

  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={() => onNavigate('settings')}
        theme={theme}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        {/* Profile Header */}
        <div className={`p-6 rounded-3xl border mb-6 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <button
                onClick={() => setIsPhotoUploadOpen(true)}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <button
                  onClick={() => handleEditStart('name', user.name)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-400">{user.username}</span>
                <button
                  onClick={() => handleEditStart('username', user.username)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Ранг #{getUserRank()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Уровень {user.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-blue-500">{stats.battlesWon}</div>
              <div className="text-sm text-gray-400">Побед</div>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-green-500">{stats.winRate}%</div>
              <div className="text-sm text-gray-400">Процент побед</div>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-yellow-500">{stats.totalPrize}</div>
              <div className="text-sm text-gray-400">Монет заработано</div>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-purple-500">{user.balance}</div>
              <div className="text-sm text-gray-400">Текущий баланс</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`p-1 rounded-2xl border mb-6 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex">
            {[
              { key: 'overview', label: 'Обзор', icon: User },
              { key: 'battles', label: 'Баттлы', icon: Trophy },
              { key: 'achievements', label: 'Достижения', icon: Award }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as TabType)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  activeTab === key
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-white/10'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Recent Activity */}
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <h3 className="font-semibold mb-4">Последняя активность</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Победа в турнире</div>
                    <div className="text-xs text-gray-400">2 часа назад</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Участие в баттле</div>
                    <div className="text-xs text-gray-400">1 день назад</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Info */}
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <h3 className="font-semibold mb-4">Команда</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <div className="font-medium">{user.team || 'Без команды'}</div>
                  <div className="text-sm text-gray-400">Участник команды</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'battles' && (
          <div className="space-y-4">
            {mockBattles.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">Нет истории баттлов</div>
              </div>
            ) : (
              mockBattles.map((battle) => (
                <div 
                  key={battle.id}
                  onClick={() => {
                    setSelectedBattle(battle);
                    setIsBattleHistoryOpen(true);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer hover:scale-98 ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                      : 'bg-white/80 border-gray-200 hover:bg-white/90'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      battle.winner === user.id 
                        ? 'bg-green-500' 
                        : 'bg-gray-500'
                    }`}>
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{battle.title}</div>
                      <div className="text-sm text-gray-400 mb-1">{battle.description}</div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{battle.startTime.toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          <span>{battle.prize} монет</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${
                      battle.winner === user.id ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {battle.winner === user.id ? 'Победа' : 'Поражение'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {mockAchievements.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">Нет достижений</div>
              </div>
            ) : (
              mockAchievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-white/80 border-gray-200'
                  } ${!achievement.unlocked ? 'opacity-50 grayscale' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                        : 'bg-gray-500'
                    }`}>
                      {achievement.unlocked ? achievement.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.name}</div>
                      <div className="text-sm text-gray-400">{achievement.description}</div>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      <BottomNavigation 
        currentPage="profile"
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Photo Upload Modal */}
      {isPhotoUploadOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Загрузить фото</h2>
              <button
                onClick={() => setIsPhotoUploadOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-400">Выберите фото профиля</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2 px-4 rounded-xl bg-blue-500 text-white"
              >
                Выбрать файл
              </button>
              <button
                onClick={() => setIsPhotoUploadOpen(false)}
                className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingField && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Редактировать {editingField === 'name' ? 'имя' : 'username'}
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {editingField === 'name' ? 'Имя' : 'Username'}
                </label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder={`Введите ${editingField === 'name' ? 'имя' : 'username'}`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Отменить
                </button>
                <button
                  onClick={handleEditSave}
                  className="flex-1 py-2 px-4 rounded-xl bg-blue-500 text-white"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Battle Detail Modal */}
      {isBattleHistoryOpen && selectedBattle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Детали баттла</h2>
              <button
                onClick={() => setIsBattleHistoryOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedBattle.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{selectedBattle.description}</p>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Статус:</span>
                    <span className={`text-sm font-medium ${
                      selectedBattle.winner === user.id ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {selectedBattle.winner === user.id ? 'Победа' : 'Поражение'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Приз:</span>
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{selectedBattle.prize}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Начало:</span>
                    <span className="text-sm">{selectedBattle.startTime.toLocaleString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Окончание:</span>
                    <span className="text-sm">{selectedBattle.endTime.toLocaleString('ru-RU')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Участников:</span>
                    <span className="text-sm">{selectedBattle.participants.length}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsBattleHistoryOpen(false)}
                className="w-full py-2 px-4 rounded-xl bg-blue-500 text-white"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};