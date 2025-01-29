import { FiltersBar, PaginationComponent, Spacer } from '@/components'
import { SandboxLayout } from '@/views'
import { DialogLabels } from '@/views/user-management/components/dialogs'
import { EmptyState } from '@/views/user-management/components/empty-state'
import { Actions } from '@/views/user-management/components/page-components/actions'
import { UsersList } from '@/views/user-management/components/page-components/content/components/users-list'
import { ContentProps } from '@/views/user-management/components/page-components/content/types'
import { Header } from '@/views/user-management/components/page-components/header'
import { useDialogData } from '@views/user-management/components/dialogs/hooks'
import { getFilterOptions, getSortDirections, getSortOptions } from '@views/user-management/constants/filter-options'
import { useFilters } from '@views/user-management/hooks'
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
  const { useTranslationStore } = useUserManagementStore()

  const { t } = useTranslationStore()

  const { handleDialogOpen } = useDialogData()

  const FILTER_OPTIONS = getFilterOptions(t)
  const SORT_OPTIONS = getSortOptions(t)
  const SORT_DIRECTIONS = getSortDirections(t)

  const filterHandlers = useFilters()

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
