import { useState } from 'react';
import { ShoppingCart, Package, Gamepad2, Gift, Star, Clock, Users, Play, DollarSign, CircleDot, Scissors, Plus, Minus, X, CheckCircle } from './Icons';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ShopItem, Order } from '../types/shop';

interface ShopPageWithTabsProps {
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

export function ShopPageWithTabs({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto,
  shopItems,
  setShopItems,
  orders,
  setOrders 
}: ShopPageWithTabsProps) {
  const [activeTab, setActiveTab] = useState<'items' | 'games' | 'cases'>('items');
  const [userBalance] = useState(1500); // РњРѕРє Р±Р°Р»Р°РЅСЃР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  const [userCooldowns, setUserCooldowns] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTab, setCartTab] = useState<'cart' | 'active' | 'completed'>('cart');

  const tabs = [
    { id: 'items' as const, label: 'РўРѕРІР°СЂС‹', icon: Package },
    { id: 'games' as const, label: 'РРіСЂС‹', icon: Gamepad2 },
    { id: 'cases' as const, label: 'РљРµР№СЃС‹', icon: Gift }
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
    // РЎРёРјСѓР»СЏС†РёСЏ РєСѓР»РґР°СѓРЅР° (РїСЂРµРѕР±СЂР°Р·СѓРµРј С‚РµРєСЃС‚РѕРІС‹Р№ РєСѓР»РґР°СѓРЅ РІ СЃРµРєСѓРЅРґС‹)
    const cooldownInSeconds = game.cooldown === '5Рј' ? 300 : game.cooldown === '3Рј' ? 180 : 600;
    const cooldownEndTime = Date.now() + (cooldownInSeconds * 1000);
    setUserCooldowns(prev => ({
      ...prev,
      [game.id]: cooldownEndTime
    }));
    
    // Р—РґРµСЃСЊ Р±СѓРґРµС‚ Р»РѕРіРёРєР° Р·Р°РїСѓСЃРєР° РёРіСЂС‹
    console.log(`Р—Р°РїСѓСЃРє РёРіСЂС‹: ${game.name}`);
  };

  const openCase = (caseItem: any) => {
    if (userBalance >= caseItem.price) {
      // Р—РґРµСЃСЊ Р±СѓРґРµС‚ Р»РѕРіРёРєР° РѕС‚РєСЂС‹С‚РёСЏ РєРµР№СЃР°
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
      // РЎРѕР·РґР°РµРј РЅРѕРІС‹Р№ Р·Р°РєР°Р·
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
        userId: 'current-user' // Р’ СЂРµР°Р»СЊРЅРѕРј РїСЂРёР»РѕР¶РµРЅРёРё Р±СѓРґРµС‚ ID С‚РµРєСѓС‰РµРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
      };
      
      // Р”РѕР±Р°РІР»СЏРµРј Р·Р°РєР°Р· РІ СЃРїРёСЃРѕРє Р·Р°РєР°Р·РѕРІ
      setOrders(prevOrders => [...prevOrders, newOrder]);
      
      // РћС‡РёС‰Р°РµРј РєРѕСЂР·РёРЅСѓ Рё РїРµСЂРµРєР»СЋС‡Р°РµРјСЃСЏ РЅР° С‚Р°Р± Р°РєС‚РёРІРЅС‹С… Р·Р°РєР°Р·РѕРІ
      clearCart();
      setCartTab('active');
      
      console.log('Р—Р°РєР°Р· РѕС„РѕСЂРјР»РµРЅ:', newOrder);
    }
  };

  const renderItemsTab = () => (
    <div className="space-y-4">
      {shopItems.length > 0 ? (
        shopItems.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl p-4 apple-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{item.price} G-coin</div>
                    <div className="text-xs text-muted-foreground">Р’ РЅР°Р»РёС‡РёРё: {item.stock}</div>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-primary text-primary-foreground py-2 rounded-xl hover:scale-[0.98] transition-transform disabled:bg-secondary disabled:text-muted-foreground"
                  disabled={item.stock === 0}
                >
                  {item.stock === 0 ? 'РќРµС‚ РІ РЅР°Р»РёС‡РёРё' : 'Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ'}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center apple-shadow">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">РўРѕРІР°СЂС‹ СЃРєРѕСЂРѕ РїРѕСЏРІСЏС‚СЃСЏ</h3>
          <p className="text-sm text-muted-foreground">
            РђРґРјРёРЅРёСЃС‚СЂР°С‚пїЅпїЅСЂС‹ СЂР°Р±РѕС‚Р°СЋС‚ РЅР°Рґ РїРѕРїРѕР»РЅРµРЅРёРµРј Р°СЃСЃРѕСЂС‚РёРјРµРЅС‚Р°
          </p>
        </div>
      )}
    </div>
  );

  const renderGamesTab = () => (
    <div className="space-y-4">
      {gamesData.map((game) => {
        const GameIcon = gameTypeIcons[game.type as keyof typeof gameTypeIcons] || Gamepad2;
        const canPlay = canPlayGame(game.id);
        const remainingCooldown = getRemainingCooldown(game.id);
        
        return (
          <div key={game.id} className="glass-card rounded-2xl p-4 apple-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                <span className="text-2xl">{game.icon}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-foreground">{game.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {game.description}
                    </div>
                  </div>
                  {!canPlay && (
                    <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                      <Clock className="w-3 h-3" />
                      {formatCooldown(remainingCooldown)}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                  <div className="text-center">
                    <div className="text-foreground font-medium">{formatStats(game.stats.plays)}</div>
                    <div className="text-muted-foreground">РРіСЂ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground font-medium">{formatStats(game.stats.rewards)}</div>
                    <div className="text-muted-foreground">РќР°РіСЂР°Рґ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground font-medium">{formatStats(game.stats.players)}</div>
                    <div className="text-muted-foreground">РРіСЂРѕРєРѕРІ</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    РљСѓР»РґР°СѓРЅ: {game.cooldown}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    РџСѓР±Р»РёС‡РЅР°СЏ РёРіСЂР°
                  </div>
                </div>
                
                <button
                  onClick={() => playGame(game)}
                  disabled={!canPlay}
                  className={`w-full py-3 rounded-xl transition-transform ${
                    canPlay
                      ? 'bg-primary text-primary-foreground hover:scale-[0.98]'
                      : 'bg-secondary text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    {canPlay ? 'РРіСЂР°С‚СЊ' : `Р–РґРёС‚Рµ ${formatCooldown(remainingCooldown)}`}
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderCasesTab = () => (
    <div className="space-y-4">
      {casesData.map((caseItem) => (
        <div key={caseItem.id} className="glass-card rounded-2xl p-4 apple-shadow">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center relative">
              <span className="text-3xl">{caseItem.icon}</span>
              {caseItem.limited && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Limited
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{caseItem.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${rarityColors[caseItem.rarity as keyof typeof rarityColors]}`}>
                      {caseItem.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{caseItem.description}</p>
                  <div className="text-xs text-muted-foreground">
                    РЁР°РЅСЃ СЂРµРґРєРѕР№ РЅР°РіСЂР°РґС‹: {caseItem.dropRate}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{caseItem.price} G-coin</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs font-medium text-foreground mb-2">Р’РѕР·РјРѕР¶РЅС‹Рµ РЅР°РіСЂР°РґС‹:</div>
                <div className="flex flex-wrap gap-1">
                  {caseItem.rewards.map((reward, index) => (
                    <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => openCase(caseItem)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl hover:scale-[0.98] transition-transform disabled:bg-secondary disabled:text-muted-foreground disabled:cursor-not-allowed"
                disabled={userBalance < caseItem.price}
              >
                <div className="flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4" />
                  {userBalance < caseItem.price ? 'РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ' : `РћС‚РєСЂС‹С‚СЊ Р·Р° ${caseItem.price} G-coin`}
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="РњР°РіР°Р·РёРЅ" 
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
      />
      
      <div className="pt-20 pb-20 p-6">
        {/* Р‘Р°Р»Р°РЅСЃ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ */}
        <div className="glass-card rounded-2xl p-4 mb-6 apple-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Р’Р°С€ Р±Р°Р»Р°РЅСЃ</div>
              <div className="text-2xl font-medium text-foreground">{userBalance} G-coin</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-foreground" />
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:scale-[0.95] transition-transform"
              >
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {getTotalCartItems() > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalCartItems()}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* РўР°Р±С‹ */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card text-foreground hover:scale-[0.98]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
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
          <div className="w-full max-w-md bg-background rounded-t-2xl max-h-[75vh] flex flex-col">
            {/* Р—Р°РіРѕР»РѕРІРѕРє РєРѕСЂР·РёРЅС‹ - С„РёРєСЃРёСЂРѕРІР°РЅРЅС‹Р№ */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border shrink-0">
              <h2 className="text-xl font-medium text-foreground">РљРѕСЂР·РёРЅР°</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full glass-card flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* РўР°Р±С‹ РєРѕСЂР·РёРЅС‹ - С„РёРєСЃРёСЂРѕРІР°РЅРЅС‹Рµ */}
            <div className="flex gap-2 p-6 py-4 shrink-0">
              <button
                onClick={() => setCartTab('cart')}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  cartTab === 'cart' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card text-foreground hover:scale-[0.98]'
                }`}
              >
                РљРѕСЂР·РёРЅР°
              </button>
              <button
                onClick={() => setCartTab('active')}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  cartTab === 'active' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card text-foreground hover:scale-[0.98]'
                }`}
              >
                РђРєС‚РёРІРЅС‹Рµ
              </button>
              <button
                onClick={() => setCartTab('completed')}
                className={`flex-1 py-2 px-4 rounded-xl transition-all ${
                  cartTab === 'completed' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'glass-card text-foreground hover:scale-[0.98]'
                }`}
              >
                Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ
              </button>
            </div>

            {/* РџСЂРѕРєСЂСѓС‡РёРІР°РµРјРѕРµ СЃРѕРґРµСЂР¶РёРјРѕРµ РєРѕСЂР·РёРЅС‹ */}
            <div className="flex-1 overflow-y-auto px-6 min-h-0">
              {cartTab === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">РљРѕСЂР·РёРЅР° РїСѓСЃС‚Р°</p>
                    </div>
                  ) : (
                    <div className="space-y-4 pb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 glass-card p-4 rounded-xl">
                          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                            <span className="text-xl">{item.emoji}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.price} G-coin Р·Р° С€С‚.</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-[0.9] transition-transform"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full glass-card flex items-center justify-center hover:scale-[0.9] transition-transform"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:scale-[0.9] transition-transform"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* РС‚РѕРіРѕ Рё РєРЅРѕРїРєРё - С„РёРєСЃРёСЂРѕРІР°РЅРЅС‹Рµ РІРЅРёР·Сѓ */}
            {cartTab === 'cart' && cart.length > 0 && (
              <div className="border-t border-border p-6 pt-4 shrink-0 bg-background">
                <div className="flex items-center justify-between text-lg font-medium mb-4">
                  <span>РС‚РѕРіРѕ:</span>
                  <span>{getTotalCartPrice()} G-coin</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 rounded-xl glass-card text-muted-foreground hover:scale-[0.98] transition-transform"
                  >
                    РћС‡РёСЃС‚РёС‚СЊ
                  </button>
                  <button
                    onClick={checkout}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground hover:scale-[0.98] transition-transform disabled:bg-secondary disabled:text-muted-foreground"
                    disabled={userBalance < getTotalCartPrice()}
                  >
                    {userBalance < getTotalCartPrice() ? 'РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ' : 'РљСѓРїРёС‚СЊ'}
                  </button>
                </div>
              </div>
            )}

              {/* РђРєС‚РёРІРЅС‹Рµ Р·Р°РєР°Р·С‹ */}
              {cartTab === 'active' && (
                <div className="space-y-4 pb-4">
                  {orders.filter(order => order.status === 'active').length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р·Р°РєР°Р·РѕРІ</p>
                    </div>
                  ) : (
                    orders.filter(order => order.status === 'active').map((order) => (
                      <div key={order.id} className="glass-card p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Р—Р°РєР°Р· #{order.id}</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            Р’ РѕР±СЂР°Р±РѕС‚РєРµ
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x{item.quantity}</span>
                              <span>{item.price * item.quantity} G-coin</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-border pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>РС‚РѕРіРѕ:</span>
                            <span>{order.total} G-coin</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ Р·Р°РєР°Р·С‹ */}
              {cartTab === 'completed' && (
                <div className="space-y-4 pb-4">
                  {orders.filter(order => order.status === 'completed').length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">РќРµС‚ Р·Р°РІРµСЂС€РµРЅРЅС‹С… Р·Р°РєР°Р·РѕРІ</p>
                    </div>
                  ) : (
                    orders.filter(order => order.status === 'completed').map((order) => (
                      <div key={order.id} className="glass-card p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Р—Р°РєР°Р· #{order.id}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Р’С‹РїРѕР»РЅРµРЅ
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} x{item.quantity}</span>
                              <span>{item.price * item.quantity} G-coin</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-border pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>РС‚РѕРіРѕ:</span>
                            <span>{order.total} G-coin</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
          </div>
        </div>
      )}

      <BottomNavigation currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}
