import { FiltersBar, PaginationComponent, Spacer } from '@/components'
import { SandboxLayout } from '@/views'

import { DialogLabels } from '../../../types'
import { EmptyState } from '../../empty-state'
import { UsersList } from '../../users-list'
import { Actions } from '../actions'
import { Header } from '../header'
import { ContentProps } from './types'

export const Content = ({
  userData,
  filteredUsers,
  searchQuery,
  handleSearch,
  handleDialogOpen,
  filterOptions,
  sortOptions,
  sortDirections,
  filterHandlers,
  totalPages,
  currentPage,
  setPage,
  useTranslationStore
}: ContentProps) => {
  const { t } = useTranslationStore()

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
