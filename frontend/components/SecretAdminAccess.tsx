import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, X } from 'lucide-react';

interface SecretAdminAccessProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: (role: string) => void;
  theme: 'light' | 'dark';
}

// Р В РЎв„ўР В РЎвЂўР В РўвЂР РЋРІР‚в„– Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р В РўвЂР В Р’В»Р РЋР РЏ Р РЋР вЂљР В Р’В°Р В Р’В·Р В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В Р’ВµР В РІвЂћвЂ“
const ADMIN_CODES = {
  'df1GE%LwVAAC': 'Р В РІР‚СљР В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦',
  '0caFyNh}w%': 'Р В Р Р‹Р РЋРІР‚С™Р В Р’В°Р РЋР вЂљР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦', 
  '~3SogEhz': 'Р В РЎС™Р В Р’В»Р В Р’В°Р В РўвЂР РЋРІвЂљВ¬Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦',
  'SToU{~': 'Р В РЎС›Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂ'
};

export const SecretAdminAccess: React.FC<SecretAdminAccessProps> = ({
  isOpen,
  onClose,
  onAccessGranted,
  theme
}) => {
  const [telegramId, setTelegramId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Р В РЎвЂєР РЋРІР‚РЋР В РЎвЂР РЋР С“Р РЋРІР‚С™Р В РЎвЂќР В Р’В° Р РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР РЋРІР‚в„– Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В РЎвЂўР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ/Р В Р’В·Р В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ
  useEffect(() => {
    if (isOpen) {
      setTelegramId('');
      setAccessCode('');
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР РЏР В Р’ВµР В РЎВ, Р РЋРІР‚РЋР РЋРІР‚С™Р В РЎвЂў Р В РЎвЂўР В Р’В±Р В Р’В° Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР РЏ Р В Р’В·Р В Р’В°Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В Р’ВµР В Р вЂ¦Р РЋРІР‚в„–
    if (!telegramId.trim() || !accessCode.trim()) {
      setError('Р В РІР‚вЂќР В Р’В°Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р вЂ Р РЋР С“Р В Р’Вµ Р В РЎвЂ”Р В РЎвЂўР В Р’В»Р РЋР РЏ');
      return;
    }
    
    // Р В РЎСџР РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР РЋР РЏР В Р’ВµР В РЎВ Р В РЎвЂќР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°
    const role = ADMIN_CODES[accessCode as keyof typeof ADMIN_CODES];
    
    if (role) {
      // Р В Р Р‹Р В РЎвЂўР РЋРІР‚В¦Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р РЋР РЏР В Р’ВµР В РЎВ Р РЋР вЂљР В РЎвЂўР В Р’В»Р РЋР Р‰ Р В Р вЂ  localStorage (Р РЋР С“Р В Р’В±Р РЋР вЂљР В РЎвЂўР РЋР С“Р В РЎвЂР РЋРІР‚С™Р РЋР С“Р РЋР РЏ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В Р’В·Р В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р В РЎвЂР В РЎвЂ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В Р’В»Р В РЎвЂўР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР РЋР РЏ)
      localStorage.setItem('adminRole', role);
      localStorage.setItem('adminCode', accessCode);
      localStorage.setItem('adminTelegramId', telegramId);
      
      // Р В РІР‚в„ўР РЋРІР‚в„–Р В Р’В·Р РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ callback Р В РўвЂР В Р’В»Р РЋР РЏ Р В Р’В°Р В РЎвЂќР РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р’В°Р РЋРІР‚В Р В РЎвЂР В РЎвЂ Р РЋР вЂљР В РЎвЂўР В Р’В»Р В РЎвЂ
      onAccessGranted(role);
      
      // Р В РІР‚вЂќР В Р’В°Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р В Р вЂ Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎВР В РЎвЂўР В РўвЂР В Р’В°Р В Р’В»Р РЋР Р‰Р В Р вЂ¦Р В РЎвЂўР В Р’Вµ Р В РЎвЂўР В РЎвЂќР В Р вЂ¦Р В РЎвЂў
      onClose();
      
      // Р В РЎвЂєР РЋРІР‚РЋР В РЎвЂР РЋРІР‚В°Р В Р’В°Р В Р’ВµР В РЎВ Р РЋРІР‚С›Р В РЎвЂўР РЋР вЂљР В РЎВР РЋРЎвЂњ
      setTelegramId('');
      setAccessCode('');
      setError('');
    } else {
      setError('Р В РЎСљР В Р’ВµР В Р вЂ Р В Р’ВµР РЋР вЂљР В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂќР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
    setError(''); // Р В РЎвЂєР РЋРІР‚РЋР В РЎвЂР РЋРІР‚В°Р В Р’В°Р В Р’ВµР В РЎВ Р В РЎвЂўР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР РЋРЎвЂњ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂ Р В Р вЂ Р В Р вЂ Р В РЎвЂўР В РўвЂР В Р’Вµ
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-sm mx-4 rounded-2xl p-6"
        style={{
          backgroundColor: theme === 'dark' ? '#1C2029' : '#FFFFFF',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #E6E9EF',
          boxShadow: theme === 'dark' 
            ? '0 20px 60px rgba(0, 0, 0, 0.8)' 
            : '0 20px 60px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            style={{
              fontSize: '18px',
              fontWeight: '500',
              color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
            }}
          >
            Р В РЎвЂ™Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р В РЎвЂ”Р В Р’В°Р В Р вЂ¦Р В Р’ВµР В Р’В»Р РЋР Р‰
          </h2>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-105"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Telegram ID Input */}
          <div>
            <label 
              className="block mb-2"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Telegram ID
            </label>
            
            <input
              type="text"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В Р вЂ Р В Р’В°Р РЋРІвЂљВ¬ Telegram ID"
              className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme === 'dark' ? '#161A22' : '#F3F5F8',
                borderColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : '#E6E9EF',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                fontSize: '12px'
              }}
            />
          </div>

          {/* Access Code Input */}
          <div>
            <label 
              className="block mb-2"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                color: theme === 'dark' ? '#E8ECF2' : '#0F172A'
              }}
            >
              Р В РЎв„ўР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°
            </label>
            
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={accessCode}
                onChange={handleInputChange}
                placeholder="Р В РІР‚в„ўР В Р вЂ Р В Р’ВµР В РўвЂР В РЎвЂР РЋРІР‚С™Р В Р’Вµ Р В РЎвЂќР В РЎвЂўР В РўвЂ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В°"
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme === 'dark' ? '#161A22' : '#F3F5F8',
                  borderColor: error 
                    ? '#ff3b30' 
                    : theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : '#E6E9EF',
                  color: theme === 'dark' ? '#E8ECF2' : '#0F172A',
                  fontSize: '12px'
                }}
                autoFocus
              />
              
              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full transition-all hover:scale-105"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '14px', height: '14px' }} />
                ) : (
                  <Eye style={{ width: '14px', height: '14px' }} />
                )}
              </button>
            </div>
            
            {/* Error Message */}
            {error && (
              <p 
                className="mt-2"
                style={{
                  fontSize: '10px',
                  color: '#ff3b30'
                }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Info Text */}
          <p 
            className="text-center"
            style={{
              fontSize: '10px',
              color: theme === 'dark' ? '#A7B0BD' : '#6B7280',
              lineHeight: '1.4'
            }}
          >
            Р В РІР‚СњР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ” Р РЋРІР‚С™Р В РЎвЂўР В Р’В»Р РЋР Р‰Р В РЎвЂќР В РЎвЂў Р В РўвЂР В Р’В»Р РЋР РЏ Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂР РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂўР РЋР вЂљР В РЎвЂўР В Р вЂ  Р В РЎвЂ Р РЋРІР‚С™Р В РЎвЂР В РЎВР В Р’В»Р В РЎвЂР В РўвЂР В РЎвЂўР В Р вЂ 
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{
              backgroundColor: (telegramId.trim() && accessCode.trim()) ? '#2B82FF' : '#202734',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '500'
            }}
            disabled={!telegramId.trim() || !accessCode.trim()}
          >
            <Shield style={{ width: '16px', height: '16px' }} />
            Р В РІР‚в„ўР В РЎвЂўР В РІвЂћвЂ“Р РЋРІР‚С™Р В РЎвЂ Р В Р вЂ  Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦Р В РЎвЂќР РЋРЎвЂњ
          </button>
        </form>
      </div>
    </div>
  );
};
