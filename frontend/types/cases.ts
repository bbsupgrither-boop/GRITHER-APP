export interface CaseType {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  image: string;
  prizes: Prize[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
}

export interface UserCase {
  id: string;
  caseTypeId: string;
  userId: string;
  obtainedAt: Date;
  isOpened: boolean;
}

export interface CaseShopItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  caseTypeId: string;
  currency: 'coins' | 'gems';
  discount?: number;
  isAvailable: boolean;
}

export interface Prize {
  id: string;
  name: string;
  type?: 'coins' | 'experience' | 'item' | 'avatar';
  value: number;
  amount?: number;
  probability?: number;
  dropChance?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  image: string;
  color: string;
}

export interface RouletteResult {
  selectedCase: CaseType;
}

export interface PrizeRouletteResult {
  selectedPrize: Prize;
}