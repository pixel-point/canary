import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Panel from '../../components/layout/Panel'

export default {
  title: 'Components/App Shell/Panel',
  component: Panel.Root,
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

const Template: StoryFn = () => (
  <Panel.Root leftBorder>
    <p>Right panel</p>
  </Panel.Root>
)

const GitnessTemplate: StoryFn = () => (
  <Panel.Root leftBorder>
    <p>Right panel</p>
  </Panel.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessPanel = GitnessTemplate.bind({})
GitnessTemplate.args = {}
