import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        lemon: "#FFF6B3",
        mint: "#C8F7DC",
        navyDeep: "#1C1C33",
      },
      keyframes: {
        lemonFloat: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        lemonGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 246, 179, 0.9)" },
          "70%": { boxShadow: "0 0 0 18px rgba(255, 246, 179, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255, 246, 179, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
      },
      animation: {
        lemonFloat: "lemonFloat 1.6s ease-in-out infinite",
        lemonGlow: "lemonGlow 1.8s ease-out infinite",
        shimmer: "shimmer 1.2s linear infinite",
      },
      boxShadow: {
        lemonSoft: "0 10px 25px rgba(255, 246, 179, 0.6)",
      },
      fontFamily: {
        display: ['"Pretendard Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
