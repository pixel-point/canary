/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@harnessio/canary/tailwind.config')],
  content: ['./src/**/*.{ts,tsx}', 'node_modules/@harnessio/canary/src/**/*.{ts,tsx}'],
}
