import { IUserManagementPageProps, SandboxLayout } from '@views/index'
import { Dialogs } from '@views/user-management/components/dialogs'
import { Content } from '@views/user-management/components/page-components/content'
import { UserManagementTabs } from '@views/user-management/components/tabs/tabs'
import { useUserManagementStore } from '@views/user-management/providers/StoreProvider'
import { filterItems } from '@views/user-management/utils'

export const UserManagementPageContent = ({
  handlers,
  loadingStates,
  errorStates
}: Omit<IUserManagementPageProps, 'useAdminListUsersStore' | 'useTranslationStore'>) => {
  const { useAdminListUsersStore } = useUserManagementStore()

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredUsers = filterItems(userData, searchQuery)

  return (
    <SandboxLayout.Main fullWidth>
      <UserManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content
        userData={userData}
        filteredUsers={filteredUsers}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        totalPages={totalPages}
        currentPage={currentPage}
        setPage={setPage}
      />
      <Dialogs handlers={handlers} loadingStates={loadingStates} errorStates={errorStates} />
    </SandboxLayout.Main>
  )
}
