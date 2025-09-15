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

// РСЃРїРѕР»СЊР·СѓРµРј TaskData РёР· Р±Р°Р·С‹ РґР°РЅРЅС‹С…

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
  { value: 'development', label: 'Р Р°Р·СЂР°Р±РѕС‚РєР°', icon: 'рџ’»' },
  { value: 'testing', label: 'РўРµСЃС‚РёСЂРѕРІР°РЅРёРµ', icon: 'рџ§Є' },
  { value: 'design', label: 'Р”РёР·Р°Р№РЅ', icon: 'рџЋЁ' },
  { value: 'marketing', label: 'РњР°СЂРєРµС‚РёРЅРі', icon: 'рџ“ў' },
  { value: 'other', label: 'Р”СЂСѓРіРѕРµ', icon: 'рџ“‹' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'РќРёР·РєРёР№', color: 'bg-green-500' },
  { value: 'medium', label: 'РЎСЂРµРґРЅРёР№', color: 'bg-yellow-500' },
  { value: 'high', label: 'Р’С‹СЃРѕРєРёР№', color: 'bg-orange-500' },
  { value: 'critical', label: 'РљСЂРёС‚РёС‡РµСЃРєРёР№', color: 'bg-red-500' }
];

const STATUS_LABELS = {
  new: 'РќРѕРІР°СЏ',
  in_progress: 'Р’ СЂР°Р±РѕС‚Рµ',
  completed: 'Р’С‹РїРѕР»РЅРµРЅР°',
  cancelled: 'РћС‚РјРµРЅРµРЅР°',
  overdue: 'РџСЂРѕСЃСЂРѕС‡РµРЅР°'
};

const STATUS_COLORS = {
  new: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  completed: 'bg-green-500',
  cancelled: 'bg-gray-500',
  overdue: 'bg-red-500'
};

// Mock РїРѕР»СЊР·РѕРІР°С‚РµР»Рё
const MOCK_USERS = [
  { id: '1', name: 'РђР»РµРєСЃРµР№ РРІР°РЅРѕРІ', role: 'developer' },
  { id: '2', name: 'РњР°СЂРёСЏ РџРµС‚СЂРѕРІР°', role: 'designer' },
  { id: '3', name: 'Р”РјРёС‚СЂРёР№ РЎРёРґРѕСЂРѕРІ', role: 'tester' },
  { id: '4', name: 'РђРЅРЅР° РљРѕР·Р»РѕРІР°', role: 'marketer' }
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

  // Р—Р°РіСЂСѓР·РєР° Р·Р°РґР°С‡
  useEffect(() => {
    loadTasks();
  }, []);

  // Р¤РёР»СЊС‚СЂР°С†РёСЏ Р·Р°РґР°С‡
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
    // Mock РґР°РЅРЅС‹Рµ
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'РЎРѕР·РґР°С‚СЊ РЅРѕРІСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ СЂРµРіРёСЃС‚СЂР°С†РёРё',
        description: 'Р Р°Р·СЂР°Р±РѕС‚Р°С‚СЊ СЃРѕРІСЂРµРјРµРЅРЅСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ СЂРµРіРёСЃС‚СЂР°С†РёРё СЃ РІР°Р»РёРґР°С†РёРµР№',
        type: 'development',
        priority: 'high',
        status: 'in_progress',
        assignedTo: '1',
        assignedToName: 'РђР»РµРєСЃРµР№ РРІР°РЅРѕРІ',
        assignedBy: 'admin',
        deadline: '2024-01-25T18:00:00Z',
        estimatedTime: 16,
        reward: { coins: 300, experience: 150 },
        createdAt: '2024-01-20T09:00:00Z'
      },
      {
        id: '2',
        title: 'РџСЂРѕРІРµСЂРєР° СЃРёСЃС‚РµРјС‹ СѓРІРµРґРѕРјР»РµРЅРёР№',
        description: 'РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°С‚СЊ РІСЃРµ С‚РёРїС‹ СѓРІРµРґРѕРјР»РµРЅРёР№ РІ РїСЂРёР»РѕР¶РµРЅРёРё',
        type: 'testing',
        priority: 'medium',
        status: 'completed',
        assignedTo: '3',
        assignedToName: 'Р”РјРёС‚СЂРёР№ РЎРёРґРѕСЂРѕРІ',
        assignedBy: 'admin',
        deadline: '2024-01-22T16:45:00Z',
        estimatedTime: 8,
        reward: { coins: 200, experience: 100 },
        createdAt: '2024-01-18T10:30:00Z',
        completedAt: '2024-01-22T15:30:00Z'
      },
      {
        id: '3',
        title: 'Р”РёР·Р°Р№РЅ РјРѕР±РёР»СЊРЅРѕР№ РІРµСЂСЃРёРё',
        description: 'РђРґР°РїС‚РёСЂРѕРІР°С‚СЊ РґРёР·Р°Р№РЅ РїРѕРґ РјРѕР±РёР»СЊРЅС‹Рµ СѓСЃС‚СЂРѕР№СЃС‚РІР°',
        type: 'design',
        priority: 'low',
        status: 'new',
        assignedTo: '2',
        assignedToName: 'РњР°СЂРёСЏ РџРµС‚СЂРѕРІР°',
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
      assignedToName: assignedUser?.name || 'РќРµРёР·РІРµСЃС‚РЅРѕ',
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
      assignedToName: assignedUser?.name || 'РќРµРёР·РІРµСЃС‚РЅРѕ'
    };

    setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
    setShowCreateForm(false);
    setEditingTask(null);
    resetForm();
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ СЌС‚Сѓ Р·Р°РґР°С‡Сѓ?')) {
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
    return TASK_TYPES.find(t => t.value === type)?.icon || 'рџ“‹';
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
      {/* Р—Р°РіРѕР»РѕРІРѕРє Рё СЃС‚Р°С‚РёСЃС‚РёРєР° */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            РЈРїСЂР°РІР»РµРЅРёРµ Р·Р°РґР°С‡Р°РјРё
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            РЎРѕР·РґР°РЅРёРµ, РЅР°Р·РЅР°С‡РµРЅРёРµ Рё РѕС‚СЃР»РµР¶РёРІР°РЅРёРµ Р·Р°РґР°С‡
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р”РѕР±Р°РІРёС‚СЊ Р·Р°РґР°С‡Сѓ
        </button>
      </div>

      {/* РЎС‚Р°С‚РёСЃС‚РёРєР° */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-blue-500">{tasks.length}</div>
          <div className="text-sm opacity-70">Р’СЃРµРіРѕ</div>
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
          <div className="text-sm opacity-70">Р’ СЂР°Р±РѕС‚Рµ</div>
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
          <div className="text-sm opacity-70">Р’С‹РїРѕР»РЅРµРЅРѕ</div>
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
          <div className="text-sm opacity-70">РџСЂРѕСЃСЂРѕС‡РµРЅРѕ</div>
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
          <div className="text-sm opacity-70">РќРѕРІС‹Рµ</div>
        </div>
      </div>

      {/* Р¤РёР»СЊС‚СЂС‹ */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="РџРѕРёСЃРє Р·Р°РґР°С‡..."
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
          <option value="all">Р’СЃРµ С‚РёРїС‹</option>
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
          <option value="all">Р’СЃРµ РёСЃРїРѕР»РЅРёС‚РµР»Рё</option>
          {MOCK_USERS.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* РЎРїРёСЃРѕРє Р·Р°РґР°С‡ */}
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
                        {task.estimatedTime}С‡
                      </span>
                      <span>рџ’° {task.reward.coins} РјРѕРЅРµС‚</span>
                      <span>в­ђ {task.reward.experience} РѕРїС‹С‚Р°</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Р‘С‹СЃС‚СЂРѕРµ РёР·РјРµРЅРµРЅРёРµ СЃС‚Р°С‚СѓСЃР° */}
                {task.status === 'new' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'in_progress')}
                    className="px-3 py-1 rounded-lg text-xs bg-yellow-500 bg-opacity-20 text-yellow-500 hover:bg-opacity-30"
                  >
                    Р’ СЂР°Р±РѕС‚Сѓ
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    className="px-3 py-1 rounded-lg text-xs bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30"
                  >
                    Р—Р°РІРµСЂС€РёС‚СЊ
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
                {editingTask ? 'Р РµРґР°РєС‚РёСЂРѕРІР°С‚СЊ Р·Р°РґР°С‡Сѓ' : 'РЎРѕР·РґР°С‚СЊ Р·Р°РґР°С‡Сѓ'}
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
              {/* РћСЃРЅРѕРІРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РќР°Р·РІР°РЅРёРµ Р·Р°РґР°С‡Рё *
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
                  placeholder="Р’РІРµРґРёС‚Рµ РЅР°Р·РІР°РЅРёРµ Р·Р°РґР°С‡Рё"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РћРїРёСЃР°РЅРёРµ
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
                  placeholder="РџРѕРґСЂРѕР±РЅРѕРµ РѕРїРёСЃР°РЅРёРµ Р·Р°РґР°С‡Рё"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    РўРёРї
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
                    РџСЂРёРѕСЂРёС‚РµС‚
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
                  РСЃРїРѕР»РЅРёС‚РµР»СЊ *
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
                  <option value="">Р’С‹Р±РµСЂРёС‚Рµ РёСЃРїРѕР»РЅРёС‚РµР»СЏ</option>
                  {MOCK_USERS.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р”РµРґР»Р°Р№РЅ
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
                    РћС†РµРЅРѕС‡РЅРѕРµ РІСЂРµРјСЏ (С‡Р°СЃС‹)
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

              {/* РќР°РіСЂР°РґС‹ */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РќР°РіСЂР°РґС‹
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      РњРѕРЅРµС‚С‹ (50-500)
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
                      РћРїС‹С‚ (10-100)
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
                РћС‚РјРµРЅР°
              </button>
              <button
                onClick={editingTask ? handleUpdateTask : handleCreateTask}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingTask ? 'РЎРѕС…СЂР°РЅРёС‚СЊ' : 'РЎРѕР·РґР°С‚СЊ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
