import { Achievement } from '../types/achievements';
import { ShopItem, Order } from '../types/shop';
import { Task } from '../types/tasks';
import { CaseType, UserCase, CaseShopItem, Prize } from '../types/cases';
import { Notification } from '../types/notifications';
import { LeaderboardEntry, User } from '../types/global';

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
      type: 'coins',
      amount: 100
    },
    status: 'available',
    isActive: true,
    conditions: ['Р’С‹РїРѕР»РЅРёС‚СЊ Р»СЋР±СѓСЋ Р·Р°РґР°С‡Сѓ']
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
      current: 0
    },
    reward: {
      type: 'experience',
      amount: 500
    },
    status: 'locked',
    isActive: true,
    conditions: ['Р’С‹РїРѕР»РЅРёС‚СЊ 10 Р·Р°РґР°С‡ Р»СЋР±РѕР№ СЃР»РѕР¶РЅРѕСЃС‚Рё']
  }
];

// РџСЂРѕСЃС‚С‹Рµ РјРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ С‚РѕРІР°СЂРѕРІ РІ РјР°РіР°Р·РёРЅРµ
export const mockShopItems: ShopItem[] = [
  {
    id: 'shop1',
    name: 'Р‘РѕРЅСѓСЃ РѕРїС‹С‚Р° 2x',
    price: 500,
    description: 'РЈРґРІР°РёРІР°РµС‚ РїРѕР»СѓС‡Р°РµРјС‹Р№ РѕРїС‹С‚ РЅР° 24 С‡Р°СЃР°',
    category: 'bonus',
    isActive: true,
    stock: 50,
    emoji: 'вљЎ'
  },
  {
    id: 'shop2',
    name: 'VIP СЃС‚Р°С‚СѓСЃ',
    price: 2000,
    description: 'Р Р°СЃС€РёСЂРµРЅРЅС‹Рµ РїСЂРёРІРёР»РµРіРёРё РЅР° РјРµСЃСЏС†',
    category: 'privilege',
    isActive: true,
    stock: 10,
    emoji: 'рџ‘‘'
  }
];

// РџСЂРѕСЃС‚С‹Рµ РјРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ Р·Р°РєР°Р·РѕРІ
export const mockOrders: Order[] = [];

// РџСЂРѕСЃС‚С‹Рµ РјРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ Р·Р°РґР°С‡
export const mockTasks: Task[] = [
  {
    id: 'task1',
    title: 'РЎРѕР·РґР°С‚СЊ РЅРѕРІС‹Р№ РєРѕРјРїРѕРЅРµРЅС‚',
    description: 'Р Р°Р·СЂР°Р±РѕС‚Р°С‚СЊ РїРµСЂРµРёСЃРїРѕР»СЊР·СѓРµРјС‹Р№ РєРѕРјРїРѕРЅРµРЅС‚ РґР»СЏ РёРЅС‚РµСЂС„РµР№СЃР°',
    reward: 300,
    rewardType: 'coins',
    deadline: '2024-01-25T18:00:00Z',
    category: 'individual',
    status: 'active',
    assignedTo: 'current_user',
    createdBy: 'admin',
    createdAt: '2024-01-20T09:00:00Z',
    isPublished: true
  }
];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РїСЂРёР·РѕРІ
export const mockPrizes: Prize[] = [
  // Р‘Р°Р·РѕРІС‹Рµ РїСЂРёР·С‹
  { id: 'prize1', name: '50 РјРѕРЅРµС‚', image: 'рџЄ™', rarity: 'common', color: '#94A3B8', value: 50, dropChance: 40, description: 'РќРµР±РѕР»СЊС€РѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РјРѕРЅРµС‚', type: 'coins' },
  { id: 'prize2', name: '100 РѕРїС‹С‚Р°', image: 'в­ђ', rarity: 'common', color: '#94A3B8', value: 100, dropChance: 30, description: 'РќРµРјРЅРѕРіРѕ РѕРїС‹С‚Р° РґР»СЏ РїСЂРѕРіСЂРµСЃСЃР°', type: 'experience' },
  { id: 'prize3', name: 'Р‘Р°Р·РѕРІС‹Р№ СѓСЃРёР»РёС‚РµР»СЊ', image: 'рџ”‹', rarity: 'common', color: '#94A3B8', value: 75, dropChance: 20, description: 'РџСЂРѕСЃС‚РѕР№ СѓСЃРёР»РёС‚РµР»СЊ С…Р°СЂР°РєС‚РµСЂРёСЃС‚РёРє', type: 'item' },
  
  // Р РµРґРєРёРµ РїСЂРёР·С‹
  { id: 'prize4', name: '200 РјРѕРЅРµС‚', image: 'рџ’°', rarity: 'rare', color: '#3B82F6', value: 200, dropChance: 25, description: 'РҐРѕСЂРѕС€РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РјРѕРЅРµС‚', type: 'coins' },
  { id: 'prize5', name: '300 РѕРїС‹С‚Р°', image: 'вњЁ', rarity: 'rare', color: '#3B82F6', value: 300, dropChance: 20, description: 'Р—Р°РјРµС‚РЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РѕРїС‹С‚Р°', type: 'experience' },
  { id: 'prize6', name: 'Р РµРґРєРёР№ Р°СЂС‚РµС„Р°РєС‚', image: 'рџ”®', rarity: 'rare', color: '#3B82F6', value: 250, dropChance: 15, description: 'Р¦РµРЅРЅС‹Р№ Р°СЂС‚РµС„Р°РєС‚ СЃ РѕСЃРѕР±С‹РјРё СЃРІРѕР№СЃС‚РІР°РјРё', type: 'item' },
  
  // Р­РїРёС‡РµСЃРєРёРµ РїСЂРёР·С‹
  { id: 'prize7', name: '500 РјРѕРЅРµС‚', image: 'рџ’Ћ', rarity: 'epic', color: '#8B5CF6', value: 500, dropChance: 15, description: 'Р’РЅСѓС€РёС‚РµР»СЊРЅР°СЏ СЃСѓРјРјР° РјРѕРЅРµС‚', type: 'coins' },
  { id: 'prize8', name: '750 РѕРїС‹С‚Р°', image: 'рџЊџ', rarity: 'epic', color: '#8B5CF6', value: 750, dropChance: 10, description: 'Р‘РѕР»СЊС€РѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РѕРїС‹С‚Р°', type: 'experience' },
  { id: 'prize9', name: 'Р­РїРёС‡РµСЃРєРёР№ Р°РјСѓР»РµС‚', image: 'рџЏє', rarity: 'epic', color: '#8B5CF6', value: 600, dropChance: 8, description: 'РњРѕС‰РЅС‹Р№ Р°РјСѓР»РµС‚ СЃ СѓРЅРёРєР°Р»СЊРЅС‹РјРё СЃРїРѕСЃРѕР±РЅРѕСЃС‚СЏРјРё', type: 'item' },
  
  // Р›РµРіРµРЅРґР°СЂРЅС‹Рµ РїСЂРёР·С‹
  { id: 'prize10', name: '1000 РјРѕРЅРµС‚', image: 'рџ‘‘', rarity: 'legendary', color: '#F59E0B', value: 1000, dropChance: 4, description: 'РћРіСЂРѕРјРЅР°СЏ СЃСѓРјРјР° РјРѕРЅРµС‚', type: 'coins' },
  { id: 'prize11', name: '1500 РѕРїС‹С‚Р°', image: 'рџ’«', rarity: 'legendary', color: '#F59E0B', value: 1500, dropChance: 3, description: 'РљРѕР»РѕСЃСЃР°Р»СЊРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РѕРїС‹С‚Р°', type: 'experience' },
  { id: 'prize12', name: 'Р›РµРіРµРЅРґР°СЂРЅРѕРµ РѕСЂСѓР¶РёРµ', image: 'вљ”пёЏ', rarity: 'legendary', color: '#F59E0B', value: 1200, dropChance: 2, description: 'Р›РµРіРµРЅРґР°СЂРЅРѕРµ РѕСЂСѓР¶РёРµ РЅРµРІРµСЂРѕСЏС‚РЅРѕР№ СЃРёР»С‹', type: 'item' },
  
  // РњРёС„РёС‡РµСЃРєРёРµ РїСЂРёР·С‹
  { id: 'prize13', name: '2500 РјРѕРЅРµС‚', image: 'рџЏ†', rarity: 'mythic', color: '#EF4444', value: 2500, dropChance: 0.8, description: 'РњРёС„РёС‡РµСЃРєРѕРµ Р±РѕРіР°С‚СЃС‚РІРѕ', type: 'coins' },
  { id: 'prize14', name: '3000 РѕРїС‹С‚Р°', image: 'рџ”Ґ', rarity: 'mythic', color: '#EF4444', value: 3000, dropChance: 0.5, description: 'Р‘РѕР¶РµСЃС‚РІРµРЅРЅРѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РѕРїС‹С‚Р°', type: 'experience' },
  { id: 'prize15', name: 'РњРёС„РёС‡РµСЃРєРёР№ Р°СЂС‚РµС„Р°РєС‚', image: 'рџ—ї', rarity: 'mythic', color: '#EF4444', value: 2000, dropChance: 0.2, description: 'РђСЂС‚РµС„Р°РєС‚ РґСЂРµРІРЅРёС… Р±РѕРіРѕРІ', type: 'item' }
];

// РЎРѕР·РґР°РµРј РєРµР№СЃС‹ Р±РµР· circular reference
const createCaseTypes = (): CaseType[] => {
  const commonPrizes = mockPrizes.filter(p => p.rarity === 'common');
  const rarePrizes = mockPrizes.filter(p => p.rarity === 'common' || p.rarity === 'rare');
  const epicPrizes = mockPrizes.filter(p => p.rarity === 'rare' || p.rarity === 'epic');
  const legendaryPrizes = mockPrizes.filter(p => p.rarity === 'epic' || p.rarity === 'legendary');
  const mythicPrizes = mockPrizes.filter(p => p.rarity === 'legendary' || p.rarity === 'mythic');

  return [
    {
      id: 'case1',
      name: 'CLASSIC',
      image: 'https://images.unsplash.com/photo-1662348317573-594daeff9ce1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwYmxhY2slMjB0ZWNoJTIwY2FzZSUyMGJveHxlbnwxfHx8fDE3NTcwNzcxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rarity: 'common',
      color: '#FF4444',
      description: 'РћР±С‹С‡РЅС‹Р№ РєРµР№СЃ СЃ Р±Р°Р·РѕРІС‹РјРё РїСЂРµРґРјРµС‚Р°РјРё',
      contents: ['РњРѕРЅРµС‚С‹ x100', 'РћРїС‹С‚ x50', 'Р‘Р°Р·РѕРІС‹Р№ РїСЂРµРґРјРµС‚'],
      prizes: commonPrizes,
      isActive: true,
      glowColor: '#FF4444',
      glowIntensity: 'low'
    },
    {
      id: 'case2',
      name: 'PRO',
      image: 'https://images.unsplash.com/photo-1546728684-0c649e299b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG5lb24lMjBjeWJlcnB1bmslMjB0ZWNoJTIwY2FzZXxlbnwxfHx8fDE3NTcwNzcxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rarity: 'rare',
      color: '#00FF44',
      description: 'Р РµРґРєРёР№ РєРµР№СЃ СЃ С†РµРЅРЅС‹РјРё РїСЂРµРґРјРµС‚Р°РјРё',
      contents: ['РњРѕРЅРµС‚С‹ x300', 'РћРїС‹С‚ x150', 'Р РµРґРєРёР№ РїСЂРµРґРјпїЅпїЅС‚'],
      prizes: rarePrizes,
      isActive: true,
      glowColor: '#00FF44',
      glowIntensity: 'medium'
    },
    {
      id: 'case3',
      name: 'ULTRA',
      image: 'https://images.unsplash.com/photo-1754302003140-8aae275f1a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwZ2xvd2luZyUyMHRlY2glMjBjb250YWluZXIlMjBjYXNlfGVufDF8fHx8MTc1NzA3NzE3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rarity: 'epic',
      color: '#4488FF',
      description: 'Р­РїРёС‡РµСЃРєРёР№ РєРµР№СЃ СЃ РјРѕС‰РЅС‹РјРё РїСЂРµРґРјРµС‚Р°РјРё',
      contents: ['РњРѕРЅРµС‚С‹ x500', 'РћРїС‹С‚ x300', 'Р­РїРёС‡РµСЃРєРёР№ РїСЂРµРґРјРµС‚'],
      prizes: epicPrizes,
      isActive: true,
      glowColor: '#4488FF',
      glowIntensity: 'high'
    },
    {
      id: 'case4',
      name: 'LEGEND',
      image: 'https://images.unsplash.com/photo-1664849328797-d94d3831a793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBsdXh1cnklMjB0ZWNoJTIwY29udGFpbmVyJTIwY2FzZXxlbnwxfHx8fDE3NTcwODA0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rarity: 'legendary',
      color: '#F59E0B',
      description: 'Р›РµРіРµРЅРґР°СЂРЅС‹Р№ РєРµР№СЃ СЃ СѓРЅРёРєР°Р»СЊРЅС‹РјРё РїСЂРµРґРјРµС‚Р°РјРё',
      contents: ['РњРѕРЅРµС‚С‹ x1000', 'РћРїС‹С‚ x500', 'Р›РµРіРµРЅРґР°СЂРЅС‹Р№ РїСЂРµРґРјРµС‚'],
      prizes: legendaryPrizes,
      isActive: true,
      glowColor: '#F59E0B',
      glowIntensity: 'high'
    },
    {
      id: 'case5',
      name: 'MYTHIC',
      image: 'https://images.unsplash.com/photo-1609323170129-bf4d7d4d7dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBnbG93aW5nJTIwZnV0dXJpc3RpYyUyMHRlY2glMjBjYXNlfGVufDF8fHx8MTc1NzA4MDQ3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rarity: 'mythic',
      color: '#EF4444',
      description: 'РњРёС„РёС‡РµСЃРєРёР№ РєРµР№СЃ СЃ СЃР°РјС‹РјРё СЂРµРґРєРёРјРё РїСЂРµРґРјРµС‚Р°РјРё',
      contents: ['РњРѕРЅРµС‚С‹ x2000', 'РћРїС‹С‚ x1000', 'РњРёС„РёС‡РµСЃРєРёР№ РїСЂРµРґРјРµС‚'],
      prizes: mythicPrizes,
      isActive: true,
      glowColor: '#EF4444',
      glowIntensity: 'high'
    }
  ];
};

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ С‚РёРїРѕРІ РєРµР№СЃРѕРІ
export const mockCaseTypes: CaseType[] = createCaseTypes();

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃпїЅпїЅРёС… РєРµР№СЃРѕРІ
export const mockUserCases: UserCase[] = [];

// РњРѕРє-РґР°РЅРЅС‹Рµ РґР»СЏ РјР°РіР°Р·РёРЅР° РєРµР№СЃРѕРІ
export const mockCaseShopItems: CaseShopItem[] = [
  {
    id: 'shop_case1',
    caseTypeId: 'case1',
    price: 5000,
    currency: 'coins',
    isAvailable: true
  },
  {
    id: 'shop_case2',
    caseTypeId: 'case2',
    price: 12000,
    currency: 'coins',
    isAvailable: true
  },
  {
    id: 'shop_case3',
    caseTypeId: 'case3',
    price: 25000,
    currency: 'coins',
    isAvailable: true
  },
  {
    id: 'shop_case4',
    caseTypeId: 'case4',
    price: 50000,
    currency: 'coins',
    isAvailable: true
  },
  {
    id: 'shop_case5',
    caseTypeId: 'case5',
    price: 100000,
    currency: 'coins',
    isAvailable: true
  }
];

// РџСЂРёРјРµСЂС‹ СѓРІРµРґРѕРјР»РµРЅРёР№ РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё
export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    type: 'system',
    title: 'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ!',
    message: 'Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ РІ GRITHER! Р—РґРµСЃСЊ РІС‹ Р±СѓРґРµС‚Рµ РїРѕР»СѓС‡Р°С‚СЊ РІСЃРµ РІР°Р¶РЅС‹Рµ СѓРІРµРґРѕРјР»РµРЅРёСЏ.',
    timestamp: new Date(Date.now() - 60000), // 1 РјРёРЅСѓС‚Р° РЅР°Р·Р°Рґ
    read: false,
    priority: 'medium'
  },
  {
    id: 'notif_2',
    type: 'achievement',
    title: 'РџРµСЂРІРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ!',
    message: 'РџРѕР·РґСЂР°РІР»СЏРµРј! Р’С‹ РїРѕР»СѓС‡РёР»Рё СЃРІРѕС‘ РїРµСЂРІРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ "РќРѕРІРёС‡РѕРє".',
    timestamp: new Date(Date.now() - 180000), // 3 РјРёРЅСѓС‚С‹ РЅР°Р·Р°Рґ
    read: true,
    priority: 'medium',
    data: { achievementId: 'newcomer', reward: 100 }
  }
];

// Mock РґР°РЅРЅС‹Рµ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'РђРЅРЅР° РРІР°РЅРѕРІР°',
    username: '@anna_ivanova',
    avatar: '',
    role: 'worker',
    level: 15,
    experience: 2250,
    maxExperience: 3000,
    balance: 8500,
    rating: 1250,
    completedTasks: 45,
    achievementsCount: 32,
    battlesWon: 12,
    battlesLost: 3,
    teamId: 'team1',
    isOnline: true,
    lastSeen: new Date(),
    joinedDate: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'РџРµС‚СЂ РџРµС‚СЂРѕРІ',
    username: '@petr_petrov',
    avatar: '',
    role: 'teamlead',
    level: 18,
    experience: 1800,
    maxExperience: 4000,
    balance: 12000,
    rating: 1450,
    completedTasks: 62,
    achievementsCount: 45,
    battlesWon: 18,
    battlesLost: 4,
    teamId: 'team2',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1800000), // 30 РјРёРЅСѓС‚ РЅР°Р·Р°Рґ
    joinedDate: new Date('2023-03-20')
  },
  {
    id: '3',
    name: 'РњР°СЂРёСЏ РЎРёРґРѕСЂРѕРІР°',
    username: '@maria_sidorova',
    avatar: '',
    role: 'worker',
    level: 12,
    experience: 1200,
    maxExperience: 2500,
    balance: 5600,
    rating: 980,
    completedTasks: 28,
    achievementsCount: 23,
    battlesWon: 7,
    battlesLost: 5,
    teamId: 'team1',
    isOnline: true,
    lastSeen: new Date(),
    joinedDate: new Date('2023-08-10')
  },
  {
    id: '4',
    name: 'РђР»РµРєСЃРµР№ РљРѕР·Р»РѕРІ',
    username: '@alexey_kozlov',
    avatar: '',
    role: 'worker',
    level: 14,
    experience: 2100,
    maxExperience: 2800,
    balance: 7300,
    rating: 1120,
    completedTasks: 38,
    achievementsCount: 29,
    battlesWon: 10,
    battlesLost: 6,
    teamId: 'team3',
    isOnline: true,
    lastSeen: new Date(),
    joinedDate: new Date('2023-05-05')
  },
  {
    id: '5',
    name: 'Р•Р»РµРЅР° РњРѕСЂРѕР·РѕРІР°',
    username: '@elena_morozova',
    avatar: '',
    role: 'junior_admin',
    level: 16,
    experience: 2400,
    maxExperience: 3200,
    balance: 9800,
    rating: 1380,
    completedTasks: 51,
    achievementsCount: 38,
    battlesWon: 15,
    battlesLost: 2,
    teamId: 'team2',
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000), // 1 С‡Р°СЃ РЅР°Р·Р°Рґ
    joinedDate: new Date('2023-01-12')
  }
];

// Mock РґР°РЅРЅС‹Рµ РґР»СЏ Р»РёРґРµСЂР±РѕСЂРґР°
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: mockUsers.find(u => u.id === '2')!,
    change: 0, // Р±РµР· РёР·РјРµРЅРµРЅРёР№
    score: mockUsers.find(u => u.id === '2')?.rating || 0
  },
  {
    rank: 2,
    user: mockUsers.find(u => u.id === '5')!,
    change: 1, // РїРѕРґРЅСЏР»СЃСЏ РЅР° 1 РїРѕР·РёС†РёСЋ
    score: mockUsers.find(u => u.id === '5')?.rating || 0
  },
  {
    rank: 3,
    user: mockUsers.find(u => u.id === '1')!,
    change: -1, // РѕРїСѓСЃС‚РёР»СЃСЏ РЅР° 1 РїРѕР·РёС†РёСЋ
    score: mockUsers.find(u => u.id === '1')?.rating || 0
  },
  {
    rank: 4,
    user: mockUsers.find(u => u.id === '4')!,
    change: 0,
    score: mockUsers.find(u => u.id === '4')?.rating || 0
  },
  {
    rank: 5,
    user: mockUsers.find(u => u.id === '3')!,
    change: 0,
    score: mockUsers.find(u => u.id === '3')?.rating || 0
  }
];
