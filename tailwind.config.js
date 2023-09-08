/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/coffee.avif')",
        homepage: "url('/header-bg.jpg.webp')",
      },
      backdropBlur: {
        login: "2rem",
      },
      fontFamily: {
        welcome: "Josefin Sans",
        title: "Roboto",
        logo: "Finger Paint",
      },
    },
  },
  plugins: [],
};
