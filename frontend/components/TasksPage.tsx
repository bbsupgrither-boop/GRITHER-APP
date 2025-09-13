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

interface TasksPageProps {
  onNavigate: (page: string) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  theme: 'light' | 'dark';
}

type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue';
type FilterType = 'all' | 'not_started' | 'in_progress' | 'completed' | 'overdue';

export const TasksPage: React.FC<TasksPageProps> = ({
  onNavigate,
  tasks,
  setTasks,
  theme,
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
        onOpenSettings={() => {}}
        theme={theme}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-md pb-32">
        <div className="glass-card p-6">
          {/* Header with filter and add button */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold">Задачи</h1>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className={`p-2 rounded-xl transition-all hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/20' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[
              { key: 'all', label: 'Все' },
              { key: 'not_started', label: 'Не начато' },
              { key: 'in_progress', label: 'В работе' },
              { key: 'completed', label: 'Выполнено' },
              { key: 'overdue', label: 'Просрочено' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as FilterType)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                  filter === key
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Tasks list */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">Нет задач</div>
              <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="text-blue-500 text-sm"
                >
                  Создать первую задачу
              </button>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const status = getTaskStatus(task);
                const isTimerActive = activeTimer === task.id;
                const timeSpent = timerSeconds[task.id] || 0;
                
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