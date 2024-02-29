/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Give your font a name (e.g., 'myFont')
        myFont: ['NeueHaasGrotesk', 'sans-serif'],
      },
      colors: {
        orange: '#EDA540',
        green: '#039855',
        gray: {
          100: '#F9F8F7',
          200: '#F3F2F0',
          300: '#EBE9E6',
          400: '#E3E3E2',
          500: '#CDCCC9',
          600: '#BAB9B6',
          700: '#A8A7A3',
          800: '#857469',
          900: '#403F3F',
        },
      },
    },
  },
  plugins: [],
};
