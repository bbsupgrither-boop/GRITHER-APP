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
          <h3>Р В§РЎвЂљР С•-РЎвЂљР С• Р С—Р С•РЎв‚¬Р В»Р С• Р Р…Р Вµ РЎвЂљР В°Р С”</h3>
          <p>Р РЋРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ Р В° Р Р†РЎР‚Р ВµР СР ВµР Р…Р Р…Р С• Р Р…Р ВµР Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—Р Р…Р В°. Р С›Р В±Р Р…Р С•Р Р†Р С‘ РЎРЊР С”РЎР‚Р В°Р Р… Р С‘Р В»Р С‘ Р Р†Р ВµРЎР‚Р Р…Р С‘РЎРѓРЎРЉ Р Р…Р В° Р вЂќР С•Р С.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
