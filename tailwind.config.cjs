/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  important: true,
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: { sans: ['Inter'] },
    },
  },
  plugins: [],
};
