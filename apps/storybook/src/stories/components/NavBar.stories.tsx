import { Meta, StoryObj } from '@storybook/react'
import NavBar from '../../components/layout/navbar'

const meta: Meta = {
  title: 'Components/Layout/Nav Bar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a nav bar that docks to the left side of screen.`
      }
    }
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Nav bar content'
  }
}
