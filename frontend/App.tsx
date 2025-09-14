import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { AchievementsPageFixed } from './components/AchievementsPageFixed';
import { TasksPage } from './components/TasksPage';
import { CasesShopPage } from './components/CasesShopPage';
import { ProfilePage } from './components/ProfilePage';
import { BattlesPageExtended } from './components/BattlesPageExtended';
import { BackgroundFX } from './components/BackgroundFX';
import { SettingsModal } from './components/SettingsModalFixed'; // Используем исправленную версию
import { AdminPanel } from './components/AdminPanel';
import { SecretAdminAccess } from './components/SecretAdminAccess';
import { ProblemReportModal } from './components/ProblemReportModal';
import { AdminPanelTeamLead } from './components/AdminPanelTeamLead';
import { AdminPanelJunior } from './components/AdminPanelJunior';
import { AdminPanelSenior } from './components/AdminPanelSenior';
import { AdminPanelMain } from './components/AdminPanelMain';
import { useUserRole } from './hooks/useUserRole';
import { Achievement } from './types/achievements';
import { ShopItem, Order } from './types/shop';
import { Task } from './types/tasks';
import { CaseType, UserCase } from './types/cases';
import { Notification } from './types/notifications';
import { useTelegram } from './utils/telegram';
import { useTheme } from './hooks/useTheme';
import { initTelegramWebApp, onViewportChange } from './utils/telegram-webapp';

// Mock data
const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Новичок',
    description: 'Создайте свой первый аккаунт',
    icon: '🛡️',
    progress: 100,
    maxProgress: 100,
    completed: true,
    rarity: 'common',
    reward: 100
  },
  {
    id: '2',
    title: 'Трудолюбивый',
    description: 'Выполните 10 задач',
    icon: '⚡',
    progress: 7,
    maxProgress: 10,
    completed: false,
    rarity: 'rare',
    reward: 500
  },
  {
    id: '3',
    title: 'Коллекционер',
    description: 'Откройте 5 кейсов',
    icon: '🎁',
    progress: 2,
    maxProgress: 5,
    completed: false,
    rarity: 'epic',
    reward: 1000
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Новое достижение!',
    message: 'Вы получили достижение "Новичок"',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: '2',
    type: 'task',
    title: 'Новая задача',
    message: 'Вам назначена новая задача',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false
  }
];

const mockShopItems: ShopItem[] = [
  {
    id: '1',
    name: 'Кейс "Удача"',
    description: 'Содержит случайные награды',
    price: 100,
    image: '/api/placeholder/100/100',
    category: 'cases'
  }
];

const mockOrders: Order[] = [];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Изучить документацию',
    description: 'Прочитать руководство пользователя',
    progress: 50,
    maxProgress: 100,
    status: 'in_progress',
    reward: 200
  }
];

const mockCases: UserCase[] = [
  {
    id: '1',
    caseType: 'common',
    name: 'Обычный кейс',
    description: 'Содержит обычные награды',
    price: 100,
    image: '/api/placeholder/100/100',
    quantity: 3
  }
];

// Mock user data
const mockCurrentUser = {
  id: '1',
  name: 'Пользователь',
  level: 1,
  experience: 0,
  gCoins: 1000,
  achievements: mockAchievements,
  notifications: mockNotifications
};

export default function App() {
  const { user, webApp } = useTelegram();
  const { theme, toggleTheme, setTheme, themeToggleCount, resetThemeToggleCount } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  
  // Получаем роль пользователя по его ID
  const { user: userWithRole, userRole, teamMembers } = useUserRole(user?.id?.toString() || '');

  // Initialize Telegram WebApp and handle viewport changes
  useEffect(() => {
    initTelegramWebApp();

    const cleanupViewport = onViewportChange((height) => {
      // Update CSS custom property for viewport height
      document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`);
    });

    return cleanupViewport;
  }, []);

  // Отслеживание переключений темы для секретного доступа
  useEffect(() => {
    if (themeToggleCount >= 8) {
      handleOpenSecretAdminAccess();
      resetThemeToggleCount();
    }
  }, [themeToggleCount]);
  
  const [showSettings, setShowSettings] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSecretAdminAccess, setShowSecretAdminAccess] = useState(false);
  const [showProblemReport, setShowProblemReport] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [hasSecretAccess, setHasSecretAccess] = useState(false); // Новое состояние для секретного доступа
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [personalBattles, setPersonalBattles] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [userCases, setUserCases] = useState<UserCase[]>(mockCases);

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

  const handleOpenSecretAdminAccess = () => {
    setShowSecretAdminAccess(true);
  };

  const handleCloseSecretAdminAccess = () => {
    setShowSecretAdminAccess(false);
  };

  const handleAdminAccessGranted = (role: string) => {
    setAdminRole(role);
    setHasSecretAccess(true); // Устанавливаем секретный доступ
    setShowAdminPanel(true);
    setShowSecretAdminAccess(false);
  };

  const handleOpenProblemReport = () => {
    setShowProblemReport(true);
    setShowSettings(false);
  };

  const handleCloseProblemReport = () => {
    setShowProblemReport(false);
  };

  const handleProblemReportSubmit = async (data: { description: string; file?: File }) => {
    // Здесь можно добавить логику отправки отчета о проблеме
    console.log('Problem report submitted:', data);
    
    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Показываем уведомление об успешной отправке
    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'system',
      title: 'Отчет отправлен',
      message: 'Ваш отчет о проблеме успешно отправлен. Спасибо за обратную связь!',
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'achievements':
        return (
          <AchievementsPageFixed
            theme={theme}
            currentUser={mockCurrentUser}
            notifications={notifications}
            onOpenSettings={handleOpenSettings}
          />
        );
      case 'tasks':
        return (
          <TasksPage
            theme={theme}
            currentUser={mockCurrentUser}
            notifications={notifications}
            onOpenSettings={handleOpenSettings}
          />
        );
      case 'shop':
        return (
          <CasesShopPage
            theme={theme}
            currentUser={mockCurrentUser}
            notifications={notifications}
            onOpenSettings={handleOpenSettings}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            theme={theme}
            currentUser={mockCurrentUser}
            notifications={notifications}
            onOpenSettings={handleOpenSettings}
          />
        );
      case 'battles':
        return (
          <BattlesPageExtended
            theme={theme}
            currentUser={mockCurrentUser}
            notifications={notifications}
            onOpenSettings={handleOpenSettings}
          />
        );
      default:
        return (
          <HomePage
            theme={theme}
            currentUser={mockCurrentUser}
            notifications={notifications}
            onOpenSettings={handleOpenSettings}
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
          onOpenProblemReport={handleOpenProblemReport}
          userId={user?.id?.toString()}
          hasSecretAccess={hasSecretAccess} // Передаем состояние секретного доступа
        />
      )}
      
      {showAdminPanel && userWithRole && (
        <>
          {userRole === 'team_lead' && (
            <AdminPanelTeamLead
              onClose={() => setShowAdminPanel(false)}
              theme={theme}
              teamMembers={teamMembers}
              teamLead={userWithRole}
            />
          )}
          {userRole === 'junior_admin' && (
            <AdminPanelJunior
              onClose={() => setShowAdminPanel(false)}
              theme={theme}
              adminName={userWithRole.name}
            />
          )}
          {userRole === 'senior_admin' && (
            <AdminPanelSenior
              onClose={() => setShowAdminPanel(false)}
              theme={theme}
              adminName={userWithRole.name}
            />
          )}
          {userRole === 'main_admin' && (
            <AdminPanelMain
              onClose={() => setShowAdminPanel(false)}
              theme={theme}
              adminName={userWithRole.name}
            />
          )}
        </>
      )}

      {/* Секретный доступ к админ панели */}
      <SecretAdminAccess
        isOpen={showSecretAdminAccess}
        onClose={handleCloseSecretAdminAccess}
        onAccessGranted={handleAdminAccessGranted}
        theme={theme}
      />

      {/* Модальное окно для сообщения о проблемах */}
      <ProblemReportModal
        isOpen={showProblemReport}
        onClose={handleCloseProblemReport}
        onSubmit={handleProblemReportSubmit}
        theme={theme}
      />
    </div>
  );
};