import { useState } from 'react';
import { ArrowLeft, Plus, Gamepad2, CircleDot, Dices, Clock, Eye, EyeOff, Edit, Trash2, X, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Box } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

interface AdminGamesPageProps {
  onBack: () => void;
  onNavigateToSection: (section: string) => void;
}

interface Game {
  id: string;
  name: string;
  description: string;
  cost: number;
  minReward: number;
  maxReward: number;
  cooldownHours: number;
  type: 'wheel' | 'rps' | 'casino' | 'custom';
  isActive: boolean;
  settings?: {
    [key: string]: any;
  };
}

const gameTypes = [
  { id: 'wheel', name: 'РљРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹', icon: CircleDot },
  { id: 'rps', name: 'РљР°РјРµРЅСЊ, РЅРѕР¶РЅРёС†С‹, Р±СѓРјР°РіР°', icon: Gamepad2 },
  { id: 'casino', name: 'РљР°Р·РёРЅРѕ', icon: Dices },
  { id: 'custom', name: 'РљР°СЃС‚РѕРјРЅР°СЏ РёРіСЂР°', icon: Gamepad2 }
];

export function AdminGamesPage({ onBack, onNavigateToSection }: AdminGamesPageProps) {
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
      cost: 0,
      minReward: 0,
      maxReward: 0,
      cooldownHours: 24,
      type: 'wheel',
      isActive: true
    }
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);


  // РЎРѕСЃС‚РѕСЏРЅРёРµ С„РѕСЂРјС‹
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: 0,
    minReward: 10,
    maxReward: 100,
    cooldownHours: 24,
    type: 'wheel' as Game['type'],
    isActive: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      cost: 0,
      minReward: 10,
      maxReward: 100,
      cooldownHours: 24,
      type: 'wheel',
      isActive: true
    });
  };

  const handleCreateGame = () => {
    const newGame: Game = {
      id: Date.now().toString(),
      ...formData
    };
    setGames(prev => [...prev, newGame]);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEditGame = () => {
    if (!selectedGame) return;
    
    setGames(prev => prev.map(game => 
      game.id === selectedGame.id 
        ? { ...game, ...formData }
        : game
    ));
    setIsEditModalOpen(false);
    setSelectedGame(null);
    resetForm();
  };

  const handleDeleteGame = (gameId: string) => {
    setGames(prev => prev.filter(game => game.id !== gameId));
  };

  const handleToggleGameStatus = (gameId: string) => {
    setGames(prev => prev.map(game => 
      game.id === gameId 
        ? { ...game, isActive: !game.isActive }
        : game
    ));
  };

  const openEditModal = (game: Game) => {
    setSelectedGame(game);
    setFormData({
      name: game.name,
      description: game.description,
      cost: game.cost,
      minReward: game.minReward,
      maxReward: game.maxReward,
      cooldownHours: game.cooldownHours,
      type: game.type,
      isActive: game.isActive
    });
    setIsEditModalOpen(true);
  };

  const activeGames = games.filter(game => game.isActive);
  const inactiveGames = games.filter(game => !game.isActive);

  const getGameTypeIcon = (type: string) => {
    const gameType = gameTypes.find(gt => gt.id === type);
    return gameType ? gameType.icon : Gamepad2;
  };

  const getGameTypeName = (type: string) => {
    const gameType = gameTypes.find(gt => gt.id === type);
    return gameType ? gameType.name : 'РќРµРёР·РІРµСЃС‚РЅР°СЏ РёРіСЂР°';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        {/* Р—Р°РіРѕР»РѕРІРѕРє */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-medium text-foreground">РЈРїСЂР°РІР»РµРЅРёРµ РёРіСЂР°РјРё</h1>
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
                {activeGames.length}
              </div>
              <div className="text-sm text-muted-foreground">
                РђРєС‚РёРІРЅС‹С…
              </div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-muted-foreground mb-1">
                {inactiveGames.length}
              </div>
              <div className="text-sm text-muted-foreground">
                РќРµР°РєС‚РёРІРЅС‹С…
              </div>
            </div>
          </div>
        </div>

        {/* Р”РµР№СЃС‚РІРёСЏ */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform apple-shadow"
          >
            <Plus className="w-4 h-4" />
            РЎРѕР·РґР°С‚СЊ РёРіСЂСѓ
          </button>
        </div>

        {/* РЎРїРёСЃРѕРє РёРіСЂ */}
        <div className="space-y-4">
          {games.length > 0 ? (
            games.map((game) => {
              const GameIcon = getGameTypeIcon(game.type);
              return (
                <div key={game.id} className="glass-card rounded-2xl p-4 apple-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center shrink-0">
                      <GameIcon className="w-6 h-6 text-foreground/70" />
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
                          <button
                            onClick={() => handleToggleGameStatus(game.id)}
                            className="p-2 hover:bg-black/5 rounded-lg transition-colors shrink-0"
                            title={game.isActive ? 'Р”РµР°РєС‚РёРІРёСЂРѕРІР°С‚СЊ' : 'РђРєС‚РёРІРёСЂРѕРІР°С‚СЊ'}
                          >
                            {game.isActive ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditModal(game)}
                            className="p-2 hover:bg-black/5 rounded-lg transition-colors shrink-0"
                            title="Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ"
                          >
                            <Edit className="w-4 h-4 text-foreground/70" />
                          </button>
                          <button
                            onClick={() => handleDeleteGame(game.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors shrink-0"
                            title="РЈРґР°Р»РёС‚СЊ"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">РРіСЂ: </span>
                          <span className="text-foreground">
                            {game.cost === 0 ? '0' : game.cost}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">РќР°РіСЂР°Рґ: </span>
                          <span className="text-foreground">
                            {game.maxReward === 0 ? '0' : game.maxReward}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 text-sm gap-2">
                        <div className="text-muted-foreground">
                          РћР±РЅРѕРІР»РµРЅРѕ: {new Date().toLocaleDateString()} вЂў РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:scale-[0.98] transition-transform">
                          <Eye className="w-4 h-4" />
                          РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ
                        </button>
                        <button 
                          onClick={() => openEditModal(game)}
                          className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-sm hover:scale-[0.98] transition-transform"
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
              );
            })
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

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЃРѕР·РґР°РЅРёСЏ РёРіСЂС‹ */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden">
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                РЎРѕР·РґР°С‚СЊ РёРіСЂСѓ
              </DialogTitle>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              Р¤РѕСЂРјР° СЃРѕР·РґР°РЅРёСЏ РЅРѕРІРѕР№ РјРёРЅРё-РёРіСЂС‹
            </DialogDescription>

            <div className="flex-1 overflow-y-auto space-y-4">
              {/* РўРёРї РёРіСЂС‹ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РўРёРї РёРіСЂС‹
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {gameTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, type: type.id as Game['type'] }))}
                        className={`p-3 rounded-xl text-left transition-all ${
                          formData.type === type.id
                            ? 'bg-primary text-primary-foreground'
                            : 'glass-card text-foreground hover:scale-[0.98]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-2" />
                        <div className="text-sm font-medium">{type.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* РќР°Р·РІР°РЅРёРµ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РќР°Р·РІР°РЅРёРµ РёРіСЂС‹
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ РёРіСЂС‹"
                />
              </div>

              {/* РћРїРёСЃР°РЅРёРµ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РћРїРёСЃР°РЅРёРµ
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="РћРїРёСЃР°РЅРёРµ РёРіСЂС‹"
                  rows={3}
                />
              </div>

              {/* РЎС‚РѕРёРјРѕСЃС‚СЊ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РЎС‚РѕРёРјРѕСЃС‚СЊ СѓС‡Р°СЃС‚РёСЏ (РјРѕРЅРµС‚)
                </label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* РќР°РіСЂР°РґС‹ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    РњРёРЅ. РЅР°РіСЂР°РґР°
                  </label>
                  <input
                    type="number"
                    value={formData.minReward}
                    onChange={(e) => setFormData(prev => ({ ...prev, minReward: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    РњР°РєСЃ. РЅР°РіСЂР°РґР°
                  </label>
                  <input
                    type="number"
                    value={formData.maxReward}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxReward: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                  />
                </div>
              </div>

              {/* РљСѓР»РґР°СѓРЅ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РљСѓР»РґР°СѓРЅ (С‡Р°СЃРѕРІ)
                </label>
                <input
                  type="number"
                  value={formData.cooldownHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, cooldownHours: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
                className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
              >
                РћС‚РјРµРЅРёС‚СЊ
              </button>
              <button
                onClick={handleCreateGame}
                disabled={!formData.name.trim()}
                className={`flex-1 rounded-2xl p-3 text-sm font-medium transition-transform ${
                  formData.name.trim()
                    ? 'bg-primary text-primary-foreground hover:scale-[0.98]'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                РЎРѕР·РґР°С‚СЊ
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РёРіСЂС‹ */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden">
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ РёРіСЂСѓ
              </DialogTitle>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedGame(null);
                  resetForm();
                }}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              Р¤РѕСЂРјР° СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ РјРёРЅРё-РёРіСЂС‹
            </DialogDescription>

            <div className="flex-1 overflow-y-auto space-y-4">
              {/* РўРёРї РёРіСЂС‹ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РўРёРї РёРіСЂС‹
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {gameTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, type: type.id as Game['type'] }))}
                        className={`p-3 rounded-xl text-left transition-all ${
                          formData.type === type.id
                            ? 'bg-primary text-primary-foreground'
                            : 'glass-card text-foreground hover:scale-[0.98]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-2" />
                        <div className="text-sm font-medium">{type.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* РќР°Р·РІР°РЅРёРµ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РќР°Р·РІР°РЅРёРµ РёРіСЂС‹
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ РёРіСЂС‹"
                />
              </div>

              {/* РћРїРёСЃР°РЅРёРµ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РћРїРёСЃР°РЅРёРµ
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="РћРїРёСЃР°РЅРёРµ РёРіСЂС‹"
                  rows={3}
                />
              </div>

              {/* РЎС‚РѕРёРјРѕСЃС‚СЊ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РЎС‚РѕРёРјРѕСЃС‚СЊ СѓС‡Р°СЃС‚РёСЏ (РјРѕРЅРµС‚)
                </label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* РќР°РіСЂР°РґС‹ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    РњРёРЅ. РЅР°РіСЂР°РґР°
                  </label>
                  <input
                    type="number"
                    value={formData.minReward}
                    onChange={(e) => setFormData(prev => ({ ...prev, minReward: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    РњР°РєСЃ. РЅР°РіСЂР°РґР°
                  </label>
                  <input
                    type="number"
                    value={formData.maxReward}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxReward: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                  />
                </div>
              </div>

              {/* РљСѓР»РґР°СѓРЅ */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РљСѓР»РґР°СѓРЅ (С‡Р°СЃРѕРІ)
                </label>
                <input
                  type="number"
                  value={formData.cooldownHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, cooldownHours: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 glass-card rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedGame(null);
                  resetForm();
                }}
                className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
              >
                РћС‚РјРµРЅРёС‚СЊ
              </button>
              <button
                onClick={handleEditGame}
                disabled={!formData.name.trim()}
                className={`flex-1 rounded-2xl p-3 text-sm font-medium transition-transform ${
                  formData.name.trim()
                    ? 'bg-primary text-primary-foreground hover:scale-[0.98]'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                РЎРѕС…СЂР°РЅРёС‚СЊ
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
