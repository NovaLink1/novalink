// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#1d4ed8',
        secondary: '#f59e0b',
        accent:    '#10b981',
      },
    },
  },
  plugins: [],
}
