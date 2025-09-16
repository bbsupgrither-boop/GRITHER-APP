Р С—Р’В»РЎвЂ”import React from 'react';

interface EmptyCardProps {
  variant: 'shop_empty' | 'tasks_empty' | 'achievements_empty';
  icon?: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

const EMPTY_CARD_VARIANTS = {
  shop_empty: {
    text: 'Р В Р’В Р РЋРЎвЂєР В Р’В Р РЋРІР‚СћР В Р’В Р В РІР‚В Р В Р’В Р вЂ™Р’В°Р В Р Р‹Р В РІР‚С™Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“ Р В Р Р‹Р В РЎвЂњР В Р’В Р РЋРІР‚СњР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РІР‚С™Р В Р’В Р РЋРІР‚Сћ Р В Р’В Р РЋРІР‚вЂќР В Р’В Р РЋРІР‚СћР В Р Р‹Р В Р РЏР В Р’В Р В РІР‚В Р В Р Р‹Р В Р РЏР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р В РЎвЂњР В Р Р‹Р В Р РЏ'
  },
  tasks_empty: {
    text: 'Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р вЂ™Р’В°Р В Р’В Р РЋРІР‚СњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р В РІР‚В Р В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљР’В¦ Р В Р’В Р вЂ™Р’В·Р В Р’В Р вЂ™Р’В°Р В Р’В Р СћРІР‚ВР В Р’В Р вЂ™Р’В°Р В Р Р‹Р Р†Р вЂљР Р‹'
  },
  achievements_empty: {
    text: 'Р В Р’В Р РЋРЎС™Р В Р’В Р вЂ™Р’ВµР В Р Р‹Р Р†Р вЂљРЎв„ў Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р Р‹Р РЋРІР‚СљР В Р’В Р РЋРІР‚вЂќР В Р’В Р В РІР‚В¦Р В Р Р‹Р Р†Р вЂљРІвЂћвЂ“Р В Р Р‹Р Р†Р вЂљР’В¦ Р В Р’В Р СћРІР‚ВР В Р’В Р РЋРІР‚СћР В Р Р‹Р В РЎвЂњР В Р Р‹Р Р†Р вЂљРЎв„ўР В Р’В Р РЋРІР‚ВР В Р’В Р вЂ™Р’В¶Р В Р’В Р вЂ™Р’ВµР В Р’В Р В РІР‚В¦Р В Р’В Р РЋРІР‚ВР В Р’В Р Р†РІР‚С›РІР‚вЂњ'
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
