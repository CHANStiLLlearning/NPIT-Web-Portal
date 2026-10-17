/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        npit: {
          primary: '#1d4ed8',     // Royal Blue for the main navbar
          deepNavy: '#0f2b5c',    // Deep Navy for stats bar & headers
          accentGold: '#eab308',  // Gold for buttons and highlights
          amberWarm: '#f59e0b',   // Civil engineering card
          techBlue: '#2563eb',    // IT card
          cyanTeal: '#0d9488',    // Electrical & Electronics card
          coralRed: '#e11d48',    // Mechanical Engineering card
        }
      },
      fontFamily: {
        sans: ['Inter', 'Kantumruy Pro', 'system-ui', '-apple-system', 'sans-serif'],
        khmer: ['"Kantumruy Pro"', '"Battambang"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
