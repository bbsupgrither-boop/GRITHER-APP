import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
  isHomePage?: boolean;
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme, isHomePage = false }) => {
  if (isHomePage && theme === 'light') {
    // Р В РЎв„ўР РЋР вЂљР В Р’В°Р РЋР С“Р В РЎвЂР В Р вЂ Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР В РЎвЂР В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋРІР‚С›Р В РЎвЂўР В Р вЂ¦ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ“Р В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р РЋРІР‚в„– Р РЋР С“ Р РЋР РЉР РЋРІР‚С›Р РЋРІР‚С›Р В Р’ВµР В РЎвЂќР РЋРІР‚С™Р В РЎвЂўР В РЎВ Р В Р вЂ¦Р В Р’ВµР В Р’В±Р В Р’В°
    return (
      <div className="fixed inset-0 background-fx">
        {/* Р В РЎвЂєР РЋР С“Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р В РЎвЂ“Р РЋР вЂљР В Р’В°Р В РўвЂР В РЎвЂР В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР С“Р В Р’В»Р В РЎвЂўР В РІвЂћвЂ“ */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(59, 130, 246, 0.8) 0%, 
              rgba(59, 130, 246, 0.4) 30%, 
              rgba(255, 255, 255, 0.9) 70%, 
              #F8FAFC 100%
            )`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        {/* Р В РІР‚СњР В Р’ВµР В РЎвЂќР В РЎвЂўР РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР С“Р В РЎвЂР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р РЋР РЉР РЋРІР‚С›Р РЋРІР‚С›Р В Р’ВµР В РЎвЂќР РЋРІР‚С™ Р В Р вЂ¦Р В Р’ВµР В Р’В±Р В Р’В° */}
        <div 
          className="absolute"
          style={{
            top: '-10%',
            right: '-5%',
            width: '50%',
            height: '70%',
            background: `linear-gradient(180deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 100%)`,
            opacity: 0.2,
            filter: 'blur(48px)',
            borderRadius: '50%',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
        
        {/* Р В РІР‚СњР В РЎвЂўР В РЎвЂ”Р В РЎвЂўР В Р’В»Р В Р вЂ¦Р В РЎвЂР РЋРІР‚С™Р В Р’ВµР В Р’В»Р РЋР Р‰Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР С“Р В Р’В»Р В РЎвЂўР В РІвЂћвЂ“ Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ“Р В Р’В»Р РЋРЎвЂњР В Р’В±Р В РЎвЂР В Р вЂ¦Р РЋРІР‚в„– */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center top, 
              rgba(59, 130, 246, 0.1) 0%, 
              transparent 60%
            )`,
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  if (isHomePage && theme === 'dark') {
    // Р В РЎС›Р В Р’ВµР В РЎВР В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂ“Р В Р’В»Р В Р’В°Р В Р вЂ Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р РЋРІР‚в„–
    return (
      <div className="fixed inset-0 background-fx">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, 
              rgba(0, 132, 255, 0.15) 0%, 
              rgba(18, 21, 27, 0.9) 30%, 
              #12151B 100%
            )`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  // Р В РЎвЂєР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р В Р’Вµ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В Р РЋРІР‚в„–
  if (theme === 'light') {
    return (
      <div className="fixed inset-0 background-fx">
        {/* Р В РЎвЂєР РЋР С“Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р вЂ¦Р В РЎвЂўР В РІвЂћвЂ“ Р РЋРІР‚С›Р В РЎвЂўР В Р вЂ¦ */}
        <div 
          className="absolute inset-0"
          style={{
            background: '#F8FAFC',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        {/* Р В РІР‚СњР В Р’ВµР В РЎвЂќР В РЎвЂўР РЋР вЂљР В Р’В°Р РЋРІР‚С™Р В РЎвЂР В Р вЂ Р В Р вЂ¦Р РЋРІР‚в„–Р В РІвЂћвЂ“ Р РЋР С“Р В РЎвЂР В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р РЋР РЉР РЋРІР‚С›Р РЋРІР‚С›Р В Р’ВµР В РЎвЂќР РЋРІР‚С™ Р В Р вЂ¦Р В Р’ВµР В Р’В±Р В Р’В° */}
        <div 
          className="absolute"
          style={{
            top: '-10%',
            right: '-5%',
            width: '50%',
            height: '70%',
            background: `linear-gradient(180deg, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 100%)`,
            opacity: 0.15,
            filter: 'blur(48px)',
            borderRadius: '50%',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      </div>
    );
  }

  // Р В РЎС›Р В Р’ВµР В РЎВР В Р вЂ¦Р В Р’В°Р РЋР РЏ Р РЋРІР‚С™Р В Р’ВµР В РЎВР В Р’В° Р В РўвЂР В Р’В»Р РЋР РЏ Р В РЎвЂўР В Р’В±Р РЋРІР‚в„–Р РЋРІР‚РЋР В Р вЂ¦Р РЋРІР‚в„–Р РЋРІР‚В¦ Р РЋР С“Р РЋРІР‚С™Р РЋР вЂљР В Р’В°Р В Р вЂ¦Р В РЎвЂР РЋРІР‚В 
  return (
    <div className="fixed inset-0 background-fx">
      <div 
        className="absolute inset-0"
        style={{
          background: '#12151B',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};