import { FiltersBar, PaginationComponent, Spacer } from '@/components'
import { generateAlphaNumericHash } from '@/utils/utils'
import { SandboxLayout } from '@/views'
import { EmptyState } from '@/views/user-management/components/empty-state'
import { Actions } from '@/views/user-management/components/page-components/actions'
import { UsersList } from '@/views/user-management/components/page-components/content/components/users-list'
import { ContentProps } from '@/views/user-management/components/page-components/content/types'
import { Header } from '@/views/user-management/components/page-components/header'
import { DialogLabels, UsersProps } from '@/views/user-management/types'
import { useDialogs } from '@views/user-management/context/dialogs'

export const Content = ({
  userData,
  filteredUsers,
  searchQuery,
  handleSearch,
  filterOptions,
  sortOptions,
  sortDirections,
  filterHandlers,
  totalPages,
  currentPage,
  setPage,
  useTranslationStore,
  useAdminListUsersStore
}: ContentProps) => {
  const { t } = useTranslationStore()
  const { openDialog } = useDialogs()
  const { setUser, setPassword, setGeteneratePassword } = useAdminListUsersStore()

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
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        filterHandlers={filterHandlers}
        useTranslationStore={useTranslationStore}
      />
      <FiltersBar
        filterOptions={filterOptions}
        sortOptions={sortOptions}
        sortDirections={sortDirections}
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
