/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Give your font a name (e.g., 'myFont')
        myFont: ['NeueHaasGrotesk', 'sans-serif'],
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        lg: '1.18rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
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
