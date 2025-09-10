import { useState, useEffect } from 'react';

interface BackgroundFXProps {
  variant?: 'clean' | 'spotlight' | 'spotlight+grain' | 'spotlight+grain+vignette';
  theme?: 'light' | 'dark';
}

export function BackgroundFX({ variant = 'spotlight+grain+vignette', theme = 'light' }: BackgroundFXProps) {
  const [noisePattern, setNoisePattern] = useState<string>('');

  // Р“РµРЅРµСЂРёСЂСѓРµРј noise pattern РґР»СЏ Р·РµСЂРЅРёСЃС‚РѕСЃС‚Рё С‚РѕР»СЊРєРѕ РѕРґРёРЅ СЂР°Р·
  useEffect(() => {
    // РќРµ РіРµРЅРµСЂРёСЂСѓРµРј РїР°С‚С‚РµСЂРЅ РґР»СЏ С‚РµРјРЅРѕР№ С‚РµРјС‹ РёР»Рё РµСЃР»Рё grain РЅРµ РЅСѓР¶РµРЅ
    if (theme === 'dark' || !variant.includes('grain')) {
      setNoisePattern('');
      return;
    }

    const generateNoisePattern = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return '';
      
      const imageData = ctx.createImageData(512, 512);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 255;   // A
      }
      
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    };

    setNoisePattern(generateNoisePattern());
  }, [variant, theme]);

  // РќРµ СЂРµРЅРґРµСЂРёРј РІ С‚РµРјРЅРѕР№ С‚РµРјРµ
  if (theme === 'dark') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* BaseBG Layer - РїРµСЂРІС‹Р№ СЃРЅРёР·Сѓ */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#F7F9FC'
        }}
      />

      {/* Spotlight Layer - С†РµРЅС‚СЂ РїРѕРґ Р»РѕРіРѕС‚РёРїРѕРј, СЂР°Р·РјРµСЂ 520px, opacity 20% */}
      {(variant === 'spotlight' || variant.includes('spotlight')) && (
        <div
          style={{
            position: 'absolute',
            top: '60px', // РџРѕР·РёС†РёСЏ РїРѕРґ Р»РѕРіРѕС‚РёРїРѕРј
            left: '50%',
            transform: 'translateX(-50%)',
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 100%)',
            opacity: 0.2, // РўРѕС‡РЅРѕ 20%
            borderRadius: '50%'
          }}
        />
      )}

      {/* Grain Layer - Image noise 512x512, Tile, blend Overlay, opacity 3% */}
      {variant.includes('grain') && noisePattern && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${noisePattern})`,
            backgroundSize: '512px 512px',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
            opacity: 0.03 // РўРѕС‡РЅРѕ 3%
          }}
        />
      )}

      {/* Vignette Layer - radial РїРѕ РєСЂР°СЏРј rgba(0,0,0,0.06) Рє РїСЂРѕР·СЂР°С‡РЅРѕРјСѓ, blend Multiply, opacity 5% */}
      {variant.includes('vignette') && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.06) 100%)',
            mixBlendMode: 'multiply',
            opacity: 0.05 // РўРѕС‡РЅРѕ 5%
          }}
        />
      )}
    </div>
  );
}
