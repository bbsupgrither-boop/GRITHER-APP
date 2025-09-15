export type GameType = 'wheel' | 'rps' | 'slots';
export type GameStatus = 'draft' | 'published' | 'archived';
export type RewardType = 'xp' | 'currency' | 'loot' | 'none';
export type RPSMode = 'pve' | 'pvp';

export interface WheelSector {
  label: string;
  weight: number;
  rewardType: RewardType;
  rewardValue: number;
  color?: string;
}

export interface WheelConfig {
  sectors: WheelSector[];
  spinAnimationMs: number;
}

export interface RPSConfig {
  mode: RPSMode;
  rounds: number;
  winReward: {
    type: RewardType;
    value: number;
  };
  drawReward?: {
    type: RewardType;
    value: number;
  };
}

export interface SlotSymbol {
  id: string;
  label: string;
  icon: string;
  rarity: number; // РЎвЂЎР ВµР С Р В±Р С•Р В»РЎРЉРЎв‚¬Р Вµ, РЎвЂљР ВµР С РЎР‚Р ВµР В¶Р Вµ
}

export interface SlotCombination {
  pattern: string[]; // Р СР В°РЎРѓРЎРѓР С‘Р Р† ID РЎРѓР С‘Р СР Р†Р С•Р В»Р С•Р Р†
  multiplier: number;
  description: string;
}

export interface SlotsConfig {
  reels: number;
  symbols: SlotSymbol[];
  combinations: SlotCombination[];
  spinDurationMs: number;
}

export interface GameReward {
  condition: string;
  type: RewardType;
  value: number;
  description: string;
}

export interface GameAccess {
  visibility: 'public' | 'private' | 'byRole';
  allowedRoles?: string[];
  cooldownSeconds: number;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  type: GameType;
  status: GameStatus;
  icon?: string;
  config: WheelConfig | RPSConfig | SlotsConfig;
  rewards: GameReward[];
  access: GameAccess;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  stats?: {
    totalPlays: number;
    totalRewards: number;
    uniquePlayers: number;
  };
}

export interface GameWizardStep {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface GameWizardState {
  currentStep: number;
  steps: GameWizardStep[];
  gameData: Partial<Game>;
}
