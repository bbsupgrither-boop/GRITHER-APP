import { Achievement } from '../types/achievements';
import { ShopItem, Order } from '../types/shop';
import { Task } from '../types/tasks';
import { CaseType, UserCase, CaseShopItem } from '../types/cases';
import { Notification } from '../types/notifications';
import { LeaderboardEntry, User } from '../types/global';
import { Battle } from '../types/battles';

// Р СџРЎР‚Р С•РЎРѓРЎвЂљРЎвЂ№Р Вµ Р СР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'Р СџР ВµРЎР‚Р Р†РЎвЂ№Р Вµ РЎв‚¬Р В°Р С–Р С‘',
    description: 'Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ Р С—Р ВµРЎР‚Р Р†РЎС“РЎР‹ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“',
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
    title: 'Р СћРЎР‚РЎС“Р Т‘Р С•Р В»РЎР‹Р В±Р С‘Р Р†РЎвЂ№Р в„–',
    description: 'Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ 10 Р В·Р В°Р Т‘Р В°РЎвЂЎ',
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
    title: 'Р вЂ™Р С•Р С‘Р Р…',
    description: 'Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р в„–РЎвЂљР Вµ 5 Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†',
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
      'Р Р€РЎвЂЎР В°РЎРѓРЎвЂљР Р†РЎС“Р в„–РЎвЂљР Вµ Р Р† Р В±Р В°РЎвЂљРЎвЂљР В»Р В°РЎвЂ¦',
      'Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р в„–РЎвЂљР Вµ 5 РЎРѓРЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р в„– Р С—Р С•Р Т‘РЎР‚РЎРЏР Т‘'
    ]
  },
  {
    id: 'ach4',
    title: 'Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°',
    description: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р С–Р Р…Р С‘РЎвЂљР Вµ 20 РЎС“РЎР‚Р С•Р Р†Р Р…РЎРЏ',
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
    title: 'Р СџР С•Р С”РЎС“Р С—Р В°РЎвЂљР ВµР В»РЎРЉ',
    description: 'Р РЋР С•Р Р†Р ВµРЎР‚РЎв‚¬Р С‘РЎвЂљР Вµ 10 Р С—Р С•Р С”РЎС“Р С—Р С•Р С” Р Р† Р СР В°Р С–Р В°Р В·Р С‘Р Р…Р Вµ',
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

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р СР В°Р С–Р В°Р В·Р С‘Р Р…Р В°
export const mockShopItems: ShopItem[] = [
  {
    id: 'shop1',
    name: 'Р вЂР С•Р Р…РЎС“РЎРѓ Р С•Р С—РЎвЂ№РЎвЂљР В° 2x',
    description: 'Р Р€Р Т‘Р Р†Р В°Р С‘Р Р†Р В°Р ВµРЎвЂљ Р С—Р С•Р В»РЎС“РЎвЂЎР В°Р ВµР СРЎвЂ№Р в„– Р С•Р С—РЎвЂ№РЎвЂљ Р Р…Р В° 24 РЎвЂЎР В°РЎРѓР В°',
    price: 500,
    emoji: 'РІС™РЋ',
    isActive: true
  },
  {
    id: 'shop2',
    name: 'VIP РЎРѓРЎвЂљР В°РЎвЂљРЎС“РЎРѓ',
    description: 'Р СџРЎР‚Р ВµР СР С‘РЎС“Р С РЎвЂћРЎС“Р Р…Р С”РЎвЂ Р С‘Р С‘ Р Р…Р В° Р СР ВµРЎРѓРЎРЏРЎвЂ ',
    price: 2000,
    emoji: 'СЂСџвЂвЂ',
    isActive: true
  }
];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р В·Р В°Р С”Р В°Р В·Р С•Р Р†
export const mockOrders: Order[] = [];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎ
export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'Р ВР В·РЎС“РЎвЂЎР С‘РЎвЂљРЎРЉ React',
    description: 'Р С›РЎРѓР Р†Р С•Р С‘РЎвЂљРЎРЉ Р С•РЎРѓР Р…Р С•Р Р†РЎвЂ№ React Р С‘ РЎРѓР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С—Р ВµРЎР‚Р Р†РЎвЂ№Р в„– Р С”Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљ',
    reward: 100,
    rewardType: 'xp',
    deadline: '2024-12-25T18:00:00.000Z',
    category: 'individual',
    status: 'active',
    createdBy: 'system',
    createdAt: '2024-12-01T10:00:00.000Z',
    isPublished: true
  },
  {
    id: 'task2',
    title: 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ API Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»Р ВµР в„–',
    description: 'Р  Р В°Р В·РЎР‚Р В°Р В±Р С•РЎвЂљР В°РЎвЂљРЎРЉ REST API Р Т‘Р В»РЎРЏ РЎС“Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏР СР С‘',
    reward: 200,
    rewardType: 'coins',
    deadline: '2024-12-20T17:00:00.000Z',
    category: 'individual',
    status: 'active',
    createdBy: 'system',
    createdAt: '2024-12-02T09:00:00.000Z',
    isPublished: true
  },
  {
    id: 'task3',
    title: 'Р СњР В°Р С—Р С‘РЎРѓР В°РЎвЂљРЎРЉ РЎвЂљР ВµРЎРѓРЎвЂљРЎвЂ№ Р Т‘Р В»РЎРЏ Р С”Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљР С•Р Р†',
    description: 'Р СџР С•Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ РЎвЂљР ВµРЎРѓРЎвЂљР В°Р СР С‘ Р Р†РЎРѓР Вµ Р С•РЎРѓР Р…Р С•Р Р†Р Р…РЎвЂ№Р Вµ Р С”Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљРЎвЂ№ Р С—РЎР‚Р С‘Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ',
    reward: 150,
    rewardType: 'xp',
    deadline: '2024-12-15T16:00:00.000Z',
    category: 'individual',
    status: 'completed',
    createdBy: 'system',
    createdAt: '2024-11-28T14:00:00.000Z',
    completedAt: '2024-12-15T16:00:00.000Z',
    isPublished: true
  },
  {
    id: 'task4',
    title: 'Р С›Р С—РЎвЂљР С‘Р СР С‘Р В·Р С‘РЎР‚Р С•Р Р†Р В°РЎвЂљРЎРЉ Р С—РЎР‚Р С•Р С‘Р В·Р Р†Р С•Р Т‘Р С‘РЎвЂљР ВµР В»РЎРЉР Р…Р С•РЎРѓРЎвЂљРЎРЉ',
    description: 'Р Р€Р В»РЎС“РЎвЂЎРЎв‚¬Р С‘РЎвЂљРЎРЉ РЎРѓР С”Р С•РЎР‚Р С•РЎРѓРЎвЂљРЎРЉ Р В·Р В°Р С–РЎР‚РЎС“Р В·Р С”Р С‘ Р С‘ Р С•РЎвЂљР В·РЎвЂ№Р Р†РЎвЂЎР С‘Р Р†Р С•РЎРѓРЎвЂљРЎРЉ Р С‘Р Р…РЎвЂљР ВµРЎР‚РЎвЂћР ВµР в„–РЎРѓР В°',
    reward: 300,
    rewardType: 'coins',
    deadline: '2024-12-10T15:00:00.000Z',
    category: 'individual',
    status: 'active',
    createdBy: 'system',
    createdAt: '2024-12-03T11:00:00.000Z',
    isPublished: true
  },
  {
    id: 'task5',
    title: 'Р вЂќР С•Р С”РЎС“Р СР ВµР Р…РЎвЂљР В°РЎвЂ Р С‘РЎРЏ Р С—РЎР‚Р С•Р ВµР С”РЎвЂљР В°',
    description: 'Р РЋР С•Р В·Р Т‘Р В°РЎвЂљРЎРЉ Р С—Р С•Р Т‘РЎР‚Р С•Р В±Р Р…РЎС“РЎР‹ Р Т‘Р С•Р С”РЎС“Р СР ВµР Р…РЎвЂљР В°РЎвЂ Р С‘РЎР‹ Р Т‘Р В»РЎРЏ РЎР‚Р В°Р В·РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С”Р С•Р Р†',
    reward: 100,
    rewardType: 'xp',
    deadline: '2024-12-18T12:00:00.000Z',
    category: 'individual',
    status: 'active',
    createdBy: 'system',
    createdAt: '2024-12-01T16:00:00.000Z',
    isPublished: true
  }
];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ РЎвЂљР С‘Р С—Р С•Р Р† Р С”Р ВµР в„–РЎРѓР С•Р Р†
export const mockCaseTypes: CaseType[] = [
  {
    id: 'case1',
    name: 'Р С›Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р в„– Р С”Р ВµР в„–РЎРѓ',
    description: 'Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘РЎвЂљ Р С•Р В±РЎвЂ№РЎвЂЎР Р…РЎвЂ№Р Вµ Р С—РЎР‚Р ВµР Т‘Р СР ВµРЎвЂљРЎвЂ№ Р С‘ Р Р…Р ВµР В±Р С•Р В»РЎРЉРЎв‚¬Р С‘Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№',
    price: 100,
    color: '#FFD700',
    image: 'рџ“¦',
    rarity: 'common',
    prizes: [
      { id: 'p1', name: '10 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 10, amount: 10, rarity: 'common', probability: 0.4, image: 'рџЄ™', color: '#FFD700' },
      { id: 'p2', name: '20 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 20, amount: 20, rarity: 'common', probability: 0.3, image: 'рџЄ™', color: '#FFD700' },
      { id: 'p3', name: '50 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 50, amount: 50, rarity: 'common', probability: 0.3, image: 'рџЄ™', color: '#FFD700' }
    ]
  },
  {
    id: 'case2',
    name: 'Р  Р ВµР Т‘Р С”Р С‘Р в„– Р С”Р ВµР в„–РЎРѓ',
    description: 'Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘РЎвЂљ РЎР‚Р ВµР Т‘Р С”Р С‘Р Вµ Р С—РЎР‚Р ВµР Т‘Р СР ВµРЎвЂљРЎвЂ№ Р С‘ РЎвЂ Р ВµР Р…Р Р…РЎвЂ№Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№',
    price: 500,
    color: '#C0C0C0',
    image: 'рџ’Ћ',
    rarity: 'rare',
    prizes: [
      { id: 'p4', name: '100 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 100, amount: 100, rarity: 'rare', probability: 0.4, image: 'рџЄ™', color: '#C0C0C0' },
      { id: 'p5', name: '200 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 200, amount: 200, rarity: 'rare', probability: 0.3, image: 'рџЄ™', color: '#C0C0C0' },
      { id: 'p6', name: 'Р  Р ВµР Т‘Р С”Р С‘Р в„– Р В°Р Р†Р В°РЎвЂљР В°РЎР‚', type: 'avatar', value: 1, amount: 1, rarity: 'rare', probability: 0.3, image: 'рџ‘¤', color: '#C0C0C0' }
    ]
  },
  {
    id: 'case3',
    name: 'Р В­Р С—Р С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„– Р С”Р ВµР в„–РЎРѓ',
    description: 'Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘РЎвЂљ РЎРЊР С—Р С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р Вµ Р С—РЎР‚Р ВµР Т‘Р СР ВµРЎвЂљРЎвЂ№ Р С‘ Р В±Р С•Р В»РЎРЉРЎв‚¬Р С‘Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№',
    price: 1000,
    color: '#9D4EDD',
    image: 'вљЎ',
    rarity: 'epic',
    prizes: [
      { id: 'p7', name: '500 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 500, amount: 500, rarity: 'epic', probability: 0.4, image: 'рџЄ™', color: '#9D4EDD' },
      { id: 'p8', name: '1000 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 1000, amount: 1000, rarity: 'epic', probability: 0.3, image: 'рџЄ™', color: '#9D4EDD' },
      { id: 'p9', name: 'Р В­Р С—Р С‘РЎвЂЎР ВµРЎРѓР С”Р С‘Р в„– Р В°Р Р†Р В°РЎвЂљР В°РЎР‚', type: 'avatar', value: 1, amount: 1, rarity: 'epic', probability: 0.3, image: 'рџ‘¤', color: '#9D4EDD' }
    ]
  },
  {
    id: 'case4',
    name: 'Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°РЎР‚Р Р…РЎвЂ№Р в„– Р С”Р ВµР в„–РЎРѓ',
    description: 'Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘РЎвЂљ Р В»Р ВµР С–Р ВµР Р…Р Т‘Р В°РЎР‚Р Р…РЎвЂ№Р Вµ Р С—РЎР‚Р ВµР Т‘Р СР ВµРЎвЂљРЎвЂ№ Р С‘ Р С•Р С–РЎР‚Р С•Р СР Р…РЎвЂ№Р Вµ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№',
    price: 2500,
    color: '#FF6B35',
    image: 'рџ‘‘',
    rarity: 'legendary',
    prizes: [
      { id: 'p10', name: '2000 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 2000, amount: 2000, rarity: 'legendary', probability: 0.4, image: 'рџЄ™', color: '#FF6B35' },
      { id: 'p11', name: '5000 Р СР С•Р Р…Р ВµРЎвЂљ', type: 'coins', value: 5000, amount: 5000, rarity: 'legendary', probability: 0.3, image: 'рџЄ™', color: '#FF6B35' },
      { id: 'p12', name: 'Р вЂєР ВµР С–Р ВµР Р…Р Т‘Р В°РЎР‚Р Р…РЎвЂ№Р в„– Р В°Р Р†Р В°РЎвЂљР В°РЎР‚', type: 'avatar', value: 1, amount: 1, rarity: 'legendary', probability: 0.3, image: 'рџ‘¤', color: '#FF6B35' }
    ]
  }
];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЉРЎРѓР С”Р С‘РЎвЂ¦ Р С”Р ВµР в„–РЎРѓР С•Р Р†
export const mockUserCases: UserCase[] = [];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РєРµР№СЃРѕРІ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ (Р°Р»РёР°СЃ РґР»СЏ mockUserCases)
export const mockCases: UserCase[] = mockUserCases;

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РјР°РіР°Р·РёРЅР° РєРµР№СЃРѕРІ
export const mockCaseShopItems: CaseShopItem[] = [
  {
    id: 'shop_case1',
    name: 'РћР±С‹С‡РЅС‹Р№ РєРµР№СЃ',
    price: 1000,
    emoji: 'рџ“¦',
    caseTypeId: 'case1',
    currency: 'coins',
    isAvailable: true
  },
  {
    id: 'shop_case2',
    name: 'Р РµРґРєРёР№ РєРµР№СЃ',
    price: 2500,
    emoji: 'рџ’Ћ',
    caseTypeId: 'case2',
    currency: 'coins',
    discount: 20,
    isAvailable: true
  },
  {
    id: 'shop_case3',
    name: 'Р­РїРёС‡РµСЃРєРёР№ РєРµР№СЃ',
    price: 5000,
    emoji: 'вљЎ',
    caseTypeId: 'case3',
    currency: 'coins',
    isAvailable: true
  }
];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ РЎС“Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘Р в„–
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'system',
    title: 'Р вЂќР С•Р В±РЎР‚Р С• Р С—Р С•Р В¶Р В°Р В»Р С•Р Р†Р В°РЎвЂљРЎРЉ!',
    message: 'Р вЂќР С•Р В±РЎР‚Р С• Р С—Р С•Р В¶Р В°Р В»Р С•Р Р†Р В°РЎвЂљРЎРЉ Р Р† GRITHER!',
    timestamp: new Date().toISOString(),
    read: false,
    priority: 'normal'
  }
];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р В»Р С‘Р Т‘Р ВµРЎР‚Р В±Р С•РЎР‚Р Т‘Р В°
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: 'user1',
    name: 'Р СџР ВµРЎвЂљРЎР‚ Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†',
    level: 18,
    experience: 1800,
    balance: 2500,
    achievements: 15,
    team: 'Team 1',
    rank: 1
  },
  {
    id: 'user2',
    name: 'Р вЂўР В»Р ВµР Р…Р В° Р СљР С•РЎР‚Р С•Р В·Р С•Р Р†Р В°',
    level: 16,
    experience: 1600,
    balance: 2200,
    achievements: 12,
    team: 'Team 2',
    rank: 2
  },
  {
    id: 'user3',
    name: 'Р С’Р Р…Р Р…Р В° Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°',
    level: 15,
    experience: 1500,
    balance: 2000,
    achievements: 10,
    team: 'Team 1',
    rank: 3
  }
];

// Р СљР С•Р С”-Р Т‘Р В°Р Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р† Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ
export const mockBattles: Battle[] = [
  {
    id: 'battle1',
    title: 'Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ Р С’Р Р…Р Р…Р С•Р в„–',
    challengerId: 'user1',
    challengerName: 'Р вЂ™РЎвЂ№',
    opponentId: 'user3',
    opponentName: 'Р С’Р Р…Р Р…Р В° Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°',
    stake: 150,
    status: 'completed',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    completedAt: new Date('2024-01-15T12:00:00Z'),
    winnerId: 'user3',
    evidence: []
  },
  {
    id: 'battle2',
    title: 'Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ Р СљР В°РЎР‚Р С‘Р ВµР в„–',
    challengerId: 'user1',
    challengerName: 'Р вЂ™РЎвЂ№',
    opponentId: 'user4',
    opponentName: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†Р В°',
    stake: 200,
    status: 'completed',
    createdAt: new Date('2024-01-16T14:00:00Z'),
    completedAt: new Date('2024-01-16T16:00:00Z'),
    winnerId: 'user1',
    evidence: []
  },
  {
    id: 'battle3',
    title: 'Р вЂР В°РЎвЂљРЎвЂљР В» РЎРѓ Р вЂўР В»Р ВµР Р…Р С•Р в„–',
    challengerId: 'user1',
    challengerName: 'Р вЂ™РЎвЂ№',
    opponentId: 'user2',
    opponentName: 'Р вЂўР В»Р ВµР Р…Р В° Р СљР С•РЎР‚Р С•Р В·Р С•Р Р†Р В°',
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
    name: 'Р’С‹',
    avatar: undefined,
    level: 5,
    experience: 1250,
    balance: 1500,
    team: 'РљРѕРјР°РЅРґР° Рђ',
    role: 'member',
    online: true
  } as User,
  achievements: mockAchievements,
  tasks: mockTasks,
  shopItems: mockShopItems,
  orders: mockOrders,
  cases: mockCases,
  notifications: mockNotifications,
  battles: mockBattles
};