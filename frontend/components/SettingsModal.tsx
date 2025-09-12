import React from 'react';

interface SettingsModalProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onOpenAdminPanel?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  theme,
  setTheme,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Настройки</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Тема</div>
              <div className="text-sm text-gray-500">Переключение темы приложения</div>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`w-12 h-6 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};