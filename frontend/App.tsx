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

// РЈС‚РёР»РёС‚Р°СЂРЅР°СЏ С„СѓРЅРєС†РёСЏ РґР»СЏ РјРѕРЅРёС‚РѕСЂРёРЅРіР° localStorage
const getLocalStorageSize = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

// Р¤СѓРЅРєС†РёСЏ РґР»СЏ РѕС‡РёСЃС‚РєРё localStorage РїСЂРё РїРµСЂРµРїРѕР»РЅРµРЅРёРё
const cleanupLocalStorage = () => {
  const keysToRemove = [
    'oldCases', 'tempCases', 'backup_cases', 'cache_', 'temp_'
  ];
  
  keysToRemove.forEach(keyPattern => {
    Object.keys(localStorage).forEach(key => {
      if (key.includes(keyPattern)) {
        localStorage.removeItem(key);
        console.log(`РЈРґР°Р»РµРЅ РєР»СЋС‡: ${key}`);
      }
    });
  });
};

export default function App() {
  // Telegram Web App integration
  const telegram = useTelegram();
  
  const [currentPage, setCurrentPage] = useState('home');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ С‚С‘РјРЅР°СЏ С‚РµРјР°
  const [hasAdminAccess, setHasAdminAccess] = useState(false); // РђРґРјРёРЅ РґРѕСЃС‚СѓРї РѕС‚РєР»СЋС‡РµРЅ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РґРѕСЃС‚РёР¶РµРЅРёР№
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ С‚РѕРІР°СЂРѕРІ
  const [shopItems, setShopItems] = useState<ShopItem[]>(mockShopItems);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ Р·Р°РєР°Р·РѕРІ
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ Р·Р°РґР°С‡
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РєРµР№СЃРѕРІ
  const [cases, setCases] = useState<CaseType[]>([]);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ
  const [userCases, setUserCases] = useState<UserCase[]>(mockUserCases);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ С„РѕС‚Рѕ РїСЂРѕС„РёР»СЏ
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… Р±Р°С‚С‚Р»РѕРІ
  const [personalBattles, setPersonalBattles] = useState<any[]>([]);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёР№
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ Р»РёРґРµСЂР±РѕСЂРґР°
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  
  // Р“Р»РѕР±Р°Р»СЊРЅРѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ СЃРёСЃС‚РµРјС‹ Р±Р°С‚С‚Р»РѕРІ
  const [battles, setBattles] = useState<Battle[]>([
    {
      id: 'battle1',
      challengerId: 'user1',
      challengerName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
      opponentId: 'current-user',
      opponentName: 'Р’С‹',
      stake: 150,
      status: 'completed',
      startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 РґРЅСЏ РЅР°Р·Р°Рґ
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // +30 РјРёРЅСѓС‚
      winnerId: 'user1',
      winnerName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
      loserId: 'current-user',
      loserName: 'Р’С‹'
    },
    {
      id: 'battle2',
      challengerId: 'current-user',
      challengerName: 'Р’С‹',
      opponentId: 'user3',
      opponentName: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°',
      stake: 200,
      status: 'completed',
      startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 РґРЅРµР№ РЅР°Р·Р°Рґ
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000), // +45 РјРёРЅСѓС‚
      winnerId: 'current-user',
      winnerName: 'Р’С‹',
      loserId: 'user3',
      loserName: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°'
    },
    {
      id: 'battle3',
      challengerId: 'user4',
      challengerName: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ',
      opponentId: 'user2',
      opponentName: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ',
      stake: 100,
      status: 'completed',
      startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 РґРЅРµР№ РЅР°Р·Р°Рґ
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000), // +20 РјРёРЅСѓС‚
      winnerId: 'user4',
      winnerName: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ',
      loserId: 'user2',
      loserName: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ'
    },
    {
      id: 'battle4',
      challengerId: 'user5',
      challengerName: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°',
      opponentId: 'current-user',
      opponentName: 'Р’С‹',
      stake: 75,
      status: 'active',
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 С‡Р°СЃР° РЅР°Р·Р°Рґ
    }
  ]);
  const [battleInvitations, setBattleInvitations] = useState<BattleInvitation[]>([
    {
      id: 'invitation1',
      challengerId: 'user3',
      challengerName: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°',
      opponentId: 'current-user',
      opponentName: 'Р’С‹',
      stake: 120,
      message: 'Р’С‹Р·С‹РІР°СЋ РЅР° СЂРµРІР°РЅС€!',
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 РјРёРЅСѓС‚ РЅР°Р·Р°Рґ
      expiresAt: new Date(Date.now() + 23.5 * 60 * 60 * 1000), // РёСЃС‚РµРєР°РµС‚ С‡РµСЂРµР· 23.5 С‡Р°СЃР°
      status: 'pending'
    },
    {
      id: 'invitation2',
      challengerId: 'user1',
      challengerName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
      opponentId: 'current-user',
      opponentName: 'Р’С‹',
      stake: 180,
      createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 РјРёРЅСѓС‚ РЅР°Р·Р°Рґ
      expiresAt: new Date(Date.now() + 23.8 * 60 * 60 * 1000), // РёСЃС‚РµРєР°РµС‚ С‡РµСЂРµР· 23.8 С‡Р°СЃР°
      status: 'pending'
    }
  ]);
  // РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ СЃ РґР°РЅРЅС‹РјРё РёР· Telegram
  const initializeUsers = () => {
    const currentUserData = {
      id: 'current-user',
      name: telegram.user ? 
        `${telegram.user.first_name}${telegram.user.last_name ? ' ' + telegram.user.last_name : ''}` : 
        'Р’С‹',
      level: 10,
      rating: 950,
      balance: 1500,
      isOnline: true,
      telegramId: telegram.user?.id || null,
      username: telegram.user?.username || null,
      avatar: telegram.user?.photo_url || null
    };

    return [
      currentUserData,
      { id: 'user1', name: 'РђРЅРЅР° РРІР°РЅРѕРІР°', level: 15, rating: 1250, balance: 2500, isOnline: true },
      { id: 'user2', name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ', level: 12, rating: 980, balance: 1800, isOnline: false },
      { id: 'user3', name: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°', level: 18, rating: 1450, balance: 3200, isOnline: true },
      { id: 'user4', name: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ', level: 14, rating: 1120, balance: 2100, isOnline: true },
      { id: 'user5', name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°', level: 16, rating: 1380, balance: 2800, isOnline: false }
    ];
  };

  const [users, setUsers] = useState<User[]>(initializeUsers());
  
  // Р¤Р»пїЅпїЅРі РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ РїРµСЂРІРѕР№ Р·Р°РіСЂСѓР·РєРё
  const casesInitialized = useRef(false);

  const handleNavigate = (page: string) => {
    // РџСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј СЃР»СѓС‡Р°Р№РЅС‹Рµ РїРµСЂРµС…РѕРґС‹ РїСЂРё РѕР±СЂР°Р±РѕС‚РєРµ СЃРµРєСЂРµС‚РЅРѕРіРѕ РєРѕРґР°
    if (page !== 'admin') {
      setCurrentPage(page);
    }
  };

  const handleOpenSettings = () => {
    setSettingsOpen(true);
  };

  const handleOpenAdminPanel = () => {
    setCurrentPage('admin');
  };

  const handleAdminNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Р¤СѓРЅРєС†РёРё РґР»СЏ СѓРїСЂР°РІР»РµРЅРёСЏ СѓРІРµРґРѕРјР»РµРЅРёСЏРјРё
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // РђР’РўРћРњРђРўРР§Р•РЎРљРР• РЈР’Р•Р”РћРњР›Р•РќРРЇ Р”Р›РЇ Р’РЎР•РҐ РЎРћР‘Р«РўРР™

  // Р¤СѓРЅРєС†РёРё РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ РёР·РјРµРЅРµРЅРёР№ РґР»СЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРёС… СѓРІРµРґРѕРјР»РµРЅРёР№
  const handleAchievementUnlock = (achievement: Achievement) => {
    if (achievement.unlocked) {
      addNotification({
        type: 'achievement',
        title: 'рџЏ† Р”РѕСЃС‚РёР¶РµРЅРёРµ СЂР°Р·Р±Р»РѕРєРёСЂРѕРІР°РЅРѕ!',
        message: `РџРѕР·РґСЂР°РІР»СЏРµРј! Р’С‹ РїРѕР»СѓС‡РёР»Рё РґРѕСЃС‚РёР¶РµРЅРёРµ "${achievement.title}". ${achievement.reward ? `РќР°РіСЂР°РґР°: ${achievement.reward} РєРѕРёРЅРѕРІ.` : ''}`,
        priority: 'high',
        data: { 
          achievementId: achievement.id, 
          achievementTitle: achievement.title,
          reward: achievement.reward 
        }
      });
      
      // РќР°С‡РёСЃР»СЏРµРј РЅР°РіСЂР°РґСѓ
      if (achievement.reward) {
        updateUserBalance('current-user', achievement.reward);
      }
    }
  };

  const handleNewTask = (task: Task) => {
    addNotification({
      type: 'task',
      title: 'рџ“‹ РќРѕРІР°СЏ Р·Р°РґР°С‡Р° РЅР°Р·РЅР°С‡РµРЅР°!',
      message: `Р’Р°Рј РЅР°Р·РЅР°С‡РµРЅР° Р·Р°РґР°С‡Р°: "${task.title}". ${task.deadline ? `РљСЂР°Р№РЅРёР№ СЃСЂРѕРє: ${new Date(task.deadline).toLocaleDateString()}` : 'Р’С‹РїРѕР»РЅРёС‚Рµ РІ СѓРґРѕР±РЅРѕРµ РІСЂРµРјСЏ.'}`,
      priority: task.priority === 'high' ? 'high' : 'medium',
      data: { 
        taskId: task.id, 
        taskTitle: task.title,
        deadline: task.deadline,
        reward: task.reward
      }
    });
  };

  const handleTaskCompletion = (task: Task) => {
    if (task.completed) {
      addNotification({
        type: 'task',
        title: 'вњ… Р—Р°РґР°С‡Р° РІС‹РїРѕР»РЅРµРЅР°!',
        message: `Р—Р°РґР°С‡Р° "${task.title}" СѓСЃРїРµС€РЅРѕ РІС‹РїРѕР»РЅРµРЅР°! ${task.reward ? `РџРѕР»СѓС‡РµРЅРѕ: ${task.reward} РєРѕРёРЅРѕРІ Рё ${task.experience || 50} РѕРїС‹С‚Р°.` : 'РћС‚Р»РёС‡РЅР°СЏ СЂР°Р±РѕС‚Р°!'}`,
        priority: 'medium',
        data: { 
          taskId: task.id, 
          taskTitle: task.title,
          reward: task.reward,
          experience: task.experience
        }
      });
      
      // РќР°С‡РёСЃР»СЏРµРј РЅР°РіСЂР°РґСѓ
      if (task.reward) {
        updateUserBalance('current-user', task.reward);
      }
      if (task.experience) {
        updateUserExperience('current-user', task.experience);
      }
    }
  };

  const handleNewShopItem = (item: ShopItem) => {
    addNotification({
      type: 'shop',
      title: 'рџ›ЌпёЏ РќРѕРІС‹Р№ С‚РѕпїЅпїЅР°СЂ РІ РјР°РіР°Р·РёРЅРµ!',
      message: `Р”РѕР±Р°РІР»РµРЅ РЅРѕРІС‹Р№ С‚РѕРІР°СЂ: "${item.title}". ${item.sale ? `рџ”Ґ РЎРєРёРґРєР° ${item.sale}%!` : `Р¦РµРЅР°: ${item.price} РєРѕРёРЅРѕРІ.`}`,
      priority: item.sale ? 'high' : 'medium',
      data: { 
        itemId: item.id, 
        itemTitle: item.title,
        price: item.price,
        sale: item.sale
      }
    });
  };

  const handleShopItemSale = (item: ShopItem, oldPrice: number) => {
    if (item.sale && item.sale > 0) {
      const salePrice = item.price * (1 - item.sale / 100);
      addNotification({
        type: 'shop',
        title: 'рџ”Ґ РЎРєРёРґРєР° РЅР° С‚РѕРІР°СЂ!',
        message: `РЎРєРёРґРєР° ${item.sale}% РЅР° "${item.title}"! Р¦РµРЅР°: ${Math.round(salePrice)} РєРѕРёРЅРѕРІ (Р±С‹Р»Рѕ ${oldPrice}).`,
        priority: 'high',
        data: { 
          itemId: item.id, 
          itemTitle: item.title,
          oldPrice,
          newPrice: salePrice,
          salePercent: item.sale
        }
      });
    }
  };

  const handleOrderApproval = (order: Order) => {
    if (order.status === 'approved') {
      addNotification({
        type: 'shop',
        title: 'вњ… РџРѕРєСѓРїРєР° РѕРґРѕР±СЂРµРЅР°!',
        message: `Р’Р°С€ Р·Р°РєР°Р· "${order.itemTitle}" РѕРґРѕР±СЂРµРЅ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРј. РћР¶РёРґР°Р№С‚Рµ РІС‹РїРѕР»РЅРµРЅРёСЏ Р·Р°РєР°Р·Р°.`,
        priority: 'medium',
        data: { 
          orderId: order.id, 
          itemTitle: order.itemTitle,
          totalPrice: order.totalPrice
        }
      });
    } else if (order.status === 'rejected') {
      addNotification({
        type: 'shop',
        title: 'вќЊ РџРѕРєСѓРїРєР° РѕС‚РєР»РѕРЅРµРЅР°',
        message: `Р’Р°С€ Р·Р°РєР°Р· "${order.itemTitle}" РѕС‚РєР»РѕРЅРµРЅ. РЎСЂРµРґСЃС‚РІР° РІРѕР·РІСЂР°С‰РµРЅС‹ РЅР° Р±Р°Р»Р°РЅСЃ.`,
        priority: 'medium',
        data: { 
          orderId: order.id, 
          itemTitle: order.itemTitle,
          refundAmount: order.totalPrice
        }
      });
      
      // Р’РѕР·РІСЂР°С‰Р°РµРј РґРµРЅСЊРіРё
      updateUserBalance('current-user', order.totalPrice);
    }
  };

  const handleNewCase = (caseItem: CaseType) => {
    addNotification({
      type: 'case',
      title: 'рџ“¦ РќРѕРІС‹Р№ РєРµР№СЃ РґРѕР±Р°РІР»РµРЅ!',
      message: `Р”РѕР±Р°РІР»РµРЅ РЅРѕРІС‹Р№ РєРµР№СЃ: "${caseItem.name}". Р¦РµРЅР°: ${caseItem.price} РєРѕРёРЅРѕРІ. РџРѕРїСЂРѕР±СѓР№С‚Рµ СЃРІРѕСЋ СѓРґР°С‡Сѓ!`,
      priority: 'medium',
      data: { 
        caseId: caseItem.id, 
        caseName: caseItem.name,
        price: caseItem.price
      }
    });
  };

  const handleCaseOpening = (caseItem: CaseType, prize: any) => {
    addNotification({
      type: 'case',
      title: 'рџЋЃ РљРµР№СЃ РѕС‚РєСЂС‹С‚!',
      message: `РР· РєРµР№СЃР° "${caseItem.name}" РІС‹РїР°Р» РїСЂРёР·: "${prize.name}"! ${prize.type === 'coins' ? `РџРѕР»СѓС‡РµРЅРѕ: ${prize.value} РєРѕРёРЅРѕРІ.` : `Р РµРґРєРѕСЃС‚СЊ: ${prize.rarity}.`}`,
      priority: prize.rarity === 'legendary' ? 'high' : 'medium',
      data: { 
        caseId: caseItem.id, 
        caseName: caseItem.name,
        prizeName: prize.name,
        prizeType: prize.type,
        prizeValue: prize.value,
        rarity: prize.rarity
      }
    });
  };

  const handleAdminResponse = (message: string, type: 'approval' | 'rejection' | 'info' = 'info') => {
    addNotification({
      type: 'admin',
      title: type === 'approval' ? 'вњ… РћС‚РІРµС‚ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°' : type === 'rejection' ? 'вќЊ РћС‚РІРµС‚ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°' : 'рџ’¬ РЎРѕРѕР±С‰РµРЅРёРµ РѕС‚ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°',
      message: message,
      priority: type === 'approval' || type === 'rejection' ? 'high' : 'medium',
      data: { 
        responseType: type,
        timestamp: new Date()
      }
    });
  };

  // Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ СЃРёСЃС‚РµРјРЅС‹Рµ СѓРІРµРґРѕРјР»РµРЅРёСЏ
  const handleSystemUpdate = (version: string) => {
    addNotification({
      type: 'system',
      title: 'рџљЂ РћР±РЅРѕРІР»РµРЅРёРµ СЃРёСЃС‚РµРјС‹',
      message: `GRITHER РѕР±РЅРѕРІР»РµРЅ РґРѕ РІРµСЂСЃРёРё ${version}. РЈР»СѓС‡С€РµРЅР° РїСЂРѕРёР·РІРѕРґРёС‚РµР»СЊРЅРѕСЃС‚СЊ Рё РґРѕР±Р°РІР»РµРЅС‹ РЅРѕРІС‹Рµ С„СѓРЅРєС†РёРё!`,
      priority: 'medium',
      data: { version, updateType: 'system' }
    });
  };

  const handleMaintenanceNotification = (startTime: Date, duration: string) => {
    addNotification({
      type: 'system',
      title: 'рџ”§ РџР»Р°РЅРѕРІС‹Рµ С‚РµС…СЂР°Р±РѕС‚С‹',
      message: `РџР»Р°РЅРѕРІС‹Рµ С‚РµС…СЂР°Р±РѕС‚С‹ РЅР°С‡РЅСѓС‚СЃСЏ ${startTime.toLocaleString()}. РџСЂРѕРґРѕР»Р¶РёС‚РµР»СЊРЅРѕСЃС‚СЊ: ${duration}. РЎРёСЃС‚РµРјР° РјРѕР¶РµС‚ Р±С‹С‚СЊ РЅРµРґРѕСЃС‚СѓРїРЅР°.`,
      priority: 'high',
      data: { startTime, duration, maintenanceType: 'planned' }
    });
  };

  const handleLeaderboardUpdate = (position: number, previousPosition?: number) => {
    if (previousPosition && position < previousPosition) {
      addNotification({
        type: 'achievement',
        title: 'рџ“€ Р РѕСЃС‚ РІ СЂРµР№С‚РёРЅРіРµ!',
        message: `РџРѕР·РґСЂР°РІР»СЏРµРј! Р’С‹ РїРѕРґРЅСЏР»РёСЃСЊ РІ СЂРµР№С‚РёРЅРіРµ СЃ ${previousPosition} РЅР° ${position} РјРµСЃС‚Рѕ!`,
        priority: 'medium',
        data: { newPosition: position, previousPosition, improvement: previousPosition - position }
      });
    }
  };

  const handleWeeklyChallenge = (challengeName: string, reward: number) => {
    addNotification({
      type: 'challenge',
      title: 'рџЏ† РќРѕРІС‹Р№ РµР¶РµРЅРµРґРµР»СЊРЅС‹Р№ С‡РµР»Р»РµРЅРґР¶!',
      message: `РЎС‚Р°СЂС‚РѕРІР°Р» РЅРѕРІС‹Р№ С‡РµР»Р»РµРЅРґР¶: "${challengeName}". РќР°РіСЂР°РґР° РїРѕР±РµРґРёС‚РµР»СЋ: ${reward} РєРѕРёРЅРѕРІ!`,
      priority: 'high',
      data: { challengeName, reward, challengeType: 'weekly' }
    });
  };

  const handleSpecialEvent = (eventName: string, description: string) => {
    addNotification({
      type: 'event',
      title: 'рџЋ‰ РЎРїРµС†РёР°Р»СЊРЅРѕРµ СЃРѕР±С‹С‚РёРµ!',
      message: `${eventName}: ${description}`,
      priority: 'high',
      data: { eventName, description, eventType: 'special' }
    });
  };

  // Р¤СѓРЅРєС†РёРё РґР»СЏ СѓРїСЂР°РІР»РµРЅРёСЏ Р±Р°С‚С‚Р»Р°РјРё
  const createBattleInvitation = (invitation: Omit<BattleInvitation, 'id' | 'createdAt' | 'expiresAt' | 'status'>) => {
    // РџСЂРѕРІРµСЂСЏРµРј Р±Р°Р»Р°РЅСЃ РёРЅРёС†РёР°С‚РѕСЂР°
    const challengerBalance = getUserBalance(invitation.challengerId);
    if (challengerBalance < invitation.stake) {
      addNotification({
        type: 'error',
        title: 'РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ!',
        message: `РЈ РІР°СЃ РЅРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РєРѕРёРЅРѕРІ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ Р±Р°С‚С‚Р»Р°. РўСЂРµР±СѓРµС‚СЃСЏ: ${invitation.stake}, Сѓ РІР°СЃ: ${challengerBalance}`,
        priority: 'high'
      });
      return;
    }

    // РџСЂРѕРІРµСЂСЏРµРј Р±Р°Р»Р°РЅСЃ РѕРїРїРѕРЅРµРЅС‚Р°  
    const opponentBalance = getUserBalance(invitation.opponentId);
    if (opponentBalance < invitation.stake) {
      addNotification({
        type: 'error',
        title: 'РќРµРІРѕР·РјРѕР¶РЅРѕ СЃРѕР·РґР°С‚СЊ Р±Р°С‚С‚Р»!',
        message: `РЈ ${invitation.opponentName} РЅРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РєРѕРёРЅРѕРІ РґР»СЏ СѓС‡Р°СЃС‚РёСЏ РІ Р±Р°С‚С‚Р»Рµ.`,
        priority: 'medium'
      });
      return;
    }
    
    const newInvitation: BattleInvitation = {
      ...invitation,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 С‡Р°СЃР°
      status: 'pending'
    };
    
    setBattleInvitations(prev => [newInvitation, ...prev]);
    
    // РћС‚РїСЂР°РІР»СЏРµРј СѓРІРµРґРѕРјР»РµРЅРёРµ РїРѕР»СѓС‡Р°С‚РµР»СЋ
    addNotification({
      type: 'battle',
      title: 'РќРѕРІС‹Р№ РІС‹Р·РѕРІ РЅР° Р±Р°С‚С‚Р»!',
      message: `${invitation.challengerName} РІС‹Р·С‹РІР°РµС‚ РІР°СЃ РЅР° Р±Р°С‚С‚Р». РЎС‚Р°РІРєР°: ${invitation.stake} РєРѕРёРЅРѕРІ.`,
      priority: 'high',
      data: { invitationId: newInvitation.id, stake: invitation.stake }
    });

    console.log('РЎРѕР·РґР°РЅРѕ РїСЂРёРіР»Р°С€РµРЅРёРµ РЅР° Р±Р°С‚С‚Р»:', newInvitation);
  };

  const acceptBattleInvitation = (invitationId: string) => {
    const invitation = battleInvitations.find(inv => inv.id === invitationId);
    if (!invitation) return;

    // РџСЂРѕРІРµСЂСЏРµРј Р±Р°Р»Р°РЅСЃ РїСЂРёРЅРёРјР°СЋС‰РµРіРѕ
    const opponentBalance = getUserBalance(invitation.opponentId);
    if (opponentBalance < invitation.stake) {
      addNotification({
        type: 'error',
        title: 'РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ!',
        message: `РЈ РІР°СЃ РЅРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РєРѕРёРЅРѕРІ РґР»СЏ СѓС‡Р°СЃС‚РёСЏ РІ Р±Р°С‚С‚Р»Рµ. РўСЂРµР±СѓРµС‚СЃСЏ: ${invitation.stake}, Сѓ РІР°СЃ: ${opponentBalance}`,
        priority: 'high'
      });
      return;
    }

    // РџСЂРѕРІРµСЂСЏРµРј Р±Р°Р»Р°РЅСЃ РёРЅРёС†РёР°С‚РѕСЂР°
    const challengerBalance = getUserBalance(invitation.challengerId);
    if (challengerBalance < invitation.stake) {
      addNotification({
        type: 'error',
        title: 'Р‘Р°С‚С‚Р» РѕС‚РјРµРЅРµРЅ!',
        message: `РЈ ${invitation.challengerName} РЅРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ РєРѕРёРЅРѕРІ РґР»СЏ РїСЂРѕРґРѕР»Р¶РµРЅРёСЏ Р±Р°С‚С‚Р»Р°.`,
        priority: 'medium'
      });
      
      // РћС‚РєР»РѕРЅСЏРµРј РїСЂРёРіР»Р°С€РµРЅРёРµ
      setBattleInvitations(prev => 
        prev.map(inv => 
          inv.id === invitationId 
            ? { ...inv, status: 'declined' as const }
            : inv
        )
      );
      return;
    }

    // РћР±РЅРѕРІР»СЏРµРј СЃС‚Р°С‚СѓСЃ РїСЂРёРіР»Р°С€РµРЅРёСЏ
    setBattleInvitations(prev => 
      prev.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: 'accepted' as const }
          : inv
      )
    );

    // РЎРѕР·РґР°РµРј Р°РєС‚РёРІРЅС‹Р№ Р±Р°С‚С‚Р»
    const newBattle: Battle = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      challengerId: invitation.challengerId,
      challengerName: invitation.challengerName,
      opponentId: invitation.opponentId,
      opponentName: invitation.opponentName,
      stake: invitation.stake,
      status: 'active',
      startedAt: new Date()
    };

    setBattles(prev => [newBattle, ...prev]);

    // РЈРІРµРґРѕРјР»СЏРµРј РёРЅРёС†РёР°С‚РѕСЂР°
    addNotification({
      type: 'battle',
      title: 'Р’С‹Р·РѕРІ РїСЂРёРЅСЏС‚!',
      message: `${invitation.opponentName} РїСЂРёРЅСЏР» РІР°С€ РІС‹Р·РѕРІ РЅР° Р±Р°С‚С‚Р». РЎС‚Р°РІРєР°: ${invitation.stake} РєРѕРёРЅРѕРІ.`,
      priority: 'medium',
      data: { battleId: newBattle.id }
    });

    console.log('Р‘Р°С‚С‚Р» СЃРѕР·РґР°РЅ:', newBattle);
  };

  const declineBattleInvitation = (invitationId: string) => {
    const invitation = battleInvitations.find(inv => inv.id === invitationId);
    if (!invitation) return;

    setBattleInvitations(prev => 
      prev.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: 'declined' as const }
          : inv
      )
    );

    // РЈРІРµРґРѕРјР»СЏРµРј РёРЅРёС†РёР°С‚РѕСЂР°
    addNotification({
      type: 'battle',
      title: 'Р’С‹Р·РѕРІ РѕС‚РєР»РѕРЅРµРЅ',
      message: `${invitation.opponentName} РѕС‚РєР»РѕРЅРёР» РІР°С€ РІС‹Р·РѕРІ РЅР° Р±Р°С‚С‚Р».`,
      priority: 'low',
      data: { invitationId }
    });
  };

  // Р¤СѓРЅРєС†РёРё РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ Р±Р°Р»Р°РЅСЃРѕРј
  const updateUserBalance = (userId: string, amount: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, balance: Math.max(0, user.balance + amount) }
          : user
      )
    );
  };

  const updateUserExperience = (userId: string, amount: number) => {
    setUsers(prev => 
      prev.map(user => {
        if (user.id === userId) {
          const oldLevel = user.level;
          const newExperience = Math.max(0, (user.experience || 0) + amount);
          const newLevel = user.level + Math.floor(newExperience / 1000) - Math.floor((user.experience || 0) / 1000);
          
          // РЈРІРµРґРѕРјР»РµРЅРёРµ Рѕ РїРѕРІС‹С€РµРЅРёРё СѓСЂРѕРІРЅСЏ
          if (newLevel > oldLevel && userId === 'current-user') {
            addNotification({
              type: 'achievement',
              title: 'рџЋ‰ РќРѕРІС‹Р№ СѓСЂРѕРІРµРЅСЊ!',
              message: `РџРѕР·РґСЂР°РІР»СЏРµРј! Р’С‹ РґРѕСЃС‚РёРіР»Рё ${newLevel} СѓСЂРѕРІРЅСЏ. РџРѕР»СѓС‡РµРЅРѕ: ${(newLevel - oldLevel) * 100} РєРѕРёРЅРѕРІ Р±РѕРЅСѓСЃР°!`,
              priority: 'high',
              data: { oldLevel, newLevel, bonusCoins: (newLevel - oldLevel) * 100 }
            });
            
            // РќР°С‡РёСЃР»СЏРµРј Р±РѕРЅСѓСЃ Р·Р° РЅРѕРІС‹Р№ СѓСЂРѕРІРµРЅСЊ
            updateUserBalance(userId, (newLevel - oldLevel) * 100);
          }
          
          return { 
            ...user, 
            experience: newExperience,
            level: newLevel
          };
        }
        return user;
      })
    );
  };

  const getUserBalance = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.balance : 0;
  };

  const completeBattle = (battleId: string, winnerId: string) => {
    const battle = battles.find(b => b.id === battleId);
    if (!battle) return;

    const winnerName = winnerId === battle.challengerId ? battle.challengerName : battle.opponentName;
    const loserName = winnerId === battle.challengerId ? battle.opponentName : battle.challengerName;
    const loserId = winnerId === battle.challengerId ? battle.opponentId : battle.challengerId;

    // РќР°С‡РёСЃР»СЏРµРј РґРµРЅСЊРіРё РїРѕР±РµРґРёС‚РµР»СЋ Рё СЃРїРёСЃС‹РІР°РµРј СЃ РїСЂРѕРёРіСЂР°РІС€РµРіРѕ
    updateUserBalance(winnerId, battle.stake);
    updateUserBalance(loserId, -battle.stake);

    setBattles(prev => 
      prev.map(b => 
        b.id === battleId 
          ? { 
              ...b, 
              status: 'completed' as const,
              completedAt: new Date(),
              winnerId,
              winnerName,
              loserId,
              loserName
            }
          : b
      )
    );

    // РЈРІРµРґРѕРјР»СЏРµРј СѓС‡Р°СЃС‚РЅРёРєРѕРІ Рѕ СЂРµР·СѓР»СЊС‚Р°С‚Рµ
    if (winnerId === 'current-user') {
      addNotification({
        type: 'battle',
        title: 'рџЋ‰ Р‘Р°С‚С‚Р» РІС‹РёРіСЂР°РЅ!',
        message: `РџРѕР·РґСЂР°РІР»СЏРµРј! Р’С‹ РїРѕР±РµРґРёР»Рё РІ Р±Р°С‚С‚Р»Рµ РїСЂРѕС‚РёРІ ${loserName}. РџРѕР»СѓС‡РµРЅРѕ: ${battle.stake} РєРѕРёРЅРѕРІ.`,
        priority: 'high',
        data: { battleId, winnerId, stake: battle.stake, result: 'victory' }
      });
    } else if (loserId === 'current-user') {
      addNotification({
        type: 'battle',
        title: 'рџ” Р‘Р°С‚С‚Р» РїСЂРѕРёРіСЂР°РЅ',
        message: `Р‘Р°С‚С‚Р» РїСЂРѕС‚РёРІ ${winnerName} Р·Р°РІРµСЂС€РёР»СЃСЏ РїРѕСЂР°Р¶РµРЅРёРµРј. РџРѕС‚РµСЂСЏРЅРѕ: ${battle.stake} РєРѕРёРЅРѕРІ.`,
        priority: 'medium',
        data: { battleId, winnerId, stake: battle.stake, result: 'defeat' }
      });
    } else {
      addNotification({
        type: 'battle',
        title: 'вљ”пёЏ Р‘Р°С‚С‚Р» Р·Р°РІРµСЂС€РµРЅ',
        message: `Р‘Р°С‚С‚Р» Р·Р°РІРµСЂС€РµРЅ! РџРѕР±РµРґРёС‚РµР»СЊ: ${winnerName}, РїСЂРѕРёРіСЂР°РІС€РёР№: ${loserName}. РЎС‚Р°РІРєР°: ${battle.stake} РєРѕРёРЅРѕРІ.`,
        priority: 'low',
        data: { battleId, winnerId, stake: battle.stake, result: 'spectator' }
      });
    }

    console.log(`Р‘Р°С‚С‚Р» Р·Р°РІРµСЂС€РµРЅ. РџРѕР±РµРґРёС‚РµР»СЊ ${winnerName} РїРѕР»СѓС‡РёР» ${battle.stake} РєРѕРёРЅРѕРІ, РїСЂРѕРёРіСЂР°РІС€РёР№ ${loserName} РїРѕС‚РµСЂСЏР» ${battle.stake} РєРѕРёРЅРѕРІ.`);
  };

  const handleToggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // РџСЂРёРјРµРЅСЏРµРј С‚РµРјРЅСѓСЋ С‚РµРјСѓ пїЅпїЅ РґРѕРєСѓРјРµРЅС‚Сѓ Рё РґРѕР±Р°РІР»СЏРµРј viewport meta tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Р”РѕР±Р°РІР»СЏРµРј viewport meta tag РґР»СЏ РєРѕСЂСЂРµРєС‚РЅРѕРіРѕ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РЅР° РјРѕР±РёР»СЊРЅС‹С… СѓСЃС‚СЂРѕР№СЃС‚РІР°С…
    let viewport = document.querySelector("meta[name=viewport]");
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }, [isDarkMode]);

  // Р—Р°РіСЂСѓР¶Р°РµРј СЃРѕС…СЂР°РЅС‘РЅРЅСѓСЋ С‚РµРјСѓ РїСЂРё РёРЅРёС†РёР°Р»РёР·Р°С†РёРё Рё СЃРёРЅС…СЂРѕРЅРёР·РёСЂСѓРµРј СЃ Telegram
  useEffect(() => {
    // Р•СЃР»Рё РґРѕСЃС‚СѓРїРµРЅ Telegram Web App, РёСЃРїРѕР»СЊР·СѓРµРј РµРіРѕ С‚РµРјСѓ
    if (telegram.isAvailable) {
      const telegramTheme = telegram.colorScheme === 'dark';
      setIsDarkMode(telegramTheme);
      localStorage.setItem('theme', telegramTheme ? 'dark' : 'light');
      console.log('рџЋЁ РўРµРјР° СЃРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅР° СЃ Telegram:', telegram.colorScheme);
    } else {
      // РРЅР°С‡Рµ Р·Р°РіСЂСѓР¶Р°РµРј СЃРѕС…СЂР°РЅС‘РЅРЅСѓСЋ С‚РµРјСѓ
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        setIsDarkMode(false);
      } else {
        setIsDarkMode(true); // РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ С‚С‘РјРЅР°СЏ С‚РµРјР°
      }
    }

    // РњРѕРЅРёС‚РѕСЂРёРЅРі СЂР°Р·РјРµСЂР° localStorage РїСЂРё Р·Р°РіСЂСѓР·РєРµ
    const totalSize = getLocalStorageSize();
    console.log(`РћР±С‰РёР№ СЂР°Р·РјРµСЂ localStorage: ${(totalSize / 1024).toFixed(2)} KB`);
    
    // Р•СЃР»Рё СЂР°Р·РјРµСЂ Р±РѕР»СЊС€Рµ 8MB, РІС‹РїпїЅпїЅР»РЅСЏРµРј РѕС‡РёСЃС‚РєСѓ
    if (totalSize > 8 * 1024 * 1024) {
      console.warn('localStorage Р±Р»РёР·РѕРє Рє РїРµСЂРµРїРѕР»РЅРµРЅРёСЋ, РІС‹РїРѕР»РЅСЏРµРј РѕС‡РёСЃС‚РєСѓ');
      cleanupLocalStorage();
    }
  }, []);

  // Р—Р°РіСЂСѓР¶Р°РµРј РєРµР№СЃС‹ РїСЂРё РёРЅРёС†РёР°Р»РёР·Р°С†РёРё
  useEffect(() => {
    const savedCases = localStorage.getItem('cases');
    if (savedCases) {
      try {
        const parsedCases = JSON.parse(savedCases);
        
        // РњРµСЂР¶РёРј СЃРѕС…СЂР°РЅРµпїЅпїЅРЅС‹Рµ РєРµР№СЃС‹ СЃ mock РґР°РЅРЅС‹РјРё
        // Р­С‚Рѕ РїРѕР·РІРѕР»СЏРµС‚ СЃРѕС…СЂР°РЅРёС‚СЊ РёР·РјРµРЅРµРЅРёСЏ, РЅРѕ РІРѕСЃСЃС‚Р°РЅРѕРІРёС‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РёР· mock РґР°РЅРЅС‹С…
        const mergedCases = parsedCases.map((savedCase: any) => {
          const mockCase = mockCaseTypes.find(mock => mock.id === savedCase.id);
          if (mockCase) {
            return {
              ...savedCase,
              // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј РёР·РѕР±СЂР°Р¶РµРЅРёРµ РёР· mock РґР°РЅРЅС‹С… РµСЃР»Рё РѕРЅРѕ РЅРµ Р±С‹Р»Рѕ СЃРѕС…СЂР°РЅРµРЅРѕ
              image: savedCase.image || mockCase.image,
              // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РїСЂРёР·РѕРІ РёР· mock РґР°РЅРЅС‹С…
              prizes: savedCase.prizes.map((savedPrize: any) => {
                const mockPrize = mockCase.prizes.find(mp => mp.id === savedPrize.id);
                return {
                  ...savedPrize,
                  image: savedPrize.image || (mockPrize ? mockPrize.image : savedPrize.image)
                };
              })
            };
          }
          return savedCase;
        });
        
        setCases(mergedCases);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ РєРµР№СЃРѕРІ:', error);
        setCases(mockCaseTypes);
      }
    } else {
      // Р•СЃР»Рё РЅРµС‚ СЃРѕС…СЂР°РЅРµРЅРЅС‹С… РєРµР№СЃРѕРІ, РёСЃРїРѕР»СЊР·СѓРµРј mock РґР°РЅРЅС‹Рµ
      setCases(mockCaseTypes);
    }
    casesInitialized.current = true;
  }, []);

  // РЎРѕС…СЂР°РЅСЏРµРј РєРµР№СЃС‹ РїСЂРё РёР·РјРµРЅРµРЅРёРё (РЅРѕ РЅРµ РїСЂРё РїРµСЂРІРѕР№ Р·Р°РіСЂСѓР·РєРµ)
  useEffect(() => {
    if (casesInitialized.current && cases.length > 0) {
      try {
        // РЎРѕР·РґР°РµРј СѓРїСЂРѕС‰РµРЅРЅСѓСЋ РІРµСЂСЃРёСЋ РєРµР№СЃРѕРІ РґР»СЏ СЃРѕС…СЂР°РЅРµРЅРёСЏ (Р±РµР· base64 РёР·РѕР±СЂР°Р¶РµРЅРёР№)
        const casesToSave = cases.map(caseItem => {
          // Р•СЃР»Рё РёР·РѕР±СЂР°Р¶РµРЅРёРµ - СЌС‚Рѕ base64, РЅРµ СЃРѕС…СЂР°РЅСЏРµРј РµРіРѕ
          const isBase64Image = caseItem.image && caseItem.image.startsWith('data:');
          
          return {
            ...caseItem,
            // РЎРѕС…СЂР°РЅСЏРµРј РёР·РѕР±СЂР°Р¶РµРЅРёРµ С‚РѕР»СЊРєРѕ РµСЃР»Рё СЌС‚Рѕ РЅРµ base64
            image: isBase64Image ? null : caseItem.image,
            // РЈРїСЂРѕС‰Р°РµРј РїСЂРёР·С‹ - СѓР±РёСЂР°РµРј base64 РёР·РѕР±СЂР°Р¶РµРЅРёСЏ
            prizes: caseItem.prizes.map(prize => ({
              ...prize,
              image: prize.image && prize.image.startsWith('data:') ? null : prize.image
            }))
          };
        });

        const dataToSave = JSON.stringify(casesToSave);
        
        // РџСЂРѕРІРµСЂСЏРµРј СЂР°Р·РјРµСЂ РґР°РЅРЅС‹С… РїРµСЂРµпїЅпїЅ СЃРѕС…СЂР°РЅРµРЅРёРµРј
        const dataSize = new Blob([dataToSave]).size;
        console.log(`Р Р°Р·РјРµСЂ РґР°РЅРЅС‹С… РєРµР№СЃРѕРІ: ${(dataSize / 1024).toFixed(2)} KB`);
        
        // Р•СЃР»Рё РґР°РЅРЅС‹Рµ Р±РѕР»СЊС€Рµ 4MB, РЅРµ СЃРѕС…СЂР°РЅСЏРµРј
        if (dataSize > 4 * 1024 * 1024) {
          console.warn('Р”Р°РЅРЅС‹Рµ РєРµР№СЃРѕРІ СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РёРµ РґР»СЏ localStorage');
          return;
        }

        localStorage.setItem('cases', dataToSave);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё СЃРѕС…СЂР°РЅРµРЅРёРё РєРµР№СЃРѕРІ:', error);
        
        // Р’ СЃР»СѓС‡Р°Рµ РѕС€РёР±РєРё QuotaExceededError РїС‹С‚Р°РµРјСЃСЏ РѕС‡РёСЃС‚РёС‚СЊ СЃС‚Р°СЂС‹Рµ РґР°РЅРЅС‹Рµ
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          console.warn('localStorage РїРµСЂРµРїРѕР»РЅРµРЅ, РѕС‡РёС‰Р°РµРј СЃС‚Р°СЂС‹Рµ РґР°РЅРЅС‹Рµ РєРµР№СЃРѕРІ');
          try {
            localStorage.removeItem('cases');
            // РўР°РєР¶Рµ РјРѕР¶РµРј РѕС‡РёСЃС‚РёС‚СЊ РґСЂСѓРіРёРµ РЅРµРЅСѓР¶РЅС‹Рµ РґР°РЅРЅС‹Рµ
            const keysToCheck = ['oldCases', 'tempCases', 'backup_cases'];
            keysToCheck.forEach(key => {
              if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
                console.log(`РЈРґР°Р»РµРЅ РєР»СЋС‡: ${key}`);
              }
            });
          } catch (cleanupError) {
            console.error('РћС€РёР±РєР° РїСЂРё РѕС‡РёСЃС‚РєРµ localStorage:', cleanupError);
          }
        }
      }
    }
  }, [cases]);

  // Р—Р°РіСЂСѓР¶Р°РµРј Рё СЃРѕС…СЂР°РЅСЏРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёРµ РєРµР№СЃС‹
  useEffect(() => {
    const savedUserCases = localStorage.getItem('userCases');
    if (savedUserCases) {
      try {
        const parsedCases = JSON.parse(savedUserCases, (key, value) => {
          // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј Date РѕР±СЉРµРєС‚С‹
          if (key === 'obtainedAt') {
            return new Date(value);
          }
          return value;
        });
        setUserCases(parsedCases);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ:', error);
      }
    }
  }, []);

  // Р—Р°РіСЂСѓР¶Р°РµРј Рё СЃРѕС…СЂР°РЅСЏРµРј РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ Р±Р°С‚С‚Р»С‹
  useEffect(() => {
    const savedBattles = localStorage.getItem('personalBattles');
    if (savedBattles) {
      try {
        const parsedBattles = JSON.parse(savedBattles, (key, value) => {
          // Р’РѕСЃСЃС‚Р°РЅР°РІР»РёРІР°РµРј Date РѕР±СЉРµРєС‚С‹
          if (key === 'endDate' || key === 'created') {
            return new Date(value);
          }
          return value;
        });
        setPersonalBattles(parsedBattles);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ РїРµСЂСЃРѕРЅР°Р»пїЅпїЅпїЅпїЅРЅС‹С… Р±Р°С‚С‚Р»РѕРІ:', error);
      }
    }
  }, []);

  // РЎРѕС…СЂР°РЅСЏРµРј РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ Р±Р°С‚С‚Р»С‹ РїСЂРё РёР·РјРµРЅРµРЅРёРё
  useEffect(() => {
    if (personalBattles.length > 0 || localStorage.getItem('personalBattles')) {
      try {
        localStorage.setItem('personalBattles', JSON.stringify(personalBattles));
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё СЃРѕС…СЂР°РЅРµРЅРёРё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… Р±Р°С‚С‚Р»РѕРІ:', error);
      }
    }
  }, [personalBattles]);

  // Р—Р°РіСЂСѓР¶Р°РµРј СѓРІРµРґРѕРјР»РµРЅРёСЏ РїСЂРё РёРЅРёС†РёР°Р»РёР·Р°С†РёРё
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications, (key, value) => {
          if (key === 'timestamp') {
            return new Date(value);
          }
          return value;
        });
        setNotifications(parsedNotifications);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ СѓРІРµРґРѕРјР»РµРЅРёР№:', error);
      }
    }

    // Р”РѕР±Р°РІР»СЏРµРј РїСЂРёРІРµС‚СЃС‚РІРµРЅРЅРѕРµ СѓРІРµРґРѕРјР»РµРЅРёРµ РїСЂРё РїРµСЂРІРѕРј Р·Р°РїСѓСЃРєРµ
    const hasWelcomeNotification = localStorage.getItem('hasWelcomeNotification');
    if (!hasWelcomeNotification) {
      setTimeout(() => {
        const welcomeNotification: Notification = {
          id: 'welcome_' + Date.now().toString(),
          type: 'system',
          title: 'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РІ GRITHER!',
          message: 'Р—РґРµСЃСЊ РІС‹ Р±СѓРґРµС‚Рµ РїРѕР»СѓС‡Р°С‚СЊ СѓРІРµРґРѕРјР»РµРЅРёСЏ Рѕ РЅРѕРІС‹С… Р·Р°РґР°С‡Р°С…, РґРѕСЃС‚РёР¶РµРЅРёСЏС…, Р±Р°С‚С‚Р»Р°С… Рё РјРЅРѕРіРѕРј РґСЂСѓРіРѕРј.',
          priority: 'medium',
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [welcomeNotification, ...prev]);
        localStorage.setItem('hasWelcomeNotification', 'true');
      }, 2000);
    }

    // РџРµСЂРёРѕРґРёС‡РµСЃРєРёРµ СЃРёСЃС‚РµРјРЅС‹Рµ СѓРІРµРґРѕРјР»РµРЅРёСЏ РґР»СЏ РІРѕРІР»РµС‡РµРЅРЅРѕСЃС‚Рё
    const setupPeriodicNotifications = () => {
      // Р•Р¶РµРґРЅРµРІРЅР°СЏ РјРѕС‚РёРІР°С†пїЅпїЅСЏ (РєР°Р¶РґС‹Рµ 24 С‡Р°СЃР°)
      const lastDailyMotivation = localStorage.getItem('lastDailyMotivation');
      const now = new Date().getTime();
      
      if (!lastDailyMotivation || now - parseInt(lastDailyMotivation) > 24 * 60 * 60 * 1000) {
        setTimeout(() => {
          const motivationMessages = [
            'Р’СЂРµРјСЏ РїРѕРєРѕСЂСЏС‚СЊ РЅРѕРІС‹Рµ РІРµСЂС€РёРЅС‹! РџСЂРѕРІРµСЂСЊС‚Рµ РЅРѕРІС‹Рµ Р·Р°РґР°С‡Рё Рё РґРѕСЃС‚РёР¶РµРЅРёСЏ.',
            'Р’Р°С€Рё РєРѕР»Р»РµРіРё СѓР¶Рµ Р°РєС‚РёРІРЅС‹ СЃРµРіРѕРґРЅСЏ. РќРµ РѕС‚СЃС‚Р°РІР°Р№С‚Рµ!',
            'РќРѕРІС‹Р№ РґРµРЅСЊ - РЅРѕРІС‹Рµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё Р·Р°СЂР°Р±РѕС‚Р°С‚СЊ Р±РѕР»СЊС€Рµ РєРѕРёРЅРѕРІ!',
            'РџСЂРѕРІРµСЂСЊС‚Рµ РјР°РіР°Р·РёРЅ - РІРѕР·РјРѕР¶РЅРѕ, РїРѕСЏРІРёР»РёСЃСЊ РЅРѕРІС‹Рµ С‚РѕРІР°СЂС‹!',
            'Р’СЂРµРјСЏ РґР»СЏ РЅРѕРІРѕРіРѕ Р±Р°С‚С‚Р»Р°? Р’С‹Р·РѕРІРёС‚Рµ РєРѕР»Р»РµРі РЅР° СЃРѕСЂРµРІРЅРѕРІР°РЅРёРµ!'
          ];
          
          const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
          
          addNotification({
            type: 'system',
            title: 'рџЊџ Р•Р¶РµРґРЅРµРІРЅР°СЏ РјРѕС‚РёРІР°С†РёСЏ',
            message: randomMessage,
            priority: 'low'
          });
          
          localStorage.setItem('lastDailyMotivation', now.toString());
        }, 30000); // С‡РµСЂРµР· 30 СЃРµРєСѓРЅРґ РїРѕСЃР»Рµ Р·Р°РіСЂСѓР·РєРё
      }

      // РќР°РїРѕРјРёРЅР°РЅРёРµ Рѕ РЅРµРІС‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡Р°С…
      setTimeout(() => {
        const incompleteTasks = tasks.filter(task => !task.completed && task.deadline);
        const urgentTasks = incompleteTasks.filter(task => {
          if (!task.deadline) return false;
          const deadline = new Date(task.deadline);
          const timeUntilDeadline = deadline.getTime() - now;
          return timeUntilDeadline > 0 && timeUntilDeadline < 24 * 60 * 60 * 1000; // РјРµРЅРµРµ 24 С‡Р°СЃРѕРІ
        });

        if (urgentTasks.length > 0) {
          addNotification({
            type: 'task',
            title: 'вЏ° РЎСЂРѕС‡РЅС‹Рµ Р·Р°РґР°С‡Рё!',
            message: `РЈ РІР°СЃ ${urgentTasks.length} Р·Р°РґР°С‡ СЃ РґРµРґР»Р°Р№РЅРѕРј РјРµРЅРµРµ С‡РµРј С‡РµСЂРµР· 24 С‡Р°СЃР°. РќРµ Р·Р°Р±СѓРґСЊС‚Рµ РёС… РІС‹РїРѕР»РЅРёС‚СЊ!`,
            priority: 'high',
            data: { urgentTasksCount: urgentTasks.length }
          });
        }
      }, 60000); // С‡РµСЂРµР· РјРёРЅСѓС‚Сѓ РїРѕСЃР»Рµ Р·Р°РіСЂСѓР·РєРё
    };

    setupPeriodicNotifications();
  }, []);

  // Р­С„С„РµРєС‚ РґР»СЏ РёРЅРёС†РёР°Р»РёР·Р°С†РёРё СЃ Telegram РґР°РЅРЅС‹РјРё
  useEffect(() => {
    if (telegram.isAvailable && telegram.user) {
      console.log('рџ“± Telegram Web App РёРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°РЅ:', {
        user: telegram.user,
        platform: telegram.platform,
        colorScheme: telegram.colorScheme
      });

      // РћР±РЅРѕРІР»СЏРµРј РґР°РЅРЅС‹Рµ С‚РµРєСѓС‰РµРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
      setUsers(prev => prev.map(user => 
        user.id === 'current-user' ? {
          ...user,
          name: `${telegram.user!.first_name}${telegram.user!.last_name ? ' ' + telegram.user!.last_name : ''}`,
          telegramId: telegram.user!.id,
          username: telegram.user!.username || null,
          avatar: telegram.user!.photo_url || null
        } : user
      ));

      // РћС‚РїСЂР°РІР»СЏРµРј РїСЂРёРІРµС‚СЃС‚РІРµРЅРЅРѕРµ СѓРІРµРґРѕРјР»РµРЅРёРµ СЃ РёРјРµРЅРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
      setTimeout(() => {
        addNotification({
          type: 'system',
          title: 'рџ‘‹ Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ!',
          message: `РџСЂРёРІРµС‚, ${telegram.user!.first_name}! Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РІ GRITHER С‡РµСЂРµР· Telegram!`,
          priority: 'medium'
        });
      }, 3000);

      // РќР°СЃС‚СЂР°РёРІР°РµРј haptic feedback РґР»СЏ РІСЃРµРіРѕ РїСЂРёР»РѕР¶РµРЅРёСЏ
      telegram.impactFeedback('light');
    } else {
      console.log('рџЊђ Р—Р°РїСѓСЃРє РІ Р±СЂР°СѓР·РµСЂРµ (Р±РµР· Telegram Web App)');
    }
  }, [telegram.isAvailable, telegram.user]);

  // РЎРѕС…СЂР°РЅСЏРµРј СѓРІРµРґРѕРјР»РµРЅРёСЏ РїСЂРё РёР·РјРµРЅРµРЅРёРё
  useEffect(() => {
    if (notifications.length > 0 || localStorage.getItem('notifications')) {
      try {
        // РћРіСЂР°РЅРёС‡РёРІР°РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРѕС…СЂР°РЅСЏРµРјС‹С… СѓРІРµРґРѕРјР»РµРЅРёР№ (РїРѕСЃР»РµРґРЅРёРµ 100)
        const notificationsToSave = notifications.slice(0, 100);
        localStorage.setItem('notifications', JSON.stringify(notificationsToSave));
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё СЃРѕС…СЂР°РЅРµРЅРёРё СѓРІРµРґРѕРјР»РµРЅРёР№:', error);
        
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          // Р’ СЃР»СѓС‡Р°Рµ РїРµСЂРµРїРѕР»РЅРµРЅРёСЏ РѕСЃС‚Р°РІР»СЏРµРј С‚РѕР»СЊРєРѕ РїРѕСЃР»РµРґРЅРёРµ 50 СѓРІРµРґРѕРјР»РµРЅРёР№
          try {
            const trimmedNotifications = notifications.slice(0, 50);
            localStorage.setItem('notifications', JSON.stringify(trimmedNotifications));
            setNotifications(trimmedNotifications);
          } catch (trimError) {
            console.error('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕС…СЂР°РЅРёС‚СЊ РґР°Р¶Рµ СѓСЂРµР·Р°РЅРЅС‹Рµ СѓРІРµРґРѕРјР»РµРЅРёСЏ:', trimError);
            localStorage.removeItem('notifications');
          }
        }
      }
    }
  }, [notifications]);

  // РЎРѕС…СЂР°РЅСЏРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёРµ РєРµР№СЃС‹ РїСЂРё РёР·РјРµРЅРµРЅРёРё
  useEffect(() => {
    if (userCases.length > 0 || localStorage.getItem('userCases')) {
      try {
        const dataToSave = JSON.stringify(userCases);
        const dataSize = new Blob([dataToSave]).size;
        
        // РџСЂРѕРІРµСЂСЏРµРј СЂР°Р·РјРµСЂ РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ
        if (dataSize > 2 * 1024 * 1024) { // 2MB Р»РёРјРёС‚
          console.warn('Р”Р°РЅРЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РёРµ');
          
          // РћСЃС‚Р°РІР»СЏРµРј С‚РѕР»СЊРєРѕ РїРѕСЃР»РµРґРЅРёРµ 50 РєРµР№СЃРѕРІ
          const trimmedUserCases = userCases.slice(-50);
          localStorage.setItem('userCases', JSON.stringify(trimmedUserCases));
          
          // РћР±РЅРѕРІР»СЏРµРј СЃРѕСЃС‚РѕСЏРЅРёРµ
          if (trimmedUserCases.length !== userCases.length) {
            setUserCases(trimmedUserCases);
          }
        } else {
          localStorage.setItem('userCases', dataToSave);
        }
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё СЃРѕС…СЂР°РЅРµРЅРёРё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ:', error);
        
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          // Р’ СЃР»СѓС‡Р°Рµ РїРµСЂРµРїРѕР»РЅРµРЅРёСЏ РѕСЃС‚Р°РІР»СЏРµРј С‚РѕР»СЊРєРѕ РїРѕСЃР»РµРґРЅРёРµ 20 РєРµР№СЃРѕРІ
          try {
            const trimmedUserCases = userCases.slice(-20);
            localStorage.setItem('userCases', JSON.stringify(trimmedUserCases));
            setUserCases(trimmedUserCases);
            console.log('РЎРѕС…СЂР°РЅРµРЅС‹ С‚РѕР»СЊРєРѕ РїРѕСЃР»РµРґРЅРёРµ 20 РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ');
          } catch (trimError) {
            console.error('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРѕС…СЂР°РЅРёС‚СЊ РґР°Р¶Рµ СѓСЂРµР·Р°РЅРЅС‹Рµ РґР°РЅРЅС‹Рµ:', trimError);
            localStorage.removeItem('userCases');
          }
        }
      }
    }
  }, [userCases]);

  // Р—Р°РіСЂСѓР¶Р°РµРј Рё СЃРѕС…СЂР°РЅСЏРµРј Р±Р°Р»Р°РЅСЃС‹ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        setUsers(parsedUsers);
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё Р·Р°РіСЂСѓР·РєРµ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№:', error);
      }
    }
  }, []);

  // РЎРѕС…СЂР°РЅСЏРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РїСЂРё РёР·РјРµРЅРµРЅРёРё
  useEffect(() => {
    if (users.length > 0) {
      try {
        localStorage.setItem('users', JSON.stringify(users));
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё СЃРѕС…СЂР°РЅРµРЅРёРё РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№:', error);
      }
    }
  }, [users]);

  // РћРўРЎР›Р•Р–РР’РђРќРР• РР—РњР•РќР•РќРР™ Р”Р›РЇ РђР’РўРћРњРђРўРР§Р•РЎРљРРҐ РЈР’Р•Р”РћРњР›Р•РќРР™

  // РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РёР·РјРµРЅРµРЅРёР№ РґРѕСЃС‚РёР¶РµРЅРёР№
  const prevAchievements = useRef<Achievement[]>([]);
  useEffect(() => {
    if (prevAchievements.current.length > 0) {
      achievements.forEach(achievement => {
        const prevAchievement = prevAchievements.current.find(a => a.id === achievement.id);
        if (prevAchievement && !prevAchievement.unlocked && achievement.unlocked) {
          handleAchievementUnlock(achievement);
        }
      });
    }
    prevAchievements.current = [...achievements];
  }, [achievements]);

  // РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РёР·РјРµРЅРµРЅРёР№ Р·Р°РґР°С‡
  const prevTasks = useRef<Task[]>([]);
  useEffect(() => {
    if (prevTasks.current.length > 0) {
      // РџСЂРѕРІРµСЂСЏРµРј РЅРѕРІС‹Рµ Р·Р°РґР°С‡Рё
      tasks.forEach(task => {
        const prevTask = prevTasks.current.find(t => t.id === task.id);
        if (!prevTask) {
          handleNewTask(task);
        } else if (!prevTask.completed && task.completed) {
          handleTaskCompletion(task);
        }
      });
    }
    prevTasks.current = [...tasks];
  }, [tasks]);

  // РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РёР·РјРµРЅРµРЅРёР№ С‚РѕРІР°СЂРѕРІ РІ РјР°РіР°Р·РёРЅРµ
  const prevShopItems = useRef<ShopItem[]>([]);
  useEffect(() => {
    if (prevShopItems.current.length > 0) {
      shopItems.forEach(item => {
        const prevItem = prevShopItems.current.find(i => i.id === item.id);
        if (!prevItem) {
          handleNewShopItem(item);
        } else if (item.sale && (!prevItem.sale || prevItem.sale !== item.sale)) {
          handleShopItemSale(item, prevItem.price);
        }
      });
    }
    prevShopItems.current = [...shopItems];
  }, [shopItems]);

  // РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РёР·РјРµРЅРµРЅРёР№ Р·Р°РєР°Р·РѕРІ
  const prevOrders = useRef<Order[]>([]);
  useEffect(() => {
    if (prevOrders.current.length > 0) {
      orders.forEach(order => {
        const prevOrder = prevOrders.current.find(o => o.id === order.id);
        if (prevOrder && prevOrder.status !== order.status && (order.status === 'approved' || order.status === 'rejected')) {
          handleOrderApproval(order);
        }
      });
    }
    prevOrders.current = [...orders];
  }, [orders]);

  // РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РёР·РјРµРЅРµРЅРёР№ РєРµР№СЃРѕРІ
  const prevCases = useRef<CaseType[]>([]);
  useEffect(() => {
    if (prevCases.current.length > 0) {
      cases.forEach(caseItem => {
        const prevCase = prevCases.current.find(c => c.id === caseItem.id);
        if (!prevCase) {
          handleNewCase(caseItem);
        }
      });
    }
    prevCases.current = [...cases];
  }, [cases]);

  // РћС‚СЃР»РµР¶РёРІР°РЅРёРµ РѕС‚РєСЂС‹С‚РёСЏ РєРµР№СЃРѕРІ
  const prevUserCases = useRef<UserCase[]>([]);
  useEffect(() => {
    if (prevUserCases.current.length > 0) {
      userCases.forEach(userCase => {
        const prevUserCase = prevUserCases.current.find(uc => uc.id === userCase.id);
        if (!prevUserCase) {
          // РќР°Р№РґРµРј СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰РёР№ РєРµР№СЃ Рё РїСЂРёР·
          const caseItem = cases.find(c => c.id === userCase.caseId);
          if (caseItem && userCase.prize) {
            handleCaseOpening(caseItem, userCase.prize);
          }
        }
      });
    }
    prevUserCases.current = [...userCases];
  }, [userCases]);

  // РЎРµРєСЂРµС‚РЅР°СЏ РєРѕРјР±РёРЅР°С†РёСЏ РґР»СЏ Р°РґРјРёРЅ РїР°РЅРµР»Рё
  useEffect(() => {
    let sequence = '';
    const secretCode = 'admin';
    let isProcessingSecret = false;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // РџСЂРµРґРѕС‚РІСЂР°С‰Р°РµРј РѕР±СЂР°Р±РѕС‚РєСѓ РµСЃР»Рё СѓР¶Рµ РѕР±СЂР°Р±Р°С‚С‹РІР°РµРј СЃРµРєСЂРµС‚РЅС‹Р№ РєРѕРґ
      if (isProcessingSecret) return;
      
      sequence += e.key.toLowerCase();
      if (sequence.length > secretCode.length) {
        sequence = sequence.slice(-secretCode.length);
      }
      if (sequence === secretCode) {
        isProcessingSecret = true;
        setCurrentPage('admin');
        sequence = '';
        // РЎР±СЂР°СЃС‹РІР°РµРј С„Р»Р°Рі С‡РµСЂРµР· РЅРµР±РѕР»СЊС€РѕРµ РІСЂРµРјСЏ
        setTimeout(() => {
          isProcessingSecret = false;
        }, 1000);
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'achievements':
        return <AchievementsPage 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          achievements={achievements}
          setAchievements={setAchievements}
          profilePhoto={profilePhoto}
          theme={isDarkMode ? 'dark' : 'light'}
          notifications={notifications}
          onMarkNotificationAsRead={markNotificationAsRead}
          onMarkAllNotificationsAsRead={markAllNotificationsAsRead}
          onRemoveNotification={removeNotification}
          onClearAllNotifications={clearAllNotifications}
          addNotification={addNotification}
        />;
      case 'tasks':
        return <TasksPage 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          profilePhoto={profilePhoto}
          tasks={tasks}
          setTasks={setTasks}
          theme={isDarkMode ? 'dark' : 'light'}
          addNotification={addNotification}
        />;
      case 'cases':
        return <CasesPage 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          profilePhoto={profilePhoto}
          theme={isDarkMode ? 'dark' : 'light'}
          cases={cases}
          setCases={setCases}
          userCases={userCases}
          setUserCases={setUserCases}
          currentUser={users.find(u => u.id === 'current-user')}
          onUpdateUserBalance={updateUserBalance}
          onUpdateUserExperience={updateUserExperience}
          addNotification={addNotification}
        />;
      case 'shop':
        return <ShopPageCasesStyleFixed 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          profilePhoto={profilePhoto}
          shopItems={shopItems}
          setShopItems={setShopItems}
          orders={orders}
          setOrders={setOrders}
          theme={isDarkMode ? 'dark' : 'light'}
          currentUser={users.find(u => u.id === 'current-user')}
          onUpdateUserBalance={updateUserBalance}
          addNotification={addNotification}
        />;
      case 'profile':
        return <ProfilePage 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          profilePhoto={profilePhoto}
          setProfilePhoto={setProfilePhoto}
          theme={isDarkMode ? 'dark' : 'light'}
          battles={battles}
          battleInvitations={battleInvitations}
          personalBattles={personalBattles}
          users={users}
          currentUser={users.find(u => u.id === 'current-user')}
        />;
      case 'battles':
        return <BattlesPageExtended 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          profilePhoto={profilePhoto}
          personalBattles={personalBattles}
          setPersonalBattles={setPersonalBattles}
          theme={isDarkMode ? 'dark' : 'light'}
          notifications={notifications}
          onMarkNotificationAsRead={markNotificationAsRead}
          onMarkAllNotificationsAsRead={markAllNotificationsAsRead}
          onRemoveNotification={removeNotification}
          onClearAllNotifications={clearAllNotifications}
          addNotification={addNotification}
        />;

      case 'admin':
        return <AdminPanel 
          onNavigate={handleAdminNavigate}
          achievements={achievements}
          setAchievements={setAchievements}
          shopItems={shopItems}
          setShopItems={setShopItems}
          orders={orders}
          setOrders={setOrders}
          tasks={tasks}
          setTasks={setTasks}
          cases={cases}
          setCases={setCases}
          userCases={userCases}
          setUserCases={setUserCases}
          onToggleDarkMode={handleToggleDarkMode}
          battles={battles}
          setBattles={setBattles}
          battleInvitations={battleInvitations}
          setBattleInvitations={setBattleInvitations}
          onCompleteBattle={completeBattle}
          users={users}
          onUpdateUserBalance={updateUserBalance}
          addNotification={addNotification}
        />;
      case 'home':
      default:
        return <HomePage 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          onOpenSettings={handleOpenSettings}
          achievements={achievements}
          profilePhoto={profilePhoto}
          personalBattles={personalBattles}
          setPersonalBattles={setPersonalBattles}
          theme={isDarkMode ? 'dark' : 'light'}
          notifications={notifications}
          onMarkNotificationAsRead={markNotificationAsRead}
          onMarkAllNotificationsAsRead={markAllNotificationsAsRead}
          onRemoveNotification={removeNotification}
          onClearAllNotifications={clearAllNotifications}
          addNotification={addNotification}
          battles={battles}
          battleInvitations={battleInvitations}
          users={users}
          leaderboard={leaderboard}
          onCreateBattleInvitation={createBattleInvitation}
          onAcceptBattleInvitation={acceptBattleInvitation}
          onDeclineBattleInvitation={declineBattleInvitation}
          onCompleteBattle={completeBattle}
          currentUser={users.find(u => u.id === 'current-user')}
        />;
    }
  };

  return (
    <>
      {/* BackgroundFX - СЃР°РјС‹Р№ РЅРёР¶РЅРёР№ СЃР»РѕР№ РґР»СЏ СЃРІРµС‚Р»РѕР№ С‚РµРјС‹ */}
      <BackgroundFX 
        variant="spotlight+grain+vignette" 
        theme={isDarkMode ? 'dark' : 'light'}
      />
      
      {/* РћСЃРЅРѕРІРЅРѕРµ СЃРѕРґРµСЂР¶РёРјРѕРµ СЃС‚СЂР°РЅРёС† - РІС‹С€Рµ BackgroundFX */}
      <div 
        className="page-content"
        style={{ 
          position: 'relative', 
          zIndex: 10,
          minHeight: '100vh'
        }}
      >
        {renderCurrentPage()}
      </div>
      
      {/* РњРѕРґР°Р»СЊРЅС‹Рµ РѕРєРЅР° - СЃР°РјС‹Р№ РІРµСЂС…РЅРёР№ СЃР»РѕР№ */}
      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenAdminPanel={handleOpenAdminPanel}
        hasAdminAccess={hasAdminAccess}
        setHasAdminAccess={setHasAdminAccess}
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </>
  );
}
