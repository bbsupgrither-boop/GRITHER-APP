п»їimport { useState } from 'react';
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

// Р СћР С‘Р С— Р Т‘Р В»РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° Р Р† Р С”Р С•РЎР‚Р В·Р С‘Р Р…Р Вµ
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
  const userBalance = currentUser?.balance || 0; // Р ВРЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“Р ВµР С РЎР‚Р ВµР В°Р В»РЎРЉР Р…РЎвЂ№Р в„– Р В±Р В°Р В»Р В°Р Р…РЎРѓ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTab, setCartTab] = useState<'cart' | 'active' | 'completed'>('cart');
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘Р С‘ Р Т‘Р В»РЎРЏ РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂ№ РЎРѓ Р С”Р С•РЎР‚Р В·Р С‘Р Р…Р С•Р в„–
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
      // Р РЋР С—Р С‘РЎРѓРЎвЂ№Р Р†Р В°Р ВµР С Р Т‘Р ВµР Р…РЎРЉР С–Р С‘ РЎРѓ Р В±Р В°Р В»Р В°Р Р…РЎРѓР В° Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ
      if (onUpdateUserBalance && currentUser) {
        onUpdateUserBalance(currentUser.id, -totalPrice);
      }
      
      // Р РЋР С•Р В·Р Т‘Р В°Р ВµР С Р Р…Р С•Р Р†РЎвЂ№Р в„– Р В·Р В°Р С”Р В°Р В· РЎРѓР С• РЎРѓРЎвЂљР В°РЎвЂљРЎС“РЎРѓР С•Р С "pending" (Р С•Р В¶Р С‘Р Т‘Р В°Р ВµРЎвЂљ Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘)
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
        status: 'pending', // Р вЂ”Р В°Р С”Р В°Р В· Р С•Р В¶Р С‘Р Т‘Р В°Р ВµРЎвЂљ Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘ Р Р† Р В°Р Т‘Р СР С‘Р Р…Р С”Р Вµ
        createdAt: new Date().toISOString(),
        userId: 'current-user',
        customerName: currentUser?.name || 'Р СњР ВµР С‘Р В·Р Р†Р ВµРЎРѓРЎвЂљР Р…РЎвЂ№Р в„– Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЉ',
        customerTeam: 'Frontend Team' // TODO: Получить из профиля пользователя
      };
      
      // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С Р В·Р В°Р С”Р В°Р В· Р Р† РЎРѓР С—Р С‘РЎРѓР С•Р С” Р В·Р В°Р С”Р В°Р В·Р С•Р Р†
      setOrders(prevOrders => [...prevOrders, newOrder]);
      
      // Р Р€Р СР ВµР Р…РЎРЉРЎв‚¬Р В°Р ВµР С Р С”Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† Р Р…Р В° РЎРѓР С”Р В»Р В°Р Т‘Р Вµ
      setShopItems(prevItems => 
        prevItems.map(prevItem => {
          const cartItem = cart.find(c => c.id === prevItem.id);
          if (cartItem) {
            return { ...prevItem, stock: Math.max(0, prevItem.stock - cartItem.quantity) };
          }
          return prevItem;
        })
      );
      
      // Р С›РЎвЂЎР С‘РЎвЂ°Р В°Р ВµР С Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎС“ Р С‘ Р С—Р ВµРЎР‚Р ВµР С”Р В»РЎР‹РЎвЂЎР В°Р ВµР СРЎРѓРЎРЏ Р Р…Р В° РЎвЂљР В°Р В± Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р С”Р В°Р В·Р С•Р Р†
      clearCart();
      setCartTab('active');
      
      console.log(`Р вЂ”Р В°Р С”Р В°Р В· Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»Р ВµР Р… Р Р…Р В° Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘РЎР‹ Р Р…Р В° РЎРѓРЎС“Р СР СРЎС“ ${totalPrice} Р С”Р С•Р С‘Р Р…Р С•Р Р†. Р С›РЎРѓРЎвЂљР В°РЎвЂљР С•Р С” Р В±Р В°Р В»Р В°Р Р…РЎРѓР В°: ${userBalance - totalPrice}`, newOrder);
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
      {/* Р С›Р В±РЎвЂ№РЎвЂЎР Р…Р В°РЎРЏ РЎв‚¬Р В°Р С—Р С”Р В° */}
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
          name: '@Р В»Р С‘Р Р…Р С”', 
          username: '@Р В»Р С‘Р Р…Р С”', 
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
        {/* Р С›РЎРѓР Р…Р С•Р Р†Р Р…Р В°РЎРЏ Р С”Р В°РЎР‚РЎвЂљР С•РЎвЂЎР С”Р В°-Р С”Р С•Р Р…РЎвЂљР ВµР в„–Р Р…Р ВµРЎР‚ */}
        <div 
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}
        >
          {/* Р вЂ™Р Р…РЎС“РЎвЂљРЎР‚Р ВµР Р…Р Р…РЎРЏРЎРЏ РЎв‚¬Р В°Р С—Р С”Р В° РЎРѓ Р В±Р В°Р В»Р В°Р Р…РЎРѓР С•Р С, Р В·Р В°Р С–Р С•Р В»Р С•Р Р†Р С”Р С•Р С Р С‘ Р С”Р С•РЎР‚Р В·Р С‘Р Р…Р С•Р в„– */}
          <div className="relative mb-4">
            {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р С—Р С• РЎвЂ Р ВµР Р…РЎвЂљРЎР‚РЎС“ (Р В°Р В±РЎРѓР С•Р В»РЎР‹РЎвЂљР Р…Р С•Р Вµ Р С—Р С•Р В·Р С‘РЎвЂ Р С‘Р С•Р Р…Р С‘РЎР‚Р С•Р Р†Р В°Р Р…Р С‘Р Вµ) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 
                className="text-xl font-semibold"
                style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
              >
                Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№
              </h1>
            </div>
            
            {/* Р вЂР В°Р В»Р В°Р Р…РЎРѓ Р С‘ Р С”Р С•РЎР‚Р В·Р С‘Р Р…Р В° */}
            <div className="flex items-center justify-between">
              {/* Р вЂР В°Р В»Р В°Р Р…РЎРѓ Р Р† Р СР В°Р В»Р ВµР Р…РЎРЉР С”Р С•Р в„– Р С”Р В°РЎР‚РЎвЂљР С•РЎвЂЎР С”Р Вµ */}
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
                  Р вЂР В°Р В»Р В°Р Р…РЎРѓ
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
              
              {/* Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В° РЎРѓР С—РЎР‚Р В°Р Р†Р В° */}
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

          {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† */}
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
                      {/* Р ВР С”Р С•Р Р…Р С”Р В° Р С‘Р В»Р С‘ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
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
                      
                      {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р Вµ */}
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
                      
                      {/* Р С™Р Р…Р С•Р С—Р С”Р В° Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ / Р СњР ВµРЎвЂљ Р Р† Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘ */}
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
                          ? 'Р СњР ВµРЎвЂљ Р Р† Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘' 
                          : 'Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ'
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

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎвЂ№ */}
      <ModalOpaque
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В°"
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
                Р С›РЎвЂЎР С‘РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ
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
                {userBalance < getTotalCartPrice() ? 'Р СњР ВµР Т‘Р С•РЎРѓРЎвЂљР В°РЎвЂљР С•РЎвЂЎР Р…Р С• РЎРѓРЎР‚Р ВµР Т‘РЎРѓРЎвЂљР Р†' : 'Р вЂ”Р В°Р С”Р В°Р В·Р В°РЎвЂљРЎРЉ'}
              </button>
            </div>
          ) : undefined
        }
      >
        <div className="flex flex-col">
          {/* Р СћР В°Р В±РЎвЂ№ Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎвЂ№ */}
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
              Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В°
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
              Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ
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
              Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№Р Вµ
            </button>
          </div>

          {/* Р СџР С•Р С”Р В°Р В·Р В°РЎвЂљРЎРЉ Р С‘РЎвЂљР С•Р С–Р С• Р Т‘Р В»РЎРЏ Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎвЂ№ */}
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
                Р ВРЎвЂљР С•Р С–Р С•:
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

          {/* Р РЋР С•Р Т‘Р ВµРЎР‚Р В¶Р С‘Р СР С•Р Вµ Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎвЂ№ */}
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
                      Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В° Р С—РЎС“РЎРѓРЎвЂљР В°
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
                              Р В·Р В° РЎв‚¬РЎвЂљ.
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

            {/* Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В·Р В°Р С”Р В°Р В·РЎвЂ№ */}
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
                      Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р С”Р В°Р В·Р С•Р Р†
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
                          Р вЂ”Р В°Р С”Р В°Р В· #{order.id}
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
                          {order.status === 'pending' ? 'Р С›Р В¶Р С‘Р Т‘Р В°Р ВµРЎвЂљ Р СР С•Р Т‘Р ВµРЎР‚Р В°РЎвЂ Р С‘Р С‘' : 'Р вЂ™ Р С•Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р Вµ'}
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
                            Р ВРЎвЂљР С•Р С–Р С•:
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

            {/* Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№Р Вµ Р В·Р В°Р С”Р В°Р В·РЎвЂ№ */}
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
                      Р СњР ВµРЎвЂљ Р В·Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р С”Р В°Р В·Р С•Р Р†
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
                          Р вЂ”Р В°Р С”Р В°Р В· #{order.id}
                        </span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: 'rgba(52, 199, 89, 0.1)',
                            color: '#34c759'
                          }}
                        >
                          Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…
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
                            Р ВРЎвЂљР С•Р С–Р С•:
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

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С•Р С—Р С‘РЎРѓР В°Р Р…Р С‘РЎРЏ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
      <ModalOpaque
        isOpen={isItemDetailsOpen}
        onClose={() => setIsItemDetailsOpen(false)}
        title={selectedItem ? selectedItem.name : "Р вЂќР ВµРЎвЂљР В°Р В»Р С‘ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°"}
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
              Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ Р В·Р В° {selectedItem.price.toLocaleString()}
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
              Р СњР ВµРЎвЂљ Р Р† Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘
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
              Р СњР ВµР Т‘Р С•РЎРѓРЎвЂљР В°РЎвЂљР С•РЎвЂЎР Р…Р С• РЎРѓРЎР‚Р ВµР Т‘РЎРѓРЎвЂљР Р†
            </button>
          ) : undefined
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            {/* Р ВР С”Р С•Р Р…Р С”Р В° Р С‘Р В»Р С‘ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
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

            {/* Р С™Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘РЎРЏ */}
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

            {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ */}
            <div className="text-center space-y-2">
              <p 
                className="text-sm leading-relaxed"
                style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}
              >
                {selectedItem.description}
              </p>
            </div>

            {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘ Р С‘ РЎвЂ Р ВµР Р…Р Вµ */}
            <div 
              className="p-4 rounded-xl space-y-2"
              style={{
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8'
              }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В¦Р ВµР Р…Р В°:
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
                  Р вЂ™ Р Р…Р В°Р В»Р С‘РЎвЂЎР С‘Р С‘:
                </span>
                <span 
                  className="font-medium"
                  style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}
                >
                  {selectedItem.stock === -1 ? 'Р СњР ВµР С•Р С–РЎР‚Р В°Р Р…Р С‘РЎвЂЎР ВµР Р…Р Р…Р С•' : `${selectedItem.stock} РЎв‚¬РЎвЂљ.`}
                </span>
              </div>
            </div>
          </div>
        )}
      </ModalOpaque>
    </div>
  );
}
