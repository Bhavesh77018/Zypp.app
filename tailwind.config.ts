import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary-rgb) / <alpha-value>)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
        },
        card: {
          DEFAULT: "rgb(var(--card-bg-rgb) / <alpha-value>)",
          border: "rgb(var(--card-border-rgb) / <alpha-value>)",
        },
        border: "rgb(var(--card-border-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Mega-menu dropdown: keeps the -translate-x-1/2 centering while sliding in.
        "menu-in": {
          "0%": { opacity: "0", transform: "translate(-50%, -10px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        "fade-up": "fade-up 0.6s ease both",
        "fade-in": "fade-in 0.5s ease both",
        "menu-in": "menu-in 0.2s ease-out both",
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

