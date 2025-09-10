import { useState } from 'react';
import { CheckCircle, Info, CheckSquare, Trophy, Shield, X, Home, Users, Zap, ShoppingBag, Gamepad2, Box, ArrowLeft, Clock, Bell } from './Icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { NotificationsModal } from './NotificationsModal';

interface AdminDashboardProps {
  onClose?: () => void;
  onToggleDarkMode?: () => void;
  onNavigateToWorkers?: () => void;
  onNavigateToAchievementsModeration?: () => void;
  onNavigateToGames?: () => void;
  onNavigateToCases?: () => void;
  onNavigateToBattles?: () => void;
}

interface Complaint {
  id: string;
  user: string;
  description: string;
  file?: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

export function AdminDashboard({ onClose, onToggleDarkMode, onNavigateToWorkers, onNavigateToAchievementsModeration, onNavigateToGames, onNavigateToCases, onNavigateToBattles }: AdminDashboardProps) {
  const [showComplaints, setShowComplaints] = useState(false);
  const [complaintsTab, setComplaintsTab] = useState<'active' | 'resolved'>('active');
  const [showHistory, setShowHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // РњРѕРєРѕРІС‹Рµ РґР°РЅРЅС‹Рµ Р¶Р°Р»РѕР±
  const complaints: Complaint[] = [];

  const activeComplaints = complaints.filter(c => c.status === 'active');
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved');

  const stats = [
    {
      title: 'РЈРІРµРґРѕРјР»РµРЅРёСЏ',
      value: '0',
      icon: Bell,
      hasAction: true,
      action: () => setShowNotifications(true)
    },
    {
      title: 'РЎРѕРѕР±С‰РµРЅРёСЏ Рѕ РїСЂРѕР±Р»РµРјР°С…',
      value: '0',
      icon: Info,
      hasAction: true,
      action: () => setShowComplaints(true)
    },
    {
      title: 'РљРѕР»-РІРѕ РІС‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡',
      value: '0',
      icon: CheckSquare
    },
    {
      title: 'Р”РѕСЃС‚РёР¶РµРЅРёР№ РїРѕР»СѓС‡РµРЅРѕ',
      value: '0',
      icon: Trophy
    }
  ];

  const recentActivity: any[] = [];

  const navigationItems = [
    { icon: Home, label: 'Р“Р»Р°РІРЅР°СЏ', action: null },
    { icon: Users, label: 'РЎРѕС‚СЂСѓРґРЅРёРєРё', action: onNavigateToWorkers },
    { icon: Zap, label: 'Р‘Р°С‚С‚Р»С‹', action: onNavigateToBattles },
    { icon: Trophy, label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', action: null },
    { icon: CheckSquare, label: 'Р—Р°РґР°С‡Рё', action: null },
    { icon: ShoppingBag, label: 'РўРѕРІР°СЂС‹', action: null },
    { icon: Gamepad2, label: 'РРіСЂС‹', action: onNavigateToGames },
    { icon: Box, label: 'РљРµР№СЃС‹', action: onNavigateToCases }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* РЎРѕРґРµСЂР¶РёРјРѕРµ */}
      <div className="p-6 space-y-6 pb-60">
        {/* Р—Р°РіРѕР»РѕРІРѕРє Р“Р»Р°РІРЅР°СЏ */}
        <h2 className="text-lg font-medium text-foreground text-center">Р“Р»Р°РІРЅР°СЏ</h2>
        
        {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="glass-card p-4 rounded-2xl apple-shadow cursor-pointer"
                onClick={stat.hasAction ? stat.action : undefined}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      {stat.title}
                    </div>
                  </div>
                  <div className="text-2xl font-medium text-foreground">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Р‘С‹СЃС‚СЂС‹Рµ РґРµР№СЃС‚РІРёСЏ 
            TODO: Р’ Р±СѓРґСѓС‰РµРј РґРѕР±Р°РІРёС‚СЊ РґРёРЅР°РјРёС‡РµСЃРєРёРµ РїСѓРЅРєС‚С‹ РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ СЂРѕР»Рё Р°РґРјРёРЅР°/С‚РёРјР»РёРґР°:
            - РўРёРјР»РёРґ: РјРѕРґРµСЂР°С†РёСЏ Р·Р°РґР°С‡ СЃРІРѕРёС… РІРѕСЂРєРµСЂРѕРІ, СЃС‚Р°С‚РёСЃС‚РёРєР° РєРѕРјР°РЅРґС‹
            - РјР». РђРґРјРёРЅ: СЃРѕР·РґР°РЅРёРµ Р·Р°РґР°С‡ РґР»СЏ РІСЃРµС…, РјРѕРґРµСЂР°С†РёСЏ РґРѕСЃС‚РёР¶РµРЅРёР№, Р·Р°РіСЂСѓР·РєР° РєР°СЂС‚РёРЅРѕРє, РїСЂРѕРІРµСЂРєР° Р±Р°С‚С‚Р»РѕРІ  
            - СЃС‚. РђРґРјРёРЅ: РІСЃРµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё РјР». РђРґРјРёРЅР° + СѓРїСЂР°РІР»РµРЅРёРµ РјР°РіР°Р·РёРЅРѕРј Рё Р±Р°Р»Р°РЅСЃРѕРј РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
            - РіР». РђРґРјРёРЅ: РІСЃРµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё + СѓРїСЂР°РІР»РµРЅРёРµ РЅР°СЃС‚СЂРѕР№РєР°РјРё СЃРёСЃС‚РµРјС‹ Рё СЂРѕР»СЏРјРё РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
        */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground text-center">Р‘С‹СЃС‚СЂС‹Рµ РґРµР№СЃС‚РІРёСЏ</h3>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden apple-shadow">
            <div className="p-4 text-center text-muted-foreground text-sm">
              РќРµС‚ СѓРІРµРґРѕРјР»РµРЅРёР№ РґР»СЏ РїСЂРѕРІРµСЂРєРё
            </div>
          </div>
        </div>

        {/* РџРѕСЃР»РµРґРЅСЏСЏ Р°РєС‚РёРІРЅРѕСЃС‚СЊ */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground text-center">РџРѕСЃР»РµРґРЅСЏСЏ Р°РєС‚РёРІРЅРѕСЃС‚СЊ</h3>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden apple-shadow relative">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground relative">
                РђРєС‚РёРІРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РЅРµС‚
                <button 
                  onClick={() => setShowHistory(true)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                  title="РСЃС‚РѕСЂРёСЏ Р°РєС‚РёРІРЅРѕСЃС‚Рё"
                >
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className={`p-4 flex items-center justify-between ${index !== recentActivity.length - 1 ? 'border-b border-border/20' : ''}`}>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{activity.user}</div>
                    <div className="text-sm text-muted-foreground mt-1">{activity.action}</div>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">{activity.time}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Р‘С‹СЃС‚СЂР°СЏ РЅР°РІРёРіР°С†РёСЏ */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/20">
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {navigationItems.slice(0, 4).map((item, index) => {
              const Icon = item.icon;
              const isActive = item.label === 'Р“Р»Р°РІРЅР°СЏ';
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={item.action || undefined}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                    isActive ? 'bg-primary' : 'glass-card'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isActive ? 'text-white' : 'text-foreground/70'
                    }`} />
                  </div>
                  <span className={`text-xs ${
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {navigationItems.slice(4, 8).map((item, index) => {
              const Icon = item.icon;
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={item.action || undefined}
                >
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center mb-2 apple-shadow">
                    <Icon className="w-6 h-6 text-foreground/70" />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ Р¶Р°Р»РѕР± */}
      {showComplaints && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-3xl w-full max-w-sm max-h-[80vh] overflow-hidden apple-shadow border border-border/20">
            {/* Р—Р°РіРѕР»РѕРІРѕРє РјРѕРґР°Р»СЊРЅРѕРіРѕ РѕРєРЅР° */}
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <h2 className="text-lg font-medium text-foreground text-center flex-1">РЎРѕРѕР±С‰РµРЅРёСЏ Рѕ РїСЂРѕР±Р»РµРјР°С…</h2>
              <button
                onClick={() => setShowComplaints(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>

            {/* Р’РєР»Р°РґРєРё */}
            <div className="flex border-b border-border/20">
              <button
                onClick={() => setComplaintsTab('active')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors text-center ${
                  complaintsTab === 'active'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                РђРєС‚РёРІРЅС‹Рµ ({activeComplaints.length})
              </button>
              <button
                onClick={() => setComplaintsTab('resolved')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors text-center ${
                  complaintsTab === 'resolved'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Р РµС€РµРЅС‹ ({resolvedComplaints.length})
              </button>
            </div>

            {/* РЎРїРёСЃРѕРє Р¶Р°Р»РѕР± */}
            <div className="overflow-y-auto max-h-96 p-6">
              {(complaintsTab === 'active' ? activeComplaints : resolvedComplaints).map((complaint) => (
                <div key={complaint.id} className="mb-4 p-4 bg-secondary rounded-2xl apple-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{complaint.user}</span>
                    <span className="text-xs text-muted-foreground">{complaint.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{complaint.description}</p>
                  {complaint.file && (
                    <div className="text-xs text-primary">рџ“Ћ {complaint.file}</div>
                  )}
                  {complaintsTab === 'active' && (
                    <button className="mt-3 px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors">
                      Р РµС€РёС‚СЊ
                    </button>
                  )}
                </div>
              ))}
              {(complaintsTab === 'active' ? activeComplaints : resolvedComplaints).length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  {complaintsTab === 'active' ? 'РђРєС‚РёРІРЅС‹С… РѕР±СЂР°С‰РµРЅРёР№ РЅРµС‚' : 'Р РµС€РµРЅРЅС‹С… РѕР±СЂР°С‰РµРЅРёР№ РЅРµС‚'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РёСЃС‚РѕСЂРёРё Р°РєС‚РёРІРЅРѕСЃС‚Рё */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="glass-card border-none max-w-sm p-0 [&>button]:hidden">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground/70" />
                </button>
                <DialogTitle className="text-lg font-medium text-foreground text-center flex-1">РСЃС‚РѕСЂРёСЏ РґРµР№СЃС‚РІРёР№</DialogTitle>
              </div>
              <DialogDescription className="sr-only">
                РСЃС‚РѕСЂРёСЏ РґРµР№СЃС‚РІРёР№ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
              </DialogDescription>
            </DialogHeader>

            <div className="text-center text-muted-foreground py-8">
              РСЃС‚РѕСЂРёСЏ Р°РєС‚РёРІРЅРѕСЃС‚Рё РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СѓРІРµРґРѕРјР»РµРЅРёР№ */}
      <NotificationsModal 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
