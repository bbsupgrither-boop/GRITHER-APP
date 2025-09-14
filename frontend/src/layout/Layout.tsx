import React from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../shared/ErrorBoundary';
import { BottomNavigation } from '../../components/BottomNavigation';
import { Header } from '../../components/Header';

interface LayoutProps {
  theme: 'light' | 'dark';
  currentUser: any;
  notifications: any[];
  onNavigate: (page: string) => void;
  onOpenSettings: () => void;
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead: () => void;
  onRemoveNotification: (id: string) => void;
  onClearAllNotifications: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  theme,
  currentUser,
  notifications,
  onNavigate,
  onOpenSettings,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onRemoveNotification,
  onClearAllNotifications,
}) => {
  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
      <Header
        theme={theme}
        currentUser={currentUser}
        notifications={notifications}
        onNavigate={onNavigate}
        onOpenSettings={onOpenSettings}
        onMarkNotificationAsRead={onMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
        onRemoveNotification={onRemoveNotification}
        onClearAllNotifications={onClearAllNotifications}
      />
      
      <main className="container">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      
      <BottomNavigation theme={theme} />
    </div>
  );
};
