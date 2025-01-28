import { Tabs, TabsList, TabsTrigger } from '@/components'
import { SandboxLayout } from '@/views'
import { EActiveTab } from '@/views/user-management/types'

import { useUserManagementStore } from '../../providers/StoreProvider'

export const UserManagementTabs = ({
  activeTab,
  setActiveTab
}: {
  activeTab: EActiveTab
  setActiveTab: (value: EActiveTab) => void
}) => {
  const { useTranslationStore } = useUserManagementStore()

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
