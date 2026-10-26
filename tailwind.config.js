/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        btn: '6px',
        card: '8px',
        panel: '12px',
      },
      colors: {
        canvas: '#0A0A0A',
        surface: {
          dark: '#171717',
          elevated: '#1F1F1F',
        },
        border: {
          subtle: '#2E2E2E',
          strong: '#404040',
        },
        content: {
          primary: '#F5F5F5',
          secondary: '#A3A3A3',
          tertiary: '#737373',
        },
        base: {
          bg: '#0A0A0A',
          surface: '#171717',
          elevated: '#1F1F1F',
          subtle: '#141414',
          muted: '#262626',
        },
        accent: {
          DEFAULT: '#EA580C',
          hover: '#C2410C',
          subtle: '#2D1B0E',
          border: 'rgba(234, 88, 12, 0.3)',
          foreground: '#FFFFFF',
        },
        danger: {
          DEFAULT: '#EF4444',
          subtle: '#2A1212',
          border: '#7F1D1D',
          text: '#FCA5A5',
        },
        success: {
          DEFAULT: '#22C55E',
          subtle: '#122117',
          border: '#14532D',
          text: '#86EFAC',
        },
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.3)',
        elevated: '0 4px 12px rgba(0, 0, 0, 0.35)',
        floating: '0 8px 24px rgba(0, 0, 0, 0.45)',
        modal: '0 24px 48px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        fast: '140ms',
        normal: '200ms',
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite linear',
        'fade-up': 'fadeUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'dash-flow': 'dashFlow 1.2s linear infinite',
        'slide-up': 'slideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dashFlow: {
          to: { strokeDashoffset: '-20' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
