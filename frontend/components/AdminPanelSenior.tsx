import React from 'react';
import { AdminPanelMain } from './AdminPanelMain';

interface AdminPanelSeniorProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  adminName: string;
}

export const AdminPanelSenior: React.FC<AdminPanelSeniorProps> = ({ 
  onClose, 
  theme, 
  adminName 
}) => {
  return (
    <AdminPanelMain 
      theme={theme}
      onClose={onClose}
      adminName={`${adminName} (Старший Админ)`}
    />
  );
};