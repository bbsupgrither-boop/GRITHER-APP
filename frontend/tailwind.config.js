module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./frontend/**/*.{js,ts,jsx,tsx,html}"
  ],
  safelist: [
    { pattern: /(bg|text|border)-(slate|gray|zinc|neutral|stone|blue|green|red|yellow|purple)-(100|200|300|400|500|600|700)/ }
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
