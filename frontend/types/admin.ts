п»їexport interface AdminUser {
  telegramId: string;
  username: string;
  role: 'admin' | 'teamlead' | 'senior_admin' | 'junior_admin';
  teamNumber?: number;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  scope: 'global' | 'team' | 'user';
}

export interface User {
  telegramId: string;
  username: string;
  displayName: string;
  teamNumber: number;
  gCoins: number;
  level: number;
  experience: number;
  achievements: string[]; // ID Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–
  joinedAt: Date;
  lastActive: Date;
  status: 'active' | 'inactive' | 'banned';
}

export interface Battle {
  id: string;
  title: string;
  description: string;
  teamA: number;
  teamB: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  createdBy: string; // Telegram ID Р В°Р Т‘Р СР С‘Р Р…Р В°/РЎвЂљР С‘Р СР В»Р С‘Р Т‘Р В°
  prize: {
    winner: number; // G-Р СР С•Р Р…Р ВµРЎвЂљРЎвЂ№ Р Т‘Р В»РЎРЏ Р С—Р С•Р В±Р ВµР Т‘Р С‘РЎвЂљР ВµР В»РЎРЏ
    participant: number; // G-Р СР С•Р Р…Р ВµРЎвЂљРЎвЂ№ Р В·Р В° РЎС“РЎвЂЎР В°РЎРѓРЎвЂљР С‘Р Вµ
  };
  results?: {
    winner: number; // Р Р…Р С•Р СР ВµРЎР‚ Р С”Р С•Р СР В°Р Р…Р Т‘РЎвЂ№-Р С—Р С•Р В±Р ВµР Т‘Р С‘РЎвЂљР ВµР В»РЎРЏ
    scoreA: number;
    scoreB: number;
  };
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalAchievements: number;
  activeBattles: number;
  totalBattles: number;
  totalGCoinsInCirculation: number;
  topTeams: Array<{
    teamNumber: number;
    totalGCoins: number;
    memberCount: number;
    averageLevel: number;
  }>;
}

export interface AdminAction {
  id: string;
  adminId: string;
  action: 'create_achievement' | 'create_battle' | 'ban_user' | 'give_coins' | 'modify_user';
  target?: string; // ID РЎвЂ Р ВµР В»Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘РЎРЏ (Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЉ, Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р Вµ Р С‘ РЎвЂљ.Р Т‘.)
  details: Record<string, any>;
  timestamp: Date;
}
