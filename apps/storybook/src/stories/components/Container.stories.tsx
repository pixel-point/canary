/// <reference types="vite-plugin-svgr/client" />
import { Meta, Story } from '@storybook/react'
import Container from '../../components/layout/container'
import { GitnessNavbar } from './NavBar.stories'
import { GitnessTopBar } from './TopBar.stories'
import { GitnessBottomBar } from './BottomBar.stories'
import { GitnessContent } from './Content.stories'

export default {
  title: 'Components/Container',
  component: Container.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a container that wraps other layout components`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const Template: Story = () => (
  <Container.Root>
    <Container.Sidebar>
      <GitnessNavbar />
    </Container.Sidebar>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.Content>
        <GitnessContent />
      </Container.Content>
      <Container.Bottombar>
        <GitnessBottomBar />
      </Container.Bottombar>
    </Container.Main>
  </Container.Root>
)

const NoSidebarTemplate: Story = () => (
  <Container.Root>
    <Container.Main>
      <Container.Topbar>
        <GitnessTopBar />
      </Container.Topbar>
      <Container.Content>
        <GitnessContent />
      </Container.Content>
      <Container.Bottombar>
        <GitnessBottomBar />
      </Container.Bottombar>
    </Container.Main>
  </Container.Root>
)

const ContentOnlyTemplate: Story = () => (
  <Container.Root>
    <Container.Main>
      <Container.Content>
        <p>Content only</p>
      </Container.Content>
    </Container.Main>
  </Container.Root>
)

const CenteredContentOnlyTemplate: Story = () => (
  <Container.Root>
    <Container.Main>
      <Container.CenteredContent>
        <p>Centered content only</p>
      </Container.CenteredContent>
    </Container.Main>
  </Container.Root>
)

export const Default = Template.bind({})
Default.args = {}

export const NoSidebar = NoSidebarTemplate.bind({})
NoSidebarTemplate.args = {}

export const ContentOnly = ContentOnlyTemplate.bind({})
ContentOnlyTemplate.args = {}

export const CenteredContentOnly = CenteredContentOnlyTemplate.bind({})
ContentOnlyTemplate.args = {}
