п»їimport { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Star } from './Icons';
import { X } from 'lucide-react';
import coinImage from 'figma:asset/acaa4cccbfaf8eeee6ecbbe8f29c92d03b701371.png';

interface ProgressXPProps {
  level?: number;
  experience?: number;
  maxExperience?: number;
  showModal?: boolean;
  theme?: 'light' | 'dark';
}

export function ProgressXP({ 
  level = 1, 
  experience = 0, 
  maxExperience = 250,
  showModal = true,
  theme = 'light'
}: ProgressXPProps) {
  const [isXpDialogOpen, setIsXpDialogOpen] = useState(false);
  
  // Р вЂќР В°Р Р…Р Р…РЎвЂ№Р Вµ Р С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљР ВµР В»РЎРЏ
  const currentXp = experience;
  const currentLevel = level;
  const xpNeededForNextLevel = maxExperience;
  const nextLevelReward = Math.floor(level * 50); // G-coins Р В·Р В° Р С—Р ВµРЎР‚Р ВµРЎвЂ¦Р С•Р Т‘ Р Р…Р В° РЎРѓР В»Р ВµР Т‘РЎС“РЎР‹РЎвЂ°Р С‘Р в„– РЎС“РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ
  
  // Р ВРЎРѓР С—Р С•Р В»РЎРЉР В·РЎС“Р ВµР С CSS Р С—Р ВµРЎР‚Р ВµР СР ВµР Р…Р Р…РЎвЂ№Р Вµ Р Т‘Р В»РЎРЏ РЎвЂљР С•РЎвЂЎР Р…Р С•Р С–Р С• РЎРѓР С•Р С•РЎвЂљР Р†Р ВµРЎвЂљРЎРѓРЎвЂљР Р†Р С‘РЎРЏ Р Т‘Р С‘Р В·Р В°Р в„–Р Р…-РЎРѓР С‘РЎРѓРЎвЂљР ВµР СР Вµ
  
  return (
    <>
      {/* Progress XP Component */}
      <div className="flex flex-col" style={{ gap: '8px' }}>
        {/* Р вЂєР ВµР Р…РЎвЂљР В° Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° РЎРѓР С• Р В·Р Р†Р ВµР В·Р Т‘Р С•Р в„– */}
        <div className="relative">
          {/* Р вЂ”Р Р†Р ВµР В·Р Т‘Р В° РЎРѓР В»Р ВµР Р†Р В° РЎРѓ Р С—Р ВµРЎР‚Р ВµР С”РЎР‚РЎвЂ№РЎвЂљР С‘Р ВµР С */}
          <div 
            className="absolute z-10"
            style={{
              left: '-12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '32px'
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Star 
                className="w-8 h-8 fill-current" 
                style={{ color: 'var(--text)' }}
              />
              <span 
                className="absolute font-bold"
                style={{ 
                  fontSize: '12px',
                  color: '#FFFFFF'
                }}
              >
                {currentLevel}
              </span>
            </div>
          </div>
          
          {/* Р вЂєР ВµР Р…РЎвЂљР В° Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° */}
          <div 
            className="w-full"
            style={{
              height: '16px',
              backgroundColor: 'var(--progress-track)',
              borderRadius: '12px',
              border: '1px solid var(--progress-track-border)',
              opacity: 1
            }}
          >
            <div 
              className="transition-all duration-500"
              style={{ 
                width: `${(currentXp / xpNeededForNextLevel) * 100}%`,
                height: '16px',
                background: theme === 'dark' 
                  ? 'var(--primary)'
                  : 'linear-gradient(90deg, #2B82FF 0%, #62A6FF 100%)',
                borderRadius: '12px',
                opacity: 1
              }}
            />
          </div>
        </div>
        
        {/* Р В§Р С‘РЎРѓР В»Р С• Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° Р С—Р С•Р Т‘ Р В»Р ВµР Р…РЎвЂљР С•Р в„– */}
        <div className="text-center">
          <span 
            className="font-semibold"
            style={{ 
              fontSize: '14px',
              color: 'var(--text)',
              opacity: 1
            }}
          >
            {showModal ? (
              <button 
                onClick={() => setIsXpDialogOpen(true)}
                className="transition-colors cursor-pointer hover:opacity-70"
              >
                {currentXp.toLocaleString()}/{xpNeededForNextLevel.toLocaleString()}
              </button>
            ) : (
              `${currentXp.toLocaleString()}/${xpNeededForNextLevel.toLocaleString()}`
            )}
          </span>
        </div>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <Dialog open={isXpDialogOpen} onOpenChange={setIsXpDialogOpen}>
          <DialogContent 
            className="w-auto min-w-[320px] max-w-[360px] mx-4"
            aria-describedby={undefined}
            style={{
              padding: '16px',
              gap: '12px',
              borderRadius: '16px'
            }}
          >
            {/* Р РЃР В°Р С—Р С”Р В° РЎРѓ Р В·Р В°Р С–Р С•Р В»Р С•Р Р†Р С”Р С•Р С Р С‘ Р С”Р Р…Р С•Р С—Р С”Р С•Р в„– Р В·Р В°Р С”РЎР‚РЎвЂ№РЎвЂљР С‘РЎРЏ */}
            <div className="flex items-center justify-between" style={{ margin: '0 0 0 0' }}>
              <div className="flex-1"></div>
              <DialogTitle 
                className="text-center font-semibold whitespace-nowrap flex-1"
                style={{ 
                  fontSize: '18px',
                  color: 'var(--text)',
                  margin: 0
                }}
              >
                Р вЂ™Р В°РЎв‚¬ РЎвЂљР ВµР С”РЎС“РЎвЂ°Р С‘Р в„– Р С•Р С—РЎвЂ№РЎвЂљ
              </DialogTitle>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setIsXpDialogOpen(false)}
                  className="flex items-center justify-center transition-colors hover:bg-surface-2"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <X style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            {/* Р вЂР В»Р С•Р С” Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° */}
            <div className="flex flex-col" style={{ gap: '8px' }}>
              {/* Р вЂєР ВµР Р…РЎвЂљР В° Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° РЎРѓР С• Р В·Р Р†Р ВµР В·Р Т‘Р С•Р в„– */}
              <div className="relative">
                {/* Р вЂ”Р Р†Р ВµР В·Р Т‘Р В° РЎРѓР В»Р ВµР Р†Р В° РЎРѓ Р С—Р ВµРЎР‚Р ВµР С”РЎР‚РЎвЂ№РЎвЂљР С‘Р ВµР С */}
                <div 
                  className="absolute z-10"
                  style={{
                    left: '-12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '32px',
                    height: '32px'
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Star 
                      className="w-8 h-8 fill-current" 
                      style={{ color: 'var(--text)' }}
                    />
                    <span 
                      className="absolute font-bold"
                      style={{ 
                        fontSize: '12px',
                        color: 'var(--primary-foreground)'
                      }}
                    >
                      {currentLevel}
                    </span>
                  </div>
                </div>
                
                {/* Р вЂєР ВµР Р…РЎвЂљР В° Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° */}
                <div 
                  className="w-full rounded-xl"
                  style={{
                    height: '16px',
                    backgroundColor: 'var(--surface-3)',
                    borderRadius: '12px'
                  }}
                >
                  <div 
                    className="rounded-xl transition-all duration-500"
                    style={{ 
                      width: `${(currentXp / xpNeededForNextLevel) * 100}%`,
                      height: '16px',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '12px'
                    }}
                  />
                </div>
              </div>
              
              {/* Р В§Р С‘РЎРѓР В»Р С• Р С—РЎР‚Р С•Р С–РЎР‚Р ВµРЎРѓРЎРѓР В° Р С—Р С•Р Т‘ Р В»Р ВµР Р…РЎвЂљР С•Р в„– */}
              <div className="text-center">
                <span 
                  className="font-semibold"
                  style={{ 
                    fontSize: '14px',
                    color: 'var(--text)'
                  }}
                >
                  {currentXp.toLocaleString()}/{xpNeededForNextLevel.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Р вЂР В»Р С•Р С” Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ */}
            <div className="flex flex-col items-center" style={{ gap: '8px' }}>
              {/* Р вЂ”Р В°Р С–Р С•Р В»Р С•Р Р†Р С•Р С” Р Р…Р В°Р С–РЎР‚Р В°Р Т‘РЎвЂ№ */}
              <span 
                className="font-semibold text-center"
                style={{ 
                  fontSize: '14px',
                  color: 'var(--text)'
                }}
              >
                Р СњР В°Р С–РЎР‚Р В°Р Т‘Р В° Р В·Р В° РЎС“РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ
              </span>
              
              {/* Р СџР С‘Р В»РЎР‹Р В»РЎРЏ РЎРѓ Р СР С•Р Р…Р ВµРЎвЂљР С•Р в„– */}
              <div 
                className="flex items-center border"
                style={{
                  height: '32px',
                  borderRadius: '999px',
                  padding: '0 12px',
                  gap: '8px',
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  borderWidth: '1px'
                }}
              >
                <img 
                  src={coinImage} 
                  alt="G-coin" 
                  style={{ width: '16px', height: '16px' }}
                />
                <span 
                  className="font-semibold"
                  style={{ 
                    fontSize: '14px',
                    color: 'var(--text)'
                  }}
                >
                  {nextLevelReward}g
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
