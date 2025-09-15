import React from 'react';

interface BackgroundFXProps {
  theme: 'light' | 'dark';
  isHomePage?: boolean;
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({ theme, isHomePage = false }) => {
  if (isHomePage && theme === 'light') {
    // РљСЂР°СЃРёРІС‹Р№ РіСЂР°РґРёРµРЅС‚РЅС‹Р№ С„РѕРЅ РґР»СЏ РіР»Р°РІРЅРѕР№ СЃС‚СЂР°РЅРёС†С‹ СЃ СЌС„С„РµРєС‚РѕРј РЅРµР±Р°
    return (
      <div className="fixed inset-0 background-fx">
        {/* РћСЃРЅРѕРІРЅРѕР№ РіСЂР°РґРёРµРЅС‚РЅС‹Р№ СЃР»РѕР№ */}
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
        
        {/* Р”РµРєРѕСЂР°С‚РёРІРЅС‹Р№ СЃРёРЅРёР№ СЌС„С„РµРєС‚ РЅРµР±Р° */}
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
        
        {/* Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Р№ СЃР»РѕР№ РґР»СЏ РіР»СѓР±РёРЅС‹ */}
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
    // РўРµРјРЅР°СЏ С‚РµРјР° РґР»СЏ РіР»Р°РІРЅРѕР№ СЃС‚СЂР°РЅРёС†С‹
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

  // РћР±С‹С‡РЅС‹Рµ СЃС‚СЂР°РЅРёС†С‹
  if (theme === 'light') {
    return (
      <div className="fixed inset-0 background-fx">
        {/* РћСЃРЅРѕРІРЅРѕР№ С„РѕРЅ */}
        <div 
          className="absolute inset-0"
          style={{
            background: '#F8FAFC',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        
        {/* Р”РµРєРѕСЂР°С‚РёРІРЅС‹Р№ СЃРёРЅРёР№ СЌС„С„РµРєС‚ РЅРµР±Р° */}
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

  // РўРµРјРЅР°СЏ С‚РµРјР° РґР»СЏ РѕР±С‹С‡РЅС‹С… СЃС‚СЂР°РЅРёС†
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