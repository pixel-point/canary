import { FC } from 'react'

import { Button, ListActions, PaginationComponent, SearchBox, Spacer } from '@/components'
import { useDebounceSearch } from '@/hooks'
import { SandboxLayout } from '@/views'

import { UsersList } from './components/users-list'
import { DialogLabels, IUserManagementPageProps, UsersProps } from './types'

export const UserManagementPage: FC<IUserManagementPageProps> = ({
  searchQuery,
  setSearchQuery,
  useAdminListUsersStore,
  useTranslationStore,
  handleDialogOpen
}) => {
  const { users: userData, totalPages, page: currentPage, setPage } = useAdminListUsersStore()
  const { t } = useTranslationStore()

  const { search, handleSearchChange } = useDebounceSearch({
    handleChangeSearchValue: (val: string) => setSearchQuery(val.length ? val : null),
    searchValue: searchQuery || ''
  })

  // TODO: need to use handleResetSearch() from useDebounceSearch

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content maxWidth="3xl">
        {/*<Spacer size={10} />*/}

        <h1 className="text-24 font-medium text-foreground-1">{t('views:userManagement.users', 'Users')}</h1>

        <Spacer size={10} />

        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root
              width="full"
              className="max-w-96"
              value={search}
              handleChange={handleSearchChange}
              placeholder={t('views:repos.search', 'Search')}
            />
          </ListActions.Left>
          <ListActions.Right>
            <Button
              variant="default"
              onClick={() => {
                handleDialogOpen(null, DialogLabels.CREATE_USER)
              }}
            >
              {t('views:userManagement.newUser', 'New user')}
            </Button>
          </ListActions.Right>
        </ListActions.Root>

        <Spacer size={5} />

        <UsersList
          users={userData as UsersProps[]}
          handleDialogOpen={handleDialogOpen}
          useTranslationStore={useTranslationStore}
        />

        <Spacer size={8} />

        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={(pageNum: number) => setPage(pageNum)}
          t={t}
        />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
