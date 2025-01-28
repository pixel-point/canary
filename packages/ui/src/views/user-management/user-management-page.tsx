import { getFilterOptions, getSortDirections, getSortOptions } from '@views/repo/constants/filter-options'
import { useFilters } from '@views/repo/hooks'

import { SandboxLayout } from '..'
import { Content } from './components/page-components/content'
import { UserManagementTabs } from './components/tabs'
import { useUserManagement } from './hooks/use-user-management'
import { IUserManagementPageProps } from './types'

export const UserManagementPage: React.FC<IUserManagementPageProps> = ({
  useAdminListUsersStore,
  useTranslationStore,
  handleDialogOpen
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
    <SandboxLayout.Main fullWidth>
      <UserManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} useTranslationStore={useTranslationStore} />
      <Content
        userData={userData}
        filteredUsers={filteredUsers}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleDialogOpen={handleDialogOpen}
        filterOptions={FILTER_OPTIONS}
        sortOptions={SORT_OPTIONS}
        sortDirections={SORT_DIRECTIONS}
        filterHandlers={filterHandlers}
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
        useTranslationStore={useTranslationStore}
      />
    </SandboxLayout.Main>
  )
}
