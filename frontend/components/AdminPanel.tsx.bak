import React, { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { 
  Shield, 
  Users, 
  Trophy, 
  Package, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  UserPlus,
  UserMinus,
  Edit3,
  Trash2,
  Plus,
  X,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  ShoppingBag,
  FileText
} from 'lucide-react';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
}

type AdminTab = 'users' | 'battles' | 'shop' | 'analytics' | 'settings' | 'content';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onNavigate,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data
  const mockUsers = [
    { id: '1', name: 'Иван Иванов', email: 'ivan@example.com', role: 'user', status: 'active', joinDate: '2024-01-15', level: 5, balance: 1200 },
    { id: '2', name: 'Петр Петров', email: 'petr@example.com', role: 'user', status: 'active', joinDate: '2024-02-20', level: 8, balance: 2500 },
    { id: '3', name: 'Анна Смирнова', email: 'anna@example.com', role: 'admin', status: 'active', joinDate: '2024-01-10', level: 15, balance: 5000 },
    { id: '4', name: 'Сергей Козлов', email: 'sergey@example.com', role: 'user', status: 'banned', joinDate: '2024-03-05', level: 3, balance: 300 }
  ];

  const mockBattles = [
    { id: '1', title: 'Турнир по программированию', participants: 25, prize: 1000, status: 'active', startDate: '2024-12-20', endDate: '2024-12-22' },
    { id: '2', title: 'Конкурс дизайна', participants: 15, prize: 500, status: 'completed', startDate: '2024-12-15', endDate: '2024-12-17' },
    { id: '3', title: 'Марафон задач', participants: 50, prize: 2000, status: 'upcoming', startDate: '2024-12-25', endDate: '2024-12-26' }
  ];

  const mockShopItems = [
    { id: '1', name: 'Обычный кейс', price: 100, category: 'cases', status: 'active', sales: 150 },
    { id: '2', name: 'Редкий кейс', price: 500, category: 'cases', status: 'active', sales: 75 },
    { id: '3', name: 'Премиум подписка', price: 1000, category: 'subscription', status: 'active', sales: 30 }
  ];

  const mockAnalytics = {
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45600,
    battlesCompleted: 234,
    averageSessionTime: '24:35',
    topPerformer: 'Анна Смирнова'
  };

  const handleModalOpen = (type: string, item?: any) => {
    setModalType(type);
    setSelectedItem(item || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType('');
    setSelectedItem(null);
  };

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user ${userId}`);
    handleModalClose();
  };

  const handleBattleAction = (action: string, battleId: string) => {
    console.log(`${action} battle ${battleId}`);
    handleModalClose();
  };

  const handleShopAction = (action: string, itemId: string) => {
    console.log(`${action} shop item ${itemId}`);
    handleModalClose();
  };

  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={() => {}}
        theme={theme}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        {/* Admin Header */}
        <div className={`p-6 rounded-3xl border mb-6 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Панель администратора</h1>
              <p className="text-sm text-gray-400">Управление системой</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-blue-500">{mockAnalytics.totalUsers}</div>
              <div className="text-sm text-gray-400">Пользователей</div>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-green-500">{mockAnalytics.totalRevenue}</div>
              <div className="text-sm text-gray-400">Доход (₽)</div>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className={`p-1 rounded-2xl border mb-6 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="grid grid-cols-3 gap-1">
            {[
              { key: 'users', label: 'Пользователи', icon: Users },
              { key: 'battles', label: 'Баттлы', icon: Trophy },
              { key: 'shop', label: 'Магазин', icon: ShoppingBag },
              { key: 'analytics', label: 'Аналитика', icon: BarChart3 },
              { key: 'settings', label: 'Настройки', icon: Settings },
              { key: 'content', label: 'Контент', icon: FileText }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as AdminTab)}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all text-xs ${
                  activeTab === key
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-white/10'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Управление пользователями</h3>
              <button
                onClick={() => handleModalOpen('addUser')}
                className="p-2 rounded-xl bg-blue-500 text-white"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </div>

            {mockUsers.map((user) => (
              <div key={user.id} className={`p-4 rounded-2xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/80 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>Уровень {user.level}</span>
                  <span>{user.balance} монет</span>
                  <span>{user.joinDate}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleModalOpen('editUser', user)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <Edit3 className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleUserAction('ban', user.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-500 text-white text-sm"
                  >
                    <UserMinus className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <h3 className="font-semibold">Аналитика системы</h3>
            
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-blue-500">{mockAnalytics.totalUsers}</div>
                  <div className="text-sm text-gray-400">Всего пользователей</div>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-green-500">{mockAnalytics.activeUsers}</div>
                  <div className="text-sm text-gray-400">Активных пользователей</div>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-yellow-500">{mockAnalytics.totalRevenue}</div>
                  <div className="text-sm text-gray-400">Общий доход (₽)</div>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-purple-500">{mockAnalytics.battlesCompleted}</div>
                  <div className="text-sm text-gray-400">Завершенных баттлов</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {(activeTab === 'battles' || activeTab === 'shop' || activeTab === 'settings' || activeTab === 'content') && (
          <div className="space-y-4">
            <h3 className="font-semibold">
              {activeTab === 'battles' && 'Управление баттлами'}
              {activeTab === 'shop' && 'Управление магазином'}
              {activeTab === 'settings' && 'Настройки системы'}
              {activeTab === 'content' && 'Управление контентом'}
            </h3>
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="text-center text-gray-400">
                Раздел в разработке
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation 
        currentPage="admin"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};