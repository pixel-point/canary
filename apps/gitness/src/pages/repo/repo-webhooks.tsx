import React from 'react'
import { Link } from 'react-router-dom'
import {
  Spacer,
  Button,
  Text,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext
} from '@harnessio/canary'
// import { NoSearchResults } from '../components/no-search-results'
import {
  Filter,
  NoData,
  PaddingListLayout,
  SkeletonList,
  useCommonFilter,
  WebhooksList,
  NoSearchResults
} from '@harnessio/playground'
import { useListWebhooksQuery } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { usePagination } from '../../framework/hooks/usePagination'
function RepoWebhooksListPage() {
  // lack of data: total commits
  // hardcoded
  const totalPages = 10
  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>
  const repoRef = useGetRepoRef()

  const { query } = useCommonFilter()

  const { data: webhooks, isFetching } = useListWebhooksQuery({
    repo_ref: repoRef,
    queryParams: { order: 'asc', limit: 20, page: 1, query }
  })
  const { currentPage, previousPage, nextPage, handleClick } = usePagination(1, totalPages)

  const renderListContent = () => {
    if (isFetching) return <SkeletonList />

    if (!webhooks?.length) {
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
          insideTabView
          iconName="no-data-webhooks"
          title="No webhooks yet"
          description={['There are no webhooks in this repository yet.']}
          primaryButton={{ label: 'Create webhook' }}
        />
      )
    }

    return <WebhooksList webhooks={webhooks} LinkComponent={LinkComponent} />
  }

  const webhooksExist = (webhooks?.length ?? 0) > 0

  return (
    <>
      <PaddingListLayout spaceTop={false}>
        <Spacer size={2} />
        {/**
         * Show if webhooks exist.
         * Additionally, show if query(search) is applied.
         */}
        {(query || webhooksExist) && (
          <>
            <Text size={5} weight={'medium'}>
              Webhooks
            </Text>
            <Spacer size={6} />
            <div className="flex justify-between gap-5 items-center">
              <div className="flex-1">
                <Filter />
              </div>
              <Button variant="default" asChild>
                <Link to="#">Create webhook</Link>
              </Button>
            </div>
          </>
        )}
        <Spacer size={5} />
        {renderListContent()}
        <Spacer size={8} />
        {webhooksExist && (
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
                {/* <PaginationItem>
              <PaginationLink size="sm_icon" href="#">
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem> */}
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

export default RepoWebhooksListPage
