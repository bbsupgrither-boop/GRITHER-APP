// Простая система базы данных на localStorage
// В будущем можно заменить на реальную БД

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
  achievements: string[]; // ID достижений
  tasksCompleted: number;
  lastActive: string;
  createdAt: string;
  isActive: boolean;
  achievementsCount: number;
  totalSpent: number;
}

export interface AchievementData {
  id: string;
  userId?: string; // Для системных достижений может быть undefined
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
  progress?: number; // Для пользовательских достижений
  completed?: boolean; // Для пользовательских достижений
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

  // Инициализация базы данных
  init() {
    const dbVersion = localStorage.getItem(`${this.DB_PREFIX}version`);
    if (!dbVersion) {
      this.migrateFromOldSystem();
      localStorage.setItem(`${this.DB_PREFIX}version`, this.DB_VERSION);
    }
  }

  // Миграция данных из старой системы
  private migrateFromOldSystem() {
    console.log('🔄 Миграция данных из старой системы...');
    
    // Здесь можно добавить логику миграции данных
    // Например, перенос данных из mock данных в новую структуру
  }

  // === ПОЛЬЗОВАТЕЛИ ===

  // Получить данные пользователя
  getUser(telegramId: string): UserData | null {
    try {
      const userData = localStorage.getItem(`${this.DB_PREFIX}user_${telegramId}`);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error);
      return null;
    }
  }

  // Создать или обновить пользователя
  saveUser(userData: UserData): boolean {
    try {
      userData.lastActive = new Date().toISOString();
      localStorage.setItem(`${this.DB_PREFIX}user_${userData.telegramId}`, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения пользователя:', error);
      return false;
    }
  }

  // Создать нового пользователя
  createUser(telegramId: string, name: string, role: UserData['role'], teamNumber?: number): UserData {
    const newUser: UserData = {
      telegramId,
      name,
      role,
      teamNumber,
      level: 1,
      experience: 0,
      gCoins: 100, // Стартовые монеты
      achievements: [],
      tasksCompleted: 0,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.saveUser(newUser);
    return newUser;
  }

  // Обновить прогресс пользователя
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

  // Добавить достижение пользователю
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

  // === ДОСТИЖЕНИЯ ===

  // Получить достижения пользователя
  getUserAchievements(telegramId: string): AchievementData[] {
    try {
      const achievements = localStorage.getItem(`${this.DB_PREFIX}achievements_${telegramId}`);
      return achievements ? JSON.parse(achievements) : [];
    } catch (error) {
      console.error('Ошибка получения достижений:', error);
      return [];
    }
  }

  // Сохранить достижение
  saveAchievement(achievement: AchievementData): boolean {
    try {
      const existing = this.getUserAchievements(achievement.userId);
      const updated = existing.filter(a => a.id !== achievement.id);
      updated.push(achievement);
      
      localStorage.setItem(`${this.DB_PREFIX}achievements_${achievement.userId}`, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения достижения:', error);
      return false;
    }
  }

  // === ЗАДАЧИ ===

  // Получить задачи пользователя
  getUserTasks(telegramId: string): TaskData[] {
    try {
      const tasks = localStorage.getItem(`${this.DB_PREFIX}tasks_${telegramId}`);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Ошибка получения задач:', error);
      return [];
    }
  }

  // Сохранить задачу
  saveTask(task: TaskData): boolean {
    try {
      const existing = this.getUserTasks(task.userId);
      const updated = existing.filter(t => t.id !== task.id);
      updated.push(task);
      
      localStorage.setItem(`${this.DB_PREFIX}tasks_${task.userId}`, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения задачи:', error);
      return false;
    }
  }

  // === УВЕДОМЛЕНИЯ ===

  // Получить уведомления пользователя
  getUserNotifications(telegramId: string): NotificationData[] {
    try {
      const notifications = localStorage.getItem(`${this.DB_PREFIX}notifications_${telegramId}`);
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('Ошибка получения уведомлений:', error);
      return [];
    }
  }

  // Сохранить уведомление
  saveNotification(notification: NotificationData): boolean {
    try {
      const existing = this.getUserNotifications(notification.userId);
      existing.push(notification);
      
      // Ограничиваем количество уведомлений (последние 100)
      const limited = existing.slice(-100);
      
      localStorage.setItem(`${this.DB_PREFIX}notifications_${notification.userId}`, JSON.stringify(limited));
      return true;
    } catch (error) {
      console.error('Ошибка сохранения уведомления:', error);
      return false;
    }
  }

  // Отметить уведомление как прочитанное
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
      console.error('Ошибка обновления уведомления:', error);
      return false;
    }
  }

  // === СИСТЕМНЫЕ ФУНКЦИИ ===

  // Получить статистику пользователя
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

  // Очистить все данные пользователя (для тестирования)
  clearUserData(telegramId: string): boolean {
    try {
      localStorage.removeItem(`${this.DB_PREFIX}user_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}achievements_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}tasks_${telegramId}`);
      localStorage.removeItem(`${this.DB_PREFIX}notifications_${telegramId}`);
      return true;
    } catch (error) {
      console.error('Ошибка очистки данных:', error);
      return false;
    }
  }

  // Экспорт данных пользователя
  exportUserData(telegramId: string) {
    return {
      user: this.getUser(telegramId),
      achievements: this.getUserAchievements(telegramId),
      tasks: this.getUserTasks(telegramId),
      notifications: this.getUserNotifications(telegramId),
      stats: this.getUserStats(telegramId)
    };
  }

  // Импорт данных пользователя
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
      console.error('Ошибка импорта данных:', error);
      return false;
    }
  }
}

// Создаем единственный экземпляр сервиса
export const databaseService = new DatabaseService();

// Инициализируем БД при импорте
databaseService.init();
