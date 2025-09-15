п»їimport { useEffect, useState } from 'react';

interface BackgroundFX_HomeDarkProps {
  mode?: 'subtle' | 'debug';
}

export function BackgroundFX_HomeDark({ mode = 'subtle' }: BackgroundFX_HomeDarkProps) {
  const [dimensions, setDimensions] = useState({ width: 393, height: 852 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Р вЂ™РЎвЂ№РЎвЂЎР С‘РЎРѓР В»РЎРЏР ВµР С РЎР‚Р В°Р В·Р СР ВµРЎР‚РЎвЂ№ РЎРЊР В»Р В»Р С‘Р С—РЎРѓР С•Р Р† Р С•РЎвЂљР Р…Р С•РЎРѓР С‘РЎвЂљР ВµР В»РЎРЉР Р…Р С• РЎРЊР С”РЎР‚Р В°Р Р…Р В°
  const mainEllipseWidth = dimensions.width * 1.85; // ~185% РЎв‚¬Р С‘РЎР‚Р С‘Р Р…РЎвЂ№ РЎРЊР С”РЎР‚Р В°Р Р…Р В°
  const mainEllipseHeight = dimensions.height * 0.95; // ~95% Р Р†РЎвЂ№РЎРѓР С•РЎвЂљРЎвЂ№ РЎРЊР С”РЎР‚Р В°Р Р…Р В°
  
  const sideEllipseWidth = dimensions.width * 0.97; // ~380px Р С—РЎР‚Р С‘ 393px РЎв‚¬Р С‘РЎР‚Р С‘Р Р…Р Вµ
  const sideEllipseHeight = dimensions.height * 0.31; // ~260px Р С—РЎР‚Р С‘ 852px Р Р†РЎвЂ№РЎРѓР С•РЎвЂљР Вµ

  // Р В¦Р ВµР Р…РЎвЂљРЎР‚ Р В»Р С•Р С–Р С•РЎвЂљР С‘Р С—Р В° Р С—РЎР‚Р С‘Р СР ВµРЎР‚Р Р…Р С• Р Р…Р В° ~150px Р С•РЎвЂљ Р Р†Р ВµРЎР‚РЎвЂ¦Р В°
  const logoCenter = 150;
  
  // Р РЋР СР ВµРЎвЂ°Р ВµР Р…Р С‘РЎРЏ Р С•РЎвЂљР Р…Р С•РЎРѓР С‘РЎвЂљР ВµР В»РЎРЉР Р…Р С• РЎвЂ Р ВµР Р…РЎвЂљРЎР‚Р В° Р В»Р С•Р С–Р С•РЎвЂљР С‘Р С—Р В°
  const mainEllipseTop = logoCenter - 24; // Р Р†Р Р†Р ВµРЎР‚РЎвЂ¦ Р Р…Р В° 24px
  const sideEllipseTop = logoCenter + 12; // Р Р†Р Р†Р ВµРЎР‚РЎвЂ¦ Р Р…Р В° 12px
  const leftEllipseLeft = (dimensions.width / 2) - 120; // Р Р†Р В»Р ВµР Р†Р С• Р Р…Р В° 120px
  const rightEllipseLeft = (dimensions.width / 2) + 120; // Р Р†Р С—РЎР‚Р В°Р Р†Р С• Р Р…Р В° 120px

  // Р вЂ”Р Р…Р В°РЎвЂЎР ВµР Р…Р С‘РЎРЏ opacity Р Р† Р В·Р В°Р Р†Р С‘РЎРѓР С‘Р СР С•РЎРѓРЎвЂљР С‘ Р С•РЎвЂљ РЎР‚Р ВµР В¶Р С‘Р СР В°
  const opacities = mode === 'debug' 
    ? { main: 0.28, sides: 0.16, vertical: 0.24 }
    : { main: 0.18, sides: 0.10, vertical: 0.18 };

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 5, // Р вЂ™РЎвЂ№РЎв‚¬Р Вµ BackgroundFX Р Р…Р С• Р Р…Р С‘Р В¶Р Вµ Р С”Р С•Р Р…РЎвЂљР ВµР Р…РЎвЂљР В°
        overflow: 'hidden'
      }}
    >
      {/* Main Ellipse Glow */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: `${mainEllipseTop}px`,
          width: `${mainEllipseWidth}px`,
          height: `${mainEllipseHeight}px`,
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 1) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: opacities.main,
          borderRadius: '50%'
        }}
      />

      {/* Left Sweep */}
      <div
        className="absolute"
        style={{
          left: `${leftEllipseLeft}px`,
          top: `${sideEllipseTop}px`,
          width: `${sideEllipseWidth}px`,
          height: `${sideEllipseHeight}px`,
          transform: 'translateX(-50%) rotate(12deg)',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 1) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: opacities.sides,
          borderRadius: '50%'
        }}
      />

      {/* Right Sweep */}
      <div
        className="absolute"
        style={{
          left: `${rightEllipseLeft}px`,
          top: `${sideEllipseTop}px`,
          width: `${sideEllipseWidth}px`,
          height: `${sideEllipseHeight}px`,
          transform: 'translateX(-50%) rotate(-12deg)',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 1) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: opacities.sides,
          borderRadius: '50%'
        }}
      />

      {/* Vertical Fade */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.18) 100%)',
          mixBlendMode: 'multiply',
          opacity: opacities.vertical
        }}
      />
    </div>
  );
}
