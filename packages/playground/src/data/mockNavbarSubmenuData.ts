import type { IconProps } from '@harnessio/canary'

export const navbarSubmenuData: {
  groupId: number
  title: string
  items: {
    id: number
    iconName: IconProps['name']
    title: string
    description: string
    to: string
  }[]
}[] = [
  {
    groupId: 0,
    title: 'Devops',
    items: [
      {
        id: 0,
        iconName: 'repositories-gradient',
        title: 'Repositories',
        description: 'Integrated & familiar git experience.',
        to: '/repos'
      },
      {
        id: 1,
        iconName: 'pipelines-gradient',
        title: 'Pipelines',
        description: 'Up to 4X faster than other solutions.',
        to: '/pipelines'
      },
      {
        id: 2,
        iconName: 'execution-gradient',
        title: 'Executions',
        description: 'Optimize feature rollout velocity.',
        to: '/executions'
      },
      {
        id: 3,
        iconName: 'database-gradient',
        title: 'Databases',
        description: 'Manage all your infrastructure.',
        to: '/databases'
      },
      {
        id: 4,
        iconName: 'artifacts-gradient',
        title: 'Artifacts',
        description: 'Validate service resilience.',
        to: '/sandbox/executions/artifacts'
      },
      {
        id: 5,
        iconName: 'shield-lock',
        title: 'Infrastructure',
        description: 'Manage all your infrastructure.',
        to: '/infrastructure'
      },
      {
        id: 6,
        iconName: 'flag-gradient',
        title: 'Feature Flags',
        description: 'Optimize feature rollout velocity.',
        to: '/feature-flags'
      }
    ]
  },
  {
    groupId: 1,
    title: 'Developer Experience',
    items: [
      {
        id: 7,
        iconName: 'more-folder',
        title: 'Internal Developer Portal',
        description: 'Built for developers, onboard in minutes.',
        to: '/internal-developer-portal'
      },
      {
        id: 8,
        iconName: 'bookmark',
        title: 'Code Repository',
        description: 'Integrated & familiar git experience.',
        to: '/code-repository'
      },
      {
        id: 9,
        iconName: 'search-content',
        title: 'Software Engineering Insights',
        description: 'Actionable insights on SDLC.',
        to: '/software-engineering-insights'
      }
    ]
  },
  {
    groupId: 2,
    title: 'Secure Software Delivery',
    items: [
      {
        id: 10,
        iconName: 'chain',
        title: 'Software Supply Chain Assurance',
        description: 'Artifact integrity and governance.',
        to: '/software-supply-chain-assurance'
      },
      {
        id: 11,
        iconName: 'shield-tick',
        title: 'Security Testing Orchestration',
        description: 'Shift left security testing.',
        to: '/security-testing-orchestration'
      }
    ]
  },
  {
    groupId: 3,
    title: 'Cloud Cost Optimization',
    items: [
      {
        id: 12,
        iconName: 'cloud-mining',
        title: 'Cloud Cost Management',
        description: 'Intelligent cost management.',
        to: '/cloud-cost-management'
      }
    ]
  }
]
