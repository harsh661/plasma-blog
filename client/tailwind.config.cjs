/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#151f32",
        "light-mode": "#e9ebee",
        "light-mode-text": "#65676B",
        "darker": "#0b1120",
        "hover": "#101b2f",
        "light": "#273f66",
        "accent": "#328af1",
        "accent-light": "#29bff7",
        "card": "#1e293b",
        "yellow": "#f9b52e",
        "red": "#f14771",
        "blue": "#5090fc",
        "purple": "#9e68d5",
        "dark-text": "#94A3B8",
      },
      minHeight: {
        'body': 'calc(100vh - 60px)',
      }
    },
  },
  plugins: [],
}
