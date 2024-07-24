import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Content from '../../components/layout/Content'

export default {
  title: 'Components/App Shell/Content',
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

const Template: StoryFn = () => (
  <Content.Root>
    <p>Content</p>
  </Content.Root>
)

const GitnessTemplate: StoryFn = () => (
  <Content.Root>
    <p>Content</p>
  </Content.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessContent = GitnessTemplate.bind({})
GitnessTemplate.args = {}
