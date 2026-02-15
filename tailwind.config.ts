import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["Geom", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        accent: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        success: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
    },
  },
  plugins: [],
};

export default config;
