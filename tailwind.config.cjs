/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        board: "#AC9D8F",
        space: "#B9AC9D",
        tgrey: "#766D65",
        two: "#EEE3DA",
        four: "#EDDFC8",
        eight: "#F2B178",
        one6: "#F59562",
        three2: "#F57C5F",
        six4: "#F65E3A",
        one28: "#EDCF73",
        two56: "#EDCC61",
        five16: "#EDC750",
        one024: "#EDC53E",
        two048: "#edc22d",
      }
    },
  },
  plugins: [],
}
