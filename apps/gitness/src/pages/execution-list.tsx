import { useState } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { TypesExecution, useListExecutionsQuery } from '@harnessio/code-service-client'
import { ListActions, SearchBox, Spacer, Text, Button } from '@harnessio/canary'
import {
  PaddingListLayout,
  ExecutionList,
  SkeletonList,
  timeDistance,
  NoData,
  PaginationComponent,
  ExecutionState
} from '@harnessio/playground'
import { PageResponseHeader } from '../types'
import { Link, useParams } from 'react-router-dom'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { PathParams } from '../RouteDefinitions'
import { getLabel } from '../utils/execution-utils'
import RunPipelineDialog from './run-pipeline-dialog/run-pipeline-dialog'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

export default function ExecutionsListPage() {
  const repoRef = useGetRepoRef()
  const { pipelineId } = useParams<PathParams>()
  const [openRunPipeline, setOpenRunPipeline] = useState(false)

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const {
    data: { body: executions, headers } = {},
    isFetching,
    isSuccess
  } = useListExecutionsQuery({
    repo_ref: repoRef,
    pipeline_identifier: pipelineId || '',
    queryParams: { page }
  })

  const totalPages = parseInt(headers?.get(PageResponseHeader.xTotalPages) || '')

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (isSuccess) {
      if (executions?.length) {
        return (
          <ExecutionList
            executions={executions?.map((item: TypesExecution) => ({
              id: item?.number && `executions/${item.number}`,
              status: item?.status,
              success: item?.status,
              name: item?.message || item?.title,
              sha: item?.after?.slice(0, 6),
              description: getLabel(item),
              timestamp: `${timeDistance(item?.finished, Date.now(), true)} ago`,
              lastTimestamp: timeDistance(
                item?.started,
                item?.status === ExecutionState.RUNNING ? Date.now() : item?.finished,
                true
              )
            }))}
            LinkComponent={LinkComponent}
          />
        )
      }

      return (
        <>
          <NoData
            iconName="no-data-cog"
            title="No executions yet"
            description={[
              "Your pipeline executions will appear here once they're completed.",
              'Start your pipeline to see the results.'
            ]}
            primaryButton={{ label: 'Create pipeline' }}
            secondaryButton={{ label: 'Import pipeline' }}
          />
        </>
      )
    }
  }

  return (
    <>
      <PaddingListLayout>
        <Text size={5} weight={'medium'}>
          Executions
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search executions" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="Filter" items={filterOptions} />
            <ListActions.Dropdown title="Sort" items={sortOptions} />
            <ListActions.Dropdown title="View" items={viewOptions} />
            <div className="flex gap-x-4">
              <Button
                variant="default"
                onClick={() => {
                  setOpenRunPipeline(true)
                }}>
                Run
              </Button>
              <Button variant="default" asChild>
                <Link to="edit">Edit Pipeline</Link>
              </Button>
            </div>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        <PaginationComponent
          totalPages={totalPages}
          currentPage={page}
          goToPage={(pageNum: number) => setPage(pageNum)}
        />
      </PaddingListLayout>
      <RunPipelineDialog
        open={openRunPipeline}
        onClose={() => {
          setOpenRunPipeline(false)
        }}
        pipelineId={pipelineId}
        branch={executions && executions.length > 0 ? executions[0].source : undefined} // TODO: check this
        toExecutions={'./executions'}
      />
    </>
  )
}
