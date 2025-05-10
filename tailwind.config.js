// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,html,css}',  // ✏️ hier auch .vue & .css aufnehmen
  ],
  theme: {
    extend: {
      colors: {
        'nn-indigo':    '#3B3F99',
        'nn-neon-teal': '#2FE1C6',
        'nn-darkgray':  '#2B2B2B',
      },
    },
  },
  plugins: [],
}
