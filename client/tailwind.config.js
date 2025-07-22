/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary-brand': '#10B981', // A modern, vibrant green (Emerald 500)
        'secondary-brand': '#047857', // A deeper green for accents (Emerald 700)
        'accent-warm': '#D97706',    // A rich, warm orange/brown (Amber 600)
        'neutral-light': '#F8F8F8',  // A very subtle off-white for backgrounds
        'neutral-dark': '#1F2937',   // A dark gray for body text and primary headings
        'text-light': '#F9FAFB',     // Off-white for text on dark backgrounds
      },
      // Add text shadow utility (optional, but good for readability on images)
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    // Add plugin for text shadow utilities
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: theme('textShadow.sm'),
        },
        '.text-shadow': {
          textShadow: theme('textShadow.DEFAULT'),
        },
        '.text-shadow-lg': {
          textShadow: theme('textShadow.lg'),
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}