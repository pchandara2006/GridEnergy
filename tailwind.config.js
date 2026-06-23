/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        graphite: '#05070b',
        ink: '#090d14',
        panel: '#0d1320',
        electric: '#35a7ff',
        cyanline: '#4de7ff',
        gridgreen: '#8ee6b5',
        warning: '#f6c66f',
        risk: '#ff7f7f',
      },
      boxShadow: {
        glow: '0 0 45px rgba(77, 231, 255, 0.18)',
        panel: '0 24px 90px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
