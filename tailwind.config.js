/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coolgray: {
          50: '#f9fafb',   // Extra light (lighter than coolGray10)
          100: '#f2f4f8',  // coolGray10
          200: '#dde1e6',  // coolGray20
          300: '#c1c7cd',  // coolGray30
          400: '#a2a9b0',  // coolGray40
          500: '#878d96',  // coolGray50
          600: '#697077',  // coolGray60
          700: '#4d5358',  // coolGray70
          800: '#343a3f',  // coolGray80
          900: '#21272a',  // coolGray90
          950: '#121619',  // coolGray100
        },
        accent: {
          1: '#6200ea',    // highlight1 / hColor1
          2: '#651fff',    // highlight2 / hColor2  
          3: '#7c4dff',    // highlight3 / hColor3
        },
      },
    },
  },
  plugins: [],
} 