п»їimport { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Play, Pause, Archive, Copy, Check, ChevronLeft, ChevronRight, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Gamepad2, Box, CircleDot, Scissors, DollarSign, X, Settings } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

interface AdminGamesPageNewFixedProps {
  onBack: () => void;
  onNavigateToSection: (section: string) => void;
}

interface Game {
  id: string;
  name: string;
  description: string;
  type: 'wheel' | 'rps' | 'slots';
  status: 'draft' | 'published' | 'archived';
  icon?: string;
  config: any;
  rewards: any[];
  access: {
    visibility: string;
    cooldownSeconds: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  stats: {
    totalPlays: number;
    totalRewards: number;
    uniquePlayers: number;
  };
}

export function AdminGamesPageNewFixed({ onBack, onNavigateToSection }: AdminGamesPageNewFixedProps) {
  // Р СњР В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘Р С•Р Р…Р Р…РЎвЂ№Р Вµ РЎРЊР В»Р ВµР СР ВµР Р…РЎвЂљРЎвЂ№ Р С—Р В°Р Р…Р ВµР В»Р С‘ Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р В°
  const navigationItems = [
    { icon: Home, label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ', section: 'dashboard' },
    { icon: Users, label: 'Р вЂ™Р С•РЎР‚Р С”Р ВµРЎР‚РЎвЂ№', section: 'workers' },
    { icon: Zap, label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№', section: 'battles' },
    { icon: Trophy, label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘', section: 'tasks' },
    { icon: ShoppingBag, label: 'Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№', section: 'shop' },
    { icon: Gamepad2, label: 'Р ВР С–РЎР‚РЎвЂ№', section: 'games' },
    { icon: Box, label: 'Р С™Р ВµР в„–РЎРѓРЎвЂ№', section: 'cases' }
  ];

  // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С РЎвЂљР ВµРЎРѓРЎвЂљР С•Р Р†РЎС“РЎР‹ Р С‘Р С–РЎР‚РЎС“ Р Т‘Р В»РЎРЏ Р Т‘Р ВµР СР С•Р Р…РЎРѓРЎвЂљРЎР‚Р В°РЎвЂ Р С‘Р С‘  
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      name: 'Р СџР СџР Сџ',
      description: 'Р С™Р С•Р В»Р ВµРЎРѓР С• РЎвЂћР С•РЎР‚РЎвЂљРЎС“Р Р…РЎвЂ№ РІР‚Сћ Р С™РЎС“Р В»Р Т‘Р В°РЎС“Р Р… 300РЎРѓ',
      type: 'wheel',
      status: 'draft',
      icon: 'СЂСџР‹В®',
      config: {
        sectors: [],
        spinAnimationMs: 3000
      },
      rewards: [],
      access: {
        visibility: 'public',
        cooldownSeconds: 300
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        totalPlays: 0,
        totalRewards: 0,
        uniquePlayers: 0
      }
    }
  ]);

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGameStatusChange = (gameId: string, newStatus: Game['status']) => {
    setGames(prev => prev.map(game => 
      game.id === gameId 
        ? { 
            ...game, 
            status: newStatus,
            updatedAt: new Date().toISOString(),
            publishedAt: newStatus === 'published' ? new Date().toISOString() : game.publishedAt
          }
        : game
    ));
  };

  const handleDeleteGame = (gameId: string) => {
    setGames(prev => prev.filter(game => game.id !== gameId));
  };

  const openEditModal = (game: Game) => {
    setSelectedGame(game);
    setIsWizardOpen(true);
  };

  const getStatusColor = (status: Game['status']) => {
    switch (status) {
      case 'published': return 'text-green-600';
      case 'draft': return 'text-orange-500';
      case 'archived': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusLabel = (status: Game['status']) => {
    switch (status) {
      case 'published': return 'Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р С•';
      case 'draft': return 'Р В§Р ВµРЎР‚Р Р…Р С•Р Р†Р С‘Р С”';
      case 'archived': return 'Р С’РЎР‚РЎвЂ¦Р С‘Р Р†';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-foreground">Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р С‘Р С–РЎР‚Р В°Р СР С‘</h1>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform apple-shadow"
          >
            <Plus className="w-4 h-4" />
            Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С‘Р С–РЎР‚РЎС“
          </button>
        </div>

        {/* Р РЋРЎвЂљР В°РЎвЂљР С‘РЎРѓРЎвЂљР С‘Р С”Р В° */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-foreground mb-1">
                {games.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Р вЂ™РЎРѓР ВµР С–Р С• Р С‘Р С–РЎР‚
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-green-600 mb-1">
                {games.filter(game => game.status === 'published').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р С•
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-muted-foreground mb-1">
                {games.filter(game => game.status === 'archived').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Р вЂ™ Р В°РЎР‚РЎвЂ¦Р С‘Р Р†Р Вµ
              </div>
            </div>
          </div>
        </div>

        {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р С‘Р С–РЎР‚ */}
        <div className="space-y-4">
          {games.length > 0 ? (
            games.map((game) => (
              <div key={game.id} className="glass-card rounded-2xl p-4 apple-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center shrink-0">
                    <CircleDot className="w-6 h-6 text-foreground/70" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground truncate">
                          {game.name}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {game.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          game.status === 'published' ? 'bg-green-100 text-green-800' :
                          game.status === 'draft' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatusLabel(game.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Р ВР С–РЎР‚: </span>
                        <span className="text-foreground">
                          {game.stats.totalPlays}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Р СњР В°Р С–РЎР‚Р В°Р Т‘: </span>
                        <span className="text-foreground">
                          {game.stats.totalRewards}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm gap-2 mb-3">
                      <div className="text-muted-foreground">
                        Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С•: {formatDate(game.updatedAt)} РІР‚Сћ Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р С•: {game.publishedAt ? formatDate(game.publishedAt) : 'Р СњР Вµ Р С•Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р С•'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:scale-[0.98] transition-transform shrink-0">
                        <Eye className="w-4 h-4" />
                        Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚
                      </button>
                      <button 
                        onClick={() => openEditModal(game)}
                        className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:scale-[0.98] transition-transform shrink-0"
                      >
                        <Edit className="w-4 h-4" />
                        Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ
                      </button>
                      <button className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0 hover:scale-[0.98] transition-transform">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
              <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Р ВР С–РЎР‚ Р С—Р С•Р С”Р В° Р Р…Р ВµРЎвЂљ
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Р СџРЎР‚Р С•РЎРѓРЎвЂљР С•Р Вµ Р СР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ/РЎР‚Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘РЎРЏ Р С‘Р С–РЎР‚РЎвЂ№ */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background rounded-2xl p-6 apple-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-foreground">
                {selectedGame ? 'Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С‘Р С–РЎР‚РЎС“' : 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С‘Р С–РЎР‚РЎС“'}
              </h2>
              <button
                onClick={() => {
                  setIsWizardOpen(false);
                  setSelectedGame(null);
                }}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№
                </label>
                <input
                  type="text"
                  defaultValue={selectedGame?.name || ''}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ
                </label>
                <textarea
                  defaultValue={selectedGame?.description || ''}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsWizardOpen(false);
                    setSelectedGame(null);
                  }}
                  className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
                >
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </button>
                <button
                  onClick={() => {
                    setIsWizardOpen(false);
                    setSelectedGame(null);
                  }}
                  className="flex-1 bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
                >
                  {selectedGame ? 'Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ' : 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р Р…Р В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘РЎРЏ */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/20">
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {navigationItems.slice(0, 4).map((item, index) => {
              const Icon = item.icon;
              const isActive = item.section === 'games';
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={() => onNavigateToSection(item.section)}
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
              const isActive = item.section === 'games';
              return (
                <button 
                  key={index} 
                  className="flex flex-col items-center text-center"
                  onClick={() => onNavigateToSection(item.section)}
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
        </div>
      </div>
    </div>
  );
}
