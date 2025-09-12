import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  User, 
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Volume2,
  VolumeX,
  Globe,
  Lock,
  Users,
  Settings as SettingsIcon
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  userRole: 'user' | 'admin';
  onNavigate: (page: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  setTheme,
  userRole,
  onNavigate
}) => {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sound: true,
    vibration: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    battleHistoryVisible: true,
    achievementsVisible: true
  });
  const [language, setLanguage] = useState('ru');
  const [volume, setVolume] = useState(80);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleAdminAccess = () => {
    onNavigate('admin');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Настройки</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              Внешний вид
            </h3>
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'light' ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-400" />
                  )}
                  <span className="text-sm">Темная тема</span>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="transition-colors"
                >
                  {theme === 'dark' ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Уведомления
            </h3>
            <div className={`p-4 rounded-xl border space-y-4 ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push уведомления</span>
                <button
                  onClick={() => handleNotificationToggle('push')}
                  className="transition-colors"
                >
                  {notifications.push ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Email уведомления</span>
                <button
                  onClick={() => handleNotificationToggle('email')}
                  className="transition-colors"
                >
                  {notifications.email ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {notifications.sound ? (
                    <Volume2 className="w-4 h-4 text-blue-500" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm">Звук</span>
                </div>
                <button
                  onClick={() => handleNotificationToggle('sound')}
                  className="transition-colors"
                >
                  {notifications.sound ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Вибрация</span>
                <button
                  onClick={() => handleNotificationToggle('vibration')}
                  className="transition-colors"
                >
                  {notifications.vibration ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Язык
            </h3>
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Русский</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Приватность
            </h3>
            <div className={`p-4 rounded-xl border space-y-4 ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Видимый профиль</span>
                <button
                  onClick={() => handlePrivacyToggle('profileVisible')}
                  className="transition-colors"
                >
                  {privacy.profileVisible ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">История баттлов</span>
                <button
                  onClick={() => handlePrivacyToggle('battleHistoryVisible')}
                  className="transition-colors"
                >
                  {privacy.battleHistoryVisible ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Достижения</span>
                <button
                  onClick={() => handlePrivacyToggle('achievementsVisible')}
                  className="transition-colors"
                >
                  {privacy.achievementsVisible ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Volume */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Громкость
            </h3>
            <div className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <VolumeX className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
                />
                <Volume2 className="w-4 h-4 text-blue-500" />
                <span className="text-sm w-8 text-center">{volume}%</span>
              </div>
            </div>
          </div>

          {/* Admin Access */}
          {userRole === 'admin' && (
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Администрирование
              </h3>
              <button
                onClick={handleAdminAccess}
                className={`w-full p-4 rounded-xl border transition-all ${
                  theme === 'dark' 
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700/70' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium">Панель администратора</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          )}

          {/* Account */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Аккаунт
            </h3>
            <div className={`p-4 rounded-xl border space-y-3 ${
              theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <button className="w-full text-left">
                <span className="text-sm text-red-500">Выйти из аккаунта</span>
              </button>
              <button className="w-full text-left">
                <span className="text-sm text-red-500">Удалить аккаунт</span>
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-blue-500 text-white font-medium"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};