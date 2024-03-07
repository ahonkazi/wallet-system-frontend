/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "danger": "#ff4757",
        "warning": "#ffa502",
        "dark": "#2f3542",
        "base-1": "#f1f2f6",
        "base-2": "#dfe4ea",
        "base-3": "#ced6e0",
        "gray": "#57606f",
        "success": "#2ed573",
        "info": "#1e90ff",
        "primary-light": "#5352ed",
        "primary-dark": "#3742fa",
        "secondary": "#ff6348"
      },
      fontFamily: {
        "base-2": ["Roboto Condensed"],
        "base": ["Hind Siliguri"],
      }
    },
  },
  plugins: [],
};
