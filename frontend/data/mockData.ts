import { Achievement } from '../types/achievements';
import { ShopItem, Order } from '../types/shop';
import { Task } from '../types/tasks';
import { CaseType, UserCase, CaseShopItem, Prize } from '../types/cases';
import { Notification } from '../types/notifications';
import { LeaderboardEntry, User } from '../types/global';
import { Battle } from '../types/battles';

// РџСЂРѕСЃС‚С‹Рµ РјРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РґРѕСЃС‚РёР¶РµРЅРёР№
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'РџРµСЂРІС‹Рµ С€Р°РіРё',
    description: 'Р’С‹РїРѕР»РЅРёС‚Рµ РїРµСЂРІСѓСЋ Р·Р°РґР°С‡Сѓ',
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
    title: 'РўСЂСѓРґРѕР»СЋР±РёРІС‹Р№',
    description: 'Р’С‹РїРѕР»РЅРёС‚Рµ 10 Р·Р°РґР°С‡',
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
    title: 'Р’РѕРёРЅ',
    description: 'Р’С‹РёРіСЂР°Р№С‚Рµ 5 Р±Р°С‚С‚Р»РѕРІ',
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
      'РЈС‡Р°СЃС‚РІСѓР№С‚Рµ РІ Р±Р°С‚С‚Р»Р°С…',
      'Р’С‹РёРіСЂР°Р№С‚Рµ 5 СЃСЂР°Р¶РµРЅРёР№ РїРѕРґСЂСЏРґ'
    ]
  },
  {
    id: 'ach4',
    title: 'Р›РµРіРµРЅРґР°',
    description: 'Р”РѕСЃС‚РёРіРЅРёС‚Рµ 20 СѓСЂРѕРІРЅСЏ',
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
    title: 'РџРѕРєСѓРїР°С‚РµР»СЊ',
    description: 'РЎРѕРІРµСЂС€РёС‚Рµ 10 РїРѕРєСѓРїРѕРє РІ РјР°РіР°Р·РёРЅРµ',
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

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РјР°РіР°Р·РёРЅР°
export const mockShopItems: ShopItem[] = [
  {
    id: 'shop1',
    name: 'Р‘РѕРЅСѓСЃ РѕРїС‹С‚Р° 2x',
    description: 'РЈРґРІР°РёРІР°РµС‚ РїРѕР»СѓС‡Р°РµРјС‹Р№ РѕРїС‹С‚ РЅР° 24 С‡Р°СЃР°',
    price: 500,
    emoji: 'вљЎ',
    isActive: true
  },
  {
    id: 'shop2',
    name: 'VIP СЃС‚Р°С‚СѓСЃ',
    description: 'РџСЂРµРјРёСѓРј С„СѓРЅРєС†РёРё РЅР° РјРµСЃСЏС†',
    price: 2000,
    emoji: 'рџ‘‘',
    isActive: true
  }
];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ Р·Р°РєР°Р·РѕРІ
export const mockOrders: Order[] = [];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ Р·Р°РґР°С‡
export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'РР·СѓС‡РёС‚СЊ React',
    description: 'РћСЃРІРѕРёС‚СЊ РѕСЃРЅРѕРІС‹ React Рё СЃРѕР·РґР°С‚СЊ РїРµСЂРІС‹Р№ РєРѕРјРїРѕРЅРµРЅС‚',
    deadline: '2024-12-25T18:00:00.000Z',
    status: 'active',
    completed: false,
    createdAt: '2024-12-01T10:00:00.000Z',
    timeSpent: 0
  },
  {
    id: 'task2',
    title: 'РЎРѕР·РґР°С‚СЊ API РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№',
    description: 'Р Р°Р·СЂР°Р±РѕС‚Р°С‚СЊ REST API РґР»СЏ СѓРїСЂР°РІР»РµРЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё',
    deadline: '2024-12-20T17:00:00.000Z',
    status: 'active',
    completed: false,
    createdAt: '2024-12-02T09:00:00.000Z',
    timeSpent: 7200, // 2 hours
    attachedFiles: ['api_design.pdf', 'user_schema.json']
  },
  {
    id: 'task3',
    title: 'РќР°РїРёСЃР°С‚СЊ С‚РµСЃС‚С‹ РґР»СЏ РєРѕРјРїРѕРЅРµРЅС‚РѕРІ',
    description: 'РџРѕРєСЂС‹С‚СЊ С‚РµСЃС‚Р°РјРё РІСЃРµ РѕСЃРЅРѕРІРЅС‹Рµ РєРѕРјРїРѕРЅРµРЅС‚С‹ РїСЂРёР»РѕР¶РµРЅРёСЏ',
    deadline: '2024-12-15T16:00:00.000Z',
    status: 'completed',
    completedAt: '2024-12-15T16:00:00.000Z',
    createdAt: '2024-11-28T14:00:00.000Z',
    timeSpent: 14400 // 4 hours
  },
  {
    id: 'task4',
    title: 'РћРїС‚РёРјРёР·РёСЂРѕРІР°С‚СЊ РїСЂРѕРёР·РІРѕРґРёС‚РµР»СЊРЅРѕСЃС‚СЊ',
    description: 'РЈР»СѓС‡С€РёС‚СЊ СЃРєРѕСЂРѕСЃС‚СЊ Р·Р°РіСЂСѓР·РєРё Рё РѕС‚Р·С‹РІС‡РёРІРѕСЃС‚СЊ РёРЅС‚РµСЂС„РµР№СЃР°',
    deadline: '2024-12-10T15:00:00.000Z',
    status: 'active',
    completed: false,
    createdAt: '2024-12-03T11:00:00.000Z',
    timeSpent: 0
  },
  {
    id: 'task5',
    title: 'Р”РѕРєСѓРјРµРЅС‚Р°С†РёСЏ РїСЂРѕРµРєС‚Р°',
    description: 'РЎРѕР·РґР°С‚СЊ РїРѕРґСЂРѕР±РЅСѓСЋ РґРѕРєСѓРјРµРЅС‚Р°С†РёСЋ РґР»СЏ СЂР°Р·СЂР°Р±РѕС‚С‡РёРєРѕРІ',
    deadline: '2024-12-18T12:00:00.000Z',
    status: 'active',
    completed: false,
    createdAt: '2024-12-01T16:00:00.000Z',
    timeSpent: 3600, // 1 hour
    attachedFiles: ['project_overview.md']
  }
];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ С‚РёРїРѕРІ РєРµР№СЃРѕРІ
export const mockCaseTypes: CaseType[] = [
  {
    id: 'case1',
    name: 'РћР±С‹С‡РЅС‹Р№ РєРµР№СЃ',
    description: 'РЎРѕРґРµСЂР¶РёС‚ РѕР±С‹С‡РЅС‹Рµ РїСЂРµРґРјРµС‚С‹ Рё РЅРµР±РѕР»СЊС€РёРµ РЅР°РіСЂР°РґС‹',
    price: 100,
    rarity: 'common',
    prizes: [
      { id: 'p1', name: '10 РјРѕРЅРµС‚', type: 'coins', amount: 10, rarity: 'common', probability: 0.4 },
      { id: 'p2', name: '20 РјРѕРЅРµС‚', type: 'coins', amount: 20, rarity: 'common', probability: 0.3 },
      { id: 'p3', name: '50 РјРѕРЅРµС‚', type: 'coins', amount: 50, rarity: 'common', probability: 0.3 }
    ]
  },
  {
    id: 'case2',
    name: 'Р РµРґРєРёР№ РєРµР№СЃ',
    description: 'РЎРѕРґРµСЂР¶РёС‚ СЂРµРґРєРёРµ РїСЂРµРґРјРµС‚С‹ Рё С†РµРЅРЅС‹Рµ РЅР°РіСЂР°РґС‹',
    price: 500,
    rarity: 'rare',
    prizes: [
      { id: 'p4', name: '100 РјРѕРЅРµС‚', type: 'coins', amount: 100, rarity: 'rare', probability: 0.4 },
      { id: 'p5', name: '200 РјРѕРЅРµС‚', type: 'coins', amount: 200, rarity: 'rare', probability: 0.3 },
      { id: 'p6', name: 'Р РµРґРєРёР№ Р°РІР°С‚Р°СЂ', type: 'avatar', amount: 1, rarity: 'rare', probability: 0.3 }
    ]
  },
  {
    id: 'case3',
    name: 'Р­РїРёС‡РµСЃРєРёР№ РєРµР№СЃ',
    description: 'РЎРѕРґРµСЂР¶РёС‚ СЌРїРёС‡РµСЃРєРёРµ РїСЂРµРґРјРµС‚С‹ Рё Р±РѕР»СЊС€РёРµ РЅР°РіСЂР°РґС‹',
    price: 1000,
    rarity: 'epic',
    prizes: [
      { id: 'p7', name: '500 РјРѕРЅРµС‚', type: 'coins', amount: 500, rarity: 'epic', probability: 0.4 },
      { id: 'p8', name: '1000 РјРѕРЅРµС‚', type: 'coins', amount: 1000, rarity: 'epic', probability: 0.3 },
      { id: 'p9', name: 'Р­РїРёС‡РµСЃРєРёР№ Р°РІР°С‚Р°СЂ', type: 'avatar', amount: 1, rarity: 'epic', probability: 0.3 }
    ]
  },
  {
    id: 'case4',
    name: 'Р›РµРіРµРЅРґР°СЂРЅС‹Р№ РєРµР№СЃ',
    description: 'РЎРѕРґРµСЂР¶РёС‚ Р»РµРіРµРЅРґР°СЂРЅС‹Рµ РїСЂРµРґРјРµС‚С‹ Рё РѕРіСЂРѕРјРЅС‹Рµ РЅР°РіСЂР°РґС‹',
    price: 2500,
    rarity: 'legendary',
    prizes: [
      { id: 'p10', name: '2000 РјРѕРЅРµС‚', type: 'coins', amount: 2000, rarity: 'legendary', probability: 0.4 },
      { id: 'p11', name: '5000 РјРѕРЅРµС‚', type: 'coins', amount: 5000, rarity: 'legendary', probability: 0.3 },
      { id: 'p12', name: 'Р›РµРіРµРЅРґР°СЂРЅС‹Р№ Р°РІР°С‚Р°СЂ', type: 'avatar', amount: 1, rarity: 'legendary', probability: 0.3 }
    ]
  }
];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… РєРµР№СЃРѕРІ
export const mockUserCases: UserCase[] = [];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ СѓРІРµРґРѕРјР»РµРЅРёР№
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'system',
    title: 'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ!',
    message: 'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РІ GRITHER!',
    timestamp: new Date().toISOString(),
    read: false,
    priority: 'normal'
  }
];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ Р»РёРґРµСЂР±РѕСЂРґР°
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'user1',
    name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ',
    level: 18,
    experience: 1800,
    balance: 2500,
    achievements: 15,
    team: 'Team 1',
    rank: 1
  },
  {
    id: 'user2',
    name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°',
    level: 16,
    experience: 1600,
    balance: 2200,
    achievements: 12,
    team: 'Team 2',
    rank: 2
  },
  {
    id: 'user3',
    name: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
    level: 15,
    experience: 1500,
    balance: 2000,
    achievements: 10,
    team: 'Team 1',
    rank: 3
  }
];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ Р±Р°С‚С‚Р»РѕРІ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
export const mockBattles: Battle[] = [
  {
    id: 'battle1',
    title: 'Р‘Р°С‚С‚Р» СЃ РђРЅРЅРѕР№',
    challengerId: 'user1',
    challengerName: 'Р’С‹',
    opponentId: 'user3',
    opponentName: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
    stake: 150,
    status: 'completed',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    completedAt: new Date('2024-01-15T12:00:00Z'),
    winnerId: 'user3',
    evidence: []
  },
  {
    id: 'battle2',
    title: 'Р‘Р°С‚С‚Р» СЃ РњР°СЂРёРµР№',
    challengerId: 'user1',
    challengerName: 'Р’С‹',
    opponentId: 'user4',
    opponentName: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°',
    stake: 200,
    status: 'completed',
    createdAt: new Date('2024-01-16T14:00:00Z'),
    completedAt: new Date('2024-01-16T16:00:00Z'),
    winnerId: 'user1',
    evidence: []
  },
  {
    id: 'battle3',
    title: 'Р‘Р°С‚С‚Р» СЃ Р•Р»РµРЅРѕР№',
    challengerId: 'user1',
    challengerName: 'Р’С‹',
    opponentId: 'user2',
    opponentName: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°',
    stake: 75,
    status: 'active',
    createdAt: new Date('2024-01-17T09:00:00Z'),
    evidence: []
  }
];

// Mock app state
export const mockAppState = {
  currentUser: {
    id: 'user1',
    name: 'Вы',
    email: 'user@example.com',
    avatar: null,
    level: 5,
    experience: 1250,
    coins: 1500,
    team: 'Команда А',
    role: 'member',
    joinedAt: new Date('2024-01-01T00:00:00Z'),
    lastActiveAt: new Date(),
    stats: {
      tasksCompleted: 12,
      achievementsUnlocked: 8,
      battlesWon: 3,
      battlesLost: 1,
      totalCoinsEarned: 2500
    }
  } as User,
  achievements: mockAchievements,
  tasks: mockTasks,
  shopItems: mockShopItems,
  orders: mockOrders,
  cases: mockCases,
  notifications: mockNotifications,
  battles: mockBattles
};