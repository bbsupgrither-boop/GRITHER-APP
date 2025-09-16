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
    { id: '1', name: 'Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ', email: 'ivan@example.com', role: 'user', status: 'active', joinDate: '2024-01-15', level: 5, balance: 1200 },
    { id: '2', name: 'Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ ', email: 'petr@example.com', role: 'user', status: 'active', joinDate: '2024-02-20', level: 8, balance: 2500 },
    { id: '3', name: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В Р Р‹Р В РЎВР В РЎвЂР РЋР вЂљР В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°', email: 'anna@example.com', role: 'admin', status: 'active', joinDate: '2024-01-10', level: 15, balance: 5000 },
    { id: '4', name: 'Р В Р Р‹Р В Р’ВµР РЋР вЂљР В РЎвЂ“Р В Р’ВµР В РІвЂћвЂ“ Р В РЎв„ўР В РЎвЂўР В Р’В·Р В Р’В»Р В РЎвЂўР В Р вЂ ', email: 'sergey@example.com', role: 'user', status: 'banned', joinDate: '2024-03-05', level: 3, balance: 300 }
  ];

  const mockBattles = [
    { id: '1', title: 'Р В РЎС›Р РЋРЎвЂњР РЋР вЂљР В Р вЂ¦Р В РЎвЂР РЋР вЂљ Р В РЎвЂ”Р В РЎвЂў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РЎВР В РЎВР В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР вЂ№', participants: 25, prize: 1000, status: 'active', startDate: '2024-12-20', endDate: '2024-12-22' },
    { id: '2', title: 'Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР РЋРЎвЂњР РЋР вЂљР РЋР С“ Р В РўвЂР В РЎвЂР В Р’В·Р В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦Р В Р’В°', participants: 15, prize: 500, status: 'completed', startDate: '2024-12-15', endDate: '2024-12-17' },
    { id: '3', title: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В Р’В°Р РЋРІР‚С›Р В РЎвЂўР В Р вЂ¦ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ', participants: 50, prize: 2000, status: 'upcoming', startDate: '2024-12-25', endDate: '2024-12-26' }
  ];

  const mockShopItems = [
    { id: '1', name: 'Р В РЎвЂєР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“', price: 100, category: 'cases', status: 'active', sales: 150 },
    { id: '2', name: 'Р В Р’В Р В Р’ВµР В РўвЂР В РЎвЂќР В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“', price: 500, category: 'cases', status: 'active', sales: 75 },
    { id: '3', name: 'Р В РЎСџР РЋР вЂљР В Р’ВµР В РЎВР В РЎвЂР РЋРЎвЂњР В РЎВ Р В РЎвЂ”Р В РЎвЂўР В РўвЂР В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂќР В Р’В°', price: 1000, category: 'subscription', status: 'active', sales: 30 }
  ];

  const mockAnalytics = {
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45600,
    battlesCompleted: 234,
    averageSessionTime: '24:35',
    topPerformer: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В Р Р‹Р В РЎВР В РЎвЂР РЋР вЂљР В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°'
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
              <h1 className="text-xl font-semibold">Р В РЎСџР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В Р’В°</h1>
              <p className="text-sm text-gray-400">Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В РЎвЂўР В РІвЂћвЂ“</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-blue-500">{mockAnalytics.totalUsers}</div>
              <div className="text-sm text-gray-400">Р В РЎСџР В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“</div>
            </div>
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-2xl font-bold text-green-500">{mockAnalytics.totalRevenue}</div>
              <div className="text-sm text-gray-400">Р В РІР‚СњР В РЎвЂўР РЋРІР‚В¦Р В РЎвЂўР В РўвЂ (Р Р†РІР‚С™Р вЂ¦)</div>
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
              { key: 'users', label: 'Р В РЎСџР В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ', icon: Users },
              { key: 'battles', label: 'Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–', icon: Trophy },
              { key: 'shop', label: 'Р В РЎС™Р В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦', icon: ShoppingBag },
              { key: 'analytics', label: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В°', icon: BarChart3 },
              { key: 'settings', label: 'Р В РЎСљР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р В РЎвЂќР В РЎвЂ', icon: Settings },
              { key: 'content', label: 'Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™', icon: FileText }
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
              <h3 className="font-semibold">Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ</h3>
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
                    {user.status === 'active' ? 'Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р’ВµР В Р вЂ¦' : 'Р В РІР‚вЂќР В Р’В°Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќР В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>Р В Р в‚¬Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР В Р вЂ¦Р РЋР Р‰ {user.level}</span>
                  <span>{user.balance} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
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
            <h3 className="font-semibold">Р В РЎвЂ™Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–</h3>
            
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
                  <div className="text-sm text-gray-400">Р В РІР‚в„ўР РЋР С“Р В Р’ВµР В РЎвЂ“Р В РЎвЂў Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“</div>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-green-500">{mockAnalytics.activeUsers}</div>
                  <div className="text-sm text-gray-400">Р В РЎвЂ™Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В Р’ВµР В РІвЂћвЂ“</div>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-yellow-500">{mockAnalytics.totalRevenue}</div>
                  <div className="text-sm text-gray-400">Р В РЎвЂєР В Р’В±Р РЋРІР‚В°Р В РЎвЂР В РІвЂћвЂ“ Р В РўвЂР В РЎвЂўР РЋРІР‚В¦Р В РЎвЂўР В РўвЂ (Р Р†РІР‚С™Р вЂ¦)</div>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl font-bold text-purple-500">{mockAnalytics.battlesCompleted}</div>
                  <div className="text-sm text-gray-400">Р В РІР‚вЂќР В Р’В°Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {(activeTab === 'battles' || activeTab === 'shop' || activeTab === 'settings' || activeTab === 'content') && (
          <div className="space-y-4">
            <h3 className="font-semibold">
              {activeTab === 'battles' && 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°Р В РЎВР В РЎвЂ'}
              {activeTab === 'shop' && 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎВР В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦Р В РЎвЂўР В РЎВ'}
              {activeTab === 'settings' && 'Р В РЎСљР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р В РЎвЂќР В РЎвЂ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–'}
              {activeTab === 'content' && 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В РЎвЂўР В РЎВ'}
            </h3>
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <div className="text-center text-gray-400">
                Р В Р’В Р В Р’В°Р В Р’В·Р В РўвЂР В Р’ВµР В Р’В» Р В Р вЂ  Р РЋР вЂљР В Р’В°Р В Р’В·Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂќР В Р’Вµ
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