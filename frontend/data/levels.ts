// Level system data structure
export interface LevelData {
  level: number;
  status: string;
  experienceRequired: number; // Total experience needed for this level
  experienceToNext: number; // Experience needed from previous level to this level
  reward: number; // G-coins reward for reaching this level
}

export const LEVELS_DATA: LevelData[] = [
  { level: 1, status: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚РЋР В РЎвЂўР В РЎвЂќ', experienceRequired: 0, experienceToNext: 100, reward: 0 },
  { level: 2, status: 'Р В Р Р‹Р В Р’В°Р В Р’В»Р В Р’В°Р В РЎвЂ“Р В Р’В°', experienceRequired: 100, experienceToNext: 150, reward: 50 },
  { level: 3, status: 'Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р В Р’В¶Р В Р’ВµР РЋР вЂљ', experienceRequired: 250, experienceToNext: 250, reward: 75 },
  { level: 4, status: 'Р В РЎСџР РЋР вЂљР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В РЎвЂќ', experienceRequired: 500, experienceToNext: 400, reward: 125 },
  { level: 5, status: 'Р В РЎвЂєР В Р’В±Р В РЎВР В Р’ВµР В Р вЂ¦Р РЋРІР‚В°Р В РЎвЂР В РЎвЂќ', experienceRequired: 900, experienceToNext: 600, reward: 200 },
  { level: 6, status: 'Р В РўС’Р В РЎвЂўР В РЎВР РЋР РЏР В РЎвЂќ', experienceRequired: 1500, experienceToNext: 850, reward: 300 },
  { level: 7, status: 'Р В Р’В§Р В Р’ВµР В РЎвЂќР В Р’ВµР РЋР вЂљ', experienceRequired: 2350, experienceToNext: 1150, reward: 425 },
  { level: 8, status: 'Р В Р’В¤Р В Р’В°Р РЋР вЂљР В РЎВР В Р’ВµР РЋР вЂљ', experienceRequired: 3500, experienceToNext: 1500, reward: 575 },
  { level: 9, status: 'Р В РІР‚С”Р РЋРЎвЂњР В РўвЂР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦', experienceRequired: 5000, experienceToNext: 1900, reward: 750 },
  { level: 10, status: 'Р В РІР‚С”Р В РЎвЂР В РўвЂР В Р’ВµР РЋР вЂљ', experienceRequired: 6900, experienceToNext: 2350, reward: 950 },
  { level: 11, status: 'Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂќР В РЎвЂўР В Р’В»Р В РЎвЂР РЋР С“Р РЋРІР‚С™', experienceRequired: 9250, experienceToNext: 2850, reward: 1200 },
  { level: 12, status: 'Р В Р Р‹Р РЋРЎвЂњР В Р’ВµР РЋРІР‚С™Р В РЎвЂўР В Р’В»Р В РЎвЂўР В РЎвЂ“', experienceRequired: 12100, experienceToNext: 3400, reward: 1500 },
  { level: 13, status: 'Р В РІР‚ВР В РЎвЂўР В РЎвЂ“Р В РЎвЂўР В РЎВР В РЎвЂўР В Р’В»', experienceRequired: 15500, experienceToNext: 4000, reward: 1800 },
  { level: 14, status: 'Р В Р’В§Р В Р’ВµР В РЎвЂ”Р РЋРЎвЂњР РЋРІР‚В¦', experienceRequired: 19500, experienceToNext: 4650, reward: 2200 },
  { level: 15, status: 'KYC Р В Р’В°Р В РЎвЂ“Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™', experienceRequired: 24150, experienceToNext: 5350, reward: 2600 },
  { level: 16, status: 'Р В РЎСџР РЋРЎвЂњР В РўвЂР В Р’В¶Р В РЎвЂР В РЎвЂќ', experienceRequired: 29500, experienceToNext: 6100, reward: 3100 },
  { level: 17, status: 'Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В РЎвЂўР В РўвЂР В Р’В°Р В Р вЂ ', experienceRequired: 35600, experienceToNext: 6900, reward: 3600 },
  { level: 18, status: 'Р В РІР‚СњР В РЎвЂўР В Р’В»Р В Р’В»Р В Р’В°Р РЋР вЂљР В РЎвЂўР В РЎвЂР В РўвЂ', experienceRequired: 42500, experienceToNext: 7750, reward: 4200 },
  { level: 19, status: 'Р В РІР‚СњР В РЎвЂР В Р вЂ Р В Р’В°Р В Р вЂ¦ Р РЋРІР‚В¦Р В РЎвЂўР В РўвЂР В Р’В»Р В Р’ВµР РЋР вЂљ', experienceRequired: 50250, experienceToNext: 8650, reward: 4800 },
  { level: 20, status: 'Р В Р’В­Р В РЎвЂќР РЋР С“Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР РЋРІР‚С™', experienceRequired: 58900, experienceToNext: 9600, reward: 5500 },
  { level: 21, status: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР В РЎвЂќ', experienceRequired: 68500, experienceToNext: 10600, reward: 6300 },
  { level: 22, status: 'Р В Р’ВР В Р вЂ¦Р В Р вЂ Р В Р’ВµР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљ', experienceRequired: 79100, experienceToNext: 11650, reward: 7100 },
  { level: 23, status: 'Р В РЎв„ўР РЋР вЂљР РЋРЎвЂњР РЋРІР‚С™Р В РЎвЂР В Р’В»Р В РЎвЂў', experienceRequired: 90750, experienceToNext: 12750, reward: 8000 },
  { level: 24, status: 'Р В Р Р‹Р В РЎвЂ”Р В Р’ВµР В РЎвЂќР РЋРЎвЂњР В Р’В»Р РЋР РЏР В Р вЂ¦Р РЋРІР‚С™', experienceRequired: 103500, experienceToNext: 13900, reward: 9000 },
  { level: 25, status: 'Р В РЎС›Р РЋР вЂљР В Р’ВµР В РІвЂћвЂ“Р В РўвЂР В Р’ВµР РЋР вЂљ', experienceRequired: 117400, experienceToNext: 15100, reward: 10000 },
  { level: 26, status: 'Р В РІР‚СљР РЋРЎвЂњР РЋР вЂљР РЋРЎвЂњ', experienceRequired: 132500, experienceToNext: 16350, reward: 11200 },
  { level: 27, status: 'Р В РЎв„ўР РЋР вЂљР В РЎвЂР В РЎвЂ”Р РЋРІР‚С™Р В Р’В°Р В Р вЂ¦', experienceRequired: 148850, experienceToNext: 17650, reward: 12500 },
  { level: 28, status: 'Р В РўС’Р В Р’В°Р В РЎвЂќР В Р’ВµР РЋР вЂљ', experienceRequired: 166500, experienceToNext: 19000, reward: 13900 },
  { level: 29, status: 'Р В РЎС›Р В Р’ВµР РЋРІР‚В¦Р В Р вЂ¦Р В Р’В°Р РЋР вЂљР РЋР Р‰', experienceRequired: 185500, experienceToNext: 20400, reward: 15400 },
  { level: 30, status: 'Р В РЎС™Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ', experienceRequired: 205900, experienceToNext: 21850, reward: 17000 },
  { level: 31, status: 'Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚С›Р В РЎвЂ', experienceRequired: 227750, experienceToNext: 23350, reward: 18700 },
  { level: 32, status: 'Р В РЎС™Р В Р’В°Р В РЎвЂ“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ', experienceRequired: 251100, experienceToNext: 24900, reward: 20500 },
  { level: 33, status: 'Р В Р’В¤Р В РЎвЂР В Р’В°Р РЋРІР‚С™Р В Р вЂ¦Р В РЎвЂР В РЎвЂќ', experienceRequired: 276000, experienceToNext: 26500, reward: 22400 },
  { level: 34, status: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљ', experienceRequired: 302500, experienceToNext: 28150, reward: 24400 },
  { level: 35, status: 'Р В РЎвЂ™Р РЋР вЂљР В Р’В±Р В РЎвЂР РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р’В¶Р В Р вЂ¦Р В РЎвЂР В РЎвЂќ', experienceRequired: 330650, experienceToNext: 29850, reward: 26500 },
  { level: 36, status: 'Р В Р’ВР В Р вЂ¦Р РЋРІР‚С›Р В Р’В»Р РЋР вЂ№Р В Р’ВµР В Р вЂ¦Р РЋР С“Р В Р’ВµР РЋР вЂљ', experienceRequired: 360500, experienceToNext: 31600, reward: 28700 },
  { level: 37, status: 'Р В Р’В Р РЋРЎвЂњР В Р’В±Р В Р’В»Р В Р’ВµР РЋРІР‚С›Р В РЎвЂР В Р’В»', experienceRequired: 392100, experienceToNext: 33400, reward: 31000 },
  { level: 38, status: 'Р В РІР‚в„ўР В РЎвЂР В Р’В·Р В РЎвЂР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋР вЂљ', experienceRequired: 425500, experienceToNext: 35250, reward: 33400 },
  { level: 39, status: 'Р В РЎСџР В Р’В°Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂР В РЎвЂўР РЋРІР‚С™', experienceRequired: 460750, experienceToNext: 37150, reward: 35900 },
  { level: 40, status: 'Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В Р’В°', experienceRequired: 497900, experienceToNext: 39100, reward: 38500 },
  { level: 41, status: 'Р В Р Р‹Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В Р’ВµР В РЎвЂ“', experienceRequired: 537000, experienceToNext: 41100, reward: 41200 },
  { level: 42, status: 'Р В РІР‚СљР В Р’ВµР В Р вЂ¦Р В Р’ВµР РЋР вЂљР В Р’В°Р В Р’В»', experienceRequired: 578100, experienceToNext: 43150, reward: 44000 },
  { level: 43, status: 'Р В РІР‚С”Р РЋРЎвЂњР В РўвЂР В РЎвЂР В РЎвЂќ', experienceRequired: 621250, experienceToNext: 45250, reward: 46900 },
  { level: 44, status: 'Р В РІР‚С”Р В Р’ВµР В Р’В±Р РЋР вЂљР В РЎвЂўР В Р вЂ¦', experienceRequired: 666500, experienceToNext: 47400, reward: 49900 },
  { level: 45, status: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂќР В Р’ВµР РЋРІР‚С™Р В РЎВР В Р’ВµР В РІвЂћвЂ“Р В РЎвЂќР В Р’ВµР РЋР вЂљ', experienceRequired: 713900, experienceToNext: 49600, reward: 53000 },
  { level: 46, status: 'Р В РЎС™Р В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќ', experienceRequired: 763500, experienceToNext: 51850, reward: 56200 },
  { level: 47, status: 'Р В Р’В Р В Р’ВµР В Р вЂ¦Р В Р’ВµР В РЎвЂ“Р В Р’В°Р РЋРІР‚С™', experienceRequired: 815350, experienceToNext: 54150, reward: 59500 },
  { level: 48, status: 'Р В РІР‚ВР В РЎвЂўР РЋР С“Р РЋР С“ KFC', experienceRequired: 869500, experienceToNext: 56500, reward: 62900 },
  { level: 49, status: 'Р В РЎС™Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В РўвЂР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™', experienceRequired: 926000, experienceToNext: 58900, reward: 66400 },
  { level: 50, status: 'Р В РІР‚С”Р В Р’ВµР В РЎвЂ“Р В Р’ВµР В Р вЂ¦Р В РўвЂР В Р’В°', experienceRequired: 984900, experienceToNext: 0, reward: 70000 }
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