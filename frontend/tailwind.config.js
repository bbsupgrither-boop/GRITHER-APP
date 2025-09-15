export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./frontend/**/*.{ts,tsx,js,jsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#F2F8FF",
          100: "#E6F0FF",
          200: "#CFE2FF",
          300: "#A7C8FF",
          400: "#76A6FF",
          500: "#4A84FF",
          600: "#2E64E6",
          700: "#254FC0",
          800: "#1E4099",
          900: "#162D6B"
        },
        primary: '#2B82FF',
        'primary-pressed': '#2066C8',
        'primary-muted': 'rgba(43, 130, 255, 0.10)',
        background: '#FFFFFF',
        'background-dark': '#0B0D10',
        surface: '#FFFFFF',
        'surface-dark': '#161A22',
        'surface-2': '#F3F5F8',
        'surface-2-dark': '#1C2029',
        'surface-3': '#ECEFF3',
        'surface-3-dark': '#202734',
        text: '#0F172A',
        'text-dark': '#E8ECF2',
        'text-muted': '#6B7280',
        'text-muted-dark': '#A7B0BD',
        border: '#E6E9EF',
        'border-dark': 'rgba(255, 255, 255, 0.06)',
        success: '#22C55E',
        warning: '#FF9F0A',
        error: '#EF4444',
        info: '#2B82FF',
      },
      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'base': '14px',
        'lg': '16px',
        'xl': '18px',
        '2xl': '20px',
        '3xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'xl2': '1.25rem',
        'pill': '9999px'
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.10)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.10)',
        'xl': '0 12px 32px rgba(0, 0, 0, 0.15)',
        'dark': '0 8px 24px rgba(0, 0, 0, 0.6)',
        'dark-lg': '0 12px 32px rgba(0, 0, 0, 0.8)',
      },
      maxWidth: {
        'container': '448px',
      },
    }
  },
  safelist: [
    { pattern: /(bg|text|border)-(slate|gray|zinc|neutral|stone|blue|green|red|yellow|purple)-(100|200|300|400|500|600|700)/ }
  ],
  plugins: []
}
