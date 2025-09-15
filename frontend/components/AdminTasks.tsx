п»їimport { useState } from 'react';
import { Plus, X, Paperclip, ChevronDown, Menu, Home, Users, Zap, Trophy, CheckSquare, ShoppingBag, Gamepad2, Box, History, ArrowLeft, Calendar, User } from './Icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';

interface Subtask {
  id: string;
  description: string;
  requiresAttachment: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  assignedTo: string[];
  assignedBy: string;
  dateAssigned: string;
  deadline?: string;
  reward: {
    type: 'XP' | 'G-coin';
    amount: number;
  };
  difficulty: 'Р В»Р ВµР С–Р С”Р С•Р Вµ' | 'РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ' | 'РЎвЂљРЎРЏР В¶Р ВµР В»Р С•Р Вµ';
  status: 'pending' | 'completed' | 'overdue' | 'rejected' | 'needs_revision';
  completedDate?: string;
  attachments?: string[]; // URLs Р С” РЎвЂћР В°Р в„–Р В»Р В°Р С
  rejectionReason?: string;
  hasUnreadFeedback?: boolean;
}

interface Employee {
  id: string;
  name: string;
  team: string;
  avatar?: string;
}

interface AdminTasksProps {
  currentAdminPage?: string;
  setCurrentAdminPage?: (page: string) => void;
}

export function AdminTasks({ currentAdminPage = 'tasks', setCurrentAdminPage }: AdminTasksProps) {
  // Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В°
  const employees: Employee[] = [
    { id: '1', name: 'Р С’Р В»Р ВµР С”РЎРѓР В°Р Р…Р Т‘РЎР‚ Р СџР ВµРЎвЂљРЎР‚Р С•Р Р†', team: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р С’' },
    { id: '2', name: 'Р СљР В°РЎР‚Р С‘РЎРЏ Р ВР Р†Р В°Р Р…Р С•Р Р†Р В°', team: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р вЂ' },
    { id: '3', name: 'Р вЂќР СР С‘РЎвЂљРЎР‚Р С‘Р в„– Р РЋР С‘Р Т‘Р С•РЎР‚Р С•Р Р†', team: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р С’' },
    { id: '4', name: 'Р вЂўР В»Р ВµР Р…Р В° Р С™Р С•Р В·Р В»Р С•Р Р†Р В°', team: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р вЂ™' },
    { id: '5', name: 'Р С’Р Р…Р Т‘РЎР‚Р ВµР в„– Р СљР С•РЎР‚Р С•Р В·Р С•Р Р†', team: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р вЂ' },
    { id: '6', name: 'Р С›Р В»РЎРЉР С–Р В° Р вЂ™Р С•Р В»Р С”Р С•Р Р†Р В°', team: 'Р С™Р С•Р СР В°Р Р…Р Т‘Р В° Р С’' },
  ];

  // Р СњР В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘Р С•Р Р…Р Р…РЎвЂ№Р Вµ РЎРЊР В»Р ВµР СР ВµР Р…РЎвЂљРЎвЂ№ Р С—Р В°Р Р…Р ВµР В»Р С‘ Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚Р В°
  const navigationItems = [
    { icon: Home, label: 'Р вЂњР В»Р В°Р Р†Р Р…Р В°РЎРЏ', section: 'dashboard' },
    { icon: Users, label: 'Р вЂ™Р С•РЎР‚Р С”Р ВµРЎР‚РЎвЂ№', section: 'workers' },
    { icon: Zap, label: 'Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№', section: 'battles' },
    { icon: Trophy, label: 'Р вЂќР С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘', section: 'tasks' },
    { icon: ShoppingBag, label: 'Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№', section: 'shop' },
    { icon: Gamepad2, label: 'Р ВР С–РЎР‚РЎвЂ№', section: 'games' },
    { icon: Box, label: 'Р С™Р ВµР в„–РЎРѓРЎвЂ№', section: 'cases' }
  ];

  // Р СџРЎС“РЎРѓРЎвЂљР С•Р в„– Р СР В°РЎРѓРЎРѓР С‘Р Р† Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ (Р В°Р Т‘Р СР С‘Р Р…Р С‘РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С•РЎР‚РЎвЂ№ РЎРѓР С•Р В·Р Т‘Р В°Р Т‘РЎС“РЎвЂљ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ РЎРѓР В°Р СР С•РЎРѓРЎвЂљР С•РЎРЏРЎвЂљР ВµР В»РЎРЉР Р…Р С•)
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);

  // Р СџРЎС“РЎРѓРЎвЂљР С•Р в„– Р СР В°РЎРѓРЎРѓР С‘Р Р† Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [employeeSelectModalOpen, setEmployeeSelectModalOpen] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [sortBy, setSortBy] = useState<'team' | 'employee' | 'date'>('date');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [historySortBy, setHistorySortBy] = useState<'team' | 'employee' | 'date'>('date');
  const [showHistorySortDropdown, setShowHistorySortDropdown] = useState(false);
  
  // Р вЂќР В°Р Р…Р Р…РЎвЂ№Р Вµ РЎвЂћР С•РЎР‚Р СРЎвЂ№ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtasks: [{ id: '1', description: '', requiresAttachment: false }] as Subtask[],
    assignedTo: [] as string[],
    deadline: '',
    reward: { type: 'XP' as 'XP' | 'G-coin', amount: 100 },
    difficulty: 'РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ' as 'Р В»Р ВµР С–Р С”Р С•Р Вµ' | 'РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ' | 'РЎвЂљРЎРЏР В¶Р ВµР В»Р С•Р Вµ'
  });

  const [tempReward, setTempReward] = useState({ type: 'XP' as 'XP' | 'G-coin', amount: 100 });

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘Р С‘ Р С•Р В±РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р С‘ Р В·Р В°Р Т‘Р В°РЎвЂЎ
  const handleCreateTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      subtasks: formData.subtasks.filter(st => st.description.trim()),
      assignedTo: formData.assignedTo,
      assignedBy: 'Р С’Р Т‘Р СР С‘Р Р…',
      dateAssigned: new Date().toISOString().split('T')[0],
      deadline: formData.deadline || undefined,
      reward: formData.reward,
      difficulty: formData.difficulty,
      status: 'pending'
    };
    
    setActiveTasks([...activeTasks, newTask]);
    setCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subtasks: [{ id: '1', description: '', requiresAttachment: false }],
      assignedTo: [],
      deadline: '',
      reward: { type: 'XP', amount: 100 },
      difficulty: 'РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ'
    });
  };

  const addSubtask = () => {
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      description: '',
      requiresAttachment: false
    };
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, newSubtask]
    });
  };

  const updateSubtask = (index: number, field: keyof Subtask, value: string | boolean) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index] = { ...newSubtasks[index], [field]: value };
    setFormData({ ...formData, subtasks: newSubtasks });
  };

  const removeSubtask = (index: number) => {
    if (formData.subtasks.length > 1) {
      const newSubtasks = formData.subtasks.filter((_, i) => i !== index);
      setFormData({ ...formData, subtasks: newSubtasks });
    }
  };

  const handleApproveTask = (taskId: string) => {
    // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ - Р С—Р ВµРЎР‚Р ВµР СР ВµРЎРѓРЎвЂљР С‘РЎвЂљРЎРЉ Р Р† Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№Р Вµ
    const task = activeTasks.find(t => t.id === taskId);
    if (task && task.status !== 'needs_revision') {
      const completedTask = { 
        ...task, 
        status: 'completed' as const, 
        completedDate: new Date().toISOString().split('T')[0] 
      };
      setCompletedTasks([completedTask, ...completedTasks]);
      setActiveTasks(activeTasks.filter(t => t.id !== taskId));
      setTaskDetailModalOpen(false);
    }
  };

  const handleRejectTask = (taskId: string) => {
    // Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ Р СР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р Р†Р Р†Р С•Р Т‘Р В° Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎвЂ№ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ
    const task = activeTasks.find(t => t.id === taskId);
    if (task && task.status !== 'needs_revision') {
      setSelectedTask(task);
      setRejectionReason('');
      setRejectionModalOpen(true);
    }
  };

  const handleConfirmRejection = () => {
    if (selectedTask && rejectionReason.trim()) {
      const updatedTasks = activeTasks.map(task =>
        task.id === selectedTask.id
          ? { 
              ...task, 
              status: 'needs_revision' as const,
              rejectionReason: rejectionReason.trim(),
              hasUnreadFeedback: true
            }
          : task
      );
      setActiveTasks(updatedTasks);
      setRejectionModalOpen(false);
      setTaskDetailModalOpen(false);
      setRejectionReason('');
    }
  };

  const handleEmployeeSelect = () => {
    setEmployeeSelectModalOpen(true);
  };

  const handleEmployeeToggle = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      const employeeName = `${employee.name}, ${employee.team}`;
      const isSelected = formData.assignedTo.includes(employeeName);
      
      if (isSelected) {
        setFormData({
          ...formData,
          assignedTo: formData.assignedTo.filter(name => name !== employeeName)
        });
      } else {
        setFormData({
          ...formData,
          assignedTo: [...formData.assignedTo, employeeName]
        });
      }
    }
  };

  const isEmployeeSelected = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      const employeeName = `${employee.name}, ${employee.team}`;
      return formData.assignedTo.includes(employeeName);
    }
    return false;
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTaskDetailModalOpen(true);
  };

  const handleRewardClick = () => {
    setTempReward(formData.reward);
    setRewardModalOpen(true);
  };

  const handleRewardSave = () => {
    setFormData({ ...formData, reward: tempReward });
    setRewardModalOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Р В»Р ВµР С–Р С”Р С•Р Вµ': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'РЎвЂљРЎРЏР В¶Р ВµР В»Р С•Р Вµ': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В° Р В·Р В°Р Т‘Р В°РЎвЂЎ
  const sortedActiveTasks = [...activeTasks].sort((a, b) => {
    switch (sortBy) {
      case 'team':
        return a.assignedTo[0].localeCompare(b.assignedTo[0]);
      case 'employee':
        return a.assignedTo[0].localeCompare(b.assignedTo[0]);
      case 'date':
        return new Date(b.dateAssigned).getTime() - new Date(a.dateAssigned).getTime();
      default:
        return 0;
    }
  });

  const sortedCompletedTasks = [...completedTasks].sort((a, b) => {
    switch (historySortBy) {
      case 'team':
        return a.assignedTo[0].localeCompare(b.assignedTo[0]);
      case 'employee':
        return a.assignedTo[0].localeCompare(b.assignedTo[0]);
      case 'date':
        return new Date(b.completedDate || b.dateAssigned).getTime() - new Date(a.completedDate || a.dateAssigned).getTime();
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="min-h-screen bg-background pb-40">
        <div className="p-6">
          {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground">Р СџР В°Р Р…Р ВµР В»РЎРЉ РЎС“Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘РЎРЏ</h2>
          </div>

          {/* Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
              >
                Р вЂќР С•Р В±. Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“
              </button>
            </div>
          </div>

          {/* Card РЎРѓ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р СР С‘ Р В·Р В°Р Т‘Р В°РЎвЂЎР В°Р СР С‘ */}
          <div className="px-6">
            <div className="glass-card rounded-2xl apple-shadow p-4">
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”Р Р…Р С•Р С—Р С”Р В°Р СР С‘ */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setHistoryModalOpen(true)}
                  className="glass-card p-3 rounded-xl transition-colors hover:bg-accent/50"
                  title="Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎ"
                >
                  <History size={16} className="text-foreground/70" />
                </button>
                <h3 className="text-lg font-medium text-foreground">Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘</h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="glass-card p-3 rounded-xl transition-colors hover:bg-accent/50" 
                    title="Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В°"
                  >
                    <Menu size={16} className="text-foreground/70" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                      {[
                        { key: 'date', label: 'Р СџР С• Р Т‘Р В°РЎвЂљР Вµ' },
                        { key: 'team', label: 'Р СџР С• Р С”Р С•Р СР В°Р Р…Р Т‘Р Вµ' },
                        { key: 'employee', label: 'Р СџР С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”РЎС“' }
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => {
                            setSortBy(option.key as any);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            sortBy === option.key ? 'bg-primary text-primary-foreground' : 'hover:bg-black/5 text-foreground'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ */}
              <div className="space-y-3">
                {sortedActiveTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground mb-1">{task.title}</div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ: {task.status === 'needs_revision' ? 'РЎвЂљРЎР‚Р ВµР В±РЎС“Р ВµРЎвЂљ Р Т‘Р С•РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р С‘' : 'Р Р† Р С—РЎР‚Р С•РЎвЂ Р ВµРЎРѓРЎРѓР Вµ'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”: {task.assignedTo.join('; ')}
                      </div>
                      {task.status === 'needs_revision' && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          РІС™В РїС‘РЏ Р вЂўРЎРѓРЎвЂљРЎРЉ Р В·Р В°Р СР ВµРЎвЂЎР В°Р Р…Р С‘РЎРЏ
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectTask(task.id);
                        }}
                        disabled={task.status === 'needs_revision'}
                        className={`p-2 rounded-lg transition-colors ${
                          task.status === 'needs_revision' 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-red-50 dark:hover:bg-red-900/20'
                        }`}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproveTask(task.id);
                        }}
                        disabled={task.status === 'needs_revision'}
                        className={`p-2 rounded-lg transition-colors ${
                          task.status === 'needs_revision' 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-green-50 dark:hover:bg-green-900/20'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4 text-green-500" />
                      </button>
                    </div>
                  </div>
                ))}
                {sortedActiveTasks.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Р вЂ”Р В°Р Т‘Р В°РЎвЂЎ Р Р…Р В° Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р Вµ Р Р…Р ВµРЎвЂљ
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Р вЂРЎвЂ№РЎРѓРЎвЂљРЎР‚Р В°РЎРЏ Р Р…Р В°Р Р†Р С‘Р С–Р В°РЎвЂ Р С‘РЎРЏ */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/20">
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {navigationItems.slice(0, 4).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.section === currentAdminPage;
                  return (
                    <button 
                      key={index} 
                      className="flex flex-col items-center text-center"
                      onClick={() => setCurrentAdminPage?.(item.section)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                        isActive ? 'bg-primary' : 'glass-card'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isActive ? 'text-white' : 'text-foreground/70'
                        }`} />
                      </div>
                      <span className={`text-xs ${
                        isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {navigationItems.slice(4, 8).map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.section === currentAdminPage;
                  return (
                    <button 
                      key={index} 
                      className="flex flex-col items-center text-center"
                      onClick={() => setCurrentAdminPage?.(item.section)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 apple-shadow ${
                        isActive ? 'bg-primary' : 'glass-card'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isActive ? 'text-white' : 'text-foreground/70'
                        }`} />
                      </div>
                      <span className={`text-xs ${
                        isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С‘РЎРѓРЎвЂљР С•РЎР‚Р С‘Р С‘ Р В·Р В°Р Т‘Р В°РЎвЂЎ */}
        <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р ВРЎРѓРЎвЂљР С•РЎР‚Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎ</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎРѓР С• РЎРѓР С—Р С‘РЎРѓР С”Р С•Р С Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ
            </DialogDescription>
            <div className="p-6">
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ РЎРѓР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р С•Р в„– Р С‘ Р С”РЎР‚Р ВµРЎРѓРЎвЂљР С‘Р С”Р С•Р С */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowHistorySortDropdown(!showHistorySortDropdown)}
                    className="glass-card p-3 rounded-xl transition-colors hover:bg-accent/50" 
                    title="Р РЋР С•РЎР‚РЎвЂљР С‘РЎР‚Р С•Р Р†Р С”Р В°"
                  >
                    <Menu size={16} className="text-foreground/70" />
                  </button>
                  {showHistorySortDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                      {[
                        { key: 'date', label: 'Р СџР С• Р Т‘Р В°РЎвЂљР Вµ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ' },
                        { key: 'team', label: 'Р СџР С• Р С”Р С•Р СР В°Р Р…Р Т‘Р Вµ' },
                        { key: 'employee', label: 'Р СџР С• РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”РЎС“' }
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => {
                            setHistorySortBy(option.key as any);
                            setShowHistorySortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                            historySortBy === option.key ? 'bg-primary text-primary-foreground' : 'hover:bg-black/5 text-foreground'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-foreground flex-1 text-center">Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘</h3>
                <button
                  onClick={() => setHistoryModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ */}
              <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-3">
                {sortedCompletedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="text-sm font-medium text-foreground mb-1">{task.title}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ: Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р В°
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”: {task.assignedTo.join('; ')}
                    </div>
                    <div className="flex justify-end">
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        {task.completedDate && new Date(task.completedDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                ))}
                {sortedCompletedTasks.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ Р Р…Р ВµРЎвЂљ
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="sr-only">Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ РЎРѓР С•Р В·Р Т‘Р В°Р Р…Р С‘РЎРЏ Р Р…Р С•Р Р†Р С•Р в„– Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ РЎРѓ Р С—Р С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°Р СР С‘, Р Р†РЎвЂ№Р В±Р С•РЎР‚Р С•Р С РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р С‘ Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С•Р в„– Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№
            </DialogDescription>
            <div className="p-6">
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”Р Р…Р С•Р С—Р С”Р С•Р в„– Р Р…Р В°Р В·Р В°Р Т‘ Р С‘ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р С•Р С РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р В° */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground/70" />
                </button>
                <Input
                  placeholder="Р СњР В°Р В·Р Р†Р В°Р Р…Р С‘Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="flex-1 mx-4 bg-transparent border border-border rounded-lg text-center font-medium"
                />
                <button 
                  onClick={handleEmployeeSelect}
                  className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <User className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ РЎРѓ Р С—Р С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°Р СР С‘ */}
              <div className="glass-card rounded-2xl p-4 mb-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘</span>
                    <button
                      onClick={addSubtask}
                      className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                  <Textarea
                    placeholder="Р С›Р С—Р С‘РЎРѓР В°Р Р…Р С‘Р Вµ РЎвЂљР С•Р С–Р С•, РЎвЂЎРЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• РЎРѓР Т‘Р ВµР В»Р В°РЎвЂљРЎРЉ Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-transparent border-none resize-none min-h-16 text-sm focus:outline-none p-0"
                  />
                </div>

                {/* Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
                <div className="space-y-2">
                  {formData.subtasks.map((subtask, index) => (
                    <div key={subtask.id} className="flex items-center gap-2 pl-2 border-l-2 border-muted">
                      <span className="text-sm">РІР‚Сћ</span>
                      <Input
                        placeholder="Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР В°"
                        value={subtask.description}
                        onChange={(e) => updateSubtask(index, 'description', e.target.value)}
                        className="bg-transparent border-none text-sm p-0 h-6 flex-1"
                      />
                      <button
                        onClick={() => updateSubtask(index, 'requiresAttachment', !subtask.requiresAttachment)}
                        className={`p-1 rounded transition-colors ${
                          subtask.requiresAttachment 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground'
                        }`}
                      >
                        <Paperclip className="w-3 h-3" />
                      </button>
                      {formData.subtasks.length > 1 && (
                        <button 
                          onClick={() => removeSubtask(index)}
                          className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                        >
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р В·Р В°Р Т‘Р В°РЎвЂЎР Вµ */}
              <div className="space-y-3 mb-6">
                <div className="text-sm text-foreground">
                  Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”: {formData.assignedTo.length > 0 ? formData.assignedTo.join('; ') : 'Р СњР Вµ Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…'}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Р вЂќР В°РЎвЂљР В°: {new Date().toLocaleDateString('ru-RU')}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="text-xs bg-transparent border border-border rounded px-2 py-1"
                    />
                    <Calendar className="w-4 h-4 text-foreground/70" />
                  </div>
                </div>
                
                {/* Р РЋР В»Р С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Р РЋР В»Р С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉ:</span>
                  <div className="relative">
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className="text-sm bg-transparent border border-border rounded px-2 py-1"
                    >
                      <option value="Р В»Р ВµР С–Р С”Р С•Р Вµ">Р В»Р ВµР С–Р С”Р С•Р Вµ</option>
                      <option value="РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ">РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР Вµ</option>
                      <option value="РЎвЂљРЎРЏР В¶Р ВµР В»Р С•Р Вµ">РЎвЂљРЎРЏР В¶Р ВµР В»Р С•Р Вµ</option>
                    </select>
                  </div>
                </div>
                
                {/* Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° */}
                <button
                  onClick={handleRewardClick}
                  className="text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 py-1 transition-colors w-full text-left"
                >
                  Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: {formData.reward.amount} {formData.reward.type}
                </button>
              </div>

              {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘Р в„– */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                >
                  Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={!formData.title || !formData.description || formData.assignedTo.length === 0}
                  className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р ВµРЎвЂљР В°Р В»Р ВµР в„– Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
        <Dialog open={taskDetailModalOpen} onOpenChange={setTaskDetailModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="sr-only">{selectedTask?.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Р СџР С•Р Т‘РЎР‚Р С•Р В±Р Р…Р В°РЎРЏ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…Р Р…Р С•Р в„– Р В·Р В°Р Т‘Р В°РЎвЂЎР Вµ РЎРѓ Р Р†Р С•Р В·Р СР С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉРЎР‹ Р С•Р Т‘Р С•Р В±РЎР‚Р ВµР Р…Р С‘РЎРЏ Р С‘Р В»Р С‘ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ
            </DialogDescription>
            <div className="p-6">
              {selectedTask && (
                <div className="space-y-4">
                  {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”РЎР‚Р ВµРЎРѓРЎвЂљР С‘Р С”Р С•Р С */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-foreground flex-1">{selectedTask.title}</h3>
                    <button
                      onClick={() => setTaskDetailModalOpen(false)}
                      className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-foreground/70" />
                    </button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Р РЋР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”: {selectedTask.assignedTo.join('; ')}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">{selectedTask.description}</p>
                  </div>

                  {/* Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
                  {selectedTask.subtasks.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Р СџР С•Р Т‘Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘:</h4>
                      <div className="space-y-2">
                        {selectedTask.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-secondary/50 rounded-lg">
                            <span>РІР‚Сћ</span>
                            <span className="flex-1">{subtask.description}</span>
                            {subtask.requiresAttachment && (
                              <Paperclip className="w-3 h-3 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Р СџРЎР‚Р С‘Р С”РЎР‚Р ВµР С—Р В»Р ВµР Р…Р Р…РЎвЂ№Р Вµ РЎвЂћР В°Р в„–Р В»РЎвЂ№ */}
                  {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Р СџРЎР‚Р С‘Р С”РЎР‚Р ВµР С—Р В»Р ВµР Р…Р Р…РЎвЂ№Р Вµ РЎвЂћР В°Р в„–Р В»РЎвЂ№:</h4>
                      <div className="space-y-2">
                        {selectedTask.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                            <Paperclip className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground flex-1">{file}</span>
                            <button className="text-xs text-primary hover:text-primary/80 px-2 py-1 hover:bg-primary/10 rounded">
                              Р С›РЎвЂљР С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Р С™Р С•Р СР СР ВµР Р…РЎвЂљР В°РЎР‚Р С‘Р в„– Р С•Р В± Р С•РЎв‚¬Р С‘Р В±Р С”Р Вµ */}
                  {selectedTask.rejectionReason && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40 rounded-lg">
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">
                        Р СћРЎР‚Р ВµР В±РЎС“Р ВµРЎвЂљРЎРѓРЎРЏ Р Т‘Р С•РЎР‚Р В°Р В±Р С•РЎвЂљР С”Р В°:
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        {selectedTask.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* Р ВР Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎРЏ Р С• Р В·Р В°Р Т‘Р В°РЎвЂЎР Вµ */}
                  <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                    <div>Р СњР В°Р В·Р Р…Р В°РЎвЂЎР С‘Р В»: {selectedTask.assignedBy}</div>
                    <div>Р вЂќР В°РЎвЂљР В° Р Р…Р В°Р В·Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘РЎРЏ: {new Date(selectedTask.dateAssigned).toLocaleDateString('ru-RU')}</div>
                    {selectedTask.deadline && (
                      <div>Р вЂќР ВµР Т‘Р В»Р В°Р в„–Р Р…: {new Date(selectedTask.deadline).toLocaleDateString('ru-RU')}</div>
                    )}
                    {selectedTask.completedDate && (
                      <div>Р вЂќР В°РЎвЂљР В° Р Р†РЎвЂ№Р С—Р С•Р В»Р Р…Р ВµР Р…Р С‘РЎРЏ: {new Date(selectedTask.completedDate).toLocaleDateString('ru-RU')}</div>
                    )}
                    <div>Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В°: {selectedTask.reward.amount} {selectedTask.reward.type}</div>
                    <div className="flex items-center gap-2">
                      <span>Р РЋР В»Р С•Р В¶Р Р…Р С•РЎРѓРЎвЂљРЎРЉ:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(selectedTask.difficulty)}`}>
                        {selectedTask.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Р С™Р Р…Р С•Р С—Р С”Р С‘ Р Т‘Р ВµР в„–РЎРѓРЎвЂљР Р†Р С‘Р в„– Р Р†Р Р…Р С‘Р В·РЎС“ (РЎвЂљР С•Р В»РЎРЉР С”Р С• Р Т‘Р В»РЎРЏ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ) */}
                  {selectedTask.status !== 'completed' ? (
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => handleRejectTask(selectedTask.id)}
                        disabled={selectedTask.status === 'needs_revision'}
                        className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors text-center ${
                          selectedTask.status === 'needs_revision'
                            ? 'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed'
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
                      </button>
                      <button
                        onClick={() => handleApproveTask(selectedTask.id)}
                        disabled={selectedTask.status === 'needs_revision'}
                        className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors text-center ${
                          selectedTask.status === 'needs_revision'
                            ? 'bg-secondary text-muted-foreground opacity-50 cursor-not-allowed'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
                      >
                        Р С›Р Т‘Р С•Р В±РЎР‚Р С‘РЎвЂљРЎРЉ
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4">
                      <button
                        onClick={() => setTaskDetailModalOpen(false)}
                        className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90 text-center"
                      >
                        Р вЂ”Р В°Р С”РЎР‚РЎвЂ№РЎвЂљРЎРЉ
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
        <Dialog open={employeeSelectModalOpen} onOpenChange={setEmployeeSelectModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р†</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р Р†РЎвЂ№Р В±Р С•РЎР‚Р В° РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† Р Т‘Р В»РЎРЏ Р Р…Р В°Р В·Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘
            </DialogDescription>
            <div className="p-6">
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” РЎРѓ Р С”РЎР‚Р ВµРЎРѓРЎвЂљР С‘Р С”Р С•Р С */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Menu className="w-5 h-5 text-foreground/70" />
                  <h3 className="text-lg font-medium text-foreground">Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р†</h3>
                </div>
                <button
                  onClick={() => setEmployeeSelectModalOpen(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* Р РЋР С—Р С‘РЎРѓР С•Р С” РЎРѓР С•РЎвЂљРЎР‚РЎС“Р Т‘Р Р…Р С‘Р С”Р С•Р Р† */}
              <div className="space-y-3 max-h-[calc(80vh-200px)] overflow-y-auto">
                {employees.map((employee) => (
                  <div 
                    key={employee.id} 
                    className="flex items-center justify-between p-3 border border-border/20 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.team}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleEmployeeToggle(employee.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isEmployeeSelected(employee.id) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-accent'
                      }`}
                    >
                      {isEmployeeSelected(employee.id) ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4 text-foreground/70" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setEmployeeSelectModalOpen(false)}
                className="w-full mt-6 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Р вЂњР С•РЎвЂљР С•Р Р†Р С• ({formData.assignedTo.length} Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…Р С•)
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘ */}
        <Dialog open={rejectionModalOpen} onOpenChange={setRejectionModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р СџРЎР‚Р С‘РЎвЂЎР С‘Р Р…Р В° Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р Р†Р Р†Р С•Р Т‘Р В° Р С—РЎР‚Р С‘РЎвЂЎР С‘Р Р…РЎвЂ№ Р С•РЎвЂљР С”Р В»Р С•Р Р…Р ВµР Р…Р С‘РЎРЏ Р В·Р В°Р Т‘Р В°РЎвЂЎР С‘
            </DialogDescription>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р Р€Р С”Р В°Р В¶Р С‘РЎвЂљР Вµ, РЎвЂЎРЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• Р С‘РЎРѓР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ:
                  </label>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ РЎвЂЎРЎвЂљР С• Р Р…РЎС“Р В¶Р Р…Р С• Р Т‘Р С•РЎР‚Р В°Р В±Р С•РЎвЂљР В°РЎвЂљРЎРЉ Р Р† Р В·Р В°Р Т‘Р В°РЎвЂЎР Вµ..."
                    className="bg-input-background min-h-24 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setRejectionModalOpen(false);
                      setRejectionReason('');
                    }}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={handleConfirmRejection}
                    disabled={!rejectionReason.trim()}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-full text-sm font-medium transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Р С›РЎвЂљР С”Р В»Р С•Р Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Р…Р В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘ Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ */}
        <Dialog open={rewardModalOpen} onOpenChange={setRewardModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р В° Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№</DialogTitle>
            <DialogDescription className="sr-only">
              Р СљР С•Р Т‘Р В°Р В»РЎРЉР Р…Р С•Р Вµ Р С•Р С”Р Р…Р С• Р Т‘Р В»РЎРЏ Р С‘Р В·Р СР ВµР Р…Р ВµР Р…Р С‘РЎРЏ РЎвЂљР С‘Р С—Р В° Р С‘ РЎР‚Р В°Р В·Р СР ВµРЎР‚Р В° Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ Р В·Р В° Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“
            </DialogDescription>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р СћР С‘Р С— Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№
                  </label>
                  <select
                    value={tempReward.type}
                    onChange={(e) => setTempReward({ ...tempReward, type: e.target.value as 'XP' | 'G-coin' })}
                    className="w-full p-3 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="XP">Р С›Р С—РЎвЂ№РЎвЂљ (XP)</option>
                    <option value="G-coin">Р С™Р С•Р С‘Р Р…РЎвЂ№ (G-coin)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С•
                  </label>
                  <Input
                    type="number"
                    value={tempReward.amount}
                    onChange={(e) => setTempReward({ ...tempReward, amount: parseInt(e.target.value) || 0 })}
                    className="bg-input-background"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setRewardModalOpen(false)}
                    className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                  <button
                    onClick={handleRewardSave}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    Р СџРЎР‚Р С‘Р СР ВµР Р…Р С‘РЎвЂљРЎРЉ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
