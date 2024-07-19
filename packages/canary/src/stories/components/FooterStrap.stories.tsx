import FooterStrap from '@/components/layout/footer-strap'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Layout/Footer Strap',
  component: FooterStrap,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a footer strap that overlays at bottom of container.`
      }
    }
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Footer strap content'
  }
}
