export interface Achievement {
  id: string;
  title: string;
  description: string;
  category?: 'general' | 'battles' | 'progression' | 'tasks' | 'shop';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  icon?: string;
  requirements: {
    type: string;
    target: number;
    current: number;
  };
  reward?: {
    type: 'coins' | 'badge' | 'experience';
    amount: number;
  };
  adminComment?: string;
  adminFile?: string;
  userFile?: string;
  conditions?: string[];
}