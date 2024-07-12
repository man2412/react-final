/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {colors: {
      primary: '#4CAF50',
      secondary: '#FF5722',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },},
  },
  plugins: [],
}