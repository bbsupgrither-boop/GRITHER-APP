export interface Notification {
  id: string;
  type: 'task' | 'battle' | 'achievement' | 'shop' | 'system' | 'challenge';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any; // Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ РґР»СЏ РєР°Р¶РґРѕРіРѕ С‚РёРїР° СѓРІРµРґРѕРјР»РµРЅРёСЏ
  priority: 'low' | 'medium' | 'high';
  icon?: string;
}

export interface NotificationContextData {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}
