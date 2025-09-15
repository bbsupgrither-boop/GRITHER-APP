// Level system data structure
export interface LevelData {
  level: number;
  status: string;
  experienceRequired: number; // Total experience needed for this level
  experienceToNext: number; // Experience needed from previous level to this level
  reward: number; // G-coins reward for reaching this level
}

export const LEVELS_DATA: LevelData[] = [
  { level: 1, status: 'РќРѕРІРёС‡РѕРє', experienceRequired: 0, experienceToNext: 100, reward: 0 },
  { level: 2, status: 'РЎР°Р»Р°РіР°', experienceRequired: 100, experienceToNext: 150, reward: 50 },
  { level: 3, status: 'РЎС‚Р°Р¶РµСЂ', experienceRequired: 250, experienceToNext: 250, reward: 75 },
  { level: 4, status: 'РџСЂР°РєС‚РёРє', experienceRequired: 500, experienceToNext: 400, reward: 125 },
  { level: 5, status: 'РћР±РјРµРЅС‰РёРє', experienceRequired: 900, experienceToNext: 600, reward: 200 },
  { level: 6, status: 'РҐРѕРјСЏРє', experienceRequired: 1500, experienceToNext: 850, reward: 300 },
  { level: 7, status: 'Р§РµРєРµСЂ', experienceRequired: 2350, experienceToNext: 1150, reward: 425 },
  { level: 8, status: 'Р¤Р°СЂРјРµСЂ', experienceRequired: 3500, experienceToNext: 1500, reward: 575 },
  { level: 9, status: 'Р›СѓРґРѕРјР°РЅ', experienceRequired: 5000, experienceToNext: 1900, reward: 750 },
  { level: 10, status: 'Р›РёРґРµСЂ', experienceRequired: 6900, experienceToNext: 2350, reward: 950 },
  { level: 11, status: 'РџСЂРёРєРѕР»РёСЃС‚', experienceRequired: 9250, experienceToNext: 2850, reward: 1200 },
  { level: 12, status: 'РЎСѓРµС‚РѕР»РѕРі', experienceRequired: 12100, experienceToNext: 3400, reward: 1500 },
  { level: 13, status: 'Р‘РѕРіРѕРјРѕР»', experienceRequired: 15500, experienceToNext: 4000, reward: 1800 },
  { level: 14, status: 'Р§РµРїСѓС…', experienceRequired: 19500, experienceToNext: 4650, reward: 2200 },
  { level: 15, status: 'KYC Р°РіРµРЅС‚', experienceRequired: 24150, experienceToNext: 5350, reward: 2600 },
  { level: 16, status: 'РџСѓРґР¶РёРє', experienceRequired: 29500, experienceToNext: 6100, reward: 3100 },
  { level: 17, status: 'РљРЅРѕРїРєРѕРґР°РІ', experienceRequired: 35600, experienceToNext: 6900, reward: 3600 },
  { level: 18, status: 'Р”РѕР»Р»Р°СЂРѕРёРґ', experienceRequired: 42500, experienceToNext: 7750, reward: 4200 },
  { level: 19, status: 'Р”РёРІР°РЅ С…РѕРґР»РµСЂ', experienceRequired: 50250, experienceToNext: 8650, reward: 4800 },
  { level: 20, status: 'Р­РєСЃРїРµСЂС‚', experienceRequired: 58900, experienceToNext: 9600, reward: 5500 },
  { level: 21, status: 'РђРЅР°Р»РёС‚РёРє', experienceRequired: 68500, experienceToNext: 10600, reward: 6300 },
  { level: 22, status: 'РРЅРІРµСЃС‚РѕСЂ', experienceRequired: 79100, experienceToNext: 11650, reward: 7100 },
  { level: 23, status: 'РљСЂСѓС‚РёР»Рѕ', experienceRequired: 90750, experienceToNext: 12750, reward: 8000 },
  { level: 24, status: 'РЎРїРµРєСѓР»СЏРЅС‚', experienceRequired: 103500, experienceToNext: 13900, reward: 9000 },
  { level: 25, status: 'РўСЂРµР№РґРµСЂ', experienceRequired: 117400, experienceToNext: 15100, reward: 10000 },
  { level: 26, status: 'Р“СѓСЂСѓ', experienceRequired: 132500, experienceToNext: 16350, reward: 11200 },
  { level: 27, status: 'РљСЂРёРїС‚Р°РЅ', experienceRequired: 148850, experienceToNext: 17650, reward: 12500 },
  { level: 28, status: 'РҐР°РєРµСЂ', experienceRequired: 166500, experienceToNext: 19000, reward: 13900 },
  { level: 29, status: 'РўРµС…РЅР°СЂСЊ', experienceRequired: 185500, experienceToNext: 20400, reward: 15400 },
  { level: 30, status: 'РњР°СЃС‚РµСЂ', experienceRequired: 205900, experienceToNext: 21850, reward: 17000 },
  { level: 31, status: 'РџСЂРѕС„Рё', experienceRequired: 227750, experienceToNext: 23350, reward: 18700 },
  { level: 32, status: 'РњР°РіРёСЃС‚РµСЂ', experienceRequired: 251100, experienceToNext: 24900, reward: 20500 },
  { level: 33, status: 'Р¤РёР°С‚РЅРёРє', experienceRequired: 276000, experienceToNext: 26500, reward: 22400 },
  { level: 34, status: 'РќРѕРІР°С‚РѕСЂ', experienceRequired: 302500, experienceToNext: 28150, reward: 24400 },
  { level: 35, status: 'РђСЂР±РёС‚СЂР°Р¶РЅРёРє', experienceRequired: 330650, experienceToNext: 29850, reward: 26500 },
  { level: 36, status: 'РРЅС„Р»СЋРµРЅСЃРµСЂ', experienceRequired: 360500, experienceToNext: 31600, reward: 28700 },
  { level: 37, status: 'Р СѓР±Р»РµС„РёР»', experienceRequired: 392100, experienceToNext: 33400, reward: 31000 },
  { level: 38, status: 'Р’РёР·РёРѕРЅРµСЂ', experienceRequired: 425500, experienceToNext: 35250, reward: 33400 },
  { level: 39, status: 'РџР°С‚СЂРёРѕС‚', experienceRequired: 460750, experienceToNext: 37150, reward: 35900 },
  { level: 40, status: 'РРєРѕРЅР°', experienceRequired: 497900, experienceToNext: 39100, reward: 38500 },
  { level: 41, status: 'РЎС‚СЂР°С‚РµРі', experienceRequired: 537000, experienceToNext: 41100, reward: 41200 },
  { level: 42, status: 'Р“РµРЅРµСЂР°Р»', experienceRequired: 578100, experienceToNext: 43150, reward: 44000 },
  { level: 43, status: 'Р›СѓРґРёРє', experienceRequired: 621250, experienceToNext: 45250, reward: 46900 },
  { level: 44, status: 'Р›РµР±СЂРѕРЅ', experienceRequired: 666500, experienceToNext: 47400, reward: 49900 },
  { level: 45, status: 'РњР°СЂРєРµС‚РјРµР№РєРµСЂ', experienceRequired: 713900, experienceToNext: 49600, reward: 53000 },
  { level: 46, status: 'РњРѕРЅРµС‚С‡РёРє', experienceRequired: 763500, experienceToNext: 51850, reward: 56200 },
  { level: 47, status: 'Р РµРЅРµРіР°С‚', experienceRequired: 815350, experienceToNext: 54150, reward: 59500 },
  { level: 48, status: 'Р‘РѕСЃСЃ KFC', experienceRequired: 869500, experienceToNext: 56500, reward: 62900 },
  { level: 49, status: 'РњР°СЃС‚РѕРґРѕРЅС‚', experienceRequired: 926000, experienceToNext: 58900, reward: 66400 },
  { level: 50, status: 'Р›РµРіРµРЅРґР°', experienceRequired: 984900, experienceToNext: 0, reward: 70000 }
];

// Helper functions
export const getLevelData = (level: number): LevelData | undefined => {
  return LEVELS_DATA.find(l => l.level === level);
};

export const getCurrentLevelData = (experience: number): LevelData => {
  // Find the highest level the user has reached
  for (let i = LEVELS_DATA.length - 1; i >= 0; i--) {
    if (experience >= LEVELS_DATA[i].experienceRequired) {
      return LEVELS_DATA[i];
    }
  }
  return LEVELS_DATA[0]; // Return level 1 if no match
};

export const getNextLevelData = (experience: number): LevelData | undefined => {
  const currentLevelData = getCurrentLevelData(experience);
  const nextLevel = currentLevelData.level + 1;
  return getLevelData(nextLevel);
};

export const getProgressToNextLevel = (experience: number): { current: number; needed: number; percentage: number } => {
  const currentLevelData = getCurrentLevelData(experience);
  const nextLevelData = getNextLevelData(experience);
  
  if (!nextLevelData) {
    // User is at max level
    return { current: 0, needed: 0, percentage: 100 };
  }
  
  const current = experience - currentLevelData.experienceRequired;
  const needed = nextLevelData.experienceToNext;
  const percentage = (current / needed) * 100;
  
  return { current, needed, percentage };
};