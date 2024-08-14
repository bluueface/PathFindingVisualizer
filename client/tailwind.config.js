/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        traversed: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#2166df",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#4878cc",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#6d89b9",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#9CA3AF",
          },
        },
        path: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#e11d48bf",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#ea580cbf",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#fb923cbf",
          },
          "90%": {
            transform: "scale(0.8)",
            backgroundColor: "#fde68a",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        wall: {
          "0%": {
            transform: "scale(0.7)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        traversed: "traversed 0.5s cubic-bezier(0, 0, 0.2, 1)",
        path: "path 1.5s cubic-bezier(0, 0, 0.2, 1)",
        wall: "wall 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
