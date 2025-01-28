import { Button, Filters, ListActions, SearchBox } from '@/components'
import { ActionsProps } from '@/views/user-management/components/page-components/actions/types'
import { DialogLabels } from '@/views/user-management/types'

export const Actions = ({
  searchQuery,
  handleSearch,
  handleDialogOpen,
  filterOptions,
  sortOptions,
  filterHandlers,
  useTranslationStore
}: ActionsProps) => {
  const { t } = useTranslationStore()

  return (
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
        <Filters filterOptions={filterOptions} sortOptions={sortOptions} filterHandlers={filterHandlers} t={t} />
        <Button variant="default" onClick={() => handleDialogOpen(null, DialogLabels.CREATE_USER)}>
          {t('views:userManagement.newUserButton', 'New user')}
        </Button>
      </ListActions.Right>
    </ListActions.Root>
  )
}
