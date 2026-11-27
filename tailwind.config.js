/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary-rgb) / <alpha-value>)',
          hover: 'rgb(var(--primary-hover-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground-rgb) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground-rgb) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground-rgb) / <alpha-value>)',
        },
        urgent: {
          DEFAULT: 'rgb(var(--urgent-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--urgent-foreground-rgb) / <alpha-value>)',
        },
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        body: 'rgb(var(--bgcolor-rgb) / <alpha-value>)',
        content: 'rgb(var(--text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
        'nav-bg': 'var(--nav-bg)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        timer: ['"Space Mono"', 'monospace'],
        mono: ['"Space Mono"', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px rgb(var(--primary-rgb) / 0.35)',
        'glow-secondary': '0 0 25px -5px rgb(var(--accent-rgb) / 0.35)',
        'card-custom': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        navHeight: 'var(--navHeight)',
      }
    },
  },
  plugins: [],
}
