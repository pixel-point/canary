import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { parseAsInteger, useQueryState } from 'nuqs'
import { SkeletonList, NoData, SandboxLayout, BranchesList, Filter, useCommonFilter } from '@harnessio/playground'
import { Button, Spacer, Text } from '@harnessio/canary'
import {
  useListBranchesQuery,
  RepoBranch,
  useCalculateCommitDivergenceMutation,
  useFindRepositoryQuery,
  ListBranchesQueryQueryParams
} from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { PageResponseHeader, orderSortDate } from '../../types'
import { timeAgoFromISOTime } from '../pipeline-edit/utils/time-utils'
import { NoSearchResults, PaginationComponent } from '../../../../../packages/playground/dist'
import { PathParams } from '../../RouteDefinitions'

const sortOptions = [
  { name: 'Date', value: 'date' },
  { name: 'Name', value: 'name' }
]

export function RepoSandboxBranchesListPage() {
  const repoRef = useGetRepoRef()
  const { spaceId, repoId } = useParams<PathParams>()

  const { data: { body: repoMetadata } = {} } = useFindRepositoryQuery({ repo_ref: repoRef })

  const { query: currentQuery, sort } = useCommonFilter<ListBranchesQueryQueryParams['sort']>()

  const [query, _] = useQueryState('query', { defaultValue: currentQuery || '' })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { isLoading, data: { body: branches, headers } = {} } = useListBranchesQuery({
    queryParams: { page, sort, query, order: orderSortDate.DESC, include_commit: true },
    repo_ref: repoRef
  })

  const xNextPage = parseInt(headers?.get(PageResponseHeader.xNextPage) || '')
  const xPrevPage = parseInt(headers?.get(PageResponseHeader.xPrevPage) || '')

  const { data: { body: branchDivergence = [] } = {}, mutate } = useCalculateCommitDivergenceMutation({
    repo_ref: repoRef
  })

  useEffect(() => {
    if (branches?.length !== 0 && branches !== undefined) {
      mutate({
        body: {
          requests: branches?.map(branch => ({ from: branch.name, to: repoMetadata?.default_branch })) || []
        }
      })
    }
  }, [mutate, branches, repoMetadata?.default_branch])

  const renderListContent = () => {
    if (isLoading) return <SkeletonList />

    if (!branches?.length) {
      if (query) {
        return (
          <NoSearchResults
            iconName="no-search-magnifying-glass"
            title="No search results"
            description={['Check your spelling and filter options,', 'or search for a different keyword.']}
            primaryButton={{ label: 'Clear search' }}
            secondaryButton={{ label: 'Clear filters' }}
          />
        )
      }
      return (
        <NoData
          iconName="no-data-branches"
          title="No branches yet"
          description={[
            "Your branches will appear here once they're created.",
            'Start branching to see your work organized.'
          ]}
          primaryButton={{ label: 'Create new branch' }}
        />
      )
    }

    //get the data arr from behindAhead
    const behindAhead =
      branchDivergence?.map(divergence => {
        return {
          behind: divergence.behind,
          ahead: divergence.ahead
        }
      }) || []

    return (
      <BranchesList
        defaultBranch={repoMetadata?.default_branch}
        repoId={repoId}
        spaceId={spaceId}
        branches={branches?.map((branch: RepoBranch, index) => {
          const { ahead: branchAhead, behind: branchBehind } = behindAhead[index] || {}
          return {
            id: index,
            name: branch.name || '',
            sha: branch.commit?.sha || '',
            timestamp: branch.commit?.committer?.when ? timeAgoFromISOTime(branch.commit.committer.when) : '',
            user: {
              name: branch.commit?.committer?.identity?.name || '',
              avatarUrl: ''
            },
            behindAhead: {
              behind: branchBehind || 0,
              ahead: branchAhead || 0,
              default: repoMetadata?.default_branch === branch.name
            }
          }
        })}
      />
    )
  }

  const branchesExist = (branches?.length ?? 0) > 0

  return (
    <SandboxLayout.Main hasHeader hasLeftPanel>
      <SandboxLayout.Content>
        <Spacer size={10} />
        {/**
         * Show if branches exist.
         * Additionally, show if query(search) is applied.
         */}
        {(query || branchesExist) && (
          <>
            <Text size={5} weight={'medium'}>
              Branches
            </Text>
            <Spacer size={6} />
            <div className="flex justify-between gap-5 items-center">
              <div className="flex-1">
                <Filter sortOptions={sortOptions} />
              </div>
              <Button variant="default" asChild>
                <Link to="create">Create Branch</Link>
              </Button>
            </div>
          </>
        )}
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        <PaginationComponent
          nextPage={xNextPage}
          previousPage={xPrevPage}
          currentPage={page}
          goToPage={(pageNum: number) => setPage(pageNum)}
        />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}
