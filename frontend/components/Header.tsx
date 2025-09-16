import React from 'react';
import { Settings } from 'lucide-react';
import { User as UserType } from '../types/global';
import { Notification } from '../types/notifications';
import { NotificationsButton } from './NotificationsButton';

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
    if (level >= 20) return '#fbbf24'; // Р В РІР‚вЂќР В РЎвЂўР В Р’В»Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂўР В РІвЂћвЂ“ Р В РўвЂР В Р’В»Р РЋР РЏ GRITHER
    if (level >= 15) return '#a855f7'; // Р В Р’В¤Р В РЎвЂР В РЎвЂўР В Р’В»Р В Р’ВµР РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РўвЂР В Р’В»Р РЋР РЏ GLEB
    if (level >= 10) return '#3b82f6'; // Р В Р Р‹Р В РЎвЂР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В РўвЂР В Р’В»Р РЋР РЏ SUPPORT
    if (level >= 5) return '#10b981'; // Р В РІР‚вЂќР В Р’ВµР В Р’В»Р В Р’ВµР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РўвЂР В Р’В»Р РЋР РЏ TEAMLEAD
    return '#6b7280'; // Р В Р Р‹Р В Р’ВµР РЋР вЂљР РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РўвЂР В Р’В»Р РЋР РЏ WORKER
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      className="w-full py-4 relative"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        zIndex: 50,
        pointerEvents: 'auto'
      }}
    >
      <div className="app-container">
        <div className="flex items-center justify-between w-full px-4">
        {/* Р В РІР‚С”Р В Р’ВµР В Р вЂ Р В Р’В°Р РЋР РЏ Р РЋРІР‚РЋР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР Р‰ - Р В РЎвЂ™Р В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ + Р В РЎвЂР В РЎВР РЋР РЏ + Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР Р‰ */}
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
            {/* Р В РЎвЂ™Р В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ */}
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
              
              {/* Online Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“ */}
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

            {/* Р В Р’ВР В РЎВР РЋР РЏ Р В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР Р‰ */}
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

        {/* Р В РЎСџР РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В°Р РЋР РЏ Р РЋРІР‚РЋР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР Р‰ - Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В РЎвЂ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ Р В Р вЂ¦Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р’ВµР В РЎвЂќ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В Р’В° Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ */}
          <NotificationsButton
            notifications={notifications}
            unreadCount={unreadNotificationsCount}
            onMarkAsRead={onMarkNotificationAsRead || (() => {})}
            onMarkAllAsRead={onMarkAllNotificationsAsRead || (() => {})}
            onRemoveNotification={onRemoveNotification || (() => {})}
            onClearAll={onClearAllNotifications || (() => {})}
            theme={theme}
          />

          {/* Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В Р’В° Р В Р вЂ¦Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р’ВµР В РЎвЂќ */}
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
    </div>
  );
};