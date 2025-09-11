import { useState, useEffect } from 'react';
import { useTelegram } from './utils/telegram';

export default function App() {
  const { user, webApp } = useTelegram();

  // Telegram Web App initialization
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          GRITHER - Приложение для Telegram
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ваши достижения</h2>
            <p className="text-gray-300">Просмотр достижений</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Статус</h2>
            <p className="text-gray-300">XP: 0 | Уровень: 1</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Баттлы</h2>
            <p className="text-gray-300">Активные баттлы</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Рейтинг</h2>
            <p className="text-gray-300">По уровню</p>
          </div>
        </div>
      </div>
    </div>
  );
}