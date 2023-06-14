/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "640px",
      xmd: "840px",
      lg: "1024px",
      xl: "1280px",
      _2k: "2000px",
    },
    extend: {
      fontFamily: {
        abc: ["Unbounded", "cursive"],
      },
      colors: {
        textHover: "#effbce",
        text: "#d4d7d9",
        primary: "#2b2f3b",
        secondary: "#b997f7",
        btntext: "#303135",      
      },
    },
  },
  plugins: [],
};