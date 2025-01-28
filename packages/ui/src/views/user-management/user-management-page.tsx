import { useMemo } from 'react'

import { Button, Filters, FiltersBar, ListActions, PaginationComponent, SearchBox, Spacer, Text } from '@/components'
import { SandboxLayout } from '@/views'
import { getFilterOptions, getSortDirections, getSortOptions } from '@views/repo/constants/filter-options'
import { useFilters } from '@views/repo/hooks'

import { UserManagementTabs } from './components/tabs'
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
    setSearchQuery,
    activeTab,
    setActiveTab
  } = useAdminListUsersStore()
  const { t } = useTranslationStore()

  const FILTER_OPTIONS = getFilterOptions(t)
  const SORT_OPTIONS = getSortOptions(t)
  const SORT_DIRECTIONS = getSortDirections(t)

  const filterHandlers = useFilters()

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
    <SandboxLayout.Main fullWidth>
      <UserManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} useTranslationStore={useTranslationStore} />
      <SandboxLayout.Content className="mx-auto max-w-[1092px]">
        <Text size={5} weight={'medium'}>
          {t('views:userManagement.usersHeader', 'Users')}{' '}
          <Text size={5} weight={'medium'} color="foreground-4">
            ({filteredUsers?.length || 0})
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
            <Filters filterOptions={FILTER_OPTIONS} sortOptions={SORT_OPTIONS} filterHandlers={filterHandlers} t={t} />
            <Button variant="default" onClick={() => handleDialogOpen(null, DialogLabels.CREATE_USER)}>
              {t('views:userManagement.newUserButton', 'New user')}
            </Button>
          </ListActions.Right>
        </ListActions.Root>
        <FiltersBar
          filterOptions={FILTER_OPTIONS}
          sortOptions={SORT_OPTIONS}
          sortDirections={SORT_DIRECTIONS}
          filterHandlers={filterHandlers}
          t={t}
        />
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
