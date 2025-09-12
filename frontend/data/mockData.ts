import { Achievement } from '../types/achievements';
import { ShopItem, Order } from '../types/shop';
import { Task } from '../types/tasks';
import { CaseType, UserCase, CaseShopItem, Prize } from '../types/cases';
import { Notification } from '../types/notifications';
import { LeaderboardEntry, User } from '../types/global';
import { Battle } from '../types/battles';

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
    title: 'Изучить React',
    description: 'Освоить основы React и создать первый компонент',
    deadline: '2024-12-25T18:00:00.000Z',
    priority: 'high',
    status: 'not_started',
    completed: false,
    createdAt: '2024-12-01T10:00:00.000Z',
    timeSpent: 0
  },
  {
    id: 'task2',
    title: 'Создать API для пользователей',
    description: 'Разработать REST API для управления пользователями',
    deadline: '2024-12-20T17:00:00.000Z',
    priority: 'medium',
    status: 'in_progress',
    completed: false,
    createdAt: '2024-12-02T09:00:00.000Z',
    timeSpent: 7200, // 2 hours
    attachedFiles: ['api_design.pdf', 'user_schema.json']
  },
  {
    id: 'task3',
    title: 'Написать тесты для компонентов',
    description: 'Покрыть тестами все основные компоненты приложения',
    deadline: '2024-12-15T16:00:00.000Z',
    priority: 'low',
    status: 'completed',
    completed: true,
    createdAt: '2024-11-28T14:00:00.000Z',
    timeSpent: 14400 // 4 hours
  },
  {
    id: 'task4',
    title: 'Оптимизировать производительность',
    description: 'Улучшить скорость загрузки и отзывчивость интерфейса',
    deadline: '2024-12-10T15:00:00.000Z',
    priority: 'high',
    status: 'not_started',
    completed: false,
    createdAt: '2024-12-03T11:00:00.000Z',
    timeSpent: 0
  },
  {
    id: 'task5',
    title: 'Документация проекта',
    description: 'Создать подробную документацию для разработчиков',
    deadline: '2024-12-18T12:00:00.000Z',
    priority: 'medium',
    status: 'in_progress',
    completed: false,
    createdAt: '2024-12-01T16:00:00.000Z',
    timeSpent: 3600, // 1 hour
    attachedFiles: ['project_overview.md']
  }
];

// Мок-данные для типов кейсов
export const mockCaseTypes: CaseType[] = [
  {
    id: 'case1',
    name: 'Обычный кейс',
    description: 'Содержит обычные предметы и небольшие награды',
    price: 100,
    rarity: 'common',
    prizes: [
      { id: 'p1', name: '10 монет', type: 'coins', amount: 10, rarity: 'common' },
      { id: 'p2', name: '20 монет', type: 'coins', amount: 20, rarity: 'common' },
      { id: 'p3', name: '50 монет', type: 'coins', amount: 50, rarity: 'common' }
    ]
  },
  {
    id: 'case2',
    name: 'Редкий кейс',
    description: 'Содержит редкие предметы и ценные награды',
    price: 500,
    rarity: 'rare',
    prizes: [
      { id: 'p4', name: '100 монет', type: 'coins', amount: 100, rarity: 'rare' },
      { id: 'p5', name: '200 монет', type: 'coins', amount: 200, rarity: 'rare' },
      { id: 'p6', name: 'Редкий аватар', type: 'avatar', rarity: 'rare' }
    ]
  },
  {
    id: 'case3',
    name: 'Эпический кейс',
    description: 'Содержит эпические предметы и большие награды',
    price: 1000,
    rarity: 'epic',
    prizes: [
      { id: 'p7', name: '500 монет', type: 'coins', amount: 500, rarity: 'epic' },
      { id: 'p8', name: '1000 монет', type: 'coins', amount: 1000, rarity: 'epic' },
      { id: 'p9', name: 'Эпический аватар', type: 'avatar', rarity: 'epic' }
    ]
  },
  {
    id: 'case4',
    name: 'Легендарный кейс',
    description: 'Содержит легендарные предметы и огромные награды',
    price: 2500,
    rarity: 'legendary',
    prizes: [
      { id: 'p10', name: '2000 монет', type: 'coins', amount: 2000, rarity: 'legendary' },
      { id: 'p11', name: '5000 монет', type: 'coins', amount: 5000, rarity: 'legendary' },
      { id: 'p12', name: 'Легендарный аватар', type: 'avatar', rarity: 'legendary' }
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

// Мок-данные для баттлов пользователя
export const mockBattles: Battle[] = [
  {
    id: 'battle1',
    title: 'Баттл с Анной',
    challengerId: 'user1',
    challengerName: 'Вы',
    opponentId: 'user3',
    opponentName: 'Анна Иванова',
    stake: 150,
    status: 'completed',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    completedAt: new Date('2024-01-15T12:00:00Z'),
    winnerId: 'user3',
    evidence: []
  },
  {
    id: 'battle2',
    title: 'Баттл с Марией',
    challengerId: 'user1',
    challengerName: 'Вы',
    opponentId: 'user4',
    opponentName: 'Мария Сидорова',
    stake: 200,
    status: 'completed',
    createdAt: new Date('2024-01-16T14:00:00Z'),
    completedAt: new Date('2024-01-16T16:00:00Z'),
    winnerId: 'user1',
    evidence: []
  },
  {
    id: 'battle3',
    title: 'Баттл с Еленой',
    challengerId: 'user1',
    challengerName: 'Вы',
    opponentId: 'user2',
    opponentName: 'Елена Морозова',
    stake: 75,
    status: 'active',
    createdAt: new Date('2024-01-17T09:00:00Z'),
    evidence: []
  }
];