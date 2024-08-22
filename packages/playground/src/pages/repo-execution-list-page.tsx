import React from 'react'
import {
  Spacer,
  ListActions,
  ListPagination,
  SearchBox,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  Button
} from '@harnessio/canary'
import ExecutionList from '../components/execution-list'
import { Link } from 'react-router-dom'

const mockExecutions = [
  {
    id: '1',
    number: 733,
    success: true,
    name: 'removing duplicated metrics for servers and swapping to pattern math…',
    sha: '93dbd09a',
    description: 'fix(deps): update module github.com/aws/aws-sdk-go to',
    version: 'v1.5.4.20',
    timestamp: '7 days ago',
    lastTimestamp: '11:24'
  },
  {
    id: '2',
    number: 732,
    success: true,
    name: '(fix) CI-9642 update go version, remove cli warning messages',
    sha: '366177a6',
    description: 'Update module github.com/aws/aws-sdk-go to',
    version: 'v1.54.19',
    timestamp: '4 months ago',
    lastTimestamp: '11:20'
  },
  {
    id: '3',
    number: 731,
    success: true,
    name: 'Bump github.com/containerd/containerd from 1.6.8 to 1.6.18',
    sha: 'da7c1c67',
    description: 'feat: [CDE-119]: Add task handling to spawn and cleanup VM for CDE/gitspaces on bare metalo',
    version: 'v1.5.4.20',
    timestamp: '7 months ago',
    lastTimestamp: '10:50'
  },
  {
    id: '4',
    number: 730,
    success: true,
    name: '(fix) setup dependencies in drone build',
    sha: '93dbd09a',
    description: 'fix: [CI-13371]: Fix log closers in case of step timeouts',
    version: 'v1.5.4.20',
    timestamp: '7 months ago',
    lastTimestamp: '04:12'
  },

  {
    id: '5',
    number: 729,
    success: false,
    name: 'Add support for jpath in jsonnet (#224) * Add support for jpath in jsonnet Co-a',
    sha: 'fe54f9b1',
    description: 'Update go-jsonnet version to',
    version: 'v0.20.0',
    timestamp: '7 months ago',
    lastTimestamp: '05:36'
  },
  {
    id: '6',
    number: 728,
    success: true,
    name: 'fix: use right parameter name for secrets-file',
    sha: 'b7765ad1',
    description: 'update google/go-jsonnet version to',
    version: 'v0.20.0',
    timestamp: '10 months ago',
    lastTimestamp: '04:06'
  }
]

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]
const viewOptions = [{ name: 'View option 1' }, { name: 'View option 2' }]

function RepoExecutionListPage() {
  return (
    // TODO: get layout componentized, this wrapper div is just for quick presentation!
    <div className="px-6 pb-16 max-w-[1200px] min-w-[770px] mx-auto">
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
          <ListActions.Dropdown title="View" items={viewOptions} />
          <Button variant="default" asChild>
            <Link to="edit">Edit Pipeline</Link>
          </Button>
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      <ExecutionList executions={mockExecutions} />
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
    </div>
  )
}

export default RepoExecutionListPage
