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
            <h1 className="unified-heading">Р‘Р°С‚С‚Р»С‹</h1>
            <p className="unified-text text-muted-foreground">
              РЎСЂР°Р¶Р°Р№С‚РµСЃСЊ СЃ РґСЂСѓРіРёРјРё РёРіСЂРѕРєР°РјРё
            </p>
          </div>
        </div>
        
        <button className="apple-button p-3" aria-label="РЎРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»">
          <Sword className="w-5 h-5" />
        </button>
      </div>

      {/* Active Battles */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">РђРєС‚РёРІРЅС‹Рµ Р±Р°С‚С‚Р»С‹</h2>
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="unified-text font-medium">Р‘Р°С‚С‚Р» #123</h3>
              <span className="unified-text text-sm text-yellow-500">рџ’° 500 РјРѕРЅРµС‚</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <p className="unified-text text-sm">Р’С‹</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <span className="unified-text text-sm">VS</span>
              <div className="flex-1">
                <p className="unified-text text-sm">РџСЂРѕС‚РёРІРЅРёРє</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
            <button className="w-full apple-button" aria-label="РџСЂРѕРґРѕР»Р¶РёС‚СЊ Р±Р°С‚С‚Р»">
              РџСЂРѕРґРѕР»Р¶РёС‚СЊ Р±Р°С‚С‚Р»
            </button>
          </div>
        </div>
      </div>

      {/* Battle History */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">РСЃС‚РѕСЂРёСЏ Р±Р°С‚С‚Р»РѕРІ</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">РџРѕР±РµРґР°</p>
              <p className="unified-text text-sm text-muted-foreground">
                РџСЂРѕС‚РёРІРЅРёРє: Player123 - 2 С‡Р°СЃР° РЅР°Р·Р°Рґ
              </p>
            </div>
            <span className="unified-text text-sm text-green-500">+250 РјРѕРЅРµС‚</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Sword className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">РџРѕСЂР°Р¶РµРЅРёРµ</p>
              <p className="unified-text text-sm text-muted-foreground">
                РџСЂРѕС‚РёРІРЅРёРє: Player456 - 1 РґРµРЅСЊ РЅР°Р·Р°Рґ
              </p>
            </div>
            <span className="unified-text text-sm text-red-500">-100 РјРѕРЅРµС‚</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Р‘С‹СЃС‚СЂС‹Рµ РґРµР№СЃС‚РІРёСЏ</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="apple-button p-4" aria-label="РЎРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»">
            <Sword className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">РЎРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»</span>
          </button>
          <button className="apple-button p-4" aria-label="РџСЂРёСЃРѕРµРґРёРЅРёС‚СЊСЃСЏ Рє Р±Р°С‚С‚Р»Сѓ">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">РџСЂРёСЃРѕРµРґРёРЅРёС‚СЊСЃСЏ</span>
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END battles-content
}
