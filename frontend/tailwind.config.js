export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f9f9f9',
        secondary: '#f0f0f0',
        accent: '#93c5fd', // Soft blue
        textMain: '#374151', // Soft dark gray
        textMuted: '#6b7280', // Soft gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
