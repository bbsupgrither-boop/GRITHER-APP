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
      adminName={`${adminName} (Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦)`}
    />
  );
};