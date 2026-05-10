import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: "#03091a",
          surface: "#050e1f",
          land: "#0e2240",
          map: "#040d1e",
        },
        ink: {
          primary: "#d0e8f4",
          secondary: "rgba(180,210,240,0.6)",
          muted: "rgba(130,180,215,0.38)",
        },
        species: {
          sperm: "#4ecdc4",
          fin: "#a78bfa",
          right: "#86efac",
          humpback: "#fbbf24",
          blue: "#f87171",
          orca: "#e2e8f0",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Playfair Display", "ui-serif", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        drift: "drift 24s ease-in-out infinite",
        "fade-up": "fadeUp 1s ease-out forwards",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(40px) translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
