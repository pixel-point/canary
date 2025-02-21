import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Tabs } from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'

export const ProfileSettingsTabNav = ({
  activeTab,
  useTranslationStore
}: {
  activeTab: string
  useTranslationStore: () => TranslationStore
}) => {
  const { t } = useTranslationStore()
  const navigate = useNavigate()

  const makeHandleTabChange = useCallback((tab: string) => () => navigate(tab), [navigate])

  return (
    <SandboxLayout.SubHeader className="h-11 overflow-hidden">
      <Tabs.Root variant="navigation" value={activeTab}>
        <Tabs.List fontSize="xs">
          <Tabs.Trigger role="link" value="general" onClick={makeHandleTabChange('general')}>
            {t('views:profileSettings.generalTab', 'General')}
          </Tabs.Trigger>
          <Tabs.Trigger role="link" value="keys" onClick={makeHandleTabChange('keys')}>
            {t('views:profileSettings.keysTab', 'Keys and Tokens')}
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </SandboxLayout.SubHeader>
  )
}
