import { FC, useCallback, useMemo } from 'react'

import { Button, ListActions, Pagination, SearchBox, Spacer } from '@/components'
import { RepoTagsListViewProps, SandboxLayout } from '@/views'
import { useDebounceSearch } from '@hooks/use-debounce-search'
import { cn } from '@utils/cn'

import { RepoTagsList } from './components/repo-tags-list'

export const RepoTagsListView: FC<RepoTagsListViewProps> = ({
  useTranslationStore,
  isLoading,
  openCreateBranchDialog,
  openCreateTagDialog,
  searchQuery,
  setSearchQuery,
  onDeleteTag,
  useRepoTagsStore,
  toCommitDetails
}) => {
  const { t } = useTranslationStore()
  const { tags: tagsList, page, xNextPage, xPrevPage, setPage } = useRepoTagsStore()

  const { search, handleSearchChange } = useDebounceSearch({
    handleChangeSearchValue: setSearchQuery,
    searchValue: searchQuery || ''
  })

  const handleResetFiltersAndPages = useCallback(() => {
    setPage(1)
    setSearchQuery(null)
  }, [setPage, setSearchQuery])

  const isDirtyList = useMemo(() => {
    return page !== 1 || !!searchQuery
  }, [page, searchQuery])

  return (
    <SandboxLayout.Main className="max-w-[1000px]">
      <SandboxLayout.Content className={cn({ 'h-full': !isLoading && !tagsList.length && !searchQuery })}>
        {(isLoading || !!tagsList.length || isDirtyList) && (
          <>
            <span className="text-24 text-foreground-1 font-medium">{t('views:repos.tags', 'Tags')}</span>
            <Spacer size={6} />
            <ListActions.Root>
              <ListActions.Left>
                <SearchBox.Root
                  width="full"
                  className="max-w-80"
                  value={search || ''}
                  handleChange={handleSearchChange}
                  placeholder={t('views:repos.search', 'Search')}
                />
              </ListActions.Left>
              <ListActions.Right>
                <Button variant="default" onClick={openCreateTagDialog}>
                  {t('views:repos.newTag', 'New tag')}
                </Button>
              </ListActions.Right>
            </ListActions.Root>

            <Spacer size={4.5} />
          </>
        )}

        <RepoTagsList
          onDeleteTag={onDeleteTag}
          useTranslationStore={useTranslationStore}
          useRepoTagsStore={useRepoTagsStore}
          toCommitDetails={toCommitDetails}
          openCreateBranchDialog={openCreateBranchDialog}
          isLoading={isLoading}
          isDirtyList={isDirtyList}
          handleResetFiltersAndPages={handleResetFiltersAndPages}
          openCreateTagDialog={openCreateTagDialog}
        />

        <Spacer size={5} />

        {!isLoading && (
          <Pagination currentPage={page} nextPage={xNextPage} previousPage={xPrevPage} goToPage={setPage} t={t} />
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
