import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, X, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Gamepad2, Box } from './Icons';
import { Button } from './ui/button';
import { AdminNavigation } from './AdminNavigation';
import { AdminDashboard } from './AdminDashboard';
import { AdminAchievements } from './AdminAchievements_fixed_full';
import { AdminTasksFixed } from './AdminTasksFixed';
import { AdminShop } from './AdminShop';
import { AdminShopPage } from './AdminShopPage';
import { ShopModerationPage } from './ShopModerationPage';
import { AdminGamesPageNewFixed } from './AdminGamesPageNewFixed';
import { AdminCasesPage } from './AdminCasesPage';
import { WorkersManagement } from './WorkersManagement';
import { BattlesManagement } from './BattlesManagement';
import { AchievementsModeration } from './AchievementsModeration';
import { Achievement } from '../types/achievements';
import { ShopItem, Order } from '../types/shop';
import { Task } from '../types/tasks';
import { CaseType, UserCase } from '../types/cases';
import { Battle, BattleInvitation } from '../types/battles';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
  achievements: Achievement[];
  setAchievements: (achievements: Achievement[]) => void;
  shopItems: ShopItem[];
  setShopItems: (items: ShopItem[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  cases: CaseType[];
  setCases: (cases: CaseType[]) => void;
  userCases: UserCase[];
  setUserCases: (userCases: UserCase[]) => void;
  battles: Battle[];
  setBattles: (battles: Battle[]) => void;
  battleInvitations: BattleInvitation[];
  setBattleInvitations: (invitations: BattleInvitation[]) => void;
  onCompleteBattle: (battleId: string, winnerId: string) => void;
  onToggleDarkMode?: () => void;
  users?: import('../types/battles').User[];
  onUpdateUserBalance?: (userId: string, amount: number) => void;
}

// РЎРёСЃС‚РµРјР° СЂРѕР»РµР№ Рё РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ (С‚Р°РєР°СЏ Р¶Рµ РєР°Рє РІ SettingsModal)
const ADMIN_USERS = [
  // Р“Р»Р°РІРЅС‹Рµ Р°РґРјРёРЅС‹
  { telegramId: '123456789', username: 'ivan_petrov', role: 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ' },
  { telegramId: '987654321', username: 'maria_sidorova', role: 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ' },
  
  // РЎС‚Р°СЂС€РёРµ Р°РґРјРёРЅС‹
  { telegramId: '111222333', username: 'alexey_kozlov', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '444555666', username: 'elena_morozova', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '1609556178', username: 'admin_senior', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  
  // РњР»Р°РґС€РёРµ Р°РґРјРёРЅС‹
  { telegramId: '777888999', username: 'dmitry_volkov', role: 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '000111222', username: 'anna_lebedeva', role: 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ' },
  
  // РўРёРјР»РёРґС‹
  { telegramId: '333444555', username: 'sergey_orlov', role: 'С‚РёРјР»РёРґ', teamNumber: 1 },
  { telegramId: '666777888', username: 'olga_sokolova', role: 'С‚РёРјР»РёРґ', teamNumber: 2 },
  { telegramId: '999000111', username: 'mikhail_rybakov', role: 'С‚РёРјР»РёРґ', teamNumber: 3 },
];

// РЎРµРєСЂРµС‚РЅС‹Рµ РєРѕРґС‹ РґР»СЏ СЂРѕР»РµР№
const SECRET_CODES = {
  'df1GE%LwVAAC': 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ',
  '0caFyNh}w%': 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ',
  '~3SogEhz': 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ',
  'SToU{~': 'С‚РёРјР»РёРґ'
};

export function AdminPanel({ 
  onNavigate, 
  achievements, 
  setAchievements, 
  shopItems, 
  setShopItems, 
  orders, 
  setOrders, 
  tasks, 
  setTasks, 
  cases, 
  setCases, 
  userCases, 
  setUserCases, 
  battles,
  setBattles,
  battleInvitations,
  setBattleInvitations,
  onCompleteBattle,
  onToggleDarkMode,
  users = [],
  onUpdateUserBalance
}: AdminPanelProps) {
  const [currentAdminPage, setCurrentAdminPage] = useState('dashboard');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // РџСЂРѕРІРµСЂСЏРµРј РґР°РЅРЅС‹Рµ РґР»СЏ РІС…РѕРґР° РІ Р°РґРјРёРЅ РїР°РЅРµР»СЊ
    const adminLoginData = localStorage.getItem('adminLoginData');
    if (adminLoginData) {
      const { telegramId, accessCode } = JSON.parse(adminLoginData);
      const role = SECRET_CODES[accessCode];
      if (role) {
        const user = ADMIN_USERS.find(u => 
          u.telegramId === telegramId && u.role === role
        );
        if (user) {
          setUserRole(user.role);
          setUserName(user.username);
        }
      }
    }
  }, []);

  const handleAdminNavigate = (page: string) => {
    setCurrentAdminPage(page);
  };

  const handleBackToMain = () => {
    onNavigate('home');
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ': return 'Р“Р»Р°РІРЅС‹Р№ Р°РґРјРёРЅ';
      case 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ': return 'РЎС‚Р°СЂС€РёР№ Р°РґРјРёРЅ';
      case 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ': return 'РњР»Р°РґС€РёР№ Р°РґРјРёРЅ';
      case 'С‚РёРјР»РёРґ': return 'РўРёРјР»РёРґ';
      default: return role;
    }
  };

  const renderCurrentAdminPage = () => {
    switch (currentAdminPage) {
      case 'achievements':
        return <AdminAchievements 
          achievements={achievements} 
          setAchievements={setAchievements}
          currentAdminPage={currentAdminPage}
          setCurrentAdminPage={setCurrentAdminPage}
        />;
      case 'achievements-moderation':
        return <AchievementsModeration 
          currentAdminPage={currentAdminPage}
          setCurrentAdminPage={setCurrentAdminPage}
        />;
      case 'tasks':
        return <AdminTasksFixed 
          currentAdminPage={currentAdminPage}
          setCurrentAdminPage={setCurrentAdminPage}
          tasks={tasks}
          setTasks={setTasks}
        />;
      case 'shop':
        return <AdminShopPage 
          onBack={() => setCurrentAdminPage('dashboard')} 
          onNavigateToSection={(section) => setCurrentAdminPage(section)}
          onNavigateToModeration={() => setCurrentAdminPage('shop-moderation')}
          shopItems={shopItems}
          setShopItems={setShopItems}
        />;
      case 'shop-moderation':
        return <ShopModerationPage 
          onBack={() => setCurrentAdminPage('shop')}
          orders={orders}
          setOrders={setOrders}
          onUpdateUserBalance={onUpdateUserBalance}
        />;
      case 'workers':
        return <WorkersManagement 
          onBack={() => setCurrentAdminPage('dashboard')} 
          onNavigateToSection={(section) => setCurrentAdminPage(section)}
        />;
      case 'battles':
        return <BattlesManagement 
          battles={battles}
          setBattles={setBattles}
          battleInvitations={battleInvitations}
          setBattleInvitations={setBattleInvitations}
          onCompleteBattle={onCompleteBattle}
          currentUserBalance={users.find(u => u.id === 'current-user')?.balance || 0}
        />;
      case 'games':
        return <AdminGamesPageNewFixed 
          onBack={() => setCurrentAdminPage('dashboard')} 
          onNavigateToSection={(section) => setCurrentAdminPage(section)}
        />;
      case 'cases':
        return <AdminCasesPage 
          theme="dark"
          cases={cases}
          setCases={setCases}
        />;
      case 'dashboard':
      default:
        return <AdminDashboard 
          onClose={handleBackToMain} 
          onToggleDarkMode={onToggleDarkMode}
          onNavigateToWorkers={() => setCurrentAdminPage('workers')}
          onNavigateToAchievementsModeration={() => setCurrentAdminPage('achievements-moderation')}
          onNavigateToGames={() => setCurrentAdminPage('games')}
          onNavigateToCases={() => setCurrentAdminPage('cases')}
          onNavigateToBattles={() => setCurrentAdminPage('battles')}
        />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* РџРѕСЃС‚РѕСЏРЅРЅС‹Р№ header Р°РґРјРёРЅ РїР°РЅРµР»Рё */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield 
                  className="w-6 h-6 text-primary cursor-pointer transition-transform hover:scale-110" 
                  onDoubleClick={onToggleDarkMode}
                  title="Р”РІРѕР№РЅРѕР№ РєР»РёРє РґР»СЏ СЃРјРµРЅС‹ С‚РµРјС‹"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium text-foreground">РџР°РЅРµР»СЊ СѓРїСЂР°РІР»РµРЅРёСЏ</h1>
                <p className="text-sm text-muted-foreground">{getRoleDisplayName(userRole || '')}</p>
              </div>
            </div>
            <button
              onClick={handleBackToMain}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>
        </div>
        
        {/* РћСЃРЅРѕРІРЅРѕР№ РєРѕРЅС‚РµРЅС‚ СЃ РѕС‚СЃС‚СѓРїРѕРј РґР»СЏ header */}
        <div className="pt-20">
          {renderCurrentAdminPage()}
        </div>
      </div>
    </>
  );
}
