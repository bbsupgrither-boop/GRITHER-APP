// РџСЂРѕСЃС‚Р°СЏ СЃРёСЃС‚РµРјР° Р±Р°Р·С‹ РґР°РЅРЅС‹С… РЅР° localStorage
// Р’ Р±СѓРґСѓС‰РµРј РјРѕР¶РЅРѕ Р·Р°РјРµРЅРёС‚СЊ РЅР° СЂРµР°Р»СЊРЅСѓСЋ Р‘Р”

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
  achievements: string[]; // ID РґРѕСЃС‚РёР¶РµРЅРёР№
  tasksCompleted: number;
  lastActive: string;
  createdAt: string;
  isActive: boolean;
  achievementsCount: number;
  totalSpent: number;
}

export interface AchievementData {
  id: string;
  userId?: string; // Р”Р»СЏ СЃРёСЃС‚РµРјРЅС‹С… РґРѕСЃС‚РёР¶РµРЅРёР№ РјРѕР¶РµС‚ Р±С‹С‚СЊ undefined
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
  progress?: number; // Р”Р»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РґРѕСЃС‚РёР¶РµРЅРёР№
  completed?: boolean; // Р”Р»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РґРѕСЃС‚РёР¶РµРЅРёР№
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

  // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ Р±Р°Р·С‹ РґР°РЅРЅС‹С…
  init() {
    const dbVersion = localStorage.getItem(`${this.DB_PREFIX}version`);
    if (!dbVersion) {
      this.migrateFromOldSystem();
      localStorage.setItem(`${this.DB_PREFIX}version`, this.DB_VERSION);
    }
  }

  // РњРёРіСЂР°С†РёСЏ РґР°РЅРЅС‹С… РёР· СЃС‚Р°СЂРѕР№ СЃРёСЃС‚РµРјС‹
  private migrateFromOldSystem() {
    console.log('рџ”„ РњРёРіСЂР°С†РёСЏ РґР°РЅРЅС‹С… РёР· СЃС‚Р°СЂРѕР№ СЃРёСЃС‚РµРјС‹...');
    
    // Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ Р»РѕРіРёРєСѓ РјРёРіСЂР°С†РёРё РґР°РЅРЅС‹С…
    // РќР°РїСЂРёРјРµСЂ, РїРµСЂРµРЅРѕСЃ РґР°РЅРЅС‹С… РёР· mock РґР°РЅРЅС‹С… РІ РЅРѕРІСѓСЋ СЃС‚СЂСѓРєС‚СѓСЂСѓ
  }

  // === РџРћР›Р¬Р—РћР’РђРўР•Р›Р ===

  // РџРѕР»СѓС‡РёС‚СЊ РґР°РЅРЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUser(telegramId: string): UserData | null {
    try {
      const userData = localStorage.getItem(`${this.DB_PREFIX}user_${telegramId}`);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ:', error);
      return null;
    }
  }

  // РЎРѕР·РґР°С‚СЊ РёР»Рё РѕР±РЅРѕРІРёС‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  saveUser(userData: UserData): boolean {
    try {
      userData.lastActive = new Date().toISOString();
      localStorage.setItem(`${this.DB_PREFIX}user_${userData.telegramId}`, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ:', error);
      return false;
    }
  }

  // РЎРѕР·РґР°С‚СЊ РЅРѕРІРѕРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  createUser(telegramId: string, name: string, role: UserData['role'], teamNumber?: number): UserData {
    const newUser: UserData = {
      telegramId,
      name,
      role,
      teamNumber,
      level: 1,
      experience: 0,
      gCoins: 100, // РЎС‚Р°СЂС‚РѕРІС‹Рµ РјРѕРЅРµС‚С‹
      achievements: [],
      tasksCompleted: 0,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.saveUser(newUser);
    return newUser;
  }

  // РћР±РЅРѕРІРёС‚СЊ РїСЂРѕРіСЂРµСЃСЃ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
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

  // Р”РѕР±Р°РІРёС‚СЊ РґРѕСЃС‚РёР¶РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ
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

  // === Р”РћРЎРўРР–Р•РќРРЇ ===

  // РџРѕР»СѓС‡РёС‚СЊ РґРѕСЃС‚РёР¶РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUserAchievements(telegramId: string): AchievementData[] {
    try {
      const achievements = localStorage.getItem(`${this.DB_PREFIX}achievements_${telegramId}`);
      return achievements ? JSON.parse(achievements) : [];
    } catch (error) {
      console.error('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёР№:', error);
      return [];
    }
  }

  // РЎРѕС…СЂР°РЅРёС‚СЊ РґРѕСЃС‚РёР¶РµРЅРёРµ
  saveAchievement(achievement: AchievementData): boolean {
    try {
      const existing = this.getUserAchievements(achievement.userId);
      const updated = existing.filter(a => a.id !== achievement.id);
      updated.push(achievement);
      
      localStorage.setItem(`${this.DB_PREFIX}achievements_${achievement.userId}`, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ:', error);
      return false;
    }
  }

  // === Р—РђР”РђР§Р ===

  // РџРѕР»СѓС‡РёС‚СЊ Р·Р°РґР°С‡Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUserTasks(telegramId: string): TaskData[] {
    try {
      const tasks = localStorage.getItem(`${this.DB_PREFIX}tasks_${telegramId}`);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ Р·Р°РґР°С‡:', error);
      return [];
    }
  }

  // РЎРѕС…СЂР°РЅРёС‚СЊ Р·Р°РґР°С‡Сѓ
  saveTask(task: TaskData): boolean {
    try {
      const existing = this.getUserTasks(task.userId);
      const updated = existing.filter(t => t.id !== task.id);
      updated.push(task);
      
      localStorage.setItem(`${this.DB_PREFIX}tasks_${task.userId}`, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ Р·Р°РґР°С‡Рё:', error);
      return false;
    }
  }

  // === РЈР’Р•Р”РћРњР›Р•РќРРЇ ===

  // РџРѕР»СѓС‡РёС‚СЊ СѓРІРµРґРѕРјР»РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  getUserNotifications(telegramId: string): NotificationData[] {
    try {
      const notifications = localStorage.getItem(`${this.DB_PREFIX}notifications_${telegramId}`);
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёР№:', error);
      return [];
    }
  }

  // РЎРѕС…СЂР°РЅРёС‚СЊ СѓРІРµРґРѕРјР»РµРЅРёРµ
  saveNotification(notification: NotificationData): boolean {
    try {
      const existing = this.getUserNotifications(notification.userId);
      existing.push(notification);
      
      // РћРіСЂР°РЅРёС‡РёРІР°РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ СѓРІРµРґРѕРјР»РµРЅРёР№ (РїРѕСЃР»РµРґРЅРёРµ 100)
      const limited = existing.slice(-100);
      
      localStorage.setItem(`${this.DB_PREFIX}notifications_${notification.userId}`, JSON.stringify(limited));
      return true;
    } catch (error) {
      console.error('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ:', error);
      return false;
    }
  }

  // РћС‚РјРµС‚РёС‚СЊ СѓРІРµРґРѕРјР»РµРЅРёРµ РєР°Рє РїСЂРѕС‡РёС‚Р°РЅРЅРѕРµ
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
      console.error('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ:', error);
      return false;
    }
  }

  // === РЎРРЎРўР•РњРќР«Р• Р¤РЈРќРљР¦РР ===

  // РџРѕР»СѓС‡РёС‚СЊ СЃС‚Р°С‚РёСЃС‚РёРєСѓ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
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

  // РћС‡РёСЃС‚РёС‚СЊ РІСЃРµ РґР°РЅРЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ (РґР»СЏ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ)
  clearUserData(telegramId: string): boolean {
    try {
      localStorage.removeItem(`${this.DB_PREFIX}user_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}achievements_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}tasks_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}notifications_${telegramId}`);
      return true;
    } catch (error) {
      console.error('РћС€РёР±РєР° РѕС‡РёСЃС‚РєРё РґР°РЅРЅС‹С…:', error);
      return false;
    }
  }

  // Р­РєСЃРїРѕСЂС‚ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  exportUserData(telegramId: string) {
    return {
      user: this.getUser(telegramId),
      achievements: this.getUserAchievements(telegramId),
      tasks: this.getUserTasks(telegramId),
      notifications: this.getUserNotifications(telegramId),
      stats: this.getUserStats(telegramId)
    };
  }

  // РРјРїРѕСЂС‚ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
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
      console.error('РћС€РёР±РєР° РёРјРїРѕСЂС‚Р° РґР°РЅРЅС‹С…:', error);
      return false;
    }
  }
}

// РЎРѕР·РґР°РµРј РµРґРёРЅСЃС‚РІРµРЅРЅС‹Р№ СЌРєР·РµРјРїР»СЏСЂ СЃРµСЂРІРёСЃР°
export const databaseService = new DatabaseService();

// РРЅРёС†РёР°Р»РёР·РёСЂСѓРµРј Р‘Р” РїСЂРё РёРјРїРѕСЂС‚Рµ
databaseService.init();
