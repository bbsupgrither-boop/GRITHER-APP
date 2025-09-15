export interface Notification {
  id: string;
  type: 'system' | 'battle' | 'achievement' | 'task' | 'shop' | 'personal' | 'transaction';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  targetUsers?: string[];
  targetRoles?: string[];
  targetTeams?: string[];
  attachments?: string[];
  scheduledFor?: string;
  requireRead?: boolean;
  createdAt?: string;
  sentAt?: string;
  readBy?: string[];
  reactions?: { userId: string; reaction: string }[];
}