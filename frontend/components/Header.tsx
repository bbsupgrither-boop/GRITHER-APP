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
    <div className="w-full px-4 py-4 relative z-10" style={{
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'
    }}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {!hideUserIcon && (
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">В</span>
            </div>
            <div>
              <div className="font-medium text-foreground">Вы</div>
              <div className="text-sm text-muted-foreground">GRITHER</div>
            </div>
          </button>
        )}
        
        <button
          onClick={onOpenSettings}
          className="apple-button p-2"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};