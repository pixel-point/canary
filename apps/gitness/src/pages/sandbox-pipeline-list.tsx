import { Link } from 'react-router-dom'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Button, Spacer, Text } from '@harnessio/canary'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import {
  PipelineList,
  MeterState,
  SandboxLayout,
  SkeletonList,
  Filter,
  useCommonFilter,
  ExecutionState
} from '@harnessio/playground'
import { PageResponseHeader } from '../types'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { PaginationComponent } from '../../../../packages/playground/dist'
import { getExecutionStatus } from '../utils/execution-utils'

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
    return (
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
              state: item?.execution?.status === ExecutionState.SUCCESS ? MeterState.Success : MeterState.Error
            }
          ]
        }))}
        LinkComponent={LinkComponent}
      />
    )
  }

  return (
    <>
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Pipelines
          </Text>
          <Spacer size={6} />
          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <Filter />
            </div>
            <Button variant="default" asChild>
              <Link to="create">Create Pipeline</Link>
            </Button>
          </div>
          <Spacer size={5} />
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
