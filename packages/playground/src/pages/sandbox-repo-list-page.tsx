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
import {
  Filters,
  FiltersBar,
  type FilterCondition,
  type FilterOption,
  type SortDirection,
  type SortOption
} from '../components/filters'

import useFilters from '../components/filters/use-filters'
import { formatDistanceToNow } from 'date-fns'

export const BASIC_CONDITIONS: FilterCondition[] = [
  { label: 'is', value: 'is' },
  { label: 'is not', value: 'is_not' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' }
]

export const RANGE_CONDITIONS: FilterCondition[] = [
  { label: 'is', value: 'is' },
  { label: 'is before', value: 'is_before' },
  { label: 'is after', value: 'is_after' },
  { label: 'is between', value: 'is_between' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' }
]

const TEXT_CONDITIONS: FilterCondition[] = [
  { label: 'is', value: 'is' },
  { label: 'is not', value: 'is_not' },
  { label: 'contains', value: 'contains' },
  { label: 'does not contain', value: 'does_not_contain' },
  { label: 'starts with', value: 'starts_with' },
  { label: 'ends with', value: 'ends_with' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' }
]

const NUMBER_CONDITIONS: FilterCondition[] = [
  { label: '=', value: 'equals' },
  { label: '≠', value: 'not_equals' },
  { label: '>', value: 'greater' },
  { label: '<', value: 'less' },
  { label: '≥', value: 'greater_equals' },
  { label: '≤', value: 'less_equals' },
  { label: 'Is empty', value: 'is_empty' },
  { label: 'Is not empty', value: 'is_not_empty' }
]

const FILTER_OPTIONS: FilterOption[] = [
  {
    label: 'Type',
    value: 'type',
    type: 'checkbox',
    conditions: BASIC_CONDITIONS,
    options: [
      { label: 'Public', value: 'public' },
      { label: 'Private', value: 'private' },
      { label: 'Fork', value: 'fork' }
    ]
  },
  {
    label: 'Created time',
    value: 'created_time',
    type: 'calendar',
    conditions: RANGE_CONDITIONS
  },
  {
    label: 'Name',
    value: 'name',
    type: 'text',
    conditions: TEXT_CONDITIONS
  },
  {
    label: 'Stars',
    value: 'stars',
    type: 'number',
    conditions: NUMBER_CONDITIONS
  }
]

const SORT_OPTIONS: SortOption[] = [
  { label: 'Last updated', value: 'updated' },
  { label: 'Stars', value: 'stars' },
  { label: 'Forks', value: 'forks' },
  { label: 'Pull Requests', value: 'pulls' },
  { label: 'Title', value: 'title' }
]

const SORT_DIRECTIONS: SortDirection[] = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' }
]

function SandboxRepoListPage() {
  const [loadState, setLoadState] = useState('float')

  const LinkComponent = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={`/repos/${to}`}>{children}</Link>
  )

  const filterHandlers = useFilters()

  /**
   * Filters repositories based on active filters
   *
   * @param repo - Repository object to filter
   * @returns boolean - Whether the repository matches all active filters
   *
   * Filter logic:
   * - If no active filters, returns all repositories
   * - Applies all active filters (AND condition)
   * - For type filter:
   *   - Handles 'private', 'public', and 'fork' types
   *   - Supports 'is' and 'is not' conditions
   *   - Ignores empty filters or is_empty/is_not_empty conditions
   */
  const filteredRepos = mockRepos.filter(repo => {
    if (filterHandlers.activeFilters.length === 0) return true

    return filterHandlers.activeFilters.every(filter => {
      switch (filter.type) {
        case 'type': {
          // Skip empty/not empty conditions for type filter
          if (filter.condition === 'is_empty' || filter.condition === 'is_not_empty') {
            return true
          }

          // Skip if no values selected
          if (filter.selectedValues.length === 0) {
            return true
          }

          // Determine repository types
          const isPrivate = repo.private
          const isPublic = !repo.private
          const isFork = repo.forks > 0

          // Check if repo matches any of the selected type values
          const matchesType = filter.selectedValues.some(value => {
            switch (value) {
              case 'private':
                return isPrivate
              case 'public':
                return isPublic
              case 'fork':
                return isFork
              default:
                return false
            }
          })

          // Apply condition (is/is not)
          return filter.condition === 'is' ? matchesType : !matchesType
        }

        case 'created_time': {
          // Skip if no values selected
          if (filter.selectedValues.length === 0) {
            return true
          }

          // Handle empty conditions
          if (filter.condition === 'is_empty') {
            return !repo.createdAt
          }
          if (filter.condition === 'is_not_empty') {
            return !!repo.createdAt
          }

          const createdDate = new Date(repo.createdAt)
          const selectedDate = new Date(filter.selectedValues[0])

          // Reset time parts for date-only comparison
          createdDate.setHours(0, 0, 0, 0)
          selectedDate.setHours(0, 0, 0, 0)

          switch (filter.condition) {
            case 'is':
              return createdDate.getTime() === selectedDate.getTime()

            case 'is_before':
              return createdDate.getTime() < selectedDate.getTime()

            case 'is_after':
              return createdDate.getTime() > selectedDate.getTime()

            case 'is_between': {
              if (filter.selectedValues.length !== 2) return true
              const endDate = new Date(filter.selectedValues[1])
              endDate.setHours(0, 0, 0, 0)
              return createdDate.getTime() >= selectedDate.getTime() && createdDate.getTime() <= endDate.getTime()
            }

            default:
              return true
          }
        }

        case 'name': {
          if (filter.condition === 'is_empty') {
            return !repo.name
          }
          if (filter.condition === 'is_not_empty') {
            return !!repo.name
          }

          // Skip if no values selected
          if (filter.selectedValues.length === 0) {
            return true
          }

          const value = filter.selectedValues[0].toLowerCase()
          const name = repo.name.toLowerCase()

          switch (filter.condition) {
            case 'is':
              return name === value
            case 'is_not':
              return name !== value
            case 'contains':
              return name.includes(value)
            case 'does_not_contain':
              return !name.includes(value)
            case 'starts_with':
              return name.startsWith(value)
            case 'ends_with':
              return name.endsWith(value)
            default:
              return true
          }
        }

        case 'stars': {
          if (filter.condition === 'is_empty') {
            return !repo.stars
          }
          if (filter.condition === 'is_not_empty') {
            return !!repo.stars
          }

          if (filter.selectedValues.length === 0) {
            return true
          }

          const filterValue = Number(filter.selectedValues[0])
          const repoValue = repo.stars || 0

          switch (filter.condition) {
            case 'equals':
              return repoValue === filterValue
            case 'not_equals':
              return repoValue !== filterValue
            case 'greater':
              return repoValue > filterValue
            case 'less':
              return repoValue < filterValue
            case 'greater_equals':
              return repoValue >= filterValue
            case 'less_equals':
              return repoValue <= filterValue
            default:
              return true
          }
        }

        default:
          return true
      }
    })
  })

  /**
   * Sorts filtered repositories based on active sorts
   *
   * @param a - First repository to compare
   * @param b - Second repository to compare
   * @returns number - Comparison result (-1, 0, 1)
   *
   * Sort logic:
   * - Applies multiple sorts in priority order (first sort has highest priority)
   * - For equal values, moves to next sort criteria
   * - Supports following sort types:
   *   - updated: by timestamp
   *   - stars: by number of stars
   *   - forks: by number of forks
   *   - pulls: by number of pull requests
   *   - title: alphabetically by name
   * - Each sort supports ascending/descending direction
   */
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    // Iterate through sorts in priority order
    for (const sort of filterHandlers.activeSorts) {
      const direction = sort.direction === 'asc' ? 1 : -1
      let comparison = 0

      switch (sort.type) {
        case 'updated':
          comparison = (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) * direction
          break
        case 'stars':
          comparison = (b.stars - a.stars) * direction
          break
        case 'forks':
          comparison = (b.forks - a.forks) * direction
          break
        case 'pulls':
          comparison = (b.pulls - a.pulls) * direction
          break
        case 'title':
          comparison = a.name.localeCompare(b.name) * direction
          break
        default:
          comparison = 0
      }

      // If items are different by current sort criteria, return result
      if (comparison !== 0) {
        return comparison
      }
    }

    return 0
  })

  const reposWithFormattedDates = sortedRepos.map(repo => ({
    ...repo,
    timestamp: formatDistanceToNow(new Date(repo.createdAt), {
      addSuffix: true,
      includeSeconds: true
    }).replace('about ', '')
  }))

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
              <Filters filterOptions={FILTER_OPTIONS} sortOptions={SORT_OPTIONS} filterHandlers={filterHandlers} />
              <Button variant="default">New repository</Button>
            </ListActions.Right>
          </ListActions.Root>
          {(filterHandlers.activeFilters.length > 0 || filterHandlers.activeSorts.length > 0) && <Spacer size={2} />}
          <FiltersBar
            filterOptions={FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
            sortDirections={SORT_DIRECTIONS}
            filterHandlers={filterHandlers}
          />
          <Spacer size={5} />

          <RepoList
            repos={reposWithFormattedDates}
            LinkComponent={LinkComponent}
            handleResetFilters={filterHandlers.handleResetFilters}
            hasActiveFilters={filterHandlers.activeFilters.length > 0}
          />
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
