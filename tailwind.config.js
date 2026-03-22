/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        theme: "var(--color-theme)",
        product: "var(--color-product)",
        hotel: "var(--color-hotel)",
        sitter: "var(--color-sitter)",
        insurance: "var(--color-insurance)",
        pharmacy: "var(--color-pharmacy)",
      },
    },
  },
  plugins: [],
}