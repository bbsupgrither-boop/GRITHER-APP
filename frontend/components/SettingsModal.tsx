import React, { useState, useEffect } from 'react';
import { X, Bell, Palette, MessageCircle, Shield, Eye, EyeOff, Paperclip, ChevronRight } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate?: (page: string) => void;
  onOpenAdminPanel?: () => void;
  onOpenProblemReport?: () => void;
  userId?: string;
}

// Р В РІР‚ВР В Р’В°Р В Р’В·Р В Р’В° Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ 
const ADMIN_USERS = [
  // РЎР‚РЎСџР РЏРІР‚В  Р В РІР‚СљР В РІР‚С”Р В РЎвЂ™Р В РІР‚в„ўР В РЎСљР В Р’В«Р В РІР‚Сћ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В Р’В« (Р В Р вЂ Р РЋРІР‚в„–Р РЋР С“Р РЋРІвЂљВ¬Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В°)
  { telegramId: '123456789', username: 'ivan_petrov', role: 'Р В РЎвЂ“Р В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  { telegramId: '987654321', username: 'maria_sidorova', role: 'Р В РЎвЂ“Р В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  
  // РЎР‚РЎСџРўС’РІР‚РЋ Р В Р Р‹Р В РЎС›Р В РЎвЂ™Р В Р’В Р В Р РѓР В Р’ВР В РІР‚Сћ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В Р’В«
  { telegramId: '111222333', username: 'alexey_kozlov', role: 'Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  { telegramId: '444555666', username: 'elena_morozova', role: 'Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  { telegramId: '1609556178', username: 'admin_senior', role: 'Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  
  // РЎР‚РЎСџРўС’РІвЂљВ¬ Р В РЎС™Р В РІР‚С”Р В РЎвЂ™Р В РІР‚СњР В Р РѓР В Р’ВР В РІР‚Сћ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В Р’В«
  { telegramId: '777888999', username: 'dmitry_volkov', role: 'Р В РЎВР В Р’В»Р В Р’В°Р В РўвЂР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  { telegramId: '000111222', username: 'anna_lebedeva', role: 'Р В РЎВР В Р’В»Р В Р’В°Р В РўвЂР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦' },
  
  // РЎР‚РЎСџРІР‚ВРўС’ Р В РЎС›Р В Р’ВР В РЎС™Р В РІР‚С”Р В Р’ВР В РІР‚СњР В Р’В«
  { telegramId: '333444555', username: 'sergey_orlov', role: 'Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ', teamNumber: 1 },
  { telegramId: '666777888', username: 'olga_sokolova', role: 'Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ', teamNumber: 2 },
  { telegramId: '999000111', username: 'mikhail_rybakov', role: 'Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ', teamNumber: 3 }
];

// Р В Р Р‹Р В Р’ВµР В РЎвЂќР РЋР вЂљР В Р’ВµР РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РўвЂР РЋРІР‚в„– Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°
const SECRET_CODES = {
  'df1GE%LwVAAC': 'Р В РЎвЂ“Р В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦',    // Р В РЎСџР В РЎвЂўР В Р’В»Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ” Р В РЎвЂќР В РЎвЂў Р В Р вЂ Р РЋР С“Р В Р’ВµР В РЎВ Р РЋРІР‚С›Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏР В РЎВ
  '0caFyNh}w%': 'Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦',      // Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ, Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В РЎвЂўР В РЎВ
  '~3SogEhz': 'Р В РЎВР В Р’В»Р В Р’В°Р В РўвЂР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“_Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦',        // Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ, Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР РЋР С“Р В РЎВР В РЎвЂўР РЋРІР‚С™Р РЋР вЂљ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В РЎвЂ
  'SToU{~': 'Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ'                  // Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В РЎвЂўР В РІвЂћвЂ“, Р В Р’В·Р В Р’В°Р В РўвЂР В Р’В°Р РЋРІР‚РЋР В Р’В°Р В РЎВР В РЎвЂ
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  onNavigate,
  onOpenAdminPanel,
  onOpenProblemReport,
  userId
}) => {
  const [notifications, setNotifications] = useState(true);
  const [themeToggleCount, setThemeToggleCount] = useState(0);
  const [adminAuthorized, setAdminAuthorized] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [secretCodeModalOpen, setSecretCodeModalOpen] = useState(false);
  
  // Р В Р’ВР РЋР С“Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р РЋРЎвЂњР В Р’ВµР В РЎВ Р РЋРІР‚В¦Р РЋРЎвЂњР В РЎвЂќ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏ
  const { user, canAccessAdminPanel, userRole } = useUserRole(userId || '');
  const [reportText, setReportText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [telegramId, setTelegramId] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р РЋР вЂљР РЋРЎвЂњР В Р’В·Р В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р РЋР С“Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР РЋР РЏР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р В РЎвЂР В Р’В°Р В Р’В»Р В РЎвЂР В Р’В·Р В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications !== null) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР РЏР В Р’ВµР В РЎВ Р В Р’В°Р В Р вЂ Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР В Р’В·Р В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР вЂ№ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В Р’В°
    const adminData = localStorage.getItem('adminLoginData');
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        if (parsedData.telegramId && parsedData.accessCode) {
          setAdminAuthorized(true);
        }
      } catch (error) {
        console.error('Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В Р’Вµ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р РЋР С“Р В РЎвЂќР В РЎвЂР РЋРІР‚В¦ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦:', error);
      }
    }
  }, []);

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', JSON.stringify(checked));
  };

  const handleThemeToggle = () => {
    // Р Р†РЎв„ўР’В Р С—РЎвЂР РЏ Р В РІР‚в„ўР В РЎвЂ™Р В РІР‚вЂњР В РЎСљР В РЎвЂє: Р В Р Р‹Р РЋРІР‚РЋР В РЎвЂР РЋРІР‚С™Р В Р’В°Р В Р’ВµР В РЎВ Р РЋРІР‚С™Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В РЎвЂќР В РЎвЂў Р В РІР‚в„ўР В РЎв„ўР В РІР‚С”Р В Р’В®Р В Р’В§Р В РІР‚СћР В РЎСљР В Р’ВР В Р вЂЎ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„– (Р В Р вЂ¦Р В Р’Вµ Р В Р вЂ Р РЋРІР‚в„–Р В РЎвЂќР В Р’В»Р РЋР вЂ№Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ)
    if (theme === 'light') { // Р В РІР‚СћР РЋР С“Р В Р’В»Р В РЎвЂ Р РЋРІР‚С™Р В Р’ВµР В РЎвЂќР РЋРЎвЂњР РЋРІР‚В°Р В Р’В°Р РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р РЋР С“Р В Р вЂ Р В Р’ВµР РЋРІР‚С™Р В Р’В»Р В Р’В°Р РЋР РЏ Р В РЎвЂ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р’ВµР В РЎвЂќР В Р’В»Р РЋР вЂ№Р РЋРІР‚РЋР В Р’В°Р В Р’ВµР В РЎВ Р В Р вЂ¦Р В Р’В° Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р РЋРЎвЂњР РЋР вЂ№
      const newCount = themeToggleCount + 1;
      setThemeToggleCount(newCount);
      
      console.log(`РЎР‚РЎСџРІР‚СњРЎС› Р В Р Р‹Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќ Р В Р вЂ Р В РЎвЂќР В Р’В»Р РЋР вЂ№Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–: ${newCount}/8`);
      
      // РЎР‚РЎСџРІР‚СњРЎвЂ™ Р В Р Р‹Р В РІР‚СћР В РЎв„ўР В Р’В Р В РІР‚СћР В РЎС›Р В РЎСљР В РЎвЂ™Р В Р вЂЎ Р В РЎвЂ™Р В РЎв„ўР В РЎС›Р В Р’ВР В РІР‚в„ўР В РЎвЂ™Р В Р’В¦Р В Р’ВР В Р вЂЎ Р В РЎСљР В РЎвЂ™ 8-Р В РЎС™ Р В РІР‚в„ўР В РЎв„ўР В РІР‚С”Р В Р’В®Р В Р’В§Р В РІР‚СћР В РЎСљР В Р’ВР В Р’В
      if (newCount === 8) {
        console.log('РЎР‚РЎСџРЎв„ўР вЂљ Р В Р Р‹Р В РІР‚СћР В РЎв„ўР В Р’В Р В РІР‚СћР В РЎС›Р В РЎСљР В Р’В«Р В РІвЂћСћ Р В РЎв„ўР В РЎвЂєР В РІР‚Сњ Р В РЎвЂ™Р В РЎв„ўР В РЎС›Р В Р’ВР В РІР‚в„ўР В Р’ВР В Р’В Р В РЎвЂєР В РІР‚в„ўР В РЎвЂ™Р В РЎСљ!');
        setSecretCodeModalOpen(true);
        setThemeToggleCount(0); // Р В Р Р‹Р В Р’В±Р РЋР вЂљР В Р’В°Р РЋР С“Р РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р РЋР С“Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќ
      }
    }
    
    onToggleTheme(); // Р В РІР‚в„ўР РЋРІР‚в„–Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р РЋР РЏР В Р’ВµР В РЎВ Р В РЎвЂўР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р В РЎвЂ”Р В Р’ВµР РЋР вЂљР В Р’ВµР В РЎвЂќР В Р’В»Р РЋР вЂ№Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„–
  };

  const handleReportSubmit = () => {
    const reportData = {
      text: reportText,
      file: selectedFile,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('РЎР‚РЎСџРІР‚СљР’В§ Р В РЎвЂєР РЋРІР‚С™Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦:', reportData);
    
    setReportModalOpen(false);
    setReportText('');
    setSelectedFile(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSecretCodeSubmit = () => {
    if (telegramId && secretCode) {
      // 1Р С—РЎвЂР РЏР Р†РЎвЂњР в‚¬ Р В РЎСџР В Р’В Р В РЎвЂєР В РІР‚в„ўР В РІР‚СћР В Р’В Р В РЎв„ўР В РЎвЂ™ Р В РІР‚в„ўР В РЎвЂ™Р В РІР‚С”Р В Р’ВР В РІР‚СњР В РЎСљР В РЎвЂєР В Р Р‹Р В РЎС›Р В Р’В Р В РЎв„ўР В РЎвЂєР В РІР‚СњР В РЎвЂ™
      const role = SECRET_CODES[secretCode as keyof typeof SECRET_CODES];
      if (!role) {
        alert('Р Р†РЎСљР Р‰ Р В РЎСљР В Р’ВµР В Р вЂ Р В Р’ВµР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂќР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°');
        return;
      }
      
      // 2Р С—РЎвЂР РЏР Р†РЎвЂњР в‚¬ Р В РЎСџР В РЎвЂєР В Р’ВР В Р Р‹Р В РЎв„ў Р В РЎСџР В РЎвЂєР В РІР‚С”Р В Р’В¬Р В РІР‚вЂќР В РЎвЂєР В РІР‚в„ўР В РЎвЂ™Р В РЎС›Р В РІР‚СћР В РІР‚С”Р В Р вЂЎ Р В РІР‚в„ў Р В РІР‚ВР В РЎвЂ™Р В РІР‚вЂќР В РІР‚Сћ
        const user = ADMIN_USERS.find(u => 
          u.telegramId === telegramId && u.role === role
        );
        
      if (!user) {
        alert(`Р Р†РЎСљР Р‰ Р В РЎСџР В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰ Р РЋР С“ ID ${telegramId} Р В Р вЂ¦Р В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В РІвЂћвЂ“Р В РўвЂР В Р’ВµР В Р вЂ¦ Р В Р вЂ  Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ "${role}"`);
        return;
      }
      
      // 3Р С—РЎвЂР РЏР Р†РЎвЂњР в‚¬ Р В Р в‚¬Р В Р Р‹Р В РЎСџР В РІР‚СћР В Р РѓР В РЎСљР В РЎвЂ™Р В Р вЂЎ Р В РЎвЂ™Р В РІР‚в„ўР В РЎС›Р В РЎвЂєР В Р’В Р В Р’ВР В РІР‚вЂќР В РЎвЂ™Р В Р’В¦Р В Р’ВР В Р вЂЎ
      console.log('Р Р†РЎС™РІР‚В¦ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В Р’В°Р В Р вЂ Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦:', user);
      
      // Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р РЋР РЏР В Р’ВµР В РЎВ Р В РўвЂР В Р’В°Р В Р вЂ¦Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р В РўвЂР В Р’В»Р РЋР РЏ AdminPanel
          localStorage.setItem('adminLoginData', JSON.stringify({
            telegramId,
        accessCode: secretCode,
        role: user.role,
        username: user.username,
        loginTime: new Date().toISOString()
          }));
          
      // Р Р†РЎС™РІР‚В¦ Р В Р в‚¬Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р В Р вЂ¦Р В Р’В°Р В Р вЂ Р В Р’В»Р В РЎвЂР В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р РЋРІР‚С›Р В Р’В»Р В Р’В°Р В РЎвЂ“ Р В Р’В°Р В Р вЂ Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР В Р’В·Р В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ (Р В РЎв„ўР В РЎСљР В РЎвЂєР В РЎСџР В РЎв„ўР В РЎвЂ™ Р В РЎСџР В РЎвЂєР В Р вЂЎР В РІР‚в„ўР В Р’ВР В РЎС›Р В Р Р‹Р В Р вЂЎ Р В РІР‚в„ў Р В РЎСљР В РЎвЂ™Р В Р Р‹Р В РЎС›Р В Р’В Р В РЎвЂєР В РІвЂћСћР В РЎв„ўР В РЎвЂ™Р В РўС’)
      setAdminAuthorized(true);
          
      // Р В РІР‚вЂќР В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р РЋР С“Р В Р’ВµР В РЎвЂќР РЋР вЂљР В Р’ВµР РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎВР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В» Р В РЎвЂ Р В РЎвЂўР РЋРІР‚РЋР В РЎвЂР РЋРІР‚В°Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР РЏ
          setSecretCodeModalOpen(false);
          setTelegramId('');
          setSecretCode('');
      
      console.log('Р Р†РЎС™РІР‚В¦ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В Р’В°Р В Р вЂ Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂР В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р В Р вЂ¦. Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В Р’В° Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р В РЎвЂ Р В РЎвЂ”Р В РЎвЂўР РЋР РЏР В Р вЂ Р В РЎвЂР В Р’В»Р В Р’В°Р РЋР С“Р РЋР Р‰ Р В Р вЂ  Р В Р вЂ¦Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р В РЎвЂќР В Р’В°Р РЋРІР‚В¦.');
    }
  };

  const handleAdminPanelClick = () => {
    onOpenAdminPanel?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Settings Modal */}
      <div 
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{
          zIndex: 9998,
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div 
          className="w-full max-w-md rounded-2xl p-6"
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
          }}
        >
          {/* Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ Р В РЎВР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂўР В РЎвЂ“Р В РЎвЂў Р В РЎвЂўР В РЎвЂќР В Р вЂ¦Р В Р’В° */}
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              Р В РЎСљР В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В РІвЂћвЂ“Р В РЎвЂќР В РЎвЂ
          </h3>
            
            {/* Р В РЎв„ўР В Р вЂ¦Р В РЎвЂўР В РЎвЂ”Р В РЎвЂќР В Р’В° Р В Р’В·Р В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР РЋР РЏ - Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В Р’В°Р РЋР РЏ Р РЋР С“ Р В РЎвЂР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В РЎвЂўР В РІвЂћвЂ“ X */}
          <button
            onClick={onClose}
            style={{
                width: '32px', height: '32px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
              <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
          
          {/* Р В РЎв„ўР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В РІвЂћвЂ“Р В Р вЂ¦Р В Р’ВµР РЋР вЂљ Р В Р вЂ¦Р В Р’В°Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В РЎвЂўР В Р’ВµР В РЎвЂќ */}
          <div style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '0',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            overflow: 'hidden'
          }}>
            
            {/* 1. Р В РЎСљР В РЎвЂ™Р В Р Р‹Р В РЎС›Р В Р’В Р В РЎвЂєР В РІвЂћСћР В РЎв„ўР В РЎвЂ™ Р В Р в‚¬Р В РІР‚в„ўР В РІР‚СћР В РІР‚СњР В РЎвЂєР В РЎС™Р В РІР‚С”Р В РІР‚СћР В РЎСљР В Р’ВР В РІвЂћСћ */}
            <div style={{
                  height: '64px',
                  padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В° Р В РЎвЂќР В РЎвЂўР В Р’В»Р В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р’В»Р РЋР Р‰Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќР В Р’В° Р В Р вЂ  Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В РЎвЂўР В РЎВ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В РІвЂћвЂ“Р В Р вЂ¦Р В Р’ВµР РЋР вЂљР В Р’Вµ */}
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bell style={{ width: '18px', height: '18px' }} />
              </div>
              
              {/* Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќ */}
              <div className="flex-1" style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В Р в‚¬Р В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏР В РЎВР В РЎвЂ
                </div>
              </div>
              
              {/* Р В РЎС›Р РЋРЎвЂњР В РЎВР В Р’В±Р В Р’В»Р В Р’ВµР РЋР вЂљ Р РЋРЎвЂњР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂўР В РЎВР В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ */}
              <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => handleNotificationsChange(e.target.checked)}
                  style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                />
                <div style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: notifications ? '#2B82FF' : '#E5E7EB',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: notifications ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }} />
                </div>
              </label>
                </div>
                
            {/* 2. Р В РЎСљР В РЎвЂ™Р В Р Р‹Р В РЎС›Р В Р’В Р В РЎвЂєР В РІвЂћСћР В РЎв„ўР В РЎвЂ™ Р В РЎС›Р В РІР‚СћР В РЎС™Р В Р’В« (Р В Р Р‹Р В РІР‚СћР В РЎв„ўР В Р’В Р В РІР‚СћР В РЎС›Р В РЎСљР В РЎвЂ™Р В Р вЂЎ Р В Р’В¤Р В Р в‚¬Р В РЎСљР В РЎв„ўР В Р’В¦Р В Р’ВР В Р вЂЎ) */}
            <div style={{
              height: '64px',
              padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В° Р В РЎвЂ”Р В Р’В°Р В Р’В»Р В РЎвЂР РЋРІР‚С™Р РЋР вЂљР РЋРІР‚в„– Р В Р вЂ  Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В РЎвЂўР В РЎВ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В РІвЂћвЂ“Р В Р вЂ¦Р В Р’ВµР РЋР вЂљР В Р’Вµ */}
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Palette style={{ width: '18px', height: '18px' }} />
                  </div>
              
              {/* Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќ */}
              <div className="flex-1" style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В РЎС›Р В Р’ВµР В РЎВР В Р’В°
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В РЎСџР В Р’ВµР РЋР вЂљР В Р’ВµР В РЎвЂќР В Р’В»Р РЋР вЂ№Р РЋРІР‚РЋР В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„– Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В Р’В»Р В РЎвЂўР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ
                  </div>
              </div>
              
              {/* Р В РЎС›Р РЋРЎвЂњР В РЎВР В Р’В±Р В Р’В»Р В Р’ВµР РЋР вЂљ Р РЋРІР‚С™Р В Р’ВµР В РЎВР РЋРІР‚в„– - Р РЋР С“Р В Р’ВµР В РЎвЂќР РЋР вЂљР В Р’ВµР РЋРІР‚С™Р В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІР‚С›Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР РЋР РЏ */}
              <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={handleThemeToggle}
                  style={{ position: 'absolute', opacity: 0, cursor: 'pointer' }}
                />
                <div style={{
                  width: '44px',
                  height: '24px',
                  backgroundColor: theme === 'dark' ? '#2B82FF' : '#E5E7EB',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background-color 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: theme === 'dark' ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }} />
                </div>
              </label>
            </div>

            {/* 3. Р В Р Р‹Р В РЎвЂєР В РЎвЂєР В РІР‚ВР В Р’В©Р В Р’ВР В РЎС›Р В Р’В¬ Р В РЎвЂє Р В РЎСџР В Р’В Р В РЎвЂєР В РІР‚ВР В РІР‚С”Р В РІР‚СћР В РЎС™Р В РІР‚Сћ */}
            <button 
              onClick={() => {
                onOpenProblemReport?.();
                onClose();
              }}
              style={{
                height: '64px',
                padding: '0 16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {/* Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В° Р РЋР С“Р В РЎвЂўР В РЎвЂўР В Р’В±Р РЋРІР‚В°Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ Р В Р вЂ  Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В РЎвЂўР В РЎВ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В РІвЂћвЂ“Р В Р вЂ¦Р В Р’ВµР РЋР вЂљР В Р’Вµ */}
              <div style={{
                width: '28px', height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <MessageCircle style={{ width: '18px', height: '18px' }} />
              </div>
              
              {/* Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќ */}
              <div className="flex-1" style={{ marginLeft: '12px', textAlign: 'left' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  Р В Р Р‹Р В РЎвЂўР В РЎвЂўР В Р’В±Р РЋРІР‚В°Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВР В Р’Вµ
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂўР РЋРІР‚С™Р РЋРІР‚РЋР В Р’ВµР РЋРІР‚С™ Р РЋР вЂљР В Р’В°Р В Р’В·Р РЋР вЂљР В Р’В°Р В Р’В±Р В РЎвЂўР РЋРІР‚С™Р РЋРІР‚РЋР В РЎвЂР В РЎвЂќР В Р’В°Р В РЎВ
                </div>
              </div>
            </button>

            {/* 4. Р В РЎв„ўР В РЎСљР В РЎвЂєР В РЎСџР В РЎв„ўР В РЎвЂ™ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљ Р В РЎСџР В РЎвЂ™Р В РЎСљР В РІР‚СћР В РІР‚С”Р В Р’В (Р В РЎСџР В РЎвЂєР В Р вЂЎР В РІР‚в„ўР В РІР‚С”Р В Р вЂЎР В РІР‚СћР В РЎС›Р В Р Р‹Р В Р вЂЎ Р В РЎС›Р В РЎвЂєР В РІР‚С”Р В Р’В¬Р В РЎв„ўР В РЎвЂє Р В РІР‚СњР В РІР‚С”Р В Р вЂЎ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В РЎвЂєР В РІР‚в„ў/Р В РЎС›Р В Р’ВР В РЎС™Р В РІР‚С”Р В Р’ВР В РІР‚СњР В РЎвЂєР В РІР‚в„ў) */}
            {canAccessAdminPanel && (
              <button 
                onClick={handleAdminPanelClick}
                  style={{ 
                  height: '64px',
                  padding: '0 16px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {/* Р В Р’ВР В РЎвЂќР В РЎвЂўР В Р вЂ¦Р В РЎвЂќР В Р’В° Р РЋРІР‚В°Р В РЎвЂР РЋРІР‚С™Р В Р’В° Р В Р вЂ  Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“Р В Р’В»Р В РЎвЂўР В РЎВ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В РІвЂћвЂ“Р В Р вЂ¦Р В Р’ВµР РЋР вЂљР В Р’Вµ */}
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Shield style={{ width: '18px', height: '18px' }} />
                </div>
                
                {/* Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™Р В РЎвЂўР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќ */}
                <div className="flex-1" style={{ marginLeft: '12px', textAlign: 'left' }}>
                  <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰
                  </div>
                  <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {userRole === 'team_lead' ? 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР В РЎвЂўР В РІвЂћвЂ“' : 
                     userRole === 'junior_admin' ? 'Р В РЎС™Р В РЎвЂўР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В°Р РЋРІР‚В Р В РЎвЂР РЋР РЏ Р В РЎвЂ Р РЋР С“Р РЋРІР‚С™Р В Р’В°Р РЋРІР‚С™Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В Р’В°' :
                     userRole === 'senior_admin' ? 'Р В Р в‚¬Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В Р’В·Р В РЎвЂўР В Р вЂ Р В Р’В°Р РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР РЏР В РЎВР В РЎвЂ Р В РЎвЂ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В РЎвЂўР В РЎВ' :
                     userRole === 'main_admin' ? 'Р В РЎСџР В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р РЋРЎвЂњР В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В»Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ Р РЋР С“Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р В Р’ВµР В РЎВР В РЎвЂўР В РІвЂћвЂ“' :
                     'Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋРІР‚С›Р РЋРЎвЂњР В Р вЂ¦Р В РЎвЂќР РЋРІР‚В Р В РЎвЂР В РЎвЂ'}
              </div>
            </div>
                
                {/* Р В Р Р‹Р РЋРІР‚С™Р РЋР вЂљР В Р’ВµР В Р’В»Р В РЎвЂќР В Р’В° Р В Р вЂ Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂў Р В Р вЂ Р В РЎВР В Р’ВµР РЋР С“Р РЋРІР‚С™Р В РЎвЂў Р РЋРІР‚С™Р РЋРЎвЂњР В РЎВР В Р’В±Р В Р’В»Р В Р’ВµР РЋР вЂљР В Р’В° */}
                <div className="w-5 h-5 flex items-center justify-center">
                  <ChevronRight style={{ width: '16px', height: '16px' }} />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
              style={{
            zIndex: 9999,
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <div 
            className="w-full max-w-md rounded-2xl p-6"
              style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Р В Р Р‹Р В РЎвЂўР В РЎвЂўР В Р’В±Р РЋРІР‚В°Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂў Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВР В Р’Вµ</h3>
              <button 
                onClick={() => setReportModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
            </button>
          </div>

            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Р В РЎвЂєР В РЎвЂ”Р В РЎвЂР РЋРІвЂљВ¬Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р’В±Р В Р’В»Р В Р’ВµР В РЎВР РЋРЎвЂњ Р В РЎвЂ”Р В РЎвЂўР В РўвЂР РЋР вЂљР В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂў..."
              rows={4}
              style={{ height: '88px', borderRadius: '12px' }}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile ? selectedFile.name : 'Р В Р’В¤Р В Р’В°Р В РІвЂћвЂ“Р В Р’В» Р В Р вЂ¦Р В Р’Вµ Р В Р вЂ Р РЋРІР‚в„–Р В Р’В±Р РЋР вЂљР В Р’В°Р В Р вЂ¦'}
                </span>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button className="p-3 rounded-lg bg-primary text-white">
                  <Paperclip style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setReportModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Р В РЎвЂєР РЋРІР‚С™Р В РЎВР В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰
              </button>
              <button 
                onClick={handleReportSubmit}
                disabled={!reportText.trim()}
                style={{
                  backgroundColor: reportText.trim() ? '#2B82FF' : '#E6E9EF',
                  cursor: reportText.trim() ? 'pointer' : 'not-allowed',
                  color: '#FFFFFF'
                }}
                className="flex-1 px-4 py-2 rounded-xl transition-colors"
              >
                Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secret Admin Code Modal */}
      {secretCodeModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: 10000,
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'
          }}
        >
          <div 
            className="w-full max-w-md rounded-2xl p-6"
            style={{
              backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰
              </h3>
              <button 
                onClick={() => setSecretCodeModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Р В РЎСџР В РЎвЂўР В Р’В»Р В Р’Вµ Telegram ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Telegram ID</label>
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
                placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р вЂ Р В Р’В°Р РЋРІвЂљВ¬ Telegram ID"
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
            {/* Р В РЎСџР В РЎвЂўР В Р’В»Р В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РўвЂР В Р’В° Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р РЋР С“ Р В РЎвЂ”Р В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В РЎвЂўР В РЎВ/Р РЋР С“Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В Р’ВµР В РЎВ */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Р В РЎв„ўР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°"
                  className="w-full p-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
            <div className="text-center text-xs text-muted mb-4">
              Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ” Р РЋРІР‚С™Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В РЎвЂќР В РЎвЂў Р В РўвЂР В Р’В»Р РЋР РЏ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ  Р В РЎвЂ Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂР В РЎвЂўР В Р вЂ 
            </div>

            <button 
              onClick={handleSecretCodeSubmit}
              disabled={!telegramId || !secretCode}
            style={{ 
                backgroundColor: (telegramId && secretCode) ? '#2B82FF' : '#E6E9EF',
                cursor: (telegramId && secretCode) ? 'pointer' : 'not-allowed',
                color: '#FFFFFF'
            }}
              className="w-full px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
              <Shield style={{ width: '18px', height: '18px' }} />
              Р В РІР‚в„ўР В РЎвЂўР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂ Р В Р вЂ  Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂќР РЋРЎвЂњ
            </button>
          </div>
        </div>
      )}
    </>
  );
};