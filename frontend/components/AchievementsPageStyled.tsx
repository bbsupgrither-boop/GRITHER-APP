import { useState } from 'react';
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
    { id: 'all' as const, label: 'Р’СЃРµ', icon: Target },
    { id: 'completed' as const, label: 'Р’С‹РїРѕР»РЅРµРЅРЅС‹Рµ', icon: CheckCircle },
    { id: 'progress' as const, label: 'Р’ РїСЂРѕС†РµСЃСЃРµ', icon: Clock },
    { id: 'locked' as const, label: 'Р—Р°Р±Р»РѕРєРёСЂРѕРІР°РЅРЅС‹Рµ', icon: Star }
  ];

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ РґРѕСЃС‚РёР¶РµРЅРёР№
  const getFilteredAchievements = () => {
    let filtered = achievements;

    // Р¤РёР»СЊС‚СЂ РїРѕ РїРѕРёСЃРєСѓ
    if (searchQuery) {
      filtered = filtered.filter(achievement => 
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Р¤РёР»СЊС‚СЂ РїРѕ С‚Р°Р±Р°Рј
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
          <span className="text-xl">{achievement.icon || 'рџЏ†'}</span>
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
                  Р’С‹РїРѕР»РЅРµРЅРѕ
                </div>
              )}
              {!achievement.isCompleted && achievement.progress > 0 && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  <Clock className="w-3 h-3" />
                  Р’ РїСЂРѕС†РµСЃСЃРµ
                </div>
              )}
            </div>
          </div>
          
          {!achievement.isCompleted && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">РџСЂРѕРіСЂРµСЃСЃ</span>
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
                {getProgressPercentage(achievement.progress, achievement.maxProgress)}% РІС‹РїРѕР»РЅРµРЅРѕ
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              РќР°РіСЂР°РґР°: {achievement.reward.coins} РјРѕРЅРµС‚
              {achievement.reward.experience && ` вЂў ${achievement.reward.experience} XP`}
            </div>
            {achievement.isCompleted && (
              <div className="text-green-600 font-medium text-sm">
                +{achievement.reward.coins} рџ’°
                {achievement.reward.experience && ` +${achievement.reward.experience} в­ђ`}
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
        title="Р”РѕСЃС‚РёР¶РµРЅРёСЏ" 
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
        user={currentUser}
      />
      
      <div className="pt-20 pb-20 p-6">
        {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 rounded-2xl apple-shadow text-center">
            <div className="text-2xl font-medium text-green-600 mb-1">
              {completedCount}
            </div>
            <div className="text-sm text-muted-foreground">
              Р’С‹РїРѕР»РЅРµРЅРѕ
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow text-center">
            <div className="text-2xl font-medium text-blue-600 mb-1">
              {progressCount}
            </div>
            <div className="text-sm text-muted-foreground">
              Р’ РїСЂРѕС†РµСЃСЃРµ
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow text-center">
            <div className="text-2xl font-medium text-muted-foreground mb-1">
              {lockedCount}
            </div>
            <div className="text-sm text-muted-foreground">
              Р—Р°Р±Р»РѕРєРёСЂРѕРІР°РЅРѕ
            </div>
          </div>
        </div>

        {/* РџРѕРёСЃРє */}
        <div className="glass-card rounded-2xl p-4 mb-6 apple-shadow">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="РџРѕРёСЃРє РґРѕСЃС‚РёР¶РµРЅРёР№..."
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

        {/* РўР°Р±С‹ */}
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

        {/* РЎРїРёСЃРѕРє РґРѕСЃС‚РёР¶РµРЅРёР№ */}
        <div className="space-y-4">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map(renderAchievementCard)
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ' : 'РќРµС‚ РґРѕСЃС‚РёР¶РµРЅРёР№'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery 
                  ? 'РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ РїРѕРёСЃРєРѕРІС‹Р№ Р·Р°РїСЂРѕСЃ'
                  : activeTab === 'completed'
                  ? 'РЈ РІР°СЃ РїРѕРєР° РЅРµС‚ РІС‹РїРѕР»РЅРµРЅРЅС‹С… РґРѕСЃС‚РёР¶РµРЅРёР№'
                  : activeTab === 'progress'
                  ? 'РЈ РІР°СЃ РЅРµС‚ РґРѕСЃС‚РёР¶РµРЅРёР№ РІ РїСЂРѕС†РµСЃСЃРµ'
                  : activeTab === 'locked'
                  ? 'Р’СЃРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ СЂР°Р·Р±Р»РѕРєРёСЂРѕРІР°РЅС‹!'
                  : 'РќР°С‡РЅРёС‚Рµ РІС‹РїРѕР»РЅСЏС‚СЊ Р·Р°РґР°С‡Рё РґР»СЏ РїРѕР»СѓС‡РµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёР№'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform"
                >
                  РћС‡РёСЃС‚РёС‚СЊ РїРѕРёСЃРє
                </button>
              )}
            </div>
          )}
        </div>

        {/* РЎРѕРІРµС‚ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ */}
        {achievements.length > 0 && !searchQuery && (
          <div className="glass-card rounded-2xl p-4 mt-6 apple-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground text-sm">РЎРѕРІРµС‚</div>
                <div className="text-sm text-muted-foreground">
                  Р’С‹РїРѕР»РЅСЏР№С‚Рµ РµР¶РµРґРЅРµРІРЅС‹Рµ Р·Р°РґР°С‡Рё РґР»СЏ Р±С‹СЃС‚СЂРѕРіРѕ РїСЂРѕРіСЂРµСЃСЃР° РІ РґРѕСЃС‚РёР¶РµРЅРёСЏС…!
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
