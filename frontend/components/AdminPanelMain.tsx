import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Trophy, 
  CheckSquare, 
  ShoppingBag, 
  Swords,
  Settings,
  Bell,
  X,
  Menu,
  Shield,
  MessageSquare
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminAchievementManagement } from './AdminAchievementManagement';
import { AdminTaskManagement } from './AdminTaskManagement';
import { AdminShopManagement } from './AdminShopManagement';
import { AdminBattleManagement } from './AdminBattleManagement';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminNotificationSystem } from './AdminNotificationSystem';

interface AdminPanelMainProps {
  theme: 'light' | 'dark';
  onClose: () => void;
  adminName: string;
}

type AdminSection = 'dashboard' | 'achievements' | 'tasks' | 'shop' | 'battles' | 'users' | 'notifications';

interface NavigationItem {
  id: AdminSection;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Р В РІР‚СљР В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р В Р’В°Р РЋР РЏ',
    icon: <Home className="w-5 h-5" />,
    color: 'text-blue-500'
  },
  {
    id: 'users',
    label: 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В Р вЂ¦Р В РЎвЂР В РЎвЂќР В РЎвЂ',
    icon: <Users className="w-5 h-5" />,
    color: 'text-indigo-500'
  },
  {
    id: 'battles',
    label: 'Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–',
    icon: <Swords className="w-5 h-5" />,
    color: 'text-red-500'
  },
  {
    id: 'achievements',
    label: 'Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ',
    icon: <Trophy className="w-5 h-5" />,
    color: 'text-yellow-500'
  },
  {
    id: 'tasks',
    label: 'Р В РІР‚вЂќР В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ',
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'text-green-500'
  },
  {
    id: 'shop',
    label: 'Р В РЎС™Р В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦',
    icon: <ShoppingBag className="w-5 h-5" />,
    color: 'text-purple-500'
  },
  {
    id: 'notifications',
    label: 'Р В Р в‚¬Р В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ',
    icon: <MessageSquare className="w-5 h-5" />,
    color: 'text-orange-500'
  }
];

export const AdminPanelMain: React.FC<AdminPanelMainProps> = ({ 
  theme, 
  onClose, 
  adminName 
}) => {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <AdminDashboard 
            theme={theme} 
            onNavigate={(section) => setCurrentSection(section as AdminSection)}
          />
        );
      case 'achievements':
        return <AdminAchievementManagement theme={theme} />;
      case 'tasks':
        return <AdminTaskManagement theme={theme} />;
      case 'shop':
        return <AdminShopManagement theme={theme} />;
      case 'battles':
        return <AdminBattleManagement theme={theme} />;
      case 'users':
        return <AdminUserManagement theme={theme} />;
      case 'notifications':
        return <AdminNotificationSystem theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.8)'
      }}
    >
      {/* Р В РІР‚ВР В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР РЏ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰ */}
      <div 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                   lg:translate-x-0 transition-transform duration-300 ease-in-out
                   w-64 flex-shrink-0`}
        style={{
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
        }}
      >
        {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ Р В Р’В±Р В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р вЂ Р В РЎвЂўР В РІвЂћвЂ“ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р В РЎвЂ */}
        <div className="p-6 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500 bg-opacity-20">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰
              </h1>
              <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                {adminName}
              </p>
            </div>
          </div>
        </div>

        {/* Р В РЎСљР В Р’В°Р В Р вЂ Р В РЎвЂР В РЎвЂ“Р В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ */}
        <nav className="p-4 space-y-2">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentSection === item.id 
                  ? 'bg-blue-500 bg-opacity-20 text-blue-500' 
                  : 'hover:bg-opacity-10'
              }`}
              style={{
                backgroundColor: currentSection === item.id 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                color: currentSection === item.id 
                  ? '#3B82F6' 
                  : theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              <span className={currentSection === item.id ? 'text-blue-500' : item.color}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Р В РЎСљР В РЎвЂР В Р’В¶Р В Р вЂ¦Р РЋР РЏР РЋР РЏ Р РЋРІР‚РЋР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р вЂ Р В РЎвЂўР В РІвЂћвЂ“ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р В РЎвЂ */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
            <div className="p-2 rounded-lg bg-red-500 bg-opacity-20">
              <Settings className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                Р В РЎСљР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р В РЎвЂќР В РЎвЂ
              </p>
              <p className="text-xs opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂ”Р В Р’В°Р РЋР вЂљР В Р’В°Р В РЎВР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Р В РЎвЂєР РЋР С“Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™ */}
      <div 
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          backgroundColor: theme === 'dark' ? '#0F1116' : '#F8F9FA'
        }}
      >
        {/* Р В РІР‚в„ўР В Р’ВµР РЋР вЂљР РЋРІР‚В¦Р В Р вЂ¦Р РЋР РЏР РЋР РЏ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰ */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ 
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF'
          }}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-opacity-10"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h2 className="text-xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                {NAVIGATION_ITEMS.find(item => item.id === currentSection)?.label}
              </h2>
              <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                {currentSection === 'dashboard' && 'Р В РЎвЂєР В Р’В±Р В Р’В·Р В РЎвЂўР РЋР вЂљ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„– Р В РЎвЂ Р В Р’В±Р РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂР РЋР РЏ'}
                {currentSection === 'users' && 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂўР РЋРІР‚С™Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В Р вЂ¦Р В РЎвЂР В РЎвЂќР В Р’В°Р В РЎВР В РЎвЂ Р В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ'}
                {currentSection === 'battles' && 'Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р В РЎвЂўР В Р’ВµР В РўвЂР В РЎвЂР В Р вЂ¦Р В РЎвЂќР В РЎвЂўР В Р вЂ  Р В РЎвЂ Р РЋР вЂљР В Р’ВµР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂ”Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ '}
                {currentSection === 'achievements' && 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ, Р РЋР вЂљР В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ Р В РЎВР В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“'}
                {currentSection === 'tasks' && 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ, Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р РЋР С“Р В Р’В»Р В Р’ВµР В Р’В¶Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ'}
                {currentSection === 'shop' && 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљР В Р’В°Р В РЎВР В РЎвЂ Р В РЎвЂ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р В Р’В°Р В РЎВР В РЎвЂ'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="p-2 rounded-lg hover:bg-opacity-10 relative"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-opacity-10"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™ */}
        <div className="flex-1 overflow-y-auto">
          {renderCurrentSection()}
        </div>
      </div>

      {/* Р В РЎС™Р В РЎвЂўР В Р’В±Р В РЎвЂР В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р В Р вЂ¦Р В Р’В°Р В Р вЂ Р В РЎвЂР В РЎвЂ“Р В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р РЋР С“Р В Р вЂ¦Р В РЎвЂР В Р’В·Р РЋРЎвЂњ */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 p-4"
        style={{
          backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
          borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
        }}
      >
        <div className="flex justify-around">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                currentSection === item.id ? 'bg-blue-500 bg-opacity-20' : ''
              }`}
              style={{
                backgroundColor: currentSection === item.id ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                color: currentSection === item.id ? '#3B82F6' : theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              <span className={currentSection === item.id ? 'text-blue-500' : item.color}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        {/* Р В Р’ВР В Р вЂ¦Р В РўвЂР В РЎвЂР В РЎвЂќР В Р’В°Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљ Р В Р вЂ Р В Р вЂ¦Р В РЎвЂР В Р’В·Р РЋРЎвЂњ */}
        <div className="flex justify-center mt-2">
          <div 
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }}
          ></div>
        </div>
      </div>
    </div>
  );
};