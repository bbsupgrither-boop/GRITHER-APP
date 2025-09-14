import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { SettingsModal } from './components/SettingsModalFixed';
import { SecretAdminAccess } from './components/SecretAdminAccess';
import { ProblemReportModal } from './components/ProblemReportModal';
import { AdminPanelMain } from './components/AdminPanelMain';

// Pages
import { HomePage } from './components/HomePage';
import { AchievementsPageFixed } from './components/AchievementsPageFixed';
import { TasksPage } from './components/TasksPage';
import { CasesShopPage } from './components/CasesShopPage';
import ProfilePage from './src/pages/Profile';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useUserRole } from './hooks/useUserRole';

// Types
import { Achievement } from './types/achievements';
import { ShopItem, Order } from './types/shop';
import { Task } from './types/tasks';
import { CaseType, UserCase } from './types/cases';
import { Notification } from './types/notifications';

// Mock data
const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Новичок',
    description: 'Создайте свой первый аккаунт',
    icon: '🛡️',
    category: 'general',
    rarity: 'common',
    requirements: {
      type: 'account_creation',
      target: 1,
      current: 1
    },
    reward: {
      type: 'coins',
      amount: 100
    }
  },
  {
    id: '2',
    title: 'Трудолюбивый',
    description: 'Выполните 10 задач',
    icon: '⚡',
    category: 'tasks',
    rarity: 'rare',
    requirements: {
      type: 'tasks_completed',
      target: 10,
      current: 3
    },
    reward: {
      type: 'coins',
      amount: 500
    }
  },
  {
    id: '3',
    title: 'Коллекционер',
    description: 'Откройте 5 кейсов',
    icon: '📦',
    category: 'cases',
    rarity: 'epic',
    requirements: {
      type: 'cases_opened',
      target: 5,
      current: 1
    },
    reward: {
      type: 'coins',
      amount: 1000
    }
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Изучить React',
    description: 'Изучить основы React и компоненты',
    status: 'in_progress',
    priority: 'high',
    deadline: '2024-12-25',
    reward: 100,
    category: 'learning'
  },
  {
    id: '2',
    title: 'Создать API для пользователей',
    description: 'Разработать REST API для управления пользователями',
    status: 'pending',
    priority: 'medium',
    deadline: '2024-12-20',
    reward: 200,
    category: 'development'
  },
  {
    id: '3',
    title: 'Написать тесты для компонентов',
    description: 'Создать unit тесты для всех компонентов',
    status: 'completed',
    priority: 'low',
    deadline: '2024-12-15',
    reward: 150,
    category: 'testing'
  }
];

const mockShopItems: ShopItem[] = [
  {
    id: '1',
    name: 'Обычный кейс',
    description: 'Содержит случайные предметы',
    price: 100,
    type: 'case',
    rarity: 'common',
    image: '📦'
  },
  {
    id: '2',
    name: 'Редкий кейс',
    description: 'Содержит редкие предметы',
    price: 500,
    type: 'case',
    rarity: 'rare',
    image: '💎'
  },
  {
    id: '3',
    name: 'Эпический кейс',
    description: 'Содержит эпические предметы',
    price: 1000,
    type: 'case',
    rarity: 'epic',
    image: '👑'
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    itemId: '1',
    userId: 'current-user',
    status: 'completed',
    createdAt: '2024-12-01',
    items: []
  }
];

const mockUserCases: UserCase[] = [
  {
    id: '1',
    userId: 'current-user',
    caseType: 'common' as CaseType,
    openedAt: '2024-12-01',
    items: []
  }
];

const initialMockCurrentUser = {
  id: 'current-user',
  name: 'Вы',
  level: 1,
  experience: 0,
  gCoins: 1000,
  achievements: mockAchievements.slice(0, 1),
  avatar: '',
  team: 'Team 1'
};

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { userWithRole, hasSecretAccess } = useUserRole();
  
  // State
  const [showSettings, setShowSettings] = useState(false);
  const [showSecretAdminAccess, setShowSecretAdminAccess] = useState(false);
  const [showProblemReport, setShowProblemReport] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [mockCurrentUser, setMockCurrentUser] = useState(initialMockCurrentUser);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [userCases, setUserCases] = useState<UserCase[]>(mockUserCases);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState('home');

  // Handlers
  const handleOpenSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  const handleOpenSecretAdminAccess = () => setShowSecretAdminAccess(true);
  const handleCloseSecretAdminAccess = () => setShowSecretAdminAccess(false);
  const handleOpenProblemReport = () => setShowProblemReport(true);
  const handleCloseProblemReport = () => setShowProblemReport(false);
  const handleOpenAdminPanel = () => setShowAdminPanel(true);
  const handleCloseAdminPanel = () => setShowAdminPanel(false);

  const handleAdminAccessGranted = (role: string) => {
    console.log('Admin access granted with role:', role);
    setShowSettings(false);
    setShowSecretAdminAccess(false);
    setShowAdminPanel(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Props for pages
  const pageProps = {
    theme,
    currentUser: mockCurrentUser,
    notifications,
    achievements,
    setAchievements,
    tasks,
    setTasks,
    shopItems,
    setShopItems,
    orders,
    setOrders,
    userCases,
    setUserCases,
    onOpenSettings: handleOpenSettings,
    onMarkNotificationAsRead: handleMarkNotificationAsRead,
    onMarkAllNotificationsAsRead: handleMarkAllNotificationsAsRead,
    onRemoveNotification: handleRemoveNotification,
    onClearAllNotifications: handleClearAllNotifications,
  };

  return (
    <HashRouter>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <div className="app">
              <Header
                theme={theme}
                currentUser={mockCurrentUser}
                notifications={notifications}
                onNavigate={handleNavigate}
                onOpenSettings={handleOpenSettings}
                onMarkNotificationAsRead={handleMarkNotificationAsRead}
                onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                onRemoveNotification={handleRemoveNotification}
                onClearAllNotifications={handleClearAllNotifications}
              />
              <main className="container">
                <HomePage
                  theme={theme}
                  currentUser={mockCurrentUser}
                  notifications={notifications}
                  achievements={achievements}
                  onOpenSettings={handleOpenSettings}
                  onNavigate={handleNavigate}
                  currentPage="home"
                  battles={[]}
                  battleInvitations={[]}
                  users={[]}
                  leaderboard={[]}
                />
              </main>
              <BottomNavigation theme={theme} />
            </div>
          } />
          <Route path="/achievements" element={
            <div className="app">
              <Header
                theme={theme}
                currentUser={mockCurrentUser}
                notifications={notifications}
                onNavigate={handleNavigate}
                onOpenSettings={handleOpenSettings}
                onMarkNotificationAsRead={handleMarkNotificationAsRead}
                onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                onRemoveNotification={handleRemoveNotification}
                onClearAllNotifications={handleClearAllNotifications}
              />
              <main className="container">
                <AchievementsPageFixed
                  achievements={achievements}
                  setAchievements={setAchievements}
                  theme={theme}
                  user={mockCurrentUser}
                  notifications={notifications}
                  onMarkNotificationAsRead={handleMarkNotificationAsRead}
                  onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                  onRemoveNotification={handleRemoveNotification}
                  onClearAllNotifications={handleClearAllNotifications}
                  onOpenSettings={handleOpenSettings}
                />
              </main>
              <BottomNavigation theme={theme} />
            </div>
          } />
          <Route path="/tasks" element={
            <div className="app">
              <Header
                theme={theme}
                currentUser={mockCurrentUser}
                notifications={notifications}
                onNavigate={handleNavigate}
                onOpenSettings={handleOpenSettings}
                onMarkNotificationAsRead={handleMarkNotificationAsRead}
                onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                onRemoveNotification={handleRemoveNotification}
                onClearAllNotifications={handleClearAllNotifications}
              />
              <main className="container">
                <TasksPage
                  tasks={tasks}
                  setTasks={setTasks}
                  theme={theme}
                  user={mockCurrentUser}
                  notifications={notifications}
                  onMarkNotificationAsRead={handleMarkNotificationAsRead}
                  onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                  onRemoveNotification={handleRemoveNotification}
                  onClearAllNotifications={handleClearAllNotifications}
                  onOpenSettings={handleOpenSettings}
                />
              </main>
              <BottomNavigation theme={theme} />
            </div>
          } />
          <Route path="/shop" element={
            <div className="app">
              <Header
                theme={theme}
                currentUser={mockCurrentUser}
                notifications={notifications}
                onNavigate={handleNavigate}
                onOpenSettings={handleOpenSettings}
                onMarkNotificationAsRead={handleMarkNotificationAsRead}
                onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                onRemoveNotification={handleRemoveNotification}
                onClearAllNotifications={handleClearAllNotifications}
              />
              <main className="container">
                <CasesShopPage
                  shopItems={shopItems}
                  setShopItems={setShopItems}
                  orders={orders}
                  setOrders={setOrders}
                  userCases={userCases}
                  setUserCases={setUserCases}
                  theme={theme}
                  user={mockCurrentUser}
                  notifications={notifications}
                  onMarkNotificationAsRead={handleMarkNotificationAsRead}
                  onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                  onRemoveNotification={handleRemoveNotification}
                  onClearAllNotifications={handleClearAllNotifications}
                  onOpenSettings={handleOpenSettings}
                />
              </main>
              <BottomNavigation theme={theme} />
            </div>
          } />
          <Route path="/profile" element={
            <div className="app">
              <Header
                theme={theme}
                currentUser={mockCurrentUser}
                notifications={notifications}
                onNavigate={handleNavigate}
                onOpenSettings={handleOpenSettings}
                onMarkNotificationAsRead={handleMarkNotificationAsRead}
                onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                onRemoveNotification={handleRemoveNotification}
                onClearAllNotifications={handleClearAllNotifications}
              />
              <main className="container">
                <ProfilePage
                  theme={theme}
                  user={mockCurrentUser}
                  setUser={setMockCurrentUser}
                  battles={[]}
                  leaderboard={[]}
                />
              </main>
              <BottomNavigation theme={theme} />
            </div>
          } />
        </Routes>

        {/* Modals */}
        {showSettings && (
          <SettingsModal
            isOpen={showSettings}
            onClose={handleCloseSettings}
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenAdminPanel={handleOpenAdminPanel}
            onOpenProblemReport={handleOpenProblemReport}
          />
        )}

        {showSecretAdminAccess && (
          <SecretAdminAccess
            isOpen={showSecretAdminAccess}
            onClose={handleCloseSecretAdminAccess}
            theme={theme}
            onAccessGranted={handleAdminAccessGranted}
          />
        )}

        {showProblemReport && (
          <ProblemReportModal
            isOpen={showProblemReport}
            onClose={handleCloseProblemReport}
            theme={theme}
          />
        )}

        {showAdminPanel && (userWithRole || hasSecretAccess) && (
          <AdminPanelMain
            onClose={handleCloseAdminPanel}
            theme={theme}
            adminName={userWithRole?.name || 'Секретный Админ'}
          />
        )}
      </div>
    </HashRouter>
  );
}