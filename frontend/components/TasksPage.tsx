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
              marginBottom: '24px',
              paddingTop: '20px'
            }}
          >
            <h1 
              style={{
                fontSize: '24px',
                fontWeight: '700',
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
                width: '44px',
                height: '44px',
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
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = '#2066C8';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(43, 130, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#2B82FF';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(43, 130, 255, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
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
              marginBottom: '20px',
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
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background: isActive 
                      ? getStatusColor(filterType)
                      : theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    color: isActive 
                      ? '#FFFFFF'
                      : theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    whiteSpace: 'nowrap',
                    border: 'none',
                    boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                      borderRadius: '20px',
                      padding: '20px',
                      border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                      boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 12px 32px rgba(0, 0, 0, 0.8)' 
                        : '0 12px 32px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme === 'dark' 
                        ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
                        : '0 8px 24px rgba(0, 0, 0, 0.10)';
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                  >
                    {/* Status indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
                        borderRadius: '20px 20px 0 0'
                      }}
                    />
                    
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '12px' }}>
                      {/* Task info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div 
                          style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                            marginBottom: '6px',
                            lineHeight: '1.4'
                          }}
                        >
                          {task.title}
                        </div>
                        <div 
                          style={{
                            fontSize: '14px',
                            color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                            marginBottom: '12px',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar style={{ width: '14px', height: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                            <span 
                              style={{
                                fontSize: '12px',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                              }}
                            >
                              {new Date(task.deadline).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock style={{ width: '14px', height: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }} />
                            <span 
                              style={{
                                fontSize: '12px',
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
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '10px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            background: task.priority === 'high' ? '#EF444420' :
                                       task.priority === 'medium' ? '#FF9F0A20' : '#22C55E20',
                            color: task.priority === 'high' ? '#EF4444' :
                                   task.priority === 'medium' ? '#FF9F0A' : '#22C55E',
                            border: `1px solid ${task.priority === 'high' ? '#EF444440' :
                                   task.priority === 'medium' ? '#FF9F0A40' : '#22C55E40'}`
                          }}
                        >
                          {task.priority === 'high' ? 'Высокий' :
                           task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </div>
                      </div>
                      
                      {/* Status and timer */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                        {/* Status badge */}
                        <div
                          style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            background: statusColor,
                            color: '#FFFFFF',
                            boxShadow: `0 2px 8px ${statusColor}40`
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
                                width: '36px',
                                height: '36px',
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
                                <Pause style={{ width: '16px', height: '16px', color: 'white' }} />
                              ) : (
                                <Play style={{ width: '16px', height: '16px', color: 'white' }} />
                              )}
                            </button>
                            <span 
                              style={{
                                fontSize: '14px',
                                fontFamily: 'monospace',
                                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                                minWidth: '70px',
                                textAlign: 'right',
                                fontWeight: '500'
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
                  borderRadius: '20px',
                  padding: '60px 20px',
                  textAlign: 'center',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
                  boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
                }}
              >
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'rgba(43, 130, 255, 0.1)' : 'rgba(43, 130, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: `2px solid ${theme === 'dark' ? 'rgba(43, 130, 255, 0.2)' : 'rgba(43, 130, 255, 0.1)'}`
                  }}
                >
                  <FileText style={{ width: '40px', height: '40px', color: '#2B82FF' }} />
                </div>
                <h3 
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  Нет задач
                </h3>
                <p 
                  style={{
                    fontSize: '14px',
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    lineHeight: '1.4',
                    marginBottom: '20px'
                  }}
                >
                  {filter === 'all' ? 'Создайте первую задачу' :
                   filter === 'not_started' ? 'Нет не начатых задач' :
                   filter === 'in_progress' ? 'Нет задач в процессе' :
                   filter === 'completed' ? 'Нет завершенных задач' : 'Нет просроченных задач'}
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  style={{
                    padding: '12px 24px',
                    background: '#2B82FF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: '0 4px 12px rgba(43, 130, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2066C8';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(43, 130, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#2B82FF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(43, 130, 255, 0.3)';
                  }}
                >
                  Создать задачу
                </button>
              </div>
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
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            style={{
              background: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              width: '90vw',
              maxWidth: '400px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                Новая задача
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                Функция создания задач в разработке
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {isDetailModalOpen && selectedTask && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setIsDetailModalOpen(false)}
        >
          <div
            style={{
              background: theme === 'dark' ? '#161A22' : '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              width: '90vw',
              maxWidth: '400px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                Детали задачи
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: '600',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                marginBottom: '8px'
              }}>
                {selectedTask.title}
              </h3>
              <p style={{ 
                fontSize: '14px',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                marginBottom: '12px'
              }}>
                {selectedTask.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Дедлайн: {new Date(selectedTask.deadline).toLocaleDateString('ru-RU')}
                </span>
                <span style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
                }}>
                  {selectedTask.reward} {selectedTask.rewardType === 'coins' ? 'монет' : 'опыта'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'transparent',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  border: `1px solid ${theme === 'dark' ? '#A7B0BD' : '#6B7280'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Закрыть
              </button>
              {!selectedTask.completed && (
                <button
                  onClick={() => {
                    handleCompleteTask(selectedTask.id);
                    setIsDetailModalOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#22C55E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Выполнить
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
