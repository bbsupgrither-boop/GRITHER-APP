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
  
  // Методы
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

  // Загрузка данных пользователя
  const loadUserData = useCallback(async () => {
    if (!telegramId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Получаем данные пользователя
      const userData = databaseService.getUser(telegramId);
      setUser(userData);

      // Получаем достижения
      const userAchievements = databaseService.getUserAchievements(telegramId);
      setAchievements(userAchievements);

      // Получаем задачи
      const userTasks = databaseService.getUserTasks(telegramId);
      setTasks(userTasks);

      // Получаем уведомления
      const userNotifications = databaseService.getUserNotifications(telegramId);
      setNotifications(userNotifications);

      // Получаем статистику
      const userStats = databaseService.getUserStats(telegramId);
      setStats(userStats);

    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
      setError('Ошибка загрузки данных пользователя');
    } finally {
      setIsLoading(false);
    }
  }, [telegramId]);

  // Автоматическая загрузка при изменении telegramId
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Автосохранение данных пользователя
  useEffect(() => {
    if (user) {
      const saveTimeout = setTimeout(() => {
        databaseService.saveUser(user);
      }, 2000); // Сохраняем через 2 секунды после изменений

      return () => clearTimeout(saveTimeout);
    }
  }, [user]);

  // Создание пользователя
  const createUser = useCallback((telegramId: string, name: string, role: UserData['role'], teamNumber?: number): UserData | null => {
    try {
      const newUser = databaseService.createUser(telegramId, name, role, teamNumber);
      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error('Ошибка создания пользователя:', err);
      setError('Ошибка создания пользователя');
      return null;
    }
  }, []);

  // Обновление пользователя
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
      console.error('Ошибка обновления пользователя:', err);
      setError('Ошибка обновления пользователя');
      return false;
    }
  }, []);

  // Обновление прогресса
  const updateProgress = useCallback((telegramId: string, progress: Partial<Pick<UserData, 'level' | 'experience' | 'gCoins' | 'tasksCompleted'>>): boolean => {
    try {
      const success = databaseService.updateUserProgress(telegramId, progress);
      
      if (success) {
        // Обновляем локальное состояние
        const updatedUser = databaseService.getUser(telegramId);
        if (updatedUser) {
          setUser(updatedUser);
          setStats(databaseService.getUserStats(telegramId));
        }
      }
      
      return success;
    } catch (err) {
      console.error('Ошибка обновления прогресса:', err);
      setError('Ошибка обновления прогресса');
      return false;
    }
  }, []);

  // Добавление достижения
  const addAchievement = useCallback((telegramId: string, achievementId: string): boolean => {
    try {
      const success = databaseService.addUserAchievement(telegramId, achievementId);
      
      if (success) {
        // Обновляем локальное состояние
        setUser(databaseService.getUser(telegramId));
        setAchievements(databaseService.getUserAchievements(telegramId));
        setStats(databaseService.getUserStats(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('Ошибка добавления достижения:', err);
      setError('Ошибка добавления достижения');
      return false;
    }
  }, []);

  // Сохранение задачи
  const saveTask = useCallback((task: TaskData): boolean => {
    try {
      const success = databaseService.saveTask(task);
      
      if (success) {
        setTasks(databaseService.getUserTasks(telegramId));
        setStats(databaseService.getUserStats(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('Ошибка сохранения задачи:', err);
      setError('Ошибка сохранения задачи');
      return false;
    }
  }, [telegramId]);

  // Обновление задачи
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
      console.error('Ошибка обновления задачи:', err);
      setError('Ошибка обновления задачи');
      return false;
    }
  }, []);

  // Сохранение уведомления
  const saveNotification = useCallback((notification: NotificationData): boolean => {
    try {
      const success = databaseService.saveNotification(notification);
      
      if (success) {
        setNotifications(databaseService.getUserNotifications(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('Ошибка сохранения уведомления:', err);
      setError('Ошибка сохранения уведомления');
      return false;
    }
  }, [telegramId]);

  // Отметка уведомления как прочитанного
  const markNotificationAsRead = useCallback((telegramId: string, notificationId: string): boolean => {
    try {
      const success = databaseService.markNotificationAsRead(telegramId, notificationId);
      
      if (success) {
        setNotifications(databaseService.getUserNotifications(telegramId));
      }
      
      return success;
    } catch (err) {
      console.error('Ошибка обновления уведомления:', err);
      setError('Ошибка обновления уведомления');
      return false;
    }
  }, []);

  // Обновление данных
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
