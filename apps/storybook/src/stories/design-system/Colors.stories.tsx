// src/design-system/Colors.stories.tsx
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

// Define the prop types
interface ColorBoxProps {
  color: string
  name: string
  utility: string
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, name, utility }) => (
  <div className="flex flex-col items-start mb-4 p-4 w-24">
    <div className={`w-24 h-24 ${color} border border-card rounded-lg`} title={name} />
    <span className="mt-2 text-xs font-medium text-card w-24 text-wrap">{name}</span>
    <code className="mt-1 text-[11px] text-card w-24 text-wrap">{utility}</code>
  </div>
)

export default {
  title: 'Design System/Colors',
  parameters: {
    docs: {
      description: {
        component:
          'A collection of color styles used by Pixel Point throughout Figma, with usage examples for Tailwind CSS utilities. Utilities are shown for background, but substitute "bg-" with e.g. "text-" to style text.'
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn<ColorBoxProps> = args => <ColorBox {...args} />

export const GitnessOpenSourceSemanticColors = () => (
  <div className="flex flex-wrap gap-8">
    <Template color="bg-background" name="Background" utility="bg-background" />
    <Template color="bg-foreground" name="Foreground" utility="bg-foreground" />
    <Template color="bg-primary" name="Primary" utility="bg-primary" />
    <Template color="bg-primary-foreground" name="Primary Foreground" utility="bg-primary-foreground" />
    <Template color="bg-secondary" name="Secondary" utility="bg-secondary" />
    <Template color="bg-secondary-background" name="Secondary Background" utility="bg-secondary-background" />
    <Template color="bg-secondary-foreground" name="Secondary Foreground" utility="bg-secondary-foreground" />
    <Template color="bg-tertiary" name="Tertiary" utility="bg-tertiary" />
    <Template color="bg-tertiary-background" name="Tertiary Background" utility="bg-tertiary-background" />
    <Template color="bg-tertiary-foreground" name="Tertiary Foreground" utility="bg-tertiary-foreground" />
    <Template color="bg-card" name="Card" utility="bg-card" />
    <Template color="bg-card-foreground" name="Card Foreground" utility="bg-card-foreground" />
    <Template color="bg-popover" name="Popover" utility="bg-popover" />
    <Template color="bg-popover-foreground" name="Popover Foreground" utility="bg-popover-foreground" />
    <Template color="bg-muted" name="Muted" utility="bg-muted" />
    <Template color="bg-mute-foreground" name="Muted Foreground" utility="bg-muted-foreground" />
    <Template color="bg-accent" name="Accent" utility="bg-accent" />
    <Template color="bg-accent-foreground" name="Accent Foreground" utility="bg-accent-foreground" />
    <Template color="bg-destructive" name="Destructive" utility="bg-destructive" />
    <Template color="bg-destructive-foreground" name="Destructive Foreground" utility="bg-destructive-foreground" />
    <Template color="bg-border" name="Border" utility="bg-border" />
    <Template color="bg-input" name="Input" utility="bg-input" />
    <Template color="bg-ring" name="Ring" utility="bg-ring" />
    <Template color="bg-success" name="Success" utility="bg-success" />
    <Template color="bg-error" name="Error" utility="bg-error" />
    <Template color="bg-ai" name="AI" utility="bg-ai" />
  </div>
)
