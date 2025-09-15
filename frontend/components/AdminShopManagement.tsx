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

// РСЃРїРѕР»СЊР·СѓРµРј ShopItemData РёР· Р±Р°Р·С‹ РґР°РЅРЅС‹С…

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
  { value: 'cases', label: 'РљРµР№СЃС‹ Рё РЅР°Р±РѕСЂС‹', icon: 'рџЋЃ' },
  { value: 'boosters', label: 'Р‘СѓСЃС‚РµСЂС‹ Рё СѓСЃРёР»РёС‚РµР»Рё', icon: 'вљЎ' },
  { value: 'cosmetics', label: 'РљРѕСЃРјРµС‚РёС‡РµСЃРєРёРµ РїСЂРµРґРјРµС‚С‹', icon: 'рџЋЁ' },
  { value: 'exclusive', label: 'Р­РєСЃРєР»СЋР·РёРІРЅС‹Рµ РЅР°РіСЂР°РґС‹', icon: 'рџЏ†' }
];

const RARITY_LEVELS = [
  { value: 'common', label: 'РћР±С‹С‡РЅС‹Р№', color: 'bg-gray-500' },
  { value: 'rare', label: 'Р РµРґРєРёР№', color: 'bg-blue-500' },
  { value: 'epic', label: 'Р­РїРёС‡РµСЃРєРёР№', color: 'bg-purple-500' },
  { value: 'legendary', label: 'Р›РµРіРµРЅРґР°СЂРЅС‹Р№', color: 'bg-orange-500' }
];

const CASE_TYPES = [
  { value: 'bronze', label: 'Р‘СЂРѕРЅР·РѕРІС‹Р№', color: '#CD7F32', priceRange: '100-300' },
  { value: 'silver', label: 'РЎРµСЂРµР±СЂСЏРЅС‹Р№', color: '#C0C0C0', priceRange: '300-600' },
  { value: 'gold', label: 'Р—РѕР»РѕС‚РѕР№', color: '#FFD700', priceRange: '600-1200' },
  { value: 'platinum', label: 'РџР»Р°С‚РёРЅРѕРІС‹Р№', color: '#E5E4E2', priceRange: '1200+' }
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

  // Р—Р°РіСЂСѓР·РєР° РґР°РЅРЅС‹С…
  useEffect(() => {
    loadData();
  }, []);

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ
  useEffect(() => {
    filterData();
  }, [items, cases, orders, searchQuery, filterCategory, filterRarity, filterStatus]);

  const loadData = async () => {
    // Mock РґР°РЅРЅС‹Рµ
    const mockItems: ShopItem[] = [
      {
        id: '1',
        name: 'РљРµР№СЃ "РЈРґР°С‡Р°"',
        description: 'РЎРѕРґРµСЂР¶РёС‚ СЃР»СѓС‡Р°Р№РЅС‹Рµ РЅР°РіСЂР°РґС‹',
        category: 'cases',
        price: 100,
        image: '/api/placeholder/100/100',
        icon: 'рџЋЃ',
        rarity: 'common',
        isActive: true,
        salesCount: 1247,
        popularity: 85,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Р‘СѓСЃС‚РµСЂ РѕРїС‹С‚Р°',
        description: 'РЈРІРµР»РёС‡РёРІР°РµС‚ РїРѕР»СѓС‡РµРЅРёРµ РѕРїС‹С‚Р° РЅР° 50%',
        category: 'boosters',
        price: 50,
        image: '/api/placeholder/100/100',
        icon: 'вљЎ',
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
        description: 'РћР±С‹С‡РЅС‹Р№ РєРµР№СЃ СЃ Р±Р°Р·РѕРІС‹РјРё РїСЂРµРґРјРµС‚Р°РјРё',
        category: 'cases',
        price: 100,
        image: '/api/placeholder/100/100',
        icon: 'рџЋЃ',
        rarity: 'common',
        isActive: true,
        salesCount: 1247,
        popularity: 85,
        createdAt: '2024-01-01T00:00:00Z',
        caseType: 'bronze',
        prizes: [
          {
            id: '1',
            name: '50 РјРѕРЅРµС‚',
            description: 'РќРµР±РѕР»СЊС€РѕРµ РєРѕР»РёС‡РµСЃС‚РІРѕ РјРѕРЅРµС‚',
            probability: 40,
            value: 50,
            rarity: 'common',
            icon: 'рџ’°',
            isGuaranteed: false
          },
          {
            id: '2',
            name: '100 РѕРїС‹С‚Р°',
            description: 'РќРµРјРЅРѕРіРѕ РѕРїС‹С‚Р° РґР»СЏ РїСЂРѕРіСЂРµСЃСЃР°',
            probability: 30,
            value: 100,
            rarity: 'common',
            icon: 'в­ђ',
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
        userName: 'РђР»РµРєСЃРµР№ РРІР°РЅРѕРІ',
        items: [
          { id: '1', name: 'РљРµР№СЃ "РЈРґР°С‡Р°"', quantity: 2, price: 100 }
        ],
        totalAmount: 200,
        status: 'completed',
        createdAt: '2024-01-20T10:30:00Z',
        completedAt: '2024-01-20T10:31:00Z'
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'РњР°СЂРёСЏ РџРµС‚СЂРѕРІР°',
        items: [
          { id: '2', name: 'Р‘СѓСЃС‚РµСЂ РѕРїС‹С‚Р°', quantity: 1, price: 50 }
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
      case 'completed': return 'Р’С‹РїРѕР»РЅРµРЅ';
      case 'pending': return 'РћР¶РёРґР°РµС‚';
      case 'cancelled': return 'РћС‚РјРµРЅРµРЅ';
      case 'refunded': return 'Р’РѕР·РІСЂР°С‚';
      default: return status;
    }
  };

  const renderItemsTab = () => (
    <div className="space-y-6">
      {/* Р¤РёР»СЊС‚СЂС‹ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="РџРѕРёСЃРє С‚РѕРІР°СЂРѕРІ..."
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
          <option value="all">Р’СЃРµ РєР°С‚РµРіРѕСЂРёРё</option>
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
          <option value="all">Р’СЃРµ СЂРµРґРєРѕСЃС‚Рё</option>
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
          Р”РѕР±Р°РІРёС‚СЊ С‚РѕРІР°СЂ
        </button>
      </div>

      {/* РЎРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ */}
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
      {/* Р¤РёР»СЊС‚СЂС‹ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="РџРѕРёСЃРє РєРµР№СЃРѕРІ..."
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
          <option value="all">Р’СЃРµ СЂРµРґРєРѕСЃС‚Рё</option>
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
          РЎРѕР·РґР°С‚СЊ РєРµР№СЃ
        </button>
      </div>

      {/* РЎРїРёСЃРѕРє РєРµР№СЃРѕРІ */}
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
                    <span>рџ’° {caseItem.price} РјРѕРЅРµС‚</span>
                    <span>рџЋЃ {caseItem.prizes.length} РїСЂРёР·РѕРІ</span>
                    <span>рџ“Љ {caseItem.salesCount} РїСЂРѕРґР°Р¶</span>
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
      {/* Р¤РёР»СЊС‚СЂС‹ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="РџРѕРёСЃРє Р·Р°РєР°Р·РѕРІ..."
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
          <option value="all">Р’СЃРµ СЃС‚Р°С‚СѓСЃС‹</option>
          <option value="pending">РћР¶РёРґР°РµС‚</option>
          <option value="completed">Р’С‹РїРѕР»РЅРµРЅ</option>
          <option value="cancelled">РћС‚РјРµРЅРµРЅ</option>
          <option value="refunded">Р’РѕР·РІСЂР°С‚</option>
        </select>
      </div>

      {/* РЎРїРёСЃРѕРє Р·Р°РєР°Р·РѕРІ */}
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
                      Р—Р°РєР°Р· #{order.id}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)} text-white`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {order.userName}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                    <span>рџ’° {order.totalAmount} РјРѕРЅРµС‚</span>
                    <span>рџ“¦ {order.items.length} С‚РѕРІР°СЂ(РѕРІ)</span>
                    <span>рџ“… {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {order.status === 'pending' && (
                  <>
                    <button className="px-3 py-1 rounded-lg text-xs bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30">
                      РћРґРѕР±СЂРёС‚СЊ
                    </button>
                    <button className="px-3 py-1 rounded-lg text-xs bg-red-500 bg-opacity-20 text-red-500 hover:bg-opacity-30">
                      РћС‚РєР»РѕРЅРёС‚СЊ
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
      {/* Р—Р°РіРѕР»РѕРІРѕРє */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РЈРїСЂР°РІР»РµРЅРёРµ РјР°РіР°Р·РёРЅРѕРј
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            РЈРїСЂР°РІР»РµРЅРёРµ С‚РѕРІР°СЂР°РјРё Рё РєРµР№СЃР°РјРё
          </p>
        </div>
      </div>

      {/* РўР°Р±С‹ */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'items', label: 'РўРѕРІР°СЂС‹', icon: Package },
          { id: 'cases', label: 'РљРµР№СЃС‹', icon: Box },
          { id: 'orders', label: 'Р—Р°РєР°Р·С‹', icon: ShoppingCart }
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

      {/* РљРѕРЅС‚РµРЅС‚ */}
      {activeTab === 'items' && renderItemsTab()}
      {activeTab === 'cases' && renderCasesTab()}
      {activeTab === 'orders' && renderOrdersTab()}
    </div>
  );
};
