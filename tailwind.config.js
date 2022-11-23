/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/common/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#0c0e12",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  darkMode: "class",
};
