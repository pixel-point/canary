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
  <div className="flex flex-col items-start mb-4 p-4">
    <div className={`w-24 h-24 ${color} border border-gray-300 rounded-lg`} title={name} />
    <span className="mt-2 text-sm font-medium">{name}</span>
    <code className="mt-1 text-xs text-grey-40">{utility}</code>
  </div>
)

export default {
  title: 'Design System/Colors',
  parameters: {
    docs: {
      description: {
        component:
          'A collection of color styles used by Pixel Point throughout Figma, with usage examples for Tailwind CSS utilities. Utilities are shown for background, but substitute "bg-" with "text-" to style text.'
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn<ColorBoxProps> = args => <ColorBox {...args} />

export const RelativeColors = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-wrap gap-6">
      <Template color="bg-background" name="Background" utility="bg-background" />
      <Template color="bg-foreground" name="Foreground" utility="bg-foreground" />
    </div>
    <div className="flex flex-wrap gap-6">
      <Template color="bg-primary" name="Primary" utility="bg-primary" />
      <Template color="bg-primary-foreground" name="Primary Foreground" utility="bg-primary-foreground" />
    </div>
    <div className="flex flex-wrap gap-6">
      <Template color="bg-secondary" name="Secondary" utility="bg-secondary" />
      <Template color="bg-secondary-background" name="Secondary Background" utility="bg-secondary-background" />
      <Template color="bg-secondary-foreground" name="Secondary Foreground" utility="bg-secondary-foreground" />
    </div>
    <div className="flex flex-wrap gap-6">
      <Template color="bg-tertiary" name="Tertiary" utility="bg-tertiary" />
      <Template color="bg-tertiary-background" name="Tertiary Background" utility="bg-tertiary-background" />
      <Template color="bg-tertiary-foreground" name="Tertiary Foreground" utility="bg-tertiary-foreground" />
    </div>
    <div className="flex flex-wrap gap-6">
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
    </div>
  </div>
)

export const GreyColors = () => (
  <div className="flex flex-wrap gap-6">
    <Template color="bg-black" name="Black" utility="bg-black" />
    <Template color="bg-grey-6" name="Grey 6" utility="bg-grey-6" />
    <Template color="bg-grey-8" name="Grey 8" utility="bg-grey-8" />
    <Template color="bg-grey-10" name="Grey 10" utility="bg-grey-10" />
    <Template color="bg-grey-12" name="Grey 12" utility="bg-grey-12" />
    <Template color="bg-grey-15" name="Grey 15" utility="bg-grey-15" />
    <Template color="bg-grey-20" name="Grey 20" utility="bg-grey-20" />
    <Template color="bg-grey-30" name="Grey 30" utility="bg-grey-30" />
    <Template color="bg-grey-40" name="Grey 40" utility="bg-grey-40" />
    <Template color="bg-grey-50" name="Grey 50" utility="bg-grey-50" />
    <Template color="bg-grey-60" name="Grey 60" utility="bg-grey-60" />
    <Template color="bg-grey-70" name="Grey 70" utility="bg-grey-70" />
    <Template color="bg-grey-80" name="Grey 80" utility="bg-grey-80" />
    <Template color="bg-grey-90" name="Grey 90" utility="bg-grey-90" />
    <Template color="bg-grey-94" name="Grey 94" utility="bg-grey-94" />
    <Template color="bg-grey-98" name="Grey 98" utility="bg-grey-98" />
    <Template color="bg-white" name="White" utility="bg-white" />
  </div>
)

export const SecondaryColors = () => (
  <div className="flex flex-wrap gap-6">
    <Template color="bg-mint" name="Mint" utility="bg-mint" />
    <Template color="bg-blue" name="Blue" utility="bg-blue" />
    <Template color="bg-orange" name="Orange" utility="bg-orange" />
    <Template color="bg-purple" name="Purple" utility="bg-purple" />
  </div>
)
