/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', 'Consolas', 'monospace'],
      },
      colors: {
        linear: {
          bg: '#08090A',
          surface: '#0F1011',
          surface2: '#141516',
          line: '#23252A',
          border: '#383B3F',
          text: '#F7F8F8',
          muted: '#8A8F98',
          subtle: '#62666D',
          accent: '#5E6AD2',
          accentHover: '#828FFF',
          cta: '#E5E5E6',
        },
      },
      boxShadow: {
        hairline: 'rgba(0, 0, 0, 0.4) 0px 1px 0px 0px',
        primary:
          'rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px',
      },
    },
  },
  plugins: [],
};
