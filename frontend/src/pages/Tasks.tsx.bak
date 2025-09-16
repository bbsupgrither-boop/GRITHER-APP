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
            <h1 className="unified-heading">Р вЂ”Р В°Р Т‘Р В°РЎвЂЎР С‘</h1>
            <p className="unified-text text-muted-foreground">
              {tasks.length} Р В·Р В°Р Т‘Р В°РЎвЂЎ
            </p>
          </div>
        </div>
        
        <button className="apple-button p-3" aria-label="Р вЂќР С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“">
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
                  <span>СЂСџвЂњвЂ¦ {task.dueDate}</span>
                  <span>СЂСџвЂ™В° {task.reward?.coins || 0} Р СР С•Р Р…Р ВµРЎвЂљ</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="glass-card p-8 text-center">
          <CheckSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="unified-heading mb-2">Р СњР ВµРЎвЂљ Р В·Р В°Р Т‘Р В°РЎвЂЎ</h3>
          <p className="unified-text text-muted-foreground">
            Р СњР В°Р В¶Р СР С‘РЎвЂљР Вµ Р С”Р Р…Р С•Р С—Р С”РЎС“ "+" РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р Т‘Р С•Р В±Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р Р…Р С•Р Р†РЎС“РЎР‹ Р В·Р В°Р Т‘Р В°РЎвЂЎРЎС“
          </p>
        </div>
      )}
    </div>
  );
  // AUTOGEN END tasks-content
}
