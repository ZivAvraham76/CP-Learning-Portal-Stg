/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    ],
  theme: {
    screens: {
      mobile: "640px",
      // => @media (min-width: 640px) { ... }
 
      tablet: "1024px",
      // => @media (min-width: 1024px) { ... }
 
      laptop: "1217px",
      // => @media (min-width: 1280px) { ... }
 
      widescreen: "1905px",
      // => @media (min-width: 1280px) { ... }
 
      desktop: "2560px",
      // => @media (min-width: 2560px) { ... }
    },
    
    extend: {fontFamily: {
      Poppins : ['Poppins', 'sans-serif'],
      TitanOne : ['TitanOne', 'sans-serif'],
      Inter : ['Inter', 'sans-serif'],  
    },
    maxHeight: {
      25: "25%",
      50: "50%",
      75: "75%",
      100: "100%",
    },  },
  plugins: [],
}
}