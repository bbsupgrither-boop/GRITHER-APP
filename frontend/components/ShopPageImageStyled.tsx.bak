import { useState } from 'react';
import { ShoppingCart, Settings, Plus, Minus, X, CheckCircle, Clock } from './Icons';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ShopItem, Order } from '../types/shop';
import { EmptyCard } from './EmptyCard';
import { ModalOpaque } from './ModalOpaque';
import { ImageWithFallback } from './figma/ImageWithFallback';
import coinIcon from 'figma:asset/29d513144bb95c08c031f3604ac2dd2e7bee6450.png';

interface ShopPageImageStyledProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings: () => void;
  profilePhoto?: string | null;
  shopItems: ShopItem[];
  setShopItems: (items: ShopItem[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  theme?: 'light' | 'dark';
  currentUser?: import('../types/battles').User;
  onUpdateUserBalance?: (userId: string, amount: number) => void;
}

// РўРёРї РґР»СЏ С‚РѕРІР°СЂР° РІ РєРѕСЂР·РёРЅРµ
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

export function ShopPageImageStyled({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto,
  shopItems,
  setShopItems,
  orders,
  setOrders,
  theme = 'light',
  currentUser,
  onUpdateUserBalance
}: ShopPageImageStyledProps) {
  const userBalance = currentUser?.balance || 0; // РСЃРїРѕР»СЊР·СѓРµРј СЂРµР°Р»СЊРЅС‹Р№ Р±Р°Р»Р°РЅСЃ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTab, setCartTab] = useState<'cart' | 'active' | 'completed'>('cart');
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

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
      // РЎРїРёСЃС‹РІР°РµРј РґРµРЅСЊРіРё СЃ Р±Р°Р»Р°РЅСЃР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
      if (onUpdateUserBalance && currentUser) {
        onUpdateUserBalance(currentUser.id, -totalPrice);
      }
      
      // РЎРѕР·РґР°РµРј РЅРѕРІС‹Р№ Р·Р°РєР°Р· СЃРѕ СЃС‚Р°С‚СѓСЃРѕРј "pending" (РѕР¶РёРґР°РµС‚ РјРѕРґРµСЂР°С†РёРё)
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
        status: 'pending', // Р—Р°РєР°Р· РѕР¶РёРґР°РµС‚ РјРѕРґРµСЂР°С†РёРё РІ Р°РґРјРёРЅРєРµ
        createdAt: new Date().toISOString(),
        userId: 'current-user',
        customerName: currentUser?.name || 'РќРµРёР·РІРµСЃС‚РЅС‹Р№ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ',
        customerTeam: 'Frontend Team' // TODO: РїРѕР»СѓС‡Р°С‚СЊ РёР· РїСЂРѕС„РёР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
      };
      
      // Р”РѕР±Р°РІР»СЏРµРј Р·Р°РєР°Р· РІ СЃРїРёСЃРѕРє Р·Р°РєР°Р·РѕРІ
      setOrders(prevOrders => [...prevOrders, newOrder]);
      
      // РЈРјРµРЅСЊС€Р°РµРј РєРѕР»РёС‡РµСЃС‚РІРѕ С‚РѕРІР°СЂРѕРІ РЅР° СЃРєР»Р°РґРµ
      setShopItems(prevItems => 
        prevItems.map(prevItem => {
          const cartItem = cart.find(c => c.id === prevItem.id);
          if (cartItem) {
            return { ...prevItem, stock: Math.max(0, prevItem.stock - cartItem.quantity) };
          }
          return prevItem;
        })
      );
      
      // РћС‡РёС‰Р°РµРј РєРѕСЂР·РёРЅСѓ Рё РїРµСЂРµРєР»СЋС‡Р°РµРјСЃСЏ РЅР° С‚Р°Р± Р°РєС‚РёРІРЅС‹С… Р·Р°РєР°Р·РѕРІ
      clearCart();
      setCartTab('active');
      
      console.log(`Р—Р°РєР°Р· РѕС‚РїСЂР°РІР»РµРЅ РЅР° РјРѕРґРµСЂР°С†РёСЋ РЅР° СЃСѓРјРјСѓ ${totalPrice} РєРѕРёРЅРѕРІ. РћСЃС‚Р°С‚РѕРє Р±Р°Р»Р°РЅСЃР°: ${userBalance - totalPrice}`, newOrder);
    }
  };

  const handleShowItemDetails = (item: ShopItem) => {
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
  };

  const handleBuyFromDetails = (item: ShopItem) => {
    if (userBalance >= item.price && item.stock > 0) {
      addToCart(item);
      setIsItemDetailsOpen(false);
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
          : 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
      }}
    >
      {/* РћР±С‹С‡РЅР°СЏ С€Р°РїРєР° */}
      <Header 
        onNavigate={onNavigate}
        currentPage={currentPage}
        onOpenSettings={onOpenSettings} 
        profilePhoto={profilePhoto}
        theme={theme}
        user={currentUser ? {
          id: currentUser.id,
          name: currentUser.name, 
          username: currentUser.name, 
          avatar: '',
          role: 'user',
          level: currentUser.level,
          experience: 0,
          maxExperience: 100,
          balance: currentUser.balance,
          rating: currentUser.rating,
          completedTasks: 0,
          achievementsCount: 0,
          battlesWon: 0,
          battlesLost: 0,
          isOnline: currentUser.isOnline,
          lastSeen: new Date(),
          joinedDate: new Date()
        } : {
          id: 'guest',
          name: '@Р»РёРЅРє', 
          username: '@Р»РёРЅРє', 
          avatar: '',
          role: 'user',
          level: 1,
          experience: 0,
          maxExperience: 100,
          balance: 0,
          rating: 0,
          completedTasks: 0,
          achievementsCount: 0,
          battlesWon: 0,
          battlesLost: 0,
          isOnline: true,
          lastSeen: new Date(),
          joinedDate: new Date()
        }}
      />
      
      <div className="max-w-md mx-auto px-4 pb-32">
        {/* РћСЃРЅРѕРІРЅР°СЏ РєР°СЂС‚РѕС‡РєР°-РєРѕРЅС‚РµР№РЅРµСЂ */}
        <div 
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}
        >
          {/* Р’РЅСѓС‚СЂРµРЅРЅСЏСЏ С€Р°РїРєР° СЃ Р±Р°Р»Р°РЅСЃРѕРј, Р·Р°РіРѕР»РѕРІРєРѕРј Рё РєРѕСЂР·РёРЅРѕР№ */}
          <div className="relative mb-4">
            {/* Р—Р°РіРѕР»РѕРІРѕРє РїРѕ С†РµРЅС‚СЂСѓ (Р°Р±СЃРѕР»СЋС‚РЅРѕРµ РїРѕР·РёС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 
                className="text-xl font-semibold"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                РўРѕРІР°СЂС‹
              </h1>
            </div>
            
            {/* Р‘Р°Р»Р°РЅСЃ Рё РєРѕСЂР·РёРЅР° */}
            <div className="flex items-center justify-between">
              {/* Р‘Р°Р»Р°РЅСЃ РІ РјР°Р»РµРЅСЊРєРѕР№ РєР°СЂС‚РѕС‡РєРµ */}
              <div 
                className="px-4 py-2"
                style={{
                  backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                  borderRadius: '16px'
                }}
              >
                <div 
                  className="text-xs leading-tight"
                  style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                >
                  Р‘Р°Р»Р°РЅСЃ
                </div>
                <div className="flex items-center gap-1">
                  <span 
                    className="text-sm font-medium"
                    style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                  >
                    {userBalance.toLocaleString()}
                  </span>
                  <img 
                    src={coinIcon} 
                    alt="coins" 
                    className="w-4 h-4"
                  />
                </div>
              </div>
              
              {/* РљРѕСЂР·РёРЅР° СЃРїСЂР°РІР° */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative apple-button hover:scale-95 transition-transform"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  minHeight: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingCart style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#1A1A1A' : '#6B7280' }} />
                {getTotalCartItems() > 0 && (
                  <div 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium"
                    style={{ backgroundColor: '#ff3b30', fontSize: '10px' }}
                  >
                    {getTotalCartItems()}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* РЎРїРёСЃРѕРє С‚РѕРІР°СЂРѕРІ */}
          <div className="space-y-3">
            {shopItems.length > 0 ? (
              shopItems.map((item) => {
                const canAfford = userBalance >= item.price;
                const inStock = item.stock > 0;
                
                return (
                  <div 
                    key={item.id} 
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                      borderRadius: '16px',
                      padding: '16px',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                      boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* РРєРѕРЅРєР° РёР»Рё РёР·РѕР±СЂР°Р¶РµРЅРёРµ С‚РѕРІР°СЂР° */}
                      <div 
                        className="w-12 h-12 flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform overflow-hidden"
                        style={{
                          backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                          borderRadius: '16px'
                        }}
                        onClick={() => handleShowItemDetails(item)}
                      >
                        {item.image ? (
                          <ImageWithFallback 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            fallback={<span className="text-2xl">{item.emoji}</span>}
                          />
                        ) : (
                          <span className="text-2xl">{item.emoji}</span>
                        )}
                      </div>
                      
                      {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ С‚РѕРІР°СЂРµ */}
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-medium text-base leading-tight truncate"
                          style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                        >
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span 
                            className="text-sm"
                            style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                          >
                            {item.price.toLocaleString()}
                          </span>
                          <img 
                            src={coinIcon} 
                            alt="coins" 
                            className="w-3 h-3"
                          />
                        </div>
                      </div>
                      
                      {/* РљРЅРѕРїРєР° РљСѓРїРёС‚СЊ / РќРµС‚ РІ РЅР°Р»РёС‡РёРё */}
                      <button 
                        onClick={() => inStock && addToCart(item)}
                        className={`px-6 py-2 transition-all text-sm font-medium whitespace-nowrap text-center`}
                        style={{
                          borderRadius: '12px',
                          height: '44px',
                          background: !inStock
                            ? theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8'
                            : !canAfford
                              ? theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8'
                              : theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                          color: !inStock
                            ? theme === 'dark' ? '#1A1A1A' : '#6B7280'
                            : !canAfford
                              ? theme === 'dark' ? '#1A1A1A' : '#6B7280'
                              : theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.2)' 
                            : '1px solid #E6E9EF',
                          cursor: !inStock ? 'not-allowed' : 'pointer',
                          boxShadow: theme === 'dark' 
                            ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                            : 'none'
                        }}
                        disabled={!inStock}
                      >
                        {!inStock 
                          ? 'РќРµС‚ РІ РЅР°Р»РёС‡РёРё' 
                          : 'РљСѓРїРёС‚СЊ'
                        }
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyCard variant="shop_empty" theme={theme} />
            )}
          </div>
        </div>
      </div>

      <BottomNavigation 
        currentPage={currentPage} 
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РєРѕСЂР·РёРЅС‹ */}
      <ModalOpaque
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="РљРѕСЂР·РёРЅР°"
        theme={theme}
        actions={
          cartTab === 'cart' && cart.length > 0 ? (
            <div className="flex gap-3 w-full">
              <button
                onClick={clearCart}
                className="flex-1 transition-colors"
                style={{
                  height: '44px',
                  borderRadius: '12px',
                  background: theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid #E6E9EF',
                  color: theme === 'dark' ? '#1A1A1A' : '#0F172A',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}
              >
                РћС‡РёСЃС‚РёС‚СЊ
              </button>
              <button
                onClick={checkout}
                disabled={userBalance < getTotalCartPrice()}
                className="flex-1 transition-colors disabled:opacity-50"
                style={{
                  height: '44px',
                  borderRadius: '12px',
                  background: userBalance < getTotalCartPrice()
                    ? theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#E6E9EF'
                    : theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF',
                  color: userBalance < getTotalCartPrice()
                    ? theme === 'dark' ? '#1A1A1A' : '#6B7280'
                    : theme === 'dark' ? '#1A1A1A' : '#FFFFFF',
                  border: 'none',
                  boxShadow: theme === 'dark' 
                    ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}
              >
                {userBalance < getTotalCartPrice() ? 'РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ' : 'Р—Р°РєР°Р·Р°С‚СЊ'}
              </button>
            </div>
          ) : undefined
        }
      >
        <div className="flex flex-col">
          {/* РўР°Р±С‹ РєРѕСЂР·РёРЅС‹ */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setCartTab('cart')}
              className="h-9 px-4 rounded-full transition-all text-sm font-medium"
              style={{
                background: cartTab === 'cart' 
                  ? theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF'
                  : 'transparent',
                color: cartTab === 'cart' 
                  ? theme === 'dark' ? '#1A1A1A' : '#FFFFFF'
                  : theme === 'dark' ? '#E8ECF2' : '#0F172A',
                border: cartTab === 'cart' && theme === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                boxShadow: cartTab === 'cart' && theme === 'dark'
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : 'none'
              }}
            >
              РљРѕСЂР·РёРЅР°
            </button>
            <button
              onClick={() => setCartTab('active')}
              className="h-9 px-4 rounded-full transition-all text-sm font-medium"
              style={{
                background: cartTab === 'active' 
                  ? theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF'
                  : 'transparent',
                color: cartTab === 'active' 
                  ? theme === 'dark' ? '#1A1A1A' : '#FFFFFF'
                  : theme === 'dark' ? '#E8ECF2' : '#0F172A',
                border: cartTab === 'active' && theme === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                boxShadow: cartTab === 'active' && theme === 'dark'
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : 'none'
              }}
            >
              РђРєС‚РёРІРЅС‹Рµ
            </button>
            <button
              onClick={() => setCartTab('completed')}
              className="h-9 px-4 rounded-full transition-all text-sm font-medium"
              style={{
                background: cartTab === 'completed' 
                  ? theme === 'dark' ? 'linear-gradient(145deg, #FFFFFF, #E0E0E0)' : '#2B82FF'
                  : 'transparent',
                color: cartTab === 'completed' 
                  ? theme === 'dark' ? '#1A1A1A' : '#FFFFFF'
                  : theme === 'dark' ? '#E8ECF2' : '#0F172A',
                border: cartTab === 'completed' && theme === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                boxShadow: cartTab === 'completed' && theme === 'dark'
                  ? '0 4px 15px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : 'none'
              }}
            >
              Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ
            </button>
          </div>

          {/* РџРѕРєР°Р·Р°С‚СЊ РёС‚РѕРіРѕ РґР»СЏ РєРѕСЂР·РёРЅС‹ */}
          {cartTab === 'cart' && cart.length > 0 && (
            <div 
              className="flex items-center justify-between mb-4 p-3 rounded-xl"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8'
              }}
            >
              <span 
                className="font-medium"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                РС‚РѕРіРѕ:
              </span>
              <div className="flex items-center gap-1">
                <span 
                  className="font-medium"
                  style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                >
                  {getTotalCartPrice().toLocaleString()}
                </span>
                <img 
                  src={coinIcon} 
                  alt="coins" 
                  className="w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* РЎРѕРґРµСЂР¶РёРјРѕРµ РєРѕСЂР·РёРЅС‹ */}
          <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
            {cartTab === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart 
                      className="w-12 h-12 mx-auto mb-4" 
                      style={{ color: theme === 'dark' ? 'rgba(167, 176, 189, 0.5)' : 'rgba(107, 114, 128, 0.5)' }}
                    />
                    <p 
                      className="text-sm"
                      style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                    >
                      РљРѕСЂР·РёРЅР° РїСѓСЃС‚Р°
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: theme === 'dark' ? '#202734' : '#FFFFFF',
                          border: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8'
                          }}
                        >
                          <span className="text-lg">{item.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <div 
                            className="font-medium text-sm"
                            style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                          >
                            {item.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <span 
                              className="text-xs"
                              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                            >
                              {item.price.toLocaleString()}
                            </span>
                            <img 
                              src={coinIcon} 
                              alt="coins" 
                              className="w-3 h-3"
                            />
                            <span 
                              className="text-xs"
                              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                            >
                              Р·Р° С€С‚.
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-95 transition-transform"
                            style={{
                              backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8'
                            }}
                          >
                            <Minus 
                              className="w-3 h-3" 
                              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                            />
                          </button>
                          <span 
                            className="w-6 text-center text-sm font-medium"
                            style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-95 transition-transform"
                            style={{
                              backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8'
                            }}
                          >
                            <Plus 
                              className="w-3 h-3" 
                              style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                            />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-95 transition-transform"
                          style={{
                            backgroundColor: 'rgba(255, 59, 48, 0.1)',
                            color: '#ff3b30'
                          }}
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
              <div className="space-y-3">
                {orders.filter(order => order.status === 'active' || order.status === 'pending').length === 0 ? (
                  <div className="text-center py-8">
                    <Clock 
                      className="w-12 h-12 mx-auto mb-4" 
                      style={{ color: theme === 'dark' ? 'rgba(167, 176, 189, 0.5)' : 'rgba(107, 114, 128, 0.5)' }}
                    />
                    <p 
                      className="text-sm"
                      style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                    >
                      РќРµС‚ Р°РєС‚РёРІРЅС‹С… Р·Р°РєР°Р·РѕРІ
                    </p>
                  </div>
                ) : (
                  orders.filter(order => order.status === 'active' || order.status === 'pending').map((order) => (
                    <div 
                      key={order.id} 
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: theme === 'dark' ? '#202734' : '#FFFFFF',
                        border: theme === 'dark' 
                          ? '1px solid rgba(255, 255, 255, 0.06)' 
                          : '1px solid #E6E9EF'
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="font-medium text-sm"
                          style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                        >
                          Р—Р°РєР°Р· #{order.id}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: order.status === 'pending' 
                              ? 'rgba(255, 193, 7, 0.1)' 
                              : 'rgba(255, 149, 0, 0.1)',
                            color: order.status === 'pending' 
                              ? '#ffc107' 
                              : '#ff9500'
                          }}
                        >
                          {order.status === 'pending' ? 'РћР¶РёРґР°РµС‚ РјРѕРґРµСЂР°С†РёРё' : 'Р’ РѕР±СЂР°Р±РѕС‚РєРµ'}
                        </span>
                      </div>
                      <div 
                        className="text-xs mb-2"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                              {item.name} x{item.quantity}
                            </span>
                            <div className="flex items-center gap-1">
                              <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                                {(item.price * item.quantity).toLocaleString()}
                              </span>
                              <img 
                                src={coinIcon} 
                                alt="coins" 
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div 
                        className="pt-2 mt-2"
                        style={{
                          borderTop: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <div className="flex justify-between font-medium text-sm">
                          <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                            РС‚РѕРіРѕ:
                          </span>
                          <div className="flex items-center gap-1">
                            <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                              {order.total.toLocaleString()}
                            </span>
                            <img 
                              src={coinIcon} 
                              alt="coins" 
                              className="w-3 h-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Р—Р°РІРµСЂС€РµРЅРЅС‹Рµ Р·Р°РєР°Р·С‹ */}
            {cartTab === 'completed' && (
              <div className="space-y-3">
                {orders.filter(order => order.status === 'completed').length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle 
                      className="w-12 h-12 mx-auto mb-4" 
                      style={{ color: theme === 'dark' ? 'rgba(167, 176, 189, 0.5)' : 'rgba(107, 114, 128, 0.5)' }}
                    />
                    <p 
                      className="text-sm"
                      style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                    >
                      РќРµС‚ Р·Р°РІРµСЂС€РµРЅРЅС‹С… Р·Р°РєР°Р·РѕРІ
                    </p>
                  </div>
                ) : (
                  orders.filter(order => order.status === 'completed').map((order) => (
                    <div 
                      key={order.id} 
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: theme === 'dark' ? '#202734' : '#FFFFFF',
                        border: theme === 'dark' 
                          ? '1px solid rgba(255, 255, 255, 0.06)' 
                          : '1px solid #E6E9EF'
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="font-medium text-sm"
                          style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                        >
                          Р—Р°РєР°Р· #{order.id}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: 'rgba(52, 199, 89, 0.1)',
                            color: '#34c759'
                          }}
                        >
                          Р—Р°РІРµСЂС€РµРЅ
                        </span>
                      </div>
                      <div 
                        className="text-xs mb-2"
                        style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                              {item.name} x{item.quantity}
                            </span>
                            <div className="flex items-center gap-1">
                              <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                                {(item.price * item.quantity).toLocaleString()}
                              </span>
                              <img 
                                src={coinIcon} 
                                alt="coins" 
                                className="w-3 h-3"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div 
                        className="pt-2 mt-2"
                        style={{
                          borderTop: theme === 'dark' 
                            ? '1px solid rgba(255, 255, 255, 0.06)' 
                            : '1px solid #E6E9EF'
                        }}
                      >
                        <div className="flex justify-between font-medium text-sm">
                          <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                            РС‚РѕРіРѕ:
                          </span>
                          <div className="flex items-center gap-1">
                            <span style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                              {order.total.toLocaleString()}
                            </span>
                            <img 
                              src={coinIcon} 
                              alt="coins" 
                              className="w-3 h-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </ModalOpaque>

      {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕРїРёСЃР°РЅРёСЏ С‚РѕРІР°СЂР° */}
      <ModalOpaque
        isOpen={isItemDetailsOpen}
        onClose={() => setIsItemDetailsOpen(false)}
        title={selectedItem ? selectedItem.name : "Р”РµС‚Р°Р»Рё С‚РѕРІР°СЂР°"}
        theme={theme}
        actions={
          selectedItem && selectedItem.stock > 0 && userBalance >= selectedItem.price ? (
            <button
              onClick={() => selectedItem && handleBuyFromDetails(selectedItem)}
              className="w-full transition-colors flex items-center justify-center gap-1"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
                fontWeight: '600'
              }}
            >
              РљСѓРїРёС‚СЊ Р·Р° {selectedItem.price.toLocaleString()}
              <img 
                src={coinIcon} 
                alt="coins" 
                className="w-4 h-4"
              />
            </button>
          ) : selectedItem && selectedItem.stock <= 0 ? (
            <button
              disabled
              className="w-full transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                cursor: 'not-allowed'
              }}
            >
              РќРµС‚ РІ РЅР°Р»РёС‡РёРё
            </button>
          ) : selectedItem && userBalance < selectedItem.price ? (
            <button
              disabled
              className="w-full transition-colors text-center"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                cursor: 'not-allowed'
              }}
            >
              РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ СЃСЂРµРґСЃС‚РІ
            </button>
          ) : undefined
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            {/* РРєРѕРЅРєР° РёР»Рё РёР·РѕР±СЂР°Р¶РµРЅРёРµ С‚РѕРІР°СЂР° */}
            <div className="flex justify-center">
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
                style={{
                  backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                }}
              >
                {selectedItem.image ? (
                  <ImageWithFallback 
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                    fallback={<span className="text-4xl">{selectedItem.emoji}</span>}
                  />
                ) : (
                  <span className="text-4xl">{selectedItem.emoji}</span>
                )}
              </div>
            </div>

            {/* РљР°С‚РµРіРѕСЂРёСЏ */}
            <div className="text-center">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: theme === 'dark' ? '#2B82FF20' : '#2B82FF20',
                  color: '#2B82FF'
                }}
              >
                {selectedItem.category}
              </span>
            </div>

            {/* РћРїРёСЃР°РЅРёРµ */}
            <div className="text-center space-y-2">
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                {selectedItem.description}
              </p>
            </div>

            {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ РЅР°Р»РёС‡РёРё Рё С†РµРЅРµ */}
            <div 
              className="p-4 rounded-xl space-y-2"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8'
              }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р¦РµРЅР°:
                </span>
                <span 
                  className="font-medium"
                  style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                >
                  <div className="flex items-center gap-1">
                    <span>{selectedItem.price.toLocaleString()}</span>
                    <img 
                      src={coinIcon} 
                      alt="coins" 
                      className="w-4 h-4"
                    />
                  </div>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р’ РЅР°Р»РёС‡РёРё:
                </span>
                <span 
                  className="font-medium"
                  style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                >
                  {selectedItem.stock === -1 ? 'РќРµРѕРіСЂР°РЅРёС‡РµРЅРЅРѕ' : `${selectedItem.stock} С€С‚.`}
                </span>
              </div>
            </div>
          </div>
        )}
      </ModalOpaque>
    </div>
  );
}
