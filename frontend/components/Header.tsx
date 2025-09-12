import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onOpenSettings: () => void;
  theme: 'light' | 'dark';
  hideUserIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  theme,
  hideUserIcon = false,
}) => {
  return (
    <div className={`w-full px-4 py-4 ${
      theme === 'dark' ? 'bg-black/20' : 'bg-white/20'
    }`}>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {!hideUserIcon && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">В</span>
            </div>
            <div>
              <div className="font-medium">Вы</div>
              <div className="text-sm text-gray-400">GRITHER</div>
            </div>
          </div>
        )}
        
        <button
          onClick={onOpenSettings}
          className={`p-2 rounded-xl transition-all hover:scale-105 ${
            theme === 'dark' 
              ? 'bg-white/10 hover:bg-white/20' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};