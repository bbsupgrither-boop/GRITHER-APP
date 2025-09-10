export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  rewardType: 'xp' | 'coins';
  deadline: string;
  category: 'individual' | 'team' | 'global';
  status: 'active' | 'completed' | 'expired';
  assignedTo?: string; // РґР»СЏ РёРЅРґРёРІРёРґСѓР°Р»СЊРЅС‹С… Р·Р°РґР°С‡
  teamId?: number; // РґР»СЏ РєРѕРјР°РЅРґРЅС‹С… Р·Р°РґР°С‡
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  isPublished: boolean;
}
