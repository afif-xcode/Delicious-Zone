/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      primaryColor: "#FF9F00",
      secondColor: "#FFCE66",
      backgroundColor: "#FFEFCC",
      shadowColor: "#FFE7B3",
      subtext: "#1F1F1F",
      pink: "#EF476F",
      yellowLow: "#FCE96A",
      yellowHigh: "#FACA15",
      red300: "#F8B4B4",
      yellow400: "#E3A008",
      red400: "#F98080",
      yellow900: "#633112",
      yellow700: "#8E4B10",
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },
  plugins: [],
};