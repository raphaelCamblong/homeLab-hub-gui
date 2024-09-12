import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['PPNeueMachina', 'sans-serif'],
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        ppneuemachina: ['PPNeueMachina', 'sans-serif'],
      },
      colors: {
        'regal-blue': '#a5b4fc',
        'indigo-dye': '#2B4162',
        'sandy-brown': '#FA9F42',
        'falu-red': '#721817',
        'dartmouth-green': '#0B6E4F',
        'green-pastel': '#77DD76',
        'red-pastel': '#FF6962',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config