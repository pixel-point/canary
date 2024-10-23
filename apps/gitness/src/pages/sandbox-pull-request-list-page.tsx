import React from 'react'
import {
  Spacer,
  ListPagination,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  Text,
  Button
} from '@harnessio/canary'
import { Link, useParams } from 'react-router-dom'
import { SkeletonList, PullRequestList, NoData, useCommonFilter, Filter, SandboxLayout } from '@harnessio/playground'
import { ListPullReqQueryQueryParams, TypesPullReq, useListPullReqQuery } from '@harnessio/code-service-client'
import { useGetRepoRef } from '../framework/hooks/useGetRepoPath'
import { usePagination } from '../framework/hooks/usePagination'
import { timeAgoFromEpochTime } from './pipeline-edit/utils/time-utils'
import { DropdownItemProps } from '../../../../packages/canary/dist/components/list-actions'
import { PathParams } from '../RouteDefinitions'

const SortOptions = [
  { name: 'Created', value: 'created' },
  { name: 'Edited', value: 'edited' },
  { name: 'Merged', value: 'merged' },
  { name: 'Number', value: 'number' },
  { name: 'Updated', value: 'updated' }
] as const satisfies DropdownItemProps[]

function PullRequestSandboxListPage() {
  const { repoId, spaceId } = useParams<PathParams>()
  // hardcoded
  const totalPages = 10
  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => <Link to={to}>{children}</Link>
  const repoRef = useGetRepoRef()
  const { currentPage, previousPage, nextPage, handleClick } = usePagination(1, totalPages)

  const { sort, query } = useCommonFilter<ListPullReqQueryQueryParams['sort']>()

  const { data: pullrequests, isFetching } = useListPullReqQuery(
    {
      repo_ref: repoRef,
      queryParams: { page: 0, limit: 20, query: query?.trim(), sort }
    },
    /* To enable mock data */
    {
      placeholderData: [
        {
          number: 54,
          created: 1724358668485,
          edited: 1724358668485,
          state: 'open',
          is_draft: false,
          title: 'asas',
          description: '',
          source_repo_id: 3,
          source_branch: 'sourceBranch',
          source_sha: 'a465fffb062c00674b1588fb2ba29a0608aa707b',
          target_repo_id: 3,
          target_branch: 'main',
          merged: null,
          merge_method: 'merge',
          merge_check_status: 'mergeable',
          merge_target_sha: '280eb1bf35345565242e05dbf20427faae8e11ed',
          merge_base_sha: '26cd0c202180f82738823d5351488540f331f943',
          author: {
            id: 3,
            uid: 'admin',
            display_name: 'Administrator',
            email: 'admin@gitness.io',
            type: 'user',
            created: 1699863416002,
            updated: 1699863416002
          },
          merger: {},
          stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 1, unresolved_count: 1 }
        },
        {
          number: 51,
          created: 1715284979958,
          edited: 1723741195904,
          state: 'open',
          is_draft: false,
          title: 'feat: [code-1]: update readme',
          description: '',
          source_repo_id: 3,
          source_branch: 'ngfnfgn',
          source_sha: 'c0879587b546fcbded6e39924449003f6c8742c0',
          target_repo_id: 3,
          target_branch: 'main',
          merged: null,
          merge_method: 'rebase',
          merge_check_status: 'unchecked',
          merge_target_sha: null,
          merge_base_sha: '7d8c356eac25a94501653b57a44120104b8e9bc6',
          author: {
            id: 3,
            uid: 'admin',
            display_name: 'Administrator',
            email: 'admin@gitness.io',
            type: 'user',
            created: 1699863416002,
            updated: 1699863416002
          },
          merger: {},
          stats: { commits: 1, files_changed: 1, additions: 1, deletions: 0, conversations: 2 },
          labels: [
            { id: 1, key: 'P0', color: 'red', value_count: 0 },
            {
              id: 2,
              key: 'P1',
              color: 'red',

              value_count: 5,
              value: 'asdsa',
              value_color: 'red'
            },
            {
              id: 3,
              key: 'teststringssdsjakteststringssdsjakteststringssdsj',
              color: 'blue',
              value_count: 1,
              value: 'teststringssdsjakteststringssdsjak',
              value_color: 'blue'
            }
          ]
        }
      ],
      enabled: true
    }
  )

  const renderListContent = () => {
    if (isFetching) {
      return <SkeletonList />
    }
    if (pullrequests?.length === 0) {
      return (
        <NoData
          insideTabView
          iconName="no-data-merge"
          title="No Pull Requests yet"
          description={['There are no pull requests in this repository yet.']}
          primaryButton={{
            label: 'Create pull requests'
          }}
          secondaryButton={{
            label: 'Import pull requests'
          }}
        />
      )
    }
    return (
      <PullRequestList
        LinkComponent={LinkComponent}
        pullRequests={pullrequests?.map((item: TypesPullReq) => ({
          author: item?.author?.display_name,
          name: item?.title,
          // TODO: fix review required when its actually there
          reviewRequired: true,
          merged: item.merged,
          comments: item.stats?.conversations,
          number: item?.number,
          // TODO: add label information to display associated labels for each pull request
          // labels: item?.labels?.map((key: string, color: string) => ({ text: key, color: color })),
          // TODO: fix 2 hours ago in timestamp
          timestamp: item?.created ? timeAgoFromEpochTime(item?.created) : '',
          source_branch: item?.source_branch,
          state: item?.state
        }))}
      />
    )
  }

  return (
    <>
      <SandboxLayout.Main hasHeader hasLeftPanel>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Pull Requests
          </Text>
          <Spacer size={6} />

          <div className="flex justify-between gap-5 items-center">
            <div className="flex-1">
              <Filter sortOptions={SortOptions} />
            </div>
            <Button variant="default" asChild>
              <Link to={`/sandbox/spaces/${spaceId}/repos/${repoId}/pull-requests/compare`}>New pull request</Link>
            </Button>
          </div>

          <Spacer size={5} />
          {renderListContent()}
          <Spacer size={8} />
          {(pullrequests?.length ?? 0) > 0 && (
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
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

export default PullRequestSandboxListPage
