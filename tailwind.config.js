/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#F7FDFF",
          100: "#8AD1F0",
          200: "#61C6ED",
          300: "#2BBCEE"
        },
        green: {
          100: "#6abe30",
          200: "#408c28",
        },
        navy: "#2E3A59",
        black: "#0D101C",
        gray: "#6E7591",
        lightgray: "#D9D9D9",
        red: "#C1161C",
        lightbrown: {
          100: "#e3d2c2",
          200: "#b58d74"
        },
        brown: {
          100: "#945835",
          200: "#7F4D2E"
        },
        white: "#FFFFFF",
        sky: "#35a4f8"
      }
    },
    fontFamily: {
      press: ['PressStart2P', 'sans-serif'],
      zcool: ['ZCOOL', 'sans-serif'],
    },
  },
  plugins: [],
}
