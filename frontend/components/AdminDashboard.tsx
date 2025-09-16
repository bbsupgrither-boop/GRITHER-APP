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
      title: 'Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В Р’В°',
      message: 'Р В РІР‚в„ўР В Р’ВµР РЋР вЂљР РЋР С“Р В РЎвЂР РЋР РЏ 1.2.0 Р РЋРЎвЂњР РЋР С“Р В РЎвЂ”Р В Р’ВµР РЋРІвЂљВ¬Р В Р вЂ¦Р В РЎвЂў Р РЋР вЂљР В Р’В°Р В Р’В·Р В Р вЂ Р В Р’ВµР РЋР вЂљР В Р вЂ¦Р РЋРЎвЂњР РЋРІР‚С™Р В Р’В°',
      timestamp: new Date().toISOString(),
      urgent: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Р В РІР‚в„ўР РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР В РЎвЂќР В Р’В°Р РЋР РЏ Р В Р вЂ¦Р В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В°',
      message: 'Р В РЎв„ўР В РЎвЂўР В Р’В»Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂў Р В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“ Р В РЎвЂ”Р РЋР вЂљР В Р’ВµР В Р вЂ Р РЋРІР‚в„–Р РЋРІвЂљВ¬Р В Р’В°Р В Р’ВµР РЋРІР‚С™ Р В РЎвЂўР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В·Р В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      urgent: true
    }
  ]);

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В РЎвЂ
  useEffect(() => {
    loadDashboardStats();
  }, [database]);

  const loadDashboardStats = async () => {
    // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р РЋР вЂљР В Р’ВµР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
    const users = database.users || [];
    const tasks = database.tasks || [];
    const achievements = database.achievements || [];
    const battles = database.battles || [];
    const shopItems = database.shopItems || [];
    const notifications = database.notifications || [];

    // Р В РЎСџР В РЎвЂўР В РўвЂР РЋР С“Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В РЎвЂ
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

  // Р В РІР‚ВР РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ
  const quickActions: QuickAction[] = [
    {
      id: 'emergency_notification',
      title: 'Р В Р’В­Р В РЎвЂќР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ',
      description: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ Р РЋР С“Р В Р’ВµР В РЎВ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏР В РЎВ',
      icon: <Bell className="w-5 h-5" />,
      color: 'bg-red-500',
      action: () => {
        // Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰ Р В РЎВР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В» Р РЋР РЉР В РЎвЂќР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
        console.log('Emergency notification');
      }
    },
    {
      id: 'system_restart',
      title: 'Р В РЎСџР В Р’ВµР РЋР вЂљР В Р’ВµР В Р’В·Р В Р’В°Р В РЎвЂ”Р РЋРЎвЂњР РЋР С“Р В РЎвЂќ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–',
      description: 'Р В РЎС›Р В Р’ВµР РЋРІР‚В¦Р В Р вЂ¦Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂўР В Р’Вµ Р В РЎвЂўР В Р’В±Р РЋР С“Р В Р’В»Р РЋРЎвЂњР В Р’В¶Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'bg-orange-500',
      action: () => {
        // Р В РЎСџР В РЎвЂўР В РўвЂР РЋРІР‚С™Р В Р вЂ Р В Р’ВµР РЋР вЂљР В Р’В¶Р В РўвЂР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р’В·Р В Р’В°Р В РЎвЂ”Р РЋРЎвЂњР РЋР С“Р В РЎвЂќР В Р’В°
        console.log('System restart');
      }
    },
    {
      id: 'export_data',
      title: 'Р В Р’В­Р В РЎвЂќР РЋР С“Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦',
      description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В РЎвЂ',
      icon: <Download className="w-5 h-5" />,
      color: 'bg-blue-500',
      action: () => {
        // Р В Р’В­Р В РЎвЂќР РЋР С“Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР РЋРІР‚С™ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
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
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В РЎСџР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰ Р РЋРЎвЂњР В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В РЎвЂєР В Р’В±Р В Р’В·Р В РЎвЂўР РЋР вЂљ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„– Р В РЎвЂ Р В Р’В±Р РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ
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

      {/* Р В РЎвЂ™Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂР В Р’Вµ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќР В РЎвЂ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ */}
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
              +{stats.newRegistrations} Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р РЋРІР‚В¦
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ</h3>
            <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
          </div>
        </div>

        {/* Р В Р’В¤Р В РЎвЂР В Р вЂ¦Р В Р’В°Р В Р вЂ¦Р РЋР С“Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР РЏ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° */}
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
              +{stats.dailyTransactions} Р В Р’В·Р В Р’В° Р В РўвЂР В Р’ВµР В Р вЂ¦Р РЋР Р‰
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Р В РЎвЂєР В Р’В±Р РЋРІР‚В°Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂўР В Р’В±Р В РЎвЂўР РЋР вЂљР В РЎвЂўР РЋРІР‚С™</h3>
            <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} Р Р†РІР‚С™Р вЂ¦</p>
          </div>
        </div>

        {/* Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ */}
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
              {stats.failedTasks} Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ</h3>
            <p className="text-2xl font-bold">{stats.completedTasks}</p>
          </div>
        </div>

        {/* Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
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
              +{stats.recentAchievements} Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р РЋРІР‚В¦
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Р В РЎСџР В РЎвЂўР В РЎвЂ”Р РЋРЎвЂњР В Р’В»Р РЋР РЏР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ</h3>
            <p className="text-2xl font-bold">{stats.popularAchievements}</p>
          </div>
        </div>

        {/* Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„– */}
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
              {stats.totalBets.toLocaleString()} Р Р†РІР‚С™Р вЂ¦ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В РЎвЂўР В РЎвЂќ
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–</h3>
            <p className="text-2xl font-bold">{stats.activeBattles}</p>
          </div>
        </div>

        {/* Р В РЎС™Р В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦ */}
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
              {stats.popularItems} Р В РЎвЂ”Р В РЎвЂўР В РЎвЂ”Р РЋРЎвЂњР В Р’В»Р РЋР РЏР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
            </span>
          </div>
          <div>
            <h3 className="text-sm opacity-70 mb-1">Р В РЎСџР РЋР вЂљР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В¶Р В РЎвЂ</h3>
            <p className="text-2xl font-bold">{stats.shopSales}</p>
          </div>
        </div>
      </div>

      {/* Р В РІР‚ВР РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
          Р В РІР‚ВР РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ
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

      {/* Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
          Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
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
                Р вЂњРІР‚вЂќ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};