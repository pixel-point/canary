/// <reference types="vite-plugin-svgr/client" />
import { Meta, Story } from '@storybook/react'
import Content from '../../components/layout/Content'

export default {
  title: 'Components/Content',
  component: Content.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a content component inside a container.`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: Story = () => (
  <Content.Root>
    <p>Content</p>
  </Content.Root>
)

const GitnessTemplate: Story = () => (
  <Content.Root>
    <p>Content</p>
  </Content.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessContent = GitnessTemplate.bind({})
GitnessTemplate.args = {}
