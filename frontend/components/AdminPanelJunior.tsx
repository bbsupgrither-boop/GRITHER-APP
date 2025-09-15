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
      adminName={`${adminName} (РњР»Р°РґС€РёР№ РђРґРјРёРЅ)`}
    />
  );
};