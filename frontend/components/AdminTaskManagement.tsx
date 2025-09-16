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

// Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ TaskData Р В РЎвЂР В Р’В· Р В Р’В±Р В Р’В°Р В Р’В·Р РЋРІР‚в„– Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦

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
  { value: 'development', label: 'Р В Р’В Р В Р’В°Р В Р’В·Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂќР В Р’В°', icon: 'РЎР‚РЎСџРІР‚в„ўР’В»' },
  { value: 'testing', label: 'Р В РЎС›Р В Р’ВµР РЋР С“Р РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ', icon: 'РЎР‚РЎСџР’В§Р вЂћ' },
  { value: 'design', label: 'Р В РІР‚СњР В РЎвЂР В Р’В·Р В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦', icon: 'РЎР‚РЎСџР вЂ№Р Рѓ' },
  { value: 'marketing', label: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂќР В Р’ВµР РЋРІР‚С™Р В РЎвЂР В Р вЂ¦Р В РЎвЂ“', icon: 'РЎР‚РЎСџРІР‚СљРЎС›' },
  { value: 'other', label: 'Р В РІР‚СњР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В РЎвЂўР В Р’Вµ', icon: 'РЎР‚РЎСџРІР‚СљРІР‚в„–' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Р В РЎСљР В РЎвЂР В Р’В·Р В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-green-500' },
  { value: 'medium', label: 'Р В Р Р‹Р РЋР вЂљР В Р’ВµР В РўвЂР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“', color: 'bg-yellow-500' },
  { value: 'high', label: 'Р В РІР‚в„ўР РЋРІР‚в„–Р РЋР С“Р В РЎвЂўР В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-orange-500' },
  { value: 'critical', label: 'Р В РЎв„ўР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В РЎвЂР РЋРІР‚РЋР В Р’ВµР РЋР С“Р В РЎвЂќР В РЎвЂР В РІвЂћвЂ“', color: 'bg-red-500' }
];

const STATUS_LABELS = {
  new: 'Р В РЎСљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋР РЏ',
  in_progress: 'Р В РІР‚в„ў Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В Р’Вµ',
  completed: 'Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В Р’В°',
  cancelled: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В Р’В°',
  overdue: 'Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋР С“Р РЋР вЂљР В РЎвЂўР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В Р’В°'
};

const STATUS_COLORS = {
  new: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  completed: 'bg-green-500',
  cancelled: 'bg-gray-500',
  overdue: 'bg-red-500'
};

// Mock Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ
const MOCK_USERS = [
  { id: '1', name: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ', role: 'developer' },
  { id: '2', name: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°', role: 'designer' },
  { id: '3', name: 'Р В РІР‚СњР В РЎВР В РЎвЂР РЋРІР‚С™Р РЋР вЂљР В РЎвЂР В РІвЂћвЂ“ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ ', role: 'tester' },
  { id: '4', name: 'Р В РЎвЂ™Р В Р вЂ¦Р В Р вЂ¦Р В Р’В° Р В РЎв„ўР В РЎвЂўР В Р’В·Р В Р’В»Р В РЎвЂўР В Р вЂ Р В Р’В°', role: 'marketer' }
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

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ
  useEffect(() => {
    loadTasks();
  }, []);

  // Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ
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
    // Mock Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р РЋРЎвЂњР РЋР вЂ№ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р РЋРЎвЂњ Р РЋР вЂљР В Р’ВµР В РЎвЂ“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ',
        description: 'Р В Р’В Р В Р’В°Р В Р’В·Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р РЋР С“Р В РЎвЂўР В Р вЂ Р РЋР вЂљР В Р’ВµР В РЎВР В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р РЋРЎвЂњР РЋР вЂ№ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р РЋРЎвЂњ Р РЋР вЂљР В Р’ВµР В РЎвЂ“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ Р РЋР С“ Р В Р вЂ Р В Р’В°Р В Р’В»Р В РЎвЂР В РўвЂР В Р’В°Р РЋРІР‚В Р В РЎвЂР В Р’ВµР В РІвЂћвЂ“',
        type: 'development',
        priority: 'high',
        status: 'in_progress',
        assignedTo: '1',
        assignedToName: 'Р В РЎвЂ™Р В Р’В»Р В Р’ВµР В РЎвЂќР РЋР С“Р В Р’ВµР В РІвЂћвЂ“ Р В Р’ВР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂўР В Р вЂ ',
        assignedBy: 'admin',
        deadline: '2024-01-25T18:00:00Z',
        estimatedTime: 16,
        reward: { coins: 300, experience: 150 },
        createdAt: '2024-01-20T09:00:00Z'
      },
      {
        id: '2',
        title: 'Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“',
        description: 'Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋРІР‚С™Р В Р’ВµР РЋР С“Р РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р вЂ Р РЋР С“Р В Р’Вµ Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ”Р РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В Р вЂ  Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В Р’В»Р В РЎвЂўР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РЎвЂ',
        type: 'testing',
        priority: 'medium',
        status: 'completed',
        assignedTo: '3',
        assignedToName: 'Р В РІР‚СњР В РЎВР В РЎвЂР РЋРІР‚С™Р РЋР вЂљР В РЎвЂР В РІвЂћвЂ“ Р В Р Р‹Р В РЎвЂР В РўвЂР В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ ',
        assignedBy: 'admin',
        deadline: '2024-01-22T16:45:00Z',
        estimatedTime: 8,
        reward: { coins: 200, experience: 100 },
        createdAt: '2024-01-18T10:30:00Z',
        completedAt: '2024-01-22T15:30:00Z'
      },
      {
        id: '3',
        title: 'Р В РІР‚СњР В РЎвЂР В Р’В·Р В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦ Р В РЎВР В РЎвЂўР В Р’В±Р В РЎвЂР В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР С“Р В РЎвЂР В РЎвЂ',
        description: 'Р В РЎвЂ™Р В РўвЂР В Р’В°Р В РЎвЂ”Р РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В РўвЂР В РЎвЂР В Р’В·Р В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦ Р В РЎвЂ”Р В РЎвЂўР В РўвЂ Р В РЎВР В РЎвЂўР В Р’В±Р В РЎвЂР В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р РЋР С“Р РЋРІР‚С™Р В Р вЂ Р В Р’В°',
        type: 'design',
        priority: 'low',
        status: 'new',
        assignedTo: '2',
        assignedToName: 'Р В РЎС™Р В Р’В°Р РЋР вЂљР В РЎвЂР РЋР РЏ Р В РЎСџР В Р’ВµР РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°',
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
      assignedToName: assignedUser?.name || 'Р В РЎСљР В Р’ВµР В РЎвЂР В Р’В·Р В Р вЂ Р В Р’ВµР РЋР С“Р РЋРІР‚С™Р В Р вЂ¦Р В РЎвЂў',
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
      assignedToName: assignedUser?.name || 'Р В РЎСљР В Р’ВµР В РЎвЂР В Р’В·Р В Р вЂ Р В Р’ВµР РЋР С“Р РЋРІР‚С™Р В Р вЂ¦Р В РЎвЂў'
    };

    setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
    setShowCreateForm(false);
    setEditingTask(null);
    resetForm();
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Р В РІР‚в„ўР РЋРІР‚в„– Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР РЋР вЂљР В Р’ВµР В Р вЂ¦Р РЋРІР‚в„–, Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂў Р РЋРІР‚В¦Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р РЋРЎвЂњР В РўвЂР В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р РЋР РЉР РЋРІР‚С™Р РЋРЎвЂњ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ?')) {
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
    return TASK_TYPES.find(t => t.value === type)?.icon || 'РЎР‚РЎСџРІР‚СљРІР‚в„–';
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
      {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ Р В РЎвЂ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
            Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В Р’В°Р В РЎВР В РЎвЂ
          </h1>
          <p className="text-sm opacity-70" style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
            Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ, Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ¦Р В Р’В°Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р РЋР С“Р В Р’В»Р В Р’ВµР В Р’В¶Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Р В РІР‚СњР В РЎвЂўР В Р’В±Р В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ
        </button>
      </div>

      {/* Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В° */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div 
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E6E9EF'
          }}
        >
          <div className="text-2xl font-bold text-blue-500">{tasks.length}</div>
          <div className="text-sm opacity-70">Р В РІР‚в„ўР РЋР С“Р В Р’ВµР В РЎвЂ“Р В РЎвЂў</div>
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
          <div className="text-sm opacity-70">Р В РІР‚в„ў Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В Р’Вµ</div>
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
          <div className="text-sm opacity-70">Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂў</div>
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
          <div className="text-sm opacity-70">Р В РЎСџР РЋР вЂљР В РЎвЂўР РЋР С“Р РЋР вЂљР В РЎвЂўР РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂў</div>
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
          <div className="text-sm opacity-70">Р В РЎСљР В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В Р’Вµ</div>
        </div>
      </div>

      {/* Р В Р’В¤Р В РЎвЂР В Р’В»Р РЋР Р‰Р РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Р В РЎСџР В РЎвЂўР В РЎвЂР РЋР С“Р В РЎвЂќ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ..."
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
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ”Р РЋРІР‚в„–</option>
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
          <option value="all">Р В РІР‚в„ўР РЋР С“Р В Р’Вµ Р В РЎвЂР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р В РЎвЂ</option>
          {MOCK_USERS.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Р В Р Р‹Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋ */}
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
                        {task.estimatedTime}Р РЋРІР‚РЋ
                      </span>
                      <span>РЎР‚РЎСџРІР‚в„ўР’В° {task.reward.coins} Р В РЎВР В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™</span>
                      <span>Р Р†Р’В­РЎвЂ™ {task.reward.experience} Р В РЎвЂўР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™Р В Р’В°</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Р В РІР‚ВР РЋРІР‚в„–Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р’Вµ Р В РЎвЂР В Р’В·Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р РЋРЎвЂњР РЋР С“Р В Р’В° */}
                {task.status === 'new' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'in_progress')}
                    className="px-3 py-1 rounded-lg text-xs bg-yellow-500 bg-opacity-20 text-yellow-500 hover:bg-opacity-30"
                  >
                    Р В РІР‚в„ў Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р РЋРЎвЂњ
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange(task.id, 'completed')}
                    className="px-3 py-1 rounded-lg text-xs bg-green-500 bg-opacity-20 text-green-500 hover:bg-opacity-30"
                  >
                    Р В РІР‚вЂќР В Р’В°Р В Р вЂ Р В Р’ВµР РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰
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
                {editingTask ? 'Р В Р’В Р В Р’ВµР В РўвЂР В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ' : 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР РЋРЎвЂњ'}
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
              {/* Р В РЎвЂєР РЋР С“Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р В РЎвЂР В Р вЂ¦Р РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎСљР В Р’В°Р В Р’В·Р В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ *
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
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В Р’В·Р В Р вЂ Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎвЂєР В РЎвЂ”Р В РЎвЂР РЋР С“Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ
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
                  placeholder="Р В РЎСџР В РЎвЂўР В РўвЂР РЋР вЂљР В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р В РЎвЂўР В РЎвЂ”Р В РЎвЂР РЋР С“Р В Р’В°Р В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В РЎвЂ"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РЎС›Р В РЎвЂР В РЎвЂ”
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
                    Р В РЎСџР РЋР вЂљР В РЎвЂР В РЎвЂўР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В Р’ВµР РЋРІР‚С™
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
                  Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰ *
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
                  <option value="">Р В РІР‚в„ўР РЋРІР‚в„–Р В Р’В±Р В Р’ВµР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ</option>
                  {MOCK_USERS.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РІР‚СњР В Р’ВµР В РўвЂР В Р’В»Р В Р’В°Р В РІвЂћвЂ“Р В Р вЂ¦
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
                    Р В РЎвЂєР РЋРІР‚В Р В Р’ВµР В Р вЂ¦Р В РЎвЂўР РЋРІР‚РЋР В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р В Р вЂ Р РЋР вЂљР В Р’ВµР В РЎВР РЋР РЏ (Р РЋРІР‚РЋР В Р’В°Р РЋР С“Р РЋРІР‚в„–)
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

              {/* Р В РЎСљР В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРІР‚в„– */}
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎСљР В Р’В°Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР РЋРІР‚в„–
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                      Р В РЎС™Р В РЎвЂўР В Р вЂ¦Р В Р’ВµР РЋРІР‚С™Р РЋРІР‚в„– (50-500)
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
                      Р В РЎвЂєР В РЎвЂ”Р РЋРІР‚в„–Р РЋРІР‚С™ (10-100)
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
                Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В Р’В°
              </button>
              <button
                onClick={editingTask ? handleUpdateTask : handleCreateTask}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {editingTask ? 'Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰' : 'Р В Р Р‹Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
