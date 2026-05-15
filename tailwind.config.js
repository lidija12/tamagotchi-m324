/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  safelist: [
    "bg-violet-300", "bg-emerald-300", "bg-orange-300", "bg-sky-300", "bg-rose-300",
    "bg-violet-200", "bg-emerald-200", "bg-orange-200", "bg-sky-200", "bg-rose-200",
    "bg-violet-400", "bg-emerald-400", "bg-orange-400", "bg-sky-400", "bg-rose-400",
    "bg-violet-100", "bg-emerald-100", "bg-orange-100", "bg-sky-100", "bg-rose-100",
    "shadow-violet-300/60", "shadow-emerald-300/60", "shadow-orange-300/60", "shadow-sky-300/60", "shadow-rose-300/60",
    "ring-violet-400", "ring-emerald-400", "ring-orange-400", "ring-sky-400", "ring-rose-400",
    "from-orange-100", "to-orange-50", "border-orange-200", "text-orange-700", "bg-orange-200",
    "from-pink-100", "to-pink-50", "border-pink-200", "text-pink-700", "bg-pink-200",
    "from-indigo-100", "to-indigo-50", "border-indigo-200", "text-indigo-700", "bg-indigo-200",
    "from-sky-100", "to-sky-50", "border-sky-200", "text-sky-700", "bg-sky-200",
    "from-rose-100", "to-rose-50", "border-rose-200", "text-rose-700", "bg-rose-200",
    "from-emerald-100", "to-emerald-50", "border-emerald-200", "text-emerald-700", "bg-emerald-200",
    "from-purple-100", "to-purple-50", "border-purple-200", "text-purple-700", "bg-purple-200",
    "bg-orange-100", "text-orange-600", "border-orange-200",
    "bg-pink-100", "text-pink-600", "border-pink-200",
    "bg-indigo-100", "text-indigo-600", "border-indigo-200",
    "bg-sky-100", "text-sky-600", "border-sky-200",
    "bg-rose-100", "text-rose-600", "border-rose-200",
    "bg-emerald-100", "text-emerald-600", "border-emerald-200",
    "bg-purple-100", "text-purple-600", "border-purple-200"
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};