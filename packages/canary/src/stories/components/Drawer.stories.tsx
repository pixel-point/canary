import { Drawer } from '@/components/drawer'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Components/Layout/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a drawer that defaults to overlaying to right of screen.`
      }
    }
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Drawer content'
  }
}
