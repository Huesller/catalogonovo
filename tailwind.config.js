/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        base: {
          0: '#030303',
          50: '#0a0a0a',
          100: '#121212',
          200: '#1a1a1a',
          300: '#252525',
          400: '#3a3a3a',
          500: '#555555',
          600: '#a1a1aa',
          700: '#c5c5cb',
          800: '#e8e8ec',
          900: '#f5f7fa',
          950: '#ffffff',
        },
        accent: {
          DEFAULT: '#0047FF',
          light: '#005EFF',
          dark: '#0033CC',
        },
        surface: {
          DEFAULT: '#141416',
          raised: '#1a1a1d',
          overlay: '#202024',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.1em' }],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0,0,0,0.5)',
        elevated: '0 4px 12px -2px rgba(0,0,0,0.5), 0 2px 4px -2px rgba(0,0,0,0.3)',
        card: '0 0 0 1px rgba(255,255,255,0.03), 0 4px 16px -4px rgba(0,0,0,0.5)',
        glow: '0 0 20px -5px rgba(212,168,85,0.15)',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0,0,0,0.5)',
        elevated: '0 4px 12px -2px rgba(0,0,0,0.5), 0 2px 4px -2px rgba(0,0,0,0.3)',
        card: '0 0 0 1px rgba(255,255,255,0.03), 0 4px 16px -4px rgba(0,0,0,0.5)',
        glow: '0 0 20px -5px rgba(212,168,85,0.15)',
        'glow-strong': '0 0 30px rgba(212,168,83,0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(212, 168, 83, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(212, 168, 83, 0.06) 0px, transparent 50%)',
        'shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
