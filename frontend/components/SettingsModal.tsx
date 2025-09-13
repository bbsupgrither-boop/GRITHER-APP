import React, { useState, useEffect } from 'react';
import { X, Bell, Palette, MessageCircle, Shield, Eye, EyeOff, Paperclip, ChevronRight } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate?: (page: string) => void;
  onOpenAdminPanel?: () => void;
}

// База данных администраторов
const ADMIN_USERS = [
  // 🏆 ГЛАВНЫЕ АДМИНЫ (высшие права)
  { telegramId: '123456789', username: 'ivan_petrov', role: 'главный_админ' },
  { telegramId: '987654321', username: 'maria_sidorova', role: 'главный_админ' },
  
  // 🥇 СТАРШИЕ АДМИНЫ
  { telegramId: '111222333', username: 'alexey_kozlov', role: 'старший_админ' },
  { telegramId: '444555666', username: 'elena_morozova', role: 'старший_админ' },
  { telegramId: '1609556178', username: 'admin_senior', role: 'старший_админ' },
  
  // 🥈 МЛАДШИЕ АДМИНЫ
  { telegramId: '777888999', username: 'dmitry_volkov', role: 'младший_админ' },
  { telegramId: '000111222', username: 'anna_lebedeva', role: 'младший_админ' },
  
  // 👥 ТИМЛИДЫ
  { telegramId: '333444555', username: 'sergey_orlov', role: 'тимлид', teamNumber: 1 },
  { telegramId: '666777888', username: 'olga_sokolova', role: 'тимлид', teamNumber: 2 },
  { telegramId: '999000111', username: 'mikhail_rybakov', role: 'тимлид', teamNumber: 3 }
];

// Секретные коды доступа
const SECRET_CODES = {
  'df1GE%LwVAAC': 'главный_админ',    // Полный доступ ко всем функциям
  '0caFyNh}w%': 'старший_админ',      // Управление пользователями, контентом
  '~3SogEhz': 'младший_админ',        // Модерация, просмотр статистики
  'SToU{~': 'тимлид'                  // Управление командой, задачами
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onNavigate,
  onOpenAdminPanel
}) => {
  const [notifications, setNotifications] = useState(true);
  const [themeToggleCount, setThemeToggleCount] = useState(0);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [secretCodeModalOpen, setSecretCodeModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [telegramId, setTelegramId] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Загрузка сохраненного состояния при инициализации
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications !== null) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Проверяем авторизацию админа
    const adminData = localStorage.getItem('adminLoginData');
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        if (parsedData.telegramId && parsedData.accessCode) {
          setAdminAuthorized(true);
        }
      } catch (error) {
        console.error('Ошибка при проверке админских данных:', error);
      }
    }
  }, []);

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', JSON.stringify(checked));
  };

  const handleThemeToggle = () => {
    // ⚠️ ВАЖНО: Считаем только ВКЛЮЧЕНИЯ темной темы (не выключения)
    if (theme === 'light') { // Если текущая тема светлая и переключаем на темную
      const newCount = themeToggleCount + 1;
      setThemeToggleCount(newCount);
      
      console.log(`🔢 Счетчик включений темной темы: ${newCount}/8`);
      
      // 🔐 СЕКРЕТНАЯ АКТИВАЦИЯ НА 8-М ВКЛЮЧЕНИИ
      if (newCount === 8) {
        console.log('🚀 СЕКРЕТНЫЙ КОД АКТИВИРОВАН!');
        setSecretCodeModalOpen(true);
        setThemeToggleCount(0); // Сбрасываем счетчик
      }
    }
    
    onToggleTheme(); // Выполняем обычное переключение темы
  };

  const handleReportSubmit = () => {
    const reportData = {
      text: reportText,
      file: selectedFile,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('📧 Отчет отправлен:', reportData);
    
    setReportModalOpen(false);
    setReportText('');
    setSelectedFile(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSecretCodeSubmit = () => {
    if (telegramId && secretCode) {
      // 1️⃣ ПРОВЕРКА ВАЛИДНОСТИ КОДА
      const role = SECRET_CODES[secretCode as keyof typeof SECRET_CODES];
      if (!role) {
        alert('❌ Неверный код доступа');
        return;
      }
      
      // 2️⃣ ПОИСК ПОЛЬЗОВАТЕЛЯ В БАЗЕ
        const user = ADMIN_USERS.find(u => 
          u.telegramId === telegramId && u.role === role
        );
        
      if (!user) {
        alert(`❌ Пользователь с ID ${telegramId} не найден в роли "${role}"`);
        return;
      }
      
      // 3️⃣ УСПЕШНАЯ АВТОРИЗАЦИЯ
      console.log('✅ Админ авторизован:', user);
      
      // Сохраняем данные для AdminPanel
          localStorage.setItem('adminLoginData', JSON.stringify({
            telegramId,
        accessCode: secretCode,
        role: user.role,
        username: user.username,
        loginTime: new Date().toISOString()
          }));
          
      // ✅ Устанавливаем флаг авторизации (КНОПКА ПОЯВИТСЯ В НАСТРОЙКАХ)
      setAdminAuthorized(true);
          
      // Закрываем секретный модал и очищаем поля
          setSecretCodeModalOpen(false);
          setTelegramId('');
          setSecretCode('');
      
      console.log('✅ Админ авторизован. Кнопка админ панели появилась в настройках.');
    }
  };

  const handleAdminPanelClick = () => {
    onOpenAdminPanel?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Settings Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{
          zIndex: 9998,
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div 
          className="w-full max-w-md rounded-2xl p-6"
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
          }}
        >
          {/* Заголовок модального окна */}
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Настройки
          </h3>
            
            {/* Кнопка закрытия - круглая с иконкой X */}
          <button
            onClick={onClose}
            style={{
                width: '32px', height: '32px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
              <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
          
          {/* Контейнер настроек */}
          <div style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '0',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            overflow: 'hidden'
          }}>
            
            {/* 1. НАСТРОЙКА УВЕДОМЛЕНИЙ */}
            <div style={{
                  height: '64px',
                  padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* Иконка колокольчика в круглом контейнере */}
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bell style={{ width: '18px', height: '18px' }} />
              </div>
              
              {/* Текстовый блок */}
              <div className="flex-1" style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Уведомления
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Управление уведомлениями
                </div>
              </div>
              
              {/* Тумблер уведомлений */}
              <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => handleNotificationsChange(e.target.checked)}
                  style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                />
                <div style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: notifications ? '#2B82FF' : '#E5E7EB',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: notifications ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }} />
                </div>
              </label>
                </div>
                
            {/* 2. НАСТРОЙКА ТЕМЫ (СЕКРЕТНАЯ ФУНКЦИЯ) */}
            <div style={{
              height: '64px',
              padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* Иконка палитры в круглом контейнере */}
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Palette style={{ width: '18px', height: '18px' }} />
                  </div>
              
              {/* Текстовый блок */}
              <div className="flex-1" style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Тема
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Переключение темы приложения
                  </div>
              </div>
              
              {/* Тумблер темы - секретная функция */}
              <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={handleThemeToggle}
                  style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                />
                <div style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: theme === 'dark' ? '#2B82FF' : '#E5E7EB',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: theme === 'dark' ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }} />
                </div>
              </label>
            </div>

            {/* 3. СООБЩИТЬ О ПРОБЛЕМЕ */}
            <button 
              onClick={() => setReportModalOpen(true)}
              style={{
                height: '64px',
                padding: '0 16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {/* Иконка сообщения в круглом контейнере */}
              <div style={{
                width: '28px', height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <MessageCircle style={{ width: '18px', height: '18px' }} />
              </div>
              
              {/* Текстовый блок */}
              <div className="flex-1" style={{ marginLeft: '12px', textAlign: 'left' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Сообщить о проблеме
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Отправить отчет разработчикам
                </div>
              </div>
            </button>

            {/* 4. КНОПКА АДМИН ПАНЕЛИ (ПОЯВЛЯЕТСЯ ПОСЛЕ АВТОРИЗАЦИИ) */}
            {adminAuthorized && (
              <button 
                onClick={handleAdminPanelClick}
                  style={{ 
                  height: '64px',
                  padding: '0 16px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {/* Иконка щита в круглом контейнере */}
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Shield style={{ width: '18px', height: '18px' }} />
                </div>
                
                {/* Текстовый блок */}
                <div className="flex-1" style={{ marginLeft: '12px', textAlign: 'left' }}>
                  <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Админ панель
                  </div>
                  <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    Панель управления системой
              </div>
            </div>
                
                {/* Стрелка вправо вместо тумблера */}
                <div className="w-5 h-5 flex items-center justify-center">
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
              style={{
            zIndex: 9999,
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <div 
            className="w-full max-w-md rounded-2xl p-6"
              style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Сообщить о проблеме</h3>
              <button 
                onClick={() => setReportModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
            </button>
          </div>

            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Опишите проблему подробно..."
              rows={4}
              style={{ height: '88px', borderRadius: '12px' }}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile ? selectedFile.name : 'Файл не выбран'}
                </span>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button className="p-3 rounded-lg bg-primary text-white">
                  <Paperclip style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setReportModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Отменить
              </button>
              <button 
                onClick={handleReportSubmit}
                disabled={!reportText.trim()}
                style={{
                  backgroundColor: reportText.trim() ? '#2B82FF' : '#E6E9EF',
                  cursor: reportText.trim() ? 'pointer' : 'not-allowed',
                  color: '#FFFFFF'
                }}
                className="flex-1 px-4 py-2 rounded-xl transition-colors"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secret Admin Code Modal */}
      {secretCodeModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: 10000,
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'
          }}
        >
          <div 
            className="w-full max-w-md rounded-2xl p-6"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Админ панель
              </h3>
              <button 
                onClick={() => setSecretCodeModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Поле Telegram ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Telegram ID</label>
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
                placeholder="Введите ваш Telegram ID"
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
            {/* Поле кода доступа с показом/скрытием */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Код доступа</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="Введите код доступа"
                  className="w-full p-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
            <div className="text-center text-xs text-muted mb-4">
              Доступ только для администраторов и тимлидов
            </div>

            <button 
              onClick={handleSecretCodeSubmit}
              disabled={!telegramId || !secretCode}
            style={{ 
                backgroundColor: (telegramId && secretCode) ? '#2B82FF' : '#E6E9EF',
                cursor: (telegramId && secretCode) ? 'pointer' : 'not-allowed',
                color: '#FFFFFF'
            }}
              className="w-full px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
              <Shield style={{ width: '18px', height: '18px' }} />
              Войти в админку
            </button>
          </div>
        </div>
      )}
    </>
  );
};