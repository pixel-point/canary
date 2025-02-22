import { FC } from 'react'

import { NoData, Pagination, SkeletonList, Spacer, Text } from '@/components'
import {
  BranchSelector,
  BranchSelectorListItem,
  BranchSelectorTab,
  CommitsList,
  IBranchSelectorStore,
  SandboxLayout,
  TranslationStore,
  TypesCommit
} from '@/views'

export interface RepoCommitsViewProps {
  isFetchingCommits: boolean
  commitsList?: TypesCommit[] | null
  xNextPage: number
  xPrevPage: number
  page: number
  setPage: (page: number) => void
  selectBranchOrTag: (branchTag: BranchSelectorListItem, type: BranchSelectorTab) => void
  useTranslationStore: () => TranslationStore
  useRepoBranchesStore: () => IBranchSelectorStore
  searchQuery: string
  setSearchQuery: (query: string) => void
  toCommitDetails?: ({ sha }: { sha: string }) => string
  toCode?: ({ sha }: { sha: string }) => string
}

export const RepoCommitsView: FC<RepoCommitsViewProps> = ({
  isFetchingCommits,
  commitsList,
  xNextPage,
  xPrevPage,
  page,
  setPage,
  selectBranchOrTag,
  useTranslationStore,
  useRepoBranchesStore,
  searchQuery,
  setSearchQuery,
  toCommitDetails,
  toCode
}) => {
  const { t } = useTranslationStore()

  const isDirtyList = page !== 1

  const handleResetFiltersAndPages = () => {
    setPage(1)
  }

  return (
    <SandboxLayout.Main fullWidth>
      <SandboxLayout.Content>
        <Text size={5} weight={'medium'}>
          Commits
        </Text>
        <Spacer size={6} />
        <div className="flex justify-between gap-5">
          <BranchSelector
            onSelectBranch={selectBranchOrTag}
            useRepoBranchesStore={useRepoBranchesStore}
            useTranslationStore={useTranslationStore}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <Spacer size={5} />

        {isFetchingCommits ? (
          <SkeletonList />
        ) : (
          <>
            {!commitsList?.length ? (
              <NoData
                withBorder
                textWrapperClassName="max-w-[350px]"
                iconName={isDirtyList ? 'no-search-magnifying-glass' : 'no-data-commits'}
                title={
                  isDirtyList
                    ? t('views:noData.noCommitsHistory', 'No commits history')
                    : t('views:noData.noCommitsYet', 'No commits yet')
                }
                description={[
                  isDirtyList
                    ? t(
                        'views:noData.noCommitsHistoryDescription',
                        "There isn't any commit history to show here for the selected user, time range, or current page."
                      )
                    : t(
                        'views:noData.noCommitsYetDescription',
                        "Your commits will appear here once they're made. Start committing to see your changes reflected."
                      )
                ]}
                primaryButton={
                  isDirtyList
                    ? {
                        label: t('views:noData.clearFilters', 'Clear filters'),
                        onClick: handleResetFiltersAndPages
                      }
                    : // TODO: add onClick for Creating new commit
                      {
                        label: t('views:commits.createNewCommit', 'Create new commit')
                      }
                }
              />
            ) : (
              <>
                <CommitsList data={commitsList} toCode={toCode} toCommitDetails={toCommitDetails} />
                <Pagination
                  className="pl-[26px]"
                  nextPage={xNextPage}
                  previousPage={xPrevPage}
                  currentPage={page}
                  goToPage={setPage}
                  t={t}
                />
              </>
            )}
          </>
        )}
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
