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

// Р‘Р°Р·Р° РґР°РЅРЅС‹С… Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ
const ADMIN_USERS = [
  // рџЏ† Р“Р›РђР’РќР«Р• РђР”РњРРќР« (РІС‹СЃС€РёРµ РїСЂР°РІР°)
  { telegramId: '123456789', username: 'ivan_petrov', role: 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ' },
  { telegramId: '987654321', username: 'maria_sidorova', role: 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ' },
  
  // рџҐ‡ РЎРўРђР РЁРР• РђР”РњРРќР«
  { telegramId: '111222333', username: 'alexey_kozlov', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '444555666', username: 'elena_morozova', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '1609556178', username: 'admin_senior', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  
  // рџҐ€ РњР›РђР”РЁРР• РђР”РњРРќР«
  { telegramId: '777888999', username: 'dmitry_volkov', role: 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '000111222', username: 'anna_lebedeva', role: 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ' },
  
  // рџ‘Ґ РўРРњР›РР”Р«
  { telegramId: '333444555', username: 'sergey_orlov', role: 'С‚РёРјР»РёРґ', teamNumber: 1 },
  { telegramId: '666777888', username: 'olga_sokolova', role: 'С‚РёРјР»РёРґ', teamNumber: 2 },
  { telegramId: '999000111', username: 'mikhail_rybakov', role: 'С‚РёРјР»РёРґ', teamNumber: 3 }
];

// РЎРµРєСЂРµС‚РЅС‹Рµ РєРѕРґС‹ РґРѕСЃС‚СѓРїР°
const SECRET_CODES = {
  'df1GE%LwVAAC': 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ',    // РџРѕР»РЅС‹Р№ РґРѕСЃС‚СѓРї РєРѕ РІСЃРµРј С„СѓРЅРєС†РёСЏРј
  '0caFyNh}w%': 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ',      // РЈРїСЂР°РІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё, РєРѕРЅС‚РµРЅС‚РѕРј
  '~3SogEhz': 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ',        // РњРѕРґРµСЂР°С†РёСЏ, РїСЂРѕСЃРјРѕС‚СЂ СЃС‚Р°С‚РёСЃС‚РёРєРё
  'SToU{~': 'С‚РёРјР»РёРґ'                  // РЈРїСЂР°РІР»РµРЅРёРµ РєРѕРјР°РЅРґРѕР№, Р·Р°РґР°С‡Р°РјРё
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
  
  // РСЃРїРѕР»СЊР·СѓРµРј С…СѓРє РґР»СЏ РїСЂРѕРІРµСЂРєРё СЂРѕР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
  const { user, canAccessAdminPanel, userRole } = useUserRole(userId || '');
  const [reportText, setReportText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [telegramId, setTelegramId] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Р—Р°РіСЂСѓР·РєР° СЃРѕС…СЂР°РЅРµРЅРЅРѕРіРѕ СЃРѕСЃС‚РѕСЏРЅРёСЏ РїСЂРё РёРЅРёС†РёР°Р»РёР·Р°С†РёРё
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications !== null) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // РџСЂРѕРІРµСЂСЏРµРј Р°РІС‚РѕСЂРёР·Р°С†РёСЋ Р°РґРјРёРЅР°
    const adminData = localStorage.getItem('adminLoginData');
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        if (parsedData.telegramId && parsedData.accessCode) {
          setAdminAuthorized(true);
        }
      } catch (error) {
        console.error('РћС€РёР±РєР° РїСЂРё РїСЂРѕРІРµСЂРєРµ Р°РґРјРёРЅСЃРєРёС… РґР°РЅРЅС‹С…:', error);
      }
    }
  }, []);

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', JSON.stringify(checked));
  };

  const handleThemeToggle = () => {
    // вљ пёЏ Р’РђР–РќРћ: РЎС‡РёС‚Р°РµРј С‚РѕР»СЊРєРѕ Р’РљР›Р®Р§Р•РќРРЇ С‚РµРјРЅРѕР№ С‚РµРјС‹ (РЅРµ РІС‹РєР»СЋС‡РµРЅРёСЏ)
    if (theme === 'light') { // Р•СЃР»Рё С‚РµРєСѓС‰Р°СЏ С‚РµРјР° СЃРІРµС‚Р»Р°СЏ Рё РїРµСЂРµРєР»СЋС‡Р°РµРј РЅР° С‚РµРјРЅСѓСЋ
      const newCount = themeToggleCount + 1;
      setThemeToggleCount(newCount);
      
      console.log(`рџ”ў РЎС‡РµС‚С‡РёРє РІРєР»СЋС‡РµРЅРёР№ С‚РµРјРЅРѕР№ С‚РµРјС‹: ${newCount}/8`);
      
      // рџ”ђ РЎР•РљР Р•РўРќРђРЇ РђРљРўРР’РђР¦РРЇ РќРђ 8-Рњ Р’РљР›Р®Р§Р•РќРР
      if (newCount === 8) {
        console.log('рџљЂ РЎР•РљР Р•РўРќР«Р™ РљРћР” РђРљРўРР’РР РћР’РђРќ!');
        setSecretCodeModalOpen(true);
        setThemeToggleCount(0); // РЎР±СЂР°СЃС‹РІР°РµРј СЃС‡РµС‚С‡РёРє
      }
    }
    
    onToggleTheme(); // Р’С‹РїРѕР»РЅСЏРµРј РѕР±С‹С‡РЅРѕРµ РїРµСЂРµРєР»СЋС‡РµРЅРёРµ С‚РµРјС‹
  };

  const handleReportSubmit = () => {
    const reportData = {
      text: reportText,
      file: selectedFile,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('рџ“§ РћС‚С‡РµС‚ РѕС‚РїСЂР°РІР»РµРЅ:', reportData);
    
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
      // 1пёЏвѓЈ РџР РћР’Р•Р РљРђ Р’РђР›РР”РќРћРЎРўР РљРћР”Рђ
      const role = SECRET_CODES[secretCode as keyof typeof SECRET_CODES];
      if (!role) {
        alert('вќЊ РќРµРІРµСЂРЅС‹Р№ РєРѕРґ РґРѕСЃС‚СѓРїР°');
        return;
      }
      
      // 2пёЏвѓЈ РџРћРРЎРљ РџРћР›Р¬Р—РћР’РђРўР•Р›РЇ Р’ Р‘РђР—Р•
        const user = ADMIN_USERS.find(u => 
          u.telegramId === telegramId && u.role === role
        );
        
      if (!user) {
        alert(`вќЊ РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ СЃ ID ${telegramId} РЅРµ РЅР°Р№РґРµРЅ РІ СЂРѕР»Рё "${role}"`);
        return;
      }
      
      // 3пёЏвѓЈ РЈРЎРџР•РЁРќРђРЇ РђР’РўРћР РР—РђР¦РРЇ
      console.log('вњ… РђРґРјРёРЅ Р°РІС‚РѕСЂРёР·РѕРІР°РЅ:', user);
      
      // РЎРѕС…СЂР°РЅСЏРµРј РґР°РЅРЅС‹Рµ РґР»СЏ AdminPanel
          localStorage.setItem('adminLoginData', JSON.stringify({
            telegramId,
        accessCode: secretCode,
        role: user.role,
        username: user.username,
        loginTime: new Date().toISOString()
          }));
          
      // вњ… РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј С„Р»Р°Рі Р°РІС‚РѕСЂРёР·Р°С†РёРё (РљРќРћРџРљРђ РџРћРЇР’РРўРЎРЇ Р’ РќРђРЎРўР РћР™РљРђРҐ)
      setAdminAuthorized(true);
          
      // Р—Р°РєСЂС‹РІР°РµРј СЃРµРєСЂРµС‚РЅС‹Р№ РјРѕРґР°Р» Рё РѕС‡РёС‰Р°РµРј РїРѕР»СЏ
          setSecretCodeModalOpen(false);
          setTelegramId('');
          setSecretCode('');
      
      console.log('вњ… РђРґРјРёРЅ Р°РІС‚РѕСЂРёР·РѕРІР°РЅ. РљРЅРѕРїРєР° Р°РґРјРёРЅ РїР°РЅРµР»Рё РїРѕСЏРІРёР»Р°СЃСЊ РІ РЅР°СЃС‚СЂРѕР№РєР°С….');
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
          {/* Р—Р°РіРѕР»РѕРІРѕРє РјРѕРґР°Р»СЊРЅРѕРіРѕ РѕРєРЅР° */}
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '18px',
              lineHeight: '24px',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              РќР°СЃС‚СЂРѕР№РєРё
          </h3>
            
            {/* РљРЅРѕРїРєР° Р·Р°РєСЂС‹С‚РёСЏ - РєСЂСѓРіР»Р°СЏ СЃ РёРєРѕРЅРєРѕР№ X */}
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
          
          {/* РљРѕРЅС‚РµР№РЅРµСЂ РЅР°СЃС‚СЂРѕРµРє */}
          <div style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '0',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            overflow: 'hidden'
          }}>
            
            {/* 1. РќРђРЎРўР РћР™РљРђ РЈР’Р•Р”РћРњР›Р•РќРР™ */}
            <div style={{
                  height: '64px',
                  padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* РРєРѕРЅРєР° РєРѕР»РѕРєРѕР»СЊС‡РёРєР° РІ РєСЂСѓРіР»РѕРј РєРѕРЅС‚РµР№РЅРµСЂРµ */}
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Bell style={{ width: '18px', height: '18px' }} />
              </div>
              
              {/* РўРµРєСЃС‚РѕРІС‹Р№ Р±Р»РѕРє */}
              <div className="flex-1" style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РЈРІРµРґРѕРјР»РµРЅРёСЏ
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  РЈРїСЂР°РІР»РµРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёСЏРјРё
                </div>
              </div>
              
              {/* РўСѓРјР±Р»РµСЂ СѓРІРµРґРѕРјР»РµРЅРёР№ */}
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
                
            {/* 2. РќРђРЎРўР РћР™РљРђ РўР•РњР« (РЎР•РљР Р•РўРќРђРЇ Р¤РЈРќРљР¦РРЇ) */}
            <div style={{
              height: '64px',
              padding: '0 16px',
              borderBottom: '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* РРєРѕРЅРєР° РїР°Р»РёС‚СЂС‹ РІ РєСЂСѓРіР»РѕРј РєРѕРЅС‚РµР№РЅРµСЂРµ */}
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Palette style={{ width: '18px', height: '18px' }} />
                  </div>
              
              {/* РўРµРєСЃС‚РѕРІС‹Р№ Р±Р»РѕРє */}
              <div className="flex-1" style={{ marginLeft: '12px' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РўРµРјР°
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  РџРµСЂРµРєР»СЋС‡РµРЅРёРµ С‚РµРјС‹ РїСЂРёР»РѕР¶РµРЅРёСЏ
                  </div>
              </div>
              
              {/* РўСѓРјР±Р»РµСЂ С‚РµРјС‹ - СЃРµРєСЂРµС‚РЅР°СЏ С„СѓРЅРєС†РёСЏ */}
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

            {/* 3. РЎРћРћР‘Р©РРўР¬ Рћ РџР РћР‘Р›Р•РњР• */}
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
              {/* РРєРѕРЅРєР° СЃРѕРѕР±С‰РµРЅРёСЏ РІ РєСЂСѓРіР»РѕРј РєРѕРЅС‚РµР№РЅРµСЂРµ */}
              <div style={{
                width: '28px', height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <MessageCircle style={{ width: '18px', height: '18px' }} />
              </div>
              
              {/* РўРµРєСЃС‚РѕРІС‹Р№ Р±Р»РѕРє */}
              <div className="flex-1" style={{ marginLeft: '12px', textAlign: 'left' }}>
                <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                  РЎРѕРѕР±С‰РёС‚СЊ Рѕ РїСЂРѕР±Р»РµРјРµ
                </div>
                <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                  РћС‚РїСЂР°РІРёС‚СЊ РѕС‚С‡РµС‚ СЂР°Р·СЂР°Р±РѕС‚С‡РёРєР°Рј
                </div>
              </div>
            </button>

            {/* 4. РљРќРћРџРљРђ РђР”РњРРќ РџРђРќР•Р›Р (РџРћРЇР’Р›РЇР•РўРЎРЇ РўРћР›Р¬РљРћ Р”Р›РЇ РђР”РњРРќРћР’/РўРРњР›РР”РћР’) */}
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
                {/* РРєРѕРЅРєР° С‰РёС‚Р° РІ РєСЂСѓРіР»РѕРј РєРѕРЅС‚РµР№РЅРµСЂРµ */}
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #2A2F36' : '1px solid #E6E9EF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Shield style={{ width: '18px', height: '18px' }} />
                </div>
                
                {/* РўРµРєСЃС‚РѕРІС‹Р№ Р±Р»РѕРє */}
                <div className="flex-1" style={{ marginLeft: '12px', textAlign: 'left' }}>
                  <div style={{ fontSize: '16px', color: theme === 'dark' ? '#E8ECF2' : '#0F172A' }}>
                    РђРґРјРёРЅ РїР°РЅРµР»СЊ
                  </div>
                  <div style={{ fontSize: '14px', color: theme === 'dark' ? '#A7B0BD' : '#6B7280' }}>
                    {userRole === 'team_lead' ? 'РЈРїСЂР°РІР»РµРЅРёРµ РєРѕРјР°РЅРґРѕР№' : 
                     userRole === 'junior_admin' ? 'РњРѕРґРµСЂР°С†РёСЏ Рё СЃС‚Р°С‚РёСЃС‚РёРєР°' :
                     userRole === 'senior_admin' ? 'РЈРїСЂР°РІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРјРё Рё РєРѕРЅС‚РµРЅС‚РѕРј' :
                     userRole === 'main_admin' ? 'РџРѕР»РЅРѕРµ СѓРїСЂР°РІР»РµРЅРёРµ СЃРёСЃС‚РµРјРѕР№' :
                     'РђРґРјРёРЅРёСЃС‚СЂР°С‚РёРІРЅС‹Рµ С„СѓРЅРєС†РёРё'}
              </div>
            </div>
                
                {/* РЎС‚СЂРµР»РєР° РІРїСЂР°РІРѕ РІРјРµСЃС‚Рѕ С‚СѓРјР±Р»РµСЂР° */}
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
              <h3 className="text-lg font-semibold">РЎРѕРѕР±С‰РёС‚СЊ Рѕ РїСЂРѕР±Р»РµРјРµ</h3>
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
              placeholder="РћРїРёС€РёС‚Рµ РїСЂРѕР±Р»РµРјСѓ РїРѕРґСЂРѕР±РЅРѕ..."
              rows={4}
              style={{ height: '88px', borderRadius: '12px' }}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile ? selectedFile.name : 'Р¤Р°Р№Р» РЅРµ РІС‹Р±СЂР°РЅ'}
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
                РћС‚РјРµРЅРёС‚СЊ
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
                РћС‚РїСЂР°РІРёС‚СЊ
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
                РђРґРјРёРЅ РїР°РЅРµР»СЊ
              </h3>
              <button 
                onClick={() => setSecretCodeModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* РџРѕР»Рµ Telegram ID */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Telegram ID</label>
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
                placeholder="Р’РІРµРґРёС‚Рµ РІР°С€ Telegram ID"
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
            {/* РџРѕР»Рµ РєРѕРґР° РґРѕСЃС‚СѓРїР° СЃ РїРѕРєР°Р·РѕРј/СЃРєСЂС‹С‚РёРµРј */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">РљРѕРґ РґРѕСЃС‚СѓРїР°</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="Р’РІРµРґРёС‚Рµ РєРѕРґ РґРѕСЃС‚СѓРїР°"
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
              Р”РѕСЃС‚СѓРї С‚РѕР»СЊРєРѕ РґР»СЏ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ Рё С‚РёРјР»РёРґРѕРІ
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
              Р’РѕР№С‚Рё РІ Р°РґРјРёРЅРєСѓ
            </button>
          </div>
        </div>
      )}
    </>
  );
};