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

// Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ AchievementData Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦

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
  { value: 'tasks', label: 'Р В РІР‚вЂќР В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ', icon: 'РЎР‚РЎСџРІР‚СљРІР‚в„–' },
  { value: 'battle', label: 'Р В РІР‚ВР В РЎвЂўР В Р’ВµР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ', icon: 'Р Р†РЎв„ўРІР‚СњР С—РЎвЂР РЏ' },
  { value: 'collection', label: 'Р В РЎв„ўР В РЎвЂўР В Р’В»Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋРІР‚В Р В РЎвЂР В РЎвЂўР В Р вЂ¦Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ', icon: 'РЎР‚РЎСџР вЂ№Р С“' },
  { value: 'social', label: 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚В Р В РЎвЂР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ', icon: 'РЎР‚РЎСџРІР‚ВРўС’' },
  { value: 'special', label: 'Р В Р Р‹Р В РЎвЂ”Р В Р’ВµР РЋРІР‚В Р В РЎвЂР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ', icon: 'Р Р†Р’В­РЎвЂ™' }
];

const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Р В РІР‚С”Р В Р’ВµР В РЎвЂ“Р В РЎвЂќР В РЎвЂў', color: 'bg-green-500' },
  { value: 'medium', label: 'Р В Р Р‹Р РЋР вЂљР В Р’ВµР В РўвЂР В Р вЂ¦Р В Р’Вµ', color: 'bg-yellow-500' },
  { value: 'hard', label: 'Р В Р Р‹Р В Р’В»Р В РЎвЂўР В Р’В¶Р В Р вЂ¦Р В РЎвЂў', color: 'bg-orange-500' },
  { value: 'extreme', label: 'Р В Р’В­Р В РЎвЂќР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’ВµР В РЎВР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂў', color: 'bg-red-500' }
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
    icon: 'РЎР‚РЎСџР РЏРІР‚В ',
    color: '#FFD700'
  });

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
  useEffect(() => {
    loadAchievements();
  }, []);

  // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
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
    // Mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ - Р В Р вЂ  Р РЋР вЂљР В Р’ВµР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂ Р В Р’В·Р В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В¶Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂР В Р’В· Р В РІР‚ВР В РІР‚Сњ
    const mockAchievements: AchievementData[] = [
      {
        id: '1',
        title: 'Р В РЎСџР В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ Р РЋРІвЂљВ¬Р В Р’В°Р В РЎвЂ“Р В РЎвЂ',
        description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРЎвЂњР РЋР вЂ№ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ',
        type: 'tasks',
        difficulty: 'easy',
        reward: { coins: 100, experience: 50 },
        icon: 'РЎР‚РЎСџР РЏРІР‚В ',
        color: '#FFD700',
        isActive: true,
        completionCount: 1247,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Р В РЎС›Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В РЎвЂўР В Р’В»Р РЋР вЂ№Р В Р’В±Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“',
        description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 10 Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ',
        type: 'tasks',
        difficulty: 'medium',
        reward: { coins: 500, experience: 200 },
        icon: 'Р Р†РЎв„ўР Р‹',
        color: '#00FF00',
        isActive: true,
        completionCount: 856,
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        title: 'Р В РІР‚ВР В РЎвЂўР В Р’ВµР РЋРІР‚В ',
        description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»',
        type: 'battle',
        difficulty: 'medium',
        reward: { coins: 300, experience: 150 },
        icon: 'Р Р†РЎв„ўРІР‚СњР С—РЎвЂР РЏ',
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
    if (window.confirm('Р В РІР‚в„ўР РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р вЂ¦Р РЋРІР‚в„–, Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂў Р РЋРІР‚В¦Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р РЋРЎвЂњР В РўвЂР В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР РЉР РЋРІР‚С™Р В РЎвЂў Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ?')) {
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
      icon: 'РЎР‚РЎСџР РЏРІР‚В ',
      color: '#FFD700'
    });
  };

  const getTypeIcon = (type: Achievement['type']) => {
    return ACHIEVEMENT_TYPES.find(t => t.value === type)?.icon || 'РЎР‚РЎСџР РЏРІР‚В ';
  };

  const getDifficultyColor = (difficulty: Achievement['difficulty']) => {
    return DIFFICULTY_LEVELS.find(d => d.value === difficulty)?.color || 'bg-gray-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ Р В РЎвЂ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏР В РЎВР В РЎвЂ
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ, Р РЋР вЂљР В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ Р В РЎВР В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰
        </button>
      </div>

      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– Р В РЎвЂ Р В РЎвЂ”Р В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р В РЎвЂ”Р В РЎвЂў Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР вЂ№ Р В РЎвЂР В Р’В»Р В РЎвЂ Р В РЎвЂўР В РЎвЂ”Р В РЎвЂР РЋР С“Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР вЂ№..."
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
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ”Р РЋРІР‚в„–</option>
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
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР С“Р В Р’В»Р В РЎвЂўР В Р’В¶Р В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂ</option>
          {DIFFICULTY_LEVELS.map(difficulty => (
            <option key={difficulty.value} value={difficulty.value}>
              {difficulty.label}
            </option>
          ))}
        </select>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ */}
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
                    <span>РЎР‚РЎСџРІР‚в„ўР’В° {achievement.reward.coins} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
                    <span>Р Р†Р’В­РЎвЂ™ {achievement.reward.experience} Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В°</span>
                    <span>РЎР‚РЎСџРІР‚ВРўС’ {achievement.completionCount} Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР В Р’В»Р В РЎвЂ</span>
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
                  {achievement.isActive ? 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В РЎвЂў' : 'Р В РЎСљР В Р’ВµР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В РЎвЂў'}
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

      {/* Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’В°Р В Р’В» Р РЋР С“Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ/Р РЋР вЂљР В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
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
                {editingAchievement ? 'Р В Р’В Р В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ' : 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ'}
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
              {/* Р В РЎвЂєР РЋР С“Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎСљР В Р’В°Р В Р’В·Р В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ *
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
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎвЂєР В РЎвЂ”Р В РЎвЂР РЋР С“Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ *
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
                  placeholder="Р В РЎвЂєР В РЎвЂ”Р В РЎвЂР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р РЋРЎвЂњР РЋР С“Р В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РЎС›Р В РЎвЂР В РЎвЂ”
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
                    Р В Р Р‹Р В Р’В»Р В РЎвЂўР В Р’В¶Р В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋР Р‰
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

              {/* Р В РЎСљР В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРІР‚в„– */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎСљР В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРІР‚в„–
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Р В РЎС™Р В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™Р РЋРІР‚в„– (0-10000)
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
                      Р В РЎвЂєР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™ (0-1000)
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

              {/* Р В РІР‚в„ўР В РЎвЂР В Р’В·Р РЋРЎвЂњР В Р’В°Р В Р’В» */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РІР‚в„ўР В РЎвЂР В Р’В·Р РЋРЎвЂњР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р В РЎвЂўР РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В°
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
                      placeholder="РЎР‚РЎСџР РЏРІР‚В "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Р В Р’В¦Р В Р вЂ Р В Р’ВµР РЋРІР‚С™
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
                Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’В°
              </button>
              <button
                onClick={editingAchievement ? handleUpdateAchievement : handleCreateAchievement}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingAchievement ? 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰' : 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
