import React from 'react';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🚀 Grither App</h1>
          <p className="text-xl mb-8">Добро пожаловать в ваше приложение!</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">✨ Статус</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Frontend:</span>
                <span className="text-green-400">✅ Работает</span>
              </div>
              <div className="flex justify-between">
                <span>Backend:</span>
                <span className="text-yellow-400">⏳ Загружается...</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-yellow-400">⏳ Подключается...</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-300">
            <p>Приложение успешно задеплоено на Render!</p>
            <p>Скоро здесь будет полный функционал.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
