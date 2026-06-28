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
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          surface2: 'rgb(var(--color-surface-2) / <alpha-value>)',
          line: 'rgb(var(--color-line) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          text: 'rgb(var(--color-text) / <alpha-value>)',
          strong: 'rgb(var(--color-strong) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          accentHover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          onAccent: 'rgb(var(--color-on-accent) / <alpha-value>)',
          cta: 'rgb(var(--color-cta) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
          successText: 'rgb(var(--color-success-text) / <alpha-value>)',
          successSurface: 'rgb(var(--color-success-surface) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          warningText: 'rgb(var(--color-warning-text) / <alpha-value>)',
          warningSurface: 'rgb(var(--color-warning-surface) / <alpha-value>)',
          danger: 'rgb(var(--color-danger) / <alpha-value>)',
          dangerText: 'rgb(var(--color-danger-text) / <alpha-value>)',
          dangerSurface: 'rgb(var(--color-danger-surface) / <alpha-value>)',
        },
      },
      boxShadow: {
        hairline: 'rgb(var(--color-shadow) / 0.18) 0px 1px 0px 0px',
        primary:
          'rgb(var(--color-shadow) / 0) 0px 8px 2px 0px, rgb(var(--color-shadow) / 0.01) 0px 5px 2px 0px, rgb(var(--color-shadow) / 0.04) 0px 3px 2px 0px, rgb(var(--color-shadow) / 0.07) 0px 1px 1px 0px, rgb(var(--color-shadow) / 0.08) 0px 0px 1px 0px',
      },
    },
  },
  plugins: [],
};
