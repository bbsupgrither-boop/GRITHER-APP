export function BattlesPageMinimal() {
  const handleClick = () => {
    console.log('MINIMAL BUTTON CLICKED!');
    alert('РњРёРЅРёРјР°Р»СЊРЅР°СЏ РєРЅРѕРїРєР° СЂР°Р±РѕС‚Р°РµС‚!');
  };

  return (
    <div style={{ 
      padding: '20px', 
      minHeight: '100vh',
      background: 'white',
      color: 'black',
      position: 'relative',
      zIndex: 1000
    }}>
      <h1>РњРёРЅРёРјР°Р»СЊРЅР°СЏ СЃС‚СЂР°РЅРёС†Р° Р±Р°С‚С‚Р»РѕРІ</h1>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        РўР•РЎРў РљРќРћРџРљРђ 1
      </button>

      <button 
        onClick={() => {
          console.log('INLINE BUTTON CLICKED!');
          alert('РРЅР»Р°Р№РЅ РєРЅРѕРїРєР° СЂР°Р±РѕС‚Р°РµС‚!');
        }}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        РўР•РЎРў РљРќРћРџРљРђ 2 (INLINE)
      </button>

      <div style={{
        padding: '20px',
        border: '2px solid green',
        margin: '20px 0'
      }}>
        <h3>РўРµСЃС‚РѕРІР°СЏ РєР°СЂС‚РѕС‡РєР° "Р±Р°С‚С‚Р»Р°"</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={(e) => {
              console.log('VICTORY BUTTON EVENT:', e);
              console.log('Target:', e.target);
              console.log('Current target:', e.currentTarget);
              alert('РљРЅРѕРїРєР° РїРѕР±РµРґС‹ СЂР°Р±РѕС‚Р°РµС‚!');
            }}
            style={{
              flex: 1,
              padding: '8px 16px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Р’С‹РёРіСЂР°Р»
          </button>
          <button
            onClick={(e) => {
              console.log('CANCEL BUTTON EVENT:', e);
              console.log('Target:', e.target);
              console.log('Current target:', e.currentTarget);
              alert('РљРЅРѕРїРєР° РѕС‚РјРµРЅС‹ СЂР°Р±РѕС‚Р°РµС‚!');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            РћС‚РјРµРЅРёС‚СЊ
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <p>РРЅСЃС‚СЂСѓРєС†РёРё:</p>
        <p>1. РћС‚РєСЂРѕР№С‚Рµ РєРѕРЅСЃРѕР»СЊ Р±СЂР°СѓР·РµСЂР° (F12)</p>
        <p>2. РќР°Р¶РјРёС‚Рµ РЅР° Р»СЋР±СѓСЋ РєРЅРѕРїРєСѓ</p>
        <p>3. РџСЂРѕРІРµСЂСЊС‚Рµ, РїРѕСЏРІР»СЏСЋС‚СЃСЏ Р»Рё Р»РѕРіРё РІ РєРѕРЅСЃРѕР»Рё</p>
        <p>4. РџСЂРѕРІРµСЂСЊС‚Рµ, РїРѕСЏРІР»СЏСЋС‚СЃСЏ Р»Рё alert СѓРІРµРґРѕРјР»РµРЅРёСЏ</p>
      </div>
    </div>
  );
}
