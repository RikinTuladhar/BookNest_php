/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8", // Custom primary color
        secondary: "#ff5722", // Custom secondary color
        accent: "#4caf50", // Custom accent color
      },
    },
  },
  plugins: [],
};
