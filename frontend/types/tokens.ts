// Design tokens extracted from Figma and existing styles
export const designTokens = {
  colors: {
    // Light theme
    light: {
      background: '#F5F7FA',
      surface: '#FFFFFF',
      surfaceSecondary: '#F3F5F8',
      surfaceTertiary: '#ECEFF3',
      text: '#0F172A',
      textMuted: '#6B7280',
      textSecondary: '#A7B0BD',
      primary: '#2B82FF',
      primaryPressed: '#2066C8',
      primaryMuted: 'rgba(43, 130, 255, 0.10)',
      border: '#E6E9EF',
      borderSecondary: 'rgba(255, 255, 255, 0.06)',
      success: '#22C55E',
      warning: '#FF9F0A',
      error: '#EF4444',
      // Achievement rarity colors
      rarity: {
        common: '#6B7280',
        rare: '#3B82F6',
        epic: '#8B5CF6',
        legendary: '#F59E0B',
        mythic: '#EF4444'
      }
    },
    // Dark theme
    dark: {
      background: '#0B0D10',
      surface: '#161A22',
      surfaceSecondary: '#1C2029',
      surfaceTertiary: '#202734',
      text: '#E8ECF2',
      textMuted: '#A7B0BD',
      textSecondary: '#6B7280',
      primary: '#2B82FF',
      primaryPressed: '#1E62C2',
      primaryMuted: 'rgba(43, 130, 255, 0.12)',
      border: 'rgba(255, 255, 255, 0.06)',
      borderSecondary: '#2A3340',
      success: '#30D158',
      warning: '#FF9F0A',
      error: '#FF453A',
      // Achievement rarity colors
      rarity: {
        common: '#A7B0BD',
        rare: '#3B82F6',
        epic: '#8B5CF6',
        legendary: '#F59E0B',
        mythic: '#EF4444'
      }
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px'
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%'
  },
  
  shadows: {
    card: '0 8px 24px rgba(0, 0, 0, 0.10)',
    cardDark: '0 8px 24px rgba(0, 0, 0, 0.6)',
    button: '0 2px 8px rgba(0, 0, 0, 0.08)',
    buttonDark: '0 4px 15px rgba(0, 0, 0, 0.4)',
    modal: '0 16px 48px rgba(0, 0, 0, 0.25)',
    modalDark: '0 16px 48px rgba(0, 0, 0, 0.6)'
  },
  
  typography: {
    heading: {
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '1.4'
    },
    body: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '1.4'
    },
    button: {
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '1.4'
    },
    caption: {
      fontSize: '10px',
      fontWeight: '400',
      lineHeight: '1.4'
    }
  },
  
  layout: {
    containerMaxWidth: '448px',
    sidePadding: '16px',
    safeAreaBottom: 'calc(96px + env(safe-area-inset-bottom))'
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease'
  }
} as const;

export type Theme = 'light' | 'dark';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
