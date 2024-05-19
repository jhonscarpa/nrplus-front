/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#D73035',
        'brand-blue': '#4E95FF',
        'brand-green': '#00B25D',
        'blue-900': '#062838',
        'gray-100': '#F2F2F2',
        'gray-200': '#CCCCCC',
        'gray-300': '#999999',
        'gray-400': '#666666',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        header: [
          '2rem',
          {
            lineHeight: '126%',
          },
        ],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwind-scrollbar')],
}
