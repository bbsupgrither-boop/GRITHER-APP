export interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  experience: number;
  balance: number;
  achievements: number;
  team: string;
  rank: number;
}

export interface User {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
  level: number;
  experience: number;
  maxExperience?: number;
  balance: number;
  team: string;
  role: string;
  online: boolean;
  telegramId?: number;
}