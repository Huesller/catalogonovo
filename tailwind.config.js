/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      colors: {
        base: {
          0: '#0a0a0b',
          50: '#111113',
          100: '#18181b',
          200: '#1f1f23',
          300: '#27272a',
          400: '#3f3f46',
          500: '#52525b',
          600: '#71717a',
          700: '#a1a1aa',
          800: '#d4d4d8',
          900: '#e4e4e7',
          950: '#fafafa',
        },
        accent: {
          DEFAULT: '#d4a855',
          light: '#e8c17a',
          dark: '#b08d3d',
          muted: '#8b7333',
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
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        shimmer: 'shimmer 2s linear infinite',
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
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
