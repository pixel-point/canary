import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsProps } from '../../../../../packages/canary/src/components/tabs'

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    //layout: '',
    docs: {
      description: {
        component: `Tabs component.`
      }
    }
  },
  tags: ['autodocs'],

  argTypes: {
    defaultValue: { control: 'text' },
    variant: { control: 'select', options: ['default', 'underline'] }
  },

  args: {
    variant: 'default',
    defaultValue: '1',
    children: (
      <>
        <TabsList variant="underline">
          <TabsTrigger value="1">Problems</TabsTrigger>
          <TabsTrigger value="2">Solutions</TabsTrigger>
          <TabsTrigger value="3" disabled>
            Disabled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">Problems content</TabsContent>
        <TabsContent value="2">Solutions content</TabsContent>
        <TabsContent value="3">Disabled</TabsContent>
      </>
    ),
    onClick: fn()
  }
}

export default meta

export const Primary: StoryObj<TabsProps> = {
  args: {
    variant: 'default'
  }
}

export const Underline: StoryObj<TabsProps> = {
  args: {
    variant: 'underline'
  }
}

export const Navigation: StoryObj<TabsProps> = {
  args: {
    variant: 'navigation'
  }
}
