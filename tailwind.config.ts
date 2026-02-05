import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-sky": "#E8F3FF",
        "brand-lavender": "#F4F1FF",
        "brand-indigo": "#3B4D8A",
        "brand-gold": "#D9B36C",
        "brand-sage": "#CFE5D2"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
