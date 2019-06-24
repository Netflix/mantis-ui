const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        'fade-out': {
          from: {
            opacity: '1',
          },
          to: {
            opacity: '0',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'fade-out': 'fade-out 1s ease-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
  ],
};
