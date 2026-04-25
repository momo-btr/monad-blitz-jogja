/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2A9D8F", // Terraforma Green
        "primary-content": "#FFFFFF",
        base: "#FFFFFF", // White Background
        surface: "#FFFFFF", // Card Backgrounds
        "base-content": "#111827", // Primary Text
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
          "base-100": "#FFFFFF",
          "base-200": "#FFFFFF",
          "base-300": "#FFFFFF",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        dark: {
          primary: "#2A9D8F",
          "primary-content": "#ffffff",
          secondary: "#264653",
          accent: "#E9C46A",
          neutral: "#2b3440",
          "base-100": "#FFFFFF",
          "base-200": "#FFFFFF",
          "base-300": "#FFFFFF",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        light: {
          primary: "#2A9D8F",
          "primary-content": "#ffffff",
          secondary: "#264653",
          accent: "#E9C46A",
          neutral: "#2b3440",
          "base-100": "#FFFFFF",
          "base-200": "#FFFFFF",
          "base-300": "#FFFFFF",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
