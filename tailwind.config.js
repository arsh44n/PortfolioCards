/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '32px',
        'card-lg': '36px',
        'inner': '24px',
      },
      boxShadow: {
        'depth-card': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 20px 40px -15px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        'depth-card-hover': '0 25px 60px -15px rgba(0, 0, 0, 0.12), 0 35px 70px -25px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'depth-canvas': 'inset 0 2px 4px rgba(0, 0, 0, 0.02), 0 40px 80px -20px rgba(0, 0, 0, 0.08)',
        'depth-modal': '0 30px 90px -20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        canvas: '#F7F7F8',
        surface: '#FFFFFF',
        accent: '#111111',
      }
    },
  },
  plugins: [],
};
