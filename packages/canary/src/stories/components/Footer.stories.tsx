import { Meta, StoryObj } from '@storybook/react'
import Footer from '../../components/layout/footer'

const meta: Meta = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a footer that docks at bottom of container.`
      }
    }
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Footer content'
  }
}
