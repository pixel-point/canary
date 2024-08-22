import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input, InputProps } from '@harnessio/canary'
import { Search, WarningTriangle } from '@harnessio/icons-noir'

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Input component.`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'password'] },
    placeholder: { control: 'text' }
  },
  args: {
    type: 'text',
    placeholder: 'Placeholder ...'
  }
}

export default meta

export const Primary: StoryObj<InputProps> = {
  args: {}
}

export const LeftIcon: StoryObj<InputProps> = {
  args: {
    left: <Search />
  }
}

export const RightIcon: StoryObj<InputProps> = {
  args: {
    right: <WarningTriangle />
  }
}

export const LeftRightIcon: StoryObj<InputProps> = {
  args: {
    left: <Search />,
    right: <WarningTriangle />
  }
}

export const IconsCustomSize: StoryObj<InputProps> = {
  args: {
    left: <Search size="25" />,
    right: <WarningTriangle size="25" />
  }
}

export const LeftIconStyled: StoryObj<InputProps> = {
  args: {
    left: <Search />,
    leftStyle: true
  }
}

export const RightIconStyled: StoryObj<InputProps> = {
  args: {
    right: <WarningTriangle />
  }
}

export const LeftRightIconStyled: StoryObj<InputProps> = {
  args: {
    left: <Search />,
    leftStyle: true,
    right: <WarningTriangle />,
    rightStyle: true
  }
}

export const IconsCustomSizeStyled: StoryObj<InputProps> = {
  args: {
    left: <Search size="25" />,
    leftStyle: true,
    right: <WarningTriangle size="25" />,
    rightStyle: true
  }
}

export const TextStyled: StoryObj<InputProps> = {
  args: {
    left: 'https://',
    leftStyle: true,
    right: '.io',
    rightStyle: true
  }
}
