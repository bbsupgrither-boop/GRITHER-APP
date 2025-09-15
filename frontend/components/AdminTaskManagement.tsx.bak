import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  User, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Target,
  Users,
  Save,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { databaseService, TaskData } from '../services/database';
import { useAdminDatabase } from '../hooks/useAdminDatabase';

interface AdminTaskManagementProps {
  theme: 'light' | 'dark';
}

// Используем TaskData из базы данных

interface TaskForm {
  title: string;
  description: string;
  type: string;
  priority: string;
  assignedTo: string;
  deadline: string;
  estimatedTime: number;
  reward: {
    coins: number;
    experience: number;
  };
}

const TASK_TYPES = [
  { value: 'development', label: 'Разработка', icon: '💻' },
  { value: 'testing', label: 'Тестирование', icon: '🧪' },
  { value: 'design', label: 'Дизайн', icon: '🎨' },
  { value: 'marketing', label: 'Маркетинг', icon: '📢' },
  { value: 'other', label: 'Другое', icon: '📋' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Низкий', color: 'bg-green-500' },
  { value: 'medium', label: 'Средний', color: 'bg-yellow-500' },
  { value: 'high', label: 'Высокий', color: 'bg-orange-500' },
  { value: 'critical', label: 'Критический', color: 'bg-red-500' }
];

const STATUS_LABELS = {
  new: 'Новая',
  in_progress: 'В работе',
  completed: 'Выполнена',
  cancelled: 'Отменена',
  overdue: 'Просрочена'
};

const STATUS_COLORS = {
  new: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  completed: 'bg-green-500',
  cancelled: 'bg-gray-500',
  overdue: 'bg-red-500'
};

// Mock пользователи
const MOCK_USERS = [
  { id: '1', name: 'Алексей Иванов', role: 'developer' },
  { id: '2', name: 'Мария Петрова', role: 'designer' },
  { id: '3', name: 'Дмитрий Сидоров', role: 'tester' },
  { id: '4', name: 'Анна Козлова', role: 'marketer' }
];

export const AdminTaskManagement: React.FC<AdminTaskManagementProps> = ({ theme }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskForm>({
    title: '',
    description: '',
    type: 'development',
    priority: 'medium',
    assignedTo: '',
    deadline: '',
    estimatedTime: 8,
    reward: {
      coins: 100,
      experience: 50
    }
  });

  // Загрузка задач
  useEffect(() => {
    loadTasks();
  }, []);

  // Фильтрация задач
  useEffect(() => {
    let filtered = tasks;

    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedToName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(task => task.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(task => task.type === filterType);
    }

    if (filterUser !== 'all') {
      filtered = filtered.filter(task => task.assignedTo === filterUser);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filterStatus, filterPriority, filterType, filterUser]);

  const loadTasks = async () => {
    // Mock данные
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Создать новую страницу регистрации',
        description: 'Разработать современную страницу регистрации с валидацией',
        type: 'development',
        priority: 'high',
        status: 'in_progress',
        assignedTo: '1',
        assignedToName: 'Алексей Иванов',
        assignedBy: 'admin',
        deadline: '2024-01-25T18:00:00Z',
        estimatedTime: 16,
        reward: { coins: 300, experience: 150 },
        createdAt: '2024-01-20T09:00:00Z'
      },
      {
        id: '2',
        title: 'Проверка системы уведомлений',
        description: 'Протестировать все типы уведомлений в приложении',
        type: 'testing',
        priority: 'medium',
        status: 'completed',
        assignedTo: '3',
        assignedToName: 'Дмитрий Сидоров',
        assignedBy: 'admin',
        deadline: '2024-01-22T16:45:00Z',
        estimatedTime: 8,
        reward: { coins: 200, experience: 100 },
        createdAt: '2024-01-18T10:30:00Z',
        completedAt: '2024-01-22T15:30:00Z'
      },
      {
        id: '3',
        title: 'Дизайн мобильной версии',
        description: 'Адаптировать дизайн под мобильные устройства',
        type: 'design',
        priority: 'low',
        status: 'new',
        assignedTo: '2',
        assignedToName: 'Мария Петрова',
        assignedBy: 'admin',
        deadline: '2024-01-30T12:00:00Z',
        estimatedTime: 24,
        reward: { coins: 400, experience: 200 },
        createdAt: '2024-01-21T14:15:00Z'
      }
    ];

    setTasks(mockTasks);
  };

  const handleCreateTask = async () => {
    const assignedUser = MOCK_USERS.find(u => u.id === formData.assignedTo);
    
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      status: 'new',
      assignedToName: assignedUser?.name || 'Неизвестно',
      assignedBy: 'admin',
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);
    setShowCreateForm(false);
    resetForm();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      type: task.type,
      priority: task.priority,
      assignedTo: task.assignedTo,
      deadline: task.deadline,
      estimatedTime: task.estimatedTime,
      reward: task.reward
    });
    setShowCreateForm(true);
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    const assignedUser = MOCK_USERS.find(u => u.id === formData.assignedTo);

    const updatedTask: Task = {
      ...editingTask,
      ...formData,
      assignedToName: assignedUser?.name || 'Неизвестно'
    };

    setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
    setShowCreateForm(false);
    setEditingTask(null);
    resetForm();
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleStatusChange = async (id: string, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
    };

    setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'development',
      priority: 'medium',
      assignedTo: '',
      deadline: '',
      estimatedTime: 8,
      reward: { coins: 100, experience: 50 }
    });
  };

  const getTypeIcon = (type: Task['type']) => {
    return TASK_TYPES.find(t => t.value === type)?.icon || '📋';
  };

  const getPriorityColor = (priority: Task['priority']) => {
    return PRIORITY_LEVELS.find(p => p.value === priority)?.color || 'bg-gray-500';
  };

  const getStatusColor = (status: Task['status']) => {
    return STATUS_COLORS[status];
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && !tasks.find(t => t.deadline === deadline)?.completedAt;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и статистика */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Управление задачами
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Создание, назначение и отслеживание задач
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить задачу
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-blue-500">{tasks.length}</div>
          <div className="text-sm opacity-70">Всего</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-yellow-500">
            {tasks.filter(t => t.status === 'in_progress').length}
          </div>
          <div className="text-sm opacity-70">В работе</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-green-500">
            {tasks.filter(t => t.status === 'completed').length}
          </div>
          <div className="text-sm opacity-70">Выполнено</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-red-500">
            {tasks.filter(t => isOverdue(t.deadline) && t.status !== 'completed').length}
          </div>
          <div className="text-sm opacity-70">Просрочено</div>
        </div>
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-blue-500">
            {tasks.filter(t => t.status === 'new').length}
          </div>
          <div className="text-sm opacity-70">Новые</div>
        </div>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Поиск задач..."
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
            <option key={priority.value} value={priority.value}>{priority.label}</option>
          ))}
        </select>

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
          {TASK_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.icon} {type.label}</option>
          ))}
        </select>

        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }}
        >
          <option value="all">Все исполнители</option>
          {MOCK_USERS.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Список задач */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF',
              borderLeft: isOverdue(task.deadline) && task.status !== 'completed' ? '4px solid #FF3B30' : undefined
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(task.type)}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                        {task.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)} text-white`}>
                        {PRIORITY_LEVELS.find(p => p.value === task.priority)?.label}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)} text-white`}>
                        {STATUS_LABELS[task.status]}
                      </span>
                    </div>
                    <p className="text-sm opacity-70 mt-1" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                      {task.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs opacity-60">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {task.assignedToName}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.estimatedTime}ч
                      </span>
                      <span>💰 {task.reward.coins} монет</span>
                      <span>⭐ {task.reward.experience} опыта</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Быстрое изменение статуса */}
                {task.status === 'new' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'in_progress')}
                    className="px-3 py-1 rounded-lg text-xs bg-yellow-500 bg-opacity-20 text-yellow-500 hover:bg-opacity-30"
                  >
                    В работу
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    className="px-3 py-1 rounded-lg text-xs bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30"
                  >
                    Завершить
                  </button>
                )}
                
                <button
                  onClick={() => handleEditTask(task)}
                  className="p-2 rounded-lg hover:bg-opacity-10"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDeleteTask(task.id)}
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
                {editingTask ? 'Редактировать задачу' : 'Создать задачу'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingTask(null);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-opacity-10"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Основная информация */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Название задачи *
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
                  placeholder="Введите название задачи"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                  placeholder="Подробное описание задачи"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Тип
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Task['type'] }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  >
                    {TASK_TYPES.map(type => (
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
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
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
                  Исполнитель *
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                  }}
                >
                  <option value="">Выберите исполнителя</option>
                  {MOCK_USERS.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Дедлайн
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Оценочное время (часы)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 8 }))}
                    className="w-full px-3 py-2 rounded-lg border"
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                      borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                    }}
                  />
                </div>
              </div>

              {/* Награды */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Награды
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Монеты (50-500)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="500"
                      value={formData.reward.coins}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        reward: { ...prev.reward, coins: parseInt(e.target.value) || 100 }
                      }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Опыт (10-100)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={formData.reward.experience}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        reward: { ...prev.reward, experience: parseInt(e.target.value) || 50 }
                      }))}
                      className="w-full px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: theme === 'dark' ? '#161A22' : '#F8F9FA',
                        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#E6E9EF',
                        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingTask(null);
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
                onClick={editingTask ? handleUpdateTask : handleCreateTask}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingTask ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
