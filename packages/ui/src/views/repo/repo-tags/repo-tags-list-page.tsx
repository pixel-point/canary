import { FC, useMemo } from 'react'

import { Button, ListActions, NoData, Pagination, SearchBox, SkeletonTable, Spacer, StackedList } from '@/components'
import { RepoTagsStore, SandboxLayout, TranslationStore } from '@/views'
import { useDebounceSearch } from '@hooks/use-debounce-search'

import { RepoTagsList } from './components/repo-tags-list'

interface RepoTagsListViewProps {
  useTranslationStore: () => TranslationStore
  isLoading: boolean
  openCreateBranchDialog: () => void
  openCreateTagDialog: () => void
  searchQuery: string
  setSearchQuery: (value: string | null) => void
  onDeleteTag: (tagName: string) => void
  useRepoTagsStore: () => RepoTagsStore
  toCommitDetails?: ({ sha }: { sha: string }) => string
}

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
  const noData = !(tagsList && tagsList.length > 0)

  const { search, handleSearchChange } = useDebounceSearch({
    handleChangeSearchValue: setSearchQuery,
    searchValue: searchQuery || ''
  })

  const handleResetFiltersAndPages = () => {
    setPage(1)
    setSearchQuery(null)
  }

  const isDirtyList = useMemo(() => {
    return page !== 1 || !!searchQuery
  }, [page, searchQuery])

  const renderListContent = () => {
    if (isLoading) {
      return <SkeletonTable countRows={10} countColumns={4} />
    } else if (noData) {
      return searchQuery ? (
        <StackedList.Root className="grow place-content-center">
          <div className="flex items-center justify-center">
            <NoData
              iconName="no-search-magnifying-glass"
              title={t('views:noData.noResults', 'No search results')}
              description={[
                t('views:noData.checkSpelling', 'Check your spelling and filter options,'),
                t('views:noData.changeSearch', 'or search for a different keyword.')
              ]}
              primaryButton={{
                label: t('views:noData.clearSearch', 'Clear search'),
                onClick: handleResetFiltersAndPages
              }}
            />
          </div>
        </StackedList.Root>
      ) : (
        <div className="m-auto flex items-center justify-center">
          <NoData
            iconName="no-data-tags"
            title="No tags yet"
            description={[
              t('views:noData.noTags', 'There are no tags in this project yet.'),
              t('views:noData.createNewTag', 'Create a new Tag.')
            ]}
            primaryButton={{
              label: 'Create tag',
              onClick: openCreateTagDialog
            }}
          />
        </div>
      )
    }
    return (
      <RepoTagsList
        isLoading={isLoading}
        onDeleteTag={onDeleteTag}
        useTranslationStore={useTranslationStore}
        useRepoTagsStore={useRepoTagsStore}
        toCommitDetails={toCommitDetails}
        openCreateBranchDialog={openCreateBranchDialog}
      />
    )
  }

  return (
    <SandboxLayout.Main>
      <SandboxLayout.Content>
        {(isLoading || !!tagsList.length || isDirtyList) && (
          <>
            <h1 className="text-cn-foreground-1 mb-6 text-2xl font-medium">{t('views:repos.tags', 'Tags')}</h1>

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

            <Spacer size={5} />
          </>
        )}
        {renderListContent()}

        <Spacer size={5} />
        <Pagination currentPage={page} nextPage={xNextPage} previousPage={xPrevPage} goToPage={setPage} t={t} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
