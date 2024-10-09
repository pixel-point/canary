import { Link } from 'react-router-dom'
import {
  Button,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Spacer,
  Text
} from '@harnessio/canary'
import { useListPipelinesQuery, TypesPipeline } from '@harnessio/code-service-client'
import {
  PipelineList,
  MeterState,
  PaddingListLayout,
  SkeletonList,
  Filter,
  useCommonFilter
} from '@harnessio/playground'
import { ExecutionState } from '../types'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { usePagination } from '../framework/hooks/usePagination'

export default function PipelinesPage() {
  // hardcoded
  const totalPages = 10
  const repoRef = useGetRepoRef()

  const { query } = useCommonFilter()

  const { data: pipelines, isFetching } = useListPipelinesQuery(
    {
      repo_ref: repoRef,
      queryParams: { page: 0, limit: 10, query: query?.trim(), latest: true }
    },
    /* To enable mock data */
    {
      placeholderData: [{ identifier: 'pipeline1' }, { identifier: 'pipeline2' }],
      enabled: true
    }
  )
  const { currentPage, previousPage, nextPage, handleClick } = usePagination(1, totalPages)

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    return (
      <PipelineList
        pipelines={pipelines?.map((item: TypesPipeline) => ({
          id: item?.identifier,
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
        {(pipelines?.length ?? 0) > 0 && (
          <ListPagination.Root>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    size="sm"
                    href="#"
                    onClick={() => currentPage > 1 && previousPage()}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      size="sm_icon"
                      href="#"
                      onClick={() => handleClick(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    size="sm"
                    href="#"
                    onClick={() => currentPage < totalPages && nextPage()}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ListPagination.Root>
        )}
      </PaddingListLayout>
    </>
  )
}
