// src/design-system/Typography.stories.tsx
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

// Define the prop types
interface TextProps {
  text: string
  className: string
}

// Define the component
const Text: React.FC<TextProps> = ({ text, className }) => (
  <div>
    <p className={className}>{text}</p>
  </div>
)

// Define the component metadata
export default {
  title: 'Design System/Typography',
  parameters: {
    docs: {
      description: {
        component: 'A collection of typographic styles used throughout the design system.'
      }
    }
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to display',
      defaultValue: 'Typography'
    },
    className: {
      control: 'text',
      description: 'The Tailwind CSS class to apply',
      defaultValue: 'text-base'
    }
  },
  tags: ['autodocs']
} as Meta

// Define the story template
const Template: StoryFn<TextProps> = args => <Text {...args} />

// Define individual stories
export const BodyText = Template.bind({})
BodyText.args = {
  text: 'This is body text',
  className: 'text-sm'
}

export const SectionTitle = Template.bind({})
SectionTitle.args = {
  text: 'Section title',
  className: 'section-title'
}

export const SectionTitleSmall = Template.bind({})
SectionTitleSmall.args = {
  text: 'Section title small',
  className: 'section-title-small'
}
