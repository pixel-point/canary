import { FiltersBar, PaginationComponent, Spacer } from '@/components'
import { generateAlphaNumericHash } from '@/utils/utils'
import { SandboxLayout } from '@/views'
import { EmptyState } from '@/views/user-management/components/empty-state'
import { Actions } from '@/views/user-management/components/page-components/actions'
import { UsersList } from '@/views/user-management/components/page-components/content/components/users-list'
import { ContentProps } from '@/views/user-management/components/page-components/content/types'
import { Header } from '@/views/user-management/components/page-components/header'
import { DialogLabels, UsersProps } from '@/views/user-management/types'
import { getFilterOptions, getSortDirections, getSortOptions } from '@views/repo/constants/filter-options'
import { useFilters } from '@views/repo/hooks'
import { useDialogs } from '@views/user-management/providers/DialogsProvider'
import { useUserManagementStore } from '@views/user-management/providers/StoreProvider'

export const Content = ({
  userData,
  filteredUsers,
  searchQuery,
  handleSearch,
  totalPages,
  currentPage,
  setPage
}: ContentProps) => {
  const { useAdminListUsersStore, useTranslationStore } = useUserManagementStore()

  const { setUser, setPassword, setGeteneratePassword } = useAdminListUsersStore()
  const { t } = useTranslationStore()

  const { openDialog } = useDialogs()

  const FILTER_OPTIONS = getFilterOptions(t)
  const SORT_OPTIONS = getSortOptions(t)
  const SORT_DIRECTIONS = getSortDirections(t)

  const filterHandlers = useFilters()

  const prepareDialogData = (user: UsersProps | null, dialogType: DialogLabels) => {
    if (user) setUser(user)

    if (dialogType === DialogLabels.RESET_PASSWORD) {
      setGeteneratePassword(false)
      setPassword(generateAlphaNumericHash(10))

      return
    }

    if (dialogType === DialogLabels.CREATE_USER) {
      setGeteneratePassword(true)
      setPassword(generateAlphaNumericHash(10))

      return
    }
  }

  const handleDialogOpen = (user: UsersProps | null, dialogType: DialogLabels) => {
    prepareDialogData(user, dialogType)
    openDialog(dialogType)
  }

  if (!userData?.length) {
    return <EmptyState t={t} onButtonClick={() => handleDialogOpen(null, DialogLabels.CREATE_USER)} />
  }

  return (
    <SandboxLayout.Content className="mx-auto max-w-[1092px]">
      <Header usersCount={filteredUsers?.length} useTranslationStore={useTranslationStore} />
      <Actions
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleDialogOpen={handleDialogOpen}
        filterOptions={FILTER_OPTIONS}
        sortOptions={SORT_OPTIONS}
        filterHandlers={filterHandlers}
        useTranslationStore={useTranslationStore}
      />
      <FiltersBar
        filterOptions={FILTER_OPTIONS}
        sortOptions={SORT_OPTIONS}
        sortDirections={SORT_DIRECTIONS}
        filterHandlers={filterHandlers}
        t={t}
      />
      <Spacer size={5} />
      <UsersList users={filteredUsers} handleDialogOpen={handleDialogOpen} />
      <Spacer size={8} />
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={(pageNum: number) => setPage(pageNum)}
        t={t}
      />
    </SandboxLayout.Content>
  )
}
