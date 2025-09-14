import React from 'react';
import { Settings, Bell } from 'lucide-react';
import { User as UserType } from '../types/global';
import { Notification } from '../types/notifications';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onOpenSettings: () => void;
  theme: 'light' | 'dark';
  user?: UserType;
  profilePhoto?: string;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onRemoveNotification?: (id: string) => void;
  onClearAllNotifications?: () => void;
  hideUserIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenSettings,
  theme,
  user,
  profilePhoto,
  notifications = [],
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  hideUserIcon = false,
}) => {
  const getRoleDisplay = (level: number) => {
    if (level >= 20) return 'GRITHER';
    if (level >= 15) return 'GLEB';
    if (level >= 10) return 'SUPPORT';
    if (level >= 5) return 'TEAMLEAD';
    return 'WORKER';
  };

  const getRoleColor = (level: number) => {
    if (level >= 20) return '#fbbf24'; // Золотой для GRITHER
    if (level >= 15) return '#a855f7'; // Фиолетовый для GLEB
    if (level >= 10) return '#3b82f6'; // Синий для SUPPORT
    if (level >= 5) return '#10b981'; // Зеленый для TEAMLEAD
    return '#6b7280'; // Серый для WORKER
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      className="w-full px-4 py-4 relative"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        zIndex: 50,
        pointerEvents: 'auto'
      }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Левая часть - Аватар пользователя + имя + роль */}
        {!hideUserIcon && user && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate('profile');
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '8px',
              borderRadius: '12px',
              transition: 'background-color 0.2s ease',
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Аватар пользователя */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: profilePhoto ? 'transparent' : '#2B82FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundImage: profilePhoto ? `url(${profilePhoto})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!profilePhoto && user.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Online статус */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: user.online ? '#10b981' : '#6b7280',
                  border: `2px solid ${theme === 'dark' ? '#161A22' : '#FFFFFF'}`,
                  zIndex: 1
                }}
              />
            </div>

            {/* Имя и роль */}
            <div style={{ textAlign: 'left' }}>
              <div 
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  lineHeight: '1.2'
                }}
              >
                {user.name}
              </div>
              <div 
                style={{
                  fontSize: '12px',
                  color: getRoleColor(user.level),
                  fontWeight: '600',
                  lineHeight: '1.2'
                }}
              >
                {getRoleDisplay(user.level)}
              </div>
            </div>
          </button>
        )}

        {/* Правая часть - Кнопки уведомлений и настроек */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Кнопка уведомлений */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Открыть модальное окно уведомлений
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`apple-button w-7 h-7 flex items-center justify-center relative ${theme === 'dark' ? 'white-button' : ''}`}
            style={{
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
          >
            <Bell className="w-4 h-4" />
            
            {/* Бейдж с количеством непрочитанных */}
            {unreadNotificationsCount > 0 && (
              <div 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#ff3b30',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px'
                }}
              >
                {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
              </div>
            )}
          </button>

          {/* Кнопка настроек */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenSettings();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`apple-button w-7 h-7 flex items-center justify-center ${theme === 'dark' ? 'white-button' : ''}`}
            style={{
              pointerEvents: 'auto',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};