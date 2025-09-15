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

// Используем Notification из типов

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: string;
  isDefault: boolean;
}

const NOTIFICATION_TYPES = [
  { value: 'achievement', label: 'Достижения', icon: '🏆', color: 'bg-yellow-500' },
  { value: 'battle', label: 'Баттлы', icon: '⚔️', color: 'bg-red-500' },
  { value: 'task', label: 'Задачи', icon: '📝', color: 'bg-green-500' },
  { value: 'shop', label: 'Магазин', icon: '🛒', color: 'bg-purple-500' },
  { value: 'system', label: 'Система', icon: '⚙️', color: 'bg-blue-500' },
  { value: 'personal', label: 'Персональные', icon: '👤', color: 'bg-indigo-500' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Низкий', color: 'bg-gray-500' },
  { value: 'medium', label: 'Средний', color: 'bg-blue-500' },
  { value: 'high', label: 'Высокий', color: 'bg-orange-500' },
  { value: 'urgent', label: 'Срочный', color: 'bg-red-500' }
];

const TARGET_AUDIENCES = [
  { value: 'all', label: 'Все пользователи', icon: '👥' },
  { value: 'team', label: 'Команда', icon: '🏢' },
  { value: 'role', label: 'По ролям', icon: '👑' },
  { value: 'specific', label: 'Конкретные пользователи', icon: '👤' }
];

const STATUS_LABELS = {
  draft: 'Черновик',
  scheduled: 'Запланировано',
  sent: 'Отправлено',
  failed: 'Ошибка'
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

  // Загрузка данных
  useEffect(() => {
    loadData();
  }, []);

  // Фильтрация
  useEffect(() => {
    filterNotifications();
  }, [notifications, searchQuery, filterType, filterStatus, filterPriority]);

  const loadData = async () => {
    // Mock данные
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Новое достижение доступно!',
        message: 'Проверьте список достижений - добавлено новое задание "Мастер баттлов"',
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
        title: 'Техническое обслуживание',
        message: 'Система будет недоступна с 02:00 до 04:00 по МСК для проведения технических работ',
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
        title: 'Поздравляем с повышением!',
        message: 'Вы достигли нового уровня! Получите награду в профиле.',
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
        name: 'Достижение получено',
        title: 'Поздравляем с получением достижения!',
        message: 'Вы успешно получили достижение "{achievement_name}". Продолжайте в том же духе!',
        type: 'achievement',
        isDefault: true
      },
      {
        id: '2',
        name: 'Новая задача',
        title: 'Вам назначена новая задача',
        message: 'Тимлид назначил вам задачу "{task_title}". Дедлайн: {deadline}',
        type: 'task',
        isDefault: true
      },
      {
        id: '3',
        name: 'Баттл завершен',
        title: 'Результат баттла',
        message: 'Ваш баттл с {opponent_name} завершен. Результат: {result}',
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
    if (window.confirm('Вы уверены, что хотите удалить это уведомление?')) {
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
      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Поиск уведомлений..."
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
          <option value="all">Все типы</option>
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
          <option value="all">Все статусы</option>
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
          <option value="all">Все приоритеты</option>
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
          Создать
        </button>
      </div>

      {/* Список уведомлений */}
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
                        Отправлено: {new Date(notification.sentAt).toLocaleString()}
                      </span>
                    )}
                    {notification.deliveryStats.totalSent > 0 && (
                      <span className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {notification.deliveryStats.read}/{notification.deliveryStats.totalSent} прочитано
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
                    <span>Отправить</span>
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
          Шаблоны уведомлений
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Создать шаблон
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
                  По умолчанию
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
        Аналитика уведомлений
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
          <div className="text-sm opacity-70">Всего отправлено</div>
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
          <div className="text-sm opacity-70">Доставлено</div>
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
          <div className="text-sm opacity-70">Прочитано</div>
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
          <div className="text-sm opacity-70">Кликов</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Система уведомлений
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Управление уведомлениями и аналитика
          </p>
        </div>
      </div>

      {/* Табы */}
      <div className="flex space-x-2 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#E6E9EF' }}>
        {[
          { id: 'notifications', label: 'Уведомления', icon: Bell },
          { id: 'templates', label: 'Шаблоны', icon: MessageSquare },
          { id: 'analytics', label: 'Аналитика', icon: TrendingUp }
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

      {/* Контент */}
      {activeTab === 'notifications' && renderNotificationsTab()}
      {activeTab === 'templates' && renderTemplatesTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}

      {/* Модал создания/редактирования */}
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
                {editingNotification ? 'Редактировать уведомление' : 'Создать уведомление'}
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
                  Заголовок *
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
                  placeholder="Введите заголовок уведомления"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Сообщение *
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
                  placeholder="Введите текст уведомления"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Тип
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
                    Приоритет
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
                  Целевая аудитория
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
                  Запланировать отправку
                </label>
              </div>

              {formData.isScheduled && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Время отправки
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
                Отмена
              </button>
              <button
                onClick={editingNotification ? handleUpdateNotification : handleCreateNotification}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingNotification ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
