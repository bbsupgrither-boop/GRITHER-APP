import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  Gift, 
  Coins, 
  Clock,
  CheckCircle,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Package,
  Trophy,
  Star
} from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

interface LocalCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface Order {
  id: string;
  items: LocalCartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'rejected';
  createdAt: string;
}

interface ShopPageProps {
  theme: 'light' | 'dark';
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ theme, currentPage, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'free' | 'shop' | 'my'>('free');
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartTab, setCartTab] = useState<'cart' | 'active' | 'completed'>('cart');
  const [cart, setCart] = useState<LocalCartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userCases, setUserCases] = useState<any[]>([]);
  const [isFreeAvailable, setIsFreeAvailable] = useState(true);
  const [timeLeft, setTimeLeft] = useState('23:59:59');

  // Mock data
  const mockUser = {
    id: 'current-user',
    name: 'Иван Иванов',
    balance: 2500,
    avatar: undefined
  };

  const mockCaseShopItems = [
    {
      id: 'case1',
      name: 'Бронзовый кейс',
      price: 500,
      color: '#CD7F32',
      description: 'Базовые предметы'
    },
    {
      id: 'case2', 
      name: 'Серебряный кейс',
      price: 1000,
      color: '#C0C0C0',
      description: 'Хорошие предметы'
    },
    {
      id: 'case3',
      name: 'Золотой кейс', 
      price: 2500,
      color: '#FFD700',
      description: 'Редкие предметы'
    }
  ];

  const localShopItems = [
    {
      id: 'shop1',
      name: 'Бонус опыта 2x',
      price: 500,
      description: 'Удваивает получаемый опыт на 24 часа',
      emoji: '⚡',
      isActive: true
    },
    {
      id: 'shop2',
      name: 'VIP статус',
      price: 2000,
      description: 'Особые привилегии на 7 дней',
      emoji: '👑',
      isActive: true
    },
    {
      id: 'shop3',
      name: 'Бонус коинов',
      price: 1000,
      description: '+50% коинов за выполнение задач',
      emoji: '💰',
      isActive: true
    }
  ];

  // Cart functions
  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cartTotal > mockUser.balance) {
      alert('Недостаточно средств!');
      return;
    }

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      items: [...cart],
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [...prev, newOrder]);
    setCart([]);
    setCartModalOpen(false);
    alert('Заказ оформлен!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9F0A';
      case 'completed': return '#22C55E';
      case 'cancelled':
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
      case 'rejected': return 'Отклонен';
      default: return 'Неизвестно';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: theme === 'dark' 
        ? 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
        : 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
      padding: '20px',
      paddingBottom: '100px'
    }}>
      {/* AUTOGEN START shop-content */}
      <div
        style={{
          maxWidth: '448px',
          margin: '0 auto',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: 'calc(96px + env(safe-area-inset-bottom))'
        }}
      >
        {/* Header with user info and cart */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            paddingTop: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2B82FF, #5AA7FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(43, 130, 255, 0.3)'
            }}>
              {mockUser.name.charAt(0)}
            </div>
            <div>
              <div 
                style={{ 
                  fontWeight: '500', 
                  fontSize: '16px',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A' 
                }}
              >
                {mockUser.name}
              </div>
              <div 
                style={{ 
                  fontSize: '12px', 
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280' 
                }}
              >
                WORKER
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Balance */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '20px',
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <Coins size={16} color="#FFD700" />
              <span style={{ 
                fontWeight: '500', 
                fontSize: '14px',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A' 
              }}>
                {mockUser.balance.toLocaleString()}
              </span>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartModalOpen(true)}
              aria-label="Открыть корзину"
              style={{
                position: 'relative',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: 'none',
                background: '#2B82FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                boxShadow: '0 4px 12px rgba(43, 130, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = '#2066C8';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(43, 130, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#2B82FF';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(43, 130, 255, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
            >
              <ShoppingCart 
                size={18} 
                color="#FFFFFF" 
              />
              {cart.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
                }}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: theme === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(255,255,255,0.8)',
          borderRadius: '16px',
          padding: '4px',
          marginBottom: '24px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          {[
            { id: 'free', label: 'БЕСПЛАТНЫЙ' },
            { id: 'shop', label: 'МАГАЗИН' },
            { id: 'my', label: 'МОИ КЕЙСЫ' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              aria-label={`Переключить на вкладку ${tab.label}`}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activeTab === tab.id 
                  ? (theme === 'dark' 
                      ? 'linear-gradient(135deg, #ffffff, #f0f0f0)'
                      : 'linear-gradient(135deg, #2B82FF, #5AA7FF)')
                  : 'transparent',
                color: activeTab === tab.id 
                  ? (theme === 'dark' ? '#0F172A' : '#FFFFFF')
                  : (theme === 'dark' ? '#A7B0BD' : '#6B7280'),
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = theme === 'dark' 
                    ? 'rgba(255,255,255,0.15)' 
                    : 'rgba(43, 130, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'free' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                marginBottom: '8px',
                fontSize: '18px',
                fontWeight: '500'
              }}>
                БЕСПЛАТНЫЙ КЕЙС
              </h2>
              <div style={{
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #22C55E, transparent)',
                margin: '0 auto'
              }}></div>
            </div>

            <div style={{
              background: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              border: '2px solid rgba(34, 197, 94, 0.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}>
              <div style={{
                width: '128px',
                height: '128px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)'
              }}>
                <Gift size={64} color="#FFFFFF" />
              </div>

              <h3 style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                marginBottom: '8px',
                fontSize: '16px',
                fontWeight: '500',
                textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
              }}>
                БЕСПЛАТНЫЙ КЕЙС GRITHER
              </h3>
              <p style={{ 
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                marginBottom: '24px',
                fontSize: '12px',
                lineHeight: '1.4'
              }}>
                Получите случайный кейс совершенно бесплатно каждые 24 часа!
              </p>

              {isFreeAvailable ? (
                <button
                  aria-label="Открыть бесплатный кейс"
                  style={{
                    background: 'linear-gradient(145deg, #22C55E, #16A34A)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '16px 32px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.4)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                >
                  ОТКРЫТЬ БЕСПЛАТНЫЙ КЕЙС
                </button>
              ) : (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '12px'
                  }}>
                    <Clock size={16} />
                    <span>Следующий кейс через: {timeLeft}</span>
                  </div>
                  <button
                    disabled
                    aria-label="Ожидание следующего бесплатного кейса"
                    style={{
                      background: 'linear-gradient(145deg, #6B7280, #4B5563)',
                      color: '#9CA3AF',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '16px 32px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'not-allowed',
                      opacity: 0.5
                    }}
                  >
                    ОЖИДАНИЕ...
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      {activeTab === 'shop' && (
        <div>
          {/* Premium Cases */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              marginBottom: '16px'
            }}>
              ПРЕМИУМ КЕЙСЫ
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {mockCaseShopItems.map((caseItem) => (
                <div
                  key={caseItem.id}
                  style={{
                    background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: `2px solid ${caseItem.color}`,
                    boxShadow: `0 0 20px ${caseItem.color}40`,
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{
                    height: '112px',
                    background: `${caseItem.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <Package size={48} color={caseItem.color} />
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      GRITHER
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      marginBottom: '8px',
                      textShadow: `0 0 10px ${caseItem.color}80`
                    }}>
                      {caseItem.name}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <Coins size={16} color="#FFD700" />
                      <span style={{ 
                        fontWeight: 'bold',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}>
                        {caseItem.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(caseItem)}
                      style={{
                        width: '100%',
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, #ffffff, #f0f0f0)'
                          : 'linear-gradient(135deg, #5AA7FF, #A7D0FF)',
                        color: theme === 'dark' ? '#0F172A' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      КУПИТЬ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shop Items */}
          <div>
            <h3 style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              marginBottom: '16px'
            }}>
              ТОВАРЫ МАГАЗИНА
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {localShopItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center',
                    border: '2px solid #3B82F6',
                    boxShadow: '0 0 20px #3B82F640',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                    {item.emoji}
                  </div>
                  <h4 style={{
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}>
                    {item.name}
                  </h4>
                  <p style={{
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '12px',
                    marginBottom: '16px'
                  }}>
                    {item.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <Coins size={16} color="#FFD700" />
                    <span style={{ 
                      fontWeight: 'bold',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}>
                      {item.price.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      width: '100%',
                      background: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    В КОРЗИНУ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'my' && (
        <div>
          <h3 style={{ 
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
            marginBottom: '16px'
          }}>
            МОИ КЕЙСЫ
          </h3>
          
          {userCases.length === 0 ? (
            <div style={{
              background: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderRadius: '16px',
              padding: '48px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <ShoppingBag size={32} color="#FFFFFF" />
              </div>
              <h4 style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                marginBottom: '8px'
              }}>
                Пусто
              </h4>
              <p style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                Здесь появятся полученные кейсы
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {userCases.map((userCase) => (
                <div
                  key={userCase.id}
                  style={{
                    background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid #3B82F6',
                    boxShadow: '0 0 20px #3B82F640'
                  }}
                >
                  <div style={{
                    height: '96px',
                    background: '#3B82F615',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Package size={32} color="#3B82F6" />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      marginBottom: '8px'
                    }}>
                      {userCase.name}
                    </h4>
                    <p style={{
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                      fontSize: '12px',
                      marginBottom: '12px'
                    }}>
                      Получен: {new Date(userCase.obtainedAt).toLocaleDateString()}
                    </p>
                    <button
                      style={{
                        width: '100%',
                        background: theme === 'dark' 
                          ? 'linear-gradient(135deg, #ffffff, #f0f0f0)'
                          : 'linear-gradient(135deg, #5AA7FF, #A7D0FF)',
                        color: theme === 'dark' ? '#0F172A' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ОТКРЫТЬ КЕЙС
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cart Modal */}
      {cartModalOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setCartModalOpen(false)}
          >
            <div
              style={{
                background: theme === 'dark' ? '#161A22' : '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                width: '90vw',
                maxWidth: '600px',
                maxHeight: '80vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Корзина и заказы
                </h2>
                <button
                  onClick={() => setCartModalOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Tabs */}
              <div style={{
                display: 'flex',
                marginBottom: '24px',
                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                borderRadius: '8px',
                padding: '4px'
              }}>
                {[
                  { id: 'cart', label: 'Корзина', icon: ShoppingCart },
                  { id: 'active', label: 'Активные', icon: Clock },
                  { id: 'completed', label: 'Завершенные', icon: CheckCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCartTab(tab.id as any)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      background: cartTab === tab.id ? '#3B82F6' : 'transparent',
                      color: cartTab === tab.id ? 'white' : (theme === 'dark' ? '#A7B0BD' : '#6B7280'),
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Cart Content */}
              {cartTab === 'cart' && (
                <div>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}>
                        <ShoppingCart size={32} color="#FFFFFF" />
                      </div>
                      <h4 style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                        Корзина пуста
                      </h4>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            border: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
                            borderRadius: '8px',
                            marginBottom: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '24px' }}>{item.emoji}</div>
                            <div>
                              <div style={{ 
                                fontWeight: 'bold',
                                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                              }}>
                                {item.name}
                              </div>
                              <div style={{ 
                                fontSize: '12px',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}>
                                {item.price.toLocaleString()} коинов
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: 'none',
                                background: '#EF4444',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Minus size={16} />
                            </button>
                            <span style={{ 
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                              minWidth: '20px',
                              textAlign: 'center'
                            }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: 'none',
                                background: '#22C55E',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div style={{
                        borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e0e0e0'}`,
                        paddingTop: '16px',
                        marginTop: '16px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '16px'
                        }}>
                          <span style={{ 
                            fontWeight: 'bold',
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                          }}>
                            Итого:
                          </span>
                          <span style={{ 
                            fontWeight: 'bold',
                            color: '#3B82F6',
                            fontSize: '18px'
                          }}>
                            {cartTotal.toLocaleString()} коинов
                          </span>
                        </div>
                        <button
                          onClick={handleCheckout}
                          style={{
                            width: '100%',
                            background: cartTotal <= mockUser.balance ? '#22C55E' : '#EF4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: cartTotal <= mockUser.balance ? 'pointer' : 'not-allowed',
                            opacity: cartTotal <= mockUser.balance ? 1 : 0.5
                          }}
                        >
                          {cartTotal <= mockUser.balance ? 'ОФОРМИТЬ ЗАКАЗ' : 'НЕДОСТАТОЧНО СРЕДСТВ'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {cartTab === 'active' && (
                <div>
                  {orders.filter(order => order.status === 'pending').length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}>
                        <Clock size={32} color="#FFFFFF" />
                      </div>
                      <h4 style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                        Нет активных заказов
                      </h4>
                    </div>
                  ) : (
                    <div>
                      {orders.filter(order => order.status === 'pending').map((order) => (
                        <div
                          key={order.id}
                          style={{
                            padding: '16px',
                            borderRadius: '8px',
                            background: 'rgba(255, 159, 10, 0.1)',
                            border: '1px solid rgba(255, 159, 10, 0.3)',
                            marginBottom: '12px'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                          }}>
                            <span style={{ 
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                            }}>
                              Заказ #{order.id.slice(-6)}
                            </span>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              background: getStatusColor(order.status),
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <div style={{ 
                            fontSize: '12px',
                            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                            marginBottom: '8px'
                          }}>
                            {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{ 
                              fontSize: '12px',
                              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                            }}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span style={{ 
                              fontWeight: 'bold',
                              color: '#3B82F6'
                            }}>
                              {order.total.toLocaleString()} коинов
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {cartTab === 'completed' && (
                <div>
                  {orders.filter(order => order.status !== 'pending').length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                      }}>
                        <CheckCircle size={32} color="#FFFFFF" />
                      </div>
                      <h4 style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                        Нет завершенных заказов
                      </h4>
                    </div>
                  ) : (
                    <div>
                      {orders.filter(order => order.status !== 'pending').map((order) => (
                        <div
                          key={order.id}
                          style={{
                            padding: '16px',
                            borderRadius: '8px',
                            background: order.status === 'completed' 
                              ? 'rgba(34, 197, 94, 0.1)' 
                              : 'rgba(239, 68, 68, 0.1)',
                            border: `1px solid ${order.status === 'completed' 
                              ? 'rgba(34, 197, 94, 0.3)' 
                              : 'rgba(239, 68, 68, 0.3)'}`,
                            marginBottom: '12px'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                          }}>
                            <span style={{ 
                              fontWeight: 'bold',
                              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                            }}>
                              Заказ #{order.id.slice(-6)}
                            </span>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              background: getStatusColor(order.status),
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <div style={{ 
                            fontSize: '12px',
                            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                            marginBottom: '8px'
                          }}>
                            {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{ 
                              fontSize: '12px',
                              color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                            }}>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span style={{ 
                              fontWeight: 'bold',
                              color: '#3B82F6'
                            }}>
                              {order.total.toLocaleString()} коинов
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      </div>
      {/* AUTOGEN END shop-content */}
    </div>
  );
};