import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  ShoppingBag,
  Gift,
  Star,
  DollarSign,
  Image,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Box,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { databaseService } from '../services/database';
import { useAdminDatabase, ShopItemData } from '../hooks/useAdminDatabase';

interface AdminShopManagementProps {
  theme: 'light' | 'dark';
}

// Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ ShopItemData Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦

interface CaseItem extends ShopItemData {
  caseType: 'bronze' | 'silver' | 'gold' | 'platinum';
  prizes: CasePrize[];
  totalPrizeValue: number;
}

interface CasePrize {
  id: string;
  name: string;
  description: string;
  probability: number;
  value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  isGuaranteed: boolean;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  createdAt: string;
  completedAt?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const CATEGORIES = [
  { value: 'cases', label: 'Р В РЎв„ўР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚в„– Р В РЎвЂ Р В Р вЂ¦Р В Р’В°Р В Р’В±Р В РЎвЂўР РЋР вЂљР РЋРІР‚в„–', icon: 'РЎР‚РЎСџР вЂ№Р С“' },
  { value: 'boosters', label: 'Р В РІР‚ВР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљР РЋРІР‚в„– Р В РЎвЂ Р РЋРЎвЂњР РЋР С“Р В РЎвЂР В Р’В»Р В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ', icon: 'Р Р†РЎв„ўР Р‹' },
  { value: 'cosmetics', label: 'Р В РЎв„ўР В РЎвЂўР РЋР С“Р В РЎВР В Р’ВµР РЋРІР‚С™Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂР В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В Р’ВµР В РўвЂР В РЎВР В Р’ВµР РЋРІР‚С™Р РЋРІР‚в„–', icon: 'РЎР‚РЎСџР вЂ№Р Рѓ' },
  { value: 'exclusive', label: 'Р В Р’В­Р В РЎвЂќР РЋР С“Р В РЎвЂќР В Р’В»Р РЋР вЂ№Р В Р’В·Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРІР‚в„–', icon: 'РЎР‚РЎСџР РЏРІР‚В ' }
];

const RARITY_LEVELS = [
  { value: 'common', label: 'Р В РЎвЂєР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: 'bg-gray-500' },
  { value: 'rare', label: 'Р В Р’В Р В Р’ВµР В РўвЂР В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-blue-500' },
  { value: 'epic', label: 'Р В Р’В­Р В РЎвЂ”Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-purple-500' },
  { value: 'legendary', label: 'Р В РІР‚С”Р В Р’ВµР В РЎвЂ“Р В Р’ВµР В Р вЂ¦Р В РўвЂР В Р’В°Р РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: 'bg-orange-500' }
];

const CASE_TYPES = [
  { value: 'bronze', label: 'Р В РІР‚ВР РЋР вЂљР В РЎвЂўР В Р вЂ¦Р В Р’В·Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: '#CD7F32', priceRange: '100-300' },
  { value: 'silver', label: 'Р В Р Р‹Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р’В±Р РЋР вЂљР РЋР РЏР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: '#C0C0C0', priceRange: '300-600' },
  { value: 'gold', label: 'Р В РІР‚вЂќР В РЎвЂўР В Р’В»Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂўР В РІвЂћвЂ“', color: '#FFD700', priceRange: '600-1200' },
  { value: 'platinum', label: 'Р В РЎСџР В Р’В»Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: '#E5E4E2', priceRange: '1200+' }
];

export const AdminShopManagement: React.FC<AdminShopManagementProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'items' | 'cases' | 'orders'>('items');
  const [items, setItems] = useState<ShopItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredItems, setFilteredItems] = useState<ShopItem[]>([]);
  const [filteredCases, setFilteredCases] = useState<CaseItem[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | CaseItem | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
  useEffect(() => {
    loadData();
  }, []);

  // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ
  useEffect(() => {
    filterData();
  }, [items, cases, orders, searchQuery, filterCategory, filterRarity, filterStatus]);

  const loadData = async () => {
    // Mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ
    const mockItems: ShopItem[] = [
      {
        id: '1',
        name: 'Р В РЎв„ўР В Р’ВµР В РІвЂћвЂ“Р РЋР С“ "Р В Р в‚¬Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В Р’В°"',
        description: 'Р В Р Р‹Р В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В¶Р В РЎвЂР РЋРІР‚С™ Р РЋР С“Р В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРІР‚в„–',
        category: 'cases',
        price: 100,
        image: '/api/placeholder/100/100',
        icon: 'РЎР‚РЎСџР вЂ№Р С“',
        rarity: 'common',
        isActive: true,
        salesCount: 1247,
        popularity: 85,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Р В РІР‚ВР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В°',
        description: 'Р В Р в‚¬Р В Р вЂ Р В Р’ВµР В Р’В»Р В РЎвЂР РЋРІР‚РЋР В РЎвЂР В Р вЂ Р В Р’В°Р В Р’ВµР РЋРІР‚С™ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В° Р В Р вЂ¦Р В Р’В° 50%',
        category: 'boosters',
        price: 50,
        image: '/api/placeholder/100/100',
        icon: 'Р Р†РЎв„ўР Р‹',
        rarity: 'rare',
        isActive: true,
        salesCount: 856,
        popularity: 92,
        createdAt: '2024-01-02T00:00:00Z'
      }
    ];

    const mockCases: CaseItem[] = [
      {
        id: '1',
        name: 'CLASSIC',
        description: 'Р В РЎвЂєР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“ Р РЋР С“ Р В Р’В±Р В Р’В°Р В Р’В·Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РЎВР В РЎвЂ Р В РЎвЂ”Р РЋР вЂљР В Р’ВµР В РўвЂР В РЎВР В Р’ВµР РЋРІР‚С™Р В Р’В°Р В РЎВР В РЎвЂ',
        category: 'cases',
        price: 100,
        image: '/api/placeholder/100/100',
        icon: 'РЎР‚РЎСџР вЂ№Р С“',
        rarity: 'common',
        isActive: true,
        salesCount: 1247,
        popularity: 85,
        createdAt: '2024-01-01T00:00:00Z',
        caseType: 'bronze',
        prizes: [
          {
            id: '1',
            name: '50 Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™',
            description: 'Р В РЎСљР В Р’ВµР В Р’В±Р В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋРІвЂљВ¬Р В РЎвЂўР В Р’Вµ Р В РЎвЂќР В РЎвЂўР В Р’В»Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В РЎвЂў Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™',
            probability: 40,
            value: 50,
            rarity: 'common',
            icon: 'РЎР‚РЎСџРІР‚в„ўР’В°',
            isGuaranteed: false
          },
          {
            id: '2',
            name: '100 Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В°',
            description: 'Р В РЎСљР В Р’ВµР В РЎВР В Р вЂ¦Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В° Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РЎвЂ“Р РЋР вЂљР В Р’ВµР РЋР С“Р РЋР С“Р В Р’В°',
            probability: 30,
            value: 100,
            rarity: 'common',
            icon: 'Р Р†Р’В­РЎвЂ™',
            isGuaranteed: false
          }
        ],
        totalPrizeValue: 150
      }
    ];

    const mockOrders: Order[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ',
        items: [
          { id: '1', name: 'Р В РЎв„ўР В Р’ВµР В РІвЂћвЂ“Р РЋР С“ "Р В Р в‚¬Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В Р’В°"', quantity: 2, price: 100 }
        ],
        totalAmount: 200,
        status: 'completed',
        createdAt: '2024-01-20T10:30:00Z',
        completedAt: '2024-01-20T10:31:00Z'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°',
        items: [
          { id: '2', name: 'Р В РІР‚ВР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В°', quantity: 1, price: 50 }
        ],
        totalAmount: 50,
        status: 'pending',
        createdAt: '2024-01-21T14:15:00Z'
      }
    ];

    setItems(mockItems);
    setCases(mockCases);
    setOrders(mockOrders);
  };

  const filterData = () => {
    if (activeTab === 'items') {
      let filtered = items;

      if (searchQuery) {
        filtered = filtered.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filterCategory !== 'all') {
        filtered = filtered.filter(item => item.category === filterCategory);
      }

      if (filterRarity !== 'all') {
        filtered = filtered.filter(item => item.rarity === filterRarity);
      }

      setFilteredItems(filtered);
    } else if (activeTab === 'cases') {
      let filtered = cases;

      if (searchQuery) {
        filtered = filtered.filter(caseItem =>
          caseItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          caseItem.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (filterCategory !== 'all') {
        filtered = filtered.filter(caseItem => caseItem.category === filterCategory);
      }

      if (filterRarity !== 'all') {
        filtered = filtered.filter(caseItem => caseItem.rarity === filterRarity);
      }

      setFilteredCases(filtered);
    } else if (activeTab === 'orders') {
      let filtered = orders;

      if (searchQuery) {
        filtered = filtered.filter(order =>
          order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      if (filterStatus !== 'all') {
        filtered = filtered.filter(order => order.status === filterStatus);
      }

      setFilteredOrders(filtered);
    }
  };

  const getRarityColor = (rarity: string) => {
    return RARITY_LEVELS.find(r => r.value === rarity)?.color || 'bg-gray-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      case 'refunded': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦';
      case 'pending': return 'Р В РЎвЂєР В Р’В¶Р В РЎвЂР В РўвЂР В Р’В°Р В Р’ВµР РЋРІР‚С™';
      case 'cancelled': return 'Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’ВµР В Р вЂ¦';
      case 'refunded': return 'Р В РІР‚в„ўР В РЎвЂўР В Р’В·Р В Р вЂ Р РЋР вЂљР В Р’В°Р РЋРІР‚С™';
      default: return status;
    }
  };

  const renderItemsTab = () => (
    <div className="space-y-6">
      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљР В РЎвЂўР В Р вЂ ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂќР В Р’В°Р РЋРІР‚С™Р В Р’ВµР В РЎвЂ“Р В РЎвЂўР РЋР вЂљР В РЎвЂР В РЎвЂ</option>
          {CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>
              {category.icon} {category.label}
            </option>
          ))}
        </select>

        <select
          value={filterRarity}
          onChange={(e) => setFilterRarity(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР вЂљР В Р’ВµР В РўвЂР В РЎвЂќР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂ</option>
          {RARITY_LEVELS.map(rarity => (
            <option key={rarity.value} value={rarity.value}>
              {rarity.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљ
        </button>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљР В РЎвЂўР В Р вЂ  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
              opacity: item.isActive ? 1 : 0.6
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{item.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getRarityColor(item.rarity)} text-white`}>
                  {RARITY_LEVELS.find(r => r.value === item.rarity)?.label}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 rounded hover:bg-opacity-10" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 rounded hover:bg-opacity-10 text-red-500" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,59,48,0.1)' : 'rgba(255,59,48,0.1)' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
              {item.name}
            </h3>
            <p className="text-sm opacity-70 mb-3" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
              {item.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {item.price}
                </span>
                <span className="flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  {item.salesCount}
                </span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                {item.popularity}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCasesTab = () => (
    <div className="space-y-6">
      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р В РЎвЂўР В Р вЂ ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          />
        </div>

        <select
          value={filterRarity}
          onChange={(e) => setFilterRarity(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР вЂљР В Р’ВµР В РўвЂР В РЎвЂќР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂ</option>
          {RARITY_LEVELS.map(rarity => (
            <option key={rarity.value} value={rarity.value}>
              {rarity.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“
        </button>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р В РЎвЂўР В Р вЂ  */}
      <div className="space-y-4">
        {filteredCases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
              opacity: caseItem.isActive ? 1 : 0.6
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: CASE_TYPES.find(t => t.value === caseItem.caseType)?.color + '20' }}
                >
                  {caseItem.icon}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      {caseItem.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRarityColor(caseItem.rarity)} text-white`}>
                      {RARITY_LEVELS.find(r => r.value === caseItem.rarity)?.label}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500 bg-opacity-20 text-blue-500">
                      {CASE_TYPES.find(t => t.value === caseItem.caseType)?.label}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {caseItem.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                    <span>РЎР‚РЎСџРІР‚в„ўР’В° {caseItem.price} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
                    <span>РЎР‚РЎСџР вЂ№Р С“ {caseItem.prizes.length} Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В Р’В·Р В РЎвЂўР В Р вЂ </span>
                    <span>РЎР‚РЎСџРІР‚СљР вЂ° {caseItem.salesCount} Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В¶</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-opacity-10" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-opacity-10" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-opacity-10 text-red-500" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,59,48,0.1)' : 'rgba(255,59,48,0.1)' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р В Р’В·Р В Р’В°Р В РЎвЂќР В Р’В°Р В Р’В·Р В РЎвЂўР В Р вЂ ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“Р РЋРІР‚в„–</option>
          <option value="pending">Р В РЎвЂєР В Р’В¶Р В РЎвЂР В РўвЂР В Р’В°Р В Р’ВµР РЋРІР‚С™</option>
          <option value="completed">Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦</option>
          <option value="cancelled">Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’ВµР В Р вЂ¦</option>
          <option value="refunded">Р В РІР‚в„ўР В РЎвЂўР В Р’В·Р В Р вЂ Р РЋР вЂљР В Р’В°Р РЋРІР‚С™</option>
        </select>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В Р’В·Р В Р’В°Р В РЎвЂќР В Р’В°Р В Р’В·Р В РЎвЂўР В Р вЂ  */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-blue-500 bg-opacity-20">
                  <ShoppingCart className="w-6 h-6 text-blue-500" />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Р В РІР‚вЂќР В Р’В°Р В РЎвЂќР В Р’В°Р В Р’В· #{order.id}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)} text-white`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {order.userName}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                    <span>РЎР‚РЎСџРІР‚в„ўР’В° {order.totalAmount} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
                    <span>РЎР‚РЎСџРІР‚СљР’В¦ {order.items.length} Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљ(Р В РЎвЂўР В Р вЂ )</span>
                    <span>РЎР‚РЎСџРІР‚СљРІР‚В¦ {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {order.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 rounded-lg text-xs bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30">
                      Р В РЎвЂєР В РўвЂР В РЎвЂўР В Р’В±Р РЋР вЂљР В РЎвЂР РЋРІР‚С™Р РЋР Р‰
                    </button>
                    <button className="px-3 py-1 rounded-lg text-xs bg-red-500 bg-opacity-20 text-red-500 hover:bg-opacity-30">
                      Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР В Р’В»Р В РЎвЂўР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰
                    </button>
                  </>
                )}
                <button className="p-2 rounded-lg hover:bg-opacity-10" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎВР В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦Р В РЎвЂўР В РЎВ
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљР В Р’В°Р В РЎВР В РЎвЂ Р В РЎвЂ Р В РЎвЂќР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р В Р’В°Р В РЎВР В РЎвЂ
          </p>
        </div>
      </div>

      {/* Р В РЎС›Р В Р’В°Р В Р’В±Р РЋРІР‚в„– */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'items', label: 'Р В РЎС›Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР вЂљР РЋРІР‚в„–', icon: Package },
          { id: 'cases', label: 'Р В РЎв„ўР В Р’ВµР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚в„–', icon: Box },
          { id: 'orders', label: 'Р В РІР‚вЂќР В Р’В°Р В РЎвЂќР В Р’В°Р В Р’В·Р РЋРІР‚в„–', icon: ShoppingCart }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
            style={{
              color: activeTab === tab.id ? '#3B82F6' : theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™ */}
      {activeTab === 'items' && renderItemsTab()}
      {activeTab === 'cases' && renderCasesTab()}
      {activeTab === 'orders' && renderOrdersTab()}
    </div>
  );
};
