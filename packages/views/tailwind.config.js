/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@harnessio/canary/tailwind.config'), require('@harnessio/unified-pipeline/tailwind.config')],
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/@harnessio/canary/src/**/*.{ts,tsx}',
    'node_modules/@harnessio/unified-pipeline/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        stage: {
          DEFAULT: 'hsl(var(--grey-50))'
        },
        user: {
          DEFAULT: 'hsl(var(--grey-40))'
        },
        git: {
          DEFAULT: 'hsl(var(-grey-90))'
        },
        log: {
          DEFAULT: 'hsl(var(--grey-30))'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: ['prose', 'prose-invert', 'prose-headings', 'prose-p', 'prose-a', 'prose-img', 'prose-code']
}
