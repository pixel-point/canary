import React, { useState } from 'react'
import { RepoList } from '../components/repo-list'
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
import { Link } from 'react-router-dom'
import { mockRepos } from '../data/mockReposData'
import { SandboxLayout } from '../index'
import { PlaygroundSandboxLayoutSettings } from '../settings/sandbox-settings'

const filterOptions = [{ name: 'Filter option 1' }, { name: 'Filter option 2' }, { name: 'Filter option 3' }]
const sortOptions = [{ name: 'Sort option 1' }, { name: 'Sort option 2' }, { name: 'Sort option 3' }]

function SandboxRepoListPage() {
  const [loadState, setLoadState] = useState('float')

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={`/repos/${to}`}>{children}</Link>
  )

  return (
    <>
      {loadState.includes('sub') && (
        <SandboxLayout.LeftSubPanel hasHeader>
          <SandboxLayout.Content>
            <Text as="p" size={2} className="text-primary/70">
              SubMenu
            </Text>
            <Text as="p" size={2} className="text-primary/70">
              2,000 pixels tall
            </Text>
            <div className="h-[2000px]" />
            <Text as="p" size={2} className="text-primary/70">
              End of SubMenu
            </Text>
          </SandboxLayout.Content>
        </SandboxLayout.LeftSubPanel>
      )}
      <SandboxLayout.Main
        hasHeader
        hasLeftPanel
        hasLeftSubPanel={loadState.includes('sub')}
        fullWidth={loadState.includes('full')}>
        <SandboxLayout.Content>
          <Spacer size={10} />
          <Text size={5} weight={'medium'}>
            Repositories
          </Text>
          <Spacer size={6} />
          <ListActions.Root>
            <ListActions.Left>
              <SearchBox.Root placeholder="Search repositories" />
            </ListActions.Left>
            <ListActions.Right>
              <ListActions.Dropdown title="Filter" items={filterOptions} />
              <ListActions.Dropdown title="Sort" items={sortOptions} />
              <Button variant="default">Create repository</Button>
            </ListActions.Right>
          </ListActions.Root>
          <Spacer size={5} />
          <RepoList repos={mockRepos} LinkComponent={LinkComponent} /> <Spacer size={8} />
          {loadState === 'data-loaded' && (
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
          <PlaygroundSandboxLayoutSettings loadState={loadState} setLoadState={setLoadState} />
        </SandboxLayout.Content>
      </SandboxLayout.Main>
    </>
  )
}

export { SandboxRepoListPage }
