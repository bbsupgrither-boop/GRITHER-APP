import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, X } from 'lucide-react';

interface SecretAdminAccessProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: (role: string) => void;
  theme: 'light' | 'dark';
}

// РљРѕРґС‹ РґРѕСЃС‚СѓРїР° РґР»СЏ СЂР°Р·РЅС‹С… СЂРѕР»РµР№
const ADMIN_CODES = {
  'df1GE%LwVAAC': 'Р“Р»Р°РІРЅС‹Р№ РђРґРјРёРЅ',
  '0caFyNh}w%': 'РЎС‚Р°СЂС€РёР№ РђРґРјРёРЅ', 
  '~3SogEhz': 'РњР»Р°РґС€РёР№ РђРґРјРёРЅ',
  'SToU{~': 'РўРёРјР»РёРґ'
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

  // РћС‡РёСЃС‚РєР° С„РѕСЂРјС‹ РїСЂРё РѕС‚РєСЂС‹С‚РёРё/Р·Р°РєСЂС‹С‚РёРё
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
    
    // РџСЂРѕРІРµСЂСЏРµРј, С‡С‚Рѕ РѕР±Р° РїРѕР»СЏ Р·Р°РїРѕР»РЅРµРЅС‹
    if (!telegramId.trim() || !accessCode.trim()) {
      setError('Р—Р°РїРѕР»РЅРёС‚Рµ РІСЃРµ РїРѕР»СЏ');
      return;
    }
    
    // РџСЂРѕРІРµСЂСЏРµРј РєРѕРґ РґРѕСЃС‚СѓРїР°
    const role = ADMIN_CODES[accessCode as keyof typeof ADMIN_CODES];
    
    if (role) {
      // РЎРѕС…СЂР°РЅСЏРµРј СЂРѕР»СЊ РІ localStorage (СЃР±СЂРѕСЃРёС‚СЃСЏ РїСЂРё Р·Р°РєСЂС‹С‚РёРё РїСЂРёР»РѕР¶РµРЅРёСЏ)
      localStorage.setItem('adminRole', role);
      localStorage.setItem('adminCode', accessCode);
      localStorage.setItem('adminTelegramId', telegramId);
      
      // Р’С‹Р·С‹РІР°РµРј callback РґР»СЏ Р°РєС‚РёРІР°С†РёРё СЂРѕР»Рё
      onAccessGranted(role);
      
      // Р—Р°РєСЂС‹РІР°РµРј РјРѕРґР°Р»СЊРЅРѕРµ РѕРєРЅРѕ
      onClose();
      
      // РћС‡РёС‰Р°РµРј С„РѕСЂРјСѓ
      setTelegramId('');
      setAccessCode('');
      setError('');
    } else {
      setError('РќРµРІРµСЂРЅС‹Р№ РєРѕРґ РґРѕСЃС‚СѓРїР°');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
    setError(''); // РћС‡РёС‰Р°РµРј РѕС€РёР±РєСѓ РїСЂРё РІРІРѕРґРµ
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
            РђРґРјРёРЅ РїР°РЅРµР»СЊ
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
              placeholder="Р’РІРµРґРёС‚Рµ РІР°С€ Telegram ID"
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
              РљРѕРґ РґРѕСЃС‚СѓРїР°
            </label>
            
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={accessCode}
                onChange={handleInputChange}
                placeholder="Р’РІРµРґРёС‚Рµ РєРѕРґ РґРѕСЃС‚СѓРїР°"
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
            Р”РѕСЃС‚СѓРї С‚РѕР»СЊРєРѕ РґР»СЏ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ Рё С‚РёРјР»РёРґРѕРІ
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
            Р’РѕР№С‚Рё РІ Р°РґРјРёРЅРєСѓ
          </button>
        </form>
      </div>
    </div>
  );
};
