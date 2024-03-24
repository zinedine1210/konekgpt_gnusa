/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        light:"#ffffff",
        lightPrimary:"#7e89cf",
        lightSecondary:"#D9D9D9",
        dark:"#0E172A",
        darkPrimary:"#1E293B",
        darkSecondary:"#384455"
      }
    },
  },
  darkMode:"class",
  mode:"jit",
  plugins: [],
}
