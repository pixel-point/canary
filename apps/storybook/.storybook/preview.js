import '@harnessio/canary/styles'
import '../src/styles.css'

import { withThemeByClassName } from '@storybook/addon-themes'

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Design System', 'App Shell', 'Components', 'Screens'],
        locales: ''
      }
    }
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark'
      },
      defaultTheme: 'dark'
    })
  ]
}

export default preview
