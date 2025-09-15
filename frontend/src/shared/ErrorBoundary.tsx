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
          <p>РЎС‚СЂР°РЅРёС†Р° РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРЅР°. РћР±РЅРѕРІРё СЌРєСЂР°РЅ РёР»Рё РІРµСЂРЅРёСЃСЊ РЅР° Р”РѕРј.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
