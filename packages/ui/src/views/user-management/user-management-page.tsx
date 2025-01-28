import { SandboxLayout } from '@/views'
import { Dialogs } from '@/views/user-management/components/dialogs'
import { Content } from '@/views/user-management/components/page-components/content'
import { UserManagementTabs } from '@/views/user-management/components/tabs'
import { useUserManagement } from '@/views/user-management/hooks/use-user-management'
import { IUserManagementPageProps } from '@/views/user-management/types'
import { getFilterOptions, getSortDirections, getSortOptions } from '@views/repo/constants/filter-options'
import { useFilters } from '@views/repo/hooks'
import { DialogsProvider } from '@views/user-management/providers/DialogsProvider'

export const UserManagementPage: React.FC<IUserManagementPageProps> = ({
  useAdminListUsersStore,
  useTranslationStore,
  handlers,
  loadingStates,
  errorStates
}) => {
  const {
    users: userData,
    totalPages,
    page: currentPage,
    setPage,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab
  } = useAdminListUsersStore()
  const { t } = useTranslationStore()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const { filteredUsers } = useUserManagement(userData, searchQuery)

  const FILTER_OPTIONS = getFilterOptions(t)
  const SORT_OPTIONS = getSortOptions(t)
  const SORT_DIRECTIONS = getSortDirections(t)

  const filterHandlers = useFilters()

  return (
    <DialogsProvider>
      <SandboxLayout.Main fullWidth>
        <UserManagementTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          useTranslationStore={useTranslationStore}
        />
        <Content
          userData={userData}
          filteredUsers={filteredUsers}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          filterOptions={FILTER_OPTIONS}
          sortOptions={SORT_OPTIONS}
          sortDirections={SORT_DIRECTIONS}
          filterHandlers={filterHandlers}
          totalPages={totalPages}
          currentPage={currentPage}
          setPage={setPage}
          useTranslationStore={useTranslationStore}
          useAdminListUsersStore={useAdminListUsersStore}
        />
        <Dialogs
          useAdminListUsersStore={useAdminListUsersStore}
          handlers={handlers}
          loadingStates={loadingStates}
          errorStates={errorStates}
        />
      </SandboxLayout.Main>
    </DialogsProvider>
  )
}
