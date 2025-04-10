/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "main": ["Nunito Sans", "sans-serif"]
      },
      backgroundImage: {
        'hero-pattern': 'var(--background-image-hero-pattern)',
      },
    },
  },
  plugins: [],
}