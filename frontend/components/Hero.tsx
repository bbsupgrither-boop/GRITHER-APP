import { Logo } from './Logo';

interface HeroProps {
  theme?: 'light' | 'dark';
}

export function Hero({ theme = 'light' }: HeroProps) {
  return (
    <div 
      className="hero-zone relative w-full"
      style={{ 
        height: 'clamp(136px, 150px, 168px)',
        marginTop: '16px',
        marginBottom: '8px',
        overflow: 'visible',
        background: 'transparent', // РџРѕР»РЅРѕСЃС‚СЊСЋ РїСЂРѕР·СЂР°С‡РЅС‹Р№ С„РѕРЅ
        zIndex: 15
      }}
    >
      <Logo theme={theme} />
    </div>
  );
}
