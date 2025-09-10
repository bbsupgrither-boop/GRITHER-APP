import { useState } from 'react';
import { Eye, Menu, Check, ArrowLeft, Trophy, Star, Award, Medal } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Achievement } from '../types/achievements';

interface AchievementIconsProps {
  achievements?: Achievement[];
}

export function AchievementIcons({ achievements = [] }: AchievementIconsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  
  // РџРѕР»СѓС‡Р°РµРј С‚РѕР»СЊРєРѕ СЂР°Р·Р±Р»РѕРєРёСЂРѕРІР°РЅРЅС‹Рµ РґРѕСЃС‚РёР¶РµРЅРёСЏ
  const unlockedAchievements = achievements.filter(achievement => achievement.isUnlocked);
  
  // РњР°РєСЃРёРјСѓРј 7 СЏС‡РµРµРє РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ (РєР°Рє РІ РѕСЂРёРіРёРЅР°Р»СЊРЅРѕРј РґРёР·Р°Р№РЅРµ)
  const maxSlots = 7;
  
  const getAchievementIcon = (iconName: string, rarity: string) => {
    const iconClass = `w-6 h-6 ${rarity === 'legendary' ? 'text-yellow-500' : rarity === 'epic' ? 'text-purple-500' : rarity === 'rare' ? 'text-blue-500' : 'text-primary'}`;
    
    switch (iconName) {
      case 'trophy':
        return <Trophy className={iconClass} />;
      case 'star':
        return <Star className={iconClass} />;
      case 'award':
        return <Award className={iconClass} />;
      case 'medal':
        return <Medal className={iconClass} />;
      default:
        return <Trophy className={iconClass} />;
    }
  };

  const handleSelectionModeToggle = () => {
    setIsSelectionMode(!isSelectionMode);
  };

  const handleConfirmSelection = () => {
    setIsSelectionMode(false);
    // Р—РґРµСЃСЊ Р±СѓРґРµС‚ Р»РѕРіРёРєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РІС‹Р±СЂР°РЅРЅС‹С… РґРѕСЃС‚РёР¶РµРЅРёР№
  };

  return (
    <>
      <div className="mb-6">
        <div className="glass-card rounded-2xl p-4 apple-shadow">
          <div className="relative flex items-center justify-center mb-3">
            <span className="font-medium text-foreground">РђС‡РёРІРєРё</span>
            <button 
              onClick={() => setIsOpen(true)}
              className="absolute right-0 apple-button p-2 rounded-full hover:scale-105 transition-transform"
            >
              <Eye className="w-4 h-4 text-foreground/70" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 min-h-[80px]">
            {Array.from({ length: maxSlots }, (_, index) => {
              const achievement = unlockedAchievements[index];
              return (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    achievement
                      ? `${achievement.rarity === 'legendary' ? 'bg-yellow-500/20 border border-yellow-500/30' : 
                          achievement.rarity === 'epic' ? 'bg-purple-500/20 border border-purple-500/30' : 
                          achievement.rarity === 'rare' ? 'bg-blue-500/20 border border-blue-500/30' : 
                          'bg-primary/20 border border-primary/30'} apple-shadow`
                      : 'bg-muted/30 border border-border'
                  }`}
                >
                  {achievement ? (
                    <div className="flex items-center justify-center">
                      {getAchievementIcon(achievement.icon, achievement.rarity)}
                    </div>
                  ) : (
                    <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
          
          {unlockedAchievements.length === 0 && (
            <div className="flex items-center justify-center mt-2">
              <p className="text-muted-foreground text-sm text-center opacity-70">
                РќРµС‚ РїРѕР»СѓС‡РµРЅРЅС‹С… Р°С‡РёРІРѕРє
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-6 [&>button]:hidden">
          <div className="relative">
            {/* РљРЅРѕРїРєР° РЅР°Р·Р°Рґ (СЃС‚СЂРµР»РєР° РІР»РµРІРѕ) */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute left-0 top-0 apple-button p-2 rounded-full hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 text-foreground/70" />
            </button>
            
            <DialogTitle className="text-lg font-medium text-foreground text-center mb-6">
              РђС‡РёРІРєРё
            </DialogTitle>
            
            {/* РљРЅРѕРїРєР° РІС‹Р±РѕСЂР° (С‚СЂРё Р»РёРЅРёРё) */}
            {!isSelectionMode && (
              <button 
                onClick={handleSelectionModeToggle}
                className="absolute top-0 right-0 apple-button p-2 rounded-full hover:scale-105 transition-transform"
              >
                <Menu className="w-4 h-4 text-foreground/70" />
              </button>
            )}

            {/* РљРЅРѕРїРєР° РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ (РіР°Р»РѕС‡РєР°) */}
            {isSelectionMode && (
              <button 
                onClick={handleConfirmSelection}
                className="absolute top-0 right-0 apple-button p-2 rounded-full hover:scale-105 transition-transform"
              >
                <Check className="w-4 h-4 text-foreground/70" />
              </button>
            )}
          </div>
          
          <DialogDescription className="sr-only">
            РџСЂРѕСЃРјРѕС‚СЂ РІР°С€РёС… РїРѕР»СѓС‡РµРЅРЅС‹С… Р°С‡РёРІРѕРє
          </DialogDescription>

          {/* РљРѕРЅС‚РµРЅС‚ */}
          <div className="min-h-[120px]">
            {isSelectionMode ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-center">
                  Р РµР¶РёРј РІС‹Р±РѕСЂР° РґРѕСЃС‚РёР¶РµРЅРёР№ РґР»СЏ РіР»Р°РІРЅРѕР№ СЃС‚СЂР°РЅРёС†С‹
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {unlockedAchievements.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {unlockedAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-2xl glass-card apple-shadow flex flex-col items-center gap-2 ${
                          achievement.rarity === 'legendary' ? 'border border-yellow-500/30' : 
                          achievement.rarity === 'epic' ? 'border border-purple-500/30' : 
                          achievement.rarity === 'rare' ? 'border border-blue-500/30' : 
                          'border border-primary/30'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          achievement.rarity === 'legendary' ? 'bg-yellow-500/20' : 
                          achievement.rarity === 'epic' ? 'bg-purple-500/20' : 
                          achievement.rarity === 'rare' ? 'bg-blue-500/20' : 
                          'bg-primary/20'
                        }`}>
                          {getAchievementIcon(achievement.icon, achievement.rarity)}
                        </div>
                        <div className="text-center">
                          <div className="text-xs font-medium text-foreground">
                            {achievement.title}
                          </div>
                          {achievement.unlockedAt && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {achievement.unlockedAt.toLocaleDateString('ru-RU')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground text-center">
                      РќРµС‚ РїРѕР»СѓС‡РµРЅРЅС‹С… Р°С‡РёРІРѕРє
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
