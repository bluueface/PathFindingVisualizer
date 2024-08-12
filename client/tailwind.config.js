/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wall: {
          "0%": {
            transfrorm: "scale(0.7)",
          },
          "100%": {
            transfrorm: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
