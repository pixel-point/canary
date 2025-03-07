import { FC, useCallback, useMemo } from 'react'

import { Button, ListActions, NoData, Pagination, SearchBox, SkeletonTable, Spacer } from '@/components'
import { NoTagsViewProps, RepoTagsListViewProps, SandboxLayout } from '@/views'
import { useDebounceSearch } from '@hooks/use-debounce-search'
import { cn } from '@utils/cn'

import { RepoTagsList } from './components/repo-tags-list'

const NoTagsView: FC<NoTagsViewProps> = ({ searchQuery, onReset, onCreateTag, t, isDirtyList }) => {
  if (searchQuery || isDirtyList) {
    return (
      <NoData
        withBorder
        iconName="no-search-magnifying-glass"
        title={t('views:noData.noResults', 'No search results')}
        description={[
          t('views:noData.checkSpelling', 'Check your spelling and filter options,'),
          t('views:noData.changeSearch', 'or search for a different keyword.')
        ]}
        primaryButton={{
          label: t('views:noData.clearSearch', 'Clear search'),
          onClick: onReset
        }}
      />
    )
  }

  return (
    <div className="flex items-center justify-center py-[232px]">
      <NoData
        iconName="no-data-tags"
        textWrapperClassName="max-w-[360px]"
        title={t('views:noData.noTags', 'No tags yet')}
        description={[
          t(
            'views:noData.noTagsDescription',
            "Your tags will appear here once they're created. Start creating tags to see your work organized."
          )
        ]}
        primaryButton={{
          label: t('views:noData.createNewTag', 'Create new tag.'),
          onClick: onCreateTag
        }}
      />
    </div>
  )
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

  const handleResetFiltersAndPages = useCallback(() => {
    setPage(1)
    setSearchQuery(null)
  }, [setPage, setSearchQuery])

  const isDirtyList = useMemo(() => {
    return page !== 1 || !!searchQuery
  }, [page, searchQuery])

  const shouldShowHeader = useMemo(() => {
    return isLoading || !!tagsList.length || isDirtyList
  }, [isLoading, tagsList.length, isDirtyList])

  const renderListContent = () => {
    if (isLoading) {
      return <SkeletonTable countRows={10} countColumns={4} />
    }

    if (noData) {
      return (
        <NoTagsView
          isDirtyList={isDirtyList}
          searchQuery={searchQuery}
          onReset={handleResetFiltersAndPages}
          onCreateTag={openCreateTagDialog}
          t={t}
        />
      )
    }

    return (
      <RepoTagsList
        onDeleteTag={onDeleteTag}
        useTranslationStore={useTranslationStore}
        useRepoTagsStore={useRepoTagsStore}
        toCommitDetails={toCommitDetails}
        openCreateBranchDialog={openCreateBranchDialog}
      />
    )
  }

  return (
    <SandboxLayout.Main className="max-w-[960px]">
      <SandboxLayout.Content
        paddingClassName="px-0 pt-7 pb-11"
        className={cn({ 'h-full': !isLoading && !tagsList.length && !searchQuery })}
      >
        {shouldShowHeader && (
          <>
            <span className="text-24 font-medium text-foreground-1">{t('views:repos.tags', 'Tags')}</span>
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

        {renderListContent()}

        <Spacer size={5} />
        <Pagination currentPage={page} nextPage={xNextPage} previousPage={xPrevPage} goToPage={setPage} t={t} />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
