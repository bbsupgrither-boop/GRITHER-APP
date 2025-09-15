import React, { useState, useRef, useEffect } from 'react';
import { Bell, BellRing, CheckCheck, X, Trophy, Target, ShoppingBag, Swords, Gift, AlertCircle } from 'lucide-react';
import { Notification } from '../types/notifications';

interface NotificationsButtonProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAll: () => void;
  theme?: 'light' | 'dark';
}

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemoveNotification,
  onClearAll,
  theme = 'light'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Р—Р°РєСЂС‹С‚РёРµ РїРѕ РєР»РёРєСѓ РІРЅРµ РїР°РЅРµР»Рё
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // РџРѕР»СѓС‡РµРЅРёРµ РёРєРѕРЅРєРё РїРѕ С‚РёРїСѓ СѓРІРµРґРѕРјР»РµРЅРёСЏ
  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = {
      width: '16px',
      height: '16px'
    };

    switch (type) {
      case 'achievement': 
        return <Trophy {...iconProps} style={{ color: '#FFD700' }} />;
      case 'task': 
        return <Target {...iconProps} style={{ color: '#2B82FF' }} />;
      case 'shop': 
        return <ShoppingBag {...iconProps} style={{ color: '#34C759' }} />;
      case 'battle': 
        return <Swords {...iconProps} style={{ color: '#FF9500' }} />;
      case 'challenge': 
        return <Gift {...iconProps} style={{ color: '#AF52DE' }} />;
      case 'system':
      default: 
        return <AlertCircle {...iconProps} style={{ color: '#6B7280' }} />;
    }
  };

  // Р¤РѕСЂРјР°С‚РёСЂРѕРІР°РЅРёРµ РІСЂРµРјРµРЅРё
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'С‚РѕР»СЊРєРѕ С‡С‚Рѕ';
    if (minutes < 60) return `${minutes} РјРёРЅ РЅР°Р·Р°Рґ`;
    if (hours < 24) return `${hours} С‡ РЅР°Р·Р°Рґ`;
    if (days < 7) return `${days} Рґ РЅР°Р·Р°Рґ`;
    return timestamp.toLocaleDateString('ru-RU');
  };

  // РЎРѕСЂС‚РёСЂРѕРІРєР° СѓРІРµРґРѕРјР»РµРЅРёР№ (СЃРЅР°С‡Р°Р»Р° РЅРµРїСЂРѕС‡РёС‚Р°РЅРЅС‹Рµ)
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="relative" ref={panelRef}>
      {/* РљРЅРѕРїРєР° СѓРІРµРґРѕРјР»РµРЅРёР№ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`apple-button w-7 h-7 flex items-center justify-center relative transition-all hover:scale-105 ${theme === 'dark' ? 'white-button' : ''}`}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      >
        {/* РРєРѕРЅРєР° РєРѕР»РѕРєРѕР»СЊС‡РёРєР° */}
        {unreadCount > 0 ? (
          <BellRing 
            style={{
              width: '16px',
              height: '16px',
              color: theme === 'dark' ? '#1A1A1A' : '#6B7280'
            }}
          />
        ) : (
          <Bell 
            style={{
              width: '16px',
              height: '16px',
              color: theme === 'dark' ? '#1A1A1A' : '#6B7280'
            }}
          />
        )}
        
        {/* РЎС‡РµС‚С‡РёРє РЅРµРїСЂРѕС‡РёС‚Р°РЅРЅС‹С… */}
        {unreadCount > 0 && (
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
              padding: unreadCount > 9 ? '0 4px' : '0'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>

      {/* РџР°РЅРµР»СЊ СѓРІРµРґРѕРјР»РµРЅРёР№ */}
      {isOpen && (
        <div
          className="absolute top-10 right-0 w-80 max-h-96 z-50 rounded-lg overflow-hidden"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(145deg, rgba(8, 10, 14, 0.98) 0%, rgba(16, 20, 28, 0.98) 100%)'
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.06)' 
              : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: theme === 'dark'
              ? '0 16px 48px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              : '0 16px 48px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Р—Р°РіРѕР»РѕРІРѕРє РїР°РЅРµР»Рё */}
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-2">
              <h3 
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                РЈРІРµРґРѕРјР»РµРЅРёСЏ
              </h3>
              {unreadCount > 0 && (
                <span 
                  style={{
                    fontSize: '12px',
                    color: '#2B82FF',
                    fontWeight: '500'
                  }}
                >
                  {unreadCount} РЅРѕРІС‹С…
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="apple-button w-6 h-6 flex items-center justify-center"
                  style={{
                    fontSize: '10px'
                  }}
                  title="РћС‚РјРµС‚РёС‚СЊ РІСЃРµ РєР°Рє РїСЂРѕС‡РёС‚Р°РЅРЅС‹Рµ"
                >
                  <CheckCheck style={{ width: '12px', height: '12px' }} />
                </button>
              )}
              
              <button
                onClick={() => setIsOpen(false)}
                className="apple-button w-6 h-6 flex items-center justify-center"
                style={{
                  fontSize: '10px'
                }}
              >
                <X style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          </div>

          {/* РЎРїРёСЃРѕРє СѓРІРµРґРѕРјР»РµРЅРёР№ */}
          <div 
            className="max-h-80 overflow-y-auto"
            style={{
              maxHeight: '320px'
            }}
          >
            {sortedNotifications.length > 0 ? (
              <div className="p-2">
                {sortedNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-all hover:scale-[1.02] ${
                      !notification.read ? 'border-l-2' : ''
                    }`}
                    style={{
                      backgroundColor: !notification.read && theme === 'dark' 
                        ? 'rgba(43, 130, 255, 0.08)' 
                        : 'transparent',
                      borderLeftColor: !notification.read ? '#2B82FF' : 'transparent',
                      border: theme === 'dark' 
                        ? !notification.read 
                          ? '1px solid rgba(43, 130, 255, 0.15)'
                          : '1px solid rgba(255, 255, 255, 0.06)'
                        : !notification.read
                          ? '1px solid rgba(43, 130, 255, 0.15)'
                          : '1px solid rgba(0, 0, 0, 0.05)'
                    }}
                    onClick={() => {
                      if (!notification.read) {
                        onMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* РРєРѕРЅРєР° С‚РёРїР° СѓРІРµРґРѕРјР»РµРЅРёСЏ */}
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      {/* РљРѕРЅС‚РµРЅС‚ СѓРІРµРґРѕРјР»РµРЅРёСЏ */}
                      <div className="flex-1 min-w-0">
                        <div 
                          style={{
                            fontSize: '12px',
                            fontWeight: notification.read ? '400' : '500',
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                            marginBottom: '4px'
                          }}
                        >
                          {notification.title}
                        </div>
                        <div 
                          style={{
                            fontSize: '12px',
                            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                            marginBottom: '4px',
                            lineHeight: '1.4'
                          }}
                        >
                          {notification.message}
                        </div>
                        <div 
                          style={{
                            fontSize: '10px',
                            color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                          }}
                        >
                          {formatTimestamp(new Date(notification.timestamp))}
                        </div>
                      </div>
                      
                      {/* РРЅРґРёРєР°С‚РѕСЂ РЅРµРїСЂРѕС‡РёС‚Р°РЅРЅРѕРіРѕ */}
                      {!notification.read && (
                        <div 
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#2B82FF',
                            marginTop: '4px'
                          }}
                        />
                      )}
                      
                      {/* РљРЅРѕРїРєР° СѓРґР°Р»РµРЅРёСЏ (РїРѕРєР°Р·С‹РІР°РµС‚СЃСЏ РїСЂРё hover) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveNotification(notification.id);
                        }}
                        className="opacity-0 hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center rounded-full"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <X style={{ width: '10px', height: '10px' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* РџСѓСЃС‚РѕРµ СЃРѕСЃС‚РѕСЏРЅРёРµ */
              <div 
                className="flex flex-col items-center justify-center py-8 px-4"
                style={{
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                <Bell style={{ width: '32px', height: '32px', marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', textAlign: 'center' }}>РЈРІРµРґРѕРјР»РµРЅРёР№ РЅРµС‚</p>
              </div>
            )}
          </div>

          {/* Р¤СѓС‚РµСЂ СЃ РєРЅРѕРїРєРѕР№ РѕС‡РёСЃС‚РєРё */}
          {notifications.length > 0 && (
            <div 
              className="p-4 border-t"
              style={{
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <button
                onClick={onClearAll}
                className="w-full py-2 px-4 rounded-lg transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                РћС‡РёСЃС‚РёС‚СЊ РІСЃРµ
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};