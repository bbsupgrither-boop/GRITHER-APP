import { useState, useEffect, useCallback } from 'react';
import { databaseService, UserData, AchievementData, TaskData, NotificationData, BattleData } from '../services/database';

export interface ShopItemData {
  id: string;
  name: string;
  description: string;
  category: 'cases' | 'boosters' | 'cosmetics' | 'exclusive';
  price: number;
  image: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isActive: boolean;
  salesCount: number;
  popularity: number;
  createdAt: string;
}

export interface AppDatabase {
  users: UserData[];
  achievements: AchievementData[];
  tasks: TaskData[];
  battles: BattleData[];
  shopItems: ShopItemData[];
  notifications: NotificationData[];
}

interface UseAdminDatabaseReturn {
  database: AppDatabase;
  updateDatabase: (updates: Partial<AppDatabase>) => void;
  isLoading: boolean;
  error: string | null;
  
  // Методы для работы с данными
  addUser: (user: UserData) => boolean;
  updateUser: (userId: string, updates: Partial<UserData>) => boolean;
  deleteUser: (userId: string) => boolean;
  
  addAchievement: (achievement: AchievementData) => boolean;
  updateAchievement: (achievementId: string, updates: Partial<AchievementData>) => boolean;
  deleteAchievement: (achievementId: string) => boolean;
  
  addTask: (task: TaskData) => boolean;
  updateTask: (taskId: string, updates: Partial<TaskData>) => boolean;
  deleteTask: (taskId: string) => boolean;
  
  addBattle: (battle: BattleData) => boolean;
  updateBattle: (battleId: string, updates: Partial<BattleData>) => boolean;
  deleteBattle: (battleId: string) => boolean;
  
  addShopItem: (item: ShopItemData) => boolean;
  updateShopItem: (itemId: string, updates: Partial<ShopItemData>) => boolean;
  deleteShopItem: (itemId: string) => boolean;
  
  addNotification: (notification: NotificationData) => boolean;
  updateNotification: (notificationId: string, updates: Partial<NotificationData>) => boolean;
  deleteNotification: (notificationId: string) => boolean;
}

export const useAdminDatabase = (): UseAdminDatabaseReturn => {
  const [database, setDatabase] = useState<AppDatabase>({
    users: [],
    achievements: [],
    tasks: [],
    battles: [],
    shopItems: [],
    notifications: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка всех данных из localStorage
  const loadDatabase = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);

      // Получаем все данные из localStorage
      const users: UserData[] = [];
      const achievements: AchievementData[] = [];
      const tasks: TaskData[] = [];
      const battles: BattleData[] = [];
      const shopItems: ShopItemData[] = [];
      const notifications: NotificationData[] = [];

      // Получаем пользователей
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('grither_db_user_')) {
          const userData = localStorage.getItem(key);
          if (userData) {
            users.push(JSON.parse(userData));
          }
        }
      }

      // Получаем достижения
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('grither_db_achievement_')) {
          const achievementData = localStorage.getItem(key);
          if (achievementData) {
            achievements.push(JSON.parse(achievementData));
          }
        }
      }

      // Получаем задачи
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('grither_db_task_')) {
          const taskData = localStorage.getItem(key);
          if (taskData) {
            tasks.push(JSON.parse(taskData));
          }
        }
      }

      // Получаем баттлы
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('grither_db_battle_')) {
          const battleData = localStorage.getItem(key);
          if (battleData) {
            battles.push(JSON.parse(battleData));
          }
        }
      }

      // Получаем товары магазина
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('grither_db_shop_')) {
          const shopData = localStorage.getItem(key);
          if (shopData) {
            shopItems.push(JSON.parse(shopData));
          }
        }
      }

      // Получаем уведомления
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('grither_db_notification_')) {
          const notificationData = localStorage.getItem(key);
          if (notificationData) {
            notifications.push(JSON.parse(notificationData));
          }
        }
      }

      setDatabase({
        users,
        achievements,
        tasks,
        battles,
        shopItems,
        notifications
      });

    } catch (err) {
      console.error('Ошибка загрузки базы данных:', err);
      setError('Ошибка загрузки базы данных');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Автоматическая загрузка при монтировании
  useEffect(() => {
    loadDatabase();
  }, [loadDatabase]);

  // Обновление базы данных
  const updateDatabase = useCallback((updates: Partial<AppDatabase>) => {
    setDatabase(prev => ({ ...prev, ...updates }));
  }, []);

  // Методы для работы с пользователями
  const addUser = useCallback((user: UserData): boolean => {
    try {
      const success = databaseService.saveUser(user);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка добавления пользователя:', err);
      return false;
    }
  }, [loadDatabase]);

  const updateUser = useCallback((userId: string, updates: Partial<UserData>): boolean => {
    try {
      const user = database.users.find(u => u.telegramId === userId);
      if (!user) return false;

      const updatedUser = { ...user, ...updates };
      const success = databaseService.saveUser(updatedUser);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка обновления пользователя:', err);
      return false;
    }
  }, [database.users, loadDatabase]);

  const deleteUser = useCallback((userId: string): boolean => {
    try {
      localStorage.removeItem(`grither_db_user_${userId}`);
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка удаления пользователя:', err);
      return false;
    }
  }, [loadDatabase]);

  // Методы для работы с достижениями
  const addAchievement = useCallback((achievement: AchievementData): boolean => {
    try {
      const success = databaseService.saveAchievement(achievement);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка добавления достижения:', err);
      return false;
    }
  }, [loadDatabase]);

  const updateAchievement = useCallback((achievementId: string, updates: Partial<AchievementData>): boolean => {
    try {
      const achievement = database.achievements.find(a => a.id === achievementId);
      if (!achievement) return false;

      const updatedAchievement = { ...achievement, ...updates };
      const success = databaseService.saveAchievement(updatedAchievement);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка обновления достижения:', err);
      return false;
    }
  }, [database.achievements, loadDatabase]);

  const deleteAchievement = useCallback((achievementId: string): boolean => {
    try {
      localStorage.removeItem(`grither_db_achievement_${achievementId}`);
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка удаления достижения:', err);
      return false;
    }
  }, [loadDatabase]);

  // Методы для работы с задачами
  const addTask = useCallback((task: TaskData): boolean => {
    try {
      const success = databaseService.saveTask(task);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка добавления задачи:', err);
      return false;
    }
  }, [loadDatabase]);

  const updateTask = useCallback((taskId: string, updates: Partial<TaskData>): boolean => {
    try {
      const task = database.tasks.find(t => t.id === taskId);
      if (!task) return false;

      const updatedTask = { ...task, ...updates };
      const success = databaseService.saveTask(updatedTask);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка обновления задачи:', err);
      return false;
    }
  }, [database.tasks, loadDatabase]);

  const deleteTask = useCallback((taskId: string): boolean => {
    try {
      localStorage.removeItem(`grither_db_task_${taskId}`);
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка удаления задачи:', err);
      return false;
    }
  }, [loadDatabase]);

  // Методы для работы с баттлами
  const addBattle = useCallback((battle: BattleData): boolean => {
    try {
      localStorage.setItem(`grither_db_battle_${battle.id}`, JSON.stringify(battle));
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка добавления баттла:', err);
      return false;
    }
  }, [loadDatabase]);

  const updateBattle = useCallback((battleId: string, updates: Partial<BattleData>): boolean => {
    try {
      const battle = database.battles.find(b => b.id === battleId);
      if (!battle) return false;

      const updatedBattle = { ...battle, ...updates };
      localStorage.setItem(`grither_db_battle_${battleId}`, JSON.stringify(updatedBattle));
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка обновления баттла:', err);
      return false;
    }
  }, [database.battles, loadDatabase]);

  const deleteBattle = useCallback((battleId: string): boolean => {
    try {
      localStorage.removeItem(`grither_db_battle_${battleId}`);
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка удаления баттла:', err);
      return false;
    }
  }, [loadDatabase]);

  // Методы для работы с товарами магазина
  const addShopItem = useCallback((item: ShopItemData): boolean => {
    try {
      localStorage.setItem(`grither_db_shop_${item.id}`, JSON.stringify(item));
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка добавления товара:', err);
      return false;
    }
  }, [loadDatabase]);

  const updateShopItem = useCallback((itemId: string, updates: Partial<ShopItemData>): boolean => {
    try {
      const item = database.shopItems.find(i => i.id === itemId);
      if (!item) return false;

      const updatedItem = { ...item, ...updates };
      localStorage.setItem(`grither_db_shop_${itemId}`, JSON.stringify(updatedItem));
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка обновления товара:', err);
      return false;
    }
  }, [database.shopItems, loadDatabase]);

  const deleteShopItem = useCallback((itemId: string): boolean => {
    try {
      localStorage.removeItem(`grither_db_shop_${itemId}`);
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка удаления товара:', err);
      return false;
    }
  }, [loadDatabase]);

  // Методы для работы с уведомлениями
  const addNotification = useCallback((notification: NotificationData): boolean => {
    try {
      const success = databaseService.saveNotification(notification);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка добавления уведомления:', err);
      return false;
    }
  }, [loadDatabase]);

  const updateNotification = useCallback((notificationId: string, updates: Partial<NotificationData>): boolean => {
    try {
      const notification = database.notifications.find(n => n.id === notificationId);
      if (!notification) return false;

      const updatedNotification = { ...notification, ...updates };
      const success = databaseService.saveNotification(updatedNotification);
      if (success) {
        loadDatabase();
      }
      return success;
    } catch (err) {
      console.error('Ошибка обновления уведомления:', err);
      return false;
    }
  }, [database.notifications, loadDatabase]);

  const deleteNotification = useCallback((notificationId: string): boolean => {
    try {
      localStorage.removeItem(`grither_db_notification_${notificationId}`);
      loadDatabase();
      return true;
    } catch (err) {
      console.error('Ошибка удаления уведомления:', err);
      return false;
    }
  }, [loadDatabase]);

  return {
    database,
    updateDatabase,
    isLoading,
    error,
    addUser,
    updateUser,
    deleteUser,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addTask,
    updateTask,
    deleteTask,
    addBattle,
    updateBattle,
    deleteBattle,
    addShopItem,
    updateShopItem,
    deleteShopItem,
    addNotification,
    updateNotification,
    deleteNotification
  };
};
