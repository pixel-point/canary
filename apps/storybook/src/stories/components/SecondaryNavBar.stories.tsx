import React from 'react';
import { Meta, StoryFn } from '@storybook/react'
import NavItemPlaceholder from '../../assets/environment-icon.svg?react'
import SecondaryNavbar from '../../components/layout/SecondaryNavBar'

export default {
  title: 'Components/Composites/Secondary Navbar',
  component: SecondaryNavbar.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a secondary nav bar to the right of primary nav bar.`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn = () => (
  <SecondaryNavbar.Root>
    <SecondaryNavbar.Header><></></SecondaryNavbar.Header>
    <SecondaryNavbar.Content>
      <SecondaryNavbar.Group>
        <SecondaryNavbar.Item text="Secondary Link 1" icon={<NavItemPlaceholder />} />
        <SecondaryNavbar.Item text="Secondary Link 2" icon={<NavItemPlaceholder />} active />
        <SecondaryNavbar.Item text="Secondary Link 3" icon={<NavItemPlaceholder />} />
        <SecondaryNavbar.Item text="Secondary Link 4" icon={<NavItemPlaceholder />} />
      </SecondaryNavbar.Group>
    </SecondaryNavbar.Content>
  </SecondaryNavbar.Root>
)

const GitnessTemplate: StoryFn = () => (
  <SecondaryNavbar.Root>
    <SecondaryNavbar.Header><></></SecondaryNavbar.Header>
    <SecondaryNavbar.Content>
      <SecondaryNavbar.Group>
        <SecondaryNavbar.Item text="Secondary Link 1" icon={<NavItemPlaceholder />} />
        <SecondaryNavbar.Item text="Secondary Link 2" icon={<NavItemPlaceholder />} active />
        <SecondaryNavbar.Item text="Secondary Link 3" icon={<NavItemPlaceholder />} />
        <SecondaryNavbar.Item text="Secondary Link 4" icon={<NavItemPlaceholder />} />
      </SecondaryNavbar.Group>
    </SecondaryNavbar.Content>
  </SecondaryNavbar.Root>
)

export const GitnessSecondaryNavbar = GitnessTemplate.bind({})
GitnessTemplate.args = {}

export const Default = Template.bind({})
Default.args = {}
