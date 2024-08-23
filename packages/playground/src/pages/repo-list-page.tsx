import React from 'react'
import RepoList from '../components/repo-list'
import {
  Text,
  Spacer,
  ListActions,
  ListPagination,
  Button,
  SearchBox,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext
} from '@harnessio/canary'
import PaddingListLayout from '../layouts/PaddingListLayout'

const mockRepos = [
  {
    id: '1',
    name: 'drone',
    description: 'Continuous Integration platform powered by Docker',
    private: false,
    stars: 0,
    forks: 0,
    pulls: 12
  },
  {
    id: '2',
    name: 'drone-go',
    description: 'Go client for the Drone API',
    private: false,
    stars: 0,
    forks: 0,
    pulls: 5
  },
  {
    id: '3',
    name: 'go-generate',
    description: 'Package generate provides tools for generating pipeline configuration files in the Drone format.',
    private: true,
    stars: 2,
    forks: 1,
    pulls: 22
  },
  {
    id: '4',
    name: 'go-task',
    private: true,
    stars: 3,
    forks: 1,
    pulls: 7
  },
  {
    id: '5',
    name: 'go-scm',
    description: 'Package scm provides a unified interface to multiple source code management systems.',
    private: false,
    stars: 123,
    forks: 16,
    pulls: 56
  },
  {
    id: '6',
    name: 'go-convert',
    description: 'Package convert provides tools for converting pipeline configuration files to the Drone format.',
    private: true,
    stars: 8,
    forks: 0,
    pulls: 1
  },
  {
    id: '7',
    name: 'pixelpoint-generate',
    description: 'Package generate provides tools for generating pipeline configuration files in the Drone format.',
    private: true,
    stars: 54,
    forks: 1,
    pulls: 1
  },
  {
    id: '8',
    name: 'pixelpoint-scm',
    description: 'Package scm provides a unified interface to multiple source code management systems.',
    private: false,
    stars: 123,
    forks: 16,
    pulls: 56
  }
]

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

function RepoListPage() {
  return (
    <PaddingListLayout>
      <Text size={5} weight={'medium'}>
        Repositories
      </Text>
      <Spacer size={6} />
      <ListActions.Root>
        <ListActions.Left>
          <SearchBox.Root placeholder="Search" />
        </ListActions.Left>
        <ListActions.Right>
          <ListActions.Dropdown title="Filter" items={filterOptions} />
          <ListActions.Dropdown title="Sort" items={sortOptions} />
          <Button variant="default">Create repository</Button>
        </ListActions.Right>
      </ListActions.Root>
      <Spacer size={5} />
      <RepoList repos={mockRepos} />
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
  )
}

export default RepoListPage
