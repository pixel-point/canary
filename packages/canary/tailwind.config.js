/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          background: 'hsl(var(--secondary-background))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
          background: 'hsl(var(--tertiary-background))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        white: {
          DEFAULT: 'hsl(var(--white))'
        },
        black: {
          DEFAULT: 'hsl(var(--black))'
        },
        grey: {
          6: 'hsl(var(--grey-6))',
          8: 'hsl(var(--grey-8))',
          10: 'hsl(var(--grey-10))',
          12: 'hsl(var(--grey-12))',
          15: 'hsl(var(--grey-15))',
          20: 'hsl(var(--grey-20))',
          30: 'hsl(var(--grey-30))',
          40: 'hsl(var(--grey-40))',
          50: 'hsl(var(--grey-50))',
          60: 'hsl(var(--grey-60))',
          70: 'hsl(var(--grey-70))',
          80: 'hsl(var(--grey-80))',
          90: 'hsl(var(--grey-90))',
          94: 'hsl(var(--grey-94))',
          98: 'hsl(var(--grey-98))'
        },
        shade: {
          0: 'hsl(var(--shade-0))',
          6: 'hsl(var(--shade-6))',
          8: 'hsl(var(--shade-8))',
          10: 'hsl(var(--shade-10))',
          12: 'hsl(var(--shade-12))',
          15: 'hsl(var(--shade-15))',
          20: 'hsl(var(--shade-20))',
          30: 'hsl(var(--shade-30))',
          40: 'hsl(var(--shade-40))',
          50: 'hsl(var(--shade-50))',
          60: 'hsl(var(--shade-60))',
          70: 'hsl(var(--shade-70))',
          80: 'hsl(var(--shade-80))',
          90: 'hsl(var(--shade-90))',
          94: 'hsl(var(--shade-94))',
          98: 'hsl(var(--shade-98))',
          100: 'hsl(var(--shade-100))',
        },
        mint: {
          DEFAULT: 'hsl(var(--mint))',
        },
        blue: {
          DEFAULT: 'hsl(var(--blue))',
        },
        orange: {
          DEFAULT: 'hsl(var(--orange))',
        },
        purple: {
          DEFAULT: 'hsl(var(--purple))',
        }
      },
      borderRadius: {
        DEFAULT: 'var(--radius)'
      },
      border: {
        DEFAULT: '1px'
      },
      fontSize: {
        xs: '13px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
