import React, { useState, useMemo } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { Trophy, Menu, ArrowLeft, Paperclip, X } from 'lucide-react';
import { Achievement } from '../types/achievements';
import { User } from '../types/global';
import { Notification } from '../types/notifications';

interface AchievementsPageFixedProps {
  onNavigate: (page: string) => void;
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  theme: 'light' | 'dark';
  user?: User;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onRemoveNotification?: (id: string) => void;
  onClearAllNotifications?: () => void;
  onOpenSettings?: () => void;
}

type SortType = 'alphabet' | 'progress_asc' | 'progress_desc';

export const AchievementsPageFixed: React.FC<AchievementsPageFixedProps> = ({
  onNavigate,
  achievements,
  setAchievements,
  theme,
  user,
  notifications = [],
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  onOpenSettings = () => {},
}) => {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>('progress_desc');
  const [fileUploadOpen, setFileUploadOpen] = useState(false);

  // Mock user for demo
  const mockUser = {
    id: 'user1',
    name: 'Иван Иванов',
    username: '@iivanov'
  };

  const getProgressPercentage = (achievement: Achievement) => {
    const { current, target } = achievement.requirements;
    return Math.round((current / target) * 100);
  };

  const sortedAchievements = useMemo(() => {
    const sorted = [...achievements];
    
    switch (sortType) {
      case 'alphabet':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'progress_asc':
        return sorted.sort((a, b) => {
          const aProgress = getProgressPercentage(a);
          const bProgress = getProgressPercentage(b);
          return aProgress - bProgress;
        });
      case 'progress_desc':
        return sorted.sort((a, b) => {
          const aProgress = getProgressPercentage(a);
          const bProgress = getProgressPercentage(b);
          return bProgress - aProgress;
        });
      default:
        return sorted;
    }
  }, [achievements, sortType]);

  const handleSort = (type: SortType) => {
    setSortType(type);
    setSortMenuOpen(false);
  };

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailOpen(true);
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedAchievement) {
      const updatedAchievement = {
        ...selectedAchievement,
        userFile: file.name
      };
      
      setAchievements(achievements.map(a => 
        a.id === selectedAchievement.id ? updatedAchievement : a
      ));
      
      setSelectedAchievement(updatedAchievement);
      setFileUploadOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <BackgroundFX theme={theme} />
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        theme={theme}
        user={user}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Доступные достижения</h1>
            <button 
              onClick={() => setSortMenuOpen(true)}
              className={`p-2 rounded-xl transition-all hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {sortedAchievements.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">Нет доступных достижений</div>
              </div>
            ) : (
              sortedAchievements.map((achievement) => {
                const progress = getProgressPercentage(achievement);
                const hasProgress = progress > 0;
                
                return (
                  <div 
                    key={achievement.id}
                    onClick={() => handleAchievementClick(achievement)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer hover:scale-98 ${
                      theme === 'dark' 
                        ? 'bg-gray-700/50 hover:bg-gray-700/70' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    } ${!hasProgress ? 'opacity-50 grayscale' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      achievement.rarity === 'epic' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                      achievement.rarity === 'rare' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      'bg-blue-500'
                    }`}>
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-gray-400">{achievement.description}</div>
                      {achievement.userFile && (
                        <div className="flex items-center gap-1 mt-1">
                          <Paperclip className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-500">Файл прикреплен</span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{progress}%</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      
      <BottomNavigation 
        currentPage="achievements"
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Sort Menu Modal */}
      {sortMenuOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-semibold mb-6">Сортировка</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => handleSort('alphabet')}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  sortType === 'alphabet'
                    ? 'bg-blue-500/20 border-2 border-blue-500 text-blue-400'
                    : theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                По алфавиту
              </button>
              
              <button
                onClick={() => handleSort('progress_asc')}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  sortType === 'progress_asc'
                    ? 'bg-blue-500/20 border-2 border-blue-500 text-blue-400'
                    : theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                По проценту (от наименьшего)
              </button>
              
              <button
                onClick={() => handleSort('progress_desc')}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  sortType === 'progress_desc'
                    ? 'bg-blue-500/20 border-2 border-blue-500 text-blue-400'
                    : theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                По проценту (от наибольшего)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Detail Modal */}
      {isDetailOpen && selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Условия выполнения достижения</h2>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Achievement Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-medium">{selectedAchievement.title}</div>
                  <div className="text-sm text-gray-400">{selectedAchievement.description}</div>
                </div>
              </div>

              {/* Requirements */}
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="font-medium mb-3">Краткое описание достижения</h3>
                {selectedAchievement.conditions ? (
                  <ul className="space-y-2">
                    {selectedAchievement.conditions.map((condition, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-sm">• {condition}</span>
                        <button
                          onClick={() => setFileUploadOpen(true)}
                          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm">
                    Тип: {selectedAchievement.requirements.type}<br/>
                    Текущий прогресс: {selectedAchievement.requirements.current}<br/>
                    Цель: {selectedAchievement.requirements.target}
                  </div>
                )}
              </div>

              {/* Admin Comment */}
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              } ${!selectedAchievement.adminComment ? 'opacity-50' : ''}`}>
                <h3 className="font-medium mb-3">Комментарий от Админа</h3>
                <div className="text-sm text-gray-400 mb-3">
                  {selectedAchievement.adminComment || 'Комментарий не добавлен'}
                </div>
                {selectedAchievement.adminFile && (
                  <button className="flex items-center gap-2 text-sm text-blue-400">
                    <Paperclip className="w-4 h-4" />
                    {selectedAchievement.adminFile}
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Отменить
                </button>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="flex-1 py-2 px-4 rounded-xl bg-blue-500 text-white"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      {fileUploadOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-semibold mb-6">Прикрепить файл</h2>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Paperclip className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-400">Выберите файл для загрузки</p>
            </div>

            <input
              type="file"
              id="file-upload"
              onChange={handleFileSelected}
              accept="image/,video/,.pdf,.doc,.docx"
              className="hidden"
            />

            <div className="flex gap-3">
              <label
                htmlFor="file-upload"
                className={`flex-1 py-2 px-4 rounded-xl text-center cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Выбрать файл
              </label>
              <button
                onClick={() => setFileUploadOpen(false)}
                className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};