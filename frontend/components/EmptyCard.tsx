п»їimport React from 'react';

interface EmptyCardProps {
  variant: 'shop_empty' | 'tasks_empty' | 'achievements_empty';
  icon?: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

const EMPTY_CARD_VARIANTS = {
  shop_empty: {
    text: 'Р СћР С•Р Р†Р В°РЎР‚РЎвЂ№ РЎРѓР С”Р С•РЎР‚Р С• Р С—Р С•РЎРЏР Р†РЎРЏРЎвЂљРЎРѓРЎРЏ'
  },
  tasks_empty: {
    text: 'Р СњР ВµРЎвЂљ Р В°Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№РЎвЂ¦ Р В·Р В°Р Т‘Р В°РЎвЂЎ'
  },
  achievements_empty: {
    text: 'Р СњР ВµРЎвЂљ Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ№РЎвЂ¦ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘Р в„–'
  }
} as const;

export function EmptyCard({ variant, icon, className = '', theme = 'light' }: EmptyCardProps) {
  const config = EMPTY_CARD_VARIANTS[variant];
  
  return (
    <div 
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#161A22' : '#FFFFFF',
        borderRadius: '16px',
        minHeight: '96px', 
        padding: '16px',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #E6E9EF',
        boxShadow: theme === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(0, 0, 0, 0.10)'
      }}
    >
      {icon && (
        <div className="w-5 h-5 flex items-center justify-center">
          {icon}
        </div>
      )}
      <p 
        className="text-center leading-tight"
        style={{
          fontSize: '14px',
          color: theme === 'dark' ? '#A7B0BD' : '#6B7280'
        }}
      >
        {config.text}
      </p>
    </div>
  );
}
