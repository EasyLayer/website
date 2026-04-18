/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Dark mode driven by Docusaurus data-theme attribute
  darkMode: ['class', '[data-theme="dark"]'],
  important: true,
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
