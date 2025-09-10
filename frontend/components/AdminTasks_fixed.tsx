import { useState } from 'react';
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
  difficulty: 'Р»РµРіРєРѕРµ' | 'СЃСЂРµРґРЅРµРµ' | 'С‚СЏР¶РµР»РѕРµ';
  status: 'pending' | 'completed' | 'overdue' | 'rejected' | 'needs_revision';
  completedDate?: string;
  attachments?: string[]; // URLs Рє С„Р°Р№Р»Р°Рј
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
  // РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РґР»СЏ РІС‹Р±РѕСЂР°
  const employees: Employee[] = [
    { id: '1', name: 'РђР»РµРєСЃР°РЅРґСЂ РџРµС‚СЂРѕРІ', team: 'РљРѕРјР°РЅРґР° Рђ' },
    { id: '2', name: 'РњР°СЂРёСЏ РРІР°РЅРѕРІР°', team: 'РљРѕРјР°РЅРґР° Р‘' },
    { id: '3', name: 'Р”РјРёС‚СЂРёР№ РЎРёРґРѕСЂРѕРІ', team: 'РљРѕРјР°РЅРґР° Рђ' },
    { id: '4', name: 'Р•Р»РµРЅР° РљРѕР·Р»РѕРІР°', team: 'РљРѕРјР°РЅРґР° Р’' },
    { id: '5', name: 'РђРЅРґСЂРµР№ РњРѕСЂРѕР·РѕРІ', team: 'РљРѕРјР°РЅРґР° Р‘' },
    { id: '6', name: 'РћР»СЊРіР° Р’РѕР»РєРѕРІР°', team: 'РљРѕРјР°РЅРґР° Рђ' },
  ];

  // РќР°РІРёРіР°С†РёРѕРЅРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹ РїР°РЅРµР»Рё Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°
  const navigationItems = [
    { icon: Home, label: 'Р“Р»Р°РІРЅР°СЏ', section: 'dashboard' },
    { icon: Users, label: 'Р’РѕСЂРєРµСЂС‹', section: 'workers' },
    { icon: Zap, label: 'Р‘Р°С‚С‚Р»С‹', section: 'battles' },
    { icon: Trophy, label: 'Р”РѕСЃС‚РёР¶РµРЅРёСЏ', section: 'achievements' },
    { icon: CheckSquare, label: 'Р—Р°РґР°С‡Рё', section: 'tasks' },
    { icon: ShoppingBag, label: 'РўРѕРІР°СЂС‹', section: 'shop' },
    { icon: Gamepad2, label: 'РРіСЂС‹', section: 'games' },
    { icon: Box, label: 'РљРµР№СЃС‹', section: 'cases' }
  ];

  // Placeholder РґР°РЅРЅС‹Рµ РґР»СЏ Р°РєС‚РёРІРЅС‹С… Р·Р°РґР°С‡ (РЅР° РїСЂРѕРІРµСЂРєРµ)
  const [activeTasks, setActiveTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'РЎРѕР·РґР°С‚СЊ РїСЂРµР·РµРЅС‚Р°С†РёСЋ',
      description: 'РЎРѕР·РґР°С‚СЊ РїСЂРµР·РµРЅС‚Р°С†РёСЋ РґР»СЏ РєР»РёРµРЅС‚Р° РїРѕ РЅРѕРІРѕРјСѓ РїСЂРѕРµРєС‚Сѓ',
      subtasks: [
        { id: '1', description: 'РџРѕРґРіРѕС‚РѕРІРёС‚СЊ РјР°РєРµС‚С‹', requiresAttachment: true },
        { id: '2', description: 'РќР°РїРёСЃР°С‚СЊ С‚РµРєСЃС‚', requiresAttachment: false }
      ],
      assignedTo: ['РђР»РµРєСЃР°РЅРґСЂ РџРµС‚СЂРѕРІ, РљРѕРјР°РЅРґР° Рђ'],
      assignedBy: 'РђРґРјРёРЅ',
      dateAssigned: '2024-01-15',
      deadline: '2024-01-20',
      reward: { type: 'XP', amount: 100 },
      difficulty: 'СЃСЂРµРґРЅРµРµ',
      status: 'pending',
      attachments: ['presentation.pdf', 'mockups.jpg']
    },
    {
      id: '2',
      title: 'РџСЂРѕРІРµСЃС‚Рё РёСЃСЃР»РµРґРѕРІР°РЅРёРµ',
      description: 'РСЃСЃР»РµРґРѕРІР°С‚СЊ РєРѕРЅРєСѓСЂРµРЅС‚РѕРІ РІ СЃС„РµСЂРµ',
      subtasks: [
        { id: '1', description: 'РЎРѕР±СЂР°С‚СЊ РґР°РЅРЅС‹Рµ', requiresAttachment: false }
      ],
      assignedTo: ['РњР°СЂРёСЏ РРІР°РЅРѕРІР°, РљРѕРјР°РЅРґР° Р‘'],
      assignedBy: 'РўРёРјР»РёРґ',
      dateAssigned: '2024-01-14', 
      reward: { type: 'XP', amount: 50 },
      difficulty: 'Р»РµРіРєРѕРµ',
      status: 'needs_revision',
      rejectionReason: 'РќСѓР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ Р±РѕР»СЊС€Рµ РґРµС‚Р°Р»РµР№ РІ Р°РЅР°Р»РёР·. РќРµ С…РІР°С‚Р°РµС‚ РёРЅС„РѕСЂРјР°С†РёРё Рѕ С†РµРЅРѕРІС‹С… СЃС‚СЂР°С‚РµРіРёСЏС… РєРѕРЅРєСѓСЂРµРЅС‚РѕРІ.',
      hasUnreadFeedback: false
    },
    {
      id: '3',
      title: 'Р Р°Р·СЂР°Р±РѕС‚Р°С‚СЊ РґРёР·Р°Р№РЅ',
      description: 'РЎРѕР·РґР°С‚СЊ РґРёР·Р°Р№РЅ-РјР°РєРµС‚С‹ РґР»СЏ РјРѕР±РёР»СЊРЅРѕРіРѕ РїСЂРёР»РѕР¶РµРЅРёСЏ',
      subtasks: [
        { id: '1', description: 'Р“Р»Р°РІРЅР°СЏ СЃС‚СЂР°РЅРёС†Р°', requiresAttachment: true },
        { id: '2', description: 'РЎС‚СЂР°РЅРёС†Р° РїСЂРѕС„РёР»СЏ', requiresAttachment: true }
      ],
      assignedTo: ['Р”РјРёС‚СЂРёР№ РЎРёРґРѕСЂРѕРІ, РљРѕРјР°РЅРґР° Рђ'],
      assignedBy: 'РўРёРјР»РёРґ',
      dateAssigned: '2024-01-13', 
      reward: { type: 'XP', amount: 75 },
      difficulty: 'СЃСЂРµРґРЅРµРµ',
      status: 'pending',
      attachments: ['design_v1.fig', 'mockup.png']
    },
    {
      id: '4',
      title: 'РќР°РїРёСЃР°С‚СЊ РѕС‚С‡РµС‚',
      description: 'РџРѕРґРіРѕС‚РѕРІРёС‚СЊ РµР¶РµРјРµСЃСЏС‡РЅС‹Р№ РѕС‚С‡РµС‚ РїРѕ РїСЂРѕРґР°Р¶Р°Рј',
      subtasks: [
        { id: '1', description: 'РЎРѕР±СЂР°С‚СЊ СЃС‚Р°С‚РёСЃС‚РёРєСѓ', requiresAttachment: true }
      ],
      assignedTo: ['Р•Р»РµРЅР° РљРѕР·Р»РѕРІР°, РљРѕРјР°РЅРґР° Р’'],
      assignedBy: 'РђРґРјРёРЅ',
      dateAssigned: '2024-01-12', 
      reward: { type: 'G-coin', amount: 25 },
      difficulty: 'С‚СЏР¶РµР»РѕРµ',
      status: 'pending',
      attachments: ['report.xlsx', 'charts.png']
    }
  ]);

  // Placeholder РґР°РЅРЅС‹Рµ РґР»СЏ РІС‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡
  const [completedTasks, setCompletedTasks] = useState<Task[]>([
    {
      id: '5',
      title: 'РЎРѕР·РґР°С‚СЊ Р»РѕРіРѕС‚РёРї',
      description: 'Р Р°Р·СЂР°Р±РѕС‚Р°С‚СЊ Р»РѕРіРѕС‚РёРї РґР»СЏ РЅРѕРІРѕРіРѕ Р±СЂРµРЅРґР°',
      subtasks: [
        { id: '1', description: 'РљРѕРЅС†РµРїС‚СѓР°Р»СЊРЅС‹Рµ РЅР°Р±СЂРѕСЃРєРё', requiresAttachment: true },
        { id: '2', description: 'Р¤РёРЅР°Р»СЊРЅР°СЏ РІРµСЂСЃРёСЏ', requiresAttachment: true }
      ],
      assignedTo: ['РђРЅРґСЂРµР№ РњРѕСЂРѕР·РѕРІ, РљРѕРјР°РЅРґР° Р‘'],
      assignedBy: 'РђРґРјРёРЅ',
      dateAssigned: '2024-01-10',
      deadline: '2024-01-15',
      completedDate: '2024-01-14',
      reward: { type: 'XP', amount: 200 },
      difficulty: 'С‚СЏР¶РµР»РѕРµ',
      status: 'completed'
    },
    {
      id: '6',
      title: 'РћР±РЅРѕРІРёС‚СЊ Р±Р°Р·Сѓ РґР°РЅРЅС‹С…',
      description: 'РђРєС‚СѓР°Р»РёР·РёСЂРѕРІР°С‚СЊ РёРЅС„РѕСЂРјР°С†РёСЋ Рѕ РєР»РёРµРЅС‚Р°С…',
      subtasks: [
        { id: '1', description: 'РџСЂРѕРІРµСЂРёС‚СЊ РєРѕРЅС‚Р°РєС‚С‹', requiresAttachment: false }
      ],
      assignedTo: ['РћР»СЊРіР° Р’РѕР»РєРѕРІР°, РљРѕРјР°РЅРґР° Рђ'],
      assignedBy: 'РўРёРјР»РёРґ',
      dateAssigned: '2024-01-08',
      completedDate: '2024-01-10',
      reward: { type: 'XP', amount: 150 },
      difficulty: 'СЃСЂРµРґРЅРµРµ',
      status: 'completed'
    }
  ]);

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
  
  // Р”Р°РЅРЅС‹Рµ С„РѕСЂРјС‹ СЃРѕР·РґР°РЅРёСЏ Р·Р°РґР°С‡Рё
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subtasks: [{ id: '1', description: '', requiresAttachment: false }] as Subtask[],
    assignedTo: [] as string[],
    deadline: '',
    reward: { type: 'XP' as 'XP' | 'G-coin', amount: 100 },
    difficulty: 'СЃСЂРµРґРЅРµРµ' as 'Р»РµРіРєРѕРµ' | 'СЃСЂРµРґРЅРµРµ' | 'С‚СЏР¶РµР»РѕРµ'
  });

  const [tempReward, setTempReward] = useState({ type: 'XP' as 'XP' | 'G-coin', amount: 100 });

  // Р¤СѓРЅРєС†РёРё РѕР±СЂР°Р±РѕС‚РєРё Р·Р°РґР°С‡
  const handleCreateTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      subtasks: formData.subtasks.filter(st => st.description.trim()),
      assignedTo: formData.assignedTo,
      assignedBy: 'РђРґРјРёРЅ',
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
      difficulty: 'СЃСЂРµРґРЅРµРµ'
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
    // Р›РѕРіРёРєР° РѕРґРѕР±СЂРµРЅРёСЏ Р·Р°РґР°С‡Рё - РїРµСЂРµРјРµСЃС‚РёС‚СЊ РІ РІС‹РїРѕР»РЅРµРЅРЅС‹Рµ
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
    // РћС‚РєСЂС‹С‚СЊ РјРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РІРІРѕРґР° РїСЂРёС‡РёРЅС‹ РѕС‚РєР»РѕРЅРµРЅРёСЏ
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
      case 'Р»РµРіРєРѕРµ': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'СЃСЂРµРґРЅРµРµ': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'С‚СЏР¶РµР»РѕРµ': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // РЎРѕСЂС‚РёСЂРѕРІРєР° Р·Р°РґР°С‡
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
          {/* Р—Р°РіРѕР»РѕРІРѕРє */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground">РџР°РЅРµР»СЊ СѓРїСЂР°РІР»РµРЅРёСЏ</h2>
          </div>

          {/* РЈРїСЂР°РІР»РµРЅРёРµ */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-4 py-2 glass-card rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
              >
                Р”РѕР±. Р·Р°РґР°С‡Сѓ
              </button>
            </div>
          </div>

          {/* Card СЃ Р°РєС‚РёРІРЅС‹РјРё Р·Р°РґР°С‡Р°РјРё */}
          <div className="px-6">
            <div className="glass-card rounded-2xl apple-shadow p-4">
              {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєРЅРѕРїРєР°РјРё */}
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setHistoryModalOpen(true)}
                  className="glass-card p-3 rounded-xl transition-colors hover:bg-accent/50"
                  title="РСЃС‚РѕСЂРёСЏ Р·Р°РґР°С‡"
                >
                  <History size={16} className="text-foreground/70" />
                </button>
                <h3 className="text-lg font-medium text-foreground">РђРєС‚РёРІРЅС‹Рµ Р·Р°РґР°С‡Рё</h3>
                <div className="relative">
                  <button 
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="glass-card p-3 rounded-xl transition-colors hover:bg-accent/50" 
                    title="РЎРѕСЂС‚РёСЂРѕРІРєР°"
                  >
                    <Menu size={16} className="text-foreground/70" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                      {[
                        { key: 'date', label: 'РџРѕ РґР°С‚Рµ' },
                        { key: 'team', label: 'РџРѕ РєРѕРјР°РЅРґРµ' },
                        { key: 'employee', label: 'РџРѕ СЃРѕС‚СЂСѓРґРЅРёРєСѓ' }
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

              {/* РЎРїРёСЃРѕРє Р°РєС‚РёРІРЅС‹С… Р·Р°РґР°С‡ */}
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
                        РЎС‚Р°С‚СѓСЃ: {task.status === 'needs_revision' ? 'С‚СЂРµР±СѓРµС‚ РґРѕСЂР°Р±РѕС‚РєРё' : 'РІ РїСЂРѕС†РµСЃСЃРµ'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        РЎРѕС‚СЂСѓРґРЅРёРє: {task.assignedTo.join('; ')}
                      </div>
                      {task.status === 'needs_revision' && (
                        <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          вљ пёЏ Р•СЃС‚СЊ Р·Р°РјРµС‡Р°РЅРёСЏ
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
                    РђРєС‚РёРІРЅС‹С… Р·Р°РґР°С‡ РЅРµС‚
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Р‘С‹СЃС‚СЂР°СЏ РЅР°РІРёРіР°С†РёСЏ */}
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

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РёСЃС‚РѕСЂРёРё Р·Р°РґР°С‡ */}
        <Dialog open={historyModalOpen} onOpenChange={setHistoryModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РСЃС‚РѕСЂРёСЏ Р·Р°РґР°С‡</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЃРѕ СЃРїРёСЃРєРѕРј РІС‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡
            </DialogDescription>
            <div className="p-6">
              {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ СЃРѕСЂС‚РёСЂРѕРІРєРѕР№ Рё РєСЂРµСЃС‚РёРєРѕРј */}
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowHistorySortDropdown(!showHistorySortDropdown)}
                    className="glass-card p-3 rounded-xl transition-colors hover:bg-accent/50" 
                    title="РЎРѕСЂС‚РёСЂРѕРІРєР°"
                  >
                    <Menu size={16} className="text-foreground/70" />
                  </button>
                  {showHistorySortDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 glass-card rounded-xl apple-shadow z-10">
                      {[
                        { key: 'date', label: 'РџРѕ РґР°С‚Рµ РІС‹РїРѕР»РЅРµРЅРёСЏ' },
                        { key: 'team', label: 'РџРѕ РєРѕРјР°РЅРґРµ' },
                        { key: 'employee', label: 'РџРѕ СЃРѕС‚СЂСѓРґРЅРёРєСѓ' }
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
                <h3 className="text-lg font-medium text-foreground flex-1 text-center">Р’С‹РїРѕР»РЅРµРЅРЅС‹Рµ Р·Р°РґР°С‡Рё</h3>
                <button
                  onClick={() => setHistoryModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* РЎРїРёСЃРѕРє РІС‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡ */}
              <div className="overflow-y-auto max-h-[calc(80vh-200px)] space-y-3">
                {sortedCompletedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="p-3 border border-border/20 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="text-sm font-medium text-foreground mb-1">{task.title}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      РЎС‚Р°С‚СѓСЃ: РІС‹РїРѕР»РЅРµРЅР°
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      РЎРѕС‚СЂСѓРґРЅРёРє: {task.assignedTo.join('; ')}
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
                    Р’С‹РїРѕР»РЅРµРЅРЅС‹С… Р·Р°РґР°С‡ РЅРµС‚
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ СЃРѕР·РґР°РЅРёСЏ Р·Р°РґР°С‡Рё */}
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="sr-only">РќР°Р·РІР°РЅРёРµ Р·Р°РґР°С‡Рё</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ РЅРѕРІРѕР№ Р·Р°РґР°С‡Рё СЃ РїРѕРґР·Р°РґР°С‡Р°РјРё, РІС‹Р±РѕСЂРѕРј СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ Рё РЅР°СЃС‚СЂРѕР№РєРѕР№ РЅР°РіСЂР°РґС‹
            </DialogDescription>
            <div className="p-6">
              {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєРЅРѕРїРєРѕР№ РЅР°Р·Р°Рґ Рё РІС‹Р±РѕСЂРѕРј СЃРѕС‚СЂСѓРґРЅРёРєР° */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground/70" />
                </button>
                <Input
                  placeholder="РќР°Р·РІР°РЅРёРµ Р·Р°РґР°С‡Рё"
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

              {/* РћРїРёСЃР°РЅРёРµ Р·Р°РґР°С‡Рё СЃ РїРѕРґР·Р°РґР°С‡Р°РјРё */}
              <div className="glass-card rounded-2xl p-4 mb-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">РћРїРёСЃР°РЅРёРµ Р·Р°РґР°С‡Рё</span>
                    <button
                      onClick={addSubtask}
                      className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                  <Textarea
                    placeholder="РћРїРёСЃР°РЅРёРµ С‚РѕРіРѕ, С‡С‚Рѕ РЅСѓР¶РЅРѕ СЃРґРµР»Р°С‚СЊ РґР»СЏ РІС‹РїРѕР»РЅРµРЅРёСЏ Р·Р°РґР°С‡Рё"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-transparent border-none resize-none min-h-16 text-sm focus:outline-none p-0"
                  />
                </div>

                {/* РџРѕРґР·Р°РґР°С‡Рё */}
                <div className="space-y-2">
                  {formData.subtasks.map((subtask, index) => (
                    <div key={subtask.id} className="flex items-center gap-2 pl-2 border-l-2 border-muted">
                      <span className="text-sm">вЂў</span>
                      <Input
                        placeholder="РџРѕРґР·Р°РґР°С‡Р°"
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

              {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ Р·Р°РґР°С‡Рµ */}
              <div className="space-y-3 mb-6">
                <div className="text-sm text-foreground">
                  РЎРѕС‚СЂСѓРґРЅРёРє: {formData.assignedTo.length > 0 ? formData.assignedTo.join('; ') : 'РќРµ РІС‹Р±СЂР°РЅ'}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Р”Р°С‚Р°: {new Date().toLocaleDateString('ru-RU')}</span>
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
                
                {/* РЎР»РѕР¶РЅРѕСЃС‚СЊ Р·Р°РґР°С‡Рё */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">РЎР»РѕР¶РЅРѕСЃС‚СЊ:</span>
                  <div className="relative">
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className="text-sm bg-transparent border border-border rounded px-2 py-1"
                    >
                      <option value="Р»РµРіРєРѕРµ">Р»РµРіРєРѕРµ</option>
                      <option value="СЃСЂРµРґРЅРµРµ">СЃСЂРµРґРЅРµРµ</option>
                      <option value="С‚СЏР¶РµР»РѕРµ">С‚СЏР¶РµР»РѕРµ</option>
                    </select>
                  </div>
                </div>
                
                {/* РќР°РіСЂР°РґР° */}
                <button
                  onClick={handleRewardClick}
                  className="text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 py-1 transition-colors w-full text-left"
                >
                  РќР°РіСЂР°РґР°: {formData.reward.amount} {formData.reward.type}
                </button>
              </div>

              {/* РљРЅРѕРїРєРё РґРµР№СЃС‚РІРёР№ */}
              <div className="flex gap-3">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-full text-sm font-medium transition-colors hover:bg-accent"
                >
                  РћС‚РјРµРЅРёС‚СЊ
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={!formData.title || !formData.description || formData.assignedTo.length === 0}
                  className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  РџСЂРёРјРµРЅРёС‚СЊ
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґРµС‚Р°Р»РµР№ Р·Р°РґР°С‡Рё */}
        <Dialog open={taskDetailModalOpen} onOpenChange={setTaskDetailModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="sr-only">{selectedTask?.title}</DialogTitle>
            <DialogDescription className="sr-only">
              РџРѕРґСЂРѕР±РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ РІС‹Р±СЂР°РЅРЅРѕР№ Р·Р°РґР°С‡Рµ СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ РѕРґРѕР±СЂРµРЅРёСЏ РёР»Рё РѕС‚РєР»РѕРЅРµРЅРёСЏ
            </DialogDescription>
            <div className="p-6">
              {selectedTask && (
                <div className="space-y-4">
                  {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєРЅРѕРїРєР°РјРё РґРµР№СЃС‚РІРёР№ */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-foreground flex-1">{selectedTask.title}</h3>
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => handleRejectTask(selectedTask.id)}
                        disabled={selectedTask.status === 'needs_revision'}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedTask.status === 'needs_revision' 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-red-50 dark:hover:bg-red-900/20'
                        }`}
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                      <button 
                        onClick={() => handleApproveTask(selectedTask.id)}
                        disabled={selectedTask.status === 'needs_revision'}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedTask.status === 'needs_revision' 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'hover:bg-green-50 dark:hover:bg-green-900/20'
                        }`}
                      >
                        <CheckSquare className="w-5 h-5 text-green-500" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    РЎРѕС‚СЂСѓРґРЅРёРє: {selectedTask.assignedTo.join('; ')}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-4">{selectedTask.description}</p>
                  </div>

                  {/* РџРѕРґР·Р°РґР°С‡Рё */}
                  {selectedTask.subtasks.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">РџРѕРґР·Р°РґР°С‡Рё:</h4>
                      <div className="space-y-2">
                        {selectedTask.subtasks.map((subtask) => (
                          <div key={subtask.id} className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-secondary/50 rounded-lg">
                            <span>вЂў</span>
                            <span className="flex-1">{subtask.description}</span>
                            {subtask.requiresAttachment && (
                              <Paperclip className="w-3 h-3 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* РџСЂРёРєСЂРµРїР»РµРЅРЅС‹Рµ С„Р°Р№Р»С‹ */}
                  {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">РџСЂРёРєСЂРµРїР»РµРЅРЅС‹Рµ С„Р°Р№Р»С‹:</h4>
                      <div className="space-y-2">
                        {selectedTask.attachments.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                            <Paperclip className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground flex-1">{file}</span>
                            <button className="text-xs text-primary hover:text-primary/80 px-2 py-1 hover:bg-primary/10 rounded">
                              РћС‚РєСЂС‹С‚СЊ
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* РљРѕРјРјРµРЅС‚Р°СЂРёР№ РѕР± РѕС€РёР±РєРµ */}
                  {selectedTask.rejectionReason && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/40 rounded-lg">
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">
                        РўСЂРµР±СѓРµС‚СЃСЏ РґРѕСЂР°Р±РѕС‚РєР°:
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        {selectedTask.rejectionReason}
                      </p>
                    </div>
                  )}

                  {/* РРЅС„РѕСЂРјР°С†РёСЏ Рѕ Р·Р°РґР°С‡Рµ */}
                  <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/50">
                    <div>РќР°Р·РЅР°С‡РёР»: {selectedTask.assignedBy}</div>
                    <div>Р”Р°С‚Р° РЅР°Р·РЅР°С‡РµРЅРёСЏ: {new Date(selectedTask.dateAssigned).toLocaleDateString('ru-RU')}</div>
                    {selectedTask.deadline && (
                      <div>Р”РµРґР»Р°Р№РЅ: {new Date(selectedTask.deadline).toLocaleDateString('ru-RU')}</div>
                    )}
                    {selectedTask.completedDate && (
                      <div>Р”Р°С‚Р° РІС‹РїРѕР»РЅРµРЅРёСЏ: {new Date(selectedTask.completedDate).toLocaleDateString('ru-RU')}</div>
                    )}
                    <div>РќР°РіСЂР°РґР°: {selectedTask.reward.amount} {selectedTask.reward.type}</div>
                    <div className="flex items-center gap-2">
                      <span>РЎР»РѕР¶РЅРѕСЃС‚СЊ:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(selectedTask.difficulty)}`}>
                        {selectedTask.difficulty}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setTaskDetailModalOpen(false)}
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    Р—Р°РєСЂС‹С‚СЊ
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РІС‹Р±РѕСЂР° СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
        <Dialog open={employeeSelectModalOpen} onOpenChange={setEmployeeSelectModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden max-h-[90vh] overflow-hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РІС‹Р±РѕСЂР° СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ РґР»СЏ РЅР°Р·РЅР°С‡РµРЅРёСЏ Р·Р°РґР°С‡Рё
            </DialogDescription>
            <div className="p-6">
              {/* Р—Р°РіРѕР»РѕРІРѕРє СЃ РєСЂРµСЃС‚РёРєРѕРј */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Menu className="w-5 h-5 text-foreground/70" />
                  <h3 className="text-lg font-medium text-foreground">РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ</h3>
                </div>
                <button
                  onClick={() => setEmployeeSelectModalOpen(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-foreground/70" />
                </button>
              </div>

              {/* РЎРїРёСЃРѕРє СЃРѕС‚СЂСѓРґРЅРёРєРѕРІ */}
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
                Р“РѕС‚РѕРІРѕ ({formData.assignedTo.length} РІС‹Р±СЂР°РЅРѕ)
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РѕС‚РєР»РѕРЅРµРЅРёСЏ Р·Р°РґР°С‡Рё */}
        <Dialog open={rejectionModalOpen} onOpenChange={setRejectionModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РџСЂРёС‡РёРЅР° РѕС‚РєР»РѕРЅРµРЅРёСЏ</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РІРІРѕРґР° РїСЂРёС‡РёРЅС‹ РѕС‚РєР»РѕРЅРµРЅРёСЏ Р·Р°РґР°С‡Рё
            </DialogDescription>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РЈРєР°Р¶РёС‚Рµ, С‡С‚Рѕ РЅСѓР¶РЅРѕ РёСЃРїСЂР°РІРёС‚СЊ:
                  </label>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="РћРїРёС€РёС‚Рµ С‡С‚Рѕ РЅСѓР¶РЅРѕ РґРѕСЂР°Р±РѕС‚Р°С‚СЊ РІ Р·Р°РґР°С‡Рµ..."
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
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    onClick={handleConfirmRejection}
                    disabled={!rejectionReason.trim()}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-full text-sm font-medium transition-colors hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    РћС‚РєР»РѕРЅРёС‚СЊ
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РЅР°СЃС‚СЂРѕР№РєРё РЅР°РіСЂР°РґС‹ */}
        <Dialog open={rewardModalOpen} onOpenChange={setRewardModalOpen}>
          <DialogContent className="bg-background border-none max-w-sm p-0 [&>button]:hidden rounded-3xl">
            <DialogTitle className="text-lg font-medium text-foreground text-center">РќР°СЃС‚СЂРѕР№РєР° РЅР°РіСЂР°РґС‹</DialogTitle>
            <DialogDescription className="sr-only">
              РњРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РґР»СЏ РёР·РјРµРЅРµРЅРёСЏ С‚РёРїР° Рё СЂР°Р·РјРµСЂР° РЅР°РіСЂР°РґС‹ Р·Р° Р·Р°РґР°С‡Сѓ
            </DialogDescription>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РўРёРї РЅР°РіСЂР°РґС‹
                  </label>
                  <select
                    value={tempReward.type}
                    onChange={(e) => setTempReward({ ...tempReward, type: e.target.value as 'XP' | 'G-coin' })}
                    className="w-full p-3 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="XP">РћРїС‹С‚ (XP)</option>
                    <option value="G-coin">РљРѕРёРЅС‹ (G-coin)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    РљРѕР»РёС‡РµСЃС‚РІРѕ
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
                    РћС‚РјРµРЅРёС‚СЊ
                  </button>
                  <button
                    onClick={handleRewardSave}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
                  >
                    РџСЂРёРјРµРЅРёС‚СЊ
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
