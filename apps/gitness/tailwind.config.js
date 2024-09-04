/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@harnessio/playground/tailwind.config', '@harnessio/canary/tailwind.config')],
  content: ['./src/**/*.{ts,tsx}', 'node_modules/@harnessio/playground/src/**/*.{ts,tsx}'],
  theme: {}
}
