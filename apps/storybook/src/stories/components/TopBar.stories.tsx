import { Meta, StoryObj } from '@storybook/react'
import TopBar from '../../components/layout/top-bar'

const meta: Meta = {
  title: 'Components/Layout/Top Bar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a top bar that docks at top of container.`
      }
    }
  },
  tags: ['autodocs']
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Top bar content'
  }
}
