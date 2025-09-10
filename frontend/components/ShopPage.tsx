import { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ShoppingBag, Stethoscope, Award, WashingMachine, Car, X, Package, Trash2, FileText, ArrowLeft, CheckCircle, Gamepad2, Gift, CircleDot, Dices, Clock, Box } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import coinImage from 'figma:asset/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png';

interface ShopPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  completedDate?: string;
  status: 'pending' | 'approved' | 'rejected' | 'received';
  trackingInfo?: string;
}

export function ShopPage({ onNavigate, currentPage, onOpenSettings }: ShopPageProps) {
  const [userBalance, setUserBalance] = useState(0); // 0g РЅР°С‡Р°Р»СЊРЅС‹Р№ Р±Р°Р»Р°РЅСЃ
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isInsufficientFundsOpen, setIsInsufficientFundsOpen] = useState(false);
  const [orderTab, setOrderTab] = useState<'active' | 'completed'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeShopTab, setActiveShopTab] = useState<'goods' | 'games' | 'cases'>('goods');
  const [lastWheelSpin, setLastWheelSpin] = useState<Date | null>(null);
  const [lastCaseOpen, setLastCaseOpen] = useState<Date | null>(null);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const [caseResult, setCaseResult] = useState<number | null>(null);
  const [isCaseDescriptionOpen, setIsCaseDescriptionOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  // РўРѕРІР°СЂС‹ РјР°РіР°Р·РёРЅР° (РїСѓСЃС‚РѕР№ СЃРїРёСЃРѕРє - С‚РѕРІР°СЂС‹ Р±СѓРґСѓС‚ РґРѕР±Р°РІР»РµРЅС‹ С‡РµСЂРµР· Р°РґРјРёРЅ-РїР°РЅРµР»СЊ)
  const products: Product[] = [];

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё РґРѕСЃС‚СѓРїРЅРѕСЃС‚Рё РєРѕР»РµСЃР° С„РѕСЂС‚СѓРЅС‹
  const isWheelAvailable = () => {
    if (!lastWheelSpin) return true;
    const now = new Date();
    const timeDiff = now.getTime() - lastWheelSpin.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff >= 24;
  };

  const getWheelCooldownTime = () => {
    if (!lastWheelSpin) return '';
    const now = new Date();
    const nextSpin = new Date(lastWheelSpin.getTime() + 24 * 60 * 60 * 1000);
    const timeDiff = nextSpin.getTime() - now.getTime();
    const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
    return `Р”РѕСЃС‚СѓРїРЅРѕ С‡РµСЂРµР· ${hoursLeft}С‡`;
  };

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё РґРѕСЃС‚СѓРїРЅРѕСЃС‚Рё РєРµР№СЃР°
  const isCaseAvailable = () => {
    if (!lastCaseOpen) return true;
    const now = new Date();
    const timeDiff = now.getTime() - lastCaseOpen.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff >= 24;
  };

  const getCaseCooldownTime = () => {
    if (!lastCaseOpen) return '';
    const now = new Date();
    const nextOpen = new Date(lastCaseOpen.getTime() + 24 * 60 * 60 * 1000);
    const timeDiff = nextOpen.getTime() - now.getTime();
    const hoursLeft = Math.ceil(timeDiff / (1000 * 60 * 60));
    return `Р”РѕСЃС‚СѓРїРЅРѕ С‡РµСЂРµР· ${hoursLeft}С‡`;
  };

  // РњРёРЅРё-РёРіСЂС‹ (РІ Р±СѓРґСѓС‰РµРј Р±СѓРґСѓС‚ СѓРїСЂР°РІР»СЏС‚СЊСЃСЏ С‡РµСЂРµР· Р°РґРјРёРЅ РїР°РЅРµР»СЊ)
  const games = [
    {
      id: 1,
      name: 'РљРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹',
      description: 'Р‘РµСЃРїР»Р°С‚РЅР°СЏ РёРіСЂР° СЂР°Р· РІ 24 С‡Р°СЃР°',
      cost: 0,
      reward: '10-500g',
      icon: CircleDot,
      cooldown: !isWheelAvailable(),
      cooldownText: getWheelCooldownTime()
    },
    {
      id: 2,
      name: 'РљР°РјРµРЅСЊ, РЅРѕР¶РЅРёС†С‹, Р±СѓРјР°РіР°',
      description: 'РљР»Р°СЃСЃРёС‡РµСЃРєР°СЏ РёРіСЂР° РїСЂРѕС‚РёРІ РєРѕРјРїСЊСЋС‚РµСЂР°',
      cost: 10,
      reward: '20-50g',
      icon: Gamepad2,
      cooldown: false
    },
    {
      id: 3,
      name: 'РљР°Р·РёРЅРѕ',
      description: 'Р РёСЃРєРЅРёС‚Рµ СЃРІРѕРёРјРё РѕС‡РєР°РјРё РІ РёРіСЂРµ РЅР° СѓРґР°С‡Сѓ',
      cost: 50,
      reward: '0-300g',
      icon: Dices,
      cooldown: false
    }
  ];

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ СЂР°СЃС‡РµС‚Р° РІС‹РїР°РґРµРЅРёСЏ РЅР°РіСЂР°РґС‹ РёР· РєРµР№СЃР°
  const openCase = () => {
    const random = Math.random() * 100;
    
    // РЎРёСЃС‚РµРјР° РІРµСЂРѕСЏС‚РЅРѕСЃС‚РµР№:
    // 10 РјРѕРЅРµС‚ - 40% (0-40)
    // 30 РјРѕРЅРµС‚ - 30% (40-70) 
    // 50 РјРѕРЅРµС‚ - 15% (70-85)
    // 70 РјРѕРЅРµС‚ - 10% (85-95)
    // 100 РјРѕРЅРµС‚ - 5% (95-100)
    
    if (random <= 40) return 10;
    if (random <= 70) return 30;
    if (random <= 85) return 50;
    if (random <= 95) return 70;
    return 100;
  };

  const handleOpenCase = () => {
    setIsOpeningCase(true);
    setIsCaseDescriptionOpen(false);
    
    // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј РєСѓР»РґР°СѓРЅ
    setLastCaseOpen(new Date());
    
    // РРјРёС‚Р°С†РёСЏ Р°РЅРёРјР°С†РёРё РѕС‚РєСЂС‹С‚РёСЏ РєРµР№СЃР°
    setTimeout(() => {
      const reward = openCase();
      setCaseResult(reward);
      setUserBalance(prev => prev + reward);
      
      setTimeout(() => {
        setIsOpeningCase(false);
        setCaseResult(null);
      }, 3000);
    }, 2000);
  };

  const handleCaseClick = (caseItem: any) => {
    setSelectedCase(caseItem);
    setIsCaseDescriptionOpen(true);
  };

  // РљРµР№СЃС‹ (РІ Р±СѓРґСѓС‰РµРј Р±СѓРґСѓС‚ СѓРїСЂР°РІР»СЏС‚СЊСЃСЏ С‡РµСЂРµР· Р°РґРјРёРЅ РїР°РЅРµР»СЊ)
  const cases = [
    {
      id: 1,
      name: 'Р‘РµСЃРїР»Р°С‚РЅС‹Р№ РєРµР№СЃ',
      description: 'РЎР»СѓС‡Р°Р№РЅР°СЏ РЅР°РіСЂР°РґР° РѕС‚ 10 РґРѕ 100 РјРѕРЅРµС‚',
      cost: 0,
      rewards: [
        { coins: 10, chance: '40%' },
        { coins: 30, chance: '30%' },
        { coins: 50, chance: '15%' },
        { coins: 70, chance: '10%' },
        { coins: 100, chance: '5%' }
      ],
      icon: Box,
      cooldown: !isCaseAvailable(),
      cooldownText: getCaseCooldownTime()
    }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + 'g';
  };

  const canAfford = (price: number) => {
    return userBalance >= price;
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handlePurchase = () => {
    const total = getCartTotal();
    if (total > userBalance) {
      setIsInsufficientFundsOpen(true);
      return;
    }

    // РЎРѕР·РґР°РµРј РЅРѕРІС‹Р№ Р·Р°РєР°Р·
    const newOrder: Order = {
      id: Date.now(),
      items: [...cart],
      total,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'pending'
    };

    // РЎРЅРёРјР°РµРј РґРµРЅСЊРіРё СЃ Р±Р°Р»Р°РЅСЃР°
    setUserBalance(prev => prev - total);
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    setIsCartOpen(false);
  };

  const activeOrders = orders.filter(order => order.status === 'pending' || order.status === 'approved');
  const completedOrders = orders.filter(order => order.status === 'rejected' || order.status === 'received');

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Р’ РїСЂРѕС†РµСЃСЃРµ РѕРґРѕР±СЂРµРЅРёСЏ';
      case 'approved': return 'РћРґРѕР±СЂРµРЅ';
      case 'rejected': return 'РћС‚РєР»РѕРЅРµРЅ';
      case 'received': return 'РџРѕР»СѓС‡РµРЅ';
      default: return 'РќРµРёР·РІРµСЃС‚РЅРѕ';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-muted-foreground';
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'received': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const handleMarkAsReceived = (orderId: number) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: 'received' as const,
              completedDate: new Date().toLocaleDateString('ru-RU')
            }
          : order
      )
    );
  };

  const handleShowTracking = (order: Order) => {
    setSelectedOrder(order);
    setIsTrackingOpen(true);
  };

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РёРјРёС‚Р°С†РёРё РѕР±РЅРѕРІР»РµРЅРёСЏ СЃС‚Р°С‚СѓСЃРѕРІ Р·Р°РєР°Р·РѕРІ (РґР»СЏ РґРµРјРѕРЅСЃС‚СЂР°С†РёРё)
  const simulateOrderStatusUpdate = (orderId: number, newStatus: Order['status'], trackingInfo?: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder: Order = {
            ...order,
            status: newStatus,
            completedDate: (newStatus === 'rejected' || newStatus === 'received') 
              ? new Date().toLocaleDateString('ru-RU') 
              : order.completedDate
          };
          
          if (trackingInfo) {
            updatedOrder.trackingInfo = trackingInfo;
          }

          // Р’РѕР·РІСЂР°С‚ РґРµРЅРµРі РїСЂРё РѕС‚РєР»РѕРЅРµРЅРёРё
          if (newStatus === 'rejected') {
            setUserBalance(prev => prev + order.total);
          }

          return updatedOrder;
        }
        return order;
      })
    );
  };

  return (
    <>
      <div className="min-h-screen flex flex-col max-w-md mx-auto">
        {/* Header */}
        <Header onNavigate={onNavigate} currentPage={currentPage} onOpenSettings={onOpenSettings} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="mx-4 mt-6 h-full">
            <div className="glass-card rounded-2xl h-full flex flex-col apple-shadow">
              {/* Р’РµСЂС…РЅСЏСЏ СЃРµРєС†РёСЏ СЃ Р±Р°Р»Р°РЅСЃРѕРј Рё Р·Р°РіРѕР»РѕРІРєРѕРј */}
              <div className="flex items-center p-6 border-b border-border/20">
                <div className="glass-card rounded-lg px-3 py-2 apple-shadow">
                  <div className="text-xs text-muted-foreground mb-1">Р‘Р°Р»Р°РЅСЃ</div>
                  <div className="text-sm font-medium text-foreground">{formatPrice(userBalance)}</div>
                </div>
                
                <h2 className="text-lg font-medium text-foreground flex-1 text-center">
                  {activeShopTab === 'goods' ? 'РўРѕРІР°СЂС‹' : activeShopTab === 'games' ? 'РњРёРЅРё-РёРіСЂС‹' : 'РљРµР№СЃС‹'}
                </h2>
                
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="apple-button p-2 rounded-full hover:scale-105 transition-transform relative"
                >
                  <ShoppingBag className="w-5 h-5 text-foreground/70" />
                  {cart.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                  )}
                </button>
              </div>

              {/* Р’РєР»Р°РґРєРё РјР°РіР°Р·РёРЅР° */}
              <div className="px-6 pb-4">
                <div className="flex gap-2 p-1 glass-card rounded-2xl">
                  <button
                    onClick={() => setActiveShopTab('goods')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                      activeShopTab === 'goods'
                        ? 'bg-foreground text-background apple-shadow'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    РўРѕРІР°СЂС‹
                  </button>
                  <button
                    onClick={() => setActiveShopTab('games')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                      activeShopTab === 'games'
                        ? 'bg-foreground text-background apple-shadow'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    РњРёРЅРё-РёРіСЂС‹
                  </button>
                  <button
                    onClick={() => setActiveShopTab('cases')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                      activeShopTab === 'cases'
                        ? 'bg-foreground text-background apple-shadow'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    РљРµР№СЃС‹
                  </button>
                </div>
              </div>
              
              {/* РЎРѕРґРµСЂР¶РёРјРѕРµ РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ Р°РєС‚РёРІРЅРѕР№ РІРєР»Р°РґРєРё */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeShopTab === 'goods' && (
                  <>
                    {products.length > 0 ? (
                      products.map((product) => {
                        const affordable = canAfford(product.price);
                        return (
                          <div
                            key={product.id}
                            className={`glass-card rounded-2xl p-4 flex items-center gap-4 apple-shadow transition-all ${
                              affordable ? 'hover:scale-[0.98] cursor-pointer' : 'opacity-50'
                            }`}
                            onClick={() => affordable && handleProductClick(product)}
                          >
                            <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                              <product.icon className="w-6 h-6 text-foreground/70" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="font-medium text-foreground text-sm mb-1">
                                {product.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatPrice(product.price)}
                              </div>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (affordable) {
                                  addToCart(product);
                                }
                              }}
                              disabled={!affordable}
                              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                affordable
                                  ? 'glass-card hover:scale-[0.98] text-foreground'
                                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                              }`}
                            >
                              РљСѓРїРёС‚СЊ
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center min-h-[200px]">
                        <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 w-80 apple-shadow">
                          <p className="text-muted-foreground opacity-70 text-center">
                            РўРѕРІР°СЂС‹ РґР»СЏ РїРѕРєСѓРїРєРё РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‚
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeShopTab === 'games' && (
                  <>
                    {games.map((game) => {
                      const affordable = canAfford(game.cost);
                      const canPlay = affordable && !game.cooldown;
                      return (
                        <div
                          key={game.id}
                          className={`glass-card rounded-2xl p-4 apple-shadow transition-all ${
                            canPlay ? 'hover:scale-[0.98] cursor-pointer' : 'opacity-50'
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center relative">
                              <game.icon className="w-6 h-6 text-foreground/70" />
                              {game.cooldown && (
                                <div className="absolute inset-0 bg-muted/50 rounded-xl flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-foreground text-sm">
                                  {game.name}
                                </div>
                                {game.cost === 0 && (
                                  <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">
                                    Р‘РµСЃРїР»Р°С‚РЅРѕ
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {game.description}
                              </div>
                              {game.cooldown && game.cooldownText && (
                                <div className="text-xs text-orange-600 mt-1">
                                  {game.cooldownText}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {game.cost > 0 ? `РЎС‚РѕРёРјРѕСЃС‚СЊ: ${formatPrice(game.cost)}` : 'Р‘РµСЃРїР»Р°С‚РЅРѕ'} вЂў РќР°РіСЂР°РґР°: {game.reward}
                            </div>
                            <button
                              disabled={!canPlay}
                              onClick={() => {
                                if (game.id === 1 && canPlay) {
                                  // РљРѕР»РµСЃРѕ С„РѕСЂС‚СѓРЅС‹ - СѓСЃС‚Р°РЅР°РІР»РёРІР°РµРј РєСѓР»РґР°СѓРЅ
                                  setLastWheelSpin(new Date());
                                }
                                // Р—РґРµСЃСЊ Р±СѓРґРµС‚ Р»РѕРіРёРєР° Р·Р°РїСѓСЃРєР° РёРіСЂ
                              }}
                              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                canPlay
                                  ? 'bg-primary text-primary-foreground hover:scale-[0.98]'
                                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                              }`}
                            >
                              {game.cooldown ? 'РќРµРґРѕСЃС‚СѓРїРЅРѕ' : 'РРіСЂР°С‚СЊ'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    
                    {games.length === 0 && (
                      <div className="flex items-center justify-center min-h-[200px]">
                        <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 w-80 apple-shadow">
                          <p className="text-muted-foreground opacity-70 text-center">
                            РњРёРЅРё-РёРіСЂС‹ РїРѕРєР° РЅРµРґРѕСЃС‚СѓРїРЅС‹
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeShopTab === 'cases' && (
                  <>
                    {cases.map((caseItem) => {
                      const affordable = canAfford(caseItem.cost);
                      const canClick = affordable && !isOpeningCase;
                      return (
                        <div
                          key={caseItem.id}
                          className={`glass-card rounded-2xl p-4 apple-shadow transition-all cursor-pointer ${
                            canClick ? 'hover:scale-[0.98]' : 'opacity-50'
                          }`}
                          onClick={() => canClick && handleCaseClick(caseItem)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center relative">
                              <caseItem.icon className="w-6 h-6 text-foreground/70" />
                              {caseItem.cooldown && (
                                <div className="absolute inset-0 bg-muted/50 rounded-xl flex items-center justify-center">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                </div>
                              )}
                              {isOpeningCase && (
                                <div className="absolute inset-0 bg-primary/20 rounded-xl flex items-center justify-center animate-pulse">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-foreground text-sm">
                                  {caseItem.name}
                                </div>
                                {caseItem.cost === 0 && (
                                  <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">
                                    Р‘РµСЃРїР»Р°С‚РЅРѕ
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {caseItem.description}
                              </div>
                              {caseItem.cooldown && caseItem.cooldownText && (
                                <div className="text-xs text-orange-600 mt-1">
                                  {caseItem.cooldownText}
                                </div>
                              )}
                            </div>
                            
                            <button className="px-4 py-2 rounded-xl text-sm font-medium bg-muted text-muted-foreground">
                              РћС‚РєСЂС‹С‚СЊ
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    
                    {cases.length === 0 && (
                      <div className="flex items-center justify-center min-h-[200px]">
                        <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 w-80 apple-shadow">
                          <p className="text-muted-foreground opacity-70 text-center">
                            РљРµР№СЃС‹ РїРѕРєР° РЅРµРґРѕСЃС‚СѓРїРЅС‹
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} />
      </div>

      {/* РљРѕСЂР·РёРЅР° */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden"
        >
          <div className="p-6 flex-1 flex flex-col">
            {/* Р—Р°РіРѕР»РѕРІРѕРє РєРѕСЂР·РёРЅС‹ */}
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                РљРѕСЂР·РёРЅР°
              </DialogTitle>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              РљРѕСЂР·РёРЅР° РїРѕРєСѓРїРѕРє СЃ С‚РѕРІР°СЂР°РјРё РґР»СЏ РѕС„РѕСЂРјР»РµРЅРёСЏ Р·Р°РєР°Р·Р°
            </DialogDescription>

            {/* Р‘Р°Р»Р°РЅСЃ Рё РєРЅРѕРїРєР° Р·Р°РєР°Р·РѕРІ */}
            <div className="flex items-center gap-3 mb-4">
              <div className="glass-card rounded-lg px-3 py-2">
                <div className="text-xs text-muted-foreground mb-1">Р‘Р°Р»Р°РЅСЃ</div>
                <div className="text-sm font-medium text-foreground">{formatPrice(userBalance)}</div>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrdersOpen(true);
                }}
                className="glass-card rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform ml-auto"
              >
                Р—Р°РєР°Р·С‹
              </button>
            </div>

            {/* РўРѕРІР°СЂС‹ РІ РєРѕСЂР·РёРЅРµ */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.product.id} className="glass-card rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center">
                      <item.product.icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {item.product.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatPrice(item.product.price)}
                        {item.quantity > 1 && ` x${item.quantity}`}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center min-h-[120px]">
                  <p className="text-muted-foreground text-sm text-center opacity-70">
                    РљРѕСЂР·РёРЅР° РїСѓСЃС‚Р°
                  </p>
                </div>
              )}
            </div>

            {/* РС‚РѕРіРѕ Рё РєРЅРѕРїРєРё */}
            {cart.length > 0 && (
              <>
                <div className="border-t border-border/20 pt-4 mb-4">
                  <div className="text-lg font-medium text-foreground text-center">
                    РС‚РѕРіРѕ: {formatPrice(getCartTotal())}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
                  >
                    РћС‡РёСЃС‚РёС‚СЊ
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="flex-1 bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
                  >
                    РћРїР»Р°С‚РёС‚СЊ
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Р”РµС‚Р°Р»Рё С‚РѕРІР°СЂР° */}
      <Dialog open={isProductDetailOpen} onOpenChange={setIsProductDetailOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-sm p-6 [&>button]:hidden"
          aria-describedby="product-detail-description"
        >
          <DialogTitle className="text-lg font-medium text-foreground text-center mb-6">
            РРЅС„РѕСЂРјР°С†РёСЏ Рѕ С‚РѕРІР°СЂРµ
          </DialogTitle>
          
          <DialogDescription id="product-detail-description" className="sr-only">
            Р”РµС‚Р°Р»СЊРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ С‚РѕРІР°СЂРµ
          </DialogDescription>

          {selectedProduct && (
            <div className="space-y-4">
              {/* РР·РѕР±СЂР°Р¶РµРЅРёРµ С‚РѕРІР°СЂР° */}
              <div className="w-full h-32 glass-card rounded-2xl flex items-center justify-center">
                <selectedProduct.icon className="w-16 h-16 text-foreground/70" />
              </div>

              {/* РћРїРёСЃР°РЅРёРµ С‚РѕРІР°СЂР° */}
              <div className="glass-card rounded-2xl p-4">
                <div className="text-sm font-medium text-foreground mb-2">
                  РћРїРёСЃР°РЅРёРµ С‚РѕРІР°СЂР°
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedProduct.description}
                </div>
              </div>

              {/* Р¦РµРЅР° */}
              <div className="text-center">
                <div className="text-lg font-medium text-foreground">
                  Р¦РµРЅР°: {formatPrice(selectedProduct.price)}
                </div>
              </div>

              {/* РљРЅРѕРїРєРё */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsProductDetailOpen(false)}
                  className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
                >
                  РћС‚РјРµРЅРёС‚СЊ
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setIsProductDetailOpen(false);
                  }}
                  className="flex-1 bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
                >
                  РџСЂРёРѕР±СЂРµСЃС‚Рё
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Р—Р°РєР°Р·С‹ */}
      <Dialog open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden"
          aria-describedby="orders-description"
        >
          <div className="p-6 flex-1 flex flex-col">
            {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РЅпїЅпїЅРІРёРіР°С†РёРµР№ */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  setIsOrdersOpen(false);
                  setIsCartOpen(true);
                }}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-foreground/70" />
              </button>
              
              <DialogTitle className="text-lg font-medium text-foreground">
                Р—Р°РєР°Р·С‹
              </DialogTitle>
              
              <div className="w-8"></div> {/* Spacer РґР»СЏ С†РµРЅС‚СЂРёСЂРѕРІР°РЅРёСЏ */}
            </div>
            
            <DialogDescription id="orders-description" className="sr-only">
              РЎРїРёСЃРѕРє Р·Р°РєР°Р·РѕРІ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
            </DialogDescription>

            {/* Р’РєР»Р°РґРєРё */}
            <div className="flex gap-3 p-1 glass-card rounded-2xl mb-4">
              <button
                onClick={() => setOrderTab('active')}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 transition-all ${
                  orderTab === 'active' 
                    ? 'bg-muted text-foreground apple-shadow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                РђРєС‚СѓР°Р»СЊРЅС‹Рµ ({activeOrders.length})
              </button>
              <button
                onClick={() => setOrderTab('completed')}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 transition-all ${
                  orderTab === 'completed' 
                    ? 'bg-muted text-foreground apple-shadow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ ({completedOrders.length})
              </button>
            </div>

            {/* РЎРїРёСЃРѕРє Р·Р°РєР°Р·РѕРІ */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {(orderTab === 'active' ? activeOrders : completedOrders).length > 0 ? (
                (orderTab === 'active' ? activeOrders : completedOrders).map((order) => (
                  <div key={order.id} className={`glass-card rounded-2xl p-4 ${order.status === 'rejected' ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-medium text-foreground">
                        {order.items[0].product.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {orderTab === 'completed' && order.completedDate 
                          ? `${order.date} в†’ ${order.completedDate}`
                          : order.date
                        }
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium text-foreground mb-3">
                      {formatPrice(order.total)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                        РЎС‚Р°С‚СѓСЃ: {getStatusText(order.status)}
                      </div>
                      
                      {order.status === 'approved' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleShowTracking(order)}
                            className="glass-card rounded-lg px-3 py-1 text-xs font-medium text-foreground hover:scale-[0.98] transition-transform"
                          >
                            РўСЂРµРє-РЅРѕРјРµСЂ
                          </button>
                          <button
                            onClick={() => handleMarkAsReceived(order.id)}
                            className="bg-primary text-primary-foreground rounded-lg px-3 py-1 text-xs font-medium hover:scale-[0.98] transition-transform"
                          >
                            РџРѕР»СѓС‡РµРЅ
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Р”РµРјРѕ РєРЅРѕРїРєРё РґР»СЏ РёР·РјРµРЅРµРЅРёСЏ СЃС‚Р°С‚СѓСЃР° - С‚РѕР»СЊРєРѕ РґР»СЏ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ */}
                    {order.status === 'pending' && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-border/20">
                        <button
                          onClick={() => simulateOrderStatusUpdate(order.id, 'approved', 'TRK123456789')}
                          className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded"
                        >
                          [DEMO] РћРґРѕР±СЂРёС‚СЊ
                        </button>
                        <button
                          onClick={() => simulateOrderStatusUpdate(order.id, 'rejected')}
                          className="text-xs bg-red-500/20 text-red-600 px-2 py-1 rounded"
                        >
                          [DEMO] РћС‚РєР»РѕРЅРёС‚СЊ
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center min-h-[120px]">
                  <p className="text-muted-foreground text-sm text-center opacity-70">
                    {orderTab === 'active' ? 'РќРµС‚ Р°РєС‚СѓР°Р»СЊРЅС‹С… Р·Р°РєР°Р·РѕРІ' : 'РќРµС‚ Р·Р°РІРµСЂС€РµРЅРЅС‹С… Р·Р°РєР°Р·РѕРІ'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* РўСЂРµРє-РЅРѕРјРµСЂ */}
      <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-sm p-6 [&>button]:hidden"
          aria-describedby="tracking-description"
        >
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-lg font-medium text-foreground">
              РРЅС„РѕСЂРјР°С†РёСЏ Рѕ Р·Р°РєР°Р·Рµ
            </DialogTitle>
            <button
              onClick={() => setIsTrackingOpen(false)}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-foreground/70" />
            </button>
          </div>
          
          <DialogDescription id="tracking-description" className="sr-only">
            РРЅС„РѕСЂРјР°С†РёСЏ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ Р·Р°РєР°Р·Р°
          </DialogDescription>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-4">
                <div className="text-sm font-medium text-foreground mb-2">
                  РўСЂРµРє-РЅРѕРјРµСЂ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ
                </div>
                <div className="font-mono text-sm bg-muted rounded-lg p-2 text-center">
                  {selectedOrder.trackingInfo || 'TRK123456789'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Р—Р°РєР°Р· РѕРґРѕР±СЂРµРЅ Рё РїРµСЂРµРґР°РЅ РІ РґРѕСЃС‚Р°РІРєСѓ.
                  РСЃРїРѕР»СЊР·СѓР№С‚Рµ С‚СЂРµРє-РЅРѕРјРµСЂ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ.
                </div>
              </div>
              
              <button
                onClick={() => setIsTrackingOpen(false)}
                className="w-full bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
              >
                РџРѕРЅСЏС‚РЅРѕ
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ */}
      <Dialog open={isInsufficientFundsOpen} onOpenChange={setIsInsufficientFundsOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-sm p-6 [&>button]:hidden"
          aria-describedby="insufficient-funds-description"
        >
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-lg font-medium text-foreground">
              РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ
            </DialogTitle>
            <button
              onClick={() => setIsInsufficientFundsOpen(false)}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-foreground/70" />
            </button>
          </div>
          
          <DialogDescription id="insufficient-funds-description" className="sr-only">
            РЈРІРµРґРѕРјР»РµРЅРёРµ Рѕ РЅРµРґРѕСЃС‚Р°С‚РєРµ СЃСЂРµРґСЃС‚РІ
          </DialogDescription>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <X className="w-8 h-8 text-red-500" />
            </div>
            
            <p className="text-sm text-foreground">
              РЈ РІР°СЃ РЅРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ РґР»СЏ РїРѕРєСѓРїРєРё РІСЃРµС… С‚РѕРІР°СЂРѕРІ РІ РєРѕСЂР·РёРЅРµ. 
              РџРѕР¶Р°Р»СѓР№СЃС‚Р°, СѓРґР°Р»РёС‚Рµ РЅРµРєРѕС‚РѕСЂС‹Рµ С‚РѕРІР°СЂС‹ РёР»Рё РїРѕРїРѕР»РЅРёС‚Рµ Р±Р°Р»Р°РЅСЃ.
            </p>
            
            <button
              onClick={() => setIsInsufficientFundsOpen(false)}
              className="w-full bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
            >
              РџРѕРЅСЏС‚РЅРѕ
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* РћРїРёСЃР°РЅРёРµ РєРµР№СЃР° */}
      <Dialog open={isCaseDescriptionOpen} onOpenChange={setIsCaseDescriptionOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 [&>button]:hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-lg font-medium text-foreground">
                {selectedCase?.name}
              </DialogTitle>
              <button
                onClick={() => setIsCaseDescriptionOpen(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              РћРїРёСЃР°РЅРёРµ Рё СЃРѕРґРµСЂР¶РёРјРѕРµ РєРµР№СЃР° СЃ РёРЅС„РѕСЂРјР°С†РёРµР№ Рѕ С€Р°РЅСЃР°С… РІС‹РїР°РґРµРЅРёСЏ РЅР°РіСЂР°Рґ
            </DialogDescription>

            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-4">
                {selectedCase?.description}
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-foreground mb-2">РЁР°РЅСЃС‹ РІС‹РїР°РґРµРЅРёСЏ:</div>
                <div className="space-y-2">
                  {selectedCase?.rewards?.map((reward: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{reward.coins} РјРѕРЅРµС‚</span>
                      <span className="text-muted-foreground">{reward.chance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsCaseDescriptionOpen(false)}
                className="flex-1 glass-card rounded-xl py-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
              >
                РћС‚РјРµРЅР°
              </button>
              <button
                onClick={handleOpenCase}
                disabled={selectedCase?.cooldown || isOpeningCase}
                className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all ${
                  selectedCase?.cooldown || isOpeningCase
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:scale-[0.98]'
                }`}
              >
                {isOpeningCase ? 'РћС‚РєСЂС‹РІР°РµРј...' : selectedCase?.cooldown ? 'РќРµРґРѕСЃС‚СѓРїРЅРѕ' : 'РћС‚РєСЂС‹С‚СЊ'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р РµР·СѓР»СЊС‚Р°С‚ РѕС‚РєСЂС‹С‚РёСЏ РєРµР№СЃР° */}
      <Dialog open={caseResult !== null} onOpenChange={() => setCaseResult(null)}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-sm p-0 [&>button]:hidden"
        >
          <div className="p-6 text-center">
            <DialogTitle className="sr-only">
              Р РµР·СѓР»СЊС‚Р°С‚ РѕС‚РєСЂС‹С‚РёСЏ РєРµР№СЃР°
            </DialogTitle>
            
            <DialogDescription className="sr-only">
              РќР°РіСЂР°РґР° РїРѕР»СѓС‡РµРЅРЅР°СЏ РёР· РєРµР№СЃР° Рё РЅР°С‡РёСЃР»РµРЅРЅР°СЏ РЅР° Р±Р°Р»Р°РЅСЃ
            </DialogDescription>

            {/* РР·РѕР±СЂР°Р¶РµРЅРёРµ РјРѕРЅРµС‚С‹ */}
            <div className="w-16 h-16 mx-auto mb-4">
              <ImageWithFallback 
                src={coinImage} 
                alt="РњРѕРЅРµС‚Р°"
                className="w-full h-full object-contain animate-bounce"
              />
            </div>

            {/* Р РµР·СѓР»СЊС‚Р°С‚ */}
            <div className="text-2xl font-bold text-foreground mb-4">
              +{caseResult}g
            </div>

            <button
              onClick={() => setCaseResult(null)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.98] transition-transform"
            >
              РћРљ
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
