import { Achievement } from '../types/achievements';
import { ShopItem, Order } from '../types/shop';
import { Task } from '../types/tasks';
import { CaseType, UserCase, CaseShopItem, Prize } from '../types/cases';
import { Notification } from '../types/notifications';
import { LeaderboardEntry, User } from '../types/global';

// Простые мок-данные для достижений
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'Первые шаги',
    description: 'Выполните первую задачу',
    category: 'general',
    rarity: 'common',
    requirements: {
      type: 'tasks_completed',
      target: 1,
      current: 0
    },
    reward: {
      type: 'experience',
      amount: 50
    }
  },
  {
    id: 'ach2',
    title: 'Трудолюбивый',
    description: 'Выполните 10 задач',
    category: 'tasks',
    rarity: 'rare',
    requirements: {
      type: 'tasks_completed',
      target: 10,
      current: 3
    },
    reward: {
      type: 'coins',
      amount: 100
    }
  },
  {
    id: 'ach3',
    title: 'Воин',
    description: 'Выиграйте 5 баттлов',
    category: 'battles',
    rarity: 'epic',
    requirements: {
      type: 'battles_won',
      target: 5,
      current: 2
    },
    reward: {
      type: 'coins',
      amount: 500
    },
    conditions: [
      'Участвуйте в баттлах',
      'Выиграйте 5 сражений подряд'
    ]
  },
  {
    id: 'ach4',
    title: 'Легенда',
    description: 'Достигните 20 уровня',
    category: 'progression',
    rarity: 'legendary',
    requirements: {
      type: 'level_reached',
      target: 20,
      current: 1
    },
    reward: {
      type: 'badge',
      amount: 1
    }
  },
  {
    id: 'ach5',
    title: 'Покупатель',
    description: 'Совершите 10 покупок в магазине',
    category: 'shop',
    rarity: 'common',
    requirements: {
      type: 'shop_purchases',
      target: 10,
      current: 7
    },
    reward: {
      type: 'coins',
      amount: 200
    },
    userFile: 'receipt.pdf'
  }
];

// Мок-данные для магазина
export const mockShopItems: ShopItem[] = [
  {
    id: 'shop1',
    name: 'Бонус опыта 2x',
    description: 'Удваивает получаемый опыт на 24 часа',
    price: 500,
    emoji: '⚡',
    isActive: true
  },
  {
    id: 'shop2',
    name: 'VIP статус',
    description: 'Премиум функции на месяц',
    price: 2000,
    emoji: '👑',
    isActive: true
  }
];

// Мок-данные для заказов
export const mockOrders: Order[] = [];

// Мок-данные для задач
export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Создать новый компонент',
    description: 'Разработать компонент для главной страницы',
    reward: 300,
    rewardType: 'coins',
    deadline: '2024-01-25T23:59:59Z',
    category: 'individual',
    status: 'active',
    assignedTo: 'user1',
    createdBy: 'admin',
    createdAt: '2024-01-20T09:00:00Z',
    isPublished: true
  }
];

// Мок-данные для типов кейсов
export const mockCaseTypes: CaseType[] = [
  {
    id: 'case1',
    name: 'Базовый кейс',
    description: 'Содержит обычные призы',
    price: 100,
    color: '#3B82F6',
    image: '/assets/case1.png',
    prizes: [
      {
        id: 'prize1',
        name: '50 коинов',
        type: 'coins',
        amount: 50,
        probability: 0.4
      },
      {
        id: 'prize2',
        name: '100 коинов',
        type: 'coins',
        amount: 100,
        probability: 0.3
      }
    ]
  }
];

// Мок-данные для пользовательских кейсов
export const mockUserCases: UserCase[] = [];

// Мок-данные для уведомлений
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'system',
    title: 'Добро пожаловать!',
    message: 'Добро пожаловать в GRITHER!',
    timestamp: new Date(),
    read: false,
    priority: 'medium'
  }
];

// Мок-данные для лидерборда
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'user1',
    name: 'Петр Петров',
    level: 18,
    experience: 1800,
    balance: 2500,
    achievements: 15,
    team: 'Team 1',
    rank: 1
  },
  {
    id: 'user2',
    name: 'Елена Морозова',
    level: 16,
    experience: 1600,
    balance: 2200,
    achievements: 12,
    team: 'Team 2',
    rank: 2
  },
  {
    id: 'user3',
    name: 'Анна Иванова',
    level: 15,
    experience: 1500,
    balance: 2000,
    achievements: 10,
    team: 'Team 1',
    rank: 3
  }
];