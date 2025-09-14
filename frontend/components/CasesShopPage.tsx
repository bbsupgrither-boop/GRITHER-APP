import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { 
  ShoppingBag, 
  Gift, 
  Coins, 
  Star, 
  Zap, 
  Crown,
  Play,
  X,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Package,
  Trophy,
  Sparkles
} from 'lucide-react';
import { CaseType, UserCase, CaseShopItem, Prize } from '../types/cases';
import { ShopItem } from '../types/shop';
import { User } from '../types/global';
import { Notification } from '../types/notifications';

interface CasesShopPageProps {
  onNavigate: (page: string) => void;
  cases: CaseType[];
  setCases: (cases: CaseType[]) => void;
  userCases: UserCase[];
  setUserCases: (userCases: UserCase[]) => void;
  shopItems: ShopItem[];
  setShopItems: (shopItems: ShopItem[]) => void;
  userCoins: number;
  setUserCoins: (coins: number) => void;
  theme: 'light' | 'dark';
  user?: User;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onRemoveNotification?: (id: string) => void;
  onClearAllNotifications?: () => void;
  onOpenSettings?: () => void;
}

type TabType = 'cases' | 'shop' | 'roulette';

export const CasesShopPage: React.FC<CasesShopPageProps> = ({
  onNavigate,
  cases,
  setCases,
  userCases,
  setUserCases,
  shopItems,
  setShopItems,
  userCoins,
  setUserCoins,
  theme,
  user,
  notifications = [],
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  onOpenSettings = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('cases');
  const [selectedCase, setSelectedCase] = useState<CaseType | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isRouletteSpinning, setIsRouletteSpinning] = useState(false);
  const [rouletteResult, setRouletteResult] = useState<Prize | null>(null);
  const [isRouletteModalOpen, setIsRouletteModalOpen] = useState(false);
  const [selectedShopItem, setSelectedShopItem] = useState<ShopItem | null>(null);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);

  // Roulette animation refs
  const rouletteRef = useRef<HTMLDivElement>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock roulette prizes
  const roulettePrizes: Prize[] = [
    { id: 'r1', name: '100 монет', type: 'coins', amount: 100, rarity: 'common' },
    { id: 'r2', name: '500 монет', type: 'coins', amount: 500, rarity: 'rare' },
    { id: 'r3', name: '1000 монет', type: 'coins', amount: 1000, rarity: 'epic' },
    { id: 'r4', name: 'Редкий кейс', type: 'case', caseId: 'case2', rarity: 'rare' },
    { id: 'r5', name: 'Эпический кейс', type: 'case', caseId: 'case3', rarity: 'epic' },
    { id: 'r6', name: 'Легендарный кейс', type: 'case', caseId: 'case4', rarity: 'legendary' },
    { id: 'r7', name: '50 монет', type: 'coins', amount: 50, rarity: 'common' },
    { id: 'r8', name: '200 монет', type: 'coins', amount: 200, rarity: 'common' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'epic': return <Star className="w-4 h-4" />;
      case 'rare': return <Zap className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleCaseClick = (caseItem: CaseType) => {
    if (userCoins >= caseItem.price) {
      setSelectedCase(caseItem);
      setIsCaseModalOpen(true);
    }
  };

  const handleCasePurchase = () => {
    if (selectedCase && userCoins >= selectedCase.price) {
      setUserCoins(userCoins - selectedCase.price);
      
      // Add case to user's inventory
      const newUserCase: UserCase = {
        id: Date.now().toString(),
        caseId: selectedCase.id,
        userId: 'user1',
        opened: false,
        obtainedAt: new Date().toISOString()
      };
      
      setUserCases([...userCases, newUserCase]);
      setIsCaseModalOpen(false);
      setSelectedCase(null);
    }
  };

  const handleRouletteSpin = () => {
    if (isRouletteSpinning || userCoins < 100) return;
    
    setIsRouletteSpinning(true);
    setUserCoins(userCoins - 100);
    
    // Random result
    const randomPrize = roulettePrizes[Math.floor(Math.random() * roulettePrizes.length)];
    
    // Spin animation
    if (rouletteRef.current) {
      rouletteRef.current.style.transform = 'rotate(1800deg)';
    }
    
    spinTimeoutRef.current = setTimeout(() => {
      setRouletteResult(randomPrize);
      setIsRouletteSpinning(false);
      setIsRouletteModalOpen(true);
      
      // Reset roulette
      if (rouletteRef.current) {
        rouletteRef.current.style.transform = 'rotate(0deg)';
      }
      
      // Award prize
      if (randomPrize.type === 'coins') {
        setUserCoins(prev => prev + randomPrize.amount);
      } else if (randomPrize.type === 'case') {
        const newUserCase: UserCase = {
          id: Date.now().toString(),
          caseId: randomPrize.caseId!,
          userId: 'user1',
          opened: false,
          obtainedAt: new Date().toISOString()
        };
        setUserCases([...userCases, newUserCase]);
      }
    }, 3000);
  };

  const handleShopItemClick = (item: ShopItem) => {
    setSelectedShopItem(item);
    setIsShopModalOpen(true);
  };

  const handleShopPurchase = () => {
    if (selectedShopItem && userCoins >= selectedShopItem.price) {
      setUserCoins(userCoins - selectedShopItem.price);
      setIsShopModalOpen(false);
      setSelectedShopItem(null);
    }
  };

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <BackgroundFX theme={theme} />
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        theme={theme}
        user={user}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        {/* Coins Display */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-semibold">Ваши монеты</span>
            </div>
            <span className="text-2xl font-bold text-yellow-500">{userCoins}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className={`p-1 rounded-2xl border mb-6 ${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          <div className="flex">
            {[
              { key: 'cases', label: 'Кейсы', icon: Package },
              { key: 'shop', label: 'Магазин', icon: ShoppingBag },
              { key: 'roulette', label: 'Рулетка', icon: RotateCcw }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as TabType)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                  activeTab === key
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-white/10'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cases Tab */}
        {activeTab === 'cases' && (
          <div className="space-y-4">
            {cases.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">Нет доступных кейсов</div>
              </div>
            ) : (
              cases.map((caseItem) => (
                <div 
                  key={caseItem.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer hover:scale-98 ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                      : 'bg-white/80 border-gray-200 hover:bg-white/90'
                  } ${userCoins < caseItem.price ? 'opacity-50' : ''}`}
                  onClick={() => handleCaseClick(caseItem)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getRarityColor(caseItem.rarity)}`}>
                      {getRarityIcon(caseItem.rarity)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{caseItem.name}</div>
                      <div className="text-sm text-gray-400 mb-2">{caseItem.description}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{caseItem.price}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          caseItem.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                          caseItem.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                          caseItem.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {caseItem.rarity === 'legendary' ? 'Легендарный' :
                           caseItem.rarity === 'epic' ? 'Эпический' :
                           caseItem.rarity === 'rare' ? 'Редкий' : 'Обычный'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <div className="space-y-4">
            {shopItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">Нет доступных товаров</div>
              </div>
            ) : (
              shopItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer hover:scale-98 ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                      : 'bg-white/80 border-gray-200 hover:bg-white/90'
                  } ${userCoins < item.price ? 'opacity-50' : ''}`}
                  onClick={() => handleShopItemClick(item)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{item.name}</div>
                      <div className="text-sm text-gray-400 mb-2">{item.description}</div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Roulette Tab */}
        {activeTab === 'roulette' && (
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Колесо удачи</h3>
              <p className="text-sm text-gray-400 mb-4">
                Потратьте 100 монет для вращения рулетки
              </p>
            </div>

            {/* Roulette Wheel */}
            <div className="relative mb-6">
              <div 
                ref={rouletteRef}
                className="w-64 h-64 mx-auto rounded-full border-8 border-gray-300 bg-gradient-to-br from-blue-400 to-purple-600 transition-transform duration-3000 ease-out"
                style={{ transform: 'rotate(0deg)' }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  {roulettePrizes.map((prize, index) => (
                    <div
                      key={prize.id}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${(360 / roulettePrizes.length) * index}deg)`,
                        transformOrigin: 'center'
                      }}
                    >
                      <div 
                        className={`w-0 h-0 border-l-32 border-r-32 border-b-16 border-l-transparent border-r-transparent ${
                          index % 2 === 0 ? 'border-b-gray-200' : 'border-b-gray-300'
                        }`}
                        style={{
                          transform: 'translate(50%, 100%)',
                          transformOrigin: 'center'
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500" />
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleRouletteSpin}
              disabled={isRouletteSpinning || userCoins < 100}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                isRouletteSpinning || userCoins < 100
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {isRouletteSpinning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Вращение...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Вращать за 100 монет
                </div>
              )}
            </button>

            {/* Available Prizes */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Возможные призы:</h4>
              <div className="grid grid-cols-2 gap-2">
                {roulettePrizes.slice(0, 6).map((prize) => (
                  <div key={prize.id} className={`p-2 rounded-lg text-xs ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                  }`}>
                    <div className="font-medium">{prize.name}</div>
                    <div className={`text-xs ${
                      prize.rarity === 'legendary' ? 'text-yellow-400' :
                      prize.rarity === 'epic' ? 'text-purple-400' :
                      prize.rarity === 'rare' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      {prize.rarity === 'legendary' ? 'Легендарный' :
                       prize.rarity === 'epic' ? 'Эпический' :
                       prize.rarity === 'rare' ? 'Редкий' : 'Обычный'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation 
        currentPage="shop"
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Case Purchase Modal */}
      {isCaseModalOpen && selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Покупка кейса</h2>
              <button
                onClick={() => setIsCaseModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getRarityColor(selectedCase.rarity)}`}>
                  {getRarityIcon(selectedCase.rarity)}
                </div>
                <div>
                  <div className="font-semibold text-lg">{selectedCase.name}</div>
                  <div className="text-sm text-gray-400">{selectedCase.description}</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Цена:</span>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{selectedCase.price}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">Ваши монеты:</span>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{userCoins}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCaseModalOpen(false)}
                  className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Отменить
                </button>
                <button
                  onClick={handleCasePurchase}
                  disabled={userCoins < selectedCase.price}
                  className={`flex-1 py-2 px-4 rounded-xl ${
                    userCoins < selectedCase.price
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shop Item Modal */}
      {isShopModalOpen && selectedShopItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Покупка товара</h2>
              <button
                onClick={() => setIsShopModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{selectedShopItem.name}</div>
                  <div className="text-sm text-gray-400">{selectedShopItem.description}</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Цена:</span>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{selectedShopItem.price}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">Ваши монеты:</span>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{userCoins}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsShopModalOpen(false)}
                  className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Отменить
                </button>
                <button
                  onClick={handleShopPurchase}
                  disabled={userCoins < selectedShopItem.price}
                  className={`flex-1 py-2 px-4 rounded-xl ${
                    userCoins < selectedShopItem.price
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Roulette Result Modal */}
      {isRouletteModalOpen && rouletteResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Поздравляем!</h2>
              <p className="text-lg mb-4">Вы выиграли:</p>
              
              <div className={`p-4 rounded-xl border mb-6 ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="font-semibold text-lg mb-2">{rouletteResult.name}</div>
                <div className={`text-sm ${
                  rouletteResult.rarity === 'legendary' ? 'text-yellow-400' :
                  rouletteResult.rarity === 'epic' ? 'text-purple-400' :
                  rouletteResult.rarity === 'rare' ? 'text-blue-400' :
                  'text-gray-400'
                }`}>
                  {rouletteResult.rarity === 'legendary' ? 'Легендарный приз!' :
                   rouletteResult.rarity === 'epic' ? 'Эпический приз!' :
                   rouletteResult.rarity === 'rare' ? 'Редкий приз!' : 'Обычный приз'}
                </div>
              </div>

              <button
                onClick={() => setIsRouletteModalOpen(false)}
                className="w-full py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold"
              >
                Отлично!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};