import React, { useState } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface CasesShopPageProps {
  onNavigate: (page: string) => void;
  caseTypes: any[];
  setCaseTypes: (cases: any[]) => void;
  userCases: any[];
  setUserCases: (cases: any[]) => void;
  shopItems: any[];
  setShopItems: (items: any[]) => void;
  orders: any[];
  setOrders: (orders: any[]) => void;
  theme: 'light' | 'dark';
}

export const CasesShopPage: React.FC<CasesShopPageProps> = ({
  onNavigate,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'free' | 'shop' | 'my'>('free');

  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={() => {}}
        theme={theme}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        {/* Tabs */}
        <div className={`flex rounded-2xl p-1 mb-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setActiveTab('free')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'free'
                ? theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-blue-500 text-white'
                : 'text-gray-500'
            }`}
          >
            БЕСПЛАТНЫЙ
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'shop'
                ? theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-blue-500 text-white'
                : 'text-gray-500'
            }`}
          >
            МАГАЗИН
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'my'
                ? theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-blue-500 text-white'
                : 'text-gray-500'
            }`}
          >
            МОИ КЕЙСЫ
          </button>
        </div>

        {/* Free Tab Content */}
        {activeTab === 'free' && (
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <h2 className="text-xl font-semibold text-center mb-6">БЕСПЛАТНЫЙ КЕЙС</h2>
            
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-6xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">БЕСПЛАТНЫЙ КЕЙС GRITHER</h3>
              <p className="text-gray-400 text-sm">Получите случайный кейс совершенно бесплатно каждые 24 часа!</p>
            </div>
            
            <button className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold">
              ОТКРЫТЬ БЕСПЛАТНЫЙ КЕЙС
            </button>
          </div>
        )}

        {/* Shop Tab Content */}
        {activeTab === 'shop' && (
          <div className="space-y-4">
            <div className={`p-6 rounded-3xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/80 border-gray-200'
            }`}>
              <h3 className="text-lg font-semibold mb-4">Товары магазина</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-medium">Бонус опыта 2x</div>
                      <div className="text-sm text-gray-400">500g</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                    В КОРЗИНУ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Cases Tab Content */}
        {activeTab === 'my' && (
          <div className={`p-6 rounded-3xl border ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/80 border-gray-200'
          }`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <div className="text-gray-400">Пусто</div>
              <div className="text-sm text-gray-500">Здесь появятся полученные кейсы</div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation 
        currentPage="cases"
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
};
