// Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР РЏ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В Р вЂ¦Р В Р’В° localStorage
// Р В РІР‚в„ў Р В Р’В±Р РЋРЎвЂњР В РўвЂР РЋРЎвЂњР РЋРІР‚В°Р В Р’ВµР В РЎВ Р В РЎВР В РЎвЂўР В Р’В¶Р В Р вЂ¦Р В РЎвЂў Р В Р’В·Р В Р’В°Р В РЎВР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ¦Р В Р’В° Р РЋР вЂљР В Р’ВµР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРЎвЂњР РЋР вЂ№ Р В РІР‚ВР В РІР‚Сњ

export interface UserData {
  id: string;
  telegramId: string;
  name: string;
  role: 'worker' | 'team_lead' | 'junior_admin' | 'senior_admin' | 'main_admin';
  teamNumber?: number;
  teamName?: string;
  level: number;
  experience: number;
  gCoins: number;
  achievements: string[]; // ID Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
  tasksCompleted: number;
  lastActive: string;
  createdAt: string;
  isActive: boolean;
  achievementsCount: number;
  totalSpent: number;
}

export interface AchievementData {
  id: string;
  userId?: string; // Р В РІР‚СњР В Р’В»Р РЋР РЏ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В РЎВР В РЎвЂўР В Р’В¶Р В Р’ВµР РЋРІР‚С™ Р В Р’В±Р РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰ undefined
  title: string;
  description: string;
  type: 'tasks' | 'battle' | 'collection' | 'social' | 'special';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  reward: {
    coins: number;
    experience: number;
    specialItems?: string[];
  };
  icon: string;
  color: string;
  isActive: boolean;
  completionCount: number;
  progress?: number; // Р В РІР‚СњР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰Р РЋР С“Р В РЎвЂќР В РЎвЂР РЋРІР‚В¦ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
  completed?: boolean; // Р В РІР‚СњР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰Р РЋР С“Р В РЎвЂќР В РЎвЂР РЋРІР‚В¦ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
  completedAt?: string;
  createdAt: string;
}

export interface TaskData {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'development' | 'testing' | 'design' | 'marketing' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  deadline: string;
  estimatedTime: number;
  reward: {
    coins: number;
    experience: number;
  };
  progress: number;
  maxProgress: number;
  createdAt: string;
  completedAt?: string;
}

export interface BattleData {
  id: string;
  player1: {
    id: string;
    name: string;
    team: string;
    balance: number;
  };
  player2: {
    id: string;
    name: string;
    team: string;
    balance: number;
  };
  stake: number;
  status: 'active' | 'completed' | 'cancelled' | 'disputed';
  winner?: string;
  createdAt: string;
  completedAt?: string;
  disputeReason?: string;
  proof?: string[];
  totalBets: number;
}

export interface NotificationData {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

class DatabaseService {
  private readonly DB_VERSION = '1.0';
  private readonly DB_PREFIX = 'grither_db_';

  // Р В Р’ВР В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р В РЎвЂР В Р’В°Р В Р’В»Р В РЎвЂР В Р’В·Р В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
  init() {
    const dbVersion = localStorage.getItem(`${this.DB_PREFIX}version`);
    if (!dbVersion) {
      this.migrateFromOldSystem();
      localStorage.setItem(`${this.DB_PREFIX}version`, this.DB_VERSION);
    }
  }

  // Р В РЎС™Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂР В Р’В· Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–
  private migrateFromOldSystem() {
    console.log('РЎР‚РЎСџРІР‚СњРІР‚С› Р В РЎС™Р В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂР В Р’В· Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–...');
    
    // Р В РІР‚вЂќР В РўвЂР В Р’ВµР РЋР С“Р РЋР Р‰ Р В РЎВР В РЎвЂўР В Р’В¶Р В Р вЂ¦Р В РЎвЂў Р В РўвЂР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В»Р В РЎвЂўР В РЎвЂ“Р В РЎвЂР В РЎвЂќР РЋРЎвЂњ Р В РЎВР В РЎвЂР В РЎвЂ“Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
    // Р В РЎСљР В Р’В°Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В РЎВР В Р’ВµР РЋР вЂљ, Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р вЂ¦Р В РЎвЂўР РЋР С“ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂР В Р’В· mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В Р вЂ  Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р РЋРЎвЂњР РЋР вЂ№ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РЎвЂќР РЋРІР‚С™Р РЋРЎвЂњР РЋР вЂљР РЋРЎвЂњ
  }

  // === Р В РЎСџР В РЎвЂєР В РІР‚С”Р В Р’В¬Р В РІР‚вЂќР В РЎвЂєР В РІР‚в„ўР В РЎвЂ™Р В РЎС›Р В РІР‚СћР В РІР‚С”Р В Р’В ===

  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  getUser(telegramId: string): UserData | null {
    try {
      const userData = localStorage.getItem(`${this.DB_PREFIX}user_${telegramId}`);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ:', error);
      return null;
    }
  }

  // Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂР В Р’В»Р В РЎвЂ Р В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  saveUser(userData: UserData): boolean {
    try {
      userData.lastActive = new Date().toISOString();
      localStorage.setItem(`${this.DB_PREFIX}user_${userData.telegramId}`, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ:', error);
      return false;
    }
  }

  // Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  createUser(telegramId: string, name: string, role: UserData['role'], teamNumber?: number): UserData {
    const newUser: UserData = {
      telegramId,
      name,
      role,
      teamNumber,
      level: 1,
      experience: 0,
      gCoins: 100, // Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™Р РЋРІР‚в„–
      achievements: [],
      tasksCompleted: 0,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.saveUser(newUser);
    return newUser;
  }

  // Р В РЎвЂєР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РЎвЂ“Р РЋР вЂљР В Р’ВµР РЋР С“Р РЋР С“ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  updateUserProgress(telegramId: string, progress: Partial<Pick<UserData, 'level' | 'experience' | 'gCoins' | 'tasksCompleted'>>): boolean {
    const user = this.getUser(telegramId);
    if (!user) return false;

    const updatedUser = {
      ...user,
      ...progress,
      lastActive: new Date().toISOString()
    };

    return this.saveUser(updatedUser);
  }

  // Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР вЂ№
  addUserAchievement(telegramId: string, achievementId: string): boolean {
    const user = this.getUser(telegramId);
    if (!user) return false;

    if (!user.achievements.includes(achievementId)) {
      user.achievements.push(achievementId);
      user.lastActive = new Date().toISOString();
      return this.saveUser(user);
    }

    return true;
  }

  // === Р В РІР‚СњР В РЎвЂєР В Р Р‹Р В РЎС›Р В Р’ВР В РІР‚вЂњР В РІР‚СћР В РЎСљР В Р’ВР В Р вЂЎ ===

  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  getUserAchievements(telegramId: string): AchievementData[] {
    try {
      const achievements = localStorage.getItem(`${this.DB_PREFIX}achievements_${telegramId}`);
      return achievements ? JSON.parse(achievements) : [];
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“:', error);
      return [];
    }
  }

  // Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ
  saveAchievement(achievement: AchievementData): boolean {
    try {
      const existing = this.getUserAchievements(achievement.userId);
      const updated = existing.filter(a => a.id !== achievement.id);
      updated.push(achievement);
      
      localStorage.setItem(`${this.DB_PREFIX}achievements_${achievement.userId}`, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ:', error);
      return false;
    }
  }

  // === Р В РІР‚вЂќР В РЎвЂ™Р В РІР‚СњР В РЎвЂ™Р В Р’В§Р В Р’В ===

  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  getUserTasks(telegramId: string): TaskData[] {
    try {
      const tasks = localStorage.getItem(`${this.DB_PREFIX}tasks_${telegramId}`);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ:', error);
      return [];
    }
  }

  // Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ
  saveTask(task: TaskData): boolean {
    try {
      const existing = this.getUserTasks(task.userId);
      const updated = existing.filter(t => t.id !== task.id);
      updated.push(task);
      
      localStorage.setItem(`${this.DB_PREFIX}tasks_${task.userId}`, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ:', error);
      return false;
    }
  }

  // === Р В Р в‚¬Р В РІР‚в„ўР В РІР‚СћР В РІР‚СњР В РЎвЂєР В РЎС™Р В РІР‚С”Р В РІР‚СћР В РЎСљР В Р’ВР В Р вЂЎ ===

  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  getUserNotifications(telegramId: string): NotificationData[] {
    try {
      const notifications = localStorage.getItem(`${this.DB_PREFIX}notifications_${telegramId}`);
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“:', error);
      return [];
    }
  }

  // Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ
  saveNotification(notification: NotificationData): boolean {
    try {
      const existing = this.getUserNotifications(notification.userId);
      existing.push(notification);
      
      // Р В РЎвЂєР В РЎвЂ“Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂќР В РЎвЂўР В Р’В»Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂў Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ (Р В РЎвЂ”Р В РЎвЂўР РЋР С“Р В Р’В»Р В Р’ВµР В РўвЂР В Р вЂ¦Р В РЎвЂР В Р’Вµ 100)
      const limited = existing.slice(-100);
      
      localStorage.setItem(`${this.DB_PREFIX}notifications_${notification.userId}`, JSON.stringify(limited));
      return true;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ:', error);
      return false;
    }
  }

  // Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР РЋРІР‚С™Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂќР В Р’В°Р В РЎвЂќ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ
  markNotificationAsRead(telegramId: string, notificationId: string): boolean {
    try {
      const notifications = this.getUserNotifications(telegramId);
      const notification = notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        localStorage.setItem(`${this.DB_PREFIX}notifications_${telegramId}`, JSON.stringify(notifications));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ:', error);
      return false;
    }
  }

  // === Р В Р Р‹Р В Р’ВР В Р Р‹Р В РЎС›Р В РІР‚СћР В РЎС™Р В РЎСљР В Р’В«Р В РІР‚Сћ Р В Р’В¤Р В Р в‚¬Р В РЎСљР В РЎв„ўР В Р’В¦Р В Р’ВР В Р’В ===

  // Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР РЋРЎвЂњ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  getUserStats(telegramId: string) {
    const user = this.getUser(telegramId);
    const achievements = this.getUserAchievements(telegramId);
    const tasks = this.getUserTasks(telegramId);
    const notifications = this.getUserNotifications(telegramId);

    return {
      user,
      achievementsCount: achievements.length,
      completedAchievements: achievements.filter(a => a.completed).length,
      tasksCount: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      unreadNotifications: notifications.filter(n => !n.read).length
    };
  }

  // Р В РЎвЂєР РЋРІР‚РЋР В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ Р РЋР С“Р В Р’Вµ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ (Р В РўвЂР В Р’В»Р РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР РЋР С“Р РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ)
  clearUserData(telegramId: string): boolean {
    try {
      localStorage.removeItem(`${this.DB_PREFIX}user_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}achievements_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}tasks_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}notifications_${telegramId}`);
      return true;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂўР РЋРІР‚РЋР В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂќР В РЎвЂ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦:', error);
      return false;
    }
  }

  // Р В Р’В­Р В РЎвЂќР РЋР С“Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  exportUserData(telegramId: string) {
    return {
      user: this.getUser(telegramId),
      achievements: this.getUserAchievements(telegramId),
      tasks: this.getUserTasks(telegramId),
      notifications: this.getUserNotifications(telegramId),
      stats: this.getUserStats(telegramId)
    };
  }

  // Р В Р’ВР В РЎВР В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  importUserData(telegramId: string, data: any): boolean {
    try {
      if (data.user) this.saveUser(data.user);
      if (data.achievements) {
        data.achievements.forEach((achievement: AchievementData) => this.saveAchievement(achievement));
      }
      if (data.tasks) {
        data.tasks.forEach((task: TaskData) => this.saveTask(task));
      }
      if (data.notifications) {
        data.notifications.forEach((notification: NotificationData) => this.saveNotification(notification));
      }
      return true;
    } catch (error) {
      console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂР В РЎВР В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™Р В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦:', error);
      return false;
    }
  }
}

// Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р’ВµР В РЎВ Р В Р’ВµР В РўвЂР В РЎвЂР В Р вЂ¦Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР РЉР В РЎвЂќР В Р’В·Р В Р’ВµР В РЎВР В РЎвЂ”Р В Р’В»Р РЋР РЏР РЋР вЂљ Р РЋР С“Р В Р’ВµР РЋР вЂљР В Р вЂ Р В РЎвЂР РЋР С“Р В Р’В°
export const databaseService = new DatabaseService();

// Р В Р’ВР В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р В РЎвЂР В Р’В°Р В Р’В»Р В РЎвЂР В Р’В·Р В РЎвЂР РЋР вЂљР РЋРЎвЂњР В Р’ВµР В РЎВ Р В РІР‚ВР В РІР‚Сњ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂР В РЎВР В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™Р В Р’Вµ
databaseService.init();
