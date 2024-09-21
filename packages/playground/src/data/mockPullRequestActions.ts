import { noop } from 'lodash-es'

export const mockPullRequestActions = [
  {
    id: '0',
    title: 'Action 1',
    description: 'This is a description of action 1',
    action: noop
  },
  {
    id: '1',
    title: 'Action 2',
    description: 'This is a description of action 2',
    action: noop
  },
  {
    id: '2',
    title: 'Action 3',
    description: 'This is a description of action 3',
    action: noop
  }
]
