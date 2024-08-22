import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from '@harnessio/canary'

const meta: Meta<ToggleGroupProps> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Problems component`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'compact'] },
    type: { control: 'select', options: ['single', 'multiple'] },
    defaultValue: { control: 'text' },
    value: { control: 'text' }
  },
  args: {
    type: 'single',
    children: (
      <>
        <ToggleGroupItem value="1">Item one</ToggleGroupItem>
        <ToggleGroupItem value="2">Item two</ToggleGroupItem>
        <ToggleGroupItem value="3">Item three</ToggleGroupItem>
      </>
    )
  }
}

export default meta

export const Default: StoryObj<ToggleGroupProps> = {
  args: {
    variant: 'default'
  }
}

export const Outline: StoryObj<ToggleGroupProps> = {
  args: {
    variant: 'outline'
  }
}

export const Compact: StoryObj<ToggleGroupProps> = {
  args: {
    variant: 'compact'
  }
}
