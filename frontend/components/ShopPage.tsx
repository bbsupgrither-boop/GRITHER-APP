import React, { useState } from 'react';
import { ShoppingCart, Star, Coins, Gift, Package } from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isPurchased: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ShopPageProps {
  user: {
    coins: number;
    level: number;
  };
}

export const ShopPage: React.FC<ShopPageProps> = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<ShopItem[]>([
    {
      id: '1',
      name: 'Базовый аватар',
      description: 'Простой аватар для начала',
      price: 100,
      category: 'avatars',
      rarity: 'common',
      isPurchased: false
    },
    {
      id: '2',
      name: 'Золотой аватар',
      description: 'Эксклюзивный золотой аватар',
      price: 500,
      category: 'avatars',
      rarity: 'rare',
      isPurchased: false
    },
    {
      id: '3',
      name: 'Кейс с наградами',
      description: 'Случайные награды и предметы',
      price: 200,
      category: 'cases',
      rarity: 'common',
      isPurchased: false
    },
    {
      id: '4',
      name: 'Премиум кейс',
      description: 'Редкие награды и предметы',
      price: 1000,
      category: 'cases',
      rarity: 'epic',
      isPurchased: false
    },
    {
      id: '5',
      name: 'Бустер опыта',
      description: '+50% опыта на 24 часа',
      price: 300,
      category: 'boosters',
      rarity: 'rare',
      isPurchased: false
    },
    {
      id: '6',
      name: 'Легендарный аватар',
      description: 'Самая редкая и красивая аватарка',
      price: 2000,
      category: 'avatars',
      rarity: 'legendary',
      isPurchased: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'Все товары', icon: Package },
    { id: 'avatars', name: 'Аватары', icon: Star },
    { id: 'cases', name: 'Кейсы', icon: Gift },
    { id: 'boosters', name: 'Бустеры', icon: Coins }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Обычный';
      case 'rare': return 'Редкий';
      case 'epic': return 'Эпический';
      case 'legendary': return 'Легендарный';
      default: return 'Неизвестно';
    }
  };

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const purchaseItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && !item.isPurchased && user.coins >= item.price) {
      setItems(items.map(i => 
        i.id === itemId ? { ...i, isPurchased: true } : i
      ));
      // Здесь можно добавить логику обновления баланса пользователя
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Магазин</h1>
              <p className="text-gray-600 mt-1">Покупайте предметы за монеты</p>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-lg">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">{user.coins}</span>
              </div>
              </div>
            </div>
          </div>

      {/* Categories */}
      <div className="px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
            <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
            </button>
            );
          })}
          </div>
        </div>

      {/* Items Grid */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-2 ${getRarityColor(item.rarity)} ${
                item.isPurchased ? 'opacity-60' : ''
              }`}
            >
              {/* Item Image Placeholder */}
              <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
            </div>

              {/* Item Info */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                    item.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    item.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {getRarityLabel(item.rarity)}
                      </span>
                    </div>
                <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold text-gray-900">{item.price}</span>
              </div>
            </div>
          </div>

              {/* Purchase Button */}
              {item.isPurchased ? (
                    <button
                  disabled
                  className="w-full bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed"
                >
                  Куплено
                  </button>
              ) : (
                            <button
                  onClick={() => purchaseItem(item.id)}
                  disabled={user.coins < item.price}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    user.coins >= item.price
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {user.coins >= item.price ? 'Купить' : 'Недостаточно монет'}
                        </button>
              )}
                        </div>
                      ))}
                    </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Товары не найдены</h3>
            <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
                </div>
              )}
      </div>
    </div>
  );
};
