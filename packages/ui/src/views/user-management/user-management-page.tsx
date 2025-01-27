import { useMemo } from 'react'

import { Button, ListActions, PaginationComponent, SearchBox, Spacer, Text } from '@/components'
import { SandboxLayout } from '@/views'

import { UsersList } from './components/users-list'
import { DialogLabels, IUserManagementPageProps, UsersProps } from './types'

export const filterItems = (items: UsersProps[], query: string) => {
  if (!query.trim()) return items

  return items.filter(item => item.display_name?.toLowerCase().includes(query.toLowerCase().trim()))
}

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
    setSearchQuery
  } = useAdminListUsersStore()
  const { t } = useTranslationStore()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  // TODO: Replace with search using query parameter on backend when it's implemented
  const filteredUsers = useMemo(() => {
    return filterItems(userData, searchQuery)
  }, [userData, searchQuery])

  const renderUserListContent = () => {
    return (
      <>
        <UsersList users={filteredUsers} handleDialogOpen={handleDialogOpen} />
      </>
    )
  }

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          {t('views:userManagement.usersHeader', 'Users')}{' '}
          <Text size={5} weight={'medium'} color="foreground-4">
            ({userData?.length || 0})
          </Text>
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root
              className="h-8 max-w-[320px]"
              placeholder={t('views:userManagement.searchPlaceholder', 'Search')}
              value={searchQuery}
              handleChange={handleSearch}
            />
          </ListActions.Left>
          <ListActions.Right>
            <Button variant="default" onClick={() => handleDialogOpen(null, DialogLabels.CREATE_USER)}>
              {t('views:userManagement.newUserButton', 'New user')}
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderUserListContent()}
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
