import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { BackgroundFX } from './BackgroundFX';
import { 
  Plus, 
  Clock, 
  Play, 
  Pause, 
  Square, 
  FileText, 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Timer,
  Paperclip,
  Edit3,
  Trash2
} from 'lucide-react';
import { Task } from '../types/tasks';
import { User } from '../types/global';
import { Notification } from '../types/notifications';

interface TasksPageProps {
  onNavigate: (page: string) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  theme: 'light' | 'dark';
  user?: User;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onRemoveNotification?: (id: string) => void;
  onClearAllNotifications?: () => void;
  onOpenSettings?: () => void;
}

type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue';
type FilterType = 'all' | 'not_started' | 'in_progress' | 'completed' | 'overdue';

export const TasksPage: React.FC<TasksPageProps> = ({
  onNavigate,
  tasks,
  setTasks,
  theme,
  user,
  notifications = [],
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
  onOpenSettings = () => {},
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<{ [key: string]: number }>({});
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (activeTimer && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => ({
          ...prev,
          [activeTimer]: (prev[activeTimer] || 0) + 1
        }));
      }, 1000);
    } else if (!activeTimer && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeTimer]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTaskStatus = (task: Task): TaskStatus => {
    const now = new Date();
    const deadline = new Date(task.deadline);
    
    if (task.completed) return 'completed';
    if (now > deadline) return 'overdue';
    if (task.status === 'in_progress') return 'in_progress';
    return 'not_started';
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'overdue': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'in_progress': return <Clock className="w-5 h-5" />;
      case 'overdue': return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return getTaskStatus(task) === filter;
  });

  const handleTimerToggle = (taskId: string) => {
    if (activeTimer === taskId) {
      setActiveTimer(null);
    } else {
      setActiveTimer(taskId);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => 
        task.id === taskId
        ? { ...task, completed: true, status: 'completed' }
          : task
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setTasks(tasks.map(task => 
        task.id === taskId
          ? { ...task, attachedFiles: [...(task.attachedFiles || []), file.name] }
          : task
      ));
    }
    setIsFileUploadOpen(false);
  };

  const handleCreateTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'not_started',
      completed: false,
      timeSpent: 0
    };
    setTasks([...tasks, task]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <BackgroundFX theme={theme} />
      <Header 
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        theme={theme}
        user={user}
        notifications={notifications}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />
      
      <div className="min-h-screen px-4 py-8 pb-32">
        {/* AUTOGEN START tasks-content */}
        <div
          style={{
            maxWidth: '448px',
            margin: '0 auto',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: 'calc(96px + env(safe-area-inset-bottom))'
          }}
        >
          {/* Header with title and add button */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingTop: '20px'
            }}
          >
            <h1 
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                margin: 0
              }}
            >
              Задачи
            </h1>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              aria-label="Создать новую задачу"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: '#2B82FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                boxShadow: '0 4px 12px rgba(43, 130, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = '#2066C8';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(43, 130, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#2B82FF';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(43, 130, 255, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Plus style={{ width: '20px', height: '20px', color: 'white' }} />
            </button>
          </div>

          {/* Filter tabs */}
          <div 
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}
          >
            {(['all', 'not_started', 'in_progress', 'completed', 'overdue'] as FilterType[]).map((filterType) => {
              const isActive = filter === filterType;
              const getStatusColor = (status: FilterType) => {
                switch (status) {
                  case 'completed': return '#22C55E';
                  case 'in_progress': return '#2B82FF';
                  case 'overdue': return '#EF4444';
                  case 'not_started': return '#6B7280';
                  default: return '#2B82FF';
                }
              };
              
              return (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  aria-label={`Фильтр: ${filterType === 'all' ? 'Все задачи' :
                    filterType === 'not_started' ? 'Не начатые' :
                    filterType === 'in_progress' ? 'В процессе' :
                    filterType === 'completed' ? 'Завершенные' : 'Просроченные'}`}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: isActive 
                      ? `${getStatusColor(filterType)}20`
                      : theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    color: isActive 
                      ? getStatusColor(filterType)
                      : theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    whiteSpace: 'nowrap',
                    border: isActive 
                      ? `1px solid ${getStatusColor(filterType)}40`
                      : theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {filterType === 'all' ? 'Все' :
                   filterType === 'not_started' ? 'Не начаты' :
                   filterType === 'in_progress' ? 'В процессе' :
                   filterType === 'completed' ? 'Завершены' : 'Просрочены'}
                </button>
              );
            })}
          </div>

          {/* Tasks list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const taskStatus = getTaskStatus(task);
                const statusColor = taskStatus === 'completed' ? '#22C55E' :
                                  taskStatus === 'in_progress' ? '#2B82FF' :
                                  taskStatus === 'overdue' ? '#EF4444' : '#6B7280';
                
                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    style={{
                      backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                      borderRadius: '16px',
                      padding: '16px',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                      boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(0.98)';
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 12px 32px rgba(0, 0, 0, 0.8)' 
                        : '0 12px 32px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
                        : '0 8px 24px rgba(0, 0, 0, 0.10)';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.96)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                  >
                    {/* Status indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, ${statusColor}40, ${statusColor}80, ${statusColor}40)`,
                        borderRadius: '16px 16px 0 0'
                      }}
                    />
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '8px' }}>
                      {/* Task info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div 
                          style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                            marginBottom: '4px',
                            lineHeight: '1.4'
                          }}
                        >
                          {task.title}
                        </div>
                        <div 
                          style={{
                            fontSize: '12px',
                            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                            marginBottom: '8px',
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {task.description}
                        </div>
                        
                        {/* Task metadata */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar style={{ width: '12px', height: '12px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                            <span 
                              style={{
                                fontSize: '10px',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}
                            >
                              {new Date(task.deadline).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock style={{ width: '12px', height: '12px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                            <span 
                              style={{
                                fontSize: '10px',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}
                            >
                              {task.reward} {task.rewardType === 'coins' ? 'монет' : 'опыта'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Priority indicator */}
                        <div 
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '8px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            background: task.priority === 'high' ? '#EF444420' :
                                       task.priority === 'medium' ? '#FF9F0A20' : '#22C55E20',
                            color: task.priority === 'high' ? '#EF4444' :
                                   task.priority === 'medium' ? '#FF9F0A' : '#22C55E'
                          }}
                        >
                          {task.priority === 'high' ? 'Высокий' :
                           task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </div>
                      </div>
                      
                      {/* Status and timer */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                        {/* Status badge */}
                        <div
                          style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            background: `${statusColor}20`,
                            color: statusColor,
                            border: `1px solid ${statusColor}40`
                          }}
                        >
                          {taskStatus === 'completed' ? 'Завершена' :
                           taskStatus === 'in_progress' ? 'В процессе' :
                           taskStatus === 'overdue' ? 'Просрочена' : 'Не начата'}
                        </div>
                        
                        {/* Timer controls */}
                        {taskStatus === 'in_progress' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTimerToggle(task.id);
                              }}
                              aria-label={activeTimer === task.id ? 'Остановить таймер' : 'Запустить таймер'}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: 'none',
                                background: activeTimer === task.id ? '#EF4444' : '#22C55E',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 200ms ease',
                                boxShadow: activeTimer === task.id 
                                  ? '0 4px 12px rgba(239, 68, 68, 0.3)' 
                                  : '0 4px 12px rgba(34, 197, 94, 0.3)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'scale(0.95)';
                              }}
                              onMouseUp={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                            >
                              {activeTimer === task.id ? (
                                <Pause style={{ width: '14px', height: '14px', color: 'white' }} />
                              ) : (
                                <Play style={{ width: '14px', height: '14px', color: 'white' }} />
                              )}
                            </button>
                            <span 
                              style={{
                                fontSize: '12px',
                                fontFamily: 'monospace',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                                minWidth: '60px',
                                textAlign: 'right'
                              }}
                            >
                              {formatTime(timerSeconds[task.id] || 0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
                  borderRadius: '16px',
                  padding: '48px 16px',
                  textAlign: 'center',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <FileText style={{ width: '32px', height: '32px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                </div>
                <h3 
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Нет задач
                </h3>
                <p 
                  style={{
                    fontSize: '12px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    lineHeight: '1.4'
                  }}
                >
                  {filter === 'all' ? 'Создайте первую задачу' :
                   filter === 'not_started' ? 'Нет не начатых задач' :
                   filter === 'in_progress' ? 'Нет задач в процессе' :
                   filter === 'completed' ? 'Нет завершенных задач' : 'Нет просроченных задач'}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* AUTOGEN END tasks-content */}
                
                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer hover:scale-98 ${
                      theme === 'dark' 
                        ? 'bg-gray-700/50 hover:bg-gray-700/70' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    } ${status === 'completed' ? 'opacity-60' : ''}`}
                  >
                    {/* Status icon */}
                    <div className={`${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                    </div>
                    
                    {/* Task info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{task.title}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.deadline).toLocaleDateString('ru-RU')}
                      </div>
                      {task.attachedFiles && task.attachedFiles.length > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <Paperclip className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-500">
                            {task.attachedFiles.length} файл(ов)
                          </span>
                        </div>
                      )}
                          </div>

                    {/* Timer and controls */}
                    <div className="flex items-center gap-2">
                      {isTimerActive && (
                        <div className="text-xs text-blue-500 font-mono">
                          {formatTime(timeSpent)}
                        </div>
                      )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          handleTimerToggle(task.id);
                        }}
                        className={`p-2 rounded-full transition-all ${
                          isTimerActive
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {isTimerActive ? (
                          <Square className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* AUTOGEN END tasks-content */}
      </div>

      <BottomNavigation 
        currentPage="tasks"
        onNavigate={onNavigate}
        theme={theme}
      />

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          theme={theme}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateTask}
        />
      )}

      {/* Task Detail Modal */}
      {isDetailModalOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          theme={theme}
          onClose={() => setIsDetailModalOpen(false)}
          onComplete={() => handleCompleteTask(selectedTask.id)}
          onFileUpload={(file) => handleFileUpload(file, selectedTask.id)}
          isTimerActive={activeTimer === selectedTask.id}
          timeSpent={timerSeconds[selectedTask.id] || 0}
          onTimerToggle={() => handleTimerToggle(selectedTask.id)}
        />
      )}
    </div>
  );
};

// Create Task Modal Component
interface CreateTaskModalProps {
  theme: 'light' | 'dark';
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id'>) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ theme, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate({
        title: title.trim(),
        description: description.trim(),
        deadline,
        priority,
        status: 'not_started',
        completed: false,
        createdAt: new Date().toISOString(),
        timeSpent: 0
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center"
         style={{ 
           zIndex: 99999, 
           pointerEvents: 'auto',
           backgroundColor: 'rgba(0, 0, 0, 1)',
           backdropFilter: 'blur(10px)',
           WebkitBackdropFilter: 'blur(10px)',
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           width: '100vw',
           height: '100vh'
         }}>
      <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Новая задача</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Название</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Введите название задачи"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              rows={3}
              placeholder="Описание задачи (необязательно)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Дедлайн</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full p-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Приоритет</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className={`w-full p-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              Отменить
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 rounded-xl bg-blue-500 text-white"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Task Detail Modal Component
interface TaskDetailModalProps {
  task: Task;
  theme: 'light' | 'dark';
  onClose: () => void;
  onComplete: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isTimerActive: boolean;
  timeSpent: number;
  onTimerToggle: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  theme,
  onClose,
  onComplete,
  onFileUpload,
  isTimerActive,
  timeSpent,
  onTimerToggle
}) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center"
         style={{ 
           zIndex: 99999, 
           pointerEvents: 'auto',
           backgroundColor: 'rgba(0, 0, 0, 1)',
           backdropFilter: 'blur(10px)',
           WebkitBackdropFilter: 'blur(10px)',
           position: 'fixed',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           width: '100vw',
           height: '100vh'
         }}>
      <div className={`p-6 rounded-2xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Детали задачи</h2>
                            <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
                            </button>
                          </div>

        <div className="space-y-6">
          {/* Task Info */}
          <div>
            <h3 className="font-medium text-lg mb-2">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-gray-400 mb-4">{task.description}</p>
                  )}
                </div>

          {/* Task Details */}
          <div className={`p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
                  <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Дедлайн:</span>
                <span className="text-sm">{new Date(task.deadline).toLocaleString('ru-RU')}</span>
                    </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Приоритет:</span>
                <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                  {task.priority === 'high' ? 'Высокий' : 
                   task.priority === 'medium' ? 'Средний' : 'Низкий'}
                </span>
                    </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Статус:</span>
                <span className="text-sm">
                  {task.completed ? 'Выполнено' : 
                   task.status === 'in_progress' ? 'В работе' : 'Не начато'}
                </span>
                    </div>
                  </div>
                </div>

          {/* Timer */}
          <div className={`p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Время работы</span>
              <span className="text-sm font-mono">{formatTime(timeSpent)}</span>
                </div>
                  <button
              onClick={onTimerToggle}
              className={`w-full py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                isTimerActive
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isTimerActive ? (
                <>
                  <Square className="w-4 h-4" />
                  Остановить
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Запустить
                </>
              )}
                  </button>
          </div>

          {/* Attached Files */}
          <div className={`p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Прикрепленные файлы</span>
              <label className="p-1 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                <Upload className="w-4 h-4" />
              <input
                type="file"
                  onChange={onFileUpload}
                className="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              </label>
            </div>
            {task.attachedFiles && task.attachedFiles.length > 0 ? (
              <div className="space-y-2">
                {task.attachedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Paperclip className="w-3 h-3 text-blue-500" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400">Нет прикрепленных файлов</div>
            )}
            </div>

          {/* Actions */}
          {!task.completed && (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2 px-4 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                Закрыть
              </button>
              <button
                onClick={onComplete}
                className="flex-1 py-2 px-4 rounded-xl bg-green-500 text-white"
              >
                Выполнить
              </button>
            </div>
          )}
                      </div>
                    </div>
                  </div>
  );
};