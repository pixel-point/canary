import { Outlet } from 'react-router-dom'

import { ContentLayoutWithSidebar, TranslationStore } from '@/views'
import { TFunction } from 'i18next'

const getNavItems = (t: TFunction) => [
  {
    groupId: 0,
    title: t('views:repos.general', 'Webhook Settings'),
    items: [
      { id: 0, title: t('views:repos.details', 'Details'), to: 'details' },
      { id: 1, title: t('views:repos.executions', 'Executions'), to: 'executions' }
    ]
  }
]

export function WebhookSettingsLayout({ useTranslationStore }: { useTranslationStore: () => TranslationStore }) {
  const { t } = useTranslationStore()

  return (
    <ContentLayoutWithSidebar sidebarMenu={getNavItems(t)} sidebarOffsetTop={100} sidebarViewportClassName="pt-7">
      <Outlet />
    </ContentLayoutWithSidebar>
  )
}
