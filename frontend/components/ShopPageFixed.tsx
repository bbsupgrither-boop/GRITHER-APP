п»їimport { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { ShoppingBag, X, Package, Trash2, CheckCircle, Gift, Zap } from './Icons';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import coinImage from 'figma:asset/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png';
import { mockAppState } from '../data/mockData';

interface ShopPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  shopItems?: any[];
  setShopItems: (items: any[]) => void;
  orders?: any[];
  setOrders: (orders: any[]) => void;
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

export function ShopPageFixed({ onNavigate, currentPage, onOpenSettings, profilePhoto, shopItems, setShopItems, orders: globalOrders, setOrders: setGlobalOrders }: ShopPageProps) {
  const { currentUser } = mockAppState;
  
  const [userBalance, setUserBalance] = useState(currentUser.balance);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isInsufficientFundsOpen, setIsInsufficientFundsOpen] = useState(false);
  const [orderTab, setOrderTab] = useState<'active' | 'completed'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);


  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р С‘Р С”Р С•Р Р…Р С”Р С‘ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° Р С—Р С• Р С”Р В°РЎвЂљР ВµР С–Р С•РЎР‚Р С‘Р С‘
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bonus': return Zap;
      case 'privilege': return CheckCircle;
      case 'cosmetic': return Gift;
      case 'tool': return Package;
      default: return Package;
    }
  };

  // Р СџРЎР‚Р ВµР С•Р В±РЎР‚Р В°Р В·РЎС“Р ВµР С РЎвЂљР С•Р Р†Р В°РЎР‚РЎвЂ№ Р С‘Р В· Р С–Р В»Р С•Р В±Р В°Р В»РЎРЉР Р…Р С•Р С–Р С• РЎРѓР С•РЎРѓРЎвЂљР С•РЎРЏР Р…Р С‘РЎРЏ Р Р† РЎвЂћР С•РЎР‚Р СР В°РЎвЂљ Product, Р С—Р С•Р С”Р В°Р В·РЎвЂ№Р Р†Р В°Р ВµР С РЎвЂљР С•Р В»РЎРЉР С”Р С• Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ РЎвЂљР С•Р Р†Р В°РЎР‚РЎвЂ№
  const products: Product[] = (shopItems || [])
    .filter(item => item?.isActive)
    .map(item => ({
      id: parseInt(item.id),
      name: item.title,
      price: item.price,
      description: item.description,
      icon: getCategoryIcon(item.category || 'tool')
    }));



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

    // Р РЋР С•Р В·Р Т‘Р В°Р ВµР С Р Р…Р С•Р Р†РЎвЂ№Р в„– Р В·Р В°Р С”Р В°Р В·
    const newOrder: Order = {
      id: Date.now(),
      items: [...cart],
      total,
      date: new Date().toLocaleDateString('ru-RU'),
      status: 'pending'
    };

    // Р РЋР Р…Р С‘Р СР В°Р ВµР С Р Т‘Р ВµР Р…РЎРЉР С–Р С‘ РЎРѓ Р В±Р В°Р В»Р В°Р Р…РЎРѓР В°
    setUserBalance(prev => prev - total);
    setGlobalOrders && setGlobalOrders(prevOrders => [newOrder, ...(prevOrders || [])]);
    clearCart();
    setIsCartOpen(false);
  };

  const activeOrders = (globalOrders || []).filter(order => order?.status === 'pending' || order?.status === 'approved');
  const completedOrders = (globalOrders || []).filter(order => order?.status === 'rejected' || order?.status === 'received');

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Р вЂ™ Р С—РЎР‚Р С•РЎвЂ Р ВµРЎРѓРЎРѓР Вµ Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ';
      case 'approved': return 'Р С›Р Т‘Р С•Р В±РЎР‚Р ВµР Р…';
      case 'rejected': return 'Р С›РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…';
      case 'received': return 'Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…';
      default: return 'Р СњР ВµР С‘Р В·Р Р†Р ВµРЎРѓРЎвЂљР Р…Р С•';
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
    setGlobalOrders && setGlobalOrders(prevOrders => 
      (prevOrders || []).map(order => 
        order?.id === orderId 
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

  return (
    <>
      <div className="min-h-screen flex flex-col max-w-md mx-auto">
        {/* Header */}
        <Header onNavigate={onNavigate} currentPage={currentPage} onOpenSettings={onOpenSettings} user={currentUser} profilePhoto={profilePhoto} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="mx-4 mt-6 h-full">
            <div className="glass-card rounded-2xl h-full flex flex-col apple-shadow">
              {/* Р вЂ™Р ВµРЎР‚РЎвЂ¦Р Р…РЎРЏРЎРЏ РЎРѓР ВµР С”РЎвЂ Р С‘РЎРЏ РЎРѓ Р В±Р В°Р В»Р В°Р Р…РЎРѓР С•Р С Р С‘ Р В·Р В°Р С–Р С•Р В»Р С•Р Р†Р С”Р С•Р С */}
              <div className="flex items-center p-6 border-b border-border/20">
                <div className="glass-card rounded-lg px-3 py-2 apple-shadow">
                  <div className="text-xs text-muted-foreground mb-1">Р вЂР В°Р В»Р В°Р Р…РЎРѓ</div>
                  <div className="text-sm font-medium text-foreground">{userBalance}g</div>
                </div>
                
                <h2 className="text-lg font-medium text-foreground flex-1 text-center">
                  Р СљР В°Р С–Р В°Р В·Р С‘Р Р…
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


              
              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎвЂљР С•Р Р†Р В°РЎР‚Р С•Р Р† */}
              <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-4">
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
                          Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center min-h-[200px]">
                    <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 w-80 apple-shadow">
                      <p className="text-muted-foreground opacity-70 text-center">
                        Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ Р Т‘Р В»РЎРЏ Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘ Р С•РЎвЂљРЎРѓРЎС“РЎвЂљРЎРѓРЎвЂљР Р†РЎС“РЎР‹РЎвЂљ
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation onNavigate={onNavigate} currentPage={currentPage} />
      </div>

      {/* Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В° */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent 
          className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden"
        >
          <div className="p-6 flex-1 flex flex-col">
            {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎвЂ№ */}
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В°
              </DialogTitle>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В° Р С—Р С•Р С”РЎС“Р С—Р С•Р С” РЎРѓ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р С•РЎвЂћР С•РЎР‚Р СР В»Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р С”Р В°Р В·Р В°
            </DialogDescription>

            {/* Р вЂР В°Р В»Р В°Р Р…РЎРѓ Р С‘ Р С”Р Р…Р С•Р С—Р С”Р В° Р В·Р В°Р С”Р В°Р В·Р С•Р Р† */}
            <div className="flex items-center gap-3 mb-4">
              <div className="glass-card rounded-lg px-3 py-2">
                <div className="text-xs text-muted-foreground mb-1">Р вЂР В°Р В»Р В°Р Р…РЎРѓ</div>
                <div className="text-sm font-medium text-foreground">{userBalance}g</div>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrdersOpen(true);
                }}
                className="glass-card rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform ml-auto"
              >
                Р вЂ”Р В°Р С”Р В°Р В·РЎвЂ№
              </button>
            </div>

            {/* Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ Р Р† Р С”Р С•РЎР‚Р В·Р С‘Р Р…Р Вµ */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.product.id} className="glass-card rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center">
                      <item.product.icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">
                        {item.product.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatPrice(item.product.price)} Р“вЂ” {item.quantity}
                      </div>
                    </div>
                    
                    <div className="text-sm font-medium text-foreground mr-2">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Р С™Р С•РЎР‚Р В·Р С‘Р Р…Р В° Р С—РЎС“РЎРѓРЎвЂљР В°</p>
                </div>
              )}
            </div>

            {/* Р ВРЎвЂљР С•Р С–Р С• Р С‘ Р С”Р Р…Р С•Р С—Р С”Р В° Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘ */}
            {cart.length > 0 && (
              <div className="border-t border-border/20 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">Р ВРЎвЂљР С•Р С–Р С•:</span>
                  <span className="text-lg font-medium text-foreground">{formatPrice(getCartTotal())}</span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
                  >
                    Р С›РЎвЂЎР С‘РЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={handlePurchase}
                    disabled={getCartTotal() > userBalance}
                    className={`flex-1 rounded-2xl p-3 text-sm font-medium transition-transform ${
                      getCartTotal() > userBalance
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:scale-[0.98]'
                    }`}
                  >
                    Р С™РЎС“Р С—Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Р…Р ВµР Т‘Р С•РЎРѓРЎвЂљР В°РЎвЂљР С•РЎвЂЎР Р…Р С• РЎРѓРЎР‚Р ВµР Т‘РЎРѓРЎвЂљР Р† */}
      <Dialog open={isInsufficientFundsOpen} onOpenChange={setIsInsufficientFundsOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-sm p-6 [&>button]:hidden">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-red-500" />
            </div>
            
            <DialogTitle className="text-lg font-medium text-foreground mb-2">
              Р СњР ВµР Т‘Р С•РЎРѓРЎвЂљР В°РЎвЂљР С•РЎвЂЎР Р…Р С• РЎРѓРЎР‚Р ВµР Т‘РЎРѓРЎвЂљР Р†
            </DialogTitle>
            
            <DialogDescription className="text-sm text-muted-foreground mb-6">
              Р Р€ Р Р†Р В°РЎРѓ Р Р…Р ВµР Т‘Р С•РЎРѓРЎвЂљР В°РЎвЂљР С•РЎвЂЎР Р…Р С• Р СР С•Р Р…Р ВµРЎвЂљ Р Т‘Р В»РЎРЏ РЎРѓР С•Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р С‘РЎРЏ Р С—Р С•Р С”РЎС“Р С—Р С”Р С‘. Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ Р В·Р В°Р Т‘Р В°Р Р…Р С‘РЎРЏ, РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р В·Р В°РЎР‚Р В°Р В±Р С•РЎвЂљР В°РЎвЂљРЎРЉ Р В±Р С•Р В»РЎРЉРЎв‚¬Р Вµ Р СР С•Р Р…Р ВµРЎвЂљ.
            </DialogDescription>
            
            <button
              onClick={() => setIsInsufficientFundsOpen(false)}
              className="w-full bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform"
            >
              Р СџР С•Р Р…РЎРЏРЎвЂљР Р…Р С•
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р вЂќР ВµРЎвЂљР В°Р В»Р С‘ РЎвЂљР С•Р Р†Р В°РЎР‚Р В° */}
      <Dialog open={isProductDetailOpen} onOpenChange={setIsProductDetailOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden">
          {selectedProduct && (
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className="text-lg font-medium text-foreground">
                  Р вЂќР ВµРЎвЂљР В°Р В»Р С‘ РЎвЂљР С•Р Р†Р В°РЎР‚Р В°
                </DialogTitle>
                <button
                  onClick={() => setIsProductDetailOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-foreground/70" />
                </button>
              </div>
              
              <DialogDescription className="sr-only">
                Р вЂќР ВµРЎвЂљР В°Р В»РЎРЉР Р…Р В°РЎРЏ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• РЎвЂљР С•Р Р†Р В°РЎР‚Р Вµ
              </DialogDescription>

              <div className="flex-1 overflow-y-auto space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center">
                    <selectedProduct.icon className="w-8 h-8 text-foreground/70" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-lg font-medium text-foreground mb-2">
                      {selectedProduct.name}
                    </div>
                    <div className="text-xl font-medium text-primary">
                      {formatPrice(selectedProduct.price)}
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedProduct.description}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsProductDetailOpen(false)}
                  className="flex-1 glass-card rounded-2xl p-3 text-sm font-medium text-foreground hover:scale-[0.98] transition-transform"
                >
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setIsProductDetailOpen(false);
                  }}
                  disabled={!canAfford(selectedProduct.price)}
                  className={`flex-1 rounded-2xl p-3 text-sm font-medium transition-transform ${
                    canAfford(selectedProduct.price)
                      ? 'bg-primary text-primary-foreground hover:scale-[0.98]'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Р вЂ™ Р С”Р С•РЎР‚Р В·Р С‘Р Р…РЎС“
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р В·Р В°Р С”Р В°Р В·Р С•Р Р† */}
      <Dialog open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-md p-0 max-h-[80vh] flex flex-col [&>button]:hidden">
          <div className="p-6 flex-1 flex flex-col">
            {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р В·Р В°Р С”Р В°Р В·Р С•Р Р† */}
            <div className="flex items-center justify-between mb-6">
              <DialogTitle className="text-lg font-medium text-foreground">
                Р СљР С•Р С‘ Р В·Р В°Р С”Р В°Р В·РЎвЂ№
              </DialogTitle>
              <button
                onClick={() => setIsOrdersOpen(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
            
            <DialogDescription className="sr-only">
              Р РЋР С—Р С‘РЎРѓР С•Р С” Р Р†Р В°РЎв‚¬Р С‘РЎвЂ¦ Р В·Р В°Р С”Р В°Р В·Р С•Р Р† Р С‘ Р С‘РЎвЂ¦ РЎРѓРЎвЂљР В°РЎвЂљРЎС“РЎРѓ
            </DialogDescription>

            {/* Р вЂ™Р С”Р В»Р В°Р Т‘Р С”Р С‘ Р В·Р В°Р С”Р В°Р В·Р С•Р Р† */}
            <div className="flex gap-2 p-1 glass-card rounded-2xl mb-4">
              <button
                onClick={() => setOrderTab('active')}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                  orderTab === 'active'
                    ? 'bg-foreground text-background apple-shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ ({activeOrders.length})
              </button>
              <button
                onClick={() => setOrderTab('completed')}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex-1 text-center transition-all ${
                  orderTab === 'completed'
                    ? 'bg-foreground text-background apple-shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№Р Вµ ({completedOrders.length})
              </button>
            </div>

            {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р В·Р В°Р С”Р В°Р В·Р С•Р Р† */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {(orderTab === 'active' ? activeOrders : completedOrders).map((order) => (
                <div key={order.id} className="glass-card rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        Р вЂ”Р В°Р С”Р В°Р В· #{order.id}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {formatPrice(order.total)}
                      </div>
                      <div className={`text-xs ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 glass-card rounded flex items-center justify-center">
                          <item.product.icon className="w-3 h-3 text-foreground/70" />
                        </div>
                        <div className="flex-1 text-xs text-muted-foreground">
                          {item.product.name} Р“вЂ” {item.quantity}
                        </div>
                        <div className="text-xs text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.status === 'approved' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleShowTracking(order)}
                        className="flex-1 glass-card rounded-lg p-2 text-xs font-medium text-foreground hover:scale-[0.98] transition-transform"
                      >
                        Р С›РЎвЂљРЎРѓР В»Р ВµР Т‘Р С‘РЎвЂљРЎРЉ
                      </button>
                      <button
                        onClick={() => handleMarkAsReceived(order.id)}
                        className="flex-1 bg-green-500 text-white rounded-lg p-2 text-xs font-medium hover:scale-[0.98] transition-transform"
                      >
                        Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С•
                      </button>
                    </div>
                  )}

                  {order.status === 'received' && order.completedDate && (
                    <div className="text-xs text-green-600">
                      Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С•: {order.completedDate}
                    </div>
                  )}
                </div>
              ))}

              {(orderTab === 'active' ? activeOrders : completedOrders).length === 0 && (
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground text-center">
                    {orderTab === 'active' ? 'Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р С”Р В°Р В·Р С•Р Р† Р Р…Р ВµРЎвЂљ' : 'Р вЂ”Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р С”Р В°Р В·Р С•Р Р† Р Р…Р ВµРЎвЂљ'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С•РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘РЎРЏ */}
      <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
        <DialogContent className="glass-card rounded-3xl border-2 border-border apple-shadow w-[90vw] max-w-sm p-6 [&>button]:hidden">
          <div className="text-center">
            <DialogTitle className="text-lg font-medium text-foreground mb-4">
              Р С›РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘Р Вµ Р В·Р В°Р С”Р В°Р В·Р В°
            </DialogTitle>
            
            <DialogDescription className="sr-only">
              Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С•Р В± Р С•РЎвЂљРЎРѓР В»Р ВµР В¶Р С‘Р Р†Р В°Р Р…Р С‘Р С‘ Р В·Р В°Р С”Р В°Р В·Р В°
            </DialogDescription>
            
            {selectedOrder && (
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-4">
                  <div className="text-sm font-medium text-foreground mb-2">
                    Р вЂ”Р В°Р С”Р В°Р В· #{selectedOrder.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ: {getStatusText(selectedOrder.status)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Р вЂќР В°РЎвЂљР В° Р В·Р В°Р С”Р В°Р В·Р В°: {selectedOrder.date}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Р вЂ™Р В°РЎв‚¬ Р В·Р В°Р С”Р В°Р В· Р С•Р В±РЎР‚Р В°Р В±Р В°РЎвЂљРЎвЂ№Р Р†Р В°Р ВµРЎвЂљРЎРѓРЎРЏ Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р С•Р С. Р вЂ™РЎвЂ№ Р С—Р С•Р В»РЎС“РЎвЂЎР С‘РЎвЂљР Вµ РЎС“Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘Р Вµ, Р С”Р С•Р С–Р Т‘Р В° Р В·Р В°Р С”Р В°Р В· Р В±РЎС“Р Т‘Р ВµРЎвЂљ Р С–Р С•РЎвЂљР С•Р Р† Р С” Р С—Р С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘РЎР‹.
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsTrackingOpen(false)}
              className="w-full bg-primary text-primary-foreground rounded-2xl p-3 text-sm font-medium hover:scale-[0.98] transition-transform mt-6"
            >
              Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}
