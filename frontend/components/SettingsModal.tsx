import { useState, useEffect } from 'react';
import { ModalOpaque } from './ModalOpaque';
import { Switch } from './Switch';
import { X, ChevronRight, Power, Paperclip, Eye, EyeOff, Shield, Bell, Palette, MessageCircle } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdminPanel?: () => void;
  hasAdminAccess: boolean;
  setHasAdminAccess: (value: boolean) => void;
  theme?: 'light' | 'dark';
}

// РЎРёСЃС‚РµРјР° СЂРѕР»РµР№ Рё РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
const ADMIN_USERS = [
  // Р“Р»Р°РІРЅС‹Рµ Р°РґРјРёРЅС‹
  { telegramId: '123456789', username: 'ivan_petrov', role: 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ' },
  { telegramId: '987654321', username: 'maria_sidorova', role: 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ' },
  
  // РЎС‚Р°СЂС€РёРµ Р°РґРјРёРЅС‹
  { telegramId: '111222333', username: 'alexey_kozlov', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '444555666', username: 'elena_morozova', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '1609556178', username: 'admin_senior', role: 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ' },
  
  // РњР»Р°РґС€РёРµ Р°РґРјРёРЅС‹
  { telegramId: '777888999', username: 'dmitry_volkov', role: 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ' },
  { telegramId: '000111222', username: 'anna_lebedeva', role: 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ' },
  
  // РўРёРјР»РёРґС‹
  { telegramId: '333444555', username: 'sergey_orlov', role: 'С‚РёРјР»РёРґ', teamNumber: 1 },
  { telegramId: '666777888', username: 'olga_sokolova', role: 'С‚РёРјР»РёРґ', teamNumber: 2 },
  { telegramId: '999000111', username: 'mikhail_rybakov', role: 'С‚РёРјР»РёРґ', teamNumber: 3 },
];

// РЎРµРєСЂРµС‚РЅС‹Рµ РєРѕРґС‹ РґР»СЏ СЂРѕР»РµР№
const SECRET_CODES = {
  'df1GE%LwVAAC': 'РіР»Р°РІРЅС‹Р№_Р°РґРјРёРЅ',
  '0caFyNh}w%': 'СЃС‚Р°СЂС€РёР№_Р°РґРјРёРЅ',
  '~3SogEhz': 'РјР»Р°РґС€РёР№_Р°РґРјРёРЅ',
  'SToU{~': 'С‚РёРјР»РёРґ'
};

export function SettingsModal({ isOpen, onClose, isDarkMode, onToggleDarkMode, onOpenAdminPanel, hasAdminAccess, setHasAdminAccess, theme = 'light' }: SettingsModalProps) {
  const [notifications, setNotifications] = useState(true);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [secretCodeModalOpen, setSecretCodeModalOpen] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [themeToggleCount, setThemeToggleCount] = useState(0);

  // РЎРѕС…СЂР°РЅСЏРµРј СЃРѕСЃС‚РѕСЏРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёР№ РІ localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications !== null) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const handleThemeToggle = () => {
    // РЎС‡РёС‚Р°РµРј С‚РѕР»СЊРєРѕ РІРєР»СЋС‡РµРЅРёСЏ С‚РµРјС‹ (РєРѕРіРґР° isDarkMode СЃС‚Р°РЅРѕРІРёС‚СЃСЏ true)
    if (!isDarkMode) {
      const newCount = themeToggleCount + 1;
      setThemeToggleCount(newCount);
      
      // Р•СЃР»Рё РІРєР»СЋС‡РёР»Рё С‚РµРјСѓ 8 СЂР°Р·, РїРѕРєР°Р·С‹РІР°РµРј РѕРєРЅРѕ СЃРµРєСЂРµС‚РЅРѕРіРѕ РєРѕРґР°
      if (newCount === 8) {
        setSecretCodeModalOpen(true);
        setThemeToggleCount(0);
      }
    }
    
    onToggleDarkMode();
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    localStorage.setItem('notifications', JSON.stringify(checked));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleReportSubmit = () => {
    // Р—РґРµСЃСЊ Р±СѓРґРµС‚ Р»РѕРіРёРєР° РѕС‚РїСЂР°РІРєРё РѕС‚С‡РµС‚Р° Рѕ РїСЂРѕР±Р»РµРјРµ
    console.log('РћС‚С‡РµС‚ РѕС‚РїСЂР°РІР»РµРЅ:', { text: reportText, file: selectedFile });
    setReportModalOpen(false);
    setReportText('');
    setSelectedFile(null);
  };

  const handleSecretCodeSubmit = () => {
    if (telegramId && secretCode) {
      // РџСЂРѕРІРµСЂСЏРµРј РІР°Р»РёРґРЅРѕСЃС‚СЊ РєРѕРґР°
      const role = SECRET_CODES[secretCode];
      if (role) {
        // РџСЂРѕРІРµСЂСЏРµРј РЅР°Р»РёС‡РёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ СЃ С‚Р°РєРёРј ID
        const user = ADMIN_USERS.find(u => 
          u.telegramId === telegramId && u.role === role
        );
        
        if (user) {
          // РЎРѕС…СЂР°РЅСЏРµРј РґР°РЅРЅС‹Рµ РІ localStorage РґР»СЏ РїРµСЂРµРґР°С‡Рё РІ AdminPanel
          localStorage.setItem('adminLoginData', JSON.stringify({
            telegramId,
            accessCode: secretCode
          }));
          
          // РЈСЃС‚Р°РЅР°РІР»РёРІР°РµРј С„Р»Р°Рі РґРѕСЃС‚СѓРїР° Рє Р°РґРјРёРЅ РїР°РЅРµР»Рё
          setHasAdminAccess(true);
          
          // Р—Р°РєСЂС‹РІР°РµРј РјРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ РєРѕРґР°
          setSecretCodeModalOpen(false);
          // РЎР±СЂР°СЃС‹РІР°РµРј РїРѕР»СЏ
          setTelegramId('');
          setSecretCode('');
        } else {
          alert(`РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ СЃ ID ${telegramId} РЅРµ РЅР°Р№РґРµРЅ РІ СЂРѕР»Рё "${role}"`);
        }
      } else {
        alert('РќРµРІРµСЂРЅС‹Р№ РєРѕРґ РґРѕСЃС‚СѓРїР°');
      }
    }
  };

  const settingsItems = [
    {
      icon: Bell,
      title: 'РЈРІРµРґРѕРјР»РµРЅРёСЏ',
      subtitle: 'РЈРїСЂР°РІР»РµРЅРёРµ СѓРІРµРґРѕРјР»РµРЅРёСЏРјРё',
      control: (
        <Switch
          checked={notifications}
          onChange={handleNotificationsChange}
          theme={theme}
        />
      )
    },
    {
      icon: Palette,
      title: 'РўРµРјР°',
      subtitle: 'РџРµСЂРµРєР»СЋС‡РµРЅРёРµ С‚РµРјС‹ РїСЂРёР»РѕР¶РµРЅРёСЏ',
      control: (
        <Switch
          checked={isDarkMode}
          onChange={handleThemeToggle}
          theme={theme}
        />
      )
    },
    {
      icon: MessageCircle,
      title: 'РЎРѕРѕР±С‰РёС‚СЊ Рѕ РїСЂРѕР±Р»РµРјРµ',
      subtitle: 'РћС‚РїСЂР°РІРёС‚СЊ РѕС‚С‡РµС‚ СЂР°Р·СЂР°Р±РѕС‚С‡РёРєР°Рј',
      control: null,
      onClick: () => setReportModalOpen(true)
    }
  ];

  return (
    <>
      <ModalOpaque
        isOpen={isOpen}
        onClose={onClose}
        theme={theme}
      >
        {/* РљР°СЃС‚РѕРјРЅС‹Р№ Р·Р°РіРѕР»РѕРІРѕРє РґР»СЏ РЅР°СЃС‚СЂРѕРµРє */}
        <div 
          className="flex items-center justify-between"
          style={{ marginBottom: '20px' }}
        >
          <h3 
            className="font-medium"
            style={{ 
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
              fontSize: '18px',
              lineHeight: '24px'
            }}
          >
            РќР°СЃС‚СЂРѕР№РєРё
          </h3>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.06)' 
                : '1px solid #E6E9EF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X 
              style={{ 
                width: '16px', 
                height: '16px', 
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280' 
              }} 
            />
          </button>
        </div>
        <div 
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '16px',
            padding: '0',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.06)' 
              : '1px solid #E6E9EF',
            overflow: 'hidden'
          }}
        >
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center transition-colors ${
                  item.onClick ? 'cursor-pointer hover:bg-opacity-50' : ''
                }`}
                style={{
                  height: '64px',
                  padding: '0 16px',
                  borderBottom: index < settingsItems.length - 1 
                    ? theme === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.06)' 
                      : '1px solid #E6E9EF'
                    : 'none',
                  backgroundColor: 'transparent'
                }}
                onClick={item.onClick}
              >
                {/* Icon */}
                <div 
                  className="flex items-center justify-center mr-3"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                    border: theme === 'dark' 
                      ? '1px solid #2A2F36' 
                      : '1px solid #E6E9EF'
                  }}
                >
                  <Icon 
                    style={{ 
                      width: '18px', 
                      height: '18px', 
                      color: theme === 'dark' ? '#E8ECF2' : '#6B7280' 
                    }} 
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div 
                    className="font-medium"
                    style={{ 
                      color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                      fontSize: '16px',
                      lineHeight: '20px'
                    }}
                  >
                    {item.title}
                  </div>
                  <div 
                    style={{ 
                      color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                      fontSize: '14px',
                      lineHeight: '18px'
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
                
                {/* Control */}
                {item.control && (
                  <div className="ml-3">
                    {item.control}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* РђРґРјРёРЅ РїР°РЅРµР»СЊ - РїРѕРєР°Р·С‹РІР°РµС‚СЃСЏ С‚РѕР»СЊРєРѕ РµСЃР»Рё РµСЃС‚СЊ РґРѕСЃС‚СѓРї */}
          {hasAdminAccess && (
            <div
              className="flex items-center cursor-pointer hover:bg-opacity-50 transition-colors"
              style={{
                height: '64px',
                padding: '0 16px',
                backgroundColor: 'transparent'
              }}
              onClick={() => {
                onOpenAdminPanel?.();
                onClose();
              }}
            >
              {/* Icon */}
              <div 
                className="flex items-center justify-center mr-3"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: theme === 'dark' ? '#0F1116' : '#FFFFFF',
                  border: theme === 'dark' 
                    ? '1px solid #2A2F36' 
                    : '1px solid #E6E9EF'
                }}
              >
                <Shield 
                  style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: '#2B82FF' 
                  }} 
                />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div 
                  className="font-medium"
                  style={{ 
                    color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                    fontSize: '16px',
                    lineHeight: '20px'
                  }}
                >
                  РђРґРјРёРЅ РїР°РЅРµР»СЊ
                </div>
                <div 
                  style={{ 
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
                    fontSize: '14px',
                    lineHeight: '18px'
                  }}
                >
                  РђРґРјРёРЅРёСЃС‚СЂР°С‚РёРІРЅС‹Рµ С„СѓРЅРєС†РёРё
                </div>
              </div>
              
              {/* Arrow */}
              <div className="ml-3">
                <ChevronRight 
                  style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: theme === 'dark' ? '#A7B0BD' : '#6B7280' 
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      </ModalOpaque>

      {/* Report Modal */}
      <ModalOpaque
        isOpen={reportModalOpen}
        onClose={() => {
          setReportModalOpen(false);
          setReportText('');
          setSelectedFile(null);
        }}
        title="РЎРѕРѕР±С‰РёС‚СЊ Рѕ РїСЂРѕР±Р»РµРјРµ"
        theme={theme}
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => {
                setReportModalOpen(false);
                setReportText('');
                setSelectedFile(null);
              }}
              className="transition-colors"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                padding: '0 20px'
              }}
            >
              РћС‚РјРµРЅРёС‚СЊ
            </button>
            <button
              onClick={handleReportSubmit}
              disabled={!reportText.trim()}
              className="transition-colors disabled:opacity-50"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: reportText.trim() ? '#2B82FF' : theme === 'dark' ? '#202734' : '#E6E9EF',
                color: '#FFFFFF',
                border: 'none',
                padding: '0 20px'
              }}
            >
              РћС‚РїСЂР°РІРёС‚СЊ
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <div>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="РћРїРёС€РёС‚Рµ РїСЂРѕР±Р»РµРјСѓ РїРѕРґСЂРѕР±РЅРѕ..."
              rows={4}
              className="w-full transition-colors resize-none"
              style={{
                height: '88px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                padding: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label 
              className="block mb-2 font-medium"
              style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '14px'
              }}
            >
              РџСЂРёРєСЂРµРїРёС‚СЊ С„Р°Р№Р» (РѕРїС†РёРѕРЅР°Р»СЊРЅРѕ)
            </label>
            <div className="flex items-center gap-2">
              <div 
                className="flex-1 min-w-0 p-3 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                <span className="block truncate text-sm">
                  {selectedFile ? selectedFile.name : 'Р¤Р°Р№Р» РЅРµ РІС‹Р±СЂР°РЅ'}
                </span>
              </div>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: '#2B82FF',
                    color: '#FFFFFF'
                  }}
                >
                  <Paperclip style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalOpaque>

      {/* Secret Code Modal */}
      <ModalOpaque
        isOpen={secretCodeModalOpen}
        onClose={() => {
          setSecretCodeModalOpen(false);
          setTelegramId('');
          setSecretCode('');
        }}
        title="РђРґРјРёРЅ РїР°РЅРµР»СЊ"
        theme={theme}
        actions={
          <button 
            onClick={handleSecretCodeSubmit}
            disabled={!telegramId || !secretCode}
            className="w-full transition-colors disabled:opacity-50"
            style={{
              height: '44px',
              borderRadius: '12px',
              backgroundColor: (telegramId && secretCode) ? '#2B82FF' : theme === 'dark' ? '#202734' : '#E6E9EF',
              color: '#FFFFFF',
              border: 'none'
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Shield style={{ width: '18px', height: '18px' }} />
              <span>Р’РѕР№С‚Рё РІ Р°РґРјРёРЅРєСѓ</span>
            </div>
          </button>
        }
      >
        <div className="space-y-3">
          <div>
            <label 
              className="block mb-2 font-medium"
              style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '14px'
              }}
            >
              Telegram ID
            </label>
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              placeholder="Р’РІРµРґРёС‚Рµ РІР°С€ Telegram ID"
              className="w-full transition-colors"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                padding: '0 12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div>
            <label 
              className="block mb-2 font-medium"
              style={{ 
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '14px'
              }}
            >
              РљРѕРґ РґРѕСЃС‚СѓРїР°
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Р’РІРµРґРёС‚Рµ РєРѕРґ РґРѕСЃС‚СѓРїР°"
                className="w-full transition-colors pr-12"
                style={{
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
                  border: theme === 'dark' 
                    ? '1px solid rgba(255, 255, 255, 0.06)' 
                    : '1px solid #E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  padding: '0 12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{
                  color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
                }}
              >
                {showPassword ? 
                  <EyeOff style={{ width: '18px', height: '18px' }} /> : 
                  <Eye style={{ width: '18px', height: '18px' }} />
                }
              </button>
            </div>
          </div>
          
          <div 
            className="text-center mt-4"
            style={{ 
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              fontSize: '12px'
            }}
          >
            Р”РѕСЃС‚СѓРї С‚РѕР»СЊРєРѕ РґР»СЏ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ Рё С‚РёРјР»РёРґРѕРІ
          </div>
        </div>
      </ModalOpaque>
    </>
  );
}
