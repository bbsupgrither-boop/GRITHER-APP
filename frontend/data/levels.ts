export interface LevelData {
  level: number;
  experienceRequired: number;
  totalExperience: number;
  status: string;
  reward: number;
}

export const LEVEL_SYSTEM: LevelData[] = [
  { level: 1, experienceRequired: 0, totalExperience: 0, status: "Новичок", reward: 0 },
  { level: 2, experienceRequired: 100, totalExperience: 100, status: "Салага", reward: 50 },
  { level: 3, experienceRequired: 150, totalExperience: 250, status: "Стажер", reward: 75 },
  { level: 4, experienceRequired: 250, totalExperience: 500, status: "Практик", reward: 125 },
  { level: 5, experienceRequired: 400, totalExperience: 900, status: "Обменщик", reward: 200 },
  { level: 6, experienceRequired: 600, totalExperience: 1500, status: "Хомяк", reward: 300 },
  { level: 7, experienceRequired: 850, totalExperience: 2350, status: "Чекер", reward: 425 },
  { level: 8, experienceRequired: 1150, totalExperience: 3500, status: "Фармер", reward: 575 },
  { level: 9, experienceRequired: 1500, totalExperience: 5000, status: "Лудоман", reward: 750 },
  { level: 10, experienceRequired: 1900, totalExperience: 6900, status: "Лидер", reward: 950 },
  { level: 11, experienceRequired: 2350, totalExperience: 9250, status: "Приколист", reward: 1200 },
  { level: 12, experienceRequired: 2850, totalExperience: 12100, status: "Суетолог", reward: 1500 },
  { level: 13, experienceRequired: 3400, totalExperience: 15500, status: "Богомол", reward: 1800 },
  { level: 14, experienceRequired: 4000, totalExperience: 19500, status: "Чепух", reward: 2200 },
  { level: 15, experienceRequired: 4650, totalExperience: 24150, status: "KYC агент", reward: 2600 },
  { level: 16, experienceRequired: 5350, totalExperience: 29500, status: "Пуджик", reward: 3100 },
  { level: 17, experienceRequired: 6100, totalExperience: 35600, status: "Кнопкодав", reward: 3600 },
  { level: 18, experienceRequired: 6900, totalExperience: 42500, status: "Доллароид", reward: 4200 },
  { level: 19, experienceRequired: 7750, totalExperience: 50250, status: "Диван ходлер", reward: 4800 },
  { level: 20, experienceRequired: 8650, totalExperience: 58900, status: "Эксперт", reward: 5500 },
  { level: 21, experienceRequired: 9600, totalExperience: 68500, status: "Аналитик", reward: 6300 },
  { level: 22, experienceRequired: 10600, totalExperience: 79100, status: "Инвестор", reward: 7100 },
  { level: 23, experienceRequired: 11650, totalExperience: 90750, status: "Крутило", reward: 8000 },
  { level: 24, experienceRequired: 12750, totalExperience: 103500, status: "Спекулянт", reward: 9000 },
  { level: 25, experienceRequired: 13900, totalExperience: 117400, status: "Трейдер", reward: 10000 },
  { level: 26, experienceRequired: 15100, totalExperience: 132500, status: "Гуру", reward: 11200 },
  { level: 27, experienceRequired: 16350, totalExperience: 148850, status: "Криптан", reward: 12500 },
  { level: 28, experienceRequired: 17650, totalExperience: 166500, status: "Хакер", reward: 13900 },
  { level: 29, experienceRequired: 19000, totalExperience: 185500, status: "Технарь", reward: 15400 },
  { level: 30, experienceRequired: 20400, totalExperience: 205900, status: "Мастер", reward: 17000 },
  { level: 31, experienceRequired: 21850, totalExperience: 227750, status: "Профи", reward: 18700 },
  { level: 32, experienceRequired: 23350, totalExperience: 251100, status: "Магистер", reward: 20500 },
  { level: 33, experienceRequired: 24900, totalExperience: 276000, status: "Фиатник", reward: 22400 },
  { level: 34, experienceRequired: 26500, totalExperience: 302500, status: "Новатор", reward: 24400 },
  { level: 35, experienceRequired: 28150, totalExperience: 330650, status: "Арбитражник", reward: 26500 },
  { level: 36, experienceRequired: 29850, totalExperience: 360500, status: "Инфлюенсер", reward: 28700 },
  { level: 37, experienceRequired: 31600, totalExperience: 392100, status: "Рублефил", reward: 31000 },
  { level: 38, experienceRequired: 33400, totalExperience: 425500, status: "Визионер", reward: 33400 },
  { level: 39, experienceRequired: 35250, totalExperience: 460750, status: "Патриот", reward: 35900 },
  { level: 40, experienceRequired: 37150, totalExperience: 497900, status: "Икона", reward: 38500 },
  { level: 41, experienceRequired: 39100, totalExperience: 537000, status: "Стратег", reward: 41200 },
  { level: 42, experienceRequired: 41100, totalExperience: 578100, status: "Генерал", reward: 44000 },
  { level: 43, experienceRequired: 43150, totalExperience: 621250, status: "Лудик", reward: 46900 },
  { level: 44, experienceRequired: 45250, totalExperience: 666500, status: "Леброн", reward: 49900 },
  { level: 45, experienceRequired: 47400, totalExperience: 713900, status: "Маркетмейкер", reward: 53000 },
  { level: 46, experienceRequired: 49600, totalExperience: 763500, status: "Монетчик", reward: 56200 },
  { level: 47, experienceRequired: 51850, totalExperience: 815350, status: "Ренегат", reward: 59500 },
  { level: 48, experienceRequired: 54150, totalExperience: 869500, status: "Босс KFC", reward: 62900 },
  { level: 49, experienceRequired: 56500, totalExperience: 926000, status: "Мастодонт", reward: 66400 },
  { level: 50, experienceRequired: 58900, totalExperience: 984900, status: "Легенда", reward: 70000 }
];

export const getLevelData = (level: number): LevelData | undefined => {
  return LEVEL_SYSTEM.find(l => l.level === level);
};

export const getNextLevelData = (currentLevel: number): LevelData | undefined => {
  return LEVEL_SYSTEM.find(l => l.level === currentLevel + 1);
};

export const getCurrentLevelProgress = (currentExperience: number): { level: LevelData; progress: number; nextLevel?: LevelData } => {
  // Найти текущий уровень на основе опыта
  let currentLevelData = LEVEL_SYSTEM[0]; // По умолчанию 1 уровень
  
  for (let i = LEVEL_SYSTEM.length - 1; i >= 0; i--) {
    if (currentExperience >= LEVEL_SYSTEM[i].totalExperience) {
      currentLevelData = LEVEL_SYSTEM[i];
      break;
    }
  }
  
  const nextLevelData = getNextLevelData(currentLevelData.level);
  
  if (nextLevelData) {
    const progress = ((currentExperience - currentLevelData.totalExperience) / nextLevelData.experienceRequired) * 100;
    return {
      level: currentLevelData,
      progress: Math.min(progress, 100),
      nextLevel: nextLevelData
    };
  }
  
  return {
    level: currentLevelData,
    progress: 100
  };
};
