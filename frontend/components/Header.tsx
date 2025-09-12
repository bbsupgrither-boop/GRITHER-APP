import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onOpenSettings: () => void;
  theme: 'light' | 'dark';
  hideUserIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenSettings,
  theme,
  hideUserIcon = false,
}) => {
  return (
    <div className="w-full px-4 py-4 relative" style={{
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      zIndex: 100,
      pointerEvents: 'auto'
    }}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {!hideUserIcon && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔥 PROFILE BUTTON CLICKED 🔥');
              console.log('onNavigate function:', typeof onNavigate);
              alert('Profile button clicked! Check console for details.');
              onNavigate('profile');
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '8px',
              borderRadius: '8px',
              transition: 'opacity 0.2s ease',
              zIndex: 101,
              position: 'relative',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#3B82F6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>В</span>
            </div>
            <div>
              <div style={{
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '16px'
              }}>Вы</div>
              <div style={{
                fontSize: '14px',
                color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
              }}>GRITHER</div>
            </div>
          </button>
        )}
        
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('⚙️ SETTINGS BUTTON CLICKED ⚙️');
            console.log('onOpenSettings function:', typeof onOpenSettings);
            alert('Settings button clicked! Check console for details.');
            onOpenSettings();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: theme === 'dark' ? '#202734' : '#F3F5F8',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 101,
            position: 'relative',
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2A3140' : '#E8EBF0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme === 'dark' ? '#202734' : '#F3F5F8';
          }}
        >
          <Settings style={{
            width: '20px',
            height: '20px',
            color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
          }} />
        </button>
      </div>
    </div>
  );
};