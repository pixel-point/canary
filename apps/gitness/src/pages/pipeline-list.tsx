import { Link } from 'react-router-dom'
import {
  Button,
  ListActions,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SearchBox,
  Spacer,
  Text
} from '@harnessio/canary'
import { useListPipelinesQuery, TypesPipeline, ListPipelinesOkResponse } from '@harnessio/code-service-client'
import { PipelineList, MeterState, PaddingListLayout, SkeletonList } from '@harnessio/playground'
import { ExecutionState } from '../types'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

export default function PipelinesPage() {
  const repoRef = useGetRepoRef()
  const { data: pipelines, isFetching } = useListPipelinesQuery(
    {
      repo_ref: repoRef,
      queryParams: { page: 0, limit: 10, query: '', latest: true }
    },
    /* To enable mock data */
    {
      // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
      placeholderData: {
        content: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }]
      } as ListPipelinesOkResponse,
      enabled: true
    }
  )

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    return (
      <PipelineList
        // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
        pipelines={pipelines?.content?.map((item: TypesPipeline) => ({
          id: item?.id,
          status: item?.execution?.status,
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
      <PaddingListLayout>
        <Text size={5} weight={'medium'}>
          Pipelines
        </Text>
        <Spacer size={6} />
        <ListActions.Root>
          <ListActions.Left>
            <SearchBox.Root placeholder="Search pipelines" />
          </ListActions.Left>
          <ListActions.Right>
            <ListActions.Dropdown title="Filter" items={filterOptions} />
            <ListActions.Dropdown title="Sort" items={sortOptions} />
            <ListActions.Dropdown title="View" items={viewOptions} />
            <Button variant="default">Create Pipeline</Button>
          </ListActions.Right>
        </ListActions.Root>
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        <ListPagination.Root>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious size="sm" href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive size="sm_icon" href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  <PaginationEllipsis />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm_icon" href="#">
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext size="sm" href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ListPagination.Root>
      </PaddingListLayout>
    </>
  )
}
