import { useState } from 'react';
import { ShoppingCart, Package, Gamepad2, Gift, Star, Clock, Users, Play, DollarSign, CircleDot, Scissors, Plus, Minus, X, CheckCircle } from './Icons';
import { BottomNavigation } from './BottomNavigation';
import { ShopItem, Order } from '../types/shop';

interface ShopPageNewStyledProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  profilePhoto?: string | null;
  shopItems: ShopItem[];
  setShopItems: (items: ShopItem[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

// РњРѕРєРё РґР°РЅРЅС‹С… РґР»СЏ РёРіСЂ Рё РєРµР№СЃРѕРІ
const gamesData = [
  {
    id: '1',
    name: 'РљРѕР»РµСЃРѕ СѓРґР°С‡Рё',
    description: 'РљСЂСѓС‚РёС‚Рµ РєРѕР»РµСЃРѕ Рё РїРѕР»СѓС‡Р°Р№С‚Рµ СЃР»СѓС‡Р°Р№РЅС‹Рµ РЅР°РіСЂР°РґС‹ РєР°Р¶РґС‹Рµ 5 РјРёРЅСѓС‚',
    type: 'wheel',
    icon: 'рџЋ°',
    cooldown: '5Рј',
    stats: { plays: 1254, rewards: 45680, players: 387 },
    status: 'available'
  },
  {
    id: '2',
    name: 'Р‘РёС‚РІР° РІС‹Р±РѕСЂР°',
    description: 'РљР»Р°СЃСЃРёС‡РµСЃРєР°СЏ РёРіСЂР° РєР°РјРµРЅСЊ-РЅРѕР¶РЅРёС†С‹-Р±СѓРјР°РіР° РїСЂРѕС‚РёРІ СѓРјРЅРѕРіРѕ Р±РѕС‚Р°',
    type: 'rps',
    icon: 'вњ‚пёЏ',
    cooldown: '3Рј',
    stats: { plays: 892, rewards: 15430, players: 234 },
    status: 'available'
  },
  {
    id: '3',
    name: 'Р—РѕР»РѕС‚С‹Рµ СЃР»РѕС‚С‹',
    description: 'РђРІС‚РѕРјР°С‚ СЃ С‚СЂРµРјСЏ Р±Р°СЂР°Р±Р°РЅР°РјРё Рё С€Р°РЅСЃРѕРј РЅР° РґР¶РµРєРїРѕС‚',
    type: 'slots',
    icon: 'рџЋ°',
    cooldown: '10Рј',
    stats: { plays: 1567, rewards: 78900, players: 456 },
    status: 'available'
  }
];

const casesData = [
  {
    id: '1',
    name: 'РЎС‚Р°СЂС‚РѕРІС‹Р№ РєРµР№СЃ',
    description: 'Р‘Р°Р·РѕРІС‹Рµ РЅР°РіСЂР°РґС‹ РґР»СЏ РЅРѕРІРёС‡РєРѕРІ',
    price: 100,
    currency: 'coins',
    rarity: 'common',
    icon: 'рџ“¦',
    rewards: ['10-50 РјРѕРЅРµС‚', '5-20 XP', 'Р‘Р°Р·РѕРІС‹Рµ РїСЂРµРґРјРµС‚С‹'],
    dropRate: '100%'
  },
  {
    id: '2',
    name: 'Р—РѕР»РѕС‚РѕР№ РєРµР№СЃ',
    description: 'Р¦РµРЅРЅС‹Рµ РЅР°РіСЂР°РґС‹ Рё СЂРµРґРєРёРµ РїСЂРµРґРјРµС‚С‹',
    price: 500,
    currency: 'coins',
    rarity: 'rare',
    icon: 'рџЏ†',
    rewards: ['100-500 РјРѕРЅРµС‚', '50-200 XP', 'Р РµРґРєРёРµ РїСЂРµРґРјРµС‚С‹', 'РџСЂРµРјРёСѓРј Р±РѕРЅСѓСЃС‹'],
    dropRate: '25%'
  },
  {
    id: '3',
    name: 'Р›РµРіРµРЅРґР°СЂРЅС‹Р№ РєРµР№СЃ',
    description: 'Р­РєСЃРєР»СЋР·РёРІРЅС‹Рµ РЅР°РіСЂР°РґС‹ РІС‹СЃС€РµРіРѕ СѓСЂРѕРІРЅСЏ',
    price: 1500,
    currency: 'coins',
    rarity: 'legendary',
    icon: 'рџ’Ћ',
    rewards: ['500-2000 РјРѕРЅРµС‚', '200-1000 XP', 'Р›РµРіРµРЅРґР°СЂРЅС‹Рµ РїСЂРµРґРјРµС‚С‹', 'VIP СЃС‚Р°С‚СѓСЃ'],
    dropRate: '5%'
  },
  {
    id: '4',
    name: 'РџСЂР°Р·РґРЅРёС‡РЅС‹Р№ РєРµР№СЃ',
    description: 'РћРіСЂР°РЅРёС‡РµРЅРЅР°СЏ СЃРµСЂРёСЏ СЃ СЌРєСЃРєР»СЋР·РёРІРЅС‹РјРё РЅР°РіСЂР°РґР°РјРё',
    price: 300,
    currency: 'coins',
    rarity: 'epic',
    icon: 'рџЋЃ',
    rewards: ['150-800 РјРѕРЅРµС‚', '30-150 XP', 'РџСЂР°Р·РґРЅРёС‡РЅС‹Рµ РїСЂРµРґРјРµС‚С‹', 'Р’СЂРµРјРµРЅРЅС‹Рµ Р±РѕРЅСѓСЃС‹'],
    dropRate: '15%',
    limited: true
  }
];

// РўРёРї РґР»СЏ С‚РѕРІР°СЂР° РІ РєРѕСЂР·РёРЅРµ
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export function ShopPageNewStyled({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto,
  shopItems,
  setShopItems,
  orders,
  setOrders 
}: ShopPageNewStyledProps) {
  const [activeTab, setActiveTab] = useState<'items' | 'games' | 'cases'>('items');
  const [userBalance] = useState(13500); // РР· РёР·РѕР±СЂР°Р¶РµРЅРёСЏ
  const [userCooldowns, setUserCooldowns] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTab, setCartTab] = useState<'cart' | 'active' | 'completed'>('cart');

  const tabs = [
    { id: 'items' as const, label: 'РўРѕРІР°СЂС‹' },
    { id: 'games' as const, label: 'РњРёРЅРё-РёРіСЂС‹' },
    { id: 'cases' as const, label: 'РљРµР№СЃС‹' }
  ];

  const gameTypeIcons = {
    wheel: CircleDot,
    rps: Scissors,
    slots: DollarSign
  };

  const rarityColors = {
    common: 'text-gray-600 bg-gray-100',
    rare: 'text-blue-600 bg-blue-100',
    epic: 'text-purple-600 bg-purple-100',
    legendary: 'text-yellow-600 bg-yellow-100'
  };

  const formatStats = (num: number) => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}k`;
    return `${(num / 1000000).toFixed(1)}M`;
  };

  const canPlayGame = (gameId: string) => {
    const cooldownEndTime = userCooldowns[gameId];
    if (!cooldownEndTime) return true;
    return Date.now() > cooldownEndTime;
  };

  const getRemainingCooldown = (gameId: string) => {
    const cooldownEndTime = userCooldowns[gameId];
    if (!cooldownEndTime) return 0;
    return Math.max(0, Math.ceil((cooldownEndTime - Date.now()) / 1000));
  };

  const formatCooldown = (seconds: number) => {
    if (seconds < 60) return `${seconds}СЃ`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}Рј`;
    return `${Math.floor(seconds / 3600)}С‡`;
  };

  const playGame = (game: any) => {
    const cooldownInSeconds = game.cooldown === '5Рј' ? 300 : game.cooldown === '3Рј' ? 180 : 600;
    const cooldownEndTime = Date.now() + (cooldownInSeconds * 1000);
    setUserCooldowns(prev => ({
      ...prev,
      [game.id]: cooldownEndTime
    }));
    
    console.log(`Р—Р°РїСѓСЃРє РёРіСЂС‹: ${game.name}`);
  };

  const openCase = (caseItem: any) => {
    if (userBalance >= caseItem.price) {
      console.log(`РћС‚РєСЂС‹С‚РёРµ РєРµР№СЃР°: ${caseItem.name}`);
    }
  };

  // Р¤СѓРЅРєС†РёРё РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ РєРѕСЂР·РёРЅРѕР№
  const addToCart = (item: ShopItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        emoji: item.emoji
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  const checkout = () => {
    const totalPrice = getTotalCartPrice();
    if (userBalance >= totalPrice && cart.length > 0) {
      const newOrder: Order = {
        id: Date.now().toString(),
        items: cart.map(cartItem => ({
          id: cartItem.id,
          name: cartItem.name,
          price: cartItem.price,
          quantity: cartItem.quantity,
          emoji: cartItem.emoji
        })),
        total: totalPrice,
        status: 'active',
        createdAt: new Date().toISOString(),
        userId: 'current-user'
      };
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
      clearCart();
      setCartTab('active');
      
      console.log('Р—Р°РєР°Р· РѕС„РѕСЂРјР»РµРЅ:', newOrder);
    }
  };

  const renderItemsTab = () => (
    <div className="space-y-3">
      {shopItems.length > 0 ? (
        shopItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-4 apple-shadow">
            <div className="flex items-center gap-3">
              {/* РРєРѕРЅРєР° С‚РѕРІР°СЂР° */}
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{item.emoji}</span>
              </div>
              
              {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ С‚РѕРІР°СЂРµ */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 truncate">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.price}g</p>
              </div>
              
              {/* РљРЅРѕРїРєР° РљСѓРїРёС‚СЊ */}
              <button 
                onClick={() => addToCart(item)}
                className={`px-3 py-2 rounded-xl border transition-all text-sm font-medium whitespace-nowrap ${
                  item.stock === 0 
                    ? 'bg-white border-gray-300 text-gray-400 cursor-not-allowed' 
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                }`}
                disabled={item.stock === 0}
              >
                {item.stock === 0 ? 'РќРµС‚ РІ РЅР°Р»РёС‡РёРё' : 'РљСѓРїРёС‚СЊ'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center apple-shadow">
          <p className="text-gray-500 text-sm">РџСѓСЃС‚Рѕ</p>
        </div>
      )}
    </div>
  );

  const renderGamesTab = () => (
    <div className="space-y-3">
      {gamesData.map((game) => {
        const canPlay = canPlayGame(game.id);
        const remainingCooldown = getRemainingCooldown(game.id);
        
        return (
          <div key={game.id} className="bg-white rounded-2xl p-4 apple-shadow">
            <div className="flex items-center gap-3">
              {/* РРєРѕРЅРєР° РёРіСЂС‹ */}
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg">{game.icon}</span>
              </div>
              
              {/* РРЅС„РѕСЂРјР°С†РёСЏ РѕР± РёРіСЂРµ */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 truncate">{game.name}</h3>
                <p className="text-xs text-gray-500">Р‘РµСЃРїР»Р°С‚РЅРѕ</p>
              </div>
              
              {/* РљРЅРѕРїРєР° РРіСЂР°С‚СЊ */}
              <button
                onClick={() => playGame(game)}
                disabled={!canPlay}
                className={`px-3 py-2 rounded-xl border transition-all text-sm font-medium whitespace-nowrap ${
                  canPlay
                    ? 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                    : 'bg-white border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                {canPlay ? 'РРіСЂР°С‚СЊ' : `${formatCooldown(remainingCooldown)}`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCasesTab = () => (
    <div className="space-y-3">
      {casesData.map((caseItem) => (
        <div key={caseItem.id} className="bg-white rounded-2xl p-4 apple-shadow">
          <div className="flex items-center gap-3">
            {/* РРєРѕРЅРєР° РєРµР№СЃР° */}
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 relative">
              <span className="text-lg">{caseItem.icon}</span>
              {caseItem.limited && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  !
                </div>
              )}
            </div>
            
            {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ РєРµР№СЃРµ */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 truncate">{caseItem.name}</h3>
              <p className="text-xs text-gray-500">{caseItem.price}g</p>
            </div>
            
            {/* РљРЅРѕРїРєР° РљСѓРїРёС‚СЊ */}
            <button 
              onClick={() => openCase(caseItem)}
              className={`px-3 py-2 rounded-xl border transition-all text-sm font-medium whitespace-nowrap ${
                userBalance < caseItem.price
                  ? 'bg-white border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100'
              }`}
              disabled={userBalance < caseItem.price}
            >
              {userBalance < caseItem.price ? 'РќРµС‚ СЃСЂРµРґСЃС‚РІ' : 'РљСѓРїРёС‚СЊ'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* РЁР°РїРєР° */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Р‘Р°Р»Р°РЅСЃ СЃР»РµРІР° */}
            <div className="bg-gray-100 rounded-2xl px-3 py-2">
              <div className="text-xs text-gray-600">Р‘Р°Р»Р°РЅСЃ</div>
              <div className="text-sm font-medium text-gray-900">{userBalance}g</div>
            </div>
            
            {/* Р—Р°РіРѕР»РѕРІРѕРє РїРѕ С†РµРЅС‚СЂСѓ */}
            <h1 className="text-lg font-medium text-gray-900">РўРѕРІР°СЂС‹</h1>
            
            {/* РРєРѕРЅРєРё СЃРїСЂР°РІР° */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {getTotalCartItems() > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {getTotalCartItems()}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto pt-20 px-4 pb-24 space-y-6">
        {/* РџРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ СЂР°Р·РґРµР»РѕРІ */}
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-9 px-4 rounded-full transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* РљРѕРЅС‚РµРЅС‚ С‚Р°Р±РѕРІ */}
        {activeTab === 'items' && renderItemsTab()}
        {activeTab === 'games' && renderGamesTab()}
        {activeTab === 'cases' && renderCasesTab()}
      </div>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РєРѕСЂР·РёРЅС‹ */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-t-2xl max-h-[75vh] flex flex-col">
            {/* Р—Р°РіРѕР»РѕРІРѕРє РєРѕСЂР·РёРЅС‹ */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 shrink-0">
              <h2 className="text-xl font-medium text-gray-900">РљРѕСЂР·РёРЅР°</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* РўР°Р±С‹ РєРѕСЂР·РёРЅС‹ */}
            <div className="flex gap-2 p-6 py-4 shrink-0">
              <button
                onClick={() => setCartTab('cart')}
                className={`h-9 px-4 rounded-full transition-all text-sm font-medium ${
                  cartTab === 'cart' 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                }`}
              >
                РљРѕСЂР·РёРЅР°
              </button>
              <button
                onClick={() => setCartTab('active')}
                className={`h-9 px-4 rounded-full transition-all text-sm font-medium ${
                  cartTab === 'active' 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                }`}
              >
                РђРєС‚РёРІРЅС‹Рµ
              </button>
              <button
                onClick={() => setCartTab('completed')}
                className={`h-9 px-4 rounded-full transition-all text-sm font-medium ${
                  cartTab === 'completed' 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ
              </button>
            </div>

            {/* РЎРѕРґРµСЂР¶РёРјРѕРµ РєРѕСЂР·РёРЅС‹ */}
            <div className="flex-1 overflow-y-auto px-6 min-h-0">
              {cartTab === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">РџСѓСЃС‚Рѕ</p>
                    </div>
                  ) : (
                    <div className="space-y-3 pb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                            <span className="text-lg">{item.emoji}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.price}g Р·Р° С€С‚.</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* РђРєС‚РёРІРЅС‹Рµ Р·Р°РєР°Р·С‹ */}
              {cartTab === 'active' && (
                <div className="space-y-3 pb-4">
                  {orders.filter(order => order.status === 'active').length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">РџСѓСЃС‚Рѕ</p>
                    </div>
                  ) : (
                    orders.filter(order => order.status === 'active').map((order) => (
                      <div key={order.id} className="bg-white p-3 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Р—Р°РєР°Р· #{order.id}</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            Р’ РѕР±СЂР°Р±РѕС‚РєРµ
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span>{item.name} x{item.quantity}</span>
                              <span>{item.price * item.quantity}g</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between font-medium text-sm">
                            <span>РС‚РѕРіРѕ:</span>
                            <span>{order.total}g</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ Р·Р°РєР°Р·С‹ */}
              {cartTab === 'completed' && (
                <div className="space-y-3 pb-4">
                  {orders.filter(order => order.status === 'completed').length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">РџСѓСЃС‚Рѕ</p>
                    </div>
                  ) : (
                    orders.filter(order => order.status === 'completed').map((order) => (
                      <div key={order.id} className="bg-white p-3 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">Р—Р°РєР°Р· #{order.id}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Р—Р°РІРµСЂС€РµРЅ
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span>{item.name} x{item.quantity}</span>
                              <span>{item.price * item.quantity}g</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between font-medium text-sm">
                            <span>РС‚РѕРіРѕ:</span>
                            <span>{order.total}g</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ РєРѕСЂР·РёРЅС‹ */}
            {cartTab === 'cart' && cart.length > 0 && (
              <div className="p-6 pt-4 border-t border-gray-200 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">РС‚РѕРіРѕ:</span>
                  <span className="font-medium">{getTotalCartPrice()}g</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-900 hover:bg-gray-50"
                  >
                    РћС‡РёСЃС‚РёС‚СЊ
                  </button>
                  <button
                    onClick={checkout}
                    className="flex-1 py-3 rounded-xl bg-black text-white hover:bg-gray-800"
                    disabled={userBalance < getTotalCartPrice()}
                  >
                    Р—Р°РєР°Р·Р°С‚СЊ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} />
    </div>
  );
}
