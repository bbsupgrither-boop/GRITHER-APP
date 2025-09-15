п»їimport { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Play, Pause, Archive, Copy, Check, ChevronLeft, ChevronRight, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Gamepad2, Box, CircleDot, Scissors, DollarSign, X, Settings } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Game, GameType, GameStatus, GameWizardState, WheelSector, RPSConfig, SlotsConfig, SlotSymbol, SlotCombination, GameReward, RewardType } from '../types/games';

interface AdminGamesPageNewProps {
  onBack: () => void;
  onNavigateToSection: (section: string) => void;
}

export function AdminGamesPageNew({ onBack, onNavigateToSection }: AdminGamesPageNewProps) {
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // Р РЋР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘Р Вµ Р СР В°РЎРѓРЎвЂљР ВµРЎР‚Р В° РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р С‘Р С–РЎР‚РЎвЂ№
  const [wizardState, setWizardState] = useState<GameWizardState>({
    currentStep: 0,
    steps: [
      { id: 'type', title: 'Р СћР С‘Р С— Р С‘Р С–РЎР‚РЎвЂ№', description: 'Р вЂ™РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ РЎвЂљР С‘Р С— Р СР С‘Р Р…Р С‘-Р С‘Р С–РЎР‚РЎвЂ№', isComplete: false },
      { id: 'basic', title: 'Р С›РЎРѓР Р…Р С•Р Р†Р Р…Р С•Р Вµ', description: 'Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ, Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ, Р С‘Р С”Р С•Р Р…Р С”Р В°', isComplete: false },
      { id: 'config', title: 'Р СџР В°РЎР‚Р В°Р СР ВµРЎвЂљРЎР‚РЎвЂ№', description: 'Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р С‘Р С–РЎР‚РЎвЂ№', isComplete: false },
      { id: 'rewards', title: 'Р СњР В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№', description: 'Р РЋР С‘РЎРѓРЎвЂљР ВµР СР В° Р Р…Р В°Р С–РЎР‚Р В°Р Т‘', isComplete: false },
      { id: 'access', title: 'Р вЂќР С•РЎРѓРЎвЂљРЎС“Р С—', description: 'Р вЂ™Р С‘Р Т‘Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ Р С‘ Р С”РЎС“Р В»Р Т‘Р В°РЎС“Р Р…', isComplete: false },
      { id: 'preview', title: 'Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚', description: 'Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р В° Р С‘РїС—Р…РїС—Р…РЎР‚РЎвЂ№', isComplete: false },
      { id: 'publish', title: 'Р СџРЎС“Р В±Р В»Р С‘Р С”Р В°РЎвЂ Р С‘РЎРЏ', description: 'Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№', isComplete: false }
    ],
    gameData: {
      type: undefined,
      status: 'draft',
      access: {
        visibility: 'public',
        cooldownSeconds: 300
      },
      rewards: []
    }
  });

  const gameTypes = [
    { 
      id: 'wheel' as GameType, 
      name: 'Р С™Р С•Р В»Р ВµРЎРѓР С• РЎвЂћР С•РЎР‚РЎвЂљРЎС“Р Р…РЎвЂ№', 
      icon: CircleDot,
      description: 'Р С™РЎР‚РЎС“РЎвЂљР С‘РЎвЂљР Вµ Р С”Р С•Р В»Р ВµРЎРѓР С• Р С‘ Р С—Р С•Р В»РЎС“РЎвЂЎР В°Р в„–РЎвЂљР Вµ РЎРѓР В»РЎС“РЎвЂЎР В°Р в„–Р Р…РЎвЂ№Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№'
    },
    { 
      id: 'rps' as GameType, 
      name: 'Р С™Р В°Р СР ВµР Р…РЎРЉ, Р Р…Р С•Р В¶Р Р…Р С‘РЎвЂ РЎвЂ№, Р В±РЎС“Р СР В°Р С–Р В°', 
      icon: Scissors,
      description: 'Р С™Р В»Р В°РЎРѓРЎРѓР С‘РЎвЂЎР ВµРЎРѓР С”Р В°РЎРЏ РїС—Р…РїС—Р…Р С–РЎР‚Р В° Р С—РЎР‚Р С•РЎвЂљР С‘Р Р† Р В±Р С•РЎвЂљР В° Р С‘Р В»Р С‘ Р Т‘РЎР‚РЎС“Р С–Р С‘РЎвЂ¦ Р С‘Р С–РЎР‚Р С•Р С”Р С•Р Р†'
    },
    { 
      id: 'slots' as GameType, 
      name: 'Р РЋР В»Р С•РЎвЂљРЎвЂ№', 
      icon: DollarSign,
      description: 'Р С’Р Р†РЎвЂљР С•Р СР В°РЎвЂљ РЎРѓ Р В±Р В°РЎР‚Р В°Р В±Р В°Р Р…Р В°Р СР С‘ Р С‘ Р С”Р С•Р СР В±Р С‘Р Р…Р В°РЎвЂ Р С‘РЎРЏР СР С‘ РЎРѓР С‘Р СР Р†Р С•Р В»Р С•Р Р†'
    }
  ];

  const rewardTypes = [
    { id: 'xp' as RewardType, name: 'Р С›Р С—РЎвЂ№РЎвЂљ (XP)', icon: 'РІВ­С’' },
    { id: 'currency' as RewardType, name: 'Р вЂ™Р В°Р В»РЎР‹РЎвЂљР В°', icon: 'СЂСџвЂ™В°' },
    { id: 'loot' as RewardType, name: 'Р СџРЎР‚Р ВµР Т‘Р СР ВµРЎвЂљ', icon: 'СЂСџР‹Рѓ' },
    { id: 'none' as RewardType, name: 'Р вЂР ВµР В· Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№', icon: 'РІСњРЉ' }
  ];

  const resetWizard = () => {
    setWizardState({
      currentStep: 0,
      steps: wizardState.steps.map(s => ({ ...s, isComplete: false })),
      gameData: {
        type: undefined,
        status: 'draft',
        access: {
          visibility: 'public',
          cooldownSeconds: 300
        },
        rewards: []
      }
    });
  };

  const updateWizardData = (data: Partial<Game>) => {
    setWizardState(prev => ({
      ...prev,
      gameData: { ...prev.gameData, ...data }
    }));
  };

  const completeStep = (stepIndex: number) => {
    setWizardState(prev => ({
      ...prev,
      steps: prev.steps.map((step, index) => 
        index === stepIndex ? { ...step, isComplete: true } : step
      )
    }));
  };

  const nextStep = () => {
    if (wizardState.currentStep < wizardState.steps.length - 1) {
      completeStep(wizardState.currentStep);
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const prevStep = () => {
    if (wizardState.currentStep > 0) {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  const handleGameStatusChange = (gameId: string, newStatus: GameStatus) => {
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

  const copyGameJson = (game: Game) => {
    const json = JSON.stringify(game, null, 2);
    navigator.clipboard.writeText(json);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const createGame = () => {
    if (!wizardState.gameData.name || !wizardState.gameData.type) return;

    const newGame: Game = {
      id: Date.now().toString(),
      name: wizardState.gameData.name,
      description: wizardState.gameData.description || '',
      type: wizardState.gameData.type,
      status: wizardState.gameData.status || 'draft',
      icon: wizardState.gameData.icon,
      config: wizardState.gameData.config || getDefaultConfig(wizardState.gameData.type),
      rewards: wizardState.gameData.rewards || [],
      access: wizardState.gameData.access || { visibility: 'public', cooldownSeconds: 300 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: wizardState.gameData.status === 'published' ? new Date().toISOString() : undefined,
      stats: {
        totalPlays: 0,
        totalRewards: 0,
        uniquePlayers: 0
      }
    };

    setGames(prev => [...prev, newGame]);
    setIsWizardOpen(false);
    resetWizard();
  };

  const getDefaultConfig = (type: GameType) => {
    switch (type) {
      case 'wheel':
        return {
          sectors: [
            { label: '10 XP', weight: 40, rewardType: 'xp' as RewardType, rewardValue: 10 },
            { label: '50 Р СР С•Р Р…Р ВµРЎвЂљ', weight: 30, rewardType: 'currency' as RewardType, rewardValue: 50 },
            { label: '100 Р СР С•Р Р…Р ВµРЎвЂљ', weight: 20, rewardType: 'currency' as RewardType, rewardValue: 100 },
            { label: 'Р СџРЎС“РЎРѓРЎвЂљР С•', weight: 10, rewardType: 'none' as RewardType, rewardValue: 0 }
          ],
          spinAnimationMs: 3000
        };
      case 'rps':
        return {
          mode: 'pve' as const,
          rounds: 1,
          winReward: { type: 'currency' as RewardType, value: 50 },
          drawReward: { type: 'currency' as RewardType, value: 10 }
        };
      case 'slots':
        return {
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
        };
      default:
        return {};
    }
  };

  const renderWizardStep = () => {
    const currentStepData = wizardState.steps[wizardState.currentStep];
    
    switch (currentStepData.id) {
      case 'type':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Р вЂ™РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ РЎвЂљР С‘Р С— Р С‘Р С–РЎР‚РЎвЂ№</h3>
              <p className="text-sm text-muted-foreground">Р С™Р В°Р В¶Р Т‘РЎвЂ№Р в„– РЎвЂљР С‘Р С— Р С‘Р СР ВµР ВµРЎвЂљ РЎРѓР Р†Р С•Р С‘ Р С•РЎРѓР С•Р В±Р ВµР Р…Р Р…Р С•РЎРѓРЎвЂљР С‘ Р С‘ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘</p>
            </div>
            <div className="grid gap-4">
              {gameTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = wizardState.gameData.type === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateWizardData({ type: type.id })}
                    className={`p-4 rounded-2xl text-left transition-all ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'glass-card hover:scale-[0.98]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-secondary'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{type.name}</div>
                        <div className={`text-sm ${isSelected ? 'opacity-90' : 'text-muted-foreground'}`}>
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'basic':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-foreground mb-2">Р С›РЎРѓР Р…Р С•Р Р†Р Р…Р В°РЎРЏ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ</h3>
              <p className="text-sm text-muted-foreground">Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С‘ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№ *
                </label>
                <Input
                  value={wizardState.gameData.name || ''}
                  onChange={(e) => updateWizardData({ name: e.target.value })}
                  placeholder="Р вЂ™Р Р†Р ВµР Т‘Р С‘РЎвЂљР Вµ Р Р…Р В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№"
                  className="glass-card"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ
                </label>
                <Textarea
                  value={wizardState.gameData.description || ''}
                  onChange={(e) => updateWizardData({ description: e.target.value })}
                  placeholder="Р С™РЎР‚Р В°РЎвЂљР С”Р С•Р Вµ Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№"
                  className="glass-card resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Р ВР С”Р С•Р Р…Р С”Р В° (emoji)
                </label>
                <Input
                  value={wizardState.gameData.icon || ''}
                  onChange={(e) => updateWizardData({ icon: e.target.value })}
                  placeholder="СЂСџР‹В®"
                  className="glass-card"
                  maxLength={2}
                />
              </div>
            </div>
          </div>
        );

      case 'config':
        return renderGameConfigStep();

      case 'rewards':
        return renderRewardsStep();

      case 'access':
        return renderAccessStep();

      case 'preview':
        return renderPreviewStep();

      case 'publish':
        return renderPublishStep();

      default:
        return (
          <div className="text-center py-8">
            <div className="text-muted-foreground">
              Р РЃР В°Р С– "{currentStepData.title}" Р Р† РЎР‚Р В°Р В·РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р Вµ
            </div>
          </div>
        );
    }
  };

  const canProceedToNext = () => {
    const currentStepData = wizardState.steps[wizardState.currentStep];
    
    switch (currentStepData.id) {
      case 'type':
        return !!wizardState.gameData.type;
      case 'basic':
        return !!wizardState.gameData.name?.trim();
      case 'config':
        return !!wizardState.gameData.config;
      case 'rewards':
        return true; // Р СњР В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р Р…Р Вµ Р С•Р В±РЎРЏР В·Р В°РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№
      case 'access':
        return !!wizardState.gameData.access?.cooldownSeconds;
      case 'preview':
        return true;
      case 'publish':
        return !!wizardState.gameData.status;
      default:
        return true;
    }
  };

  const getStatusColor = (status: GameStatus) => {
    switch (status) {
      case 'published': return 'text-green-600';
      case 'draft': return 'text-orange-500';
      case 'archived': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getStatusLabel = (status: GameStatus) => {
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

  const renderGameConfigStep = () => {
    const gameType = wizardState.gameData.type;
    
    if (!gameType) return <div>Р РЋР Р…Р В°РЎвЂЎР В°Р В»Р В° Р Р†РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ РЎвЂљР С‘Р С— Р С‘Р С–РЎР‚РЎвЂ№</div>;

    switch (gameType) {
      case 'wheel':
        return renderWheelConfig();
      case 'rps':
        return renderRPSConfig();
      case 'slots':
        return renderSlotsConfig();
      default:
        return <div>Р СњР ВµР С‘Р В·Р Р†Р ВµРЎРѓРЎвЂљР Р…РЎвЂ№Р в„– РЎвЂљР С‘Р С— Р С‘Р С–РЎР‚РЎвЂ№</div>;
    }
  };

  const renderWheelConfig = () => {
    const config = wizardState.gameData.config as WheelConfig || { sectors: [], spinAnimationMs: 3000 };
    
    const updateWheelConfig = (newConfig: Partial<WheelConfig>) => {
      updateWizardData({ config: { ...config, ...newConfig } });
    };
    
    const addSector = () => {
      const newSector: WheelSector = {
        label: 'Р СњР С•Р Р†РЎвЂ№Р в„– РЎРѓР ВµР С”РЎвЂљР С•РЎР‚',
        weight: 10,
        rewardType: 'none',
        rewardValue: 0
      };
      updateWheelConfig({ sectors: [...config.sectors, newSector] });
    };
    
    const updateSector = (index: number, sector: Partial<WheelSector>) => {
      const newSectors = [...config.sectors];
      newSectors[index] = { ...newSectors[index], ...sector };
      updateWheelConfig({ sectors: newSectors });
    };
    
    const removeSector = (index: number) => {
      updateWheelConfig({ sectors: config.sectors.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р С”Р С•Р В»Р ВµРЎРѓР В° РЎвЂћР С•РЎР‚РЎвЂљРЎС“Р Р…РЎвЂ№</h3>
          <p className="text-sm text-muted-foreground">Р вЂќР С•Р В±Р В°Р Р†РЎРЉРЎвЂљР Вµ РЎРѓР ВµР С”РЎвЂљР С•РЎР‚РЎвЂ№ Р С‘ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–РЎвЂљР Вµ Р В°Р Р…Р С‘Р СР В°РЎвЂ Р С‘РЎР‹</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Р вЂ™РЎР‚Р ВµР СРЎРЏ Р В°Р Р…Р С‘Р СР В°РЎвЂ Р С‘Р С‘ (Р СРЎРѓ)
            </label>
            <Input
              type="number"
              value={config.spinAnimationMs}
              onChange={(e) => updateWheelConfig({ spinAnimationMs: parseInt(e.target.value) || 3000 })}
              className="glass-card"
              min="1000"
              max="10000"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Р РЋР ВµР С”РЎвЂљР С•РЎР‚РЎвЂ№ Р С”Р С•Р В»Р ВµРЎРѓР В°</label>
            <button
              onClick={addSector}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:scale-[0.98] transition-transform text-sm"
            >
              <Plus className="w-4 h-4" />
              Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ РЎРѓР ВµР С”РЎвЂљР С•РЎР‚
            </button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {config.sectors.map((sector, index) => (
              <div key={index} className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Р РЋР ВµР С”РЎвЂљР С•РЎР‚ {index + 1}</span>
                  <button
                    onClick={() => removeSector(index)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ</label>
                    <Input
                      value={sector.label}
                      onChange={(e) => updateSector(index, { label: e.target.value })}
                      className="glass-card text-sm"
                      placeholder="Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ РЎРѓР ВµР С”РЎвЂљР С•РЎР‚Р В°"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Р вЂ™Р ВµРЎРѓ (%)</label>
                    <Input
                      type="number"
                      value={sector.weight}
                      onChange={(e) => updateSector(index, { weight: parseInt(e.target.value) || 0 })}
                      className="glass-card text-sm"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Р СћР С‘Р С— Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</label>
                    <Select
                      value={sector.rewardType}
                      onValueChange={(value: RewardType) => updateSector(index, { rewardType: value })}
                    >
                      <SelectTrigger className="glass-card text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {rewardTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.icon} {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С•</label>
                    <Input
                      type="number"
                      value={sector.rewardValue}
                      onChange={(e) => updateSector(index, { rewardValue: parseInt(e.target.value) || 0 })}
                      className="glass-card text-sm"
                      min="0"
                      disabled={sector.rewardType === 'none'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {config.sectors.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Р вЂќР С•Р В±Р В°Р Р†РЎРЉРЎвЂљР Вµ РЎРѓР ВµР С”РЎвЂљР С•РЎР‚РЎвЂ№ Р Т‘Р В»РЎРЏ Р С”Р С•Р В»Р ВµРЎРѓР В°
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRPSConfig = () => {
    const config = wizardState.gameData.config as RPSConfig || {
      mode: 'pve',
      rounds: 1,
      winReward: { type: 'currency', value: 50 }
    };
    
    const updateRPSConfig = (newConfig: Partial<RPSConfig>) => {
      updateWizardData({ config: { ...config, ...newConfig } });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р С”Р В°Р СР ВµР Р…РЎРЉ-Р Р…Р С•Р В¶Р Р…Р С‘РЎвЂ РЎвЂ№-Р В±РЎС“Р СР В°Р С–Р В°</h3>
          <p className="text-sm text-muted-foreground">Р В Р ВµР В¶Р С‘Р С Р С‘Р С–РЎР‚РЎвЂ№ Р С‘ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Р В Р ВµР В¶Р С‘Р С Р С‘Р С–РЎР‚РЎвЂ№</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateRPSConfig({ mode: 'pve' })}
                className={`p-3 rounded-xl text-left transition-all ${
                  config.mode === 'pve' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">Р СџРЎР‚Р С•РЎвЂљР С‘Р Р† Р В±Р С•РЎвЂљР В° (PvE)</div>
                <div className={`text-sm ${config.mode === 'pve' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  Р ВР С–РЎР‚Р В° Р С—РЎР‚Р С•РЎвЂљР С‘Р Р† Р С”Р С•Р СР С—РЎРЉРЎР‹РЎвЂљР ВµРЎР‚Р В°
                </div>
              </button>
              <button
                onClick={() => updateRPSConfig({ mode: 'pvp' })} 
                className={`p-3 rounded-xl text-left transition-all ${
                  config.mode === 'pvp' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">Р СџРЎР‚Р С•РЎвЂљР С‘Р Р† Р С‘Р С–РЎР‚Р С•Р С”Р В° (PvP)</div>
                <div className={`text-sm ${config.mode === 'pvp' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  Р ВР С–РЎР‚Р В° Р С—РЎР‚Р С•РЎвЂљР С‘Р Р† Р Т‘РЎР‚РЎС“Р С–Р С‘РЎвЂ¦ Р С‘Р С–РЎР‚Р С•Р С”Р С•Р Р†
                </div>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С• РЎР‚Р В°РЎС“Р Р…Р Т‘Р С•Р Р†</label>
            <Input
              type="number"
              value={config.rounds}
              onChange={(e) => updateRPSConfig({ rounds: parseInt(e.target.value) || 1 })}
              className="glass-card"
              min="1"
              max="10"
            />
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <h4 className="font-medium text-foreground mb-3">Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° Р В·Р В° Р С—Р С•Р В±Р ВµР Т‘РЎС“</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Р СћР С‘Р С— Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</label>
                <Select
                  value={config.winReward.type}
                  onValueChange={(value: RewardType) => 
                    updateRPSConfig({ winReward: { ...config.winReward, type: value } })
                  }
                >
                  <SelectTrigger className="glass-card text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rewardTypes.filter(t => t.id !== 'none').map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.icon} {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С•</label>
                <Input
                  type="number"
                  value={config.winReward.value}
                  onChange={(e) => 
                    updateRPSConfig({ winReward: { ...config.winReward, value: parseInt(e.target.value) || 0 } })
                  }
                  className="glass-card text-sm"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSlotsConfig = () => {
    const config = wizardState.gameData.config as SlotsConfig || {
      reels: 3,
      symbols: [],
      combinations: [],
      spinDurationMs: 2000
    };
    
    const updateSlotsConfig = (newConfig: Partial<SlotsConfig>) => {
      updateWizardData({ config: { ...config, ...newConfig } });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ РЎРѓР В»Р С•РЎвЂљР С•Р Р†</h3>
          <p className="text-sm text-muted-foreground">Р вЂР В°РЎР‚Р В°Р В±Р В°Р Р…РЎвЂ№, РЎРѓР С‘Р СР Р†Р С•Р В»РЎвЂ№ Р С‘ Р С”Р С•Р СР В±Р С‘Р Р…Р В°РЎвЂ Р С‘Р С‘</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С• Р В±Р В°РЎР‚Р В°Р В±Р В°Р Р…Р С•Р Р†</label>
              <Input
                type="number"
                value={config.reels}
                onChange={(e) => updateSlotsConfig({ reels: parseInt(e.target.value) || 3 })}
                className="glass-card"
                min="3"
                max="5"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Р вЂ™РЎР‚Р ВµР СРЎРЏ Р С—РЎР‚Р С•Р С”РЎР‚РЎС“РЎвЂљР С”Р С‘ (Р СРЎРѓ)</label>
              <Input
                type="number"
                value={config.spinDurationMs}
                onChange={(e) => updateSlotsConfig({ spinDurationMs: parseInt(e.target.value) || 2000 })}
                className="glass-card"
                min="1000"
                max="5000"
              />
            </div>
          </div>
          
          <div className="text-center py-8 text-muted-foreground">
            Р СџР С•Р Т‘РЎР‚Р С•Р В±Р Р…РЎвЂ№Р Вµ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ РЎРѓР С‘Р СР Р†Р С•Р В»Р С•Р Р† Р С‘ Р С”Р С•Р СР В±Р С‘Р Р…Р В°РЎвЂ Р С‘Р в„– Р В±РЎС“Р Т‘РЎС“РЎвЂљ Р Т‘Р С•Р В±Р В°Р Р†Р В»Р ВµР Р…РЎвЂ№ Р Р† РЎРѓР В»Р ВµР Т‘РЎС“РЎР‹РЎвЂ°Р ВµР в„– Р Р†Р ВµРЎР‚РЎРѓР С‘Р С‘
          </div>
        </div>
      </div>
    );
  };

  const renderRewardsStep = () => {
    const rewards = wizardState.gameData.rewards || [];
    
    const addReward = () => {
      const newReward: GameReward = {
        condition: 'Р В·Р В° Р С—Р С•Р В±Р ВµР Т‘РЎС“',
        type: 'currency',
        value: 10,
        description: 'Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° Р В·Р В° Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘Р Вµ РЎС“РЎРѓР В»Р С•Р Р†Р С‘РЎРЏ'
      };
      updateWizardData({ rewards: [...rewards, newReward] });
    };
    
    const updateReward = (index: number, reward: Partial<GameReward>) => {
      const newRewards = [...rewards];
      newRewards[index] = { ...newRewards[index], ...reward };
      updateWizardData({ rewards: newRewards });
    };
    
    const removeReward = (index: number) => {
      updateWizardData({ rewards: rewards.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р РЋР С‘РЎРѓРЎвЂљР ВµР СР В° Р Р…Р В°Р С–РЎР‚Р В°Р Т‘</h3>
          <p className="text-sm text-muted-foreground">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–РЎвЂљР Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р В·Р В° РЎР‚Р В°Р В·Р В»Р С‘РЎвЂЎР Р…РЎвЂ№Р Вµ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘РЎРЏ</p>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Р СњР В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</label>
          <button
            onClick={addReward}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:scale-[0.98] transition-transform text-sm"
          >
            <Plus className="w-4 h-4" />
            Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎС“
          </button>
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {rewards.map((reward, index) => (
            <div key={index} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° {index + 1}</span>
                <button
                  onClick={() => removeReward(index)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Р Р€РЎРѓР В»Р С•Р Р†Р С‘Р Вµ</label>
                  <Input
                    value={reward.condition}
                    onChange={(e) => updateReward(index, { condition: e.target.value })}
                    className="glass-card text-sm"
                    placeholder="Р В·Р В° Р С—Р С•Р В±Р ВµР Т‘РЎС“"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Р СћР С‘Р С— Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</label>
                  <Select
                    value={reward.type}
                    onValueChange={(value: RewardType) => updateReward(index, { type: value })}
                  >
                    <SelectTrigger className="glass-card text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rewardTypes.filter(t => t.id !== 'none').map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.icon} {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С•</label>
                  <Input
                    type="number"
                    value={reward.value}
                    onChange={(e) => updateReward(index, { value: parseInt(e.target.value) || 0 })}
                    className="glass-card text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ</label>
                  <Input
                    value={reward.description}
                    onChange={(e) => updateReward(index, { description: e.target.value })}
                    className="glass-card text-sm"
                    placeholder="Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {rewards.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Р вЂќР С•Р В±Р В°Р Р†РЎРЉРЎвЂљР Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р Т‘Р В»РЎРЏ Р С‘Р С–РЎР‚РЎвЂ№
          </div>
        )}
      </div>
    );
  };

  const renderAccessStep = () => {
    const access = wizardState.gameData.access || { visibility: 'public', cooldownSeconds: 300 };
    
    const updateAccess = (newAccess: Partial<typeof access>) => {
      updateWizardData({ access: { ...access, ...newAccess } });
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р В°</h3>
          <p className="text-sm text-muted-foreground">Р вЂ™Р С‘Р Т‘Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ Р С‘Р С–РЎР‚РЎвЂ№ Р С‘ Р С•Р С–РЎР‚Р В°Р Р…Р С‘РЎвЂЎР ВµР Р…Р С‘РЎРЏ</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Р вЂ™Р С‘Р Т‘Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ</label>
            <div className="space-y-2">
              <button
                onClick={() => updateAccess({ visibility: 'public' })}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  access.visibility === 'public' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">СЂСџРЉС’ Р СџРЎС“Р В±Р В»Р С‘РЎвЂЎР Р…Р В°РЎРЏ</div>
                <div className={`text-sm ${access.visibility === 'public' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  Р ВР С–РЎР‚Р В° Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р В° Р Р†РЎРѓР ВµР С Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏР С
                </div>
              </button>
              <button
                onClick={() => updateAccess({ visibility: 'private' })}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  access.visibility === 'private' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">СЂСџвЂќвЂ™ Р СџРЎР‚Р С‘Р Р†Р В°РЎвЂљР Р…Р В°РЎРЏ</div>
                <div className={`text-sm ${access.visibility === 'private' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  Р ВР С–РЎР‚Р В° Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р В° РЎвЂљР С•Р В»РЎРЉР С”Р С• Р С—Р С• Р С—РЎР‚РЎРЏР СР С•Р в„– РЎРѓРЎРѓРЎвЂ№Р В»Р С”Р Вµ
                </div>
              </button>
              <button
                onClick={() => updateAccess({ visibility: 'byRole' })}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  access.visibility === 'byRole' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">СЂСџвЂТђ Р СџР С• РЎР‚Р С•Р В»РЎРЏР С</div>
                <div className={`text-sm ${access.visibility === 'byRole' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  Р ВР С–РЎР‚Р В° Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р В° РЎвЂљР С•Р В»РЎРЉР С”Р С• Р С•Р С—РЎР‚Р ВµР Т‘Р ВµР В»Р ВµР Р…Р Р…РЎвЂ№Р С РЎР‚Р С•Р В»РЎРЏР С
                </div>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Р С™РЎС“Р В»Р Т‘Р В°РЎС“Р Р… (РЎРѓР ВµР С”РЎС“Р Р…Р Т‘РЎвЂ№)
            </label>
            <Input
              type="number"
              value={access.cooldownSeconds}
              onChange={(e) => updateAccess({ cooldownSeconds: parseInt(e.target.value) || 0 })}
              className="glass-card"
              min="0"
              placeholder="300"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Р вЂ™РЎР‚Р ВµР СРЎРЏ Р С•Р В¶Р С‘Р Т‘Р В°Р Р…Р С‘РЎРЏ Р СР ВµР В¶Р Т‘РЎС“ Р С‘Р С–РЎР‚Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р С•Р Т‘Р Р…Р С•Р С–Р С• Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderPreviewStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ Р С‘Р С–РЎР‚РЎвЂ№</h3>
          <p className="text-sm text-muted-foreground">Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЉРЎвЂљР Вµ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р С—Р ВµРЎР‚Р ВµР Т‘ Р С—РЎС“Р В±Р В»Р С‘Р С”Р В°РЎвЂ Р С‘Р ВµР в„–</p>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
              {wizardState.gameData.icon ? (
                <span className="text-3xl">{wizardState.gameData.icon}</span>
              ) : (
                <Gamepad2 className="w-8 h-8 text-foreground/70" />
              )}
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              {wizardState.gameData.name}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {wizardState.gameData.description}
            </p>
            
            <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm">
              {gameTypes.find(t => t.id === wizardState.gameData.type)?.name}
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Р С™РЎС“Р В»Р Т‘Р В°РЎС“Р Р…:</span>
              <span>{wizardState.gameData.access?.cooldownSeconds}РЎРѓ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Р вЂ™Р С‘Р Т‘Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ:</span>
              <span>{wizardState.gameData.access?.visibility}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Р СњР В°Р С–РЎР‚Р В°Р Т‘:</span>
              <span>{wizardState.gameData.rewards?.length || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform">
            Р СџРЎР‚Р С•Р В±Р Р…Р В°РЎРЏ Р С‘Р С–РЎР‚Р В°
          </button>
        </div>
      </div>
    );
  };

  const renderPublishStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">Р СџРЎС“Р В±Р В»Р С‘Р С”Р В°РЎвЂ Р С‘РЎРЏ Р С‘Р С–РЎР‚РЎвЂ№</h3>
          <p className="text-sm text-muted-foreground">Р вЂ™РЎвЂ№Р В±Р ВµРЎР‚Р С‘РЎвЂљР Вµ, Р С”Р В°Р С” РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С‘Р С–РЎР‚РЎС“</p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => updateWizardData({ status: 'draft' })}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              wizardState.gameData.status === 'draft' ? 'bg-orange-500 text-white' : 'glass-card'
            }`}
          >
            <div className="font-medium">СЂСџвЂњСњ Р РЋР С•РЎвЂ¦РЎР‚Р В°Р Р…Р С‘РЎвЂљРЎРЉ Р С”Р В°Р С” РЎвЂЎР ВµРЎР‚Р Р…Р С•Р Р†Р С‘Р С”</div>
            <div className={`text-sm ${wizardState.gameData.status === 'draft' ? 'opacity-90' : 'text-muted-foreground'}`}>
              Р ВР С–РЎР‚Р В° Р В±РЎС“Р Т‘Р ВµРЎвЂљ РЎРѓР С•РЎвЂ¦РЎР‚Р В°Р Р…Р ВµР Р…Р В°, Р Р…Р С• Р Р…Р Вµ Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р В° Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏР С
            </div>
          </button>
          <button
            onClick={() => updateWizardData({ status: 'published' })}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              wizardState.gameData.status === 'published' ? 'bg-green-600 text-white' : 'glass-card'
            }`}
          >
            <div className="font-medium">СЂСџС™Р‚ Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°РЎвЂљРЎРЉ РЎРѓРЎР‚Р В°Р В·РЎС“</div>
            <div className={`text-sm ${wizardState.gameData.status === 'published' ? 'opacity-90' : 'text-muted-foreground'}`}>
              Р ВР С–РЎР‚Р В° РЎРѓРЎвЂљР В°Р Р…Р ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р В° Р Р†РЎРѓР ВµР С Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏР С Р Р…Р ВµР СР ВµР Т‘Р В»Р ВµР Р…Р Р…Р С•
            </div>
          </button>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <h4 className="font-medium text-foreground mb-2">JSON Р С”Р С•Р Р…РЎвЂћР С‘Р С–РЎС“РЎР‚Р В°РЎвЂ Р С‘РЎРЏ</h4>
          <pre className="text-xs bg-secondary p-3 rounded-lg overflow-auto max-h-40 text-foreground">
            {JSON.stringify(wizardState.gameData, null, 2)}
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(wizardState.gameData, null, 2));
              setCopiedJson(true);
              setTimeout(() => setCopiedJson(false), 2000);
            }}
            className="flex items-center gap-2 mt-2 text-sm text-primary hover:underline"
          >
            {copiedJson ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedJson ? 'Р РЋР С”Р С•Р С—Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С•!' : 'Р РЋР С”Р С•Р С—Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ JSON'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 space-y-6">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-foreground mb-1">{games.length}</div>
              <div className="text-sm text-muted-foreground">Р вЂ™РЎРѓР ВµР С–Р С• Р С‘Р С–РЎР‚</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-green-600 mb-1">
                {games.filter(g => g.status === 'published').length}
              </div>
              <div className="text-sm text-muted-foreground">Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р С•</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-orange-500 mb-1">
                {games.filter(g => g.status === 'draft').length}
              </div>
              <div className="text-sm text-muted-foreground">Р В§Р ВµРЎР‚Р Р…Р С•Р Р†Р С‘Р С”Р С‘</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-muted-foreground mb-1">
                {games.filter(g => g.status === 'archived').length}
              </div>
              <div className="text-sm text-muted-foreground">Р вЂ™ Р В°РЎР‚РЎвЂ¦Р С‘Р Р†Р Вµ</div>
            </div>
          </div>
        </div>

        {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р С‘Р С–РЎР‚ */}
        <div className="space-y-4">
          {games.length > 0 ? (
            games.map((game) => {
              const gameType = gameTypes.find(t => t.id === game.type);
              const GameIcon = gameType?.icon || Gamepad2;
              
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
                      {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р С‘ РЎРѓРЎвЂљР В°РЎвЂљРЎС“РЎРѓ */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-foreground">{game.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {gameType?.name} РІР‚Сћ Р С™РЎС“Р В»Р Т‘Р В°РЎС“Р Р…: {game.access.cooldownSeconds}РЎРѓ
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`text-sm font-medium ${getStatusColor(game.status)}`}>
                            {getStatusLabel(game.status)}
                          </div>
                          <button
                            onClick={() => copyGameJson(game)}
                            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                            title="Р С™Р С•Р С—Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ JSON"
                          >
                            {copiedJson ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-foreground/70" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
                      {game.description && (
                        <div className="text-sm text-muted-foreground mb-3">
                          {game.description}
                        </div>
                      )}
                      
                      {/* Р РЋРЎвЂљР В°РЎвЂљР С‘РЎРѓРЎвЂљР С‘Р С”Р В° */}
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Р ВР С–РЎР‚: </span>
                          <span className="text-foreground">{game.stats?.totalPlays || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Р СњР В°Р С–РЎР‚Р В°Р Т‘: </span>
                          <span className="text-foreground">{game.stats?.totalRewards || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Р ВР С–РЎР‚Р С•Р С”Р С•Р Р†: </span>
                          <span className="text-foreground">{game.stats?.uniquePlayers || 0}</span>
                        </div>
                      </div>
                      
                      {/* Р вЂќР В°РЎвЂљР В° Р С•Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ */}
                      <div className="text-xs text-muted-foreground mb-4">
                        Р С›Р В±Р Р…Р С•Р Р†Р В»Р ВµР Р…Р С•: {formatDate(game.updatedAt)}
                        {game.publishedAt && (
                          <> РІР‚Сћ Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°Р Р…Р С•: {formatDate(game.publishedAt)}</>
                        )}
                      </div>
                      
                      {/* Р вЂќР ВµР в„–РЎРѓРЎвЂљР Р†Р С‘РЎРЏ */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedGame(game);
                            setIsPreviewOpen(true);
                          }}
                          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚
                        </button>
                        <button
                          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Р В Р ВµР Т‘Р В°Р С”РЎвЂљР С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ
                        </button>
                        
                        {game.status === 'draft' && (
                          <button
                            onClick={() => handleGameStatusChange(game.id, 'published')}
                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:scale-[0.98] transition-transform text-sm"
                          >
                            <Play className="w-4 h-4" />
                            Р С›Р С—РЎС“Р В±Р В»Р С‘Р С”Р С•Р Р†Р В°РЎвЂљРЎРЉ
                          </button>
                        )}
                        
                        {game.status === 'published' && (
                          <button
                            onClick={() => handleGameStatusChange(game.id, 'draft')}
                            className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:scale-[0.98] transition-transform text-sm"
                          >
                            <Pause className="w-4 h-4" />
                            Р РЋР Р…РЎРЏРЎвЂљРЎРЉ РЎРѓ Р С—РЎС“Р В±Р В»Р С‘Р С”Р В°РЎвЂ Р С‘Р С‘
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleGameStatusChange(game.id, 'archived')}
                          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Archive className="w-4 h-4" />
                          Р С’РЎР‚РЎвЂ¦Р С‘Р Р†Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ
                        </button>
                        
                        <button
                          onClick={() => handleDeleteGame(game.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Р Р€Р Т‘Р В°Р В»Р С‘РЎвЂљРЎРЉ
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
              <p className="text-muted-foreground mb-4">Р ВР С–РЎР‚ Р С—Р С•Р С”Р В° Р Р…Р ВµРЎвЂљ</p>
              <button
                onClick={() => setIsWizardOpen(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform"
              >
                Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С—Р ВµРЎР‚Р Р†РЎС“РЎР‹ Р С‘Р С–РЎР‚РЎС“
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Р СљР В°РЎРѓРЎвЂљР ВµРЎР‚ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р С‘Р С–РЎР‚РЎвЂ№ */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-2xl p-0 max-h-[90vh] flex flex-col [&>button]:hidden">
          <div className="p-6 flex-1 flex flex-col">
            {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <DialogTitle className="text-lg font-medium text-foreground">
                  Р РЋР С•Р В·Р Т‘Р В°Р Р…Р С‘Р Вµ Р С‘Р С–РЎР‚РЎвЂ№
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Р РЃР В°Р С– {wizardState.currentStep + 1} Р С‘Р В· {wizardState.steps.length}: {wizardState.steps[wizardState.currentStep].title}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsWizardOpen(false);
                  resetWizard();
                }}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              Р СљР В°РЎРѓРЎвЂљР ВµРЎР‚ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р в„– Р СР С‘Р Р…Р С‘-Р С‘Р С–РЎР‚РЎвЂ№
            </DialogDescription>

            {/* Р СџРЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓ-Р В±Р В°РЎР‚ */}
            <div className="flex items-center gap-2 mb-6">
              {wizardState.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    index < wizardState.currentStep
                      ? 'bg-green-500'
                      : index === wizardState.currentStep
                      ? 'bg-primary'
                      : 'bg-secondary'
                  }`}
                />
              ))}
            </div>

            {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ РЎв‚¬Р В°Р С–Р В° */}
            <div className="flex-1 overflow-y-auto">
              {renderWizardStep()}
            </div>

            {/* Р СњР В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘РЎРЏ */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
              <button
                onClick={prevStep}
                disabled={wizardState.currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Р СњР В°Р В·Р В°Р Т‘
              </button>
              
              <div className="text-sm text-muted-foreground">
                {wizardState.currentStep + 1} / {wizardState.steps.length}
              </div>
              
              {wizardState.currentStep === wizardState.steps.length - 1 ? (
                <button
                  onClick={createGame}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С‘Р С–РЎР‚РЎС“
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Р вЂќР В°Р В»Р ВµР Вµ
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ Р С‘Р С–РЎР‚РЎвЂ№ */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 [&>button]:hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ Р С‘Р С–РЎР‚РЎвЂ№
              </DialogTitle>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р Р…Р С•Р в„– Р С‘Р С–РЎР‚РЎвЂ№
            </DialogDescription>

            {selectedGame && (
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {selectedGame.icon ? (
                    <span className="text-3xl">{selectedGame.icon}</span>
                  ) : (
                    <Gamepad2 className="w-8 h-8 text-foreground/70" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {selectedGame.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {selectedGame.description}
                </p>
                
                <div className="glass-card rounded-2xl p-4 mb-6">
                  <div className="text-center text-muted-foreground">
                    Р СџРЎР‚Р ВµР Т‘Р С—РЎР‚Р С•РЎРѓР СР С•РЎвЂљРЎР‚ Р С‘Р С–РЎР‚Р С•Р Р†Р С•Р С–Р С• Р С‘Р Р…РЎвЂљР ВµРЎР‚РЎвЂћР ВµР в„–РЎРѓР В° Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р В·Р Т‘Р ВµРЎРѓРЎРЉ
                  </div>
                </div>
                
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform">
                  Р ВР С–РЎР‚Р В°РЎвЂљРЎРЉ
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
