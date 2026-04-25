/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A9D8F", // Terraforma Green
        "primary-content": "#FFFFFF",
        base: "#F9FAFB", // Light Fintech Background
        surface: "#FFFFFF", // Card Backgrounds
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        terraforma: {
          primary: "#2A9D8F",
          "primary-content": "#ffffff",
          secondary: "#264653",
          accent: "#E9C46A",
          neutral: "#2b3440",
          "base-100": "#F9FAFB",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
