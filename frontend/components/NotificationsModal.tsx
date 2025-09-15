п»їimport React from 'react';
import { Clock, User, FileText } from './Icons';
import { ModalOpaque } from './ModalOpaque';

interface Notification {
  id: string;
  type: 'battle_evidence' | 'task_submission' | 'user_report';
  title: string;
  message: string;
  time: string;
  from: string;
  isNew: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export function NotificationsModal({ isOpen, onClose, theme = 'light' }: NotificationsModalProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'battle_evidence',
      title: 'РќРѕРІС‹Рµ РґРѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІР° Р±Р°С‚С‚Р»Р°',
      message: 'РђР»РµРєСЃРµР№ РџРµС‚СЂРѕРІ РѕС‚РїСЂР°РІРёР» РґРѕРєР°Р·Р°С‚РµР»СЊСЃС‚РІР° РІС‹РїРѕР»РЅРµРЅРёСЏ Р±Р°С‚С‚Р»Р°',
      time: '2 Р СР С‘Р Р… Р Р…Р В°Р В·Р В°Р Т‘',
      from: 'Р С’Р В»Р ВµР С”РЎРѓР ВµР в„– Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†',
      isNew: true
    },
    {
      id: '2', 
      type: 'task_submission',
      title: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР В° Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р В°',
      message: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р ВР Р†Р В°Р Р…Р С•Р Р†Р В° Р С•РЎвЂљР СР ВµРЎвЂљР С‘Р В»Р В° Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“ Р С”Р В°Р С” Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎС“РЎР‹',
      time: '15 Р СР С‘Р Р… Р Р…Р В°Р В·Р В°Р Т‘',
      from: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°',
      isNew: true
    },
    {
      id: '3',
      type: 'user_report',
      title: 'Р РЋР С•Р С•Р В±РЎвЂ°Р ВµР Р…Р С‘Р Вµ Р С• Р С—РЎР‚Р С•Р В±Р В»Р ВµР СР Вµ',
      message: 'Р РЋР ВµРЎР‚Р С–Р ВµР в„– Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р† РЎРѓР С•Р С•Р В±РЎвЂ°Р С‘Р В» Р С• РЎвЂљР ВµРЎвЂ¦Р Р…Р С‘РЎвЂЎР ВµРЎРѓР С”Р С•Р в„– Р С—РЎР‚Р С•Р В±Р В»Р ВµР СР Вµ',
      time: '1 РЎвЂЎР В°РЎРѓ Р Р…Р В°Р В·Р В°Р Т‘',
      from: 'Р РЋР ВµРЎР‚Р С–Р ВµР в„– Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†',
      isNew: false
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'battle_evidence':
        return <FileText style={{ width: '16px', height: '16px', color: '#2B82FF' }} />;
      case 'task_submission':
        return <Clock style={{ width: '16px', height: '16px', color: '#34c759' }} />;
      case 'user_report':
        return <User style={{ width: '16px', height: '16px', color: '#ff9500' }} />;
      default:
        return <Clock style={{ width: '16px', height: '16px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />;
    }
  };

  return (
    <ModalOpaque
      isOpen={isOpen}
      onClose={onClose}
      title="Р Р€Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘РЎРЏ"
      theme={theme}
      actions={
        notifications.length > 0 ? (
          <button 
            onClick={handleMarkAllAsRead}
            className="w-full transition-colors text-center"
            style={{
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'transparent',
              color: '#2B82FF',
              border: 'none',
              fontSize: '14px'
            }}
          >
            Р С›РЎвЂљР СР ВµРЎвЂљР С‘РЎвЂљРЎРЉ Р Р†РЎРѓР Вµ Р С”Р В°Р С” Р С—РЎР‚Р С•РЎвЂЎР С‘РЎвЂљР В°Р Р…Р Р…РЎвЂ№Р Вµ
          </button>
        ) : undefined
      }
    >
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 rounded-xl transition-colors cursor-pointer"
                style={{
                  backgroundColor: notification.isNew 
                    ? theme === 'dark' ? 'rgba(43, 130, 255, 0.12)' : 'rgba(43, 130, 255, 0.10)'
                    : theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: notification.isNew 
                    ? '1px solid rgba(43, 130, 255, 0.20)' 
                    : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
                }}
              >
                <div className="flex items-start gap-3">
                  <div style={{ marginTop: '4px' }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 
                        className="font-medium"
                        style={{ 
                          fontSize: '14px',
                          color: notification.isNew 
                            ? theme === 'dark' ? '#E8ECF2' : '#0F172A'
                            : theme === 'dark' ? '#A7B0BD' : '#6B7280'
                        }}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {notification.isNew && (
                          <div 
                            className="rounded-full flex-shrink-0"
                            style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: '#2B82FF'
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <p 
                      className="mb-2"
                      style={{ 
                        fontSize: '12px',
                        color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                      }}
                    >
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        style={{ 
                          fontSize: '12px',
                          color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                        }}
                      >
                        Р С›РЎвЂљ: {notification.from}
                      </span>
                      <span 
                        style={{ 
                          fontSize: '12px',
                          color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                        }}
                      >
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center" style={{ minHeight: '120px' }}>
            <div className="text-center">
              <Clock style={{ 
                width: '48px', 
                height: '48px', 
                color: theme === 'dark' ? 'rgba(167, 176, 189, 0.5)' : 'rgba(107, 114, 128, 0.5)',
                margin: '0 auto 16px'
              }} />
              <p style={{ 
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                fontSize: '14px'
              }}>
                Р СњР ВµРЎвЂљ Р Р…Р С•Р Р†РЎвЂ№РЎвЂ¦ РЎС“Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘Р в„–
              </p>
            </div>
          </div>
        )}
      </div>
    </ModalOpaque>
  );
}
