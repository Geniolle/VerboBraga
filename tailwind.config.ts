import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-sky": "#F2F6FF",
        "brand-lavender": "#F7F9FF",
        "brand-indigo": "#4DA3FF",
        "brand-gold": "#D9B36C",
        "brand-sage": "#E6E9EF"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
