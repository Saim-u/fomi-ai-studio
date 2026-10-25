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
        base: {
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          elevated: '#FFFFFF',
          subtle: '#F4F4F5',
          muted: '#E4E4E7',
        },
        border: {
          subtle: '#E5E5E5',
          strong: '#D4D4D8',
        },
        content: {
          primary: '#1A1A1A',
          secondary: '#71717A',
          tertiary: '#A1A1AA',
        },
        accent: {
          DEFAULT: '#5E6AD2',
          hover: '#4F59BD',
          subtle: '#EEF0FB',
          border: 'rgba(94, 106, 210, 0.25)',
          foreground: '#FFFFFF',
        },
        danger: {
          DEFAULT: '#DC2626',
          subtle: '#FEF2F2',
          border: '#FECACA',
          text: '#B91C1C',
        },
        success: {
          DEFAULT: '#16A34A',
          subtle: '#F0FDF4',
          border: '#BBF7D0',
          text: '#15803D',
        },
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.05)',
        elevated: '0 4px 12px rgba(0, 0, 0, 0.04)',
        floating: '0 8px 24px rgba(0, 0, 0, 0.08)',
        modal: '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
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
      },
    },
  },
  plugins: [],
};
