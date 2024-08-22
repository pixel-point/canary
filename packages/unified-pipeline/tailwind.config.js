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
          1: 'rgba(var(--studio-1))',
          2: 'rgba(var(--studio-2))',
          3: 'rgba(var(--studio-3))',
          4: 'rgba(var(--studio-4))',
          5: 'rgba(var(--studio-5))',
          6: 'rgba(var(--studio-6))',
          7: 'rgba(var(--studio-7))',
          8: 'rgba(var(--studio-8))'
        }
      }
    }
  }
}
