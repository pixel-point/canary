import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import HorizontalList from '../../components/layout/HorizontalList'
import { Button } from '@harnessio/canary'
import LightningBoltIcon from '../../assets/lightning-bolt-icon.svg?react'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export default {
  title: 'Components/Horizontal List',
  component: HorizontalList.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a horizontal list component, e.g. within the top bar`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn = () => (
  <HorizontalList.Root>
    <HorizontalList.Item>Default</HorizontalList.Item>
  </HorizontalList.Root>
)

const GitnessTemplate: StoryFn = () => (
  <HorizontalList.Root>
    <HorizontalList.Item>
      <Button variant="ghost" size="sm">
        Settings
      </Button>
    </HorizontalList.Item>
    <HorizontalList.Item>
      <Button size="sm">
        <LightningBoltIcon className="w-3 h-auto" />
        &nbsp;&nbsp;Save and Run&nbsp;
        <ChevronDownIcon />
      </Button>
    </HorizontalList.Item>
  </HorizontalList.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessTopBarRightList = GitnessTemplate.bind({})
GitnessTemplate.args = {}
