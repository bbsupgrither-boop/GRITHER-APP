export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  rewardType: 'xp' | 'coins';
  deadline: string;
  category: 'individual' | 'team' | 'global';
  status: 'active' | 'completed' | 'expired';
  assignedTo?: string;
  teamId?: number;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  isPublished: boolean;
}