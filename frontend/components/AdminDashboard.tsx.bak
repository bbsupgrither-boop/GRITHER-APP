import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  CheckSquare, 
  Trophy, 
  Swords, 
  ShoppingBag,
  Bell,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  Star,
  Zap,
  Download,
  RefreshCw
} from 'lucide-react';
import { databaseService } from '../services/database';
import { useAdminDatabase } from '../hooks/useAdminDatabase';

interface AdminDashboardProps {
  theme: 'light' | 'dark';
  onNavigate: (section: string) => void;
}

interface DashboardStats {
  activeUsers: number;
  newRegistrations: number;
  totalRevenue: number;
  dailyTransactions: number;
  completedTasks: number;
  failedTasks: number;
  popularAchievements: number;
  recentAchievements: number;
  activeBattles: number;
  totalBets: number;
  shopSales: number;
  popularItems: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

interface SystemNotification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  urgent: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ theme, onNavigate }) => {
  const { database, updateDatabase } = useAdminDatabase();
  
  const [stats, setStats] = useState<DashboardStats>({
    activeUsers: 0,
    newRegistrations: 0,
    totalRevenue: 0,
    dailyTransactions: 0,
    completedTasks: 0,
    failedTasks: 0,
    popularAchievements: 0,
    recentAchievements: 0,
    activeBattles: 0,
    totalBets: 0,
    shopSales: 0,
    popularItems: 0
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: '1',
      type: 'info',
      title: 'Система обновлена',
      message: 'Версия 1.2.0 успешно развернута',
      timestamp: new Date().toISOString(),
      urgent: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Высокая нагрузка',
      message: 'Количество активных пользователей превышает обычные значения',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      urgent: true
    }
  ]);

  // Загрузка статистики
  useEffect(() => {
    loadDashboardStats();
  }, [database]);

  const loadDashboardStats = async () => {
    // Загрузка реальных данных из базы данных
    const users = database.users || [];
    const tasks = database.tasks || [];
    const achievements = database.achievements || [];
    const battles = database.battles || [];
    const shopItems = database.shopItems || [];
    const notifications = database.notifications || [];

    // Подсчет статистики
    const activeUsers = users.filter(user => user.lastActive && 
      new Date(user.lastActive).getTime() > Date.now() - 24 * 60 * 60 * 1000).length;
    
    const newRegistrations = users.filter(user => user.createdAt && 
      new Date(user.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000).length;
    
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const failedTasks = tasks.filter(task => task.status === 'failed').length;
    
    const activeBattles = battles.filter(battle => battle.status === 'active').length;
    
    const totalRevenue = users.reduce((sum, user) => sum + (user.gCoins || 0), 0);
    const dailyTransactions = notifications.filter(notif => 
      notif.type === 'transaction' && notif.createdAt &&
      new Date(notif.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length;

    const realStats: DashboardStats = {
      activeUsers,
      newRegistrations,
      totalRevenue,
      dailyTransactions,
      completedTasks,
      failedTasks,
      popularAchievements: achievements.length,
      recentAchievements: achievements.filter(ach => 
        ach.createdAt && new Date(ach.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      ).length,
      activeBattles,
      totalBets: battles.reduce((sum, battle) => sum + (battle.totalBets || 0), 0),
      shopSales: shopItems.length,
      popularItems: shopItems.filter(item => item.isPopular).length
    };
    
    setStats(realStats);
  };

  // Быстрые действия
  const quickActions: QuickAction[] = [
    {
      id: 'emergency_notification',
      title: 'Экстренное уведомление',
      description: 'Отправить всем пользователям',
      icon: <Bell className="w-5 h-5" />,
      color: 'bg-red-500',
      action: () => {
        // Открыть модал экстренного уведомления
        console.log('Emergency notification');
      }
    },
    {
      id: 'system_restart',
      title: 'Перезапуск системы',
      description: 'Техническое обслуживание',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'bg-orange-500',
      action: () => {
        // Подтверждение перезапуска
        console.log('System restart');
      }
    },
    {
      id: 'export_data',
      title: 'Экспорт данных',
      description: 'Выгрузка статистики',
      icon: <Download className="w-5 h-5" />,
      color: 'bg-blue-500',
      action: () => {
        // Экспорт данных
        console.log('Export data');
      }
    }
  ];

  const handleQuickAction = (action: QuickAction) => {
    action.action();
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Панель управления
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Обзор системы и быстрые действия
          </p>
        </div>
        <button
          onClick={() => loadDashboardStats()}
          className="p-2 rounded-lg hover:bg-opacity-10"
          style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
          }}
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Аналитические блоки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Активные пользователи */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500 bg-opacity-20">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500 bg-opacity-20 text-green-500">
              +{stats.newRegistrations} новых
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Активные пользователи</h3>
            <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
          </div>
        </div>

        {/* Финансовая статистика */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500 bg-opacity-20">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500 bg-opacity-20 text-green-500">
              +{stats.dailyTransactions} за день
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Общий оборот</h3>
            <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} ₽</p>
          </div>
        </div>

        {/* Статистика заданий */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500 bg-opacity-20">
              <CheckSquare className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-red-500 bg-opacity-20 text-red-500">
              {stats.failedTasks} провальных
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Выполненные задачи</h3>
            <p className="text-2xl font-bold">{stats.completedTasks}</p>
          </div>
        </div>

        {/* Достижения */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-500 bg-opacity-20">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-500 bg-opacity-20 text-blue-500">
              +{stats.recentAchievements} новых
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Популярные достижения</h3>
            <p className="text-2xl font-bold">{stats.popularAchievements}</p>
          </div>
        </div>

        {/* Баттлы */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-500 bg-opacity-20">
              <Swords className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-500 bg-opacity-20 text-orange-500">
              {stats.totalBets.toLocaleString()} ₽ ставок
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Активные баттлы</h3>
            <p className="text-2xl font-bold">{stats.activeBattles}</p>
          </div>
        </div>

        {/* Магазин */}
        <div 
          className="p-6 rounded-xl"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-indigo-500 bg-opacity-20">
              <ShoppingBag className="w-6 h-6 text-indigo-500" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-500 bg-opacity-20 text-indigo-500">
              {stats.popularItems} популярных
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Продажи</h3>
            <p className="text-2xl font-bold">{stats.shopSales}</p>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
          Быстрые действия
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action)}
              className="p-4 rounded-xl text-left transition-all hover:scale-105"
              style={{
                backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
              }}
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg ${action.color} bg-opacity-20 mr-3`}>
                  {action.icon}
                </div>
                <h3 className="font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  {action.title}
                </h3>
              </div>
              <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Системные уведомления */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
          Системные уведомления
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
                borderLeft: notification.urgent ? '4px solid #FF3B30' : undefined
              }}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-lg mr-3"
                  style={{
                    backgroundColor: notification.type === 'error' ? 'rgba(255, 59, 48, 0.2)' :
                                   notification.type === 'warning' ? 'rgba(255, 149, 0, 0.2)' :
                                   notification.type === 'success' ? 'rgba(52, 199, 89, 0.2)' :
                                   'rgba(0, 122, 255, 0.2)'
                  }}
                >
                  {notification.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                  {notification.type === 'success' && <CheckSquare className="w-5 h-5 text-green-500" />}
                  {notification.type === 'info' && <Bell className="w-5 h-5 text-blue-500" />}
                </div>
                <div>
                  <h4 className="font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    {notification.title}
                  </h4>
                  <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {notification.message}
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="p-1 rounded-lg hover:bg-opacity-10"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};