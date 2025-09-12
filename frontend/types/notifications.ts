export interface Notification {
  id: string;
  type: 'system' | 'battle' | 'achievement' | 'task' | 'admin';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority?: 'low' | 'medium' | 'high';
}