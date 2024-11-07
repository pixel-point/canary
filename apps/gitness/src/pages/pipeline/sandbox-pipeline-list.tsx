import { Link } from 'react-router-dom'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Button, Spacer, Text } from '@harnessio/canary'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import {
  PipelineList,
  SandboxLayout,
  SkeletonList,
  Filter,
  useCommonFilter,
  NoData,
  NoSearchResults,
  PaginationComponent
} from '@harnessio/playground'
import { PageResponseHeader } from '../../types'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { getExecutionStatus, getMeterState } from '../../utils/execution-utils'

export default function SandboxPipelinesPage() {
  const repoRef = useGetRepoRef()

  const { query: currentQuery } = useCommonFilter()
  const [query, _] = useQueryState('query', { defaultValue: currentQuery || '' })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const { data: { body: pipelines, headers } = {}, isFetching } = useListPipelinesQuery({
    repo_ref: repoRef,
    queryParams: { page, query, latest: true }
  })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }

    if (!pipelines?.length) {
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
          iconName="no-data-folder"
          title="No pipelines yet"
          description={['There are no pipelines in this repository yet.']}
          primaryButton={{ label: 'Create pipeline', to: 'create' }}
        />
      )
    }
    return (
      <>
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <Filter />
          </div>
          <Button variant="default" asChild>
            <Link to="create">Create Pipeline</Link>
          </Button>
        </div>
        <Spacer size={5} />
        <PipelineList
          pipelines={pipelines?.map((item: TypesPipeline) => ({
            id: item?.identifier || '',
            status: getExecutionStatus(item?.execution?.status),
            name: item?.identifier,
            sha: item?.execution?.after,
            description: item?.execution?.message,
            timestamp: item?.created,
            meter: [
              {
                id: item?.execution?.number,
                state: getMeterState(item?.execution?.status)
              }
            ]
          }))}
          LinkComponent={LinkComponent}
        />
      </>
    )
  }

  return (
    <>
      <SandboxLayout.Main hasHeader hasSubHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Pipelines
          </Text>
          <Spacer size={6} />
          {renderListContent()}
          <Spacer size={8} />
          <PaginationComponent
            totalPages={totalPages}
            currentPage={page}
            goToPage={(pageNum: number) => setPage(pageNum)}
          />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}
