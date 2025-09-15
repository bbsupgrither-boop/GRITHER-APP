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

// РСЃРїРѕР»СЊР·СѓРµРј Notification РёР· С‚РёРїРѕРІ

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: string;
  isDefault: boolean;
}

const NOTIFICATION_TYPES = [
  { value: 'achievement', label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', icon: 'рџЏ†', color: 'bg-yellow-500' },
  { value: 'battle', label: 'Р‘Р°С‚С‚Р»С‹', icon: 'вљ”пёЏ', color: 'bg-red-500' },
  { value: 'task', label: 'Р—Р°РґР°С‡Рё', icon: 'рџ“ќ', color: 'bg-green-500' },
  { value: 'shop', label: 'РњР°РіР°Р·РёРЅ', icon: 'рџ›’', color: 'bg-purple-500' },
  { value: 'system', label: 'РЎРёСЃС‚РµРјР°', icon: 'вљ™пёЏ', color: 'bg-blue-500' },
  { value: 'personal', label: 'РџРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ', icon: 'рџ‘¤', color: 'bg-indigo-500' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'РќРёР·РєРёР№', color: 'bg-gray-500' },
  { value: 'medium', label: 'РЎСЂРµРґРЅРёР№', color: 'bg-blue-500' },
  { value: 'high', label: 'Р’С‹СЃРѕРєРёР№', color: 'bg-orange-500' },
  { value: 'urgent', label: 'РЎСЂРѕС‡РЅС‹Р№', color: 'bg-red-500' }
];

const TARGET_AUDIENCES = [
  { value: 'all', label: 'Р’СЃРµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё', icon: 'рџ‘Ґ' },
  { value: 'team', label: 'РљРѕРјР°РЅРґР°', icon: 'рџЏў' },
  { value: 'role', label: 'РџРѕ СЂРѕР»СЏРј', icon: 'рџ‘‘' },
  { value: 'specific', label: 'РљРѕРЅРєСЂРµС‚РЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё', icon: 'рџ‘¤' }
];

const STATUS_LABELS = {
  draft: 'Р§РµСЂРЅРѕРІРёРє',
  scheduled: 'Р—Р°РїР»Р°РЅРёСЂРѕРІР°РЅРѕ',
  sent: 'РћС‚РїСЂР°РІР»РµРЅРѕ',
  failed: 'РћС€РёР±РєР°'
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

  // Р—Р°РіСЂСѓР·РєР° РґР°РЅРЅС‹С…
  useEffect(() => {
    loadData();
  }, []);

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ
  useEffect(() => {
    filterNotifications();
  }, [notifications, searchQuery, filterType, filterStatus, filterPriority]);

  const loadData = async () => {
    // Mock РґР°РЅРЅС‹Рµ
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'РќРѕРІРѕРµ РґРѕСЃС‚РёР¶РµРЅРёРµ РґРѕСЃС‚СѓРїРЅРѕ!',
        message: 'РџСЂРѕРІРµСЂСЊС‚Рµ СЃРїРёСЃРѕРє РґРѕСЃС‚РёР¶РµРЅРёР№ - РґРѕР±Р°РІР»РµРЅРѕ РЅРѕРІРѕРµ Р·Р°РґР°РЅРёРµ "РњР°СЃС‚РµСЂ Р±Р°С‚С‚Р»РѕРІ"',
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
        title: 'РўРµС…РЅРёС‡РµСЃРєРѕРµ РѕР±СЃР»СѓР¶РёРІР°РЅРёРµ',
        message: 'РЎРёСЃС‚РµРјР° Р±СѓРґРµС‚ РЅРµРґРѕСЃС‚СѓРїРЅР° СЃ 02:00 РґРѕ 04:00 РїРѕ РњРЎРљ РґР»СЏ РїСЂРѕРІРµРґРµРЅРёСЏ С‚РµС…РЅРёС‡РµСЃРєРёС… СЂР°Р±РѕС‚',
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
        title: 'РџРѕР·РґСЂР°РІР»СЏРµРј СЃ РїРѕРІС‹С€РµРЅРёРµРј!',
        message: 'Р’С‹ РґРѕСЃС‚РёРіР»Рё РЅРѕРІРѕРіРѕ СѓСЂРѕРІРЅСЏ! РџРѕР»СѓС‡РёС‚Рµ РЅР°РіСЂР°РґСѓ РІ РїСЂРѕС„РёР»Рµ.',
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
        name: 'Р”РѕСЃС‚РёР¶РµРЅРёРµ РїРѕР»СѓС‡РµРЅРѕ',
        title: 'РџРѕР·РґСЂР°РІР»СЏРµРј СЃ РїРѕР»СѓС‡РµРЅРёРµРј РґРѕСЃС‚РёР¶РµРЅРёСЏ!',
        message: 'Р’С‹ СѓСЃРїРµС€РЅРѕ РїРѕР»СѓС‡РёР»Рё РґРѕСЃС‚РёР¶РµРЅРёРµ "{achievement_name}". РџСЂРѕРґРѕР»Р¶Р°Р№С‚Рµ РІ С‚РѕРј Р¶Рµ РґСѓС…Рµ!',
        type: 'achievement',
        isDefault: true
      },
      {
        id: '2',
        name: 'РќРѕРІР°СЏ Р·Р°РґР°С‡Р°',
        title: 'Р’Р°Рј РЅР°Р·РЅР°С‡РµРЅР° РЅРѕРІР°СЏ Р·Р°РґР°С‡Р°',
        message: 'РўРёРјР»РёРґ РЅР°Р·РЅР°С‡РёР» РІР°Рј Р·Р°РґР°С‡Сѓ "{task_title}". Р”РµРґР»Р°Р№РЅ: {deadline}',
        type: 'task',
        isDefault: true
      },
      {
        id: '3',
        name: 'Р‘Р°С‚С‚Р» Р·Р°РІРµСЂС€РµРЅ',
        title: 'Р РµР·СѓР»СЊС‚Р°С‚ Р±Р°С‚С‚Р»Р°',
        message: 'Р’Р°С€ Р±Р°С‚С‚Р» СЃ {opponent_name} Р·Р°РІРµСЂС€РµРЅ. Р РµР·СѓР»СЊС‚Р°С‚: {result}',
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
    if (window.confirm('Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ СЌС‚Рѕ СѓРІРµРґРѕРјР»РµРЅРёРµ?')) {
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
      {/* Р¤РёР»СЊС‚СЂС‹ */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="РџРѕРёСЃРє СѓРІРµРґРѕРјР»РµРЅРёР№..."
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
          <option value="all">Р’СЃРµ С‚РёРїС‹</option>
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
          <option value="all">Р’СЃРµ СЃС‚Р°С‚СѓСЃС‹</option>
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
          <option value="all">Р’СЃРµ РїСЂРёРѕСЂРёС‚РµС‚С‹</option>
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
          РЎРѕР·РґР°С‚СЊ
        </button>
      </div>

      {/* РЎРїРёСЃРѕРє СѓРІРµРґРѕРјР»РµРЅРёР№ */}
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
                        РћС‚РїСЂР°РІР»РµРЅРѕ: {new Date(notification.sentAt).toLocaleString()}
                      </span>
                    )}
                    {notification.deliveryStats.totalSent > 0 && (
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {notification.deliveryStats.read}/{notification.deliveryStats.totalSent} РїСЂРѕС‡РёС‚Р°РЅРѕ
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
                    <span>РћС‚РїСЂР°РІРёС‚СЊ</span>
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
          РЁР°Р±Р»РѕРЅС‹ СѓРІРµРґРѕРјР»РµРЅРёР№
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          РЎРѕР·РґР°С‚СЊ С€Р°Р±Р»РѕРЅ
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
                  РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
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
        РђРЅР°Р»РёС‚РёРєР° СѓРІРµРґРѕРјР»РµРЅРёР№
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
          <div className="text-sm opacity-70">Р’СЃРµРіРѕ РѕС‚РїСЂР°РІР»РµРЅРѕ</div>
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
          <div className="text-sm opacity-70">Р”РѕСЃС‚Р°РІР»РµРЅРѕ</div>
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
          <div className="text-sm opacity-70">РџСЂРѕС‡РёС‚Р°РЅРѕ</div>
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
          <div className="text-sm opacity-70">РљР»РёРєРѕРІ</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Р—Р°РіРѕР»РѕРІРѕРє */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РЎРёСЃС‚РµРјР° СѓРІРµРґРѕРјР»РµРЅРёР№
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            РЈРїСЂР°РІР»РµРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёСЏРјРё Рё Р°РЅР°Р»РёС‚РёРєР°
          </p>
        </div>
      </div>

      {/* РўР°Р±С‹ */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'notifications', label: 'РЈРІРµРґРѕРјР»РµРЅРёСЏ', icon: Bell },
          { id: 'templates', label: 'РЁР°Р±Р»РѕРЅС‹', icon: MessageSquare },
          { id: 'analytics', label: 'РђРЅР°Р»РёС‚РёРєР°', icon: TrendingUp }
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

      {/* РљРѕРЅС‚РµРЅС‚ */}
      {activeTab === 'notifications' && renderNotificationsTab()}
      {activeTab === 'templates' && renderTemplatesTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}

      {/* РњРѕРґР°Р» СЃРѕР·РґР°РЅРёСЏ/СЂРµРґР°РєС‚РёСЂРѕРІР°РЅРёСЏ */}
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
                {editingNotification ? 'Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ СѓРІРµРґРѕРјР»РµРЅРёРµ' : 'РЎРѕР·РґР°С‚СЊ СѓРІРµРґРѕРјР»РµРЅРёРµ'}
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
                  Р—Р°РіРѕР»РѕРІРѕРє *
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
                  placeholder="Р’РІРµРґРёС‚Рµ Р·Р°РіРѕР»РѕРІРѕРє СѓРІРµРґРѕРјР»РµРЅРёСЏ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РЎРѕРѕР±С‰РµРЅРёРµ *
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
                  placeholder="Р’РІРµРґРёС‚Рµ С‚РµРєСЃС‚ СѓРІРµРґРѕРјР»РµРЅРёСЏ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    РўРёРї
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
                    РџСЂРёРѕСЂРёС‚РµС‚
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
                  Р¦РµР»РµРІР°СЏ Р°СѓРґРёС‚РѕСЂРёСЏ
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
                  Р—Р°РїР»Р°РЅРёСЂРѕРІР°С‚СЊ РѕС‚РїСЂР°РІРєСѓ
                </label>
              </div>

              {formData.isScheduled && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р’СЂРµРјСЏ РѕС‚РїСЂР°РІРєРё
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
                РћС‚РјРµРЅР°
              </button>
              <button
                onClick={editingNotification ? handleUpdateNotification : handleCreateNotification}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingNotification ? 'РЎРѕС…СЂР°РЅРёС‚СЊ' : 'РЎРѕР·РґР°С‚СЊ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
