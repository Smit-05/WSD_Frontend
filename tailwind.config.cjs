/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage:{
      'humming' : "url('./src/assets/Humming.png')"
    },
    fontFamily:{
      'sans' : ['Lato', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
  ],
}