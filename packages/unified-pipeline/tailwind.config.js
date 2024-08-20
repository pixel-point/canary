/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@harnessio/canary/tailwind.config')],
  content: [
    './src/**/*.{ts,tsx}',
    /* Required to watch on changes from styles.css, including any new utilities added with @layer */
    './src/styles.css'
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          1: 'var(--studio-1)'
        }
      }
    }
  }
}
