import React from 'react';
import { Zap, Sword, Trophy } from 'lucide-react';

interface BattlesPageProps {
  theme: 'light' | 'dark';
  currentUser: any;
  notifications: any[];
  onOpenSettings: () => void;
}

export default function BattlesPage({
  theme,
  currentUser,
  notifications,
  onOpenSettings,
}: BattlesPageProps) {
  // AUTOGEN START battles-content
  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h1 className="unified-heading">Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–</h1>
            <p className="unified-text text-muted-foreground">
              Р В Р Р‹Р РЋР вЂљР В Р’В°Р В Р’В¶Р В Р’В°Р В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’ВµР РЋР С“Р РЋР Р‰ Р РЋР С“ Р В РўвЂР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В РЎвЂР В РЎВР В РЎвЂ Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В РЎвЂўР В РЎвЂќР В Р’В°Р В РЎВР В РЎвЂ
            </p>
          </div>
        </div>
        
        <button className="apple-button p-3" aria-label="Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»">
          <Sword className="w-5 h-5" />
        </button>
      </div>

      {/* Active Battles */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–</h2>
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="unified-text font-medium">Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В» #123</h3>
              <span className="unified-text text-sm text-yellow-500">РЎР‚РЎСџРІР‚в„ўР’В° 500 Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <p className="unified-text text-sm">Р В РІР‚в„ўР РЋРІР‚в„–</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <span className="unified-text text-sm">VS</span>
              <div className="flex-1">
                <p className="unified-text text-sm">Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В РЎвЂР В РЎвЂќ</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
            <button className="w-full apple-button" aria-label="Р В РЎСџР РЋР вЂљР В РЎвЂўР В РўвЂР В РЎвЂўР В Р’В»Р В Р’В¶Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»">
              Р В РЎСџР РЋР вЂљР В РЎвЂўР В РўвЂР В РЎвЂўР В Р’В»Р В Р’В¶Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»
            </button>
          </div>
        </div>
      </div>

      {/* Battle History */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">Р В Р’ВР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР РЋР РЏ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Р В РЎСџР В РЎвЂўР В Р’В±Р В Р’ВµР В РўвЂР В Р’В°</p>
              <p className="unified-text text-sm text-muted-foreground">
                Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В РЎвЂР В РЎвЂќ: Player123 - 2 Р РЋРІР‚РЋР В Р’В°Р РЋР С“Р В Р’В° Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р’В°Р В РўвЂ
              </p>
            </div>
            <span className="unified-text text-sm text-green-500">+250 Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Sword className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Р В РЎСџР В РЎвЂўР РЋР вЂљР В Р’В°Р В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ</p>
              <p className="unified-text text-sm text-muted-foreground">
                Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р В РЎвЂР В РЎвЂќ: Player456 - 1 Р В РўвЂР В Р’ВµР В Р вЂ¦Р РЋР Р‰ Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р’В°Р В РўвЂ
              </p>
            </div>
            <span className="unified-text text-sm text-red-500">-100 Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Р В РІР‚ВР РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="apple-button p-4" aria-label="Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»">
            <Sword className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»</span>
          </button>
          <button className="apple-button p-4" aria-label="Р В РЎСџР РЋР вЂљР В РЎвЂР РЋР С“Р В РЎвЂўР В Р’ВµР В РўвЂР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰Р РЋР С“Р РЋР РЏ Р В РЎвЂќ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРЎвЂњ">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">Р В РЎСџР РЋР вЂљР В РЎвЂР РЋР С“Р В РЎвЂўР В Р’ВµР В РўвЂР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰Р РЋР С“Р РЋР РЏ</span>
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END battles-content
}
