import { Meta, StoryObj } from '@storybook/react'
import BottomBar from '../../components/layout/bottom-bar'

const meta: Meta = {
  title: 'Components/Layout/Bottom Bar',
  component: BottomBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a bottom bar that docks at bottom of container.`
      }
    }
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Bottom bar content'
  }
}
