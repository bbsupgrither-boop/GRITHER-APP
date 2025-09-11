import { useState, useEffect, useRef } from 'react';
import { HomePage } from './components/HomePage';
import { useTelegram } from './utils/telegram';
import { AchievementsPage } from './components/AchievementsPageFixed';
import { TasksPage } from './components/TasksPage';
import { CasesPage } from './components/CasesPage';
import { ShopPageCasesStyleFixed } from './components/ShopPageCasesStyleFixed';
import { ProfilePage } from './components/ProfilePage';
import { BattlesPageExtended } from './components/BattlesPageExtended';
import { BattlesPageTest } from './components/BattlesPageTest';
import { BattlesPageMinimal } from './components/BattlesPageMinimal';
import { BackgroundFX } from './components/BackgroundFX';
import { SettingsModal } from './components/SettingsModal';
import { AdminPanel } from './components/AdminPanel';
import { Achievement } from './types/achievements';
import { ShopItem, Order } from './types/shop';
import { Task } from './types/tasks';
import { CaseType, UserCase } from './types/cases';
import { Notification } from './types/notifications';
import { Battle, BattleInvitation, User } from './types/battles';
import { mockShopItems, mockOrders, mockAchievements, mockTasks, mockCaseTypes, mockUserCases, mockNotifications, mockLeaderboard } from './data/mockData';
import { LeaderboardEntry } from './types/global';

// Utility function for monitoring localStorage
const getLocalStorageSize = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

// Function for cleaning up localStorage when full
const cleanupLocalStorage = () => {
  const keysToRemove = [
    'oldCases', 'tempCases', 'backup_cases', 'cache_', 'temp_'
  ];
  
  keysToRemove.forEach(keyPattern => {
    Object.keys(localStorage).forEach(key => {
      if (key.includes(keyPattern)) {
        localStorage.removeItem(key);
        console.log(`Removed key: ${key}`);
      }
    });
  });
};

export default function App() {
  const { user, webApp } = useTelegram();
  const [currentPage, setCurrentPage] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [personalBattles, setPersonalBattles] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [caseTypes, setCaseTypes] = useState<CaseType[]>(mockCaseTypes);
  const [userCases, setUserCases] = useState<UserCase[]>(mockUserCases);
  const [battles, setBattles] = useState<Battle[]>([]);
  const [battleInvitations, setBattleInvitations] = useState<BattleInvitation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Telegram Web App initialization
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  // Cleanup localStorage periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const size = getLocalStorageSize();
      if (size > 4.5 * 1024 * 1024) { // 4.5MB limit
        cleanupLocalStorage();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleOpenAdminPanel = () => {
    setShowAdminPanel(true);
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleAddNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleCreateBattleInvitation = (invitation: Omit<BattleInvitation, 'id' | 'createdAt' | 'expiresAt' | 'status'>) => {
    const newInvitation: BattleInvitation = {
      ...invitation,
      id: Date.now().toString(),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      status: 'pending'
    };
    setBattleInvitations(prev => [newInvitation, ...prev]);
  };

  const handleAcceptBattleInvitation = (invitationId: string) => {
    setBattleInvitations(prev => 
      prev.map(invitation => 
        invitation.id === invitationId 
          ? { ...invitation, status: 'accepted' }
          : invitation
      )
    );
  };

  const handleDeclineBattleInvitation = (invitationId: string) => {
    setBattleInvitations(prev => 
      prev.map(invitation => 
        invitation.id === invitationId 
          ? { ...invitation, status: 'declined' }
          : invitation
      )
    );
  };

  const handleCompleteBattle = (battleId: string, winnerId: string) => {
    setBattles(prev => 
      prev.map(battle => 
        battle.id === battleId 
          ? { ...battle, status: 'completed', winnerId }
          : battle
      )
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            currentPage={currentPage}
            onOpenSettings={handleOpenSettings}
            achievements={achievements}
            profilePhoto={profilePhoto}
            personalBattles={personalBattles}
            setPersonalBattles={setPersonalBattles}
            theme={theme}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotificationAsRead}
            onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
            onRemoveNotification={handleRemoveNotification}
            onClearAllNotifications={handleClearAllNotifications}
            addNotification={handleAddNotification}
            battles={battles}
            battleInvitations={battleInvitations}
            users={users}
            leaderboard={leaderboard}
            onCreateBattleInvitation={handleCreateBattleInvitation}
            onAcceptBattleInvitation={handleAcceptBattleInvitation}
            onDeclineBattleInvitation={handleDeclineBattleInvitation}
            onCompleteBattle={handleCompleteBattle}
            currentUser={currentUser}
          />
        );
      case 'achievements':
        return (
          <AchievementsPage
            onNavigate={handleNavigate}
            achievements={achievements}
            setAchievements={setAchievements}
            theme={theme}
          />
        );
      case 'tasks':
        return (
          <TasksPage
            onNavigate={handleNavigate}
            tasks={tasks}
            setTasks={setTasks}
            theme={theme}
          />
        );
      case 'cases':
        return (
          <CasesPage
            onNavigate={handleNavigate}
            caseTypes={caseTypes}
            setCaseTypes={setCaseTypes}
            userCases={userCases}
            setUserCases={setUserCases}
            theme={theme}
          />
        );
      case 'shop':
        return (
          <ShopPageCasesStyleFixed
            onNavigate={handleNavigate}
            shopItems={shopItems}
            setShopItems={setShopItems}
            orders={orders}
            setOrders={setOrders}
            theme={theme}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            onNavigate={handleNavigate}
            profilePhoto={profilePhoto}
            setProfilePhoto={setProfilePhoto}
            theme={theme}
            setTheme={setTheme}
          />
        );
      case 'battles':
        return (
          <BattlesPageExtended
            onNavigate={handleNavigate}
            battles={battles}
            setBattles={setBattles}
            battleInvitations={battleInvitations}
            setBattleInvitations={setBattleInvitations}
            users={users}
            setUsers={setUsers}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            onCreateBattleInvitation={handleCreateBattleInvitation}
            onAcceptBattleInvitation={handleAcceptBattleInvitation}
            onDeclineBattleInvitation={handleDeclineBattleInvitation}
            onCompleteBattle={handleCompleteBattle}
            theme={theme}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            currentPage={currentPage}
            onOpenSettings={handleOpenSettings}
            achievements={achievements}
            profilePhoto={profilePhoto}
            personalBattles={personalBattles}
            setPersonalBattles={setPersonalBattles}
            theme={theme}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotificationAsRead}
            onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
            onRemoveNotification={handleRemoveNotification}
            onClearAllNotifications={handleClearAllNotifications}
            addNotification={handleAddNotification}
            battles={battles}
            battleInvitations={battleInvitations}
            users={users}
            leaderboard={leaderboard}
            onCreateBattleInvitation={handleCreateBattleInvitation}
            onAcceptBattleInvitation={handleAcceptBattleInvitation}
            onDeclineBattleInvitation={handleDeclineBattleInvitation}
            onCompleteBattle={handleCompleteBattle}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <BackgroundFX theme={theme} />
      {renderCurrentPage()}
      
      {showSettings && (
        <SettingsModal
          onClose={handleCloseSettings}
          theme={theme}
          setTheme={setTheme}
          onOpenAdminPanel={handleOpenAdminPanel}
        />
      )}
      
      {showAdminPanel && (
        <AdminPanel
          onClose={handleCloseAdminPanel}
          achievements={achievements}
          setAchievements={setAchievements}
          shopItems={shopItems}
          setShopItems={setShopItems}
          tasks={tasks}
          setTasks={setTasks}
          caseTypes={caseTypes}
          setCaseTypes={setCaseTypes}
          userCases={userCases}
          setUserCases={setUserCases}
          theme={theme}
        />
      )}
    </div>
  );
}