import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Log build version
console.info("build", import.meta.env.VITE_APP_BUILD);

// Import components
import { HomePage } from './components/HomePage';
import { AchievementsPage } from './components/AchievementsPage';
import { TasksPage } from './components/TasksPage';
import { ShopPage } from './components/ShopPage';
import { ProfilePage } from './components/ProfilePage';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { SettingsModal } from './components/SettingsModal';
import { SecretAdminAccess } from './components/SecretAdminAccess';
import { ProblemReportModal } from './components/ProblemReportModal';
import { AdminPanelMain } from './components/AdminPanelMain';

// Types
import { User } from './types/global';
import { Achievement } from './types/achievements';
import { Battle } from './types/battles';
import { Task } from './types/tasks';
import { ShopItem } from './types/shop';
import { Notification } from './types/notifications';

// Navigation wrapper component
function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  return (
    <div>
      {React.cloneElement(children as React.ReactElement, { 
        onNavigate: handleNavigate,
        currentPage: location.pathname 
      })}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showSettings, setShowSettings] = useState(false);
  const [secretCodeModalOpen, setSecretCodeModalOpen] = useState(false);
  const [showProblemReport, setShowProblemReport] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [themeToggleCount, setThemeToggleCount] = useState(0);
  const [secretAccessGrantedRole, setSecretAccessGrantedRole] = useState<string | null>(null);
  const [hasSecretAccess, setHasSecretAccess] = useState(false);
  const [telegramId, setTelegramId] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Mock data
  const mockCurrentUser: User = {
    id: 'current-user',
    name: 'Иван Иванов',
    avatar: undefined,
    level: 1,
    xp: 0,
    balance: 1000,
    role: 'WORKER'
  };

  const mockAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Новичок',
      description: 'Достигните 2 уровня',
      progress: 50,
      maxProgress: 100,
      reward: { xp: 100, coins: 50 },
      requirements: { type: 'level', value: 2 },
      icon: '🌟',
      isCompleted: false
    },
    {
      id: '2',
      title: 'Трудолюбивый',
      description: 'Выполните 10 задач',
      progress: 30,
      maxProgress: 100,
      reward: { xp: 200, coins: 100 },
      requirements: { type: 'tasks', value: 10 },
      icon: '❤️',
      isCompleted: false
    },
    {
      id: '3',
      title: 'Коллекционер',
      description: 'Откройте 5 кейсов',
      progress: 20,
      maxProgress: 100,
      reward: { xp: 150, coins: 75 },
      requirements: { type: 'cases', value: 5 },
      icon: '📦',
      isCompleted: false
    }
  ];

  const mockBattles: Battle[] = [
    {
      id: '1',
      opponentName: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°',
      stake: 250,
      status: 'active'
    }
  ];

  const mockBattleInvitations: Battle[] = [
    {
      id: '2',
      opponentName: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°',
      stake: 200,
      status: 'pending'
    },
    {
      id: '3',
      opponentName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
      stake: 150,
      status: 'pending'
    }
  ];

  const mockUsers = [
    { id: '1', name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ', level: 18 },
    { id: '2', name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', level: 16 },
    { id: '3', name: 'РђРЅРЅР° РРІР°РЅРѕРІР°', level: 15 }
  ];

  const mockLeaderboard = mockUsers.map((user, index) => ({
    ...user,
    position: index + 1,
    xp: user.level * 100,
    wins: Math.floor(Math.random() * 50) + 10
  }));

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Выполнить задачу',
      description: 'Описание задачи',
      reward: { xp: 50, coins: 25 },
      isCompleted: false
    }
  ];

  const mockShopItems: ShopItem[] = [
    {
      id: '1',
      name: 'РљРµР№СЃ',
      price: 100,
      icon: '📦',
      description: 'РЎР»СѓС‡Р°Р№РЅС‹Р№ РїСЂРµРґРјРµС‚'
    }
  ];

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Новое уведомление',
      message: 'У вас новое сообщение',
      type: 'info',
      timestamp: new Date().toISOString(),
      isRead: false
    }
  ];

  const toggleTheme = () => {
    // Secret admin access logic
    if (!theme) {
      const newCount = themeToggleCount + 1;
      setThemeToggleCount(newCount);
      if (newCount === 8) {
        setSecretCodeModalOpen(true);
        setThemeToggleCount(0);
      }
    }
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAdminAccessGranted = (role: string) => {
    setSecretAccessGrantedRole(role);
    setHasSecretAccess(true);
    setShowAdminPanel(true);
    setShowSettings(false);
    setSecretCodeModalOpen(false);
    setTelegramId('');
    setSecretCode('');
  };

  const handleNavigate = (page: string) => {
    // Navigation logic will be handled by NavigationWrapper
  };

  return (
    <HashRouter>
      <div className={`app ${theme === 'dark' ? 'dark' : ''}`} style={{ minHeight: '100vh' }}>
          <NavigationWrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Home Page */}
            <Route path="/home" element={
              <div className="app">
                <Header
                  user={mockCurrentUser}
                  theme={theme}
                  onNavigate={handleNavigate}
                  notifications={mockNotifications}
                  onToggleNotifications={() => {}}
                  onOpenSettings={() => setShowSettings(true)}
                  hideUserIcon={false}
                />
                <main className="container" style={{ paddingBottom: '80px' }}>
                  <HomePage
                    theme={theme}
                    currentPage="/home"
                    battles={mockBattles}
                    battleInvitations={mockBattleInvitations}
                    users={mockUsers}
                    leaderboard={mockLeaderboard}
                    achievements={mockAchievements}
                    tasks={mockTasks}
                    shopItems={mockShopItems}
                    notifications={mockNotifications}
                    onNavigate={handleNavigate}
                  />
                </main>
                <BottomNavigation theme={theme} />
              </div>
            } />
            
            {/* Achievements Page */}
            <Route path="/achievements" element={
              <div className="app">
                <Header
                  user={mockCurrentUser}
                  theme={theme}
                  onNavigate={handleNavigate}
                  notifications={mockNotifications}
                  onToggleNotifications={() => {}}
                  onOpenSettings={() => setShowSettings(true)}
                  hideUserIcon={false}
                />
                <main className="container" style={{ paddingBottom: '80px' }}>
                  <AchievementsPage
                    theme={theme}
                    achievements={mockAchievements}
                    currentPage="/achievements"
                    onNavigate={handleNavigate}
                  />
                </main>
                <BottomNavigation theme={theme} />
              </div>
            } />
            
            {/* Tasks Page */}
            <Route path="/tasks" element={
              <div className="app">
                <Header
                  user={mockCurrentUser}
                  theme={theme}
                  onNavigate={handleNavigate}
                  notifications={mockNotifications}
                  onToggleNotifications={() => {}}
                  onOpenSettings={() => setShowSettings(true)}
                  hideUserIcon={false}
                />
                <main className="container" style={{ paddingBottom: '80px' }}>
                  <TasksPage
                    theme={theme}
                    tasks={mockTasks}
                    currentPage="/tasks"
                    onNavigate={handleNavigate}
                  />
                </main>
                <BottomNavigation theme={theme} />
              </div>
            } />
            
            {/* Shop Page */}
            <Route path="/shop" element={
              <div className="app">
                <Header
                  user={mockCurrentUser}
                  theme={theme}
                  onNavigate={handleNavigate}
                  notifications={mockNotifications}
                  onToggleNotifications={() => {}}
                  onOpenSettings={() => setShowSettings(true)}
                  hideUserIcon={false}
                />
                <main className="container" style={{ paddingBottom: '80px' }}>
                  <ShopPage
                    theme={theme}
                    currentPage="/shop"
                    onNavigate={handleNavigate}
                  />
                </main>
                <BottomNavigation theme={theme} />
              </div>
            } />
            
            {/* Profile Page */}
            <Route path="/profile" element={
              <div className="app">
                <Header
                  user={mockCurrentUser}
                  theme={theme}
                  onNavigate={handleNavigate}
                  notifications={mockNotifications}
                  onToggleNotifications={() => {}}
                  onOpenSettings={() => setShowSettings(true)}
                  hideUserIcon={false}
                />
                <main className="container" style={{ paddingBottom: '80px' }}>
                  <ProfilePage />
                </main>
                <BottomNavigation theme={theme} />
              </div>
            } />
          </Routes>
        </NavigationWrapper>

        {/* Modals */}
        {showSettings && (
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            theme={theme}
            onToggleDarkMode={toggleTheme}
            onOpenProblemReport={() => {
              setShowProblemReport(true);
              setShowSettings(false);
            }}
            hasSecretAccess={hasSecretAccess}
            onOpenAdminPanel={() => setShowAdminPanel(true)}
          />
        )}

        {secretCodeModalOpen && (
          <SecretAdminAccess
            isOpen={secretCodeModalOpen}
            onClose={() => {
              setSecretCodeModalOpen(false);
              setTelegramId('');
              setSecretCode('');
            }}
            theme={theme}
            telegramId={telegramId}
            setTelegramId={setTelegramId}
            secretCode={secretCode}
            setSecretCode={setSecretCode}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onAccessGranted={handleAdminAccessGranted}
          />
        )}

        {showProblemReport && (
          <ProblemReportModal
            isOpen={showProblemReport}
            onClose={() => setShowProblemReport(false)}
            theme={theme}
          />
        )}

        {showAdminPanel && (
          <AdminPanelMain
            isOpen={showAdminPanel}
            onClose={() => setShowAdminPanel(false)}
            theme={theme}
            userRole={secretAccessGrantedRole || 'Admin'}
          />
        )}
        </div>
    </HashRouter>
  );
}