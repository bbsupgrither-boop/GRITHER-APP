export interface Prize {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  color: string;
  value: number; // РЎС‚РѕРёРјРѕСЃС‚СЊ РїСЂРёР·Р°
  dropChance: number; // Р’РµСЂРѕСЏС‚РЅРѕСЃС‚СЊ РІС‹РїР°РґРµРЅРёСЏ РІ РїСЂРѕС†РµРЅС‚Р°С…
  description: string;
  type?: 'coins' | 'experience' | 'item'; // РўРёРї РїСЂРёР·Р° РґР»СЏ РѕРїСЂРµРґРµР»РµРЅРёСЏ С‡С‚Рѕ Р·Р°С‡РёСЃР»СЏС‚СЊ
}

export interface CaseType {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  color: string;
  description: string;
  contents: string[];
  prizes: Prize[]; // РњР°СЃСЃРёРІ РїСЂРёР·РѕРІ РІ РєРµР№СЃРµ
  isActive: boolean; // РђРєС‚РёРІРµРЅ Р»Рё РєРµР№СЃ
  glowColor?: string; // Р¦РІРµС‚ РЅРµРѕРЅРѕРІРѕР№ РѕР±РІРѕРґРєРё (РѕРїС†РёРѕРЅР°Р»СЊРЅС‹Р№)
  glowIntensity?: 'low' | 'medium' | 'high'; // РРЅС‚РµРЅСЃРёРІРЅРѕСЃС‚СЊ СЃРІРµС‡РµРЅРёСЏ
}

export interface UserCase {
  id: string;
  caseTypeId: string;
  obtainedAt: Date;
  isOpened: boolean;
  reward?: Prize; // РР·РјРµРЅРёР»Рё РЅР° РѕР±СЉРµРєС‚ Prize
}

export interface CaseShopItem {
  id: string;
  caseTypeId: string;
  price: number;
  currency: 'coins' | 'gems';
  discount?: number;
  isAvailable: boolean;
}

export interface RouletteResult {
  selectedCase: CaseType;
  animationDuration: number;
}

export interface PrizeRouletteResult {
  selectedPrize: Prize;
  animationDuration: number;
}
