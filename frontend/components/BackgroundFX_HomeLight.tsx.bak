interface BackgroundFX_HomeLightProps {
  mode?: 'subtle' | 'debug';
}

export function BackgroundFX_HomeLight({ mode = 'subtle' }: BackgroundFX_HomeLightProps) {
  // Р РµР¶РёРј debug РґР»СЏ РїСЂРѕРІРµСЂРєРё СЌС„С„РµРєС‚РѕРІ - Р±РѕР»РµРµ РІС‹СЃРѕРєР°СЏ РІРёРґРёРјРѕСЃС‚СЊ
  const spotlightOpacity = mode === 'debug' ? 0.55 : 0.20;
  const vignetteOpacity = mode === 'debug' ? 0.18 : 0.05;

  return (
    <div
      className="background-fx"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    >
      {/* BaseBG - Р‘Р°Р·РѕРІС‹Р№ С„РѕРЅ */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#F7F9FC',
          zIndex: 1
        }}
      />

      {/* Spotlight - Р Р°РґРёР°Р»СЊРЅС‹Р№ РіСЂР°РґРёРµРЅС‚ РїРѕРґ Р»РѕРіРѕС‚РёРїРѕРј */}
      <div
        style={{
          position: 'absolute',
          top: '80px', // РџРѕР·РёС†РёСЏ РїРѕРґ Р»РѕРіРѕС‚РёРїРѕРј
          left: '50%',
          transform: 'translateX(-50%)',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%)',
          opacity: spotlightOpacity,
          zIndex: 2
        }}
      />

      {/* Vignette - Р’РёРЅСЊРµС‚РєР° РїРѕ РєСЂР°СЏРј */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.06) 100%)',
          opacity: vignetteOpacity,
          mixBlendMode: 'multiply',
          zIndex: 3
        }}
      />
    </div>
  );
}
