/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      'primary': '#F0A8D0',
      'secondary' : "#0D0842", //text-color
      'blackBG': '#F3F3F3',  //background is silghtly grey
      'Favorite': '#FF5841'  // orangeish
    },
    fontFamily:{
      'primary' :["Montserrat", "sans-serif"],
      'secondary' : ["Nunito Sans", "sans-serif"]
    },
    height: {
      'screen-minus-120': 'calc(100vh - 120px)',
    },
  },
  },
  plugins: [],
}

