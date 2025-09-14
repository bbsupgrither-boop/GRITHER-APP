import React, { useState } from 'react';
import { ShoppingBag, Package } from 'lucide-react';
import { CaseType, UserCase } from '../../types/cases';
import { ShopItem } from '../../types/shop';
import { User } from '../../types/global';
import { Notification } from '../../types/notifications';

interface ShopPageProps {
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

export default function ShopPage({
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
}: ShopPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('cases');

  // AUTOGEN START shop-content
  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="unified-heading">Магазин</h1>
            <p className="unified-text text-muted-foreground">
              💰 {userCoins} G-монет
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-1 mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex-1 p-3 rounded-lg text-center transition-all ${
              activeTab === 'cases'
                ? 'bg-blue-500 text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Package className="w-4 h-4 mx-auto mb-1" />
            <span className="unified-text text-xs">Кейсы</span>
          </button>
          
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 p-3 rounded-lg text-center transition-all ${
              activeTab === 'shop'
                ? 'bg-blue-500 text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShoppingBag className="w-4 h-4 mx-auto mb-1" />
            <span className="unified-text text-xs">Магазин</span>
          </button>
          
          <button
            onClick={() => setActiveTab('roulette')}
            className={`flex-1 p-3 rounded-lg text-center transition-all ${
              activeTab === 'roulette'
                ? 'bg-blue-500 text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-lg mb-1">🎰</span>
            <span className="unified-text text-xs">Рулетка</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'cases' && (
        <div className="space-y-3">
          {userCases.map((userCase) => (
            <div key={userCase.id} className="glass-card p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="unified-text font-medium">{userCase.name}</h3>
                  <p className="unified-text text-muted-foreground text-sm mb-2">
                    {userCase.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="unified-text text-sm">💰 {userCase.price} монет</span>
                    <span className="unified-text text-sm">📦 {userCase.quantity} шт</span>
                  </div>
                </div>
                <button 
                  className="apple-button px-4 py-2"
                  disabled={userCoins < userCase.price}
                  aria-label={`Купить ${userCase.name}`}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
          
          {userCases.length === 0 && (
            <div className="glass-card p-8 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="unified-heading mb-2">Нет кейсов</h3>
              <p className="unified-text text-muted-foreground">
                Кейсы скоро появятся в магазине
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'shop' && (
        <div className="space-y-3">
          {shopItems.map((item) => (
            <div key={item.id} className="glass-card p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛍️</span>
                </div>
                <div className="flex-1">
                  <h3 className="unified-text font-medium">{item.name}</h3>
                  <p className="unified-text text-muted-foreground text-sm mb-2">
                    {item.description}
                  </p>
                  <span className="unified-text text-sm">💰 {item.price} монет</span>
                </div>
                <button 
                  className="apple-button px-4 py-2"
                  disabled={userCoins < item.price}
                  aria-label={`Купить ${item.name}`}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
          
          {shopItems.length === 0 && (
            <div className="glass-card p-8 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="unified-heading mb-2">Магазин пуст</h3>
              <p className="unified-text text-muted-foreground">
                Товары скоро появятся
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'roulette' && (
        <div className="glass-card p-8 text-center">
          <span className="text-6xl mb-4 block">🎰</span>
          <h3 className="unified-heading mb-2">Рулетка</h3>
          <p className="unified-text text-muted-foreground mb-4">
            Сыграйте в рулетку и выиграйте призы!
          </p>
          <button className="apple-button px-6 py-3" aria-label="Играть в рулетку">
            🎲 Играть (100 монет)
          </button>
        </div>
      )}
    </div>
  );
  // AUTOGEN END shop-content
}
