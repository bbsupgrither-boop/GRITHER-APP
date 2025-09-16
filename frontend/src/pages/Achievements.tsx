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
            <h1 className="unified-heading">Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</h1>
            <p className="unified-text text-muted-foreground">
              {achievements.length} Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setSortMenuOpen(!sortMenuOpen)}
          className="apple-button p-3"
          aria-label="Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В° Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–"
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
              Р СџР С• Р В°Р В»РЎвЂћР В°Р Р†Р С‘РЎвЂљРЎС“
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
              Р СџР С• Р С—РЎР‚Р С•РЎвЂ Р ВµР Р…РЎвЂљРЎС“ (Р С•РЎвЂљ Р Р…Р В°Р С‘Р СР ВµР Р…РЎРЉРЎв‚¬Р ВµР С–Р С•)
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
              Р СџР С• Р С—РЎР‚Р С•РЎвЂ Р ВµР Р…РЎвЂљРЎС“ (Р С•РЎвЂљ Р Р…Р В°Р С‘Р В±Р С•Р В»РЎРЉРЎв‚¬Р ВµР С–Р С•)
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
                      <span className="text-green-500 text-sm">РІСљвЂњ</span>
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
                        СЂСџвЂ™В° {achievement.reward.amount} Р СР С•Р Р…Р ВµРЎвЂљ
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
          <h3 className="unified-heading mb-2">Р СњР ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–</h3>
          <p className="unified-text text-muted-foreground">
            Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…РЎРЏР в„–РЎвЂљР Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ Р С‘ РЎС“РЎвЂЎР В°РЎРѓРЎвЂљР Р†РЎС“Р в„–РЎвЂљР Вµ Р Р† Р В±Р В°РЎвЂљРЎвЂљР В»Р В°РЎвЂ¦, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘РЎвЂљРЎРЉ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ
          </p>
        </div>
      )}
    </div>
  );
  // AUTOGEN END achievements-content
}
