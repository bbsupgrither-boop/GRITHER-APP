import { useEffect, useState } from 'react';

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

  // Р’С‹С‡РёСЃР»СЏРµРј СЂР°Р·РјРµСЂС‹ СЌР»Р»РёРїСЃРѕРІ РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅРѕ СЌРєСЂР°РЅР°
  const mainEllipseWidth = dimensions.width * 1.85; // ~185% С€РёСЂРёРЅС‹ СЌРєСЂР°РЅР°
  const mainEllipseHeight = dimensions.height * 0.95; // ~95% РІС‹СЃРѕС‚С‹ СЌРєСЂР°РЅР°
  
  const sideEllipseWidth = dimensions.width * 0.97; // ~380px РїСЂРё 393px С€РёСЂРёРЅРµ
  const sideEllipseHeight = dimensions.height * 0.31; // ~260px РїСЂРё 852px РІС‹СЃРѕС‚Рµ

  // Р¦РµРЅС‚СЂ Р»РѕРіРѕС‚РёРїР° РїСЂРёРјРµСЂРЅРѕ РЅР° ~150px РѕС‚ РІРµСЂС…Р°
  const logoCenter = 150;
  
  // РЎРјРµС‰РµРЅРёСЏ РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅРѕ С†РµРЅС‚СЂР° Р»РѕРіРѕС‚РёРїР°
  const mainEllipseTop = logoCenter - 24; // РІРІРµСЂС… РЅР° 24px
  const sideEllipseTop = logoCenter + 12; // РІРІРµСЂС… РЅР° 12px
  const leftEllipseLeft = (dimensions.width / 2) - 120; // РІР»РµРІРѕ РЅР° 120px
  const rightEllipseLeft = (dimensions.width / 2) + 120; // РІРїСЂР°РІРѕ РЅР° 120px

  // Р—РЅР°С‡РµРЅРёСЏ opacity РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ СЂРµР¶РёРјР°
  const opacities = mode === 'debug' 
    ? { main: 0.28, sides: 0.16, vertical: 0.24 }
    : { main: 0.18, sides: 0.10, vertical: 0.18 };

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 5, // Р’С‹С€Рµ BackgroundFX РЅРѕ РЅРёР¶Рµ РєРѕРЅС‚РµРЅС‚Р°
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
