import React from 'react';

interface CoinIconProps {
  size?: number;
  className?: string;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ size = 16, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <radialGradient id="coinGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </radialGradient>
        <filter id="coinShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      
      {/* Р В РІР‚в„ўР В Р вЂ¦Р В Р’ВµР РЋРІвЂљВ¬Р В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂўР В Р’В±Р В РЎвЂўР В РўвЂР В РЎвЂўР В РЎвЂќ */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="url(#coinGradient)"
        filter="url(#coinShadow)"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
      
      {/* Р В РІР‚в„ўР В Р вЂ¦Р РЋРЎвЂњР РЋРІР‚С™Р РЋР вЂљР В Р’ВµР В Р вЂ¦Р В Р вЂ¦Р В РЎвЂР В РІвЂћвЂ“ Р В РЎвЂќР РЋР вЂљР РЋРЎвЂњР В РЎвЂ“ */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="url(#coinGradient)"
        stroke="#DAA520"
        strokeWidth="0.3"
      />
      
      {/* Р В РІР‚ВР РЋРЎвЂњР В РЎвЂќР В Р вЂ Р В Р’В° G */}
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#8B4513"
        fontFamily="Arial, sans-serif"
      >
        G
      </text>
    </svg>
  );
};
