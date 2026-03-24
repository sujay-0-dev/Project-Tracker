/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0c0d13',
        surface: {
          DEFAULT: '#0c0d13',
          card:    '#12141f',
          raised:  '#181b2a',
          hover:   '#1e2133',
          border:  '#252840',
          muted:   '#2e3357',
        },
        accent: {
          DEFAULT: '#6366f1',
          light:   '#818cf8',
          dark:    '#4338ca',
        },
        text: {
          primary:   '#dde1f0',
          secondary: '#8b90a8',
          muted:     '#4e5478',
          accent:    '#818cf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card':   '0 1px 4px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,40,64,0.9)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.3)',
        'tab':    '0 2px 10px rgba(99,102,241,0.45)',
      },
      animation: {
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
      },
    },
  },
  plugins: [],
}
