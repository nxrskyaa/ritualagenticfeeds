/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Custom Ritual colors - NEON GREEN dominant
        ritual: {
          bg: "#0A0A0F",
          glass: "rgba(255,255,255,0.04)",
          "glass-hover": "rgba(255,255,255,0.07)",
          "glass-border": "rgba(255,255,255,0.08)",
          "glass-border-active": "rgba(57,255,20,0.2)",
          neon: "#39FF14",
          "neon-dim": "rgba(57,255,20,0.15)",
          "neon-glow": "rgba(57,255,20,0.4)",
          cyan: "#39FF14",
          "ice-blue": "#86EFAC",
          violet: "#22C55E",
          silver: "#C8D6E5",
          "text-primary": "#F0F2F5",
          "text-secondary": "#8A95A5",
          "text-tertiary": "#5A6577",
          success: "#39FF14",
          pending: "#FBBF24",
        },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        orbFloat1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(30px, -40px) scale(1.05)" },
          "50%": { transform: "translate(-20px, 20px) scale(0.95)" },
          "75%": { transform: "translate(40px, 30px) scale(1.02)" },
        },
        orbFloat2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, -30px) scale(1.03)" },
          "66%": { transform: "translate(25px, 35px) scale(0.97)" },
        },
        orbFloat3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "20%": { transform: "translate(35px, 25px) scale(1.04)" },
          "50%": { transform: "translate(-30px, -35px) scale(0.96)" },
          "80%": { transform: "translate(20px, -20px) scale(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", boxShadow: "0 0 4px rgba(57,255,20,0.3)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px rgba(57,255,20,0.8), 0 0 40px rgba(57,255,20,0.3)" },
        },
        scrollPulse: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(30px)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "orb-float-1": "orbFloat1 20s ease-in-out infinite",
        "orb-float-2": "orbFloat2 25s ease-in-out infinite",
        "orb-float-3": "orbFloat3 30s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "spin-slow": "spinSlow 0.6s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
