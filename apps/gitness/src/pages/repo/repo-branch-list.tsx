// import React, { useState } from 'react'
import { SkeletonList, NoData, PaddingListLayout, BranchesList } from '@harnessio/playground'
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
import { useGetRepoRef } from '../../framework/hooks/useGetRepoPath'
import { useListBranchesQuery, TypesBranch } from '@harnessio/code-service-client'
import { timeAgo } from '../pipeline-edit/utils/time-utils'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

export function ReposBranchesListPage() {
  const repoRef = useGetRepoRef()
  const { isLoading, data: brancheslistData } = useListBranchesQuery({
    queryParams: { page: 1, limit: 20, sort: 'date', order: 'asc', include_commit: true },
    repo_ref: repoRef
  })

  //lack of data : avatarUrl: string, checking status , behindAhead{behind: num, ahead:num}, pullRequest{sha: string, branch number : 145}
  const renderContent = () => {
    if (isLoading) {
      return <SkeletonList />
    }

    if (brancheslistData?.length === 0 || brancheslistData === undefined) {
      return (
        <div className="mt-40">
          <NoData
            iconName="no-data-branches"
            title="No branches yet"
            description={[
              "Your branches will appear here once they're created.",
              'Start branching to see your work organized.'
            ]}
            primaryButton={{ label: 'Create new branch' }}
          />
        </div>
      )
    }

    return (
      <BranchesList
        branches={brancheslistData?.map((branch: TypesBranch) => {
          return {
            name: branch.name,
            sha: branch.commit?.sha,
            timestamp: timeAgo(branch.commit?.committer?.when || ''),
            user: {
              name: branch.commit?.committer?.identity?.name,
              avatarUrl: ''
            },
            //hardcoded
            checks: {
              done: 1,
              total: 1,
              status: 1
            },
            //hardcoded
            behindAhead: {
              behind: 1,
              ahead: 1
            }
            //temporary hide this column
            // pullRequest: {
            //   sha: '123' //hardcoded
            // }
          }
        })}
      />
    )
  }

  return (
    <PaddingListLayout spaceTop={false}>
      <Spacer size={2} />
      {(brancheslistData?.length ?? 0) > 0 && (
        <>
          <Text size={5} weight={'medium'}>
            Branches
          </Text>
          <Spacer size={6} />
          <ListActions.Root>
            <ListActions.Left>
              <SearchBox.Root placeholder="Search branches" />
            </ListActions.Left>
            <ListActions.Right>
              <ListActions.Dropdown title="Filter" items={filterOptions} />
              <ListActions.Dropdown title="Sort" items={sortOptions} />
              <Button variant="default">Create Branch</Button>
            </ListActions.Right>
          </ListActions.Root>
        </>
      )}
      <Spacer size={5} />
      {renderContent()}
      <Spacer size={8} />
      {(brancheslistData?.length ?? 0) > 0 && (
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
    </PaddingListLayout>
  )
}