import React, { useState } from 'react';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Star from 'lucide-react/dist/esm/icons/star';
import Target from 'lucide-react/dist/esm/icons/target';
import Zap from 'lucide-react/dist/esm/icons/zap';

interface Task {
  id: string;
  title: string;
  description: string;
  reward: {
    xp: number;
    coins: number;
  };
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TasksPageProps {
  user: {
    level: number;
    xp: number;
    coins: number;
  };
}

export const TasksPage = ({ user }: TasksPageProps): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Первые шаги',
      description: 'Выполните 3 задания',
      reward: { xp: 50, coins: 100 },
      progress: 2,
      maxProgress: 3,
      isCompleted: false,
      category: 'Обучение',
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Активный участник',
      description: 'Создайте 5 битв',
      reward: { xp: 100, coins: 200 },
      progress: 1,
      maxProgress: 5,
      isCompleted: false,
      category: 'Битвы',
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Победитель',
      description: 'Выиграйте 10 битв',
      reward: { xp: 200, coins: 500 },
      progress: 0,
      maxProgress: 10,
      isCompleted: false,
      category: 'Битвы',
      difficulty: 'hard'
    },
    {
      id: '4',
      title: 'Мастер достижений',
      description: 'Получите 5 достижений',
      reward: { xp: 150, coins: 300 },
      progress: 3,
      maxProgress: 5,
      isCompleted: false,
      category: 'Достижения',
      difficulty: 'medium'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return 'Неизвестно';
    }
  };

  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: true, progress: task.maxProgress }
        : task
    ));
  };

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalTasks = tasks.length;

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Задания</h1>
              <p className="text-gray-600 mt-1">Выполняйте задания для получения наград</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completedTasks}/{totalTasks}</div>
              <div className="text-sm text-gray-500">Выполнено</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="container">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Общий прогресс</h3>
            <span className="text-sm text-gray-500">
              {Math.round((completedTasks / totalTasks) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="container">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`card ${task.isCompleted ? 'opacity-75' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(task.difficulty)}`}>
                      {getDifficultyLabel(task.difficulty)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{task.reward.xp} XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{task.reward.coins} монет</span>
                    </div>
                  </div>
                </div>
                {task.isCompleted && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Прогресс</span>
                  <span>{task.progress}/{task.maxProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      task.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              {!task.isCompleted && task.progress >= task.maxProgress ? (
                <button
                  onClick={() => completeTask(task.id)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Получить награду</span>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Clock className="w-5 h-5" />
                  <span>В процессе</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
