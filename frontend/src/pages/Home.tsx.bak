import React from 'react';
import { BackgroundFX } from '../../components/BackgroundFX';
import { safeString, safeNumber } from '../shared/utils';

interface HomePageProps {
  theme: 'light' | 'dark';
  currentUser: any;
  notifications: any[];
  achievements: any[];
  onOpenSettings: () => void;
}

export default function HomePage({
  theme,
  currentUser,
  notifications,
  achievements,
  onOpenSettings
}: HomePageProps) {
  // AUTOGEN START home-content
  const userName = safeString(currentUser?.name, 'Р СџР С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЉ');
  const userLevel = safeNumber(currentUser?.level, 1);
  const userCoins = safeNumber(currentUser?.gCoins, 0);
  
  const inProgressAchievements = achievements.filter(a => 
    a.requirements?.current < a.requirements?.target
  ).slice(0, 3);

  return (
    <div className="py-4">
      <BackgroundFX theme={theme} />
      
      {/* Hero Section */}
      <div className="glass-card p-6 mb-4">
        <h1 className="unified-heading mb-2">Р вЂќР С•Р В±РЎР‚Р С• Р С—Р С•Р В¶Р В°Р В»Р С•Р Р†Р В°РЎвЂљРЎРЉ, {userName}!</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="unified-text">Р Р€РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ {userLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="unified-text">СЂСџвЂ™В° {userCoins} G-Р СР С•Р Р…Р ВµРЎвЂљ</span>
          </div>
        </div>
      </div>

      {/* Achievements Preview */}
      {inProgressAchievements.length > 0 && (
        <div className="glass-card p-4 mb-4">
          <h2 className="unified-heading mb-3">Р вЂ™Р В°РЎв‚¬Р С‘ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ</h2>
          <div className="space-y-3">
            {inProgressAchievements.map((achievement) => {
              const progress = achievement.requirements?.current || 0;
              const target = achievement.requirements?.target || 1;
              const percentage = Math.round((progress / target) * 100);
              
              return (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="unified-text font-medium">{achievement.title}</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="unified-text text-sm opacity-75 mt-1">
                      {progress}/{target} ({percentage}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            className="apple-button w-full mt-4"
            aria-label="Р СџРЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚Р ВµРЎвЂљРЎРЉ Р Р†РЎРѓР Вµ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ"
          >
            СЂСџвЂРѓРїС‘РЏ Р СџРЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚Р ВµРЎвЂљРЎРЉ Р Р†РЎРѓР Вµ
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚РЎвЂ№Р Вµ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘РЎРЏ</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="apple-button p-4" aria-label="Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘">
            СЂСџвЂњСњ Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘
          </button>
          <button className="apple-button p-4" aria-label="Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР В°Р С–Р В°Р В·Р С‘Р Р…">
            СЂСџвЂєвЂ™ Р СљР В°Р С–Р В°Р В·Р С‘Р Р…
          </button>
          <button className="apple-button p-4" aria-label="Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№">
            РІС™вЂќРїС‘РЏ Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№
          </button>
          <button className="apple-button p-4" aria-label="Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р С—РЎР‚Р С•РЎвЂћР С‘Р В»РЎРЉ">
            СЂСџвЂВ¤ Р СџРЎР‚Р С•РЎвЂћР С‘Р В»РЎРЉ
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END home-content
}
