import { useState } from 'react';
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // РЎРѕСЃС‚РѕСЏРЅРёРµ РјР°СЃС‚РµСЂР° СЃРѕР·РґР°РЅРёСЏ РёРіСЂС‹
  const [wizardState, setWizardState] = useState<GameWizardState>({
    currentStep: 0,
    steps: [
      { id: 'type', title: 'РўРёРї РёРіСЂС‹', description: 'Р’С‹Р±РµСЂРёС‚Рµ С‚РёРї РјРёРЅРё-РёРіСЂС‹', isComplete: false },
      { id: 'basic', title: 'РћСЃРЅРѕРІРЅРѕРµ', description: 'РќР°Р·РІР°РЅРёРµ, РѕРїРёСЃР°РЅРёРµ, РёРєРѕРЅРєР°', isComplete: false },
      { id: 'config', title: 'РџР°СЂР°РјРµС‚СЂС‹', description: 'РќР°СЃС‚СЂРѕР№РєРё РёРіСЂС‹', isComplete: false },
      { id: 'rewards', title: 'РќР°РіСЂР°РґС‹', description: 'РЎРёСЃС‚РµРјР° РЅР°РіСЂР°Рґ', isComplete: false },
      { id: 'access', title: 'Р”РѕСЃС‚СѓРї', description: 'Р’РёРґРёРјРѕСЃС‚СЊ Рё РєСѓР»РґР°СѓРЅ', isComplete: false },
      { id: 'preview', title: 'РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ', description: 'РџСЂРѕРІРµСЂРєР° РёпїЅпїЅСЂС‹', isComplete: false },
      { id: 'publish', title: 'РџСѓР±Р»РёРєР°С†РёСЏ', description: 'РЎРѕС…СЂР°РЅРµРЅРёРµ РёРіСЂС‹', isComplete: false }
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
      name: 'РљРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹', 
      icon: CircleDot,
      description: 'РљСЂСѓС‚РёС‚Рµ РєРѕР»РµСЃРѕ Рё РїРѕР»СѓС‡Р°Р№С‚Рµ СЃР»СѓС‡Р°Р№РЅС‹Рµ РЅР°РіСЂР°РґС‹'
    },
    { 
      id: 'rps' as GameType, 
      name: 'РљР°РјРµРЅСЊ, РЅРѕР¶РЅРёС†С‹, Р±СѓРјР°РіР°', 
      icon: Scissors,
      description: 'РљР»Р°СЃСЃРёС‡РµСЃРєР°СЏ пїЅпїЅРіСЂР° РїСЂРѕС‚РёРІ Р±РѕС‚Р° РёР»Рё РґСЂСѓРіРёС… РёРіСЂРѕРєРѕРІ'
    },
    { 
      id: 'slots' as GameType, 
      name: 'РЎР»РѕС‚С‹', 
      icon: DollarSign,
      description: 'РђРІС‚РѕРјР°С‚ СЃ Р±Р°СЂР°Р±Р°РЅР°РјРё Рё РєРѕРјР±РёРЅР°С†РёСЏРјРё СЃРёРјРІРѕР»РѕРІ'
    }
  ];

  const rewardTypes = [
    { id: 'xp' as RewardType, name: 'РћРїС‹С‚ (XP)', icon: 'в­ђ' },
    { id: 'currency' as RewardType, name: 'Р’Р°Р»СЋС‚Р°', icon: 'рџ’°' },
    { id: 'loot' as RewardType, name: 'РџСЂРµРґРјРµС‚', icon: 'рџЋЃ' },
    { id: 'none' as RewardType, name: 'Р‘РµР· РЅР°РіСЂР°РґС‹', icon: 'вќЊ' }
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
            { label: '50 РјРѕРЅРµС‚', weight: 30, rewardType: 'currency' as RewardType, rewardValue: 50 },
            { label: '100 РјРѕРЅРµС‚', weight: 20, rewardType: 'currency' as RewardType, rewardValue: 100 },
            { label: 'РџСѓСЃС‚Рѕ', weight: 10, rewardType: 'none' as RewardType, rewardValue: 0 }
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
              <h3 className="text-lg font-medium text-foreground mb-2">Р’С‹Р±РµСЂРёС‚Рµ С‚РёРї РёРіСЂС‹</h3>
              <p className="text-sm text-muted-foreground">РљР°Р¶РґС‹Р№ С‚РёРї РёРјРµРµС‚ СЃРІРѕРё РѕСЃРѕР±РµРЅРЅРѕСЃС‚Рё Рё РЅР°СЃС‚СЂРѕР№РєРё</p>
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
              <h3 className="text-lg font-medium text-foreground mb-2">РћСЃРЅРѕРІРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ</h3>
              <p className="text-sm text-muted-foreground">РќР°Р·РІР°РЅРёРµ Рё РѕРїРёСЃР°РЅРёРµ РёРіСЂС‹</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РќР°Р·РІР°РЅРёРµ РёРіСЂС‹ *
                </label>
                <Input
                  value={wizardState.gameData.name || ''}
                  onChange={(e) => updateWizardData({ name: e.target.value })}
                  placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ РёРіСЂС‹"
                  className="glass-card"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РћРїРёСЃР°РЅРёРµ
                </label>
                <Textarea
                  value={wizardState.gameData.description || ''}
                  onChange={(e) => updateWizardData({ description: e.target.value })}
                  placeholder="РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ РёРіСЂС‹"
                  className="glass-card resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  РРєРѕРЅРєР° (emoji)
                </label>
                <Input
                  value={wizardState.gameData.icon || ''}
                  onChange={(e) => updateWizardData({ icon: e.target.value })}
                  placeholder="рџЋ®"
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
              РЁР°Рі "{currentStepData.title}" РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ
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
        return true; // РќР°РіСЂР°РґС‹ РЅРµ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹
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

  const renderGameConfigStep = () => {
    const gameType = wizardState.gameData.type;
    
    if (!gameType) return <div>РЎРЅР°С‡Р°Р»Р° РІС‹Р±РµСЂРёС‚Рµ С‚РёРї РёРіСЂС‹</div>;

    switch (gameType) {
      case 'wheel':
        return renderWheelConfig();
      case 'rps':
        return renderRPSConfig();
      case 'slots':
        return renderSlotsConfig();
      default:
        return <div>РќРµРёР·РІРµСЃС‚РЅС‹Р№ С‚РёРї РёРіСЂС‹</div>;
    }
  };

  const renderWheelConfig = () => {
    const config = wizardState.gameData.config as WheelConfig || { sectors: [], spinAnimationMs: 3000 };
    
    const updateWheelConfig = (newConfig: Partial<WheelConfig>) => {
      updateWizardData({ config: { ...config, ...newConfig } });
    };
    
    const addSector = () => {
      const newSector: WheelSector = {
        label: 'РќРѕРІС‹Р№ СЃРµРєС‚РѕСЂ',
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
          <h3 className="text-lg font-medium text-foreground mb-2">РќР°СЃС‚СЂРѕР№РєРё РєРѕР»РµСЃР° С„РѕСЂС‚СѓРЅС‹</h3>
          <p className="text-sm text-muted-foreground">Р”РѕР±Р°РІСЊС‚Рµ СЃРµРєС‚РѕСЂС‹ Рё РЅР°СЃС‚СЂРѕР№С‚Рµ Р°РЅРёРјР°С†РёСЋ</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Р’СЂРµРјСЏ Р°РЅРёРјР°С†РёРё (РјСЃ)
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
            <label className="text-sm font-medium text-foreground">РЎРµРєС‚РѕСЂС‹ РєРѕР»РµСЃР°</label>
            <button
              onClick={addSector}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:scale-[0.98] transition-transform text-sm"
            >
              <Plus className="w-4 h-4" />
              Р”РѕР±Р°РІРёС‚СЊ СЃРµРєС‚РѕСЂ
            </button>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {config.sectors.map((sector, index) => (
              <div key={index} className="glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">РЎРµРєС‚РѕСЂ {index + 1}</span>
                  <button
                    onClick={() => removeSector(index)}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">РќР°Р·РІР°РЅРёРµ</label>
                    <Input
                      value={sector.label}
                      onChange={(e) => updateSector(index, { label: e.target.value })}
                      className="glass-card text-sm"
                      placeholder="РќР°Р·РІР°РЅРёРµ СЃРµРєС‚РѕСЂР°"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Р’РµСЃ (%)</label>
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
                    <label className="text-xs text-muted-foreground mb-1 block">РўРёРї РЅР°РіСЂР°РґС‹</label>
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
                    <label className="text-xs text-muted-foreground mb-1 block">РљРѕР»РёС‡РµСЃС‚РІРѕ</label>
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
              Р”РѕР±Р°РІСЊС‚Рµ СЃРµРєС‚РѕСЂС‹ РґР»СЏ РєРѕР»РµСЃР°
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
          <h3 className="text-lg font-medium text-foreground mb-2">РќР°СЃС‚СЂРѕР№РєРё РєР°РјРµРЅСЊ-РЅРѕР¶РЅРёС†С‹-Р±СѓРјР°РіР°</h3>
          <p className="text-sm text-muted-foreground">Р РµР¶РёРј РёРіСЂС‹ Рё РЅР°РіСЂР°РґС‹</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Р РµР¶РёРј РёРіСЂС‹</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateRPSConfig({ mode: 'pve' })}
                className={`p-3 rounded-xl text-left transition-all ${
                  config.mode === 'pve' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">РџСЂРѕС‚РёРІ Р±РѕС‚Р° (PvE)</div>
                <div className={`text-sm ${config.mode === 'pve' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  РРіСЂР° РїСЂРѕС‚РёРІ РєРѕРјРїСЊСЋС‚РµСЂР°
                </div>
              </button>
              <button
                onClick={() => updateRPSConfig({ mode: 'pvp' })} 
                className={`p-3 rounded-xl text-left transition-all ${
                  config.mode === 'pvp' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">РџСЂРѕС‚РёРІ РёРіСЂРѕРєР° (PvP)</div>
                <div className={`text-sm ${config.mode === 'pvp' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  РРіСЂР° РїСЂРѕС‚РёРІ РґСЂСѓРіРёС… РёРіСЂРѕРєРѕРІ
                </div>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">РљРѕР»РёС‡РµСЃС‚РІРѕ СЂР°СѓРЅРґРѕРІ</label>
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
            <h4 className="font-medium text-foreground mb-3">РќР°РіСЂР°РґР° Р·Р° РїРѕР±РµРґСѓ</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">РўРёРї РЅР°РіСЂР°РґС‹</label>
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
                <label className="text-xs text-muted-foreground mb-1 block">РљРѕР»РёС‡РµСЃС‚РІРѕ</label>
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
          <h3 className="text-lg font-medium text-foreground mb-2">РќР°СЃС‚СЂРѕР№РєРё СЃР»РѕС‚РѕРІ</h3>
          <p className="text-sm text-muted-foreground">Р‘Р°СЂР°Р±Р°РЅС‹, СЃРёРјРІРѕР»С‹ Рё РєРѕРјР±РёРЅР°С†РёРё</p>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">РљРѕР»РёС‡РµСЃС‚РІРѕ Р±Р°СЂР°Р±Р°РЅРѕРІ</label>
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
              <label className="text-sm font-medium text-foreground mb-2 block">Р’СЂРµРјСЏ РїСЂРѕРєСЂСѓС‚РєРё (РјСЃ)</label>
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
            РџРѕРґСЂРѕР±РЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё СЃРёРјРІРѕР»РѕРІ Рё РєРѕРјР±РёРЅР°С†РёР№ Р±СѓРґСѓС‚ РґРѕР±Р°РІР»РµРЅС‹ РІ СЃР»РµРґСѓСЋС‰РµР№ РІРµСЂСЃРёРё
          </div>
        </div>
      </div>
    );
  };

  const renderRewardsStep = () => {
    const rewards = wizardState.gameData.rewards || [];
    
    const addReward = () => {
      const newReward: GameReward = {
        condition: 'Р·Р° РїРѕР±РµРґСѓ',
        type: 'currency',
        value: 10,
        description: 'РќР°РіСЂР°РґР° Р·Р° РІС‹РїРѕР»РЅРµРЅРёРµ СѓСЃР»РѕРІРёСЏ'
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
          <h3 className="text-lg font-medium text-foreground mb-2">РЎРёСЃС‚РµРјР° РЅР°РіСЂР°Рґ</h3>
          <p className="text-sm text-muted-foreground">РќР°СЃС‚СЂРѕР№С‚Рµ РЅР°РіСЂР°РґС‹ Р·Р° СЂР°Р·Р»РёС‡РЅС‹Рµ РґРµР№СЃС‚РІРёСЏ</p>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">РќР°РіСЂР°РґС‹</label>
          <button
            onClick={addReward}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:scale-[0.98] transition-transform text-sm"
          >
            <Plus className="w-4 h-4" />
            Р”РѕР±Р°РІРёС‚СЊ РЅР°РіСЂР°РґСѓ
          </button>
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {rewards.map((reward, index) => (
            <div key={index} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">РќР°РіСЂР°РґР° {index + 1}</span>
                <button
                  onClick={() => removeReward(index)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">РЈСЃР»РѕРІРёРµ</label>
                  <Input
                    value={reward.condition}
                    onChange={(e) => updateReward(index, { condition: e.target.value })}
                    className="glass-card text-sm"
                    placeholder="Р·Р° РїРѕР±РµРґСѓ"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">РўРёРї РЅР°РіСЂР°РґС‹</label>
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
                  <label className="text-xs text-muted-foreground mb-1 block">РљРѕР»РёС‡РµСЃС‚РІРѕ</label>
                  <Input
                    type="number"
                    value={reward.value}
                    onChange={(e) => updateReward(index, { value: parseInt(e.target.value) || 0 })}
                    className="glass-card text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">РћРїРёСЃР°РЅРёРµ</label>
                  <Input
                    value={reward.description}
                    onChange={(e) => updateReward(index, { description: e.target.value })}
                    className="glass-card text-sm"
                    placeholder="РћРїРёСЃР°РЅРёРµ РЅР°РіСЂР°РґС‹"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {rewards.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Р”РѕР±Р°РІСЊС‚Рµ РЅР°РіСЂР°РґС‹ РґР»СЏ РёРіСЂС‹
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
          <h3 className="text-lg font-medium text-foreground mb-2">РќР°СЃС‚СЂРѕР№РєРё РґРѕСЃС‚СѓРїР°</h3>
          <p className="text-sm text-muted-foreground">Р’РёРґРёРјРѕСЃС‚СЊ РёРіСЂС‹ Рё РѕРіСЂР°РЅРёС‡РµРЅРёСЏ</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Р’РёРґРёРјРѕСЃС‚СЊ</label>
            <div className="space-y-2">
              <button
                onClick={() => updateAccess({ visibility: 'public' })}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  access.visibility === 'public' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">рџЊђ РџСѓР±Р»РёС‡РЅР°СЏ</div>
                <div className={`text-sm ${access.visibility === 'public' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  РРіСЂР° РґРѕСЃС‚СѓРїРЅР° РІСЃРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРј
                </div>
              </button>
              <button
                onClick={() => updateAccess({ visibility: 'private' })}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  access.visibility === 'private' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">рџ”’ РџСЂРёРІР°С‚РЅР°СЏ</div>
                <div className={`text-sm ${access.visibility === 'private' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  РРіСЂР° РґРѕСЃС‚СѓРїРЅР° С‚РѕР»СЊРєРѕ РїРѕ РїСЂСЏРјРѕР№ СЃСЃС‹Р»РєРµ
                </div>
              </button>
              <button
                onClick={() => updateAccess({ visibility: 'byRole' })}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  access.visibility === 'byRole' ? 'bg-primary text-primary-foreground' : 'glass-card'
                }`}
              >
                <div className="font-medium">рџ‘Ґ РџРѕ СЂРѕР»СЏРј</div>
                <div className={`text-sm ${access.visibility === 'byRole' ? 'opacity-90' : 'text-muted-foreground'}`}>
                  РРіСЂР° РґРѕСЃС‚СѓРїРЅР° С‚РѕР»СЊРєРѕ РѕРїСЂРµРґРµР»РµРЅРЅС‹Рј СЂРѕР»СЏРј
                </div>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              РљСѓР»РґР°СѓРЅ (СЃРµРєСѓРЅРґС‹)
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
              Р’СЂРµРјСЏ РѕР¶РёРґР°РЅРёСЏ РјРµР¶РґСѓ РёРіСЂР°РјРё РґР»СЏ РѕРґРЅРѕРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
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
          <h3 className="text-lg font-medium text-foreground mb-2">РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ РёРіСЂС‹</h3>
          <p className="text-sm text-muted-foreground">РџСЂРѕРІРµСЂСЊС‚Рµ РЅР°СЃС‚СЂРѕР№РєРё РїРµСЂРµРґ РїСѓР±Р»РёРєР°С†РёРµР№</p>
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
              <span className="text-muted-foreground">РљСѓР»РґР°СѓРЅ:</span>
              <span>{wizardState.gameData.access?.cooldownSeconds}СЃ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Р’РёРґРёРјРѕСЃС‚СЊ:</span>
              <span>{wizardState.gameData.access?.visibility}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">РќР°РіСЂР°Рґ:</span>
              <span>{wizardState.gameData.rewards?.length || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform">
            РџСЂРѕР±РЅР°СЏ РёРіСЂР°
          </button>
        </div>
      </div>
    );
  };

  const renderPublishStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-foreground mb-2">РџСѓР±Р»РёРєР°С†РёСЏ РёРіСЂС‹</h3>
          <p className="text-sm text-muted-foreground">Р’С‹Р±РµСЂРёС‚Рµ, РєР°Рє СЃРѕС…СЂР°РЅРёС‚СЊ РёРіСЂСѓ</p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => updateWizardData({ status: 'draft' })}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              wizardState.gameData.status === 'draft' ? 'bg-orange-500 text-white' : 'glass-card'
            }`}
          >
            <div className="font-medium">рџ“ќ РЎРѕС…СЂР°РЅРёС‚СЊ РєР°Рє С‡РµСЂРЅРѕРІРёРє</div>
            <div className={`text-sm ${wizardState.gameData.status === 'draft' ? 'opacity-90' : 'text-muted-foreground'}`}>
              РРіСЂР° Р±СѓРґРµС‚ СЃРѕС…СЂР°РЅРµРЅР°, РЅРѕ РЅРµ Р±СѓРґРµС‚ РґРѕСЃС‚СѓРїРЅР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРј
            </div>
          </button>
          <button
            onClick={() => updateWizardData({ status: 'published' })}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              wizardState.gameData.status === 'published' ? 'bg-green-600 text-white' : 'glass-card'
            }`}
          >
            <div className="font-medium">рџљЂ РћРїСѓР±Р»РёРєРѕРІР°С‚СЊ СЃСЂР°Р·Сѓ</div>
            <div className={`text-sm ${wizardState.gameData.status === 'published' ? 'opacity-90' : 'text-muted-foreground'}`}>
              РРіСЂР° СЃС‚Р°РЅРµС‚ РґРѕСЃС‚СѓРїРЅР° РІСЃРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРј РЅРµРјРµРґР»РµРЅРЅРѕ
            </div>
          </button>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <h4 className="font-medium text-foreground mb-2">JSON РєРѕРЅС„РёРіСѓСЂР°С†РёСЏ</h4>
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
            {copiedJson ? 'РЎРєРѕРїРёСЂРѕРІР°РЅРѕ!' : 'РЎРєРѕРїРёСЂРѕРІР°С‚СЊ JSON'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6 space-y-6">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-foreground mb-1">{games.length}</div>
              <div className="text-sm text-muted-foreground">Р’СЃРµРіРѕ РёРіСЂ</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-green-600 mb-1">
                {games.filter(g => g.status === 'published').length}
              </div>
              <div className="text-sm text-muted-foreground">РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-orange-500 mb-1">
                {games.filter(g => g.status === 'draft').length}
              </div>
              <div className="text-sm text-muted-foreground">Р§РµСЂРЅРѕРІРёРєРё</div>
            </div>
          </div>
          <div className="glass-card p-4 rounded-2xl apple-shadow">
            <div className="text-center">
              <div className="text-2xl font-medium text-muted-foreground mb-1">
                {games.filter(g => g.status === 'archived').length}
              </div>
              <div className="text-sm text-muted-foreground">Р’ Р°СЂС…РёРІРµ</div>
            </div>
          </div>
        </div>

        {/* РЎРїРёСЃРѕРє РёРіСЂ */}
        <div className="space-y-4">
          {games.length > 0 ? (
            games.map((game) => {
              const gameType = gameTypes.find(t => t.id === game.type);
              const GameIcon = gameType?.icon || Gamepad2;
              
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
                      {/* Р—Р°РіРѕР»РѕРІРѕРє Рё СЃС‚Р°С‚СѓСЃ */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-medium text-foreground">{game.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {gameType?.name} вЂў РљСѓР»РґР°СѓРЅ: {game.access.cooldownSeconds}СЃ
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`text-sm font-medium ${getStatusColor(game.status)}`}>
                            {getStatusLabel(game.status)}
                          </div>
                          <button
                            onClick={() => copyGameJson(game)}
                            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                            title="РљРѕРїРёСЂРѕРІР°С‚СЊ JSON"
                          >
                            {copiedJson ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-foreground/70" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* РћРїРёСЃР°РЅРёРµ */}
                      {game.description && (
                        <div className="text-sm text-muted-foreground mb-3">
                          {game.description}
                        </div>
                      )}
                      
                      {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">РРіСЂ: </span>
                          <span className="text-foreground">{game.stats?.totalPlays || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">РќР°РіСЂР°Рґ: </span>
                          <span className="text-foreground">{game.stats?.totalRewards || 0}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">РРіСЂРѕРєРѕРІ: </span>
                          <span className="text-foreground">{game.stats?.uniquePlayers || 0}</span>
                        </div>
                      </div>
                      
                      {/* Р”Р°С‚Р° РѕР±РЅРѕРІР»РµРЅРёСЏ */}
                      <div className="text-xs text-muted-foreground mb-4">
                        РћР±РЅРѕРІР»РµРЅРѕ: {formatDate(game.updatedAt)}
                        {game.publishedAt && (
                          <> вЂў РћРїСѓР±Р»РёРєРѕРІР°РЅРѕ: {formatDate(game.publishedAt)}</>
                        )}
                      </div>
                      
                      {/* Р”РµР№СЃС‚РІРёСЏ */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedGame(game);
                            setIsPreviewOpen(true);
                          }}
                          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ
                        </button>
                        <button
                          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ
                        </button>
                        
                        {game.status === 'draft' && (
                          <button
                            onClick={() => handleGameStatusChange(game.id, 'published')}
                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:scale-[0.98] transition-transform text-sm"
                          >
                            <Play className="w-4 h-4" />
                            РћРїСѓР±Р»РёРєРѕРІР°С‚СЊ
                          </button>
                        )}
                        
                        {game.status === 'published' && (
                          <button
                            onClick={() => handleGameStatusChange(game.id, 'draft')}
                            className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:scale-[0.98] transition-transform text-sm"
                          >
                            <Pause className="w-4 h-4" />
                            РЎРЅСЏС‚СЊ СЃ РїСѓР±Р»РёРєР°С†РёРё
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleGameStatusChange(game.id, 'archived')}
                          className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Archive className="w-4 h-4" />
                          РђСЂС…РёРІРёСЂРѕРІР°С‚СЊ
                        </button>
                        
                        <button
                          onClick={() => handleDeleteGame(game.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:scale-[0.98] transition-transform text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          РЈРґР°Р»РёС‚СЊ
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
              <p className="text-muted-foreground mb-4">РРіСЂ РїРѕРєР° РЅРµС‚</p>
              <button
                onClick={() => setIsWizardOpen(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform"
              >
                РЎРѕР·РґР°С‚СЊ РїРµСЂРІСѓСЋ РёРіСЂСѓ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* РњР°СЃС‚РµСЂ СЃРѕР·РґР°РЅРёСЏ РёРіСЂС‹ */}
      <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-2xl p-0 max-h-[90vh] flex flex-col [&>button]:hidden">
          <div className="p-6 flex-1 flex flex-col">
            {/* Р—Р°РіРѕР»РѕРІРѕРє */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <DialogTitle className="text-lg font-medium text-foreground">
                  РЎРѕР·РґР°РЅРёРµ РёРіСЂС‹
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  РЁР°Рі {wizardState.currentStep + 1} РёР· {wizardState.steps.length}: {wizardState.steps[wizardState.currentStep].title}
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
              РњР°СЃС‚РµСЂ СЃРѕР·РґР°РЅРёСЏ РЅРѕРІРѕР№ РјРёРЅРё-РёРіСЂС‹
            </DialogDescription>

            {/* РџСЂРѕРіСЂРµСЃСЃ-Р±Р°СЂ */}
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

            {/* РЎРѕРґРµСЂР¶РёРјРѕРµ С€Р°РіР° */}
            <div className="flex-1 overflow-y-auto">
              {renderWizardStep()}
            </div>

            {/* РќР°РІРёРіР°С†РёСЏ */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-border">
              <button
                onClick={prevStep}
                disabled={wizardState.currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                РќР°Р·Р°Рґ
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
                  РЎРѕР·РґР°С‚СЊ РёРіСЂСѓ
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Р”Р°Р»РµРµ
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ РёРіСЂС‹ */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 [&>button]:hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ РёРіСЂС‹
              </DialogTitle>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ СЃРѕР·РґР°РЅРЅРѕР№ РёРіСЂС‹
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
                    РџСЂРµРґРїСЂРѕСЃРјРѕС‚СЂ РёРіСЂРѕРІРѕРіРѕ РёРЅС‚РµСЂС„РµР№СЃР° Р±СѓРґРµС‚ Р·РґРµСЃСЊ
                  </div>
                </div>
                
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform">
                  РРіСЂР°С‚СЊ
                </button>
              </div>
            )}
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
