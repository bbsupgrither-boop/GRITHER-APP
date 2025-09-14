import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { ErrorBoundary } from './shared/ErrorBoundary';
import { initTelegramWebApp, onViewportChange } from './shared/telegram';

// Lazy loaded pages
const HomePage = React.lazy(() => import('./pages/Home'));
const AchievementsPage = React.lazy(() => import('./pages/Achievements'));
const TasksPage = React.lazy(() => import('./pages/Tasks'));
const ShopPage = React.lazy(() => import('./pages/Shop'));
const ProfilePage = React.lazy(() => import('./pages/Profile'));
const BattlesPage = React.lazy(() => import('./pages/Battles'));

// Modals
import { SettingsModal } from './components/SettingsModal';
import { SecretAdminAccess } from './components/SecretAdminAccess';
import { ProblemReportModal } from './components/ProblemReportModal';
import { AdminPanel } from './components/AdminPanel';

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
      current: 7
    },
    reward: {
      type: 'coins',
      amount: 500
    }
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Получено достижение',
    message: 'Вы получили достижение "Новичок"',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  }
];

const mockShopItems: ShopItem[] = [];
const mockOrders: Order[] = [];
const mockTasks: Task[] = [];
const mockCases: UserCase[] = [];

const initialMockCurrentUser = {
  id: '1',
  name: 'Пользователь',
  level: 1,
  experience: 0,
  gCoins: 1000,
  achievements: mockAchievements,
  notifications: mockNotifications
};

export default function App() {
  const { theme, toggleTheme, themeToggleCount, resetThemeToggleCount } = useTheme();
  const [mockCurrentUser, setMockCurrentUser] = useState(initialMockCurrentUser);
  
  // Получаем роль пользователя по его ID
  const { user: userWithRole, userRole, teamMembers } = useUserRole(mockCurrentUser.id);

  // Modal states
  const [showSettings, setShowSettings] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSecretAdminAccess, setShowSecretAdminAccess] = useState(false);
  const [showProblemReport, setShowProblemReport] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [hasSecretAccess, setHasSecretAccess] = useState(false);

  // Data states
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [userCases, setUserCases] = useState<UserCase[]>(mockCases);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Initialize Telegram WebApp and handle viewport changes
  useEffect(() => {
    initTelegramWebApp();

    const cleanupViewport = onViewportChange((height) => {
      document.documentElement.style.setProperty('--vh', `${height}px`);
    });

    // Принудительный сброс счетчика переключений темы для тестирования
    console.log('🔄 Resetting theme toggle count for testing');
    resetThemeToggleCount();

    return cleanupViewport;
  }, []);

  // Отслеживание переключений темы для секретного доступа
  useEffect(() => {
    console.log(`🔍 Theme toggle count changed: ${themeToggleCount}`);
    if (themeToggleCount >= 8) {
      console.log('🚀 ACTIVATING SECRET ADMIN ACCESS!');
      setShowSecretAdminAccess(true);
      resetThemeToggleCount();
    }
  }, [themeToggleCount]);

  // Event handlers
  const handleOpenSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);
  
  const handleOpenAdminPanel = () => setShowAdminPanel(true);
  const handleCloseAdminPanel = () => setShowAdminPanel(false);
  
  const handleOpenSecretAdminAccess = () => setShowSecretAdminAccess(true);
  const handleCloseSecretAdminAccess = () => setShowSecretAdminAccess(false);
  
  const handleOpenProblemReport = () => setShowProblemReport(true);
  const handleCloseProblemReport = () => setShowProblemReport(false);

  const handleAdminAccessGranted = (role: string) => {
    setAdminRole(role);
    setHasSecretAccess(true);
    setShowAdminPanel(true);
    setShowSecretAdminAccess(false);
    setShowSettings(false);
  };

  // Notification handlers
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <HashRouter>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Routes>
          <Route path="/" element={
            <Layout
              theme={theme}
              currentUser={mockCurrentUser}
              notifications={notifications}
              onOpenSettings={handleOpenSettings}
              onMarkNotificationAsRead={handleMarkNotificationAsRead}
              onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
              onRemoveNotification={handleRemoveNotification}
              onClearAllNotifications={handleClearAllNotifications}
            />
          }>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={
              <React.Suspense fallback={<div style={{padding: 16}}>Загрузка…</div>}>
                <ErrorBoundary>
                  <HomePage
                    theme={theme}
                    currentUser={mockCurrentUser}
                    notifications={notifications}
                    achievements={achievements}
                    onOpenSettings={handleOpenSettings}
                  />
                </ErrorBoundary>
              </React.Suspense>
            } />
            <Route path="achievements" element={
              <React.Suspense fallback={<div style={{padding: 16}}>Загрузка…</div>}>
                <ErrorBoundary>
                  <AchievementsPage
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
                </ErrorBoundary>
              </React.Suspense>
            } />
            <Route path="tasks" element={
              <React.Suspense fallback={<div style={{padding: 16}}>Загрузка…</div>}>
                <ErrorBoundary>
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
                </ErrorBoundary>
              </React.Suspense>
            } />
            <Route path="shop" element={
              <React.Suspense fallback={<div style={{padding: 16}}>Загрузка…</div>}>
                <ErrorBoundary>
                  <ShopPage
                    cases={userCases}
                    setCases={setUserCases}
                    userCases={userCases}
                    setUserCases={setUserCases}
                    shopItems={shopItems}
                    setShopItems={setShopItems}
                    userCoins={mockCurrentUser.gCoins}
                    setUserCoins={(coins) => {
                      setMockCurrentUser({ ...mockCurrentUser, gCoins: coins });
                    }}
                    theme={theme}
                    user={mockCurrentUser}
                    notifications={notifications}
                    onMarkNotificationAsRead={handleMarkNotificationAsRead}
                    onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
                    onRemoveNotification={handleRemoveNotification}
                    onClearAllNotifications={handleClearAllNotifications}
                    onOpenSettings={handleOpenSettings}
                  />
                </ErrorBoundary>
              </React.Suspense>
            } />
            <Route path="profile" element={
              <React.Suspense fallback={<div style={{padding: 16}}>Загрузка…</div>}>
                <ErrorBoundary>
                  <ProfilePage
                    theme={theme}
                    user={mockCurrentUser}
                    setUser={setMockCurrentUser}
                    battles={[]}
                    leaderboard={[]}
                  />
                </ErrorBoundary>
              </React.Suspense>
            } />
            <Route path="battles" element={
              <React.Suspense fallback={<div style={{padding: 16}}>Загрузка…</div>}>
                <ErrorBoundary>
                  <BattlesPage
                    theme={theme}
                    currentUser={mockCurrentUser}
                    notifications={notifications}
                    onOpenSettings={handleOpenSettings}
                  />
                </ErrorBoundary>
              </React.Suspense>
            } />
          </Route>
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
          <AdminPanel
            onClose={handleCloseAdminPanel}
            theme={theme}
            adminName={userWithRole?.name || 'Секретный Админ'}
          />
        )}
      </div>
    </HashRouter>
  );
}
