import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Trophy, 
  Star,
  Target,
  Users,
  Gift,
  Image,
  Save,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { databaseService, AchievementData } from '../services/database';
import { useAdminDatabase } from '../hooks/useAdminDatabase';

interface AdminAchievementManagementProps {
  theme: 'light' | 'dark';
}

// Используем AchievementData из базы данных

interface AchievementForm {
  title: string;
  description: string;
  type: string;
  difficulty: string;
  reward: {
    coins: number;
    experience: number;
    specialItems?: string[];
  };
  icon: string;
  color: string;
}

const ACHIEVEMENT_TYPES = [
  { value: 'tasks', label: 'Задачи', icon: '📋' },
  { value: 'battle', label: 'Боевые', icon: '⚔️' },
  { value: 'collection', label: 'Коллекционирование', icon: '🎁' },
  { value: 'social', label: 'Социальные', icon: '👥' },
  { value: 'special', label: 'Специальные', icon: '⭐' }
];

const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Легко', color: 'bg-green-500' },
  { value: 'medium', label: 'Средне', color: 'bg-yellow-500' },
  { value: 'hard', label: 'Сложно', color: 'bg-orange-500' },
  { value: 'extreme', label: 'Экстремально', color: 'bg-red-500' }
];

export const AdminAchievementManagement: React.FC<AdminAchievementManagementProps> = ({ theme }) => {
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<AchievementData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<AchievementData | null>(null);
  const [formData, setFormData] = useState<AchievementForm>({
    title: '',
    description: '',
    type: 'tasks',
    difficulty: 'easy',
    reward: {
      coins: 0,
      experience: 0,
      specialItems: []
    },
    icon: '🏆',
    color: '#FFD700'
  });

  // Загрузка достижений
  useEffect(() => {
    loadAchievements();
  }, []);

  // Фильтрация достижений
  useEffect(() => {
    let filtered = achievements;

    if (searchQuery) {
      filtered = filtered.filter(achievement =>
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(achievement => achievement.type === filterType);
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(achievement => achievement.difficulty === filterDifficulty);
    }

    setFilteredAchievements(filtered);
  }, [achievements, searchQuery, filterType, filterDifficulty]);

  const loadAchievements = async () => {
    // Mock данные - в реальности загружаем из БД
    const mockAchievements: AchievementData[] = [
      {
        id: '1',
        title: 'Первые шаги',
        description: 'Выполните первую задачу',
        type: 'tasks',
        difficulty: 'easy',
        reward: { coins: 100, experience: 50 },
        icon: '🏆',
        color: '#FFD700',
        isActive: true,
        completionCount: 1247,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Трудолюбивый',
        description: 'Выполните 10 задач',
        type: 'tasks',
        difficulty: 'medium',
        reward: { coins: 500, experience: 200 },
        icon: '⚡',
        color: '#00FF00',
        isActive: true,
        completionCount: 856,
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        title: 'Боец',
        description: 'Выиграйте первый баттл',
        type: 'battle',
        difficulty: 'medium',
        reward: { coins: 300, experience: 150 },
        icon: '⚔️',
        color: '#FF0000',
        isActive: true,
        completionCount: 623,
        createdAt: '2024-01-03T00:00:00Z'
      }
    ];

    setAchievements(mockAchievements);
  };

  const handleCreateAchievement = async () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      ...formData,
      isActive: true,
      completionCount: 0,
      createdAt: new Date().toISOString()
    };

    setAchievements(prev => [newAchievement, ...prev]);
    setShowCreateForm(false);
    resetForm();
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      type: achievement.type,
      difficulty: achievement.difficulty,
      reward: achievement.reward,
      icon: achievement.icon,
      color: achievement.color
    });
    setShowCreateForm(true);
  };

  const handleUpdateAchievement = async () => {
    if (!editingAchievement) return;

    const updatedAchievement: Achievement = {
      ...editingAchievement,
      ...formData
    };

    setAchievements(prev => prev.map(a => a.id === editingAchievement.id ? updatedAchievement : a));
    setShowCreateForm(false);
    setEditingAchievement(null);
    resetForm();
  };

  const handleDeleteAchievement = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить это достижение?')) {
      setAchievements(prev => prev.filter(a => a.id !== id));
    }
  };

  const toggleAchievementStatus = async (id: string) => {
    setAchievements(prev => prev.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'tasks',
      difficulty: 'easy',
      reward: { coins: 0, experience: 0, specialItems: [] },
      icon: '🏆',
      color: '#FFD700'
    });
  };

  const getTypeIcon = (type: Achievement['type']) => {
    return ACHIEVEMENT_TYPES.find(t => t.value === type)?.icon || '🏆';
  };

  const getDifficultyColor = (difficulty: Achievement['difficulty']) => {
    return DIFFICULTY_LEVELS.find(d => d.value === difficulty)?.color || 'bg-gray-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и действия */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Управление достижениями
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Создание, редактирование и модерация достижений
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Все типы</option>
          {ACHIEVEMENT_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Все сложности</option>
          {DIFFICULTY_LEVELS.map(difficulty => (
            <option key={difficulty.value} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </select>
      </div>

      {/* Список достижений */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
              opacity: achievement.isActive ? 1 : 0.6
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: achievement.color + '20' }}
                >
                  {achievement.icon}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      {achievement.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(achievement.difficulty)} text-white`}>
                      {DIFFICULTY_LEVELS.find(d => d.value === achievement.difficulty)?.label}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500 bg-opacity-20 text-blue-500">
                      {getTypeIcon(achievement.type)} {ACHIEVEMENT_TYPES.find(t => t.value === achievement.type)?.label}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {achievement.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                    <span>💰 {achievement.reward.coins} монет</span>
                    <span>⭐ {achievement.reward.experience} опыта</span>
                    <span>👥 {achievement.completionCount} получили</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleAchievementStatus(achievement.id)}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    achievement.isActive 
                      ? 'bg-green-500 bg-opacity-20 text-green-500' 
                      : 'bg-gray-500 bg-opacity-20 text-gray-500'
                  }`}
                >
                  {achievement.isActive ? 'Активно' : 'Неактивно'}
                </button>
                
                <button
                  onClick={() => handleEditAchievement(achievement)}
                  className="p-2 rounded-lg hover:bg-opacity-10"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDeleteAchievement(achievement.id)}
                  className="p-2 rounded-lg hover:bg-opacity-10 text-red-500"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,59,48,0.1)' : 'rgba(255,59,48,0.1)' }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модал создания/редактирования */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                {editingAchievement ? 'Редактировать достижение' : 'Создать достижение'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingAchievement(null);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-opacity-10"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Основные данные */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Название *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Введите название достижения"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Описание *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Опишите условия получения достижения"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Тип
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Achievement['type'] }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {ACHIEVEMENT_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Сложность
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as Achievement['difficulty'] }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {DIFFICULTY_LEVELS.map(difficulty => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Награды */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Награды
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Монеты (0-10000)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10000"
                      value={formData.reward.coins}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        reward: { ...prev.reward, coins: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Опыт (0-1000)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      value={formData.reward.experience}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        reward: { ...prev.reward, experience: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Визуал */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Визуальное оформление
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Иконка
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border text-center text-2xl"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                      placeholder="🏆"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Цвет
                    </label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full h-10 rounded-lg border"
                      style={{
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingAchievement(null);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme === 'dark' ? 'transparent' : '#F8F9FA',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Отмена
              </button>
              <button
                onClick={editingAchievement ? handleUpdateAchievement : handleCreateAchievement}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingAchievement ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
