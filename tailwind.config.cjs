/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 기본 sans (영어/기본 텍스트)
        sans: ["Fredoka", "system-ui", "sans-serif"],
        // 귀여운 전용 폰트 (Donggle 나중에 진짜 넣었을 때)
        cute: ["Donggle", "Fredoka", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
