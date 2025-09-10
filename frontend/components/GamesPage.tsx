import { useState } from 'react';
import { Gamepad2, Clock, Star, CircleDot, Scissors, DollarSign, Play, Users } from './Icons';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Game } from '../types/games';

interface GamesPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  profilePhoto?: string | null;
}

// РњРѕРє-РґР°РЅРЅС‹Рµ РѕРїСѓР±Р»РёРєРѕРІР°РЅРЅС‹С… РёРіСЂ
const publishedGames: Game[] = [
  {
    id: '1',
    name: 'РљРѕР»РµСЃРѕ СѓРґР°С‡Рё',
    description: 'РљСЂСѓС‚РёС‚Рµ РєРѕР»РµСЃРѕ Рё РїРѕР»СѓС‡Р°Р№С‚Рµ СЃР»СѓС‡Р°Р№РЅС‹Рµ РЅР°РіСЂР°РґС‹ РєР°Р¶РґС‹Рµ 5 РјРёРЅСѓС‚',
    type: 'wheel',
    status: 'published',
    icon: 'рџЋ°',
    config: {
      sectors: [
        { label: '10 XP', weight: 40, rewardType: 'xp', rewardValue: 10 },
        { label: '50 РјРѕРЅРµС‚', weight: 30, rewardType: 'currency', rewardValue: 50 },
        { label: '100 РјРѕРЅРµС‚', weight: 20, rewardType: 'currency', rewardValue: 100 },
        { label: 'РџСѓСЃС‚Рѕ', weight: 10, rewardType: 'none', rewardValue: 0 }
      ],
      spinAnimationMs: 3000
    },
    rewards: [],
    access: {
      visibility: 'public',
      cooldownSeconds: 300
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    stats: {
      totalPlays: 1254,
      totalRewards: 45680,
      uniquePlayers: 387
    }
  },
  {
    id: '2',
    name: 'Р‘РёС‚РІР° РІС‹Р±РѕСЂР°',
    description: 'РљР»Р°СЃСЃРёС‡РµСЃРєР°СЏ РёРіСЂР° РєР°РјРµРЅСЊ-РЅРѕР¶РЅРёС†С‹-Р±СѓРјР°РіР° РїСЂРѕС‚РёРІ СѓРјРЅРѕРіРѕ Р±РѕС‚Р°',
    type: 'rps',
    status: 'published',
    icon: 'вњ‚пёЏ',
    config: {
      mode: 'pve',
      rounds: 1,
      winReward: { type: 'currency', value: 25 },
      drawReward: { type: 'currency', value: 5 }
    },
    rewards: [],
    access: {
      visibility: 'public',
      cooldownSeconds: 180
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    publishedAt: '2024-01-02T00:00:00Z',
    stats: {
      totalPlays: 892,
      totalRewards: 15430,
      uniquePlayers: 234
    }
  },
  {
    id: '3',
    name: 'Р—РѕР»РѕС‚С‹Рµ СЃР»РѕС‚С‹',
    description: 'РђРІС‚РѕРјР°С‚ СЃ С‚СЂРµРјСЏ Р±Р°СЂР°Р±Р°РЅР°РјРё Рё С€Р°РЅСЃРѕРј РЅР° РґР¶РµРєРїРѕС‚',
    type: 'slots',
    status: 'published',
    icon: 'рџЋ°',
    config: {
      reels: 3,
      symbols: [
        { id: 'cherry', label: 'Р’РёС€РЅСЏ', icon: 'рџЌ’', rarity: 1 },
        { id: 'lemon', label: 'Р›РёРјРѕРЅ', icon: 'рџЌ‹', rarity: 1 },
        { id: 'grape', label: 'Р’РёРЅРѕРіСЂР°Рґ', icon: 'рџЌ‡', rarity: 2 },
        { id: 'bell', label: 'РљРѕР»РѕРєРѕР»', icon: 'рџ””', rarity: 3 },
        { id: 'star', label: 'Р—РІРµР·РґР°', icon: 'в­ђ', rarity: 5 }
      ],
      combinations: [
        { pattern: ['cherry', 'cherry', 'cherry'], multiplier: 10, description: 'РўСЂРё РІРёС€РЅРё' },
        { pattern: ['star', 'star', 'star'], multiplier: 100, description: 'РўСЂРё Р·РІРµР·РґС‹' }
      ],
      spinDurationMs: 2000
    },
    rewards: [],
    access: {
      visibility: 'public',
      cooldownSeconds: 600
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    publishedAt: '2024-01-03T00:00:00Z',
    stats: {
      totalPlays: 1567,
      totalRewards: 78900,
      uniquePlayers: 456
    }
  }
];

export function GamesPage({ onNavigate, currentPage, onOpenSettings, profilePhoto }: GamesPageProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [userCooldowns, setUserCooldowns] = useState<Record<string, number>>({});

  const gameTypeIcons = {
    wheel: CircleDot,
    rps: Scissors,
    slots: DollarSign
  };

  const gameTypeNames = {
    wheel: 'РљРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹',
    rps: 'РљР°РјРµРЅСЊ-РЅРѕР¶РЅРёС†С‹-Р±СѓРјР°РіР°',
    slots: 'РЎР»РѕС‚С‹'
  };

  const formatCooldown = (seconds: number) => {
    if (seconds < 60) return `${seconds}СЃ`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}Рј`;
    return `${Math.floor(seconds / 3600)}С‡`;
  };

  const formatStats = (num: number) => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}k`;
    return `${(num / 1000000).toFixed(1)}M`;
  };

  const canPlayGame = (gameId: string) => {
    const cooldownEndTime = userCooldowns[gameId];
    if (!cooldownEndTime) return true;
    return Date.now() > cooldownEndTime;
  };

  const getRemainingCooldown = (gameId: string) => {
    const cooldownEndTime = userCooldowns[gameId];
    if (!cooldownEndTime) return 0;
    return Math.max(0, Math.ceil((cooldownEndTime - Date.now()) / 1000));
  };

  const playGame = (game: Game) => {
    // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РєСѓР»РґР°СѓРЅ
    const cooldownEndTime = Date.now() + (game.access.cooldownSeconds * 1000);
    setUserCooldowns(prev => ({
      ...prev,
      [game.id]: cooldownEndTime
    }));

    // Р—РґРµСЃСЊ Р±СѓРґРµС‚ Р»РѕРіРёРєР° Р·Р°РїСѓСЃРєР° РёРіСЂС‹
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const renderGameInterface = (game: Game) => {
    switch (game.type) {
      case 'wheel':
        return (
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">рџЋ°</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform mb-4">
              РљСЂСѓС‚РёС‚СЊ РєРѕР»РµСЃРѕ
            </button>
            <div className="text-sm text-muted-foreground">
              РќР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ, С‡С‚РѕР±С‹ Р·Р°РїСѓСЃС‚РёС‚СЊ РєРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹
            </div>
          </div>
        );
      
      case 'rps':
        return (
          <div className="text-center py-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['рџ—ї', 'рџ“„', 'вњ‚пёЏ'].map((emoji, index) => (
                <button
                  key={index}
                  className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-2xl hover:scale-[0.95] transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Р’С‹Р±РµСЂРёС‚Рµ РєР°РјРµРЅСЊ, Р±СѓРјР°РіСѓ РёР»Рё РЅРѕР¶РЅРёС†С‹
            </div>
          </div>
        );
      
      case 'slots':
        return (
          <div className="text-center py-8">
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-16 h-20 bg-secondary rounded-xl flex items-center justify-center text-2xl">
                  рџЌ’
                </div>
              ))}
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform mb-4">
              РљСЂСѓС‚РёС‚СЊ Р±Р°СЂР°Р±Р°РЅС‹
            </button>
            <div className="text-sm text-muted-foreground">
              РќР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ, С‡С‚РѕР±С‹ Р·Р°РїСѓСЃС‚РёС‚СЊ СЃР»РѕС‚С‹
            </div>
          </div>
        );
      
      default:
        return <div>РРіСЂР° РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚СЃСЏ</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="РРіСЂС‹" 
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
      />
      
      <div className="pt-20 pb-20 p-6">
        {/* Р—Р°РіРѕР»РѕРІРѕРє СЃРµРєС†РёРё */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-foreground mb-2">РњРёРЅРё-РёРіСЂС‹</h2>
          <p className="text-sm text-muted-foreground">
            РРіСЂР°Р№С‚Рµ Рё РїРѕР»СѓС‡Р°Р№С‚Рµ РЅР°РіСЂР°РґС‹ РєР°Р¶РґС‹Р№ РґРµРЅСЊ
          </p>
        </div>

        {/* РЎРїРёСЃРѕРє РёРіСЂ */}
        <div className="space-y-4">
          {publishedGames.map((game) => {
            const GameIcon = gameTypeIcons[game.type] || Gamepad2;
            const canPlay = canPlayGame(game.id);
            const remainingCooldown = getRemainingCooldown(game.id);
            
            return (
              <div key={game.id} className="glass-card rounded-2xl p-4 apple-shadow">
                <div className="flex items-start gap-4">
                  {/* РРєРѕРЅРєР° РёРіСЂС‹ */}
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                    {game.icon ? (
                      <span className="text-2xl">{game.icon}</span>
                    ) : (
                      <GameIcon className="w-6 h-6 text-foreground/70" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {/* Р—Р°РіРѕР»РѕРІРѕРє */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-foreground">{game.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {gameTypeNames[game.type]}
                        </div>
                      </div>
                      {!canPlay && (
                        <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                          <Clock className="w-3 h-3" />
                          {formatCooldown(remainingCooldown)}
                        </div>
                      )}
                    </div>
                    
                    {/* РћРїРёСЃР°РЅРёРµ */}
                    <div className="text-sm text-muted-foreground mb-3">
                      {game.description}
                    </div>
                    
                    {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
                    <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                      <div className="text-center">
                        <div className="text-foreground font-medium">{formatStats(game.stats?.totalPlays || 0)}</div>
                        <div className="text-muted-foreground">РРіСЂ</div>
                      </div>
                      <div className="text-center">
                        <div className="text-foreground font-medium">{formatStats(game.stats?.totalRewards || 0)}</div>
                        <div className="text-muted-foreground">РќР°РіСЂР°Рґ</div>
                      </div>
                      <div className="text-center">
                        <div className="text-foreground font-medium">{formatStats(game.stats?.uniquePlayers || 0)}</div>
                        <div className="text-muted-foreground">РРіСЂРѕРєРѕРІ</div>
                      </div>
                    </div>
                    
                    {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ РєСѓР»РґР°СѓРЅРµ */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        РљСѓР»РґР°СѓРЅ: {formatCooldown(game.access.cooldownSeconds)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        РџСѓР±Р»РёС‡РЅР°СЏ РёРіСЂР°
                      </div>
                    </div>
                    
                    {/* РљРЅРѕРїРєР° РёРіСЂС‹ */}
                    <button
                      onClick={() => playGame(game)}
                      disabled={!canPlay}
                      className={`w-full py-3 rounded-xl transition-transform ${
                        canPlay
                          ? 'bg-primary text-primary-foreground hover:scale-[0.98]'
                          : 'bg-secondary text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" />
                        {canPlay ? 'РРіСЂР°С‚СЊ' : `Р–РґРёС‚Рµ ${formatCooldown(remainingCooldown)}`}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* РџСѓСЃС‚РѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ */}
        {publishedGames.length === 0 && (
          <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
            <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">РРіСЂС‹ СЃРєРѕСЂРѕ РїРѕСЏРІСЏС‚СЃСЏ</h3>
            <p className="text-sm text-muted-foreground">
              РђРґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂС‹ СЂР°Р±РѕС‚Р°СЋС‚ РЅР°Рґ РґРѕР±Р°РІР»РµРЅРёРµРј РЅРѕРІС‹С… РјРёРЅРё-РёРіСЂ
            </p>
          </div>
        )}
      </div>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РёРіСЂС‹ */}
      <Dialog open={isGameModalOpen} onOpenChange={setIsGameModalOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 [&>button]:hidden">
          <div className="p-6">
            {selectedGame && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <DialogTitle className="text-lg font-medium text-foreground">
                      {selectedGame.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      {gameTypeNames[selectedGame.type]}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGameModalOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                  >
                    вњ•
                  </button>
                </div>
                
                <DialogDescription className="sr-only">
                  РРЅС‚РµСЂС„РµР№СЃ РјРёРЅРё-РёРіСЂС‹ {selectedGame.name}
                </DialogDescription>

                {/* РРЅС‚РµСЂС„РµР№СЃ РёРіСЂС‹ */}
                {renderGameInterface(selectedGame)}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}
