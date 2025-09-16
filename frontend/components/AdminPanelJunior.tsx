import React from 'react';
import { AdminPanelMain } from './AdminPanelMain';

interface AdminPanelJuniorProps {
  onClose: () => void;
  theme: 'light' | 'dark';
  adminName: string;
}

export const AdminPanelJunior: React.FC<AdminPanelJuniorProps> = ({ 
  onClose, 
  theme, 
  adminName 
}) => {
  return (
    <AdminPanelMain 
      theme={theme}
      onClose={onClose}
      adminName={`${adminName} (Р В РЎС™Р В Р’В»Р В Р’В°Р В РўвЂР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦)`}
    />
  );
};