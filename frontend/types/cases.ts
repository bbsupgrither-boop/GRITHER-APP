export interface CaseType {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  image: string;
  prizes: Prize[];
}

export interface UserCase {
  id: string;
  caseTypeId: string;
  userId: string;
  obtainedAt: Date;
  opened: boolean;
}

export interface CaseShopItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
}

export interface Prize {
  id: string;
  name: string;
  type: 'coins' | 'experience' | 'item' | 'avatar';
  amount: number;
  probability: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}