import React from 'react';
import { AdminPanelMain } from './AdminPanelMain';

interface AdminPanelTeamLeadProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  teamMembers: any[];
  teamLead: any;
}

export const AdminPanelTeamLead: React.FC<AdminPanelTeamLeadProps> = ({ 
  onClose, 
  theme, 
  teamMembers,
  teamLead
}) => {
  return (
    <AdminPanelMain 
      theme={theme}
      onClose={onClose}
      adminName={`${teamLead.name} (Тимлид)`}
    />
  );
};