import { FC, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Tabs } from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'

export interface ProjectSettingsTabNavProps {
  useTranslationStore: () => TranslationStore
}

export const ProjectSettingsTabNav: FC<ProjectSettingsTabNavProps> = ({ useTranslationStore }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslationStore()
  const activeTab = location.pathname.split('/').pop() || 'general'

  const makeHandleTabChange = useCallback((tab: string) => () => navigate(tab), [navigate])

  return (
    <SandboxLayout.SubHeader className="h-11 overflow-hidden">
      <Tabs.Root variant="navigation" value={activeTab}>
        <Tabs.List fontSize="xs">
          <Tabs.Trigger role="link" value="general" onClick={makeHandleTabChange('general')}>
            {t('views:projectSettings.tabs.general', 'General')}
          </Tabs.Trigger>
          <Tabs.Trigger role="link" value="members" onClick={makeHandleTabChange('members')}>
            {t('views:projectSettings.tabs.members', 'Members')}
          </Tabs.Trigger>
          <Tabs.Trigger role="link" value="labels" onClick={makeHandleTabChange('labels')}>
            {t('views:projectSettings.tabs.labels', 'Labels')}
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </SandboxLayout.SubHeader>
  )
}
