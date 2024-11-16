import { useState } from 'react'
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
import { Filters, FiltersSelectedBar } from '../components/filters'
import type { SortDirection } from '../components/filters/types'
import useFilters from '../components/filters/use-filters'

import { getFilteredRepos, getFormattedReposWithDate, getSortedRepos } from '../components/filters/utils/repository'
import { FILTER_OPTIONS, SORT_OPTIONS } from '../components/filters/constants/filter-and-sort-repo'

const SORT_DIRECTIONS: SortDirection[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' }
]

function SandboxRepoListPage() {
  const [loadState, setLoadState] = useState('float')

  const {
    activeFilters,
    activeSorts,
    handleFilterChange,
    handleUpdateFilter,
    handleUpdateCondition,
    handleRemoveFilter,
    handleSortChange,
    handleUpdateSort,
    handleRemoveSort,
    handleResetFilters,
    handleResetSorts,
    handleReorderSorts,
    handleResetAll,
    searchQueries,
    handleSearchChange
  } = useFilters()

  const filteredRepos = getFilteredRepos(mockRepos, activeFilters)
  const sortedRepos = getSortedRepos(filteredRepos, activeSorts)
  const reposWithFormattedDates = getFormattedReposWithDate(sortedRepos)

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
              <Filters
                filterOptions={FILTER_OPTIONS}
                sortOptions={SORT_OPTIONS}
                activeFilters={activeFilters}
                activeSorts={activeSorts}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onResetFilters={handleResetFilters}
                onResetSort={handleResetSorts}
                searchQueries={searchQueries}
                onSearchChange={handleSearchChange}
              />
              <Button variant="default">New repository</Button>
            </ListActions.Right>
          </ListActions.Root>
          {(activeFilters.length > 0 || activeSorts.length > 0) && <Spacer size={2} />}
          <FiltersSelectedBar
            activeFilters={activeFilters}
            activeSorts={activeSorts}
            filterOptions={FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
            sortDirections={SORT_DIRECTIONS}
            onRemoveFilter={handleRemoveFilter}
            onUpdateFilter={handleUpdateFilter}
            onUpdateCondition={handleUpdateCondition}
            onUpdateSort={handleUpdateSort}
            onRemoveSort={handleRemoveSort}
            onSortChange={handleSortChange}
            onResetSorts={handleResetSorts}
            onReorderSorts={handleReorderSorts}
            onResetAll={handleResetAll}
            searchQueries={searchQueries}
            onSearchChange={handleSearchChange}
          />
          <Spacer size={5} />
          <RepoList repos={reposWithFormattedDates} LinkComponent={LinkComponent} />
          <Spacer size={8} />
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
