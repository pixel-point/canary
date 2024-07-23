/// <reference types="vite-plugin-svgr/client" />
import { Meta, Story } from '@storybook/react'
import BottomBar from '../../components/layout/BottomBar'

export default {
  title: 'Components/Bottom Bar',
  component: BottomBar.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a top bar component inside a container, docked to top of screen`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: Story = () => (
  <BottomBar.Root>
    <BottomBar.Left>
      <p>Left actions</p>
    </BottomBar.Left>
    <BottomBar.Right>
      <p>Right actions</p>
    </BottomBar.Right>
  </BottomBar.Root>
)

const GitnessTemplate: Story = () => (
  <BottomBar.Root>
    <BottomBar.Left>
      <p className="text-xs font-light text-primary">Left</p>
    </BottomBar.Left>
    <BottomBar.Right>
      <p className="text-xs font-light text-primary">Right</p>
    </BottomBar.Right>
  </BottomBar.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessBottomBar = GitnessTemplate.bind({})
GitnessTemplate.args = {}
