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
interface User {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  balance: number;
  role: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: {
    xp: number;
    coins: number;
  };
  requirements: {
    type: string;
    value: number;
  };
  icon: string;
  isCompleted: boolean;
}

interface Battle {
  id: string;
  opponentName: string;
  opponentAvatar?: string;
  stake: number;
  status: 'active' | 'pending' | 'completed';
  winnerId?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  reward: {
    xp: number;
    coins: number;
  };
  deadline?: string;
  isCompleted: boolean;
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}

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
    name: 'Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ',
    avatar: undefined,
    level: 1,
    xp: 0,
    balance: 1000,
    role: 'WORKER'
  };

  const mockAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚РЋР В РЎвЂўР В РЎвЂќ',
      description: 'Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ“Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 2 Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР РЏ',
      progress: 50,
      maxProgress: 100,
      reward: { xp: 100, coins: 50 },
      requirements: { type: 'level', value: 2 },
      icon: 'РЎР‚РЎСџР Р‰РЎСџ',
      isCompleted: false
    },
    {
      id: '2',
      title: 'Р В РЎС›Р РЋР вЂљР РЋРЎвЂњР В РўвЂР В РЎвЂўР В Р’В»Р РЋР вЂ№Р В Р’В±Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“',
      description: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ 10 Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ',
      progress: 30,
      maxProgress: 100,
      reward: { xp: 200, coins: 100 },
      requirements: { type: 'tasks', value: 10 },
      icon: 'Р Р†РЎСљР’В¤Р С—РЎвЂР РЏ',
      isCompleted: false
    },
    {
      id: '3',
      title: 'Р В РЎв„ўР В РЎвЂўР В Р’В»Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋРІР‚В Р В РЎвЂР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋР вЂљ',
      description: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ 5 Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р В РЎвЂўР В Р вЂ ',
      progress: 20,
      maxProgress: 100,
      reward: { xp: 150, coins: 75 },
      requirements: { type: 'cases', value: 5 },
      icon: 'РЎР‚РЎСџРІР‚СљР’В¦',
      isCompleted: false
    }
  ];

  const mockBattles: Battle[] = [
    {
      id: '1',
      opponentName: 'Р В Р’В Р Р†Р вЂљРЎС›Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°',
      stake: 250,
      status: 'active'
    }
  ];

  const mockBattleInvitations: Battle[] = [
    {
      id: '2',
      opponentName: 'Р В Р’В Р РЋРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚ВР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°',
      stake: 200,
      status: 'pending'
    },
    {
      id: '3',
      opponentName: 'Р В Р’В Р РЋРІР‚в„ўР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°',
      stake: 150,
      status: 'pending'
    }
  ];

  const mockUsers = [
    { id: '1', name: 'Р В Р’В Р РЋРЎСџР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™ Р В Р’В Р РЋРЎСџР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ', level: 18 },
    { id: '2', name: 'Р В Р’В Р Р†Р вЂљРЎС›Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРЎв„ўР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В·Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', level: 16 },
    { id: '3', name: 'Р В Р’В Р РЋРІР‚в„ўР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°', level: 15 }
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
      title: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ',
      description: 'Р В РЎвЂєР В РЎвЂ”Р В РЎвЂР РЋР С“Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ',
      reward: { xp: 50, coins: 25 },
      isCompleted: false
    }
  ];

  const mockShopItems: ShopItem[] = [
    {
      id: '1',
      name: 'Р В Р’В Р РЋРІвЂћСћР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р Р‹Р В РЎвЂњ',
      price: 100,
      icon: 'РЎР‚РЎСџРІР‚СљР’В¦',
      description: 'Р В Р’В Р В Р вЂ№Р В Р’В Р вЂ™Р’В»Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р’В Р Р†РІР‚С›РІР‚вЂњР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў'
    }
  ];

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В РЎвЂўР В Р’Вµ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ',
      message: 'Р В Р в‚¬ Р В Р вЂ Р В Р’В°Р РЋР С“ Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В Р’Вµ Р РЋР С“Р В РЎвЂўР В РЎвЂўР В Р’В±Р РЋРІР‚В°Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ',
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
                  {/* Use local state so child can update achievements */}
                  {(() => {
                    const [achievementsState, setAchievementsState] = useState(mockAchievements);
                    return (
                      <AchievementsPage
                        theme={theme}
                        achievements={achievementsState}
                        setAchievements={setAchievementsState}
                        currentPage="/achievements"
                        onNavigate={handleNavigate}
                      />
                    );
                  })()}
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
            onToggleTheme={toggleTheme}
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