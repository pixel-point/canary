/// <reference types="vite-plugin-svgr/client" />
import React from 'react'
import { Meta, Story } from '@storybook/react'
import Topbar from '../../components/layout/TopBar'

export default {
  title: 'Components/Top Bar',
  component: Topbar.Root,
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
  <Topbar.Root>
    <Topbar.Left>
      <p>Left actions</p>
    </Topbar.Left>
    <Topbar.Right>
      <p>Right actions</p>
    </Topbar.Right>
  </Topbar.Root>
)

const GitnessTemplate: Story = () => (
  <Topbar.Root>
    <Topbar.Left>
      <p>Breadcrumbs</p>
    </Topbar.Left>
    <Topbar.Right>
      <p>Button</p>
    </Topbar.Right>
  </Topbar.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessTopBar = GitnessTemplate.bind({})
GitnessTemplate.args = {}
