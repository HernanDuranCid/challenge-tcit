/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: "class", // 👈 control del tema oscuro por clase
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4f46e5", // Indigo-600
          dark: "#6366f1", // Indigo-500
        },
        surface: {
          light: "#ffffff",
          dark: "#1e293b", // slate-800
        },
        text: {
          light: "#1e293b",
          dark: "#e2e8f0",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.35s ease-out",
        fadeOutUp: "fadeOutUp 0.35s ease-in",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }), // ✅ activa las variantes modernas
  ],
  variants: {
    scrollbar: ["rounded"], // ✅ permite esquinas redondeadas si las usas
  },
};
