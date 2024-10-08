/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue", "./error.vue"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00B9FF",
      },
    },
  },
  plugins: [],
};
