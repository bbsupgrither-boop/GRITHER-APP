import React, { useState, useEffect } from 'react';
import { X, Bell, Palette, MessageCircle, Shield, Eye, EyeOff, Paperclip, ChevronRight } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate?: (page: string) => void;
  onOpenAdminPanel?: () => void;
  onOpenProblemReport?: () => void;
  userId?: string;
  hasSecretAccess?: boolean; // Новый пропс для секретного доступа
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onNavigate,
  onOpenAdminPanel,
  onOpenProblemReport,
  userId,
  hasSecretAccess = false // По умолчанию false
}) => {
  const [notifications, setNotifications] = useState(true);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  
  // Используем хук для проверки роли пользователя
  const { user, canAccessAdminPanel, userRole } = useUserRole(userId || '');

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
        setAdminAuthorized(true);
        setThemeToggleCount(parsedData.themeToggleCount || 0);
      } catch (error) {
        console.error('Ошибка при загрузке данных админа:', error);
      }
    }
  }, []);

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', JSON.stringify(checked));
  };

  const handleThemeToggle = () => {
    onToggleTheme(); // Просто переключаем тему
  };

  const handleAdminPanelClick = () => {
    onOpenAdminPanel?.();
    onClose();
  };

  // Проверяем, должна ли показываться кнопка админ панели
  const shouldShowAdminPanel = canAccessAdminPanel || hasSecretAccess;

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
            <X style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }} />
          </button>
          </div>

          {/* Список настроек */}
          <div className="space-y-1">
            {/* 1. УВЕДОМЛЕНИЯ */}
            <div style={{
              height: '64px',
              padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Иконка уведомлений в круглом контейнере */}
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
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Иконка темы в круглом контейнере */}
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
              
              {/* Тумблер темы */}
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
              onClick={() => {
                onOpenProblemReport?.();
                onClose();
              }}
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

            {/* 4. КНОПКА АДМИН ПАНЕЛИ (ПОЯВЛЯЕТСЯ ТОЛЬКО ДЛЯ АДМИНОВ/ТИМЛИДОВ ИЛИ ПОСЛЕ СЕКРЕТНОГО ДОСТУПА) */}
            {shouldShowAdminPanel && (
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
                    {hasSecretAccess ? 'Секретный доступ активирован' :
                     userRole === 'team_lead' ? 'Управление командой' : 
                     userRole === 'junior_admin' ? 'Модерация и статистика' :
                     userRole === 'senior_admin' ? 'Управление пользователями и контентом' :
                     userRole === 'main_admin' ? 'Полное управление системой' :
                     'Административные функции'}
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
    </>
  );
};
