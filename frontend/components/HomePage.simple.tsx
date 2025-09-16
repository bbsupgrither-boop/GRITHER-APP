import React from 'react';

export function HomePageSimple() {
  return (
    <div className="app" style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2B82FF, #5AA7FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(43, 130, 255, 0.3)'
          }}>
            Р вЂ™
          </div>
          <div>
            <div style={{ fontWeight: '500', fontSize: '16px', color: '#0F172A' }}>
              Р вЂ™РЎвЂ№ GRITHER
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>
              Р Р€РЎР‚Р С•Р Р†Р ВµР Р…РЎРЉ 1
            </div>
          </div>
        </div>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#F3F5F8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          РІС™в„ўРїС‘РЏ
        </div>
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#0F172A',
          margin: 0,
          letterSpacing: '-0.02em'
        }}>
          GRITHER
        </h1>
      </div>

      {/* Achievements Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '500', 
            color: '#0F172A',
            margin: 0
          }}>
            Р вЂ™Р В°РЎв‚¬Р С‘ Р Т‘Р С•РЎРѓРЎвЂљР С‘Р В¶Р ВµР Р…Р С‘РЎРЏ
          </h2>
          <div style={{ cursor: 'pointer' }}>СЂСџвЂРѓРїС‘РЏ</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Achievement 1 */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E6E9EF',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                СЂСџРЏвЂ 
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                  Р СњР С•Р Р†Р С‘РЎвЂЎР С•Р С”
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                  Р вЂќР С•РЎРѓРЎвЂљР С‘Р С–Р Р…Р С‘РЎвЂљР Вµ 2 РЎС“РЎР‚Р С•Р Р†Р Р…РЎРЏ
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#F3F5F8',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '50%',
                    height: '100%',
                    background: '#2B82FF',
                    borderRadius: '9999px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement 2 */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E6E9EF',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                СЂСџРЏвЂ 
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                  Р СћРЎР‚РЎС“Р Т‘Р С•Р В»РЎР‹Р В±Р С‘Р Р†РЎвЂ№Р в„–
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                  Р вЂ™РЎвЂ№Р С—Р С•Р В»Р Р…Р С‘РЎвЂљР Вµ 10 Р В·Р В°Р Т‘Р В°РЎвЂЎ
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#F3F5F8',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '30%',
                    height: '100%',
                    background: '#2B82FF',
                    borderRadius: '9999px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement 3 */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E6E9EF',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                СЂСџРЏвЂ 
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                  Р С™Р С•Р В»Р В»Р ВµР С”РЎвЂ Р С‘Р С•Р Р…Р ВµРЎР‚
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                  Р С›РЎвЂљР С”РЎР‚Р С•Р в„–РЎвЂљР Вµ 5 Р С”Р ВµР в„–РЎРѓР С•Р Р†
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#F3F5F8',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '20%',
                    height: '100%',
                    background: '#2B82FF',
                    borderRadius: '9999px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid #E6E9EF',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', color: '#6B7280' }}>Р РЋРЎвЂљР В°РЎвЂљРЎС“РЎРѓ: Р СњР С•Р Р†Р С‘РЎвЂЎР С•Р С”</div>
          <div style={{ fontSize: '14px', color: '#6B7280' }}>XP: 0</div>
          <div style={{ fontSize: '14px', color: '#6B7280' }}>lvl 1</div>
        </div>
        <div style={{
          width: '100%',
          height: '4px',
          background: '#F3F5F8',
          borderRadius: '9999px',
          marginTop: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '0%',
            height: '100%',
            background: '#2B82FF',
            borderRadius: '9999px'
          }}></div>
        </div>
      </div>

      {/* Cards Row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '80px' }}>
        {/* Battles Card */}
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #E6E9EF',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A', margin: 0 }}>Р вЂР В°РЎвЂљРЎвЂљР В»РЎвЂ№</h3>
            <div style={{ cursor: 'pointer' }}>+</div>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Р С’Р С”РЎвЂљР С‘Р Р†Р Р…РЎвЂ№Р Вµ Р В±Р В°РЎвЂљРЎвЂљР В»РЎвЂ№</div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Р СџРЎР‚Р С‘Р С–Р В»Р В°РЎв‚¬Р ВµР Р…Р С‘РЎРЏ</div>
        </div>

        {/* Ranking Card */}
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #E6E9EF',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#0F172A', margin: 0 }}>Р В Р ВµР в„–РЎвЂљР С‘Р Р…Р С–</h3>
            <div style={{ cursor: 'pointer' }}>РІвЂ№В®</div>
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Р СџР С• РЎС“РЎР‚Р С•Р Р†Р Р…РЎР‹</div>
          <div style={{ fontSize: '12px', color: '#0F172A' }}>Р РЋР ВµРЎР‚Р С–Р ВµР в„– Р вЂ™Р С•Р В»Р С”Р С•Р Р† Р Р€РЎР‚.22</div>
          <div style={{ fontSize: '12px', color: '#0F172A' }}>Р вЂќР СР С‘РЎвЂљРЎР‚Р С‘Р в„– Р С™ Vn.19</div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#FFFFFF',
        borderTop: '1px solid #E6E9EF',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#2B82FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          СЂСџРЏВ 
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          СЂСџРЏвЂ 
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          РІСљвЂ¦
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          СЂСџвЂєвЂ™
        </div>
      </div>
    </div>
  );
}
