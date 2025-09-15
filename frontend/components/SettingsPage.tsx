п»їimport React, { useState } from 'react';
import { Header } from './Header';
import { Modal } from './Modal';
import { Switch } from './Switch';
import { Bell, Palette, MessageCircle, AlertTriangle } from './Icons';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onOpenSettings?: () => void;
  profilePhoto?: string | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  theme?: 'light' | 'dark';
}

interface SettingsState {
  notifications: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
}

export function SettingsPage({ 
  onNavigate, 
  currentPage, 
  onOpenSettings, 
  profilePhoto, 
  isDarkMode, 
  onToggleDarkMode, 
  theme = 'light' 
}: SettingsPageProps) {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    pushNotifications: false,
    emailNotifications: true
  });
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');

  const handleSettingChange = (key: keyof SettingsState, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReportSubmit = () => {
    // Р вЂєР С•Р С–Р С‘Р С”Р В° Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р С”Р С‘ Р С•РЎвЂљРЎвЂЎР ВµРЎвЂљР В° Р С• Р С—РЎР‚Р С•Р В±Р В»Р ВµР СР Вµ
    console.log('Р С›РЎвЂљРЎвЂЎР ВµРЎвЂљ Р С•РЎвЂљР С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…:', reportText);
    setReportText('');
    setIsReportModalOpen(false);
  };

  const settingsItems = [
    {
      icon: Bell,
      title: 'Р Р€Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘РЎРЏ',
      subtitle: 'Р Р€Р С—РЎР‚Р В°Р Р†Р В»Р ВµР Р…Р С‘Р Вµ Р Р†РЎРѓР ВµР СР С‘ РЎС“Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘РЎРЏР СР С‘',
      control: (
        <Switch
          checked={settings.notifications}
          onChange={(checked) => handleSettingChange('notifications', checked)}
          theme={theme}
        />
      )
    },
    {
      icon: Palette,
      title: 'Р СћР ВµР СР В°',
      subtitle: isDarkMode ? 'Р СћР ВµР СР Р…Р В°РЎРЏ РЎвЂљР ВµР СР В° Р Р†Р С”Р В»РЎР‹РЎвЂЎР ВµР Р…Р В°' : 'Р РЋР Р†Р ВµРЎвЂљР В»Р В°РЎРЏ РЎвЂљР ВµР СР В° Р Р†Р С”Р В»РЎР‹РЎвЂЎР ВµР Р…Р В°',
      control: (
        <Switch
          checked={isDarkMode}
          onChange={onToggleDarkMode}
          theme={theme}
        />
      )
    },
    {
      icon: MessageCircle,
      title: 'Р РЋР С•Р С•Р В±РЎвЂ°Р С‘РЎвЂљРЎРЉ Р С• Р С—РЎР‚Р С•Р В±Р В»Р ВµР СР Вµ',
      subtitle: 'Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ Р С•РЎвЂљРЎвЂЎР ВµРЎвЂљ РЎР‚Р В°Р В·РЎР‚Р В°Р В±Р С•РЎвЂљРЎвЂЎР С‘Р С”Р В°Р С',
      control: null,
      onClick: () => setIsReportModalOpen(true)
    }
  ];

  return (
    <div 
      className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}
      style={{
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, #12151B 0%, #0B0D10 100%)'
          : 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
        color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
      }}
    >
      {/* Header */}
      <Header 
        onNavigate={onNavigate} 
        currentPage={currentPage} 
        onOpenSettings={onOpenSettings}
        profilePhoto={profilePhoto}
        title="Р СњР В°РЎРѓРЎвЂљРЎР‚Р С•Р в„–Р С”Р С‘"
        theme={theme}
      />
      
      {/* Main Content */}
      <div className="max-w-md mx-auto pt-20 px-4 pb-32">
        <div 
          style={{
            backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
            borderRadius: '20px',
            padding: '0',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.06)' 
              : '1px solid #E6E9EF',
            boxShadow: theme === 'dark' 
              ? '0 8px 24px rgba(0, 0, 0, 0.6)' 
              : '0 8px 24px rgba(0, 0, 0, 0.10)',
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
                  backgroundColor: item.onClick && theme === 'dark' 
                    ? 'hover:rgba(255, 255, 255, 0.03)' 
                    : item.onClick 
                      ? 'hover:rgba(0, 0, 0, 0.02)' 
                      : 'transparent'
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
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Р РЋР С•Р С•Р В±РЎвЂ°Р С‘РЎвЂљРЎРЉ Р С• Р С—РЎР‚Р С•Р В±Р В»Р ВµР СР Вµ"
        theme={theme}
        actions={
          <>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="flex-1 transition-colors"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
                border: theme === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.06)' 
                  : '1px solid #E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р С›РЎвЂљР СР ВµР Р…Р В°
            </button>
            <button
              onClick={handleReportSubmit}
              disabled={!reportText.trim()}
              className="flex-1 transition-colors disabled:opacity-50"
              style={{
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#2B82FF',
                color: '#FFFFFF',
                border: 'none'
              }}
            >
              Р С›РЎвЂљР С—РЎР‚Р В°Р Р†Р С‘РЎвЂљРЎРЉ
            </button>
          </>
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
              Р С›Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р С—РЎР‚Р С•Р В±Р В»Р ВµР СРЎС“
            </label>
            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Р В Р В°РЎРѓРЎРѓР С”Р В°Р В¶Р С‘РЎвЂљР Вµ, РЎРѓ Р С”Р В°Р С”Р С•Р в„– Р С—РЎР‚Р С•Р В±Р В»Р ВµР СР С•Р в„– Р Р†РЎвЂ№ РЎРѓРЎвЂљР С•Р В»Р С”Р Р…РЎС“Р В»Р С‘РЎРѓРЎРЉ..."
              rows={4}
              className="w-full transition-colors resize-none"
              style={{
                height: '88px',
                borderRadius: '12px',
                backgroundColor: theme === 'dark' ? '#1C2029' : '#F3F5F8',
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
          
          <div className="flex items-start gap-3 p-3 rounded-12" 
               style={{ 
                 backgroundColor: theme === 'dark' ? '#2A1F1A' : '#FFF7ED',
                 border: theme === 'dark' 
                   ? '1px solid rgba(255, 193, 7, 0.2)' 
                   : '1px solid #FED7AA'
               }}>
            <AlertTriangle 
              style={{ 
                width: '18px', 
                height: '18px', 
                color: '#F59E0B',
                flexShrink: 0,
                marginTop: '1px'
              }} 
            />
            <div>
              <div 
                className="font-medium mb-1"
                style={{ 
                  color: theme === 'dark' ? '#FED7AA' : '#D97706',
                  fontSize: '12px'
                }}
              >
                Р вЂ™Р В°Р В¶Р Р…Р С•
              </div>
              <div 
                style={{ 
                  color: theme === 'dark' ? '#FED7AA' : '#D97706',
                  fontSize: '12px',
                  lineHeight: '16px'
                }}
              >
                Р СњР Вµ РЎС“Р С”Р В°Р В·РЎвЂ№Р Р†Р В°Р в„–РЎвЂљР Вµ Р В»Р С‘РЎвЂЎР Р…РЎС“РЎР‹ Р С‘Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ Р С‘РЎР‹ Р Р† Р С•РЎвЂљРЎвЂЎР ВµРЎвЂљР Вµ
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
