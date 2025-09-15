п»їimport { useState } from 'react';
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

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р С•Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р Р…РЎвЂ№РЎвЂ¦ Р С‘Р С–РЎР‚
const publishedGames: Game[] = [
  {
    id: '1',
    name: 'Р С™Р С•Р В»Р ВµРЎРѓР С• РЎС“Р Т‘Р В°РЎвЂЎР С‘',
    description: 'Р С™РЎР‚РЎС“РЎвЂљР С‘РЎвЂљР Вµ Р С”Р С•Р В»Р ВµРЎРѓР С• Р С‘ Р С—Р С•Р В»РЎС“РЎвЂЎР В°Р в„–РЎвЂљР Вµ РЎРѓР В»РЎС“РЎвЂЎР В°Р в„–Р Р…РЎвЂ№Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р С”Р В°Р В¶Р Т‘РЎвЂ№Р Вµ 5 Р СР С‘Р Р…РЎС“РЎвЂљ',
    type: 'wheel',
    status: 'published',
    icon: 'СЂСџР‹В°',
    config: {
      sectors: [
        { label: '10 XP', weight: 40, rewardType: 'xp', rewardValue: 10 },
        { label: '50 Р СР С•Р Р…Р ВµРЎвЂљ', weight: 30, rewardType: 'currency', rewardValue: 50 },
        { label: '100 Р СР С•Р Р…Р ВµРЎвЂљ', weight: 20, rewardType: 'currency', rewardValue: 100 },
        { label: 'Р СџРЎС“РЎРѓРЎвЂљР С•', weight: 10, rewardType: 'none', rewardValue: 0 }
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
    name: 'Р вЂР С‘РЎвЂљР Р†Р В° Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В°',
    description: 'Р С™Р В»Р В°РЎРѓРЎРѓР С‘РЎвЂЎР ВµРЎРѓР С”Р В°РЎРЏ Р С‘Р С–РЎР‚Р В° Р С”Р В°Р СР ВµР Р…РЎРЉ-Р Р…Р С•Р В¶Р Р…Р С‘РЎвЂ РЎвЂ№-Р В±РЎС“Р СР В°Р С–Р В° Р С—РЎР‚Р С•РЎвЂљР С‘Р Р† РЎС“Р СР Р…Р С•Р С–Р С• Р В±Р С•РЎвЂљР В°',
    type: 'rps',
    status: 'published',
    icon: 'РІСљвЂљРїС‘РЏ',
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
    name: 'Р вЂ”Р С•Р В»Р С•РЎвЂљРЎвЂ№Р Вµ РЎРѓР В»Р С•РЎвЂљРЎвЂ№',
    description: 'Р С’Р Р†РЎвЂљР С•Р СР В°РЎвЂљ РЎРѓ РЎвЂљРЎР‚Р ВµР СРЎРЏ Р В±Р В°РЎР‚Р В°Р В±Р В°Р Р…Р В°Р СР С‘ Р С‘ РЎв‚¬Р В°Р Р…РЎРѓР С•Р С Р Р…Р В° Р Т‘Р В¶Р ВµР С”Р С—Р С•РЎвЂљ',
    type: 'slots',
    status: 'published',
    icon: 'СЂСџР‹В°',
    config: {
      reels: 3,
      symbols: [
        { id: 'cherry', label: 'Р вЂ™Р С‘РЎв‚¬Р Р…РЎРЏ', icon: 'СЂСџРЊвЂ™', rarity: 1 },
        { id: 'lemon', label: 'Р вЂєР С‘Р СР С•Р Р…', icon: 'СЂСџРЊвЂ№', rarity: 1 },
        { id: 'grape', label: 'Р вЂ™Р С‘Р Р…Р С•Р С–РЎР‚Р В°Р Т‘', icon: 'СЂСџРЊвЂЎ', rarity: 2 },
        { id: 'bell', label: 'Р С™Р С•Р В»Р С•Р С”Р С•Р В»', icon: 'СЂСџвЂќвЂќ', rarity: 3 },
        { id: 'star', label: 'Р вЂ”Р Р†Р ВµР В·Р Т‘Р В°', icon: 'РІВ­С’', rarity: 5 }
      ],
      combinations: [
        { pattern: ['cherry', 'cherry', 'cherry'], multiplier: 10, description: 'Р СћРЎР‚Р С‘ Р Р†Р С‘РЎв‚¬Р Р…Р С‘' },
        { pattern: ['star', 'star', 'star'], multiplier: 100, description: 'Р СћРЎР‚Р С‘ Р В·Р Р†Р ВµР В·Р Т‘РЎвЂ№' }
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
    wheel: 'Р С™Р С•Р В»Р ВµРЎРѓР С• РЎвЂћР С•РЎР‚РЎвЂљРЎС“Р Р…РЎвЂ№',
    rps: 'Р С™Р В°Р СР ВµР Р…РЎРЉ-Р Р…Р С•Р В¶Р Р…Р С‘РЎвЂ РЎвЂ№-Р В±РЎС“Р СР В°Р С–Р В°',
    slots: 'Р РЋР В»Р С•РЎвЂљРЎвЂ№'
  };

  const formatCooldown = (seconds: number) => {
    if (seconds < 60) return `${seconds}РЎРѓ`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}Р С`;
    return `${Math.floor(seconds / 3600)}РЎвЂЎ`;
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
    // Р Р€РЎРѓРЎвЂљР В°Р Р…Р В°Р Р†Р В»Р С‘Р Р†Р В°Р ВµР С Р С”РЎС“Р В»Р Т‘Р В°РЎС“Р Р…
    const cooldownEndTime = Date.now() + (game.access.cooldownSeconds * 1000);
    setUserCooldowns(prev => ({
      ...prev,
      [game.id]: cooldownEndTime
    }));

    // Р вЂ”Р Т‘Р ВµРЎРѓРЎРЉ Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р В»Р С•Р С–Р С‘Р С”Р В° Р В·Р В°Р С—РЎС“РЎРѓР С”Р В° Р С‘Р С–РЎР‚РЎвЂ№
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const renderGameInterface = (game: Game) => {
    switch (game.type) {
      case 'wheel':
        return (
          <div className="text-center py-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">СЂСџР‹В°</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform mb-4">
              Р С™РЎР‚РЎС“РЎвЂљР С‘РЎвЂљРЎРЉ Р С”Р С•Р В»Р ВµРЎРѓР С•
            </button>
            <div className="text-sm text-muted-foreground">
              Р СњР В°Р В¶Р СР С‘РЎвЂљР Вµ Р С”Р Р…Р С•Р С—Р С”РЎС“, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р В·Р В°Р С—РЎС“РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ Р С”Р С•Р В»Р ВµРЎРѓР С• РЎвЂћР С•РЎР‚РЎвЂљРЎС“Р Р…РЎвЂ№
            </div>
          </div>
        );
      
      case 'rps':
        return (
          <div className="text-center py-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['СЂСџвЂ”С—', 'СЂСџвЂњвЂћ', 'РІСљвЂљРїС‘РЏ'].map((emoji, index) => (
                <button
                  key={index}
                  className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-2xl hover:scale-[0.95] transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Р вЂ™РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ Р С”Р В°Р СР ВµР Р…РЎРЉ, Р В±РЎС“Р СР В°Р С–РЎС“ Р С‘Р В»Р С‘ Р Р…Р С•Р В¶Р Р…Р С‘РЎвЂ РЎвЂ№
            </div>
          </div>
        );
      
      case 'slots':
        return (
          <div className="text-center py-8">
            <div className="flex justify-center gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-16 h-20 bg-secondary rounded-xl flex items-center justify-center text-2xl">
                  СЂСџРЊвЂ™
                </div>
              ))}
            </div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform mb-4">
              Р С™РЎР‚РЎС“РЎвЂљР С‘РЎвЂљРЎРЉ Р В±Р В°РЎР‚Р В°Р В±Р В°Р Р…РЎвЂ№
            </button>
            <div className="text-sm text-muted-foreground">
              Р СњР В°Р В¶Р СР С‘РЎвЂљР Вµ Р С”Р Р…Р С•Р С—Р С”РЎС“, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р В·Р В°Р С—РЎС“РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ РЎРѓР В»Р С•РЎвЂљРЎвЂ№
            </div>
          </div>
        );
      
      default:
        return <div>Р ВР С–РЎР‚Р В° Р Р…Р Вµ Р С—Р С•Р Т‘Р Т‘Р ВµРЎР‚Р В¶Р С‘Р Р†Р В°Р ВµРЎвЂљРЎРѓРЎРЏ</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Р ВР С–РЎР‚РЎвЂ№" 
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
      />
      
      <div className="pt-20 pb-20 p-6">
        {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓР ВµР С”РЎвЂ Р С‘Р С‘ */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-foreground mb-2">Р СљР С‘Р Р…Р С‘-Р С‘Р С–РЎР‚РЎвЂ№</h2>
          <p className="text-sm text-muted-foreground">
            Р ВР С–РЎР‚Р В°Р в„–РЎвЂљР Вµ Р С‘ Р С—Р С•Р В»РЎС“РЎвЂЎР В°Р в„–РЎвЂљР Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р С”Р В°Р В¶Р Т‘РЎвЂ№Р в„– Р Т‘Р ВµР Р…РЎРЉ
          </p>
        </div>

        {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р С‘Р С–РЎР‚ */}
        <div className="space-y-4">
          {publishedGames.map((game) => {
            const GameIcon = gameTypeIcons[game.type] || Gamepad2;
            const canPlay = canPlayGame(game.id);
            const remainingCooldown = getRemainingCooldown(game.id);
            
            return (
              <div key={game.id} className="glass-card rounded-2xl p-4 apple-shadow">
                <div className="flex items-start gap-4">
                  {/* Р ВР С”Р С•Р Р…Р С”Р В° Р С‘Р С–РЎР‚РЎвЂ№ */}
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                    {game.icon ? (
                      <span className="text-2xl">{game.icon}</span>
                    ) : (
                      <GameIcon className="w-6 h-6 text-foreground/70" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
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
                    
                    {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
                    <div className="text-sm text-muted-foreground mb-3">
                      {game.description}
                    </div>
                    
                    {/* Р РЋРЎвЂљР В°РЎвЂљР С‘РЎРѓРЎвЂљР С‘Р С”Р В° */}
                    <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                      <div className="text-center">
                        <div className="text-foreground font-medium">{formatStats(game.stats?.totalPlays || 0)}</div>
                        <div className="text-muted-foreground">Р ВР С–РЎР‚</div>
                      </div>
                      <div className="text-center">
                        <div className="text-foreground font-medium">{formatStats(game.stats?.totalRewards || 0)}</div>
                        <div className="text-muted-foreground">Р СњР В°Р С–РЎР‚Р В°Р Т‘</div>
                      </div>
                      <div className="text-center">
                        <div className="text-foreground font-medium">{formatStats(game.stats?.uniquePlayers || 0)}</div>
                        <div className="text-muted-foreground">Р ВР С–РЎР‚Р С•Р С”Р С•Р Р†</div>
                      </div>
                    </div>
                    
                    {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р С”РЎС“Р В»Р Т‘Р В°РЎС“Р Р…Р Вµ */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Р С™РЎС“Р В»Р Т‘Р В°РЎС“Р Р…: {formatCooldown(game.access.cooldownSeconds)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Р СџРЎС“Р В±Р В»Р С‘РЎвЂЎР Р…Р В°РЎРЏ Р С‘Р С–РЎР‚Р В°
                      </div>
                    </div>
                    
                    {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р С‘Р С–РЎР‚РЎвЂ№ */}
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
                        {canPlay ? 'Р ВР С–РЎР‚Р В°РЎвЂљРЎРЉ' : `Р вЂ“Р Т‘Р С‘РЎвЂљР Вµ ${formatCooldown(remainingCooldown)}`}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Р СџРЎС“РЎРѓРЎвЂљР С•Р Вµ РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ */}
        {publishedGames.length === 0 && (
          <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
            <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Р ВР С–РЎР‚РЎвЂ№ РЎРѓР С”Р С•РЎР‚Р С• Р С—Р С•РЎРЏР Р†РЎРЏРЎвЂљРЎРѓРЎРЏ</h3>
            <p className="text-sm text-muted-foreground">
              Р С’Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚РЎвЂ№ РЎР‚Р В°Р В±Р С•РЎвЂљР В°РЎР‹РЎвЂљ Р Р…Р В°Р Т‘ Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…Р С‘Р ВµР С Р Р…Р С•Р Р†РЎвЂ№РЎвЂ¦ Р СР С‘Р Р…Р С‘-Р С‘Р С–РЎР‚
            </p>
          </div>
        )}
      </div>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С‘Р С–РЎР‚РЎвЂ№ */}
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
                    РІСљвЂў
                  </button>
                </div>
                
                <DialogDescription className="sr-only">
                  Р ВР Р…РЎвЂљР ВµРЎР‚РЎвЂћР ВµР в„–РЎРѓ Р СР С‘Р Р…Р С‘-Р С‘Р С–РЎР‚РЎвЂ№ {selectedGame.name}
                </DialogDescription>

                {/* Р ВР Р…РЎвЂљР ВµРЎР‚РЎвЂћР ВµР в„–РЎРѓ Р С‘Р С–РЎР‚РЎвЂ№ */}
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
