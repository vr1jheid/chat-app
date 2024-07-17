/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-dark": "#0f0f0f",
        "gray-light": "#212121",
        "gray-very-light": "#2c2c2c",
        "gray-extra-light": "#56595d",
        "gray-hover": "#2f2f2f",
        "icon-modal": "#aaaaaa",
        "purple-main": "#766ac8",

        "purple-extra-light": "#bab9e5",
      },
      backgroundImage: {
        "cats-svg": "url(./src/Assets//bg-cats.svg)",
      },
      boxShadow: {
        "3xl": "0px 0px 13px 13px #0f0f0f;",
      },
    },
  },
  plugins: [],
};
