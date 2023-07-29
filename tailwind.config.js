/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#181818',
        'secondary': '#292929',
        'primary-text': '#D1D1D1',
        'secondary-text': '#828282',
        'highlight-text': '#60678C',
        'highlight': '#1D1E2C',
        'border-primary': "#383838"
      }
    }
  },
  plugins: [],
}

