import React from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { err?: Error }
> {
  state = { err: undefined as Error | undefined };
  
  static getDerivedStateFromError(err: Error) { 
    return { err }; 
  }
  
  componentDidCatch(err: Error, info: any) { 
    console.error('ErrorBoundary caught error:', err, info); 
  }
  
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 16 }}>
          <h3>Р§С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє</h3>
          <p>РџСЂРѕРёР·РѕС€Р»Р° РЅРµРїСЂРµРґРІРёРґРµРЅРЅР°СЏ РѕС€РёР±РєР°. РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРµСЂРµР·Р°РіСЂСѓР·РёС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
