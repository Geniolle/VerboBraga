import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-sky": "#EEF6FF",
        "brand-lavender": "#F8FAFF",
        "brand-indigo": "#5AB0FF",
        "brand-gold": "#D9B36C",
        "brand-sage": "#E6E9EF",
        "brand-ink": "#0F1C3F"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
