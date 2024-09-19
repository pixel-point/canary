import { IconProps } from '@harnessio/canary'

export const navbarSubmenuData: {
  groupId: number
  title: string
  items: { id: number; iconName: IconProps['name']; title: string; description: string }[]
}[] = [
  {
    groupId: 0,
    title: 'DevOps Modernization',
    items: [
      {
        id: 0,
        iconName: 'sub-rocket',
        title: 'Continuous Delivery & GitOps',
        description: 'App to production with no scripts.'
      },
      {
        id: 1,
        iconName: 'sub-socket',
        title: 'Continuous Integration',
        description: 'Up to 4X faster than other solutions.'
      },
      {
        id: 2,
        iconName: 'sub-flag',
        title: 'Feature Flags',
        description: 'Optimize feature rollout velocity.'
      },
      {
        id: 3,
        iconName: 'sub-infra',
        title: 'Infrastructure as Code Management',
        description: 'Manage all your infrastructure.'
      },
      {
        id: 4,
        iconName: 'sub-chaos',
        title: 'Chaos Engineering',
        description: 'Validate service resilience.'
      },
      {
        id: 5,
        iconName: 'sub-reliability',
        title: 'Service Reliability Management',
        description: 'SLO configuration and service reliability.'
      }
    ]
  },
  {
    groupId: 1,
    title: 'Developer Experience',
    items: [
      {
        id: 0,
        iconName: 'sub-folder',
        title: 'Internal Developer Portal',
        description: 'Built for developers, onboard in minutes.'
      },
      {
        id: 1,
        iconName: 'sub-repository',
        title: 'Code Repository',
        description: 'Integrated & familiar git experience.'
      },
      {
        id: 2,
        iconName: 'sub-insights',
        title: 'Software Engineering Insights',
        description: 'Actionable insights on SDLC.'
      }
    ]
  },
  {
    groupId: 2,
    title: 'Secure Software Delivery',
    items: [
      {
        id: 0,
        iconName: 'sub-chain',
        title: 'Software Supply Chain Assurance',
        description: 'Artifact integrity and governance.'
      },
      {
        id: 1,
        iconName: 'sub-shield',
        title: 'Security Testing Orchestration',
        description: 'Shift left security testing.'
      }
    ]
  },
  {
    groupId: 3,
    title: 'Cloud Cost Optimization',
    items: [
      {
        id: 0,
        iconName: 'sub-cloud',
        title: 'Cloud Cost Management',
        description: 'Intelligent cost management.'
      }
    ]
  }
]
