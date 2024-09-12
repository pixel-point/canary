import React from 'react'
import {
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Spacer
} from '@harnessio/canary'
import { NoData, PullRequestCommits, SkeletonList } from '@harnessio/playground'
import { useListPullReqCommitsQuery, TypesCommit } from '@harnessio/code-service-client'

export default function PullRequestCommitsPage() {
  const { data: commitData, isFetching } = useListPullReqCommitsQuery({
    repo_ref: 'workspace/repo/+',
    pullreq_number: 1,
    queryParams: { page: 0, limit: 10 }
  })

  const renderContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
    if (commitData?.content?.length) {
      return (
        <PullRequestCommits
          // @ts-expect-error remove "@ts-expect-error" once type issue for "content" is resolved
          data={commitData?.content.map((item: TypesCommit) => ({
            sha: item.sha,
            parent_shas: item.parent_shas,
            title: item.title,
            message: item.message,
            author: item.author,
            committer: item.committer
          }))}
        />
      )
    } else {
      return (
        <NoData
          iconName="no-data-folder"
          title="No commits yet"
          description={['There are no commits for this pull request yet.']}
        />
      )
    }
  }

  return (
    <>
      {renderContent()}
      <Spacer size={8} />
      {/* TODO: actually add pagination when apis are implemented */}
      {!isFetching && (
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
      )}
    </>
  )
}
