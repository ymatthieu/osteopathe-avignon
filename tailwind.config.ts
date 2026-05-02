import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Brand palette inspired by current Wix site
        olive: {
          50: "#f5f6f0",
          100: "#e8ecdb",
          200: "#d2dab8",
          300: "#b4c08e",
          400: "#97a76a",
          500: "#7c9050",
          600: "#5a6b3a", // primary
          700: "#475429",
          800: "#3a4422",
          900: "#2f361e",
        },
        cream: {
          50: "#fdfbf7",
          100: "#fbf8f3",
          200: "#f5efe4",
          300: "#ede2cd",
          400: "#dfcdab",
          500: "#cfb589",
        },
        ink: {
          DEFAULT: "#2b2b25",
          muted: "rgba(43, 43, 37, 0.68)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.2, 0.7, 0.3, 1) forwards",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(90, 107, 58, 0.15)",
        glow: "0 0 60px -10px rgba(151, 167, 106, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
