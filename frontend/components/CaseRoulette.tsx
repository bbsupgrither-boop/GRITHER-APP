п»їimport { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CaseType, RouletteResult } from '../types/cases';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseRouletteProps {
  cases: CaseType[];
  onResult: (result: RouletteResult) => void;
  isSpinning: boolean;
  onSpinComplete: () => void;
  hasSpun: boolean;
}

export function CaseRoulette({ cases, onResult, isSpinning, onSpinComplete, hasSpun }: CaseRouletteProps) {
  const [spinOffset, setSpinOffset] = useState(0);
  const [selectedCase, setSelectedCase] = useState<CaseType | null>(null);

  // Р вЂўРЎРѓР В»Р С‘ Р Р…Р ВµРЎвЂљ Р С”Р ВµР в„–РЎРѓР С•Р Р†, Р Р…Р Вµ РЎР‚Р ВµР Р…Р Т‘Р ВµРЎР‚Р С‘Р С Р С”Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљ
  if (!cases || cases.length === 0) {
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-xl bg-surface border border-border flex items-center justify-center">
        <div className="text-muted-foreground">Р вЂ”Р В°Р С–РЎР‚РЎС“Р В·Р С”Р В° Р С”Р ВµР в„–РЎРѓР С•Р Р†...</div>
      </div>
    );
  }

  // Р В¤РЎС“Р Р…Р С”РЎвЂ Р С‘РЎРЏ Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘, РЎРЏР Р†Р В»РЎРЏР ВµРЎвЂљРЎРѓРЎРЏ Р В»Р С‘ РЎРѓРЎвЂљРЎР‚Р С•Р С”Р В° URL Р С‘Р В»Р С‘ base64
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // Р С™Р С•Р СР С—Р С•Р Р…Р ВµР Р…РЎвЂљ Р Т‘Р В»РЎРЏ Р С•РЎвЂљР С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В·Р С•Р В±РЎР‚Р В°Р В¶Р ВµР Р…Р С‘РЎРЏ Р С‘Р В»Р С‘ РЎРЊР СР С•Р Т‘Р В·Р С‘
  const ImageOrEmoji = ({ src, className = '', style = {} }: { src: string; className?: string; style?: React.CSSProperties }) => {
    if (isImageUrl(src)) {
      return (
        <ImageWithFallback
          src={src}
          alt="Case image"
          className={`${className} object-cover`}
          style={style}
        />
      );
    }
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-3xl">{src}</span>
      </div>
    );
  };

  // Р РЋР С•Р В·Р Т‘Р В°Р ВµР С Р В·Р В°РЎвЂ Р С‘Р С”Р В»Р ВµР Р…Р Р…РЎвЂ№Р в„– Р СР В°РЎРѓРЎРѓР С‘Р Р† Р С”Р ВµР в„–РЎРѓР С•Р Р† Р Т‘Р В»РЎРЏ Р В±Р ВµРЎРѓРЎв‚¬Р С•Р Р†Р Р…Р С•Р в„– Р С—РЎР‚Р С•Р С”РЎР‚РЎС“РЎвЂљР С”Р С‘
  const repeatCount = 12; // Р С™Р С•Р В»Р С‘РЎвЂЎР ВµРЎРѓРЎвЂљР Р†Р С• Р С—Р С•Р Р†РЎвЂљР С•РЎР‚Р С•Р Р† Р Т‘Р В»РЎРЏ Р С–Р В»Р В°Р Т‘Р С”Р С•Р в„– Р С—РЎР‚Р С•Р С”РЎР‚РЎС“РЎвЂљР С”Р С‘
  const repeatedCases = [];
  for (let i = 0; i < repeatCount; i++) {
    repeatedCases.push(...cases);
  }
  
  const itemWidth = 100; // Р РЃР С‘РЎР‚Р С‘Р Р…Р В° Р С•Р Т‘Р Р…Р С•Р С–Р С• Р С”Р ВµР в„–РЎРѓР В°
  const containerWidth = 300; // Р РЃР С‘РЎР‚Р С‘Р Р…Р В° Р Р†Р С‘Р Т‘Р С‘Р СР С•Р С–Р С• Р С”Р С•Р Р…РЎвЂљР ВµР в„–Р Р…Р ВµРЎР‚Р В°
  const centerPosition = containerWidth / 2; // Р В¦Р ВµР Р…РЎвЂљРЎР‚ Р С”Р С•Р Р…РЎвЂљР ВµР в„–Р Р…Р ВµРЎР‚Р В°

  useEffect(() => {
    if (isSpinning && cases.length > 0) {
      // Р вЂ™РЎвЂ№Р В±Р С‘РЎР‚Р В°Р ВµР С РЎРѓР В»РЎС“РЎвЂЎР В°Р в„–Р Р…РЎвЂ№Р в„– Р С”Р ВµР в„–РЎРѓ
      const randomIndex = Math.floor(Math.random() * cases.length);
      const randomCase = cases[randomIndex];
      setSelectedCase(randomCase);
      
      // Р СњР В°РЎвЂ¦Р С•Р Т‘Р С‘Р С Р С—Р С•Р В·Р С‘РЎвЂ Р С‘РЎР‹ РЎРѓР В»РЎС“РЎвЂЎР В°Р в„–Р Р…Р С•Р С–Р С• Р С”Р ВµР в„–РЎРѓР В° Р Р† РЎРѓРЎР‚Р ВµР Т‘Р Р…Р ВµР в„– РЎвЂЎР В°РЎРѓРЎвЂљР С‘ Р С—Р С•Р Р†РЎвЂљР С•РЎР‚РЎРЏРЎР‹РЎвЂ°Р ВµР С–Р С•РЎРѓРЎРЏ Р СР В°РЎРѓРЎРѓР С‘Р Р†Р В°
      const middleRepeatIndex = Math.floor(repeatCount / 2);
      const targetIndex = middleRepeatIndex * cases.length + randomIndex;
      const targetPosition = targetIndex * itemWidth;
      
      // Р В Р В°РЎРѓРЎРѓРЎвЂЎР С‘РЎвЂљРЎвЂ№Р Р†Р В°Р ВµР С РЎвЂћР С‘Р Р…Р В°Р В»РЎРЉР Р…РЎвЂ№Р в„– offset РЎвЂЎРЎвЂљР С•Р В±РЎвЂ№ Р Р†РЎвЂ№Р В±РЎР‚Р В°Р Р…Р Р…РЎвЂ№Р в„– Р С”Р ВµР в„–РЎРѓ Р С•Р С”Р В°Р В·Р В°Р В»РЎРѓРЎРЏ Р Р† РЎвЂ Р ВµР Р…РЎвЂљРЎР‚Р Вµ
      const finalOffset = -(targetPosition - centerPosition + itemWidth / 2);
      
      // Р вЂќР С•Р В±Р В°Р Р†Р В»РЎРЏР ВµР С Р Т‘Р С•Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР ВµР В»РЎРЉР Р…РЎвЂ№Р Вµ Р С•Р В±Р С•РЎР‚Р С•РЎвЂљРЎвЂ№ Р Т‘Р В»РЎРЏ РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљР В°
      const extraSpins = 3;
      const totalOffset = finalOffset - (cases.length * itemWidth * extraSpins);
      
      setSpinOffset(totalOffset);

      // Р В§Р ВµРЎР‚Р ВµР В· 5 РЎРѓР ВµР С”РЎС“Р Р…Р Т‘ Р В·Р В°Р Р†Р ВµРЎР‚РЎв‚¬Р В°Р ВµР С РЎРѓР С—Р С‘Р Р…
      setTimeout(() => {
        onResult({
          selectedCase: randomCase,
          animationDuration: 5000
        });
        onSpinComplete();
      }, 5000);
    }
  }, [isSpinning, cases, onResult, onSpinComplete, centerPosition, itemWidth, repeatCount]);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl bg-surface border border-border">
      {/* Р В¦Р ВµР Р…РЎвЂљРЎР‚Р В°Р В»РЎРЉР Р…Р В°РЎРЏ Р В»Р С‘Р Р…Р С‘РЎРЏ-РЎС“Р С”Р В°Р В·Р В°РЎвЂљР ВµР В»РЎРЉ */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary z-20">
        {/* Р СћРЎР‚Р ВµРЎС“Р С–Р С•Р В»РЎРЉР Р…Р С‘Р С” РЎРѓР Р†Р ВµРЎР‚РЎвЂ¦РЎС“ */}
        <div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2"
        >
          <div 
            className="w-0 h-0 border-l-3 border-r-3 border-b-8 border-transparent border-b-primary"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          />
        </div>
        {/* Р СћРЎР‚Р ВµРЎС“Р С–Р С•Р В»РЎРЉР Р…Р С‘Р С” РЎРѓР Р…Р С‘Р В·РЎС“ */}
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
        >
          <div 
            className="w-0 h-0 border-l-3 border-r-3 border-t-8 border-transparent border-t-primary"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          />
        </div>
      </div>

      {/* Р В РЎС“Р В»Р ВµРЎвЂљР С”Р В° */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <motion.div
          className="flex items-start h-full"
          style={{ 
            width: repeatedCases.length * itemWidth,
            x: hasSpun ? spinOffset : 0,
            paddingTop: '16px'
          }}
          animate={{ 
            x: isSpinning ? spinOffset : (hasSpun ? spinOffset : 0)
          }}
          transition={{
            duration: isSpinning ? 5 : 0,
            ease: isSpinning ? [0.23, 1, 0.32, 1] : 'linear'
          }}
          initial={{ x: 0 }}
        >
          {repeatedCases.map((caseItem, index) => (
            <div
              key={`${caseItem.id}-${index}`}
              className="flex-shrink-0 flex flex-col items-center"
              style={{ 
                width: itemWidth,
                height: '160px' // Р В¤Р С‘Р С”РЎРѓР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р Р…Р В°РЎРЏ Р Р†РЎвЂ№РЎРѓР С•РЎвЂљР В°
              }}
            >
              <div 
                className="w-20 h-20 rounded-lg border-2 transition-all duration-200 overflow-hidden"
                style={{ 
                  backgroundColor: caseItem.color + '20',
                  borderColor: caseItem.color,
                  boxShadow: `0 4px 8px ${caseItem.color}30`
                }}
              >
                <ImageOrEmoji
                  src={caseItem.image}
                  className="w-full h-full"
                />
              </div>
              <div 
                className="text-xs text-center font-medium text-foreground px-1 mt-2"
                style={{
                  height: '32px', // Р В¤Р С‘Р С”РЎРѓР С‘РЎР‚Р С•Р Р†Р В°Р Р…Р Р…Р В°РЎРЏ Р Р†РЎвЂ№РЎРѓР С•РЎвЂљР В° Р Т‘Р В»РЎРЏ РЎвЂљР ВµР С”РЎРѓРЎвЂљР В°
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1.2'
                }}
              >
                {caseItem.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Р вЂњРЎР‚Р В°Р Т‘Р С‘Р ВµР Р…РЎвЂљР Р…РЎвЂ№Р Вµ Р С”РЎР‚Р В°РЎРЏ Р Т‘Р В»РЎРЏ РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљР В° Р В·Р В°РЎвЂљРЎС“РЎвЂ¦Р В°Р Р…Р С‘РЎРЏ */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface via-surface/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface via-surface/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
