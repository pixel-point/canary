import { Tabs, TabsList, TabsTrigger } from '@/components'
import { SandboxLayout, TranslationStore } from '@/views'

import { EActiveTab } from '../types'

const UserManagementTabs = ({
  activeTab,
  setActiveTab,
  useTranslationStore
}: {
  activeTab: EActiveTab
  setActiveTab: (value: EActiveTab) => void
  useTranslationStore: () => TranslationStore
}) => {
  const { t } = useTranslationStore()
  return (
    <SandboxLayout.SubHeader className="h-[44px] overflow-hidden">
      <Tabs
        variant="tabnav"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value as EActiveTab)
        }}
      >
        <TabsList fontSize="xs">
          <TabsTrigger value={EActiveTab.ACTIVE}>{t('views:userManagement.tabs.active', 'Active users')}</TabsTrigger>
          <TabsTrigger value={EActiveTab.INACTIVE}>
            {t('views:userManagement.tabs.inactive', 'Pending users')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </SandboxLayout.SubHeader>
  )
}

export { UserManagementTabs }
