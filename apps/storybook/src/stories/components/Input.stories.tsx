import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input, InputProps } from '../../../../../packages/canary/src/components/input'
import { Search, WarningTriangle } from '@harnessio/icons-noir'

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `Input component.`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'password'] }
  },
  args: {
    type: 'text'
  }
}

export default meta

export const Primary: StoryObj<InputProps> = {
  args: {}
}

export const LeftIcon: StoryObj<InputProps> = {
  args: {
    leftIcon: <Search />
  }
}

export const RightIcon: StoryObj<InputProps> = {
  args: {
    rightIcon: <WarningTriangle />
  }
}

export const LeftRightIcon: StoryObj<InputProps> = {
  args: {
    leftIcon: <Search />,
    rightIcon: <WarningTriangle />
  }
}

export const IconsCustomSize: StoryObj<InputProps> = {
  args: {
    leftIcon: <Search size="20" />,
    rightIcon: <WarningTriangle size="20" />
  }
}
