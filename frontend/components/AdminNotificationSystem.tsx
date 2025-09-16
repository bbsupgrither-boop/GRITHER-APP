import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Send,
  Bell,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Calendar,
  User,
  Zap,
  MessageSquare,
  Settings
} from 'lucide-react';
import { databaseService } from '../services/database';
import { Notification } from '../types/notifications';
import { useAdminDatabase } from '../hooks/useAdminDatabase';

interface AdminNotificationSystemProps {
  theme: 'light' | 'dark';
}

// Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ Notification Р В РЎвЂР В Р’В· Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ”Р В РЎвЂўР В Р вЂ 

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: string;
  isDefault: boolean;
}

const NOTIFICATION_TYPES = [
  { value: 'achievement', label: 'Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ', icon: 'РЎР‚РЎСџР РЏРІР‚В ', color: 'bg-yellow-500' },
  { value: 'battle', label: 'Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р РЋРІР‚в„–', icon: 'Р Р†РЎв„ўРІР‚СњР С—РЎвЂР РЏ', color: 'bg-red-500' },
  { value: 'task', label: 'Р В РІР‚вЂќР В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ', icon: 'РЎР‚РЎСџРІР‚СљРЎСљ', color: 'bg-green-500' },
  { value: 'shop', label: 'Р В РЎС™Р В Р’В°Р В РЎвЂ“Р В Р’В°Р В Р’В·Р В РЎвЂР В Р вЂ¦', icon: 'РЎР‚РЎСџРІР‚С”РІР‚в„ў', color: 'bg-purple-500' },
  { value: 'system', label: 'Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В°', icon: 'Р Р†РЎв„ўРІвЂћСћР С—РЎвЂР РЏ', color: 'bg-blue-500' },
  { value: 'personal', label: 'Р В РЎСџР В Р’ВµР РЋР вЂљР РЋР С“Р В РЎвЂўР В Р вЂ¦Р В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ', icon: 'РЎР‚РЎСџРІР‚ВР’В¤', color: 'bg-indigo-500' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Р В РЎСљР В РЎвЂР В Р’В·Р В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-gray-500' },
  { value: 'medium', label: 'Р В Р Р‹Р РЋР вЂљР В Р’ВµР В РўвЂР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“', color: 'bg-blue-500' },
  { value: 'high', label: 'Р В РІР‚в„ўР РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-orange-500' },
  { value: 'urgent', label: 'Р В Р Р‹Р РЋР вЂљР В РЎвЂўР РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“', color: 'bg-red-500' }
];

const TARGET_AUDIENCES = [
  { value: 'all', label: 'Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ', icon: 'РЎР‚РЎСџРІР‚ВРўС’' },
  { value: 'team', label: 'Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В Р’В°', icon: 'РЎР‚РЎСџР РЏРЎС›' },
  { value: 'role', label: 'Р В РЎСџР В РЎвЂў Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР РЏР В РЎВ', icon: 'РЎР‚РЎСџРІР‚ВРІР‚В' },
  { value: 'specific', label: 'Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР РЋР вЂљР В Р’ВµР РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ', icon: 'РЎР‚РЎСџРІР‚ВР’В¤' }
];

const STATUS_LABELS = {
  draft: 'Р В Р’В§Р В Р’ВµР РЋР вЂљР В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂР В РЎвЂќ',
  scheduled: 'Р В РІР‚вЂќР В Р’В°Р В РЎвЂ”Р В Р’В»Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂў',
  sent: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂў',
  failed: 'Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В°'
};

const STATUS_COLORS = {
  draft: 'bg-gray-500',
  scheduled: 'bg-blue-500',
  sent: 'bg-green-500',
  failed: 'bg-red-500'
};

export const AdminNotificationSystem: React.FC<AdminNotificationSystemProps> = ({ theme }) => {
  const { database, addNotification } = useAdminDatabase();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'notifications' | 'templates' | 'analytics'>('notifications');

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦
  useEffect(() => {
    loadData();
  }, []);

  // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ
  useEffect(() => {
    filterNotifications();
  }, [notifications, searchQuery, filterType, filterStatus, filterPriority]);

  const loadData = async () => {
    // Mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В РЎвЂўР В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р вЂ¦Р В РЎвЂў!',
        message: 'Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР Р‰Р РЋРІР‚С™Р В Р’Вµ Р РЋР С“Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ - Р В РўвЂР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂў Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ "Р В РЎС™Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р В Р’ВµР РЋР вЂљ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В РЎвЂўР В Р вЂ "',
        type: 'achievement',
        priority: 'medium',
        targetAudience: 'all',
        isScheduled: false,
        status: 'sent',
        createdAt: '2024-01-20T10:30:00Z',
        sentAt: '2024-01-20T10:31:00Z',
        deliveryStats: {
          totalSent: 1247,
          delivered: 1203,
          read: 856,
          clicked: 234
        }
      },
      {
        id: '2',
        title: 'Р В РЎС›Р В Р’ВµР РЋРІР‚В¦Р В Р вЂ¦Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂўР В Р’Вµ Р В РЎвЂўР В Р’В±Р РЋР С“Р В Р’В»Р РЋРЎвЂњР В Р’В¶Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ',
        message: 'Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р В Р’В±Р РЋРЎвЂњР В РўвЂР В Р’ВµР РЋРІР‚С™ Р В Р вЂ¦Р В Р’ВµР В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р вЂ¦Р В Р’В° Р РЋР С“ 02:00 Р В РўвЂР В РЎвЂў 04:00 Р В РЎвЂ”Р В РЎвЂў Р В РЎС™Р В Р Р‹Р В РЎв„ў Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР В РўвЂР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР РЋРІР‚В¦Р В Р вЂ¦Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂР РЋРІР‚В¦ Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™',
        type: 'system',
        priority: 'high',
        targetAudience: 'all',
        isScheduled: true,
        scheduledFor: '2024-01-25T02:00:00Z',
        status: 'scheduled',
        createdAt: '2024-01-21T14:15:00Z',
        deliveryStats: {
          totalSent: 0,
          delivered: 0,
          read: 0,
          clicked: 0
        }
      },
      {
        id: '3',
        title: 'Р В РЎСџР В РЎвЂўР В Р’В·Р В РўвЂР РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р РЋР РЏР В Р’ВµР В РЎВ Р РЋР С“ Р В РЎвЂ”Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’ВµР В РЎВ!',
        message: 'Р В РІР‚в„ўР РЋРІР‚в„– Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ“Р В Р’В»Р В РЎвЂ Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р РЋРЎвЂњР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р вЂ¦Р РЋР РЏ! Р В РЎСџР В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРЎвЂњ Р В Р вЂ  Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚С›Р В РЎвЂР В Р’В»Р В Р’Вµ.',
        type: 'personal',
        priority: 'low',
        targetAudience: 'specific',
        targetValue: 'user123',
        isScheduled: false,
        status: 'sent',
        createdAt: '2024-01-21T16:45:00Z',
        sentAt: '2024-01-21T16:46:00Z',
        deliveryStats: {
          totalSent: 1,
          delivered: 1,
          read: 1,
          clicked: 0
        }
      }
    ];

    const mockTemplates: NotificationTemplate[] = [
      {
        id: '1',
        name: 'Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂў',
        title: 'Р В РЎСџР В РЎвЂўР В Р’В·Р В РўвЂР РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р РЋР РЏР В Р’ВµР В РЎВ Р РЋР С“ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’ВµР В РЎВ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ!',
        message: 'Р В РІР‚в„ўР РЋРІР‚в„– Р РЋРЎвЂњР РЋР С“Р В РЎвЂ”Р В Р’ВµР РЋРІвЂљВ¬Р В Р вЂ¦Р В РЎвЂў Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋРЎвЂњР РЋРІР‚РЋР В РЎвЂР В Р’В»Р В РЎвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ "{achievement_name}". Р В РЎСџР РЋР вЂљР В РЎвЂўР В РўвЂР В РЎвЂўР В Р’В»Р В Р’В¶Р В Р’В°Р В РІвЂћвЂ“Р РЋРІР‚С™Р В Р’Вµ Р В Р вЂ  Р РЋРІР‚С™Р В РЎвЂўР В РЎВ Р В Р’В¶Р В Р’Вµ Р В РўвЂР РЋРЎвЂњР РЋРІР‚В¦Р В Р’Вµ!',
        type: 'achievement',
        isDefault: true
      },
      {
        id: '2',
        name: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР РЏ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В Р’В°',
        title: 'Р В РІР‚в„ўР В Р’В°Р В РЎВ Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В Р’В° Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР РЏ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В Р’В°',
        message: 'Р В РЎС›Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В РЎвЂР В Р’В» Р В Р вЂ Р В Р’В°Р В РЎВ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ "{task_title}". Р В РІР‚СњР В Р’ВµР В РўвЂР В Р’В»Р В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦: {deadline}',
        type: 'task',
        isDefault: true
      },
      {
        id: '3',
        name: 'Р В РІР‚ВР В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В» Р В Р’В·Р В Р’В°Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦',
        title: 'Р В Р’В Р В Р’ВµР В Р’В·Р РЋРЎвЂњР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В»Р В Р’В°',
        message: 'Р В РІР‚в„ўР В Р’В°Р РЋРІвЂљВ¬ Р В Р’В±Р В Р’В°Р РЋРІР‚С™Р РЋРІР‚С™Р В Р’В» Р РЋР С“ {opponent_name} Р В Р’В·Р В Р’В°Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В Р’ВµР В Р вЂ¦. Р В Р’В Р В Р’ВµР В Р’В·Р РЋРЎвЂњР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™: {result}',
        type: 'battle',
        isDefault: false
      }
    ];

    setNotifications(mockNotifications);
    setTemplates(mockTemplates);
  };

  const filterNotifications = () => {
    let filtered = notifications;

    if (searchQuery) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(notification => notification.type === filterType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(notification => notification.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(notification => notification.priority === filterPriority);
    }

    setFilteredNotifications(filtered);
  };

  const handleCreateNotification = async () => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      priority: formData.priority,
      targetAudience: formData.targetAudience,
      targetValue: formData.targetValue,
      isScheduled: formData.isScheduled,
      scheduledFor: formData.scheduledFor,
      status: formData.isScheduled ? 'scheduled' : 'draft',
      createdAt: new Date().toISOString(),
      deliveryStats: {
        totalSent: 0,
        delivered: 0,
        read: 0,
        clicked: 0
      }
    };

    setNotifications(prev => [newNotification, ...prev]);
    setShowCreateForm(false);
    resetForm();
  };

  const handleEditNotification = (notification: Notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      priority: notification.priority,
      targetAudience: notification.targetAudience,
      targetValue: notification.targetValue || '',
      isScheduled: notification.isScheduled,
      scheduledFor: notification.scheduledFor || ''
    });
    setShowCreateForm(true);
  };

  const handleUpdateNotification = async () => {
    if (!editingNotification) return;

    const updatedNotification: Notification = {
      ...editingNotification,
      title: formData.title,
      message: formData.message,
      type: formData.type,
      priority: formData.priority,
      targetAudience: formData.targetAudience,
      targetValue: formData.targetValue,
      isScheduled: formData.isScheduled,
      scheduledFor: formData.scheduledFor
    };

    setNotifications(prev => prev.map(n => n.id === editingNotification.id ? updatedNotification : n));
    setShowCreateForm(false);
    setEditingNotification(null);
    resetForm();
  };

  const handleSendNotification = async (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification) return;

    const updatedNotification: Notification = {
      ...notification,
      status: 'sent',
      sentAt: new Date().toISOString(),
      deliveryStats: {
        totalSent: 1000,
        delivered: 950,
        read: 650,
        clicked: 150
      }
    };

    setNotifications(prev => prev.map(n => n.id === id ? updatedNotification : n));
  };

  const handleDeleteNotification = async (id: string) => {
    if (window.confirm('Р В РІР‚в„ўР РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р вЂ¦Р РЋРІР‚в„–, Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂў Р РЋРІР‚В¦Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р РЋРЎвЂњР В РўвЂР В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР РЉР РЋРІР‚С™Р В РЎвЂў Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'system',
      priority: 'medium',
      targetAudience: 'all',
      targetValue: '',
      isScheduled: false,
      scheduledFor: ''
    });
  };

  const getTypeInfo = (type: string) => {
    return NOTIFICATION_TYPES.find(t => t.value === type) || NOTIFICATION_TYPES[0];
  };

  const getPriorityInfo = (priority: string) => {
    return PRIORITY_LEVELS.find(p => p.value === priority) || PRIORITY_LEVELS[0];
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    return STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status;
  };

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ”Р РЋРІР‚в„–</option>
          {NOTIFICATION_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“Р РЋРІР‚в„–</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В РЎвЂўР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В Р’ВµР РЋРІР‚С™Р РЋРІР‚в„–</option>
          {PRIORITY_LEVELS.map(priority => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰
        </button>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
              borderLeft: `4px solid ${getTypeInfo(notification.type).color.replace('bg-', '').replace('-500', '')}`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${getTypeInfo(notification.type).color} bg-opacity-20`}>
                  <Bell className={`w-6 h-6 ${getTypeInfo(notification.type).color.replace('bg-', 'text-')}`} />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityInfo(notification.priority).color} text-white`}>
                      {getPriorityInfo(notification.priority).label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(notification.status)} text-white`}>
                      {getStatusLabel(notification.status)}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {TARGET_AUDIENCES.find(t => t.value === notification.targetAudience)?.label}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                    {notification.sentAt && (
                      <span className="flex items-center">
                        <Send className="w-3 h-3 mr-1" />
                        Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂў: {new Date(notification.sentAt).toLocaleString()}
                      </span>
                    )}
                    {notification.deliveryStats.totalSent > 0 && (
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {notification.deliveryStats.read}/{notification.deliveryStats.totalSent} Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р В Р’В°Р В Р вЂ¦Р В РЎвЂў
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {notification.status === 'draft' && (
                  <button
                    onClick={() => handleSendNotification(notification.id)}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰</span>
                  </button>
                )}
                
                <button
                  onClick={() => handleEditNotification(notification)}
                  className="p-2 rounded-lg hover:bg-opacity-10"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="p-2 rounded-lg hover:bg-opacity-10 text-red-500"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,59,48,0.1)' : 'rgba(255,59,48,0.1)' }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
          Р В Р РѓР В Р’В°Р В Р’В±Р В Р’В»Р В РЎвЂўР В Р вЂ¦Р РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р РЋРІвЂљВ¬Р В Р’В°Р В Р’В±Р В Р’В»Р В РЎвЂўР В Р вЂ¦
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                {template.name}
              </h3>
              {template.isDefault && (
                <span className="px-2 py-1 rounded-full text-xs bg-blue-500 bg-opacity-20 text-blue-500">
                  Р В РЎСџР В РЎвЂў Р РЋРЎвЂњР В РЎВР В РЎвЂўР В Р’В»Р РЋРІР‚РЋР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР вЂ№
                </span>
              )}
            </div>
            <p className="text-sm opacity-70 mb-3" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
              {template.title}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getTypeInfo(template.type).color} text-white`}>
                {getTypeInfo(template.type).icon} {getTypeInfo(template.type).label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
        Р В РЎвЂ™Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-blue-500">
            {notifications.reduce((sum, n) => sum + n.deliveryStats.totalSent, 0)}
          </div>
          <div className="text-sm opacity-70">Р В РІР‚в„ўР РЋР С“Р В Р’ВµР В РЎвЂ“Р В РЎвЂў Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂў</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-green-500">
            {Math.round(notifications.reduce((sum, n) => sum + n.deliveryStats.delivered, 0) / 
              Math.max(notifications.reduce((sum, n) => sum + n.deliveryStats.totalSent, 0), 1) * 100)}%
          </div>
          <div className="text-sm opacity-70">Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂў</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-yellow-500">
            {Math.round(notifications.reduce((sum, n) => sum + n.deliveryStats.read, 0) / 
              Math.max(notifications.reduce((sum, n) => sum + n.deliveryStats.totalSent, 0), 1) * 100)}%
          </div>
          <div className="text-sm opacity-70">Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р В Р’В°Р В Р вЂ¦Р В РЎвЂў</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-purple-500">
            {Math.round(notifications.reduce((sum, n) => sum + n.deliveryStats.clicked, 0) / 
              Math.max(notifications.reduce((sum, n) => sum + n.deliveryStats.totalSent, 0), 1) * 100)}%
          </div>
          <div className="text-sm opacity-70">Р В РЎв„ўР В Р’В»Р В РЎвЂР В РЎвЂќР В РЎвЂўР В Р вЂ </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В Р Р‹Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏР В РЎВР В РЎвЂ Р В РЎвЂ Р В Р’В°Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В°
          </p>
        </div>
      </div>

      {/* Р В РЎС›Р В Р’В°Р В Р’В±Р РЋРІР‚в„– */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'notifications', label: 'Р В Р в‚¬Р В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ', icon: Bell },
          { id: 'templates', label: 'Р В Р РѓР В Р’В°Р В Р’В±Р В Р’В»Р В РЎвЂўР В Р вЂ¦Р РЋРІР‚в„–', icon: MessageSquare },
          { id: 'analytics', label: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В°', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
            style={{
              color: activeTab === tab.id ? '#3B82F6' : theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™ */}
      {activeTab === 'notifications' && renderNotificationsTab()}
      {activeTab === 'templates' && renderTemplatesTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}

      {/* Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’В°Р В Р’В» Р РЋР С“Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ/Р РЋР вЂљР В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР РЏ */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                {editingNotification ? 'Р В Р’В Р В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ' : 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingNotification(null);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-opacity-10"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р’В·Р В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В Р Р‹Р В РЎвЂўР В РЎвЂўР В Р’В±Р РЋРІР‚В°Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р РЋРІР‚С™Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РЎС›Р В РЎвЂР В РЎвЂ”
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {NOTIFICATION_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂўР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В Р’ВµР РЋРІР‚С™
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {PRIORITY_LEVELS.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В Р’В¦Р В Р’ВµР В Р’В»Р В Р’ВµР В Р вЂ Р В Р’В°Р РЋР РЏ Р В Р’В°Р РЋРЎвЂњР В РўвЂР В РЎвЂР РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР РЋР РЏ
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  {TARGET_AUDIENCES.map(audience => (
                    <option key={audience.value} value={audience.value}>
                      {audience.icon} {audience.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isScheduled"
                  checked={formData.isScheduled}
                  onChange={(e) => setFormData(prev => ({ ...prev, isScheduled: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="isScheduled" className="text-sm" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РІР‚вЂќР В Р’В°Р В РЎвЂ”Р В Р’В»Р В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂќР РЋРЎвЂњ
                </label>
              </div>

              {formData.isScheduled && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РІР‚в„ўР РЋР вЂљР В Р’ВµР В РЎВР РЋР РЏ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂќР В РЎвЂ
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingNotification(null);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: theme === 'dark' ? 'transparent' : '#F8F9FA',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}
              >
                Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’В°
              </button>
              <button
                onClick={editingNotification ? handleUpdateNotification : handleCreateNotification}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingNotification ? 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰' : 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
