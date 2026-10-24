import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          dark: "#090d16",
          darker: "#05070c",
          card: "#0f172a",
          cardBorder: "#1e293b",
          primary: "#06b6d4", // Cyan
          accent: "#38bdf8",
          safe: "#10b981", // Emerald
          warning: "#f59e0b", // Amber
          danger: "#ef4444", // Crimson
          glow: "rgba(6, 182, 212, 0.15)",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(6, 182, 212, 0.7)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
