export interface Battle {
  id: string;
  title?: string;
  challengerId: string;
  challengerName?: string;
  opponentId: string;
  opponentName?: string;
  stake: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  winnerId?: string;
  evidence?: string[];
}

export interface BattleInvitation {
  id: string;
  challengerId: string;
  challengerName?: string;
  opponentId: string;
  stake: number;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Date;
  expiresAt: Date;
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
}