import { useState, useEffect } from 'react';

// Utility function for monitoring localStorage
const getLocalStorageSize = () => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

// Function for cleaning up localStorage when full
const cleanupLocalStorage = () => {
  const keysToRemove = [
    'oldCases', 'tempCases', 'backup_cases', 'cache_', 'temp_'
  ];
  
  keysToRemove.forEach(keyPattern => {
    Object.keys(localStorage).forEach(key => {
      if (key.includes(keyPattern)) {
        localStorage.removeItem(key);
        console.log(`Removed key: ${key}`);
      }
    });
  });
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Telegram Web App initialization
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            GRITHER
          </h1>
          <p className="text-lg text-gray-400">
            Приложение для Telegram
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Ваши достижения</h2>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">👁️</span>
              </div>
            </div>
            <p className="text-gray-300">
              Нет достижений в процессе выполнения
            </p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Статус</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Статус: Новичок</span>
              <span className="text-sm">XP: 0</span>
              <span className="text-sm">lvl 1</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Баттлы</h2>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">+</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-400 mb-2">Активные баттлы</div>
              <div className="bg-gray-700 p-3 rounded border border-blue-500">
                <div className="text-sm">Елена Морозова VS Вы</div>
              </div>
              <div className="bg-gray-700 p-3 rounded border border-blue-500">
                <div className="text-sm">Алексей Козлов VS Анна Иванова</div>
              </div>
              <div className="text-sm text-gray-400">+1 еще</div>
              <div className="text-sm text-gray-400 mt-3 mb-2">Приглашения</div>
              <div className="bg-gray-700 p-3 rounded border border-blue-500">
                <div className="text-sm">Мария Силопова вызывает</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Рейтинг</h2>
              <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">
                <span className="text-xs">☰</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-400 mb-2">По уровню</div>
              <div className="space-y-2">
                <div className="text-sm">1. Петр Петров Ур.18</div>
                <div className="text-sm">2. Елена Мороз... Ур.16</div>
                <div className="text-sm">3. Анна Иванова Ур.15</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
          <div className="flex justify-around py-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm">🏠</span>
              </div>
              <span className="text-xs text-blue-400">Главная</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm">🏆</span>
              </div>
              <span className="text-xs text-gray-400">Достижения</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-xs text-gray-400">Задачи</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mb-1">
                <span className="text-sm">🛒</span>
              </div>
              <span className="text-xs text-gray-400">Магазин</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}