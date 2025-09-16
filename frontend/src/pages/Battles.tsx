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
            <h1 className="unified-heading">Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№</h1>
            <p className="unified-text text-muted-foreground">
              Р РЋРЎР‚Р В°Р В¶Р В°Р в„–РЎвЂљР ВµРЎРѓРЎРЉ РЎРѓ Р Т‘РЎР‚РЎС“Р С–Р С‘Р СР С‘ Р С‘Р С–РЎР‚Р С•Р С”Р В°Р СР С‘
            </p>
          </div>
        </div>
        
        <button className="apple-button p-3" aria-label="Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»">
          <Sword className="w-5 h-5" />
        </button>
      </div>

      {/* Active Battles */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№</h2>
        <div className="space-y-3">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="unified-text font-medium">Р вЂР В°РЎвЂљРЎвЂљР В» #123</h3>
              <span className="unified-text text-sm text-yellow-500">СЂСџвЂ™В° 500 Р СР С•Р Р…Р ВµРЎвЂљ</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1">
                <p className="unified-text text-sm">Р вЂ™РЎвЂ№</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
              <span className="unified-text text-sm">VS</span>
              <div className="flex-1">
                <p className="unified-text text-sm">Р СџРЎР‚Р С•РЎвЂљР С‘Р Р†Р Р…Р С‘Р С”</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
            <button className="w-full apple-button" aria-label="Р СџРЎР‚Р С•Р Т‘Р С•Р В»Р В¶Р С‘РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»">
              Р СџРЎР‚Р С•Р Т‘Р С•Р В»Р В¶Р С‘РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»
            </button>
          </div>
        </div>
      </div>

      {/* Battle History */}
      <div className="glass-card p-4 mb-4">
        <h2 className="unified-heading mb-3">Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Р СџР С•Р В±Р ВµР Т‘Р В°</p>
              <p className="unified-text text-sm text-muted-foreground">
                Р СџРЎР‚Р С•РЎвЂљР С‘Р Р†Р Р…Р С‘Р С”: Player123 - 2 РЎвЂЎР В°РЎРѓР В° Р Р…Р В°Р В·Р В°Р Т‘
              </p>
            </div>
            <span className="unified-text text-sm text-green-500">+250 Р СР С•Р Р…Р ВµРЎвЂљ</span>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Sword className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="unified-text font-medium">Р СџР С•РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ</p>
              <p className="unified-text text-sm text-muted-foreground">
                Р СџРЎР‚Р С•РЎвЂљР С‘Р Р†Р Р…Р С‘Р С”: Player456 - 1 Р Т‘Р ВµР Р…РЎРЉ Р Р…Р В°Р В·Р В°Р Т‘
              </p>
            </div>
            <span className="unified-text text-sm text-red-500">-100 Р СР С•Р Р…Р ВµРЎвЂљ</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h2 className="unified-heading mb-3">Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚РЎвЂ№Р Вµ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘РЎРЏ</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="apple-button p-4" aria-label="Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»">
            <Sword className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р В±Р В°РЎвЂљРЎвЂљР В»</span>
          </button>
          <button className="apple-button p-4" aria-label="Р СџРЎР‚Р С‘РЎРѓР С•Р ВµР Т‘Р С‘Р Р…Р С‘РЎвЂљРЎРЉРЎРѓРЎРЏ Р С” Р В±Р В°РЎвЂљРЎвЂљР В»РЎС“">
            <Zap className="w-6 h-6 mx-auto mb-2" />
            <span className="unified-text">Р СџРЎР‚Р С‘РЎРѓР С•Р ВµР Т‘Р С‘Р Р…Р С‘РЎвЂљРЎРЉРЎРѓРЎРЏ</span>
          </button>
        </div>
      </div>
    </div>
  );
  // AUTOGEN END battles-content
}
