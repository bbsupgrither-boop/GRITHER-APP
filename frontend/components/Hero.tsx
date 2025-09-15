import React from 'react';
import { Logo } from './Logo';

interface HeroProps {
  theme: 'light' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  return (
    <div 
      className="relative w-full"
      style={{
        height: 'clamp(136px, 150px, 168px)',
        zIndex: 15
      }}
    >
      <Logo theme={theme} />
    </div>
  );
};