/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      color: {
        primary: "#41C9E2",
        typography: "#4178E2",
        secondary: "#5A41E2",
        white: "#ffffff",
        navbar: "#d7d9d9",
        sky: "#0ea5e9",
        neutral: "#1d1e1f",
        gray: "#323333",
        green: "#39f21d",
        red: "#f50713",
        yellow: "#f5ed07",
        purple: "#bf07f7",
        red: "#f70c0c"
      }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
