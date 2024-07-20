import { Meta, StoryObj } from '@storybook/react'
import Container from '../../components/layout/container'

const meta: Meta = {
  title: 'Components/Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a container that wraps all other layout components.`
      }
    }
  },
  tags: ['autodocs'],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: 'object', description: 'Children. Can be any `ReactNode`' }
  }
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Default'
  }
}

export const ContentCentered: StoryObj = {
  args: {
    children: 'Centered',
    alignContent: 'center'
  }
}
