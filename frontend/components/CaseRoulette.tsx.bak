import { useState, useEffect } from 'react';
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

  // Р•СЃР»Рё РЅРµС‚ РєРµР№СЃРѕРІ, РЅРµ СЂРµРЅРґРµСЂРёРј РєРѕРјРїРѕРЅРµРЅС‚
  if (!cases || cases.length === 0) {
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-xl bg-surface border border-border flex items-center justify-center">
        <div className="text-muted-foreground">Р—Р°РіСЂСѓР·РєР° РєРµР№СЃРѕРІ...</div>
      </div>
    );
  }

  // Р¤СѓРЅРєС†РёСЏ РґР»СЏ РїСЂРѕРІРµСЂРєРё, СЏРІР»СЏРµС‚СЃСЏ Р»Рё СЃС‚СЂРѕРєР° URL РёР»Рё base64
  const isImageUrl = (str: string) => {
    try {
      new URL(str);
      return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:');
    } catch {
      return false;
    }
  };

  // РљРѕРјРїРѕРЅРµРЅС‚ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ РёР»Рё СЌРјРѕРґР·Рё
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

  // РЎРѕР·РґР°РµРј Р·Р°С†РёРєР»РµРЅРЅС‹Р№ РјР°СЃСЃРёРІ РєРµР№СЃРѕРІ РґР»СЏ Р±РµСЃС€РѕРІРЅРѕР№ РїСЂРѕРєСЂСѓС‚РєРё
  const repeatCount = 12; // РљРѕР»РёС‡РµСЃС‚РІРѕ РїРѕРІС‚РѕСЂРѕРІ РґР»СЏ РіР»Р°РґРєРѕР№ РїСЂРѕРєСЂСѓС‚РєРё
  const repeatedCases = [];
  for (let i = 0; i < repeatCount; i++) {
    repeatedCases.push(...cases);
  }
  
  const itemWidth = 100; // РЁРёСЂРёРЅР° РѕРґРЅРѕРіРѕ РєРµР№СЃР°
  const containerWidth = 300; // РЁРёСЂРёРЅР° РІРёРґРёРјРѕРіРѕ РєРѕРЅС‚РµР№РЅРµСЂР°
  const centerPosition = containerWidth / 2; // Р¦РµРЅС‚СЂ РєРѕРЅС‚РµР№РЅРµСЂР°

  useEffect(() => {
    if (isSpinning && cases.length > 0) {
      // Р’С‹Р±РёСЂР°РµРј СЃР»СѓС‡Р°Р№РЅС‹Р№ РєРµР№СЃ
      const randomIndex = Math.floor(Math.random() * cases.length);
      const randomCase = cases[randomIndex];
      setSelectedCase(randomCase);
      
      // РќР°С…РѕРґРёРј РїРѕР·РёС†РёСЋ СЃР»СѓС‡Р°Р№РЅРѕРіРѕ РєРµР№СЃР° РІ СЃСЂРµРґРЅРµР№ С‡Р°СЃС‚Рё РїРѕРІС‚РѕСЂСЏСЋС‰РµРіРѕСЃСЏ РјР°СЃСЃРёРІР°
      const middleRepeatIndex = Math.floor(repeatCount / 2);
      const targetIndex = middleRepeatIndex * cases.length + randomIndex;
      const targetPosition = targetIndex * itemWidth;
      
      // Р Р°СЃСЃС‡РёС‚С‹РІР°РµРј С„РёРЅР°Р»СЊРЅС‹Р№ offset С‡С‚РѕР±С‹ РІС‹Р±СЂР°РЅРЅС‹Р№ РєРµР№СЃ РѕРєР°Р·Р°Р»СЃСЏ РІ С†РµРЅС‚СЂРµ
      const finalOffset = -(targetPosition - centerPosition + itemWidth / 2);
      
      // Р”РѕР±Р°РІР»СЏРµРј РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РѕР±РѕСЂРѕС‚С‹ РґР»СЏ СЌС„С„РµРєС‚Р°
      const extraSpins = 3;
      const totalOffset = finalOffset - (cases.length * itemWidth * extraSpins);
      
      setSpinOffset(totalOffset);

      // Р§РµСЂРµР· 5 СЃРµРєСѓРЅРґ Р·Р°РІРµСЂС€Р°РµРј СЃРїРёРЅ
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
      {/* Р¦РµРЅС‚СЂР°Р»СЊРЅР°СЏ Р»РёРЅРёСЏ-СѓРєР°Р·Р°С‚РµР»СЊ */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary z-20">
        {/* РўСЂРµСѓРіРѕР»СЊРЅРёРє СЃРІРµСЂС…Сѓ */}
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
        {/* РўСЂРµСѓРіРѕР»СЊРЅРёРє СЃРЅРёР·Сѓ */}
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

      {/* Р СѓР»РµС‚РєР° */}
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
                height: '160px' // Р¤РёРєСЃРёСЂРѕРІР°РЅРЅР°СЏ РІС‹СЃРѕС‚Р°
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
                  height: '32px', // Р¤РёРєСЃРёСЂРѕРІР°РЅРЅР°СЏ РІС‹СЃРѕС‚Р° РґР»СЏ С‚РµРєСЃС‚Р°
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

      {/* Р“СЂР°РґРёРµРЅС‚РЅС‹Рµ РєСЂР°СЏ РґР»СЏ СЌС„С„РµРєС‚Р° Р·Р°С‚СѓС…Р°РЅРёСЏ */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface via-surface/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface via-surface/80 to-transparent pointer-events-none z-10" />
    </div>
  );
}
