import { WebhookState } from '../components/webhook-list'

export const mockWebhooks = [
  {
    id: 0,
    status: WebhookState.ENABLED,
    name: 'Test-1',
    description: 'All events',
    timestamp: '1723478906498'
  },
  {
    id: 1,
    status: WebhookState.ENABLED,
    name: 'Test-2',
    description: 'All events',
    timestamp: '1723478906498'
  },
  {
    id: 2,
    status: WebhookState.ENABLED,
    name: 'Test-3',
    description: 'Branch updated, Tag deleted, PR created, PR closed, PR merged',
    timestamp: '1723478906498'
  },
  {
    id: 3,
    status: WebhookState.DISABLED,
    name: 'Test-4',
    description: 'All events',
    timestamp: '1723478906498'
  }
]
