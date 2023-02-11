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
        primary: '#14121E',
        secondary: '#FCF3FD',

        ['accent-orange']: '#FFEFE2',
        ['accent-green']: '#F7FAE9',

        light: '#FAFAFA',
      },
    },
  },
  plugins: [],
}
