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
        primary: "#1e40af",     /* Niebieski kuratorium */
        secondary: "#7c2d12",   /* Bordowy kuratorium */
        accent: "#0f766e",      /* Zielony akcent */
      }
    },
  },
  plugins: [],
}
