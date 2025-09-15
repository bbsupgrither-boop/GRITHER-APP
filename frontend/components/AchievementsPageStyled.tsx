п»їimport { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Trophy, Star, Clock, Target, CheckCircle, Award, Filter, Search } from './Icons';
import { Achievement } from '../types/achievements';
import { mockAppState } from '../data/mockData';

interface AchievementsPageStyledProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  profilePhoto?: string | null;
}

export function AchievementsPageStyled({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  achievements, 
  setAchievements, 
  profilePhoto 
}: AchievementsPageStyledProps) {
  const { currentUser } = mockAppState;
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'progress' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all' as const, label: 'Р вЂ™РЎРѓР Вµ', icon: Target },
    { id: 'completed' as const, label: 'Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№Р Вµ', icon: CheckCircle },
    { id: 'progress' as const, label: 'Р вЂ™ Р С—РЎР‚Р С•РЎвЂ Р ВµРЎРѓРЎРѓР Вµ', icon: Clock },
    { id: 'locked' as const, label: 'Р вЂ”Р В°Р В±Р В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р Р…РЎвЂ№Р Вµ', icon: Star }
  ];

  // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚Р В°РЎвЂ Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–
  const getFilteredAchievements = () => {
    let filtered = achievements;

    // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚ Р С—Р С• Р С—Р С•Р С‘РЎРѓР С”РЎС“
    if (searchQuery) {
      filtered = filtered.filter(achievement => 
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Р В¤Р С‘Р В»РЎРЉРЎвЂљРЎР‚ Р С—Р С• РЎвЂљР В°Р В±Р В°Р С
    switch (activeTab) {
      case 'completed':
        return filtered.filter(a => a.isCompleted);
      case 'progress':
        return filtered.filter(a => !a.isCompleted && a.progress > 0);
      case 'locked':
        return filtered.filter(a => a.progress === 0);
      default:
        return filtered;
    }
  };

  const filteredAchievements = getFilteredAchievements();
  const completedCount = achievements.filter(a => a.isCompleted).length;
  const progressCount = achievements.filter(a => !a.isCompleted && a.progress > 0).length;
  const lockedCount = achievements.filter(a => a.progress === 0).length;

  const getProgressPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const renderAchievementCard = (achievement: Achievement) => (
    <div key={achievement.id} className="glass-card rounded-2xl p-4 apple-shadow">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          achievement.isCompleted 
            ? 'bg-gradient-to-br from-green-400 to-green-600' 
            : achievement.progress > 0
            ? 'bg-gradient-to-br from-blue-400 to-blue-600'
            : 'bg-secondary'
        }`}>
          <span className="text-xl">{achievement.icon || 'СЂСџРЏвЂ '}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-medium text-foreground">{achievement.title}</div>
              <div className="text-sm text-muted-foreground">{achievement.description}</div>
            </div>
            <div className="flex items-center gap-2">
              {achievement.isCompleted && (
                <div className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  <Award className="w-3 h-3" />
                  Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С•
                </div>
              )}
              {!achievement.isCompleted && achievement.progress > 0 && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  <Clock className="w-3 h-3" />
                  Р вЂ™ Р С—РЎР‚Р С•РЎвЂ Р ВµРЎРѓРЎРѓР Вµ
                </div>
              )}
            </div>
          </div>
          
          {!achievement.isCompleted && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Р СџРЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓ</span>
                <span className="text-foreground">{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    achievement.progress > 0 ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {getProgressPercentage(achievement.progress, achievement.maxProgress)}% Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С•
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: {achievement.reward.coins} Р СР С•Р Р…Р ВµРЎвЂљ
              {achievement.reward.experience && ` РІР‚Сћ ${achievement.reward.experience} XP`}
            </div>
            {achievement.isCompleted && (
              <div className="text-green-600 font-medium text-sm">
                +{achievement.reward.coins} СЂСџвЂ™В°
                {achievement.reward.experience && ` +${achievement.reward.experience} РІВ­С’`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ" 
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
        user={currentUser}
      />
      
      <div className="pt-20 pb-20 p-6">
        {/* Р РЋРЎвЂљР В°РЎвЂљР С‘РЎРѓРЎвЂљР С‘Р С”Р В° */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 rounded-2xl apple-shadow text-center">
            <div className="text-2xl font-medium text-green-600 mb-1">
              {completedCount}
            </div>
            <div className="text-sm text-muted-foreground">
              Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С•
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow text-center">
            <div className="text-2xl font-medium text-blue-600 mb-1">
              {progressCount}
            </div>
            <div className="text-sm text-muted-foreground">
              Р вЂ™ Р С—РЎР‚Р С•РЎвЂ Р ВµРЎРѓРЎРѓР Вµ
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow text-center">
            <div className="text-2xl font-medium text-muted-foreground mb-1">
              {lockedCount}
            </div>
            <div className="text-sm text-muted-foreground">
              Р вЂ”Р В°Р В±Р В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С•
            </div>
          </div>
        </div>

        {/* Р СџР С•Р С‘РЎРѓР С” */}
        <div className="glass-card rounded-2xl p-4 mb-6 apple-shadow">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Р СџР С•Р С‘РЎРѓР С” Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-black/5 rounded transition-colors"
              >
                <Filter className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Р СћР В°Р В±РЎвЂ№ */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card text-foreground hover:scale-[0.98]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„– */}
        <div className="space-y-4">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map(renderAchievementCard)
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'Р СњР С‘РЎвЂЎР ВµР С–Р С• Р Р…Р Вµ Р Р…Р В°Р в„–Р Т‘Р ВµР Р…Р С•' : 'Р СњР ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery 
                  ? 'Р СџР С•Р С—РЎР‚Р С•Р В±РЎС“Р в„–РЎвЂљР Вµ Р С‘Р В·Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ Р С—Р С•Р С‘РЎРѓР С”Р С•Р Р†РЎвЂ№Р в„– Р В·Р В°Р С—РЎР‚Р С•РЎРѓ'
                  : activeTab === 'completed'
                  ? 'Р Р€ Р Р†Р В°РЎРѓ Р С—Р С•Р С”Р В° Р Р…Р ВµРЎвЂљ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–'
                  : activeTab === 'progress'
                  ? 'Р Р€ Р Р†Р В°РЎРѓ Р Р…Р ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„– Р Р† Р С—РЎР‚Р С•РЎвЂ Р ВµРЎРѓРЎРѓР Вµ'
                  : activeTab === 'locked'
                  ? 'Р вЂ™РЎРѓР Вµ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ РЎР‚Р В°Р В·Р В±Р В»Р С•Р С”Р С‘РЎР‚Р С•Р Р†Р В°Р Р…РЎвЂ№!'
                  : 'Р СњР В°РЎвЂЎР Р…Р С‘РЎвЂљР Вµ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…РЎРЏРЎвЂљРЎРЉ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform"
                >
                  Р С›РЎвЂЎР С‘РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ Р С—Р С•Р С‘РЎРѓР С”
                </button>
              )}
            </div>
          )}
        </div>

        {/* Р РЋР С•Р Р†Р ВµРЎвЂљ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ */}
        {achievements.length > 0 && !searchQuery && (
          <div className="glass-card rounded-2xl p-4 mt-6 apple-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">Р РЋР С•Р Р†Р ВµРЎвЂљ</div>
                <div className="text-sm text-muted-foreground">
                  Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…РЎРЏР в„–РЎвЂљР Вµ Р ВµР В¶Р ВµР Т‘Р Р…Р ВµР Р†Р Р…РЎвЂ№Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ Р Т‘Р В»РЎРЏ Р В±РЎвЂ№РЎРѓРЎвЂљРЎР‚Р С•Р С–Р С• Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° Р Р† Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏРЎвЂ¦!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}
