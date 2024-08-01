/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@harnessio/canary/tailwind.config')],
  content: ['./src/**/*.{ts,tsx}', '../../packages/canary/src/**/*.{ts,tsx}']
}
