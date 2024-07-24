/// <reference types="vite-plugin-svgr/client" />
import React from 'react'
import { Meta, Story } from '@storybook/react'
import Panel from '../../components/layout/Panel'

export default {
  title: 'Components/Panel',
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

const Template: Story = () => (
  <Panel.Root leftBorder>
    <p>Right panel</p>
  </Panel.Root>
)

const GitnessTemplate: Story = () => (
  <Panel.Root leftBorder>
    <p>Right panel</p>
  </Panel.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessPanel = GitnessTemplate.bind({})
GitnessTemplate.args = {}
