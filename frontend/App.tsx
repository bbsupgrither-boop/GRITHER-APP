import React, { useState, useEffect, useRef } from 'react';
import { HomePage } from './components/HomePage';
import { useTelegram } from './utils/telegram';
import { useTheme } from './hooks/useTheme';
import { AchievementsPageFixed } from './components/AchievementsPageFixed';
import { TasksPage } from './components/TasksPage';
import { CasesShopPage } from './components/CasesShopPage';
import { ProfilePage } from './components/ProfilePage';
import { BattlesPageExtended } from './components/BattlesPageExtended';
import { BackgroundFX } from './components/BackgroundFX';
import { SettingsModal } from './components/SettingsModal';
import { AdminPanel } from './components/AdminPanel';
import { Achievement } from './types/achievements';
import { ShopItem, Order } from './types/shop';
import { Task } from './types/tasks';
import { CaseType, UserCase } from './types/cases';
import { Notification } from './types/notifications';
import { Battle, BattleInvitation, User } from './types/battles';
import { mockShopItems, mockOrders, mockAchievements, mockTasks, mockCaseTypes, mockUserCases, mockNotifications, mockLeaderboard, mockBattles } from './data/mockData';
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
  const { theme, toggleTheme, setTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  
  const [showSettings, setShowSettings] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [personalBattles, setPersonalBattles] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [caseTypes, setCaseTypes] = useState<CaseType[]>(mockCaseTypes);
  const [userCases, setUserCases] = useState<UserCase[]>(mockUserCases);
  const [battles, setBattles] = useState<Battle[]>(mockBattles);
  const [battleInvitations, setBattleInvitations] = useState<BattleInvitation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [currentUser, setCurrentUser] = useState<User | null>({ 
    id: 'user1', 
    name: 'Иван Иванов', 
    username: '@iivanov', 
    level: 5, 
    experience: 0,
    maxExperience: 100,
    balance: 1000, 
    team: 'Team Alpha',
    role: 'user',
    online: true
  });
  const [userCoins, setUserCoins] = useState(1000);

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
    setCurrentPage('admin');
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
    console.log('🔥 App.tsx: renderCurrentPage called, currentPage:', currentPage);
    switch (currentPage) {
      case 'home':
        console.log('🔥 App.tsx: Rendering HomePage case');
        return (
          <HomePage
            onNavigate={handleNavigate} 
            currentPage={currentPage} 
            onOpenSettings={handleOpenSettings}
            achievements={achievements}
            theme={theme}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotificationAsRead}
            onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
            onRemoveNotification={handleRemoveNotification}
            onClearAllNotifications={handleClearAllNotifications}
            battles={battles}
            battleInvitations={battleInvitations}
            users={users}
            leaderboard={leaderboard}
            currentUser={currentUser || undefined}
            onCreateBattle={() => handleNavigate('battles')}
            onAcceptBattleInvitation={handleAcceptBattleInvitation}
            onDeclineBattleInvitation={handleDeclineBattleInvitation}
          />
        );
      case 'achievements':
        return (
          <AchievementsPageFixed
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
      case 'shop':
        return (
          <CasesShopPage
            onNavigate={handleNavigate} 
            cases={caseTypes}
            setCases={setCaseTypes}
            userCases={userCases}
            setUserCases={setUserCases}
            shopItems={shopItems}
            setShopItems={setShopItems}
            userCoins={userCoins}
            setUserCoins={setUserCoins}
            theme={theme}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            key={`profile-${Date.now()}`}
            onNavigate={handleNavigate} 
            user={currentUser || { 
              id: 'user1', 
              name: 'Иван Иванов', 
              username: '@iivanov', 
              level: 5, 
              experience: 0,
              maxExperience: 100,
              balance: 1000, 
              team: 'Team Alpha',
              role: 'user',
              online: true
            } as any}
            setUser={setCurrentUser}
            battles={battles}
            leaderboard={leaderboard}
            theme={theme}
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
            currentUser={currentUser || undefined}
            setCurrentUser={setCurrentUser}
            onCreateBattleInvitation={handleCreateBattleInvitation}
            onAcceptBattleInvitation={handleAcceptBattleInvitation}
            onDeclineBattleInvitation={handleDeclineBattleInvitation}
            onCompleteBattle={handleCompleteBattle}
            theme={theme}
          />
        );
      default:
        console.log('🔥 App.tsx: Rendering default case (HomePage)');
        return (
          <HomePage
            onNavigate={handleNavigate} 
            currentPage={currentPage} 
            onOpenSettings={handleOpenSettings}
            achievements={achievements}
            theme={theme}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotificationAsRead}
            onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
            onRemoveNotification={handleRemoveNotification}
            onClearAllNotifications={handleClearAllNotifications}
            battles={battles}
            battleInvitations={battleInvitations}
            users={users}
            leaderboard={leaderboard}
            currentUser={currentUser || undefined}
            onCreateBattle={() => handleNavigate('battles')}
            onAcceptBattleInvitation={handleAcceptBattleInvitation}
            onDeclineBattleInvitation={handleDeclineBattleInvitation}
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
          isOpen={showSettings}
          onClose={handleCloseSettings}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={handleNavigate}
          onOpenAdminPanel={handleOpenAdminPanel}
        />
      )}
      
      {showAdminPanel && (
        <AdminPanel
          onNavigate={handleNavigate}
          theme={theme}
        />
      )}
    </div>
  );
}