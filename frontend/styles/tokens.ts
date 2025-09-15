// Design tokens extracted from Figma and local resources
export const tokens = {
  // Colors from Figma
  colors: {
    // Primary brand colors
    primary: '#2B82FF',
    primaryPressed: '#2066C8',
    primaryMuted: 'rgba(43, 130, 255, 0.10)',
    
    // Background
    background: '#FFFFFF',
    backgroundDark: '#0B0D10',
    
    // Surface
    surface: '#FFFFFF',
    surfaceDark: '#161A22',
    surface2: '#F3F5F8',
    surface2Dark: '#1C2029',
    surface3: '#ECEFF3',
    surface3Dark: '#202734',
    
    // Text
    text: '#0F172A',
    textDark: '#E8ECF2',
    textMuted: '#6B7280',
    textMutedDark: '#A7B0BD',
    
    // Border
    border: '#E6E9EF',
    borderDark: 'rgba(255, 255, 255, 0.06)',
    
    // Status colors
    success: '#22C55E',
    warning: '#FF9F0A',
    error: '#EF4444',
    info: '#2B82FF',
    
    // Chart colors
    chart1: '#2B82FF',
    chart2: '#34c759',
    chart3: '#ff9500',
    chart4: '#ff3b30',
    chart5: '#af52de',
  },
  
  // Typography from Figma
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '24px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.4',
      relaxed: '1.6',
    },
  },
  
  // Spacing from Figma
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
  },
  
  // Border radius from Figma
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    xl2: '1.25rem',
    pill: '9999px',
    full: '50%',
  },
  
  // Shadows from Figma
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.10)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.10)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.15)',
    dark: '0 8px 24px rgba(0, 0, 0, 0.6)',
    darkLg: '0 12px 32px rgba(0, 0, 0, 0.8)',
  },
  
  // Layout constraints from Figma
  layout: {
    maxWidth: '448px',
    sidePadding: '16px',
    safeAreaBottom: 'env(safe-area-inset-bottom)',
  },
  
  // Animation from Figma
  animation: {
    duration: '200ms',
    easing: 'ease',
  },
  
  // Z-index
  zIndex: {
    modal: 1000,
    dropdown: 100,
    header: 10,
    base: 1,
  },
} as const;

export type Theme = 'light' | 'dark';

export const getThemeColors = (theme: Theme) => ({
  background: theme === 'dark' ? tokens.colors.backgroundDark : tokens.colors.background,
  surface: theme === 'dark' ? tokens.colors.surfaceDark : tokens.colors.surface,
  surface2: theme === 'dark' ? tokens.colors.surface2Dark : tokens.colors.surface2,
  surface3: theme === 'dark' ? tokens.colors.surface3Dark : tokens.colors.surface3,
  text: theme === 'dark' ? tokens.colors.textDark : tokens.colors.text,
  textMuted: theme === 'dark' ? tokens.colors.textMutedDark : tokens.colors.textMuted,
  border: theme === 'dark' ? tokens.colors.borderDark : tokens.colors.border,
});
