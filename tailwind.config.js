/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        cpu: {
          bg: '#050816',
          panel: '#0b1024',
          card: 'rgba(14, 22, 45, 0.72)',
          line: 'rgba(103, 232, 249, 0.22)',
          cyan: '#22d3ee',
          green: '#34d399',
          pink: '#f472b6',
        },
      },
      boxShadow: {
        neon: '0 0 28px rgba(34, 211, 238, 0.20)',
        innerline: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};
