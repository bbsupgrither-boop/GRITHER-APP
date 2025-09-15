import React from 'react';
import { CheckSquare, Plus } from 'lucide-react';
import { Task } from '../../types/tasks';
import { User } from '../../types/global';
import { Notification } from '../../types/notifications';

interface TasksPageProps {
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

export default function TasksPage({
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
}: TasksPageProps) {
  // AUTOGEN START tasks-content
  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h1 className="unified-heading">Р—Р°РґР°С‡Рё</h1>
            <p className="unified-text text-muted-foreground">
              {tasks.length} Р·Р°РґР°С‡
            </p>
          </div>
        </div>
        
        <button className="apple-button p-3" aria-label="Р”РѕР±Р°РІРёС‚СЊ Р·Р°РґР°С‡Сѓ">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="glass-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 border-2 border-gray-300 rounded mt-0.5" />
              <div className="flex-1">
                <h3 className="unified-text font-medium mb-1">{task.title}</h3>
                <p className="unified-text text-muted-foreground text-sm mb-2">
                  {task.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>рџ“… {task.dueDate}</span>
                  <span>рџ’° {task.reward?.coins || 0} РјРѕРЅРµС‚</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="glass-card p-8 text-center">
          <CheckSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="unified-heading mb-2">РќРµС‚ Р·Р°РґР°С‡</h3>
          <p className="unified-text text-muted-foreground">
            РќР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ "+" С‡С‚РѕР±С‹ РґРѕР±Р°РІРёС‚СЊ РЅРѕРІСѓСЋ Р·Р°РґР°С‡Сѓ
          </p>
        </div>
      )}
    </div>
  );
  // AUTOGEN END tasks-content
}
