/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        "Green": "#ffb534",
        "red": "#FF6868",
        "secondary": "#555",
        "primaryBG": "#ffff",
        "buffetBg" : "#f3f1ed",
        "green":"#73bf10",
        "hover":"#46b141",
      },
      fontFamily :{
        'great-vibes' : ['Great Vibes' , 'cursive']
      }
    },
  },
  plugins: [require("daisyui")],
}
