/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000',
        secondary: '#fdf6e3',

        ['accent-second']: '#fca311',
        ['accent-first']: '#14213d',
        ['accent-third']: '#e5e5e5',
        light: '#FFF',
      },
    },
    colors: {
      white: "#eHeHeH"
    }
  },
  plugins: [],
}
