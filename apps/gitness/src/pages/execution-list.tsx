import { TypesExecution, useListExecutionsQuery } from '@harnessio/code-service-client'
import {
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
import { PaddingListLayout, ExecutionList, SkeletonList, timeDistance, NoData } from '@harnessio/playground'
import { ExecutionState } from '../types'
import { Link } from 'react-router-dom'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

export default function ExecutionsListPage() {
  const repoRef = useGetRepoRef()
  const {
    data: executions,
    isFetching,
    error,
    isSuccess
  } = useListExecutionsQuery(
    {
      repo_ref: repoRef,
      pipeline_identifier: 'pipeline-id',
      queryParams: { page: 0, limit: 10 }
    },
    /* To enable mock data */
    {
      // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
      placeholderData: { content: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }] },
      enabled: true
    }
  )

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (isSuccess) {
      // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
      if (executions?.content?.length) {
        return (
          <ExecutionList
            // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
            executions={executions?.content?.map((item: TypesExecution) => ({
              id: item?.number,
              number: item?.number,
              status: item?.status,
              success: item?.status === 'success',
              name: item?.message,
              sha: item?.after?.slice(0, 6),
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
    } else {
      console.log({ error })
      return <></>
    }
  }

  return (
    <>
      {/* <TopBarWidget /> */}
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
