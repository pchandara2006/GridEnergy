/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        graphite: '#151817',
        ink: '#101312',
        panel: '#ffffff',
        parchment: '#f7f5ef',
        mist: '#eef1ed',
        silver: '#dfe3de',
        forest: '#1f6f4a',
        steel: '#3c6f8f',
        moss: '#6d806d',
        amber: '#a96f2d',
        clay: '#b65f50',
        electric: '#3c6f8f',
        cyanline: '#3c6f8f',
        gridgreen: '#1f6f4a',
        warning: '#a96f2d',
        risk: '#b65f50',
      },
      boxShadow: {
        panel: '0 24px 70px rgba(20, 24, 22, 0.08)',
        soft: '0 18px 50px rgba(20, 24, 22, 0.10)',
      },
    },
  },
  plugins: [],
};
