import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ProjectSwitcher from '../../composites/ProjectSwitcher'

export default {
  title: 'Components/Composites/Project Switcher',
  component: ProjectSwitcher.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Project switching component, with ability to choose an existing project or add a new one.`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn = () => (
  <ProjectSwitcher.Root>
    <p>Project switcher</p>
  </ProjectSwitcher.Root>
)

const GitnessTemplate: StoryFn = () => (
  <ProjectSwitcher.Root>
    <p>Project switcher</p>
  </ProjectSwitcher.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessProjectSwitcher = GitnessTemplate.bind({})
GitnessProjectSwitcher.args = {}
