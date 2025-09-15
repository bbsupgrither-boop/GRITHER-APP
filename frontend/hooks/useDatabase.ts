import { useState, useEffect, useCallback } from 'react';
import { databaseService, UserData, AchievementData, TaskData, NotificationData, BattleData } from '../services/database';

interface UseDatabaseReturn {
  user: UserData | null;
  achievements: AchievementData[];
  tasks: TaskData[];
  notifications: NotificationData[];
  stats: any;
  isLoading: boolean;
  error: string | null;
  
  // РњРµС‚РѕРґС‹
  createUser: (telegramId: string, name: string, role: UserData['role'], teamNumber?: number) => UserData | null;
  updateUser: (telegramId: string, updates: Partial<UserData>) => boolean;
  updateProgress: (telegramId: string, progress: Partial<Pick<UserData, 'level' | 'experience' | 'gCoins' | 'tasksCompleted'>>) => boolean;
  addAchievement: (telegramId: string, achievementId: string) => boolean;
  saveTask: (task: TaskData) => boolean;
  updateTask: (telegramId: string, taskId: string, updates: Partial<TaskData>) => boolean;
  saveNotification: (notification: NotificationData) => boolean;
  markNotificationAsRead: (telegramId: string, notificationId: string) => boolean;
  refreshData: () => void;
}

export const useDatabase = (telegramId: string): UseDatabaseReturn => {
  const [user, setUser] = useState<UserData | null>(null);
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Р—Р°РіСЂСѓР·РєР° РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  const loadUserData = useCallback(async () => {
    if (!telegramId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // РџРѕР»СѓС‡Р°РµРј РґР°РЅРЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
      const userData = databaseService.getUser(telegramId);
      setUser(userData);

      // РџРѕР»СѓС‡Р°РµРј РґРѕСЃС‚РёР¶РµРЅРёСЏ
      const userAchievements = databaseService.getUserAchievements(telegramId);
      setAchievements(userAchievements);

      // РџРѕР»СѓС‡Р°РµРј Р·Р°РґР°С‡Рё
      const userTasks = databaseService.getUserTasks(telegramId);
      setTasks(userTasks);

      // РџРѕР»СѓС‡Р°РµРј СѓРІРµРґРѕРјР»РµРЅРёСЏ
      const userNotifications = databaseService.getUserNotifications(telegramId);
      setNotifications(userNotifications);

      // РџРѕР»СѓС‡Р°РµРј СЃС‚Р°С‚РёСЃС‚РёРєСѓ
      const userStats = databaseService.getUserStats(telegramId);
      setStats(userStats);

    } catch (err) {
      console.error('РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РґР°РЅРЅС‹С…:', err);
      setError('РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ');
    } finally {
      setIsLoading(false);
    }
  }, [telegramId]);

  // РђРІС‚РѕРјР°С‚РёС‡РµСЃРєР°СЏ Р·Р°РіСЂСѓР·РєР° РїСЂРё РёР·РјРµРЅРµРЅРёРё telegramId
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // РђРІС‚РѕСЃРѕС…СЂР°РЅРµРЅРёРµ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  useEffect(() => {
    if (user) {
      const saveTimeout = setTimeout(() => {
        databaseService.saveUser(user);
      }, 2000); // РЎРѕС…СЂР°РЅСЏРµРј С‡РµСЂРµР· 2 СЃРµРєСѓРЅРґС‹ РїРѕСЃР»Рµ РёР·РјРµРЅРµРЅРёР№

      return () => clearTimeout(saveTimeout);
    }
  }, [user]);

  // РЎРѕР·РґР°РЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  const createUser = useCallback((telegramId: string, name: string, role: UserData['role'], teamNumber?: number): UserData | null => {
    try {
      const newUser = databaseService.createUser(telegramId, name, role, teamNumber);
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error('РћС€РёР±РєР° СЃРѕР·РґР°РЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ:', err);
      setError('РћС€РёР±РєР° СЃРѕР·РґР°РЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ');
      return null;
    }
  }, []);

  // РћР±РЅРѕРІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  const updateUser = useCallback((telegramId: string, updates: Partial<UserData>): boolean => {
    try {
      const currentUser = databaseService.getUser(telegramId);
      if (!currentUser) return false;

      const updatedUser = { ...currentUser, ...updates };
      const success = databaseService.saveUser(updatedUser);
      
      if (success) {
        setUser(updatedUser);
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ:', err);
      setError('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ');
      return false;
    }
  }, []);

  // РћР±РЅРѕРІР»РµРЅРёРµ РїСЂРѕРіСЂРµСЃСЃР°
  const updateProgress = useCallback((telegramId: string, progress: Partial<Pick<UserData, 'level' | 'experience' | 'gCoins' | 'tasksCompleted'>>): boolean => {
    try {
      const success = databaseService.updateUserProgress(telegramId, progress);
      
      if (success) {
        // РћР±РЅРѕРІР»СЏРµРј Р»РѕРєР°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ
        const updatedUser = databaseService.getUser(telegramId);
        if (updatedUser) {
          setUser(updatedUser);
          setStats(databaseService.getUserStats(telegramId));
        }
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ РїСЂРѕРіСЂРµСЃСЃР°:', err);
      setError('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ РїСЂРѕРіСЂРµСЃСЃР°');
      return false;
    }
  }, []);

  // Р”РѕР±Р°РІР»РµРЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёСЏ
  const addAchievement = useCallback((telegramId: string, achievementId: string): boolean => {
    try {
      const success = databaseService.addUserAchievement(telegramId, achievementId);
      
      if (success) {
        // РћР±РЅРѕРІР»СЏРµРј Р»РѕРєР°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ
        setUser(databaseService.getUser(telegramId));
        setAchievements(databaseService.getUserAchievements(telegramId));
        setStats(databaseService.getUserStats(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° РґРѕР±Р°РІР»РµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ:', err);
      setError('РћС€РёР±РєР° РґРѕР±Р°РІР»РµРЅРёСЏ РґРѕСЃС‚РёР¶РµРЅРёСЏ');
      return false;
    }
  }, []);

  // РЎРѕС…СЂР°РЅРµРЅРёРµ Р·Р°РґР°С‡Рё
  const saveTask = useCallback((task: TaskData): boolean => {
    try {
      const success = databaseService.saveTask(task);
      
      if (success) {
        setTasks(databaseService.getUserTasks(telegramId));
        setStats(databaseService.getUserStats(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ Р·Р°РґР°С‡Рё:', err);
      setError('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ Р·Р°РґР°С‡Рё');
      return false;
    }
  }, [telegramId]);

  // РћР±РЅРѕРІР»РµРЅРёРµ Р·Р°РґР°С‡Рё
  const updateTask = useCallback((telegramId: string, taskId: string, updates: Partial<TaskData>): boolean => {
    try {
      const tasks = databaseService.getUserTasks(telegramId);
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex === -1) return false;
      
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
      const success = databaseService.saveTask(tasks[taskIndex]);
      
      if (success) {
        setTasks(tasks);
        setStats(databaseService.getUserStats(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ Р·Р°РґР°С‡Рё:', err);
      setError('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ Р·Р°РґР°С‡Рё');
      return false;
    }
  }, []);

  // РЎРѕС…СЂР°РЅРµРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёСЏ
  const saveNotification = useCallback((notification: NotificationData): boolean => {
    try {
      const success = databaseService.saveNotification(notification);
      
      if (success) {
        setNotifications(databaseService.getUserNotifications(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ:', err);
      setError('РћС€РёР±РєР° СЃРѕС…СЂР°РЅРµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ');
      return false;
    }
  }, [telegramId]);

  // РћС‚РјРµС‚РєР° СѓРІРµРґРѕРјР»РµРЅРёСЏ РєР°Рє РїСЂРѕС‡РёС‚Р°РЅРЅРѕРіРѕ
  const markNotificationAsRead = useCallback((telegramId: string, notificationId: string): boolean => {
    try {
      const success = databaseService.markNotificationAsRead(telegramId, notificationId);
      
      if (success) {
        setNotifications(databaseService.getUserNotifications(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ:', err);
      setError('РћС€РёР±РєР° РѕР±РЅРѕРІР»РµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏ');
      return false;
    }
  }, []);

  // РћР±РЅРѕРІР»РµРЅРёРµ РґР°РЅРЅС‹С…
  const refreshData = useCallback(() => {
    loadUserData();
  }, [loadUserData]);

  return {
    user,
    achievements,
    tasks,
    notifications,
    stats,
    isLoading,
    error,
    createUser,
    updateUser,
    updateProgress,
    addAchievement,
    saveTask,
    updateTask,
    saveNotification,
    markNotificationAsRead,
    refreshData
  };
};
