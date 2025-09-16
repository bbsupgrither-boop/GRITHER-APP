Р С—Р’В»РЎвЂ”import React from 'react';
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
      title: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В Р’В° Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°',
      message: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ  Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂР В Р’В» Р В РўвЂР В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В Р’В° Р В Р вЂ Р РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°',
      time: '2 Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В¦ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚В',
      from: 'Р В Р’В Р РЋРІР‚в„ўР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋРІР‚СњР В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРЎСџР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ',
      isNew: true
    },
    {
      id: '2', 
      type: 'task_submission',
      title: 'Р В Р’В Р Р†Р вЂљРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В° Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°',
      message: 'Р В Р’В Р РЋРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В° Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’В° Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р Р‹Р РЋРІР‚Сљ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚Сњ Р В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В»Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р Р‹Р РЋРІР‚СљР В Р Р‹Р В РІР‚в„–',
      time: '15 Р В Р’В Р РЋР’ВР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В¦ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚В',
      from: 'Р В Р’В Р РЋРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ Р В Р’В Р вЂ™Р’ВР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°',
      isNew: true
    },
    {
      id: '3',
      type: 'user_report',
      title: 'Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’Вµ',
      message: 'Р В Р’В Р В Р вЂ№Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚ВР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В  Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СћР В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р Р‹Р Р†Р вЂљР’В°Р В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В» Р В Р’В Р РЋРІР‚Сћ Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљР’В¦Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р вЂ™Р’В±Р В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’Вµ',
      time: '1 Р В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РЎвЂњ Р В Р’В Р В РІР‚В¦Р В Р’В Р вЂ™Р’В°Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚В',
      from: 'Р В Р’В Р В Р вЂ№Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚вЂњР В Р’В Р вЂ™Р’ВµР В Р’В Р Р†РІР‚С›РІР‚вЂњ Р В Р’В Р В Р вЂ№Р В Р’В Р РЋРІР‚ВР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В ',
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
      title="Р В Р’В Р В РІвЂљВ¬Р В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р Р‹Р В Р РЏ"
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
            Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В Р вЂ° Р В Р’В Р В РІР‚В Р В Р Р‹Р В РЎвЂњР В Р’В Р вЂ™Р’Вµ Р В Р’В Р РЋРІР‚СњР В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚Сњ Р В Р’В Р РЋРІР‚вЂќР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚СћР В Р Р‹Р Р†Р вЂљР Р‹Р В Р’В Р РЋРІР‚ВР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р вЂ™Р’В°Р В Р’В Р В РІР‚В¦Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р’В Р вЂ™Р’Вµ
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
                        Р В Р’В Р РЋРІР‚С”Р В Р Р‹Р Р†Р вЂљРЎв„ў: {notification.from}
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
                Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљР’В¦ Р В Р Р‹Р РЋРІР‚СљР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’ВµР В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р’В Р РЋР’ВР В Р’В Р вЂ™Р’В»Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ
              </p>
            </div>
          </div>
        )}
      </div>
    </ModalOpaque>
  );
}
