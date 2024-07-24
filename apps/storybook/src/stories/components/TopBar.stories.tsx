/// <reference types="vite-plugin-svgr/client" />
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Topbar from '../../components/layout/TopBar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@harnessio/canary'
import { GitnessTopBarRightList } from './HorizontalList.stories'

export default {
  title: 'Components/App Shell/Top Bar',
  component: Topbar.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a top bar component inside a container, docked to top of screen`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: StoryFn = () => (
  <Topbar.Root>
    <Topbar.Left>
      <p>Breadcrumbs</p>
    </Topbar.Left>
    <Topbar.Right>
      <p>Right actions</p>
    </Topbar.Right>
  </Topbar.Root>
)

const GitnessTemplate: StoryFn = () => (
  <Topbar.Root>
    <Topbar.Left>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">harness-next</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="font-thin">&nbsp;/&nbsp;</BreadcrumbSeparator>
          <BreadcrumbPage>
            <BreadcrumbLink href="/components">pipeline.yml</BreadcrumbLink>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    </Topbar.Left>
    <Topbar.Right>
      <GitnessTopBarRightList />
    </Topbar.Right>
  </Topbar.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const GitnessTopBar = GitnessTemplate.bind({})
GitnessTemplate.args = {}
