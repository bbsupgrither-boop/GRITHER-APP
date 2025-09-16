import React, { useState, useMemo } from 'react';
import { Trophy, Menu, ArrowLeft, Eye } from 'lucide-react';
import { Achievement } from '../../types/achievements';
import { User } from '../../types/global';
import { Notification } from '../../types/notifications';
import { safeString, safeNumber } from '../shared/utils';

interface AchievementsPageProps {
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

export default function AchievementsPage({
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
}: AchievementsPageProps) {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>('progress_desc');

  const getProgressPercentage = (achievement: Achievement) => {
    if (!achievement.requirements) return 0;
    const current = safeNumber(achievement.requirements.current, 0);
    const target = safeNumber(achievement.requirements.target, 1);
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

  // AUTOGEN START achievements-content
  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="unified-heading">Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ</h1>
            <p className="unified-text text-muted-foreground">
              {achievements.length} Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setSortMenuOpen(!sortMenuOpen)}
          className="apple-button p-3"
          aria-label="Р В Р Р‹Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В РЎвЂќР В Р’В° Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sort Menu */}
      {sortMenuOpen && (
        <div className="glass-card p-4 mb-4">
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
              Р В РЎСџР В РЎвЂў Р В Р’В°Р В Р’В»Р РЋРІР‚С›Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋРЎвЂњ
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
              Р В РЎСџР В РЎвЂў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р РЋРЎвЂњ (Р В РЎвЂўР РЋРІР‚С™ Р В Р вЂ¦Р В Р’В°Р В РЎвЂР В РЎВР В Р’ВµР В Р вЂ¦Р РЋР Р‰Р РЋРІвЂљВ¬Р В Р’ВµР В РЎвЂ“Р В РЎвЂў)
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
              Р В РЎСџР В РЎвЂў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р РЋРЎвЂњ (Р В РЎвЂўР РЋРІР‚С™ Р В Р вЂ¦Р В Р’В°Р В РЎвЂР В Р’В±Р В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋРІвЂљВ¬Р В Р’ВµР В РЎвЂ“Р В РЎвЂў)
            </button>
          </div>
        </div>
      )}

      {/* Achievements List */}
      <div className="space-y-3">
        {sortedAchievements.map((achievement) => {
          const progress = getProgressPercentage(achievement);
          const isCompleted = progress >= 100;
          const current = safeNumber(achievement.requirements?.current, 0);
          const target = safeNumber(achievement.requirements?.target, 1);
          
          return (
            <div
              key={achievement.id}
              className={`glass-card p-4 ${
                isCompleted ? 'border-green-500/50' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{achievement.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="unified-text font-medium">{achievement.title}</h3>
                    {isCompleted && (
                      <span className="text-green-500 text-sm">Р Р†РЎС™РІР‚Сљ</span>
                    )}
                  </div>
                  
                  <p className="unified-text text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="unified-text text-sm">
                      {current}/{target} ({progress}%)
                    </span>
                    
                    {achievement.reward && (
                      <span className="unified-text text-sm text-yellow-500">
                        РЎР‚РЎСџРІР‚в„ўР’В° {achievement.reward.amount} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {achievements.length === 0 && (
        <div className="glass-card p-8 text-center">
          <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="unified-heading mb-2">Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“</h3>
          <p className="unified-text text-muted-foreground">
            Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р РЋР РЏР В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ Р В РЎвЂ Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р РЋРЎвЂњР В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ Р В Р вЂ  Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°Р РЋРІР‚В¦, Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂўР В Р’В±Р РЋРІР‚в„– Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
          </p>
        </div>
      )}
    </div>
  );
  // AUTOGEN END achievements-content
}
