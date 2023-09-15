/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins'],
   },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      primaryColor : "#FF9F00",
      secondColor : "#FFCE66",
      backgroundColor : "#FFEFCC",
      shadowColor : "#FFE7B3",
      subtext : "#1F1F1F",
      pink: "#EF476F",
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px"
      },
    },
  },
  plugins: [],
}