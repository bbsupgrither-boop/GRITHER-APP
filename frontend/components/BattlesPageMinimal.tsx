п»їexport function BattlesPageMinimal() {
  const handleClick = () => {
    console.log('MINIMAL BUTTON CLICKED!');
    alert('Р СљР С‘Р Р…Р С‘Р СР В°Р В»РЎРЉР Р…Р В°РЎРЏ Р С”Р Р…Р С•Р С—Р С”Р В° РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
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
      <h1>Р СљР С‘Р Р…Р С‘Р СР В°Р В»РЎРЉР Р…Р В°РЎРЏ РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ Р В° Р В±Р В°РЎвЂљРЎвЂљР В»Р С•Р Р†</h1>
      
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
        Р СћР вЂўР РЋР Сћ Р С™Р СњР С›Р СџР С™Р С’ 1
      </button>

      <button 
        onClick={() => {
          console.log('INLINE BUTTON CLICKED!');
          alert('Р ВР Р…Р В»Р В°Р в„–Р Р… Р С”Р Р…Р С•Р С—Р С”Р В° РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
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
        Р СћР вЂўР РЋР Сћ Р С™Р СњР С›Р СџР С™Р С’ 2 (INLINE)
      </button>

      <div style={{
        padding: '20px',
        border: '2px solid green',
        margin: '20px 0'
      }}>
        <h3>Р СћР ВµРЎРѓРЎвЂљР С•Р Р†Р В°РЎРЏ Р С”Р В°РЎР‚РЎвЂљР С•РЎвЂЎР С”Р В° "Р В±Р В°РЎвЂљРЎвЂљР В»Р В°"</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={(e) => {
              console.log('VICTORY BUTTON EVENT:', e);
              console.log('Target:', e.target);
              console.log('Current target:', e.currentTarget);
              alert('Р С™Р Р…Р С•Р С—Р С”Р В° Р С—Р С•Р В±Р ВµР Т‘РЎвЂ№ РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
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
            Р вЂ™РЎвЂ№Р С‘Р С–РЎР‚Р В°Р В»
          </button>
          <button
            onClick={(e) => {
              console.log('CANCEL BUTTON EVENT:', e);
              console.log('Target:', e.target);
              console.log('Current target:', e.currentTarget);
              alert('Р С™Р Р…Р С•Р С—Р С”Р В° Р С•РЎвЂљР СР ВµР Р…РЎвЂ№ РЎР‚Р В°Р В±Р С•РЎвЂљР В°Р ВµРЎвЂљ!');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Р С›РЎвЂљР СР ВµР Р…Р С‘РЎвЂљРЎРЉ
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px' }}>
        <p>Р ВР Р…РЎРѓРЎвЂљРЎР‚РЎС“Р С”РЎвЂ Р С‘Р С‘:</p>
        <p>1. Р С›РЎвЂљР С”РЎР‚Р С•Р в„–РЎвЂљР Вµ Р С”Р С•Р Р…РЎРѓР С•Р В»РЎРЉ Р В±РЎР‚Р В°РЎС“Р В·Р ВµРЎР‚Р В° (F12)</p>
        <p>2. Р СњР В°Р В¶Р СР С‘РЎвЂљР Вµ Р Р…Р В° Р В»РЎР‹Р В±РЎС“РЎР‹ Р С”Р Р…Р С•Р С—Р С”РЎС“</p>
        <p>3. Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЉРЎвЂљР Вµ, Р С—Р С•РЎРЏР Р†Р В»РЎРЏРЎР‹РЎвЂљРЎРѓРЎРЏ Р В»Р С‘ Р В»Р С•Р С–Р С‘ Р Р† Р С”Р С•Р Р…РЎРѓР С•Р В»Р С‘</p>
        <p>4. Р СџРЎР‚Р С•Р Р†Р ВµРЎР‚РЎРЉРЎвЂљР Вµ, Р С—Р С•РЎРЏР Р†Р В»РЎРЏРЎР‹РЎвЂљРЎРѓРЎРЏ Р В»Р С‘ alert РЎС“Р Р†Р ВµР Т‘Р С•Р СР В»Р ВµР Р…Р С‘РЎРЏ</p>
      </div>
    </div>
  );
}
