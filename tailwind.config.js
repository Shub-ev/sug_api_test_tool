/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#252525",   // dark blue-gray
        backgroundDark: "#202020",
        surface: "#1e293b",      // cards/panels
        primary: "#0005e4",      // buttons (indigo)
        secondary: "#22c55e",    // success (green)
        danger: "#ef4444",       // errors
        textPrimary: "#e2e8f0",  // main text
        textSecondary: "#94a3b8",// muted text
        border: "#334155",       // subtle borders
        accent: "#38bdf8",       // highlights
      }
    },
  },
  plugins: [],
}