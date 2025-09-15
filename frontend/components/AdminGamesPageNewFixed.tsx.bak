import { useState } from 'react';
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
  // РќР°РІРёРіР°С†РёРѕРЅРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹ РїР°РЅРµР»Рё Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°
  const navigationItems = [
    { icon: Home, label: 'Р“Р»Р°РІРЅР°СЏ', section: 'dashboard' },
    { icon: Users, label: 'Р’РѕСЂРєРµСЂС‹', section: 'workers' },
    { icon: Zap, label: 'Р‘Р°С‚С‚Р»С‹', section: 'battles' },
    { icon: Trophy, label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р—Р°РґР°С‡Рё', section: 'tasks' },
    { icon: ShoppingBag, label: 'РўРѕРІР°СЂС‹', section: 'shop' },
    { icon: Gamepad2, label: 'РРіСЂС‹', section: 'games' },
    { icon: Box, label: 'РљРµР№СЃС‹', section: 'cases' }
  ];

  // Р”РѕР±Р°РІР»СЏРµРј С‚РµСЃС‚РѕРІСѓСЋ РёРіСЂСѓ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё  
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      name: 'РџРџРџ',
      description: 'РљРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹ вЂў РљСѓР»РґР°СѓРЅ 300СЃ',
      type: 'wheel',
      status: 'draft',
      icon: 'рџЋ®',
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
      case 'published': return 'РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ';
      case 'draft': return 'Р§РµСЂРЅРѕРІРёРє';
      case 'archived': return 'РђСЂС…РёРІ';
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
        {/* Р—Р°РіРѕР»РѕРІРѕРє */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium text-foreground">РЈРїСЂР°РІР»РµРЅРёРµ РёРіСЂР°РјРё</h1>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform apple-shadow"
          >
            <Plus className="w-4 h-4" />
            РЎРѕР·РґР°С‚СЊ РёРіСЂСѓ
          </button>
        </div>

        {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-foreground mb-1">
                {games.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Р’СЃРµРіРѕ РёРіСЂ
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-green-600 mb-1">
                {games.filter(game => game.status === 'published').length}
              </div>
              <div className="text-sm text-muted-foreground">
                РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-muted-foreground mb-1">
                {games.filter(game => game.status === 'archived').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Р’ Р°СЂС…РёРІРµ
              </div>
            </div>
          </div>
        </div>

        {/* РЎРїРёСЃРѕРє РёРіСЂ */}
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
                        <span className="text-muted-foreground">РРіСЂ: </span>
                        <span className="text-foreground">
                          {game.stats.totalPlays}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">РќР°РіСЂР°Рґ: </span>
                        <span className="text-foreground">
                          {game.stats.totalRewards}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm gap-2 mb-3">
                      <div className="text-muted-foreground">
                        РћР±РЅРѕРІР»РµРЅРѕ: {formatDate(game.updatedAt)} вЂў РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: {game.publishedAt ? formatDate(game.publishedAt) : 'РќРµ РѕРїСѓР±Р»РёРєРѕРІР°РЅРѕ'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:scale-[0.98] transition-transform shrink-0">
                        <Eye className="w-4 h-4" />
                        РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ
                      </button>
                      <button 
                        onClick={() => openEditModal(game)}
                        className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:scale-[0.98] transition-transform shrink-0"
                      >
                        <Edit className="w-4 h-4" />
                        Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ
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
                РРіСЂ РїРѕРєР° РЅРµС‚
              </p>
            </div>
          )}
        </div>
      </div>

      {/* РџСЂРѕСЃС‚РѕРµ РјРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЃРѕР·РґР°РЅРёСЏ/СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РёРіСЂС‹ */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background rounded-2xl p-6 apple-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-foreground">
                {selectedGame ? 'Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РёРіСЂСѓ' : 'РЎРѕР·РґР°С‚СЊ РёРіСЂСѓ'}
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
                  РќР°Р·РІР°РЅРёРµ РёРіСЂС‹
                </label>
                <input
                  type="text"
                  defaultValue={selectedGame?.name || ''}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ РёРіСЂС‹"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РћРїРёСЃР°РЅРёРµ
                </label>
                <textarea
                  defaultValue={selectedGame?.description || ''}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="РћРїРёСЃР°РЅРёРµ РёРіСЂС‹"
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
                  РћС‚РјРµРЅРёС‚СЊ
                </button>
                <button
                  onClick={() => {
                    setIsWizardOpen(false);
                    setSelectedGame(null);
                  }}
                  className="flex-1 bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
                >
                  {selectedGame ? 'РЎРѕС…СЂР°РЅРёС‚СЊ' : 'РЎРѕР·РґР°С‚СЊ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Р‘С‹СЃС‚СЂР°СЏ РЅР°РІРёРіР°С†РёСЏ */}
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
