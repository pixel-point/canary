import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import NavItemPlaceholder from '../../assets/environment-icon.svg?react'
import Navbar from '../../components/layout/navbar'
import NavUserBadge from '../../components/layout/NavUserBadge'
import NavCompanyBadge from '../../components/layout/NavCompanyBadge'
import CompanyAvatar from '../../assets/company-avatar.svg?react'
import RepositoriesIcon from '../../assets/repositories-icon.svg?react'
import PipelinesIcon from '../../assets/pipelines-icon.svg?react'
import ExecutionsIcon from '../../assets/executions-icon.svg?react'
import FeaturedFlagsIcon from '../../assets/featured-flags-icon.svg?react'
import MoreDotsIcon from '../../assets/more-dots-icon.svg?react'
import ChaosEngineeringIcon from '../../assets/chaos-engineering-icon.svg?react'
import EnvironmentIcon from '../../assets/environment-icon.svg?react'
import SecretsIcon from '../../assets/secrets-icon.svg?react'
import ConnectorsIcon from '../../assets/connectors-icon.svg?react'
// import SystemAdministrationIcon from '../../assets/system-administration-icon.svg?react'
import ProjectSwitcher from '../composites/ProjectSwitcher'

export default {
  title: 'Components/Composites/Navbar',
  component: Navbar.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Displays a nav bar that docks to the left side of screen.`
      }
    }
  },
  tags: ['autodocs']
} as Meta

const primaryMenuItems = [
  {
    text: 'Repositories',
    icon: <RepositoriesIcon />
  },
  {
    text: 'Pipelines',
    icon: <PipelinesIcon />
  },
  {
    text: 'Executions',
    icon: <ExecutionsIcon />
  },
  {
    text: 'Featured Flags',
    icon: <FeaturedFlagsIcon />
  }
]

const pinnedMenuItems = [
  {
    text: 'Chaos Engineering',
    icon: <ChaosEngineeringIcon />
  },
  {
    text: 'Environment',
    icon: <EnvironmentIcon />
  },
  {
    text: 'Secrets',
    icon: <SecretsIcon />
  },
  {
    text: 'Connectors',
    icon: <ConnectorsIcon />
  }
]

// const secondaryMenuItems = [
//   {
//     text: 'System Administration',
//     icon: <SystemAdministrationIcon />
//   }
// ]

const sampleProjectList = [
  {
    name: 'Pixel Point',
    avatar: <CompanyAvatar />
  },
  {
    name: 'Harness',
    avatar: <CompanyAvatar />
  },
  {
    name: 'Drone',
    avatar: <CompanyAvatar />
  }
]

const Template: StoryFn = () => (
  <Navbar.Root>
    <Navbar.Header>
      <NavCompanyBadge avatar={<CompanyAvatar />} name="Company name">
        <p className="text-sm text-primary">Menu component</p>
      </NavCompanyBadge>
    </Navbar.Header>
    <Navbar.Content>
      <Navbar.Group>
        <Navbar.Item text="Link 1" icon={<NavItemPlaceholder />} />
        <Navbar.Item text="Link 2" icon={<NavItemPlaceholder />} active />
      </Navbar.Group>
      <Navbar.AccordionGroup title="Group accordion name">
        <Navbar.Item text="Link 3" icon={<NavItemPlaceholder />} />
      </Navbar.AccordionGroup>
      <Navbar.Group topBorder>
        <Navbar.Item text="Link 4" icon={<NavItemPlaceholder />} />
      </Navbar.Group>
    </Navbar.Content>
    <Navbar.Footer>
      <NavUserBadge />
    </Navbar.Footer>
  </Navbar.Root>
)

const GitnessTemplate: StoryFn = () => (
  <Navbar.Root>
    <Navbar.Header>
      <NavCompanyBadge avatar={<CompanyAvatar />} name="Pixel Point">
        <ProjectSwitcher.Root>
          <ProjectSwitcher.List>
            {sampleProjectList.map(p => {
              return (
                <ProjectSwitcher.Item>
                  <ProjectSwitcher.ItemAvatar>{p.avatar}</ProjectSwitcher.ItemAvatar>
                  <ProjectSwitcher.ItemTitle>{p.name}</ProjectSwitcher.ItemTitle>
                  <ProjectSwitcher.ItemAction>Edit</ProjectSwitcher.ItemAction>
                </ProjectSwitcher.Item>
              )
            })}
          </ProjectSwitcher.List>
          <ProjectSwitcher.AddNew />
        </ProjectSwitcher.Root>
      </NavCompanyBadge>
    </Navbar.Header>
    <Navbar.Content>
      <Navbar.Group>
        {primaryMenuItems.map((item, idx) => (
          <Navbar.Item key={idx} text={item.text} icon={item.icon} active={idx === 1} />
        ))}
        <Navbar.Item text="More" icon={<MoreDotsIcon />} onClick={() => {}} />
      </Navbar.Group>
      <Navbar.AccordionGroup title="Pinned">
        {pinnedMenuItems.map((item, idx) => (
          <Navbar.Item key={idx} text={item.text} icon={item.icon} />
        ))}
      </Navbar.AccordionGroup>
    </Navbar.Content>
    <Navbar.Footer>
      <NavUserBadge />
    </Navbar.Footer>
  </Navbar.Root>
)

export const GitnessNavbar = GitnessTemplate.bind({})
GitnessTemplate.args = {}

export const Default = Template.bind({})
Default.args = {}
