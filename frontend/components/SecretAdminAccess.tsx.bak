import React, { useState, useEffect } from 'react';
import { Shield, Eye, EyeOff, X } from 'lucide-react';

interface SecretAdminAccessProps {
  isOpen: boolean;
  onClose: () => void;
  onAccessGranted: (role: string) => void;
  theme: 'light' | 'dark';
}

// Коды доступа для разных ролей
const ADMIN_CODES = {
  'df1GE%LwVAAC': 'Главный Админ',
  '0caFyNh}w%': 'Старший Админ', 
  '~3SogEhz': 'Младший Админ',
  'SToU{~': 'Тимлид'
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

  // Очистка формы при открытии/закрытии
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
    
    // Проверяем, что оба поля заполнены
    if (!telegramId.trim() || !accessCode.trim()) {
      setError('Заполните все поля');
      return;
    }
    
    // Проверяем код доступа
    const role = ADMIN_CODES[accessCode as keyof typeof ADMIN_CODES];
    
    if (role) {
      // Сохраняем роль в localStorage (сбросится при закрытии приложения)
      localStorage.setItem('adminRole', role);
      localStorage.setItem('adminCode', accessCode);
      localStorage.setItem('adminTelegramId', telegramId);
      
      // Вызываем callback для активации роли
      onAccessGranted(role);
      
      // Закрываем модальное окно
      onClose();
      
      // Очищаем форму
      setTelegramId('');
      setAccessCode('');
      setError('');
    } else {
      setError('Неверный код доступа');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(e.target.value);
    setError(''); // Очищаем ошибку при вводе
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
            Админ панель
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
              placeholder="Введите ваш Telegram ID"
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
              Код доступа
            </label>
            
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={accessCode}
                onChange={handleInputChange}
                placeholder="Введите код доступа"
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
            Доступ только для администраторов и тимлидов
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
            Войти в админку
          </button>
        </form>
      </div>
    </div>
  );
};
