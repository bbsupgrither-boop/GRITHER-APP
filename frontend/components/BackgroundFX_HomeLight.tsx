п»їinterface BackgroundFX_HomeLightProps {
  mode?: 'subtle' | 'debug';
}

export function BackgroundFX_HomeLight({ mode = 'subtle' }: BackgroundFX_HomeLightProps) {
  // Р В Р ВµР В¶Р С‘Р С debug Р Т‘Р В»РЎРЏ Р С—РЎР‚Р С•Р Р†Р ВµРЎР‚Р С”Р С‘ РЎРЊРЎвЂћРЎвЂћР ВµР С”РЎвЂљР С•Р Р† - Р В±Р С•Р В»Р ВµР Вµ Р Р†РЎвЂ№РЎРѓР С•Р С”Р В°РЎРЏ Р Р†Р С‘Р Т‘Р С‘Р СР С•РЎРѓРЎвЂљРЎРЉ
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
      {/* BaseBG - Р вЂР В°Р В·Р С•Р Р†РЎвЂ№Р в„– РЎвЂћР С•Р Р… */}
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

      {/* Spotlight - Р В Р В°Р Т‘Р С‘Р В°Р В»РЎРЉР Р…РЎвЂ№Р в„– Р С–РЎР‚Р В°Р Т‘Р С‘Р ВµР Р…РЎвЂљ Р С—Р С•Р Т‘ Р В»Р С•Р С–Р С•РЎвЂљР С‘Р С—Р С•Р С */}
      <div
        style={{
          position: 'absolute',
          top: '80px', // Р СџР С•Р В·Р С‘РЎвЂ Р С‘РЎРЏ Р С—Р С•Р Т‘ Р В»Р С•Р С–Р С•РЎвЂљР С‘Р С—Р С•Р С
          left: '50%',
          transform: 'translateX(-50%)',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%)',
          opacity: spotlightOpacity,
          zIndex: 2
        }}
      />

      {/* Vignette - Р вЂ™Р С‘Р Р…РЎРЉР ВµРЎвЂљР С”Р В° Р С—Р С• Р С”РЎР‚Р В°РЎРЏР С */}
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
