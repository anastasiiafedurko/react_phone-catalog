/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: "1200px",
      lg: "1199px",
      md: "640px",
      sm: "320px",
    },
    extend: {
      colors: {
        primary: "#313237",
        secondary: "#89939A",
        icons: "#B4BDC3",
        elements: "#E2E6E9",
        "hover-bg": "#E2E6E9",
        "almost-red": "#EB5757",
        "almost-green": "#27AE60",
      },
      fontFamily: {
        mont: ["Mont-Regular", "sans-serif"],
        "mont-bold": ["Mont-Bold", "sans-serif"],
        "mont-semibold": ["Mont-SemiBold", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
        wider: "0.04em",
      },
    },
  },
  plugins: [],
};
