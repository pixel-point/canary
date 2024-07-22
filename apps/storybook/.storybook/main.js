/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../../packages/unified-pipeline/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: config => {
    // Add support for importing CSS files
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "../../../packages/unified-pipeline/src/App.module.scss";`
        }
      }
    }
    return config
  },
  core: {
    disableTelemetry: true
  },
  typescript: {
    reactDocgen: false,
  }
}
export default config
